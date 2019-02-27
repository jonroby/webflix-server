const express = require("express");
const { jsonBodyParser, headers } = "./app-config";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(jsonBodyParser);
app.use(headers);

app.get("/", (req, res) => res.send("Hello"));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
