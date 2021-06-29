FROM node:latest

EXPOSE 23010

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENTRYPOINT [ "node", "./build" ]
