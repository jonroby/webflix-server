const bodyParser = require("body-parser");

const jsonBodyParser = bodyParser.json();
const allow =
  process.env.NODE_ENV === "production"
    ? "https://safe-caverns-26267.herokuapp.com/"
    : "*";

const headers = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

module.exports = { jsonBodyParser, headers };
