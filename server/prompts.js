// prompts.js

// Zero-shot prompting utility for LLMs
export function zeroShotPrompt(query) {
  // This function generates a zero-shot prompt for the LLM
  return `Answer the following question:\n${query}`;
}

export function oneShotPrompt(query, example) {
  return `Example:\nQ: ${example.q}\nA: ${example.a}\n\nNow answer:\nQ: ${query}\nA:`;
}

export function multiShotPrompt(query, examples) {
  const shots = examples.map(ex => `Q: ${ex.q}\nA: ${ex.a}`).join('\n');
  return `${shots}\n\nNow answer:\nQ: ${query}\nA:`;
}

export function dynamicPrompt(query, context) {
  return `Context: ${context}\n\nQuestion: ${query}`;
}

export function chainOfThoughtPrompt(query) {
  return `Let's think step by step to answer:\n${query}`;
}
