from fastapi import FastAPI

from chat.infrastructure import logger, configuration
from chat.infrastructure.fastapi.endpoints import chat_router, base_router


def create_app():

    conf = configuration.get()
    logger.setup(conf.log_level)

    redis = await aioredis.create_pool(("localhost", 6379))

    app = FastAPI()

    app.include_router(base_router)
    app.include_router(chat_router, prefix="/chat", tags=["chat"])

    return app
