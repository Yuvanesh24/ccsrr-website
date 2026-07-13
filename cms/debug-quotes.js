const fs = require("fs");
const c = fs.readFileSync(
  "/Users/yuvaneshs/Downloads/ccsrr-website/frontend/src/data/publications.ts",
  "utf8"
);

// Extract publications array
const regex = new RegExp(
  "(?:export\\s+)?(?:const|let|var)\\s+publications\\s*(?::\\s*[^=]+)?=\\s*(\\[)",
  "s"
);
const m = c.match(regex);
const start = m.index + m[0].length - 1;
let depth = 1, inStr = false, strChar = "", i = start + 1;
while (depth > 0 && i < c.length) {
  const ch = c[i], prev = c[i - 1] || "";
  if (inStr) {
    if (ch === strChar && prev !== "\\") inStr = false;
  } else {
    if (ch === '"') { inStr = true; strChar = '"'; }
    else if (ch === "'") { inStr = true; strChar = "'"; }
    else if (ch === "`") { inStr = true; strChar = "`"; }
    else if (ch === "[" || ch === "{") depth++;
    else if (ch === "]" || ch === "}") depth--;
  }
  i++;
}
const extracted = c.slice(start, i);

// Step 2: template literals
let clean = extracted.replace(/`([\s\S]*?)`/g, (_, inner) => {
  const esc = inner.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  return '"' + esc + '"';
});

// Step 3: now escape newlines in DQ - but let's trace
// First, find ALL " positions
const quotePositions = [];
for (let i = 0; i < Math.min(clean.length, 600); i++) {
  const ch = clean[i], prev = i > 0 ? clean[i - 1] : "";
  if (ch === '"' && prev !== "\\") quotePositions.push(i);
}

console.log("Quote positions in first 600 chars:", quotePositions.map(p => p + ": " + clean.slice(Math.max(0, p-5), p+10).replace(/\n/g, "\\n")).join("\n  "));
console.log("\nThere are", quotePositions.length, "quotes in first 600 chars");

// Now do step 3 and show where inDQ is true
let out = "", inDQ = false;
let transitions = [];
for (let i = 0; i < Math.min(clean.length, 600); i++) {
  const ch = clean[i], prev = i > 0 ? clean[i - 1] : "";
  if (ch === '"' && prev !== "\\") {
    inDQ = !inDQ;
    if (inDQ) transitions.push({ pos: i, desc: "IN:" + clean.slice(i, i + 40).replace(/\n/g, "\\n") });
    else transitions.push({ pos: i, desc: "OUT:" });
  }
  out += ch;
}

console.log("\nString transitions:");
transitions.forEach(t => console.log("  " + t.pos + ": " + t.desc));
