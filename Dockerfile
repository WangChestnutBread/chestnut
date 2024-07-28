FROM nginx:alpine
LABEL authors="KIM AREUM"

COPY ./fontend/build /usr/share/nginx/html
COPY ./images /usr/share/nginx/html/images
COPY nginx.conf.template /etc/nginx/nginx.conf.template

EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]