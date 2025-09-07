import { BufferApi } from "./BufferApi";
import CaptionModifier from "./CaptionModifier";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Expected POST", { status: 405 });
    }

    try {
      const { caption, profile_ids, media, caption_modifier } = await request.json();

      if (!caption || !profile_ids) {
        return new Response("Missing caption or profile_ids", { status: 400 });
      }

      const buffer = new BufferApi(env.BUFFER_AUTH);
      let finalCaption = caption;

      if (caption_modifier) {
        finalCaption = await CaptionModifier.modifyCaption(caption, env.OPEN_AI_KEY);
      }

      const bufferResponse = await buffer.postToBuffer(profile_ids, finalCaption, true, media);

      return new Response(JSON.stringify(bufferResponse), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return new Response("An error occurred", { status: 500 });
    }
  },
};
