FROM node:16

WORKDIR /app
COPY package.json /app/package.json
RUN npm cache clean --force && rm -rf node_modules && npm install --only=prod
COPY . /app

RUN npm run build

EXPOSE 8080
CMD [ "node", "index.js" ]