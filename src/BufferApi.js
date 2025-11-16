const ACTION_URLS = {
  PostUpdates: "https://api.bufferapp.com/1/updates/create.json",
};

export class BufferApi {
  constructor(authToken) {
    this.authToken = authToken;
  }

  async postToBuffer(profile_ids, text, now, media, is_reel = false) {
    try {
      const formdata = new FormData();
      formdata.append("text", text);
      profile_ids.forEach((element) => {
        formdata.append("profile_ids[]", element);
      });
      formdata.append("now", now);
      formdata.append("shorten", "false");
      
      if (media) {
        // For videos or images
        formdata.append("media[photo]", media); // Assuming video for reels
      }

      if (is_reel) {
        formdata.append("media[instagram_options][reel]", "true");
      }

      const response = await this.CallBufferPostAPI(ACTION_URLS.PostUpdates, formdata);
      return await response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  CallBufferPostAPI(endPoint, payload) {
    return fetch(endPoint, {
      method: "POST",
      body: payload,
      headers: { Authorization: `Bearer ${this.authToken}` },
    });
  }
}
