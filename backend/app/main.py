"""FastAPI application entrypoint for NetScope."""

from contextlib import asynccontextmanager
from datetime import datetime, timezone
import os
import shutil
import tempfile
from typing import Any, Dict
from fastapi import FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from app.analyzer import (
    CorruptedCaptureError,
    InvalidCaptureFormatError,
    analyze_pcap,
    validate_pcap_header,
)
from app.config import get_settings

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events for application startup and shutdown."""
    # Startup: logging and environment validation
    yield
    # Shutdown: cleanup


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=settings.app_description,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["General"])
async def root() -> Dict[str, Any]:
    """Root endpoint providing service metadata."""
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "description": settings.app_description,
        "documentation": "/docs",
        "health": "/health",
        "status": "operational",
    }


@app.get("/health", tags=["Monitoring"])
async def health_check() -> Dict[str, Any]:
    """Health check endpoint for container probes and uptime monitoring."""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post(
    "/api/v1/analyze",
    status_code=status.HTTP_200_OK,
    tags=["Analysis"],
    summary="Analyze PCAP/PCAPNG capture (Phase 1 MVP)",
    description=(
        "Upload a .pcap or .pcapng file to extract packet statistics, "
        "protocol distribution, and top host communications. "
        "Note: In production (Phase 8), heavy analysis tasks move to Celery/Redis background workers."
    ),
)
async def analyze_capture(file: UploadFile = File(...)) -> Dict[str, Any]:
    """Validate and process an uploaded PCAP or PCAPNG capture file."""
    filename = file.filename or "unknown.pcap"
    ext = os.path.splitext(filename)[1].lower()

    # 1. Filename extension validation
    if ext not in settings.allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Unsupported file extension '{ext}'. "
                f"Allowed formats: {', '.join(settings.allowed_extensions)}"
            ),
        )

    # 2. Inspect first chunk for magic bytes validation before streaming full file
    chunk_size = 64 * 1024  # 64 KB
    first_chunk = await file.read(chunk_size)

    if not first_chunk:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty (0 bytes).",
        )

    try:
        validate_pcap_header(first_chunk[:4])
    except InvalidCaptureFormatError as err:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(err),
        )

    # 3. Stream content safely to a temporary file
    temp_fd, temp_path = tempfile.mkstemp(prefix="netscope_upload_", suffix=ext)
    total_bytes_read = 0

    try:
        with open(temp_fd, "wb") as temp_file:
            # Write first chunk
            total_bytes_read += len(first_chunk)
            temp_file.write(first_chunk)

            # Stream remaining chunks while checking size limits
            while True:
                chunk = await file.read(chunk_size)
                if not chunk:
                    break
                total_bytes_read += len(chunk)
                if total_bytes_read > settings.max_upload_bytes:
                    max_mb = settings.max_upload_bytes // (1024 * 1024)
                    raise HTTPException(
                        status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                        detail=f"Upload exceeds maximum permitted size of {max_mb} MB.",
                    )
                temp_file.write(chunk)

        # 4. Execute streaming packet analysis
        result = analyze_pcap(
            file_path=temp_path,
            original_filename=filename,
            max_samples=settings.max_sampled_packets,
        )

        return {
            "status": "success",
            "message": "Capture analyzed successfully",
            "data": result.to_dict(),
        }

    except InvalidCaptureFormatError as err:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(err),
        )
    except CorruptedCaptureError as err:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(err),
        )
    except HTTPException:
        raise
    except Exception as err:
        # Avoid leaking internal traceback details in production
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during capture analysis.",
        )
    finally:
        # Guarantee removal of temporary file in all execution branches
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except OSError:
                pass
        await file.close()


@app.get(
    "/api/v1/sample",
    status_code=status.HTTP_200_OK,
    tags=["Analysis"],
    summary="Get analysis for the bundled sample PCAP capture",
)
async def get_sample_analysis() -> Dict[str, Any]:
    """Analyze the built-in sample capture file for rapid demonstrations."""
    from pathlib import Path
    sample_path = Path(__file__).resolve().parents[2] / "sample_pcaps" / "sample_traffic.pcap"
    if not sample_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sample capture file not found on server.",
        )
    result = analyze_pcap(
        file_path=str(sample_path),
        original_filename="sample_traffic.pcap",
        max_samples=100,
    )
    return {
        "status": "success",
        "message": "Sample capture analyzed successfully",
        "data": result.to_dict(),
    }

