import { process } from "./process.mjs";

const testCases = [
  {
    store: [{ size: 2, quantity: 1 }],
    order: [{ id: 102, size: [1, 2], masterSize: "s1" }],
    isPossible: true,
    mismatches: 1
  },
  {
    store: [{ size: 3, quantity: 1 }],
    order: [{ id: 102, size: [1, 2], masterSize: "s1" }],
    isPossible: false,
    mismatches: 0
  },
  {
    store: [{ size: 2, quantity: 4 }],
    order: [
      { id: 101, size: [2] },
      { id: 102, size: [1, 2], masterSize: "s2" }
    ],
    isPossible: true,
    mismatches: 0
  },
  {
    store: [
      { size: 1, quantity: 1 },
      { size: 2, quantity: 2 },
      { size: 3, quantity: 1 }
    ],
    order: [
      { id: 100, size: [1] },
      { id: 101, size: [2] },
      { id: 102, size: [2, 3], masterSize: "s1" },
      { id: 103, size: [1, 2], masterSize: "s2" }
    ],
    isPossible: true,
    mismatches: 1
  },
  {
    store: [
      { size: 1, quantity: 1 },
      { size: 2, quantity: 2 },
      { size: 3, quantity: 1 }
    ],
    order: [
      { id: 100, size: [1] },
      { id: 101, size: [2] },
      { id: 102, size: [2, 3], masterSize: "s1" },
      { id: 103, size: [1, 2], masterSize: "s2" },
      { id: 104, size: [1, 2], masterSize: "s2" }
    ],
    isPossible: false,
    mismatches: 1
  },
  {
    store: [
      { size: 1, quantity: 1 },
      { size: 2, quantity: 2 },
      { size: 3, quantity: 1 }
    ],
    order: [{ id: 100, size: [] }],
    isPossible: true,
    mismatches: 0
  }
];

testCases.forEach(({ store, order, isPossible, mismatches }, index) => {
  const result = process(store, order);
  const passed = isPossible ? result !== false && result.mismatches === mismatches : result === false;

  console.log(`Test ${index + 1}: ${passed ? "✅ Passed" : "❌ Failed"}`);
  if (!passed) {
    console.log("Expected:", isPossible ? { mismatches } : false);
    console.log("Received:", result);
  }
});
