FROM python:3.10-bullseye
ENV PYTHONUNBUFFERED=1
WORKDIR /backend


RUN ls /backend
COPY . /backend
RUN pip install -r requirements.txt


EXPOSE 8000