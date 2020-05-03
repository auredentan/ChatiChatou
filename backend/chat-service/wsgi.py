import uvicorn

from chat.main import create_app

application = create_app()

if __name__ == "__main__":
    uvicorn.run("wsgi:application", host="localhost", port=8082, reload=True)
