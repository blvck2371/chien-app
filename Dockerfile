# Utilise une image officielle de Node.js
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
RUN npm install

COPY . .

# Expose le port
EXPOSE 3000

# Lancer l'application
CMD ["node", "app.js"]
