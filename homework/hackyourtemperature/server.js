import express, { urlencoded } from "express";
import fetch from "node-fetch";
import { keys } from "./sources/keys.js";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("<h1>Hello from backend to frontend!</h1>");
});
app.post("/:cityName", async (req, res) => {
  try {
    const key = keys.appKey;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&&appid=${key}`;
    const apiData = await fetch(api);
    if (apiData.ok) {
      const jsonData = await apiData.json();
      const kelvin = jsonData.main.temp;
      const celsius = kelvin - 273.15;
      const fixedCelsius = celsius.toFixed(2);
      res.send({
        cityName: jsonData.name,
        temperature: `${fixedCelsius} C`,
      });
    } else {
      throw new Error("City not found");
    }
  } catch (er) {
    res.send(er.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
