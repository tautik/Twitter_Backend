FROM node:latest

WORKDIR /usr/proj

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm","start" ]