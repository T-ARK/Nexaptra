"""Application configuration settings for Nexaptra."""

from functools import lru_cache
import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuration loaded from environment variables with safe production defaults."""

    app_name: str = os.getenv("APP_NAME", "Nexaptra")
    app_version: str = "0.1.0"
    app_description: str = (
        "AI-Driven Network Traffic Analysis and Intelligent PCAP Forensics Platform"
    )
    environment: str = os.getenv("ENVIRONMENT", "production")
    debug: bool = os.getenv("DEBUG", "false").lower() in ("true", "1", "yes")

    # Production Server settings - Default to 0.0.0.0 for containerized / Render binding
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", "8000"))

    # Ingestion & Upload limits
    max_upload_bytes: int = int(
        os.getenv("MAX_UPLOAD_BYTES", str(50 * 1024 * 1024))
    )  # 50 MB default
    allowed_extensions: List[str] = [".pcap", ".pcapng"]
    max_sampled_packets: int = 150

    # CORS settings
    cors_origins: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    model_config = SettingsConfigDict(
        env_prefix="NEXAPTRA_",
        env_file=".env",
        extra="ignore",
    )


@lru_cache()
def get_settings() -> Settings:
    """Return a cached singleton instance of application settings."""
    settings = Settings()
    extra_cors = os.getenv("CORS_ORIGINS")
    if extra_cors:
        origins = [orig.strip() for orig in extra_cors.split(",") if orig.strip()]
        settings.cors_origins.extend(origins)
    return settings
