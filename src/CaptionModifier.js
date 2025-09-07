import GptResponse from "./OpenAi";

const CHATGPT_PROMPT = "Please Provide upto 4 Trending Hashtags to post on twitter & facebook for following text . The response should always be in JSON format like {hashtags:[array of hashtags]}, Please add # before each hashtag.";

class CationModifier {
  static async modifyCaption(caption, openAiKey) {
    try {
      const chatGptApi = new GptResponse(openAiKey);
      const cap = CHATGPT_PROMPT + '"""' + caption + '"""';
      const response = await chatGptApi.callAi(cap);
      return caption + " \n " + response.join(" ");
    } catch (e) {
      console.error(e);
      return caption;
    }
  }
}

export default CationModifier;
