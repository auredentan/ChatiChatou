import logging


def setup(level: str) -> None:
    logging.basicConfig(level=level, format="%(asctime)s %(levelname)s %(message)s")
