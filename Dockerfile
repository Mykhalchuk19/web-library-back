FROM node:12.19.0

WORKDIR /src

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["nodemon", "run", "start"]
