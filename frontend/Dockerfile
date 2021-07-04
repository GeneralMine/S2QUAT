FROM node:latest

WORKDIR /app

EXPOSE 23010

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENTRYPOINT [ "node", "./build" ]
