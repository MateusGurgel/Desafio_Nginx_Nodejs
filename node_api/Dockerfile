
FROM node:20-alpine


WORKDIR /app 

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 CMD curl --fail http://database:3306 || exit 1