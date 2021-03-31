FROM node:latest

EXPOSE 23011

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]