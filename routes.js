const axios = require("axios");
const config = require("./config");

const apiKeyParameter = `api_key=${config.moviedbApiKey}`;

const relatedMoviesRoute = async (req, res) => {
  const { id, page = 1 } = req.params;
  const apiData = await axios.get(
    `${config.moviedbUrl}/movie/${id}/similar?${apiKeyParameter}&page=${page}`
  );

  // TODO: Error handling
  res.send(apiData.data);
};

const popularMoviesRoute = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const apiData = await axios.get(
      `${config.moviedbUrl}/movie/popular?${apiKeyParameter}&page=${page}`
    );

    res.send(apiData.data);
  } catch (err) {
    console.log(err);
  }
};

const movieRoute = async (req, res) => {
  const { id } = req.params;

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

module.exports = {
  popularMoviesRoute,
  movieRoute,
  searchMoviesRoute,
  relatedMoviesRoute
};
