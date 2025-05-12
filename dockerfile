FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY src ./src
EXPOSE 5050
CMD ["node", "src/index.js"]