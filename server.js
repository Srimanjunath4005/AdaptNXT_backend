const express = require('express');
const request = require('request');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log("Server running at 3000"));

app.get('/', (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).send({ error: "City is required" });
    }

    const apiKey = 'ada2e396266e60a1e0ad014368c8d9a2';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    request(apiUrl, (error, response, body) => {
        if (error) {
            return res.status(500).send({ error: "Failed to fetch weather data" });
        }

        if (response.statusCode === 200) {
            const weatherData = JSON.parse(body); 
            res.send(`
                City: ${weatherData.name}<br>
                Weather: ${weatherData.weather[0].description}<br>
                Temp: ${weatherData.main.temp}<br>
                Humidity: ${weatherData.main.humidity}<br>
                Wind Speed: ${weatherData.wind.speed}`);
        } else {
            res.status(response.statusCode).send({ error: "City not found or API request failed" });
        }
    });
});