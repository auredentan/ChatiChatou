import asyncio
import aioredis

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from chat.infrastructure import logger, configuration

from chat.infrastructure.fastapi.endpoints import base_router
from chat.infrastructure.fastapi.customWebsocketEndpoint import WebSocketEndpointCustom


def create_app():

    conf = configuration.get()
    logger.setup(conf.log_level)

    app = FastAPI()

    @app.on_event("startup")
    async def startup_event():
        try:
            app.redis_cache = await aioredis.create_redis("redis://localhost:6379")
        except Exception:
            asyncio.get_event_loop().stop()
            asyncio.get_event_loop().close()

    app.add_middleware(CORSMiddleware, allow_origins=["*"])
    app.include_router(base_router, tags=["index"])
    app.add_websocket_route("/chat/ws/{chat_id}", WebSocketEndpointCustom)

    return app
