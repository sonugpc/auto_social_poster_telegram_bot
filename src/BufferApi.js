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
        const url = "https://www.bigtricks.in/BotAPI/assetsLoader/proxy.php?url=" + btoa(media); 
        console.log("MEDIA URL:", url);
        
        formdata.append("media[photo]", url); // Assuming video for reels
      

      if (is_reel) {
        formdata.append("media[instagram_options][reel]", "true");
      }

      const response = await this.CallBufferPostAPI(ACTION_URLS.PostUpdates, formdata);
      const result =  await response.json();
    
      console.log("Buffer Response:", result);
      return result;
    }
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
