import './style.css';

// API Key
const apiKey = "47ccb935237767e0f4df6e5e6566c882";

// Récupération des éléments du DOM
const form = document.getElementById("form-data");
const resultsContainer = document.getElementById("results");

// Fonction pour mapper les descriptions météo à des icônes Font Awesome
const getWeatherIcon = (weather) => {
  if (weather.includes("cloud")) return "fa-cloud";
  if (weather.includes("sun") || weather.includes("clear")) return "fa-sun";
  if (weather.includes("rain")) return "fa-cloud-showers-heavy";
  if (weather.includes("snow")) return "fa-snowflake";
  return "fa-smog"; // retourner une icône par défaut
};

// Fonction pour convertir les températures de Kelvin à Celsius
const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

// Fonction pour récupérer les coordonnées géographiques d'une ville
const fetchGeoCoordinates = async (city) => {
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const geoResponse = await fetch(geoUrl);
  if (!geoResponse.ok) {
    throw new Error(`Erreur HTTP : ${geoResponse.status}`);
  }
  const geoData = await geoResponse.json();
  if (geoData.length === 0) {
    throw new Error(`Aucune donnée trouvée pour la localisation : ${city}`);
  }
  return geoData[0];
};

// Fonction pour récupérer les données météo d'une ville à partir de ses coordonnées
const fetchWeatherData = async (lat, lon) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const weatherResponse = await fetch(weatherUrl);
  if (!weatherResponse.ok) {
    throw new Error(`Erreur HTTP : ${weatherResponse.status}`);
  }
  return await weatherResponse.json();
};

// Fonction principale pour gérer le formulaire
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page

  // Réinitialiser le conteneur des résultats
  resultsContainer.innerHTML = '';

  // Récupérer les valeurs des champs
  const city1 = document.getElementById("city1").value.trim();
  const city2 = document.getElementById("city2").value.trim();
  const city3 = document.getElementById("city3").value.trim();

  // Créer un tableau avec les villes
  const cities = [city1, city2, city3];

  // Traiter chaque ville
  for (const [index, city] of cities.entries()) {
    if (!city) {
      console.log(`Le champ city${index + 1} est vide. Ignoré.`);
      continue;
    }

    // Ajouter une carte temporaire pour indiquer le chargement
    const cityCard = document.createElement('div');
    cityCard.className = 'city-card';
    cityCard.innerHTML = `
      <div class="city-name">${city}</div>
      <div class="loading">Chargement des données...</div>
    `;
    resultsContainer.appendChild(cityCard);

    try {
      console.log(`Recherche des coordonnées pour ${city}...`);

      // Étape 1 : Récupérer les coordonnées de la ville
      const { lat, lon } = await fetchGeoCoordinates(city);

      console.log(`Coordonnées pour ${city} : lat=${lat}, lon=${lon}`);

      // Étape 2 : Récupérer les données météo pour la ville
      console.log(`Recherche des données météo pour ${city}...`);
      const weatherData = await fetchWeatherData(lat, lon);

      // Extraire les données utiles
      const temperature = kelvinToCelsius(weatherData.main.temp);
      const weatherDescription = weatherData.weather[0].description;
      const iconClass = getWeatherIcon(weatherDescription.toLowerCase());

      console.log(`Météo pour ${city} : ${temperature}°C, ${weatherDescription}`);

      // Mettre à jour le contenu de la carte
      cityCard.innerHTML = `
        <div class="city-name">${city}</div>
        <div class="temperature">${temperature}°C</div>
        <div class="condition">
          <i class="fas ${iconClass}"></i> ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
        </div>
      `;
    } catch (error) {
      // En cas d'erreur, afficher un message d'erreur dans la carte
      cityCard.innerHTML = `
        <div class="city-name">${city}</div>
        <div class="error">Erreur : ${error.message}</div>
      `;
      console.error(`Erreur lors du traitement de la ville ${city} :`, error);
    }
  }

  console.log("Toutes les villes ont été traitées.");
});