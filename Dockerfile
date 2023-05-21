FROM node:16.15.0-alpine AS development
WORKDIR /mountain-back
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm ci
COPY src/ src/
RUN npm run build

FROM node:16.15.0-alpine AS production
WORKDIR /mountain-back
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=development /mountain-back/dist/ ./dist/

EXPOSE 5002
RUN mkdir -p /mountain-back/public/images
CMD [ "node", "dist/main.js" ]
