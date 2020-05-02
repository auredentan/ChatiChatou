FROM python:3.7

RUN pip install fastapi uvicorn

EXPOSE 80

COPY ./chat /chat

CMD ["uvicorn", "app.main:create_app()", "--host", "0.0.0.0", "--port", "80"]
