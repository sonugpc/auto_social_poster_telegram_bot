const Config = require("../config");
const { BufferApi } = require("./BufferApi");
const CaptionModifier = require("./CaptionModifier");
const handleChannelPostHandler = async (ctx) => {
  
  const buffer = new BufferApi(Config.BUFFER_API);

  if (ctx.channelPost.text) {
    const text =ctx.channelPost.text;
    await buffer.postToBuffer(Config.Profiles, text, true, null);
  } else if (ctx.channelPost.photo) {
    const text =ctx.channelPost.caption

    const media = await ctx.telegram.getFileLink(
      ctx.channelPost.photo[2].file_id
    );
    await buffer.postToBuffer(Config.Profiles, text, true, media.href);
  }
};

const handleDirectPostHandler = async (ctx) => {
  const buffer = new BufferApi(Config.BUFFER_API);

  if (ctx.message.text) {
    const text = await CaptionModifier.modifyCaption(ctx.message.text);
    await buffer.postToBuffer(Config.Profiles, text, true, null);
  }
};

const blackListWords = ['loot', 'Loot'];

module.exports = { handleChannelPostHandler, handleDirectPostHandler };
