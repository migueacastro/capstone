FROM python:3.10-bullseye
ENV PYTHONUNBUFFERED=1
WORKDIR /backend



COPY . /backend
RUN pip install -r requirements.txt
RUN ls /backend

EXPOSE 8000