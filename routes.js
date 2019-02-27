const axios = require("axios");
const config = require("./config");

const apiKeyParameter = `api_key=${config.moviedbApiKey}`;

const movieRoute = async (req, res) => {
  const { id } = req.params;

  console.log("config ", config);
  const apiData = await axios.get(
    `${config.moviedbUrl}/movie/${id}?${apiKeyParameter}`
  );

  // TODO: Error handling
  res.send(apiData.data);
};

const searchMoviesRoute = async (req, res) => {
  const { queryString, page = 1 } = req.query;
  const apiData = await axios.get(
    `${
      config.moviedbUrl
    }/search/movie?query=${queryString}&${apiKeyParameter}&page=${page}`
  );

  // TODO: Error handling
  res.send(apiData.data);
};

module.exports = { movieRoute, searchMoviesRoute };
