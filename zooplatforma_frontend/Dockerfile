FROM node:18.17-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY package*.json ./

RUN apk add --no-cache python3 make g++

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.24-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN chmod -R 777 /usr/share/nginx/html
