FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY src ./src
COPY public ./public
COPY package*.json /usr/src/app/

RUN npm i
#RUN npm ci
