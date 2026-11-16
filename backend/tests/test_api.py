"""Tests for FastAPI endpoints."""

from pathlib import Path
import pytest
from httpx import ASGITransport, AsyncClient
from app.main import app

SAMPLE_PCAP_PATH = (
    Path(__file__).resolve().parent.parent.parent
    / "sample_pcaps"
    / "sample_traffic.pcap"
)


@pytest.mark.anyio
async def test_root_endpoint():
    """Verify root endpoint returns operational metadata."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["service"] == "Nexaptra"
        assert data["status"] == "operational"
        assert "version" in data


@pytest.mark.anyio
async def test_health_endpoint():
    """Verify health endpoint returns status healthy and timestamp."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["service"] == "Nexaptra"
        assert "timestamp" in data


@pytest.mark.anyio
async def test_analyze_invalid_extension():
    """Verify rejection of non-pcap files."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        files = {"file": ("malicious.exe", b"not a pcap", "application/octet-stream")}
        response = await client.post("/api/v1/analyze", files=files)
        assert response.status_code == 400
        assert "Unsupported file extension" in response.json()["detail"]


@pytest.mark.anyio
async def test_analyze_empty_file():
    """Verify rejection of 0-byte capture files."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        files = {"file": ("empty.pcap", b"", "application/vnd.tcpdump.pcap")}
        response = await client.post("/api/v1/analyze", files=files)
        assert response.status_code == 400
        assert "empty" in response.json()["detail"]


@pytest.mark.anyio
async def test_analyze_invalid_magic_bytes():
    """Verify rejection of files with invalid magic headers despite .pcap extension."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        files = {
            "file": (
                "fake.pcap",
                b"INVALID_HEADER_DATA_12345",
                "application/vnd.tcpdump.pcap",
            )
        }
        response = await client.post("/api/v1/analyze", files=files)
        assert response.status_code == 400
        assert "Invalid capture header" in response.json()["detail"]


@pytest.mark.anyio
async def test_analyze_valid_sample_pcap():
    """Verify successful analysis of valid sample PCAP file."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        with open(SAMPLE_PCAP_PATH, "rb") as f:
            file_bytes = f.read()

        files = {
            "file": (
                "sample_traffic.pcap",
                file_bytes,
                "application/vnd.tcpdump.pcap",
            )
        }
        response = await client.post("/api/v1/analyze", files=files)
        assert response.status_code == 200
        payload = response.json()
        assert payload["status"] == "success"
        data = payload["data"]
        assert data["total_packets"] == 9
        assert data["total_bytes"] > 0
        assert "DNS" in data["protocols"]
        assert "HTTP" in data["protocols"]
        assert len(data["top_source_ips"]) > 0
