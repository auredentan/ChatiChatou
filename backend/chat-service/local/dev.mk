dev_fastapi: #HELP Start a fastapi dev server
	./venv/bin/uvicorn wsgi:application --reload
