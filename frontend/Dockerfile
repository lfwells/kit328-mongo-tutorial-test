FROM node:20-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all application files (including server.js and public folder)
COPY . .

# 1. Accept the build argument from docker-compose
ARG REPO_NAME
# 2. Convert it to a real environment variable that Node/Vite can read
ENV REPO_NAME=$REPO_NAME

RUN npm run build

EXPOSE 3000
CMD ["node", "server.js"]