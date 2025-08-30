// tokenization.js
// Added comment for PR visibility
export function countTokens(text) {
  // This function counts tokens using a simple whitespace tokenizer
  return text.split(/\s+/).length;
}
