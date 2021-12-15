FROM node:12

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle App Source
COPY . .

CMD ["npm", "start"]