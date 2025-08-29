// server/index.js
import 'dotenv/config'
import express from 'express'
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

const app = express()
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// base model used by several routes
const baseModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  systemInstruction:
    'You are Inkwise AI, an assistant that writes ATS-friendly resume content in LaTeX or Markdown.'
})

app.post('/system-user', async (req, res) => {
  try {
    const { role, skills } = req.body;

    // user prompt crafted dynamically
    const userPrompt = `Write a 3-line resume summary for a ${role}. 
Highlight these skills: ${skills.join(', ')}.
Respond only in Markdown.`;

    const result = await baseModel.generateContent(userPrompt);
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('API on :3000'))
