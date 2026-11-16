"""Application configuration settings for NetScope."""

from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuration loaded from environment variables with safe defaults."""

    app_name: str = "NetScope"
    app_version: str = "0.1.0"
    app_description: str = (
        "AI-Driven Network Traffic Analysis and Intelligent PCAP Forensics Platform"
    )
    environment: str = "development"
    debug: bool = False

    # Server settings
    host: str = "127.0.0.1"
    port: int = 8000

    # Ingestion & Upload limits
    # Default 25 MB max upload for Phase 1 local MVP
    max_upload_bytes: int = 25 * 1024 * 1024
    allowed_extensions: List[str] = [".pcap", ".pcapng"]
    max_sampled_packets: int = 100

    # CORS settings
    cors_origins: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    model_config = SettingsConfigDict(
        env_prefix="NETSCOPE_",
        env_file=".env",
        extra="ignore",
    )


@lru_cache()
def get_settings() -> Settings:
    """Return a cached singleton instance of application settings."""
    return Settings()
