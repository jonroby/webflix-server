const config = {
  PORT: process.env.PORT || 4000,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  moviedbApiKey: process.env.api_key,
  moviedbUrl: "https://api.themoviedb.org/3"
};

module.exports = config;
