FROM node:latest

WORKDIR /app

EXPOSE 23011

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

ENTRYPOINT [ "npm", "start" ]