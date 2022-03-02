FROM node:14.18.0-alpine

WORKDIR /educatbook


COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./build ./server

EXPOSE 3003

CMD ["node", "./server/src/index.js"]