FROM node AS build-stage

WORKDIR /app

COPY . .

RUN npm install && npm run build
RUN npm install -g serve

RUN cp serve.json ./build/serve.json

ENTRYPOINT ["serve", "-p", "8080", "./build/"]
