require("dotenv").config();

const Config = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  BUFFER_AUTH: process.env.BUFFER_TOKEN,
  BUFFER_API: "https://api.bufferapp.com/1",
  Profiles: process.env.PROFILE_IDS.split(","),
  shouldAddHashTags: true,
  OPEN_AI_KEY: process.env.OPENAI_API_KEY,
  CHATGPT_PROMPT:
    "Please Provide upto 4 Trending Hashtags to post on twitter & facebook for following text . The response should always be in JSON format like {hashtags:[array of hashtags]}, Please add # before each hashtag.",
};

module.exports = Config;
