require("dotenv").config();

const Config = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  BUFFER_AUTH: process.env.BUFFER_TOKEN,
  BUFFER_API: "https://api.bufferapp.com/1",
  Profiles: process.env.PROFILE_IDS,
};

module.exports = Config;
