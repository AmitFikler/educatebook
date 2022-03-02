FROM node:14.18.0-alpine
WORKDIR /educatbook-client
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

