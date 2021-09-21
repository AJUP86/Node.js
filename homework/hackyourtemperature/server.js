import express, { urlencoded } from "express";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("<h1>Hello from backend to frontend!</h1>");
});
app.post("/weather", (req, res) => {
  const cityName = req.body;
  res.send(cityName);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
