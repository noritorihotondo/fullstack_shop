FROM node:17-alpine

WORKDIR /client

COPY package.json ./

RUN npm install

COPY src .

CMD ["npm", "start"]