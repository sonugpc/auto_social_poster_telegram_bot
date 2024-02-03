const { Telegraf } = require("telegraf");
const Config = require("../config");
const {
  handleDirectPostHandler,
  handleChannelPostHandler,
} = require("./ChannelPostUpdatesHandler");

const bot = new Telegraf(Config.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("Hello");
});

bot.on("channel_post", (ctx) => {
  handleChannelPostHandler(ctx);
});

bot.on(["message"], (ctx) => {
  if (process.env.env == "dev") handleDirectPostHandler(ctx);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
