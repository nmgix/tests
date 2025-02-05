FROM node:latest

WORKDIR /app
COPY package.json /app/package.json
RUN npm cache clean --force && rm -rf node_modules && npm install
COPY . /app

RUN npm run build

CMD [ "node", "index.js" ]