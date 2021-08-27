FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk add bash

RUN npm install yarn

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY src ./src
COPY ormconfig.js ./ormconfig.js

RUN yarn build 


EXPOSE 3000
CMD [ ""]