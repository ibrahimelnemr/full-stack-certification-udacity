FROM node:14

COPY udagram-backend/package*.json ./

RUN npm install

COPY udagram-backend/ .

CMD ["npm", "start"]