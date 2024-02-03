const { default: OpenAI } = require("openai");

class GptResponse {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async callAi(content) {
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: content }],
      model: "gpt-3.5-turbo",
    });
    const rawResp = chatCompletion.choices[0].message.content;
    const { hashtags } = JSON.parse(rawResp);
    return hashtags;
  }
}

module.exports = GptResponse;
