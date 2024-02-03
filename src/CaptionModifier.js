const Config = require("../config");
const GptResponse = require("./OpenAi");
class CationModifier {
  static async modifyCaption(caption) {
    try {
      const chatGptApi = new GptResponse(Config.OPEN_AI_KEY);
      const cap = Config.CHATGPT_PROMPT + '"""' + caption + '"""';
      const response = await chatGptApi.callAi(cap);
      console.log(response);
      return caption + " \n " + response.join(" ");
    } catch (e) {
      return caption;
    }
  }
}

module.exports = CationModifier;
