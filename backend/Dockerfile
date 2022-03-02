FROM node:14.18.0-alpine

WORKDIR /educatbook


COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build-ts

EXPOSE 3003

CMD ["node", "./build/src/index.js"]