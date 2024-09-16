FROM nginx:alpine
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf

COPY ./dist /var/www
EXPOSE 80