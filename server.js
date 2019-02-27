const express = require("express");

const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => res.send("Hello"));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
