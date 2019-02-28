const express = require("express");
const config = require("./config");
const { jsonBodyParser, headers } = require("./express-config");
const {
  popularMoviesRoute,
  relatedMoviesRoute,
  movieRoute,
  searchMoviesRoute
} = require("./routes");

// Setup
const app = express();
app.use(jsonBodyParser);
app.use(headers);

// Routes
app.get("/movies/popular", popularMoviesRoute);
app.get("/movies/related/:id", relatedMoviesRoute);
app.get("/movies/:id", movieRoute);
app.get("/search/movies", searchMoviesRoute);

app.listen(config.PORT, () =>
  console.log(`App listening on port ${config.PORT}!`)
);
