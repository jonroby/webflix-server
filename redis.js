const redis = require("redis");
const { promisify } = require("util");
const config = require("./config");

const client = redis.createClient(config.REDIS_PORT);

const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);

module.exports = { redisGet, redisSet };
