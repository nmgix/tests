FROM node:16

WORKDIR /app
COPY package.json /app/package.json

#необходимо для bcrypt
# RUN apt-get update -y
# RUN apt-get install -y build-essential python

RUN apt-get update  && apt-get install -y build-essential && apt install -y make gcc g++ python && npm install --production

COPY . /app

RUN npm run build

EXPOSE 8080
CMD [ "node", "index.js" ]