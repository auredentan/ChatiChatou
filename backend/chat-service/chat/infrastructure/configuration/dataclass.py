from dataclasses import dataclass


@dataclass(frozen=True)
class Configuration:

    redis_host: str = "0.0.0.0"
    redis_port: int = 6379
    redis_name: str = "0"

    log_level: str = "INFO"
