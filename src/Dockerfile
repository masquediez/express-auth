FROM node:latest

# Erstellen eines Work directories
WORKDIR /usr/src/app

# Kopieren von package.json und package-lock.json in docker app.
COPY package*.json ./


RUN npm install 


# Kopiren des lokalen codes in das Container image.
COPY . .

CMD ["node", "server.js"]

EXPOSE 5151
