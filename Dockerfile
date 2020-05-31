FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY public ./public
COPY src ./src
RUN yarn build

EXPOSE 3000
CMD [ "npx", "serve", "-l", "3000", "build" ]
