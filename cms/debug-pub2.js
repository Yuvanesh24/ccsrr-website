const fs = require("fs");
const vm = require("vm");
const content = fs.readFileSync(
  "/Users/yuvaneshs/Downloads/ccsrr-website/frontend/src/data/publications.ts",
  "utf8"
);

const declRegex = new RegExp(
  "(?:export\\s+)?(?:const|let|var)\\s+publications\\s*(?::\\s*[^=]+)?=\\s*",
  "s"
);
const declMatch = content.match(declRegex);
const start = declMatch.index + declMatch[0].length;
let depth = 0, inStr = false, strChar = "", i = start;
let firstChar = true;

while (i < content.length) {
  const ch = content[i], prev = i > 0 ? content[i - 1] : "";
  if (firstChar) { if (ch === "[") { depth = 1; firstChar = false; i++; continue; } }
  if (inStr) { if (ch === strChar && prev !== "\\") inStr = false; }
  else {
    if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strChar = ch; }
    else if (ch === "[" || ch === "{") depth++;
    else if (ch === "]" || ch === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  i++;
}

let expr = content.slice(start, i);

// First: just try running as-is with vm, to see where it breaks
try {
  const script = new vm.Script(`__result = ${expr};`, { filename: "publications.ts" });
  console.log("Direct eval works!");
} catch (e) {
  console.log("Direct eval error:", e.message);
  // Find the problematic position
  const lines = expr.split("\n");
  lines.forEach((line, idx) => {
    if (line.includes("publicationType")) {
      console.log(`\nLine ${idx + 1}: ${line}`);
    }
  });
  
  // Look for patterns that might cause issues
  // Check for `PublicationType` references in values
  console.log("\nLooking for type annotation patterns in values...");
  const valPattern = /:\s*PublicationType/g;
  let m;
  while ((m = valPattern.exec(expr)) !== null) {
    console.log("Found at", m.index, ":", expr.slice(Math.max(0, m.index - 20), m.index + 30));
  }
  
  // Check for `: PublicationCategory` 
  const catPattern = /:\s*PublicationCategory/g;
  while ((m = catPattern.exec(expr)) !== null) {
    console.log("Found category at", m.index, ":", expr.slice(Math.max(0, m.index - 20), m.index + 30));
  }
}
