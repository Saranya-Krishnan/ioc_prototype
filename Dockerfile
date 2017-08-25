FROM node:boron

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE [3000, 3030, 7687]
CMD [ "npm", "start" ]