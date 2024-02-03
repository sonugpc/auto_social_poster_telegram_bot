const { default: axios } = require("axios");
const Config = require("../config");

const ACTION_URLS = {
  PostUpdates: Config.BUFFER_API + "/updates/create.json",
};
class BufferApi {
  constructor(authToken) {
    this.authToken = authToken;
    this.bufferUrl = Config.BUFFER_API;
  }

  async postToBuffer(profile_ids, text, now, media) {
    try {
      const formdata = new FormData();
      formdata.append("text", text);
      profile_ids.forEach((element) => {
        formdata.append("profile_ids[]", element);
      });
      formdata.append("now", now);
      formdata.append("shorten", "false");
      formdata.append("attachment", "false");
      media && formdata.append("media[photo]", media);
      await this.CallBufferPostAPI(ACTION_URLS.PostUpdates, formdata);
    } catch (error) {
      console.log(error);
    }
  }

  CallBufferPostAPI(endPoint, payload) {
    return axios.post(endPoint, payload, {
      headers: { Authorization: `Bearer ${Config.BUFFER_AUTH}` },
    });
  }
}

module.exports = { BufferApi };
