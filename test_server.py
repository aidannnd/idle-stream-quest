import asyncio
import websockets
import json

async def send_messages(websocket):
    await asyncio.sleep(1)
    await websocket.send(json.dumps({"event": "join", "username": "TestViewer"}))
    await asyncio.sleep(5)

async def handler(websocket):
    await send_messages(websocket)

async def main():
    async with websockets.serve(handler, "localhost", 8080):
        print("WebSocket server running on ws://localhost:8080")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
