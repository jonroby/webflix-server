const express = require("express");
const config = require("./config");
const { jsonBodyParser, headers } = require("./express-config");
const {
  moviesRoute,
  popularMoviesRoute,
  relatedMoviesRoute,
  trendingRoute,
  movieRoute,
  searchMoviesRoute
} = require("./routes");

// Setup
const app = express();
app.use(jsonBodyParser);
app.use(headers);

// Routes
app.get("/movies/categories/trending", trendingRoute);
app.get("/movies/categories/:category", moviesRoute);
app.get("/movies/related/:id", relatedMoviesRoute);
app.get("/movies/:id", movieRoute);
app.get("/search/movies", searchMoviesRoute);

app.listen(config.PORT, () =>
  console.log(`App listening on port ${config.PORT}!`)
);
