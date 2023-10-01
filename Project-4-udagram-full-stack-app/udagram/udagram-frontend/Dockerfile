FROM node:14

WORKDIR /app/udagram-frontend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]