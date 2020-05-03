# -*- coding: utf-8 -*-
import asyncio
import logging

import aioredis
from starlette.endpoints import WebSocketEndpoint


class WebSocketEndpointCustom(WebSocketEndpoint):
    channel = None

    async def on_connect(self, websocket):
        chat_id = websocket.path_params.get("chat_id")
        if not chat_id:
            logging.warning(f"No chat id provided")
            await websocket.close()
        self.channel = f"chat:{chat_id}"

        self.pub = await aioredis.create_redis("redis://localhost")
        self.sub = await aioredis.create_redis("redis://localhost")
        (self.sub_channel,) = await self.sub.subscribe(self.channel)

        await websocket.accept()

        asyncio.gather(self.receive_data(websocket))

    async def publish_data(self, data):
        await self.pub.publish(self.channel, data)

    async def receive_data(self, websocket):
        async for message in self.sub_channel.iter():
            await websocket.send_json({"message": message.decode("utf8")})

    async def on_receive(self, websocket, data):
        await self.publish_data(data)

    async def on_disconnect(self, websocket, close_code):
        await websocket.close()
        await self.sub.unsubscribe(self.channel)
        self.sub.close()
        self.pub.close()
        await self.pub.wait_closed()
        await self.sub.wait_closed()
