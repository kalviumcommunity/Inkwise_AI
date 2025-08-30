// test-framework.js
// Added for PR visibility
// This file provides a simple test runner for LLM evaluation

export function runTests(testCases, llmCall) {
  let passed = 0;
  testCases.forEach(({ input, expected }) => {
    const output = llmCall(input);
    if (output.toLowerCase().includes(expected.toLowerCase())) {
      passed++;
    } else {
      console.error(`Test failed: ${input} => ${output} (expected: ${expected})`);
    }
  });
  console.log(`${passed}/${testCases.length} tests passed.`);
}
