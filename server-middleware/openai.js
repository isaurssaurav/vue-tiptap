const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/create-completion", async (req, res) => {
  const { prompt, engine, temperature, max_tokens } = req.body;

  try {
    const response = await openai.createCompletion(engine, {
      prompt,
      temperature: parseInt(temperature),
      max_tokens: parseInt(max_tokens),
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const [resultData] = response.data.choices;

    const { text } = resultData;

    res.json({ result: text });
  } catch (err) {
    res.status(400).send("Ops, Something went wrong!");
  }
});

module.exports = app;
