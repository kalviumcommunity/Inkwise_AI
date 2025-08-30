import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Dummy baseModel for demonstration
const baseModel = {
  async generateContent(prompt, options = {}) {
    // Simulate LLM response
    return {
      response: {
        text: () => `**Simulated LLM Output for:** ${prompt}`
      }
    };
  }
};

// 1. System + User Prompt
app.post('/system-user', async (req, res) => {
  try {
    const { role, skills } = req.body;
    const userPrompt = `Write a 3-line resume summary for a ${role}. \nHighlight these skills: ${skills.join(', ')}.\nRespond only in Markdown.`;
    const result = await baseModel.generateContent(userPrompt);
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Zero Shot Prompting
app.post('/zero-shot', async (req, res) => {
  try {
    const { query } = req.body;
    const prompt = `Answer the following question:\n${query}`;
    const result = await baseModel.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. One Shot Prompting
app.post('/one-shot', async (req, res) => {
  try {
    const { query, example } = req.body;
    const prompt = `Example:\nQ: ${example.q}\nA: ${example.a}\n\nNow answer:\nQ: ${query}\nA:`;
    const result = await baseModel.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Multi Shot Prompting
app.post('/multi-shot', async (req, res) => {
  try {
    const { query, examples } = req.body;
    const shots = examples.map(ex => `Q: ${ex.q}\nA: ${ex.a}`).join('\n');
    const prompt = `${shots}\n\nNow answer:\nQ: ${query}\nA:`;
    const result = await baseModel.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Dynamic Prompting
app.post('/dynamic', async (req, res) => {
  try {
    const { query, context } = req.body;
    const prompt = `Context: ${context}\n\nQuestion: ${query}`;
    const result = await baseModel.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Chain of Thought Prompting
app.post('/chain-of-thought', async (req, res) => {
  try {
    const { query } = req.body;
    const prompt = `Let's think step by step to answer:\n${query}`;
    const result = await baseModel.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. LLM Parameters (Temperature, Top P, Top K, Stop Sequence)
app.post('/llm-params', async (req, res) => {
  try {
    const { prompt, temperature, top_p, top_k, stop } = req.body;
    const result = await baseModel.generateContent(prompt, { temperature, top_p, top_k, stop });
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Structured Output
// Added comment for PR visibility
app.post('/structured-output', async (req, res) => {
  try {
    // This endpoint handles structured output prompting
    const { prompt } = req.body;
    const structuredPrompt = `${prompt}\nRespond in JSON format.`;
    const result = await baseModel.generateContent(structuredPrompt);
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Function Calling (Simulated)
app.post('/function-calling', async (req, res) => {
  try {
    const { functionName, args } = req.body;
    // Simulate function calling
    if (functionName === 'summarize') {
      res.json({ result: `Summary: ${args.text.slice(0, 50)}...` });
    } else {
      res.json({ result: 'Function not implemented.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('API on :3000');
});
