// embeddings.js
// Dummy implementation for demonstration
// Added comment for PR visibility
export function getEmbeddings(text) {
  // This function simulates generating embeddings for text
  // Simulate embedding as array of char codes
  return text.split('').map(c => c.charCodeAt(0) / 256);
}

// Cosine similarity
export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (normA * normB);
}

// Euclidean distance
export function euclideanSimilarity(a, b) {
  const dist = Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0));
  return 1 / (1 + dist);
}

// Dot product
export function dotProductSimilarity(a, b) {
  return a.reduce((sum, v, i) => sum + v * b[i], 0);
}

// Vector database (in-memory)
export class VectorDB {
  constructor() {
    this.vectors = [];
    this.texts = [];
  }
  add(text) {
    const emb = getEmbeddings(text);
    this.vectors.push(emb);
    this.texts.push(text);
  }
  search(query, simFn = cosineSimilarity, topK = 1) {
    const qEmb = getEmbeddings(query);
    const sims = this.vectors.map(v => simFn(qEmb, v));
    return this.texts
      .map((t, i) => ({ text: t, score: sims[i] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}
