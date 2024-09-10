FROM node:21.7.3-alpine

WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview", "--", "--port", "3000"]

