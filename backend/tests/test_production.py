"""Production integration tests for NetScope SPA serving, SEO files, and API endpoints."""

import pytest
from httpx import ASGITransport, AsyncClient
from app.main import app


@pytest.mark.anyio
async def test_spa_index_html_serving():
    """Verify that browser requests to / with text/html receive index.html with SEO metadata."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/", headers={"Accept": "text/html,application/xhtml+xml"})
        assert response.status_code == 200
        html = response.text
        assert "NetScope" in html
        assert "https://github.com/T-ARK" in html
        assert "application/ld+json" in html


@pytest.mark.anyio
async def test_robots_txt_serving():
    """Verify robots.txt is accessible and disallows /api/."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/robots.txt")
        assert response.status_code == 200
        assert "User-agent: *" in response.text
        assert "Disallow: /api/" in response.text


@pytest.mark.anyio
async def test_sitemap_xml_serving():
    """Verify sitemap.xml is properly served."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/sitemap.xml")
        assert response.status_code == 200
        assert "urlset" in response.text


@pytest.mark.anyio
async def test_spa_client_side_routing_fallback():
    """Verify that client SPA routes like /dashboard return index.html for browser navigation."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/dashboard", headers={"Accept": "text/html"})
        assert response.status_code == 200
        assert "<div id=\"root\"></div>" in response.text


@pytest.mark.anyio
async def test_api_sample_endpoint():
    """Verify built-in sample capture endpoint returns valid forensic telemetry."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/sample")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["total_packets"] == 9
