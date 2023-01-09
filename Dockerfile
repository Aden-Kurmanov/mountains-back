FROM node:16.15.0-alpine AS development
WORKDIR /app
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm ci
COPY src/ src/
RUN npm run build

FROM node:16.15.0-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=development /app/dist/ ./dist/

EXPOSE 5002
CMD [ "node", "dist/main.js" ]
