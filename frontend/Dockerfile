# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app

# On augmente les timeouts et on retire le lockfile
COPY package.json ./

# Configuration de npm pour être plus patient avec le réseau
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine
# Copie notre configuration personnalisée pour gérer le routage React
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
