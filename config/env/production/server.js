// Path: ./config/env/production/server.js`

module.exports = ({ env }) => ({
  host: env("HOST"),
  port: env.int("PORT"),
  url: env("MY_HEROKU_URL"),
});
