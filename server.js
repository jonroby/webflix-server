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
app.get("/movies/popular", moviesRoute);
app.get("/movies/now-playing", moviesRoute);
app.get("/movies/top-rated", moviesRoute);
app.get("/movies/popular", moviesRoute);
app.get("/movies/upcoming", moviesRoute);
app.get("/movies/latest", moviesRoute);

app.get("/movies/trending", trendingRoute); // Different

app.get("/movies/related/:id", relatedMoviesRoute);

app.get("/movies/:id", movieRoute);
app.get("/search/movies", searchMoviesRoute);

app.listen(config.PORT, () =>
  console.log(`App listening on port ${config.PORT}!`)
);
