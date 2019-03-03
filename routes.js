const axios = require("axios");
const config = require("./config");
const { redisGet, redisSet } = require("./redis");

const apiKeyParameter = `api_key=${config.moviedbApiKey}`;

const moviesRoute = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    let { category } = req.params;
    category = category.replace("-", "_");

    if (page >= 1 || page < 3) {
      const cached = await redisGet(`/movies/${category}&page=${page}`);
      if (cached) {
        console.log("cached ", cached);
        res.send(cached);
        return;
      }
    }

    const apiData = await axios.get(
      `${config.moviedbUrl}/movie/${category}?${apiKeyParameter}&page=${page}`
    );

    redisSet(`/movies/${category}&page=${page}`, JSON.stringify(apiData.data));

    res.send(apiData.data);
  } catch (err) {
    console.log(err);
  }
};

const trendingRoute = async (req, res) => {
  try {
    const map = {
      movies: "movie",
      persons: "person"
    };

    const mediaType = map[req.url.split("/")[1]];

    const { page = 1 } = req.query;
    const apiData = await axios.get(
      `${
        config.moviedbUrl
      }/trending/${mediaType}/day?${apiKeyParameter}&page=${page}`
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

  const apiData = axios.get(
    `${config.moviedbUrl}/movie/${id}?${apiKeyParameter}`
  );
  const castData = axios.get(
    `${config.moviedbUrl}/movie/${id}/credits?${apiKeyParameter}`
  );
  const movieData = await Promise.all([apiData, castData]);
  const cast = movieData[1].data.cast
    .sort((a, b) => a.cast_id - b.cast_id)
    .slice(0, 20);

  // TODO: Error handling
  res.send({ ...movieData[0].data, cast });
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

const personsRoute = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    let { category } = req.params;
    category = category.replace("-", "_");

    if (page >= 1 || page < 3) {
      const cached = await redisGet(`/person/${category}&page=${page}`);
      if (cached) {
        res.send(cached);
        return;
      }
    }

    const apiData = await axios.get(
      `${config.moviedbUrl}/person/${category}?${apiKeyParameter}&page=${page}`
    );

    redisSet(`/movies/${category}&page=${page}`, JSON.stringify(apiData.data));

    res.send(apiData.data);
  } catch (err) {
    console.log(err);
  }
};

const personRoute = async (req, res) => {
  const { id } = req.params;

  const personData = axios.get(
    `${config.moviedbUrl}/person/${id}?${apiKeyParameter}`
  );

  const movieData = axios.get(
    `${config.moviedbUrl}/person/${id}/movie_credits?${apiKeyParameter}`
  );

  const data = await Promise.all([personData, movieData]);

  // TODO: Error handling
  res.send({ ...data[0].data, roles: data[1].data.cast });
};

const genresRoute = async (req, res) => {
  const { id } = req.params;
  const { page = 1 } = req.query;

  const data = await axios.get(
    `${
      config.moviedbUrl
    }/discover/movie?with_genres=${id}&sort_by=popularity.desc&page=${page}&${apiKeyParameter}`
  );

  // TODO: Error handling
  res.send(data.data);
};

module.exports = {
  trendingRoute,
  searchMoviesRoute,
  relatedMoviesRoute,
  moviesRoute,
  movieRoute,
  personsRoute,
  personRoute,
  genresRoute
};
