FROM node:16

WORKDIR /app
COPY package.json /app/package.json

#необходимо для bcrypt
RUN apt-get update -y
RUN apt-get install -y build-essential python

RUN npm install --production

COPY . /app

RUN npm run build

EXPOSE 8080
CMD [ "node", "index.js" ]