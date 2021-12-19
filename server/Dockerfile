FROM node:14.15

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn run build

CMD node build/index.js