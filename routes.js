const axios = require("axios");
const config = require("./config");
const apiKeyParameter = `api_key=${config.moviedbApiKey}`;

const moviesRoute = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    let { category } = req.params;
    category = category.replace("-", "_");

    const apiData = await axios.get(
      `${config.moviedbUrl}/movie/${category}?${apiKeyParameter}&page=${page}`
    );

    res.send(apiData.data);
  } catch (err) {
    console.log(err);
  }
};

const trendingRoute = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const apiData = await axios.get(
      `${config.moviedbUrl}/trending/movie/day?${apiKeyParameter}&page=${page}`
    );

    res.send(apiData.data);
  } catch (err) {
    console.log(err);
  }
};

const relatedMoviesRoute = async (req, res) => {
  const { id } = req.params;
  const { page = 1 } = req.query;
  const apiData = await axios.get(
    `${config.moviedbUrl}/movie/${id}/similar?${apiKeyParameter}&page=${page}`
  );

  // TODO: Error handling
  res.send(apiData.data);
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
  moviesRoute,
  trendingRoute,
  movieRoute,
  searchMoviesRoute,
  relatedMoviesRoute
};
