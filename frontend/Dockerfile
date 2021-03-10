FROM node:latest

EXPOSE 23010

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install && npm ls

COPY . /app

RUN npm run build

ENTRYPOINT [ "npm", "start" ]