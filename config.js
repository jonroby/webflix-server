const config = {
  PORT: process.env.PORT || 4000,
  moviedbUrl: "https://api.themoviedb.org/3",
  moviedbApiKey: process.env.api_key
};

module.exports = config;
