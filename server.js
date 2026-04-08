
import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateCode(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a coding AI that generates full-stack web apps.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
}

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const code = await generateCode(prompt);
    res.json({ code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
