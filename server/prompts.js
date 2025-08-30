// prompts.js

// Zero-shot prompting utility for LLMs
export function zeroShotPrompt(query) {
  // This function generates a zero-shot prompt for the LLM
  return `Answer the following question:\n${query}`;
}

// One-shot prompting utility for LLMs
export function oneShotPrompt(query, example) {
  // This function generates a one-shot prompt for the LLM
  return `Example:\nQ: ${example.q}\nA: ${example.a}\n\nNow answer:\nQ: ${query}\nA:`;
}

// Multi-shot prompting utility for LLMs (added comment for PR visibility)
export function multiShotPrompt(query, examples) {
  // This function generates a multi-shot prompt for the LLM
  const shots = examples.map(ex => `Q: ${ex.q}\nA: ${ex.a}`).join('\n');
  return `${shots}\n\nNow answer:\nQ: ${query}\nA:`;
}

export function dynamicPrompt(query, context) {
  return `Context: ${context}\n\nQuestion: ${query}`;
}

export function chainOfThoughtPrompt(query) {
  return `Let's think step by step to answer:\n${query}`;
}
