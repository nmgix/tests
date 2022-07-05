FROM node:12-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app

ARG REACT_APP_GOOGLE_API
ARG REACT_APP_GOOGLE_BOOKS_URL
ARG REACT_APP_MAX_RESULTS

ENV REACT_APP_GOOGLE_API=$REACT_APP_GOOGLE_API
ENV REACT_APP_GOOGLE_BOOKS_URL=$REACT_APP_GOOGLE_BOOKS_URL
ENV REACT_APP_MAX_RESULTS=$REACT_APP_MAX_RESULTS

RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]