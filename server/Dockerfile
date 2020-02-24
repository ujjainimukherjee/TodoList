FROM node:10

RUN mkdir -p /app
WORKDIR /app

COPY src /app/src
COPY db /app/db
COPY package*.json /app/

RUN npm i
#RUN npm ci
