// evaluation.js
import assert from 'assert';
import { zeroShotPrompt } from './prompts.js';

const samples = [
  { input: 'What is AI?', expected: 'Artificial Intelligence' },
  { input: 'Capital of France?', expected: 'Paris' },
  { input: '2+2?', expected: '4' },
  { input: 'Color of sky?', expected: 'Blue' },
  { input: 'Largest planet?', expected: 'Jupiter' }
];

export function runEvaluation(llmCall) {
  samples.forEach(sample => {
    const prompt = zeroShotPrompt(sample.input);
    const output = llmCall(prompt); // Should return string
    // For demo, just check output contains expected
    assert(output.toLowerCase().includes(sample.expected.toLowerCase()));
  });
  console.log('All evaluation tests passed!');
}
