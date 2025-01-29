FROM node:18 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18 AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]