FROM node:latest

EXPOSE 23010

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "npm", "start" ]