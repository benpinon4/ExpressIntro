const express = require("express");
const { route } = require("express/lib/application");
const app = express();
const port = 3000;
const today = new Date();
const favoriteMovieList = ["Starship Troopers", "Black Hawk Down"];



const movieString = favoriteMovieList.toString();

app.get("/", (req, res) => {
  console.log("default route");
  res.send("Ben Piñon\n" + today);
});
app.get("/Movie-List", (req, res) => {
  console.log("movie string route");
  res.send(movieString);
});
app.get("/user-info", (req, res) => {
  console.log("user-info");
  console.log(req.query);
  res.send("User Info:  " + req.query.firstName + " " + req.query.lastName);
});
app.get("/add-movie", (req, res) => {
  res.send("Added Movies: " + req.query.newMovie);
  if (req.query.newMovie !== undefined) {//Condition checking to see if req.query.newMovie is undfined if so push into favoriteMovieList array.
    favoriteMovieList.push(req.query.newMovie);
    req.query.newMovie = undefined;//switch back to undefined so when return to add-movies it does not push undefined into favoriteMovieList array.
  }
});

app.get("/show-movies", (req, res) => {
  let finalListString = "";
  for (let i = 0; i < favoriteMovieList.length-1; i++) {//converting movie list from array into string
    finalListString += `${favoriteMovieList[i]}, `;
  }
  finalListString += favoriteMovieList[favoriteMovieList.length-1] //adding most current and last movie list item with no comma at the end.
  res.send("Full Movie List: " + finalListString); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
