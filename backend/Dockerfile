FROM node:latest

EXPOSE 21021

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]