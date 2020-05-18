# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# view environment variables
RUN printenv

RUN chmod +x /app/scripts/env.sh
RUN /bin/sh /app/scripts/env.sh

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d

RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir -p /etc/nginx/certs

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]