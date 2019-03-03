const express = require("express");
const config = require("./config");
const { jsonBodyParser, headers } = require("./express-config");
const {
  moviesRoute,
  popularMoviesRoute,
  relatedMoviesRoute,
  trendingRoute,
  movieRoute,
  searchMoviesRoute,
  personsRoute,
  personRoute,
  genresRoute
} = require("./routes");

// Setup
const app = express();
app.use(jsonBodyParser);
app.use(headers);

// popular, latest, now-playing, top-rated, upcoming, trending
app.get("/movies/categories/trending", trendingRoute);
app.get("/movies/categories/:category", moviesRoute);
app.get("/movies/related/:id", relatedMoviesRoute);
app.get("/movies/:id", movieRoute);

app.get("/search/movies", searchMoviesRoute);

// trending, popular
app.get("/persons/categories/trending", trendingRoute);
app.get("/persons/categories/:category", personsRoute);
app.get("/persons/:id", personRoute);

app.get("/genres/:id", genresRoute);
// Genre
// /discover/movie

app.listen(config.PORT, () =>
  console.log(`App listening on port ${config.PORT}!`)
);
