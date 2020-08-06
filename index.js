require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();

let API_KEY = process.env.API_KEY;
// using dotenv to hide our API key

app.set("view engine", "ejs");
// using ejs as the view engine for rendering ejs files
app.use(express.static("static"));
// express using static to access CSS

app.get("/", (req, res) => {
  let qs = {
    params: {
      s: "star wars",
      apikey: API_KEY,
    },
  };
  axios
    .get("http://www.omdbapi.com", qs)
    .then((response) => {
      console.log(response.data);
      let episodes = response.data.Search;
      // setting variable to our data
      res.render("home", { episodes });
      // render home with the data
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000);
