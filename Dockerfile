FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm install -g tailwindcss

RUN npm run build:css

RUN npm prune --production

CMD ["npm", "start"]
