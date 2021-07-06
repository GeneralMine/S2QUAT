FROM node:latest

WORKDIR /app

EXPOSE 23010

COPY package*.json .

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

ENTRYPOINT [ "node", "build" ]
