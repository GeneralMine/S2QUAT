FROM node:latest

EXPOSE 23011

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

ENTRYPOINT [ "npm", "start" ]