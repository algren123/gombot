FROM node:16

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle App Source
COPY . .

RUN node dbInit.js
RUN node dbObjects.js
RUN node deploy-commands.js

CMD ["npm", "start"]