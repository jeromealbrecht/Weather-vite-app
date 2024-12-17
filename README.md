# Weather Vite App 🌤️

Une application météo simple et moderne, développée avec **HTML**, **CSS**, et **JavaScript**. 

Ce projet utilise **Vite** pour un environnement de développement rapide et léger.

## Fonctionnalités ✨

- Affiche les conditions météorologiques pour plusieurs villes.
- Interface utilisateur élégante et responsive.
- Entrée utilisateur pour rechercher des informations météo.

## Installation 🚀

1. Clonez le dépôt GitHub :

    ```
   git clone git@github.com:jeromealbrecht/Weather-vite-app.git
   cd Weather-vite-app

Installez les dépendances avec npm (si applicable) :

npm install
Lancez l'application en mode développement :

    ```
    npm run dev

Ouvrez votre navigateur et accédez à :

http://localhost:5173

Dockerisation 🐳
Si vous souhaitez exécuter l'application dans un conteneur Docker, suivez ces étapes :

Construisez l'image Docker :

    ```
    docker build -t weather-app .
    
Exécutez le conteneur :

    ```
    docker run -d -p 8080:80 weather-app

Accédez à l'application dans votre navigateur :

http://localhost:8080

Structure du projet 📂

Weather-vite-app/
├── src/
│   └── main.js        # Script principal
├── index.html         # Fichier HTML principal
├── style.css          # Styles CSS
├── Dockerfile         # Configuration Docker
├── package.json       # Gestion des dépendances
└── README.md          # Documentation

