FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . . 
RUN npm run build

ENV NODE_ENV=production
ENV PORT=$PORT

EXPOSE $PORT

CMD ["npm", "run", "start"]