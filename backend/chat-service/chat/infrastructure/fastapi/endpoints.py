import logging

from chat.infrastructure.fastapi.routers import base_router


@base_router.get("/")
async def index():
    logging.info(f"Hello world !")
    return "Hello world"
