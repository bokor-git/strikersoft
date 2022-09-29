FROM node:17
WORKDIR ./api
RUN apt-get update
RUN apt-get install -y openssl

COPY package*.json ./
RUN npm cache clear --force
RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:watch"]