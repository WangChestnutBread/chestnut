FROM nginx:alpine
LABEL authors="KIM AREUM"

COPY ./frontend/build /usr/share/nginx/html
COPY ./image /usr/share/nginx/html/images
COPY nginx.conf.template /etc/nginx/nginx.conf.template

EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst '$$DOCKER_TAG_BE $$WEB_SERVER_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]