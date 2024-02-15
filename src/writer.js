OpenAI = require("openai");

async function writePullRequest({ template, diffs, apiKey, organizationId }) {
  if (!apiKey) {
    throw "Open AI key not configured. Please add $OPENAI_API_KEY it to your .env file and try again.";
  }

  if (!organizationId) {
    throw "Organization ID key not configured. Please add $OPENAI_ORGANIZATION_ID it to your .env file and try again.";
  }

  const openai = new OpenAI({
    apiKey,
    organization: organizationId,
  });

  const content =
    "Using the following template:" +
    decodeURIComponent(template) +
    "Write a detailed Pull request in markdown taking in consideration the code changes below" +
    decodeURIComponent(diffs);
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content }],
      model: "gpt-3.5-turbo-0125",
    });
    const response = completion.choices[0]?.message;
    if (!response?.content) {
      throw "There was an error processing your pull request";
    }
    return "\n\n\n" + decodeURIComponent(response?.content + "\n\n\n");
  } catch (e) {
    console.error(e);
    const response = "Could not connect with ChatGPT";
    return response;
  }
}

module.exports = { writePullRequest };
