FROM node:latest

EXPOSE 21020

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install && npm ls

COPY . /app

RUN npm run build

ENTRYPOINT [ "npm", "start" ]