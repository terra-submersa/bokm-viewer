FROM node:lts-alpine

RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

COPY ./dist .


EXPOSE 8080
CMD [ "http-server", "." ]