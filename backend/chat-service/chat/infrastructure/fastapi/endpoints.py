import logging
from fastapi import APIRouter, WebSocket

base_router = APIRouter()


@base_router.get("/")
def index():
    logging.info(f"Hello world !")
    return "Hello world"


chat_router = APIRouter()


@chat_router.websocket("/")
async def chat_websocket(websocket: WebSocket):

    # TODO: validate before accepting

    await websocket.accept()

    # TODO: Connect and use aioredis pubusb as chat backend
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
