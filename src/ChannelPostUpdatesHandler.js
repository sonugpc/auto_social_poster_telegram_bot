const Config = require("../config");
const { BufferApi } = require("./BufferApi");

const handleChannelPostHandler = async (ctx) => {
  const buffer = new BufferApi(Config.BUFFER_API);

  if (ctx.channelPost.text) {
    await buffer.postToBuffer(
      Config.Profiles,
      ctx.channelPost.text,
      true,
      null
    );
  } else if (ctx.channelPost.photo) {
    const media = await ctx.telegram.getFileLink(
      ctx.channelPost.photo[2].file_id
    );
    await buffer.postToBuffer(
      Config.Profiles,
      ctx.channelPost.caption,
      true,
      media.href
    );
  }
};

module.exports = handleChannelPostHandler;
