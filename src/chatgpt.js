const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
export default openai;
