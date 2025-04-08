require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.post('/', async (req, res) => {
  const city = req.body.city || 'Paris';
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&appid=${apiKey}&units=metric&lang=fr`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const weather = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };

    res.render('index', { weather, error: null });
  } catch (error) {
    res.render('index', { weather: null, error: "Ville non trouvée ou erreur API." });
  }
});

app.listen(PORT, () => {
  console.log(`App météo en cours sur http://localhost:${PORT}`);
});
