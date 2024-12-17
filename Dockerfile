# Étape 1 : Utiliser une image Nginx comme base
FROM nginx:alpine

# Étape 2 : Copier les fichiers de votre application dans le conteneur
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./style.css /usr/share/nginx/html/style.css
COPY ./src /usr/share/nginx/html/src

# Étape 3 : Exposer le port 80 pour que l'application soit accessible
EXPOSE 80

# Étape 4 : Lancer Nginx (par défaut dans l'image Nginx)
CMD ["nginx", "-g", "daemon off;"]