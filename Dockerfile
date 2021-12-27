FROM node:current-alpine3.14

WORKDIR /usr/src/app
RUN npm i -g serve
COPY build/ ./
EXPOSE 3000
CMD ["serve", "-s", "-l", "3000"]