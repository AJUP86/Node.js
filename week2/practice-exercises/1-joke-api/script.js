import express from "express";
import fetch from "node-fetch";
const app = express();

/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */

function printChuckNorrisJoke() {
  app.get("/joke", async (req, res) => {
    try {
      const randomJoke = await fetch("http://api.icndb.com/jokes/random");
      const data = await randomJoke.json();
      if (data.value.joke) {
        res.send(data.value.joke);
      } else {
        throw new Error();
      }
    } catch (er) {
      console.log(er.message);
    }
  });
}

printChuckNorrisJoke();
app.listen(3000);
