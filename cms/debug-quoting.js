const fs = require("fs");
const c = fs.readFileSync(
  "/Users/yuvaneshs/Downloads/ccsrr-website/frontend/src/data/publications.ts",
  "utf8"
);

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

// Find pub1's link field exactly
const linkPos = extracted.indexOf(
  'link: "https://doi.org/10.1177/17474930251323044"'
);
console.log("=== Raw extracted (around link) ===");
console.log(extracted.slice(linkPos - 15, linkPos + 75));
console.log("\n=== After step 5 (quote keys) ===");
let j = extracted.slice(linkPos - 15, linkPos + 75);
j = j.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
console.log(j);

// Now let's apply ALL steps to the first 600 chars of extracted
let all = extracted.slice(0, 600);
console.log("\n=== First 600 chars raw ===");
console.log(all);

console.log("\n=== After full cleanAndParse steps ===");
let clean = all
  .replace(/\/\/.*$/gm, "")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/`([\s\S]*?)`/g, (_, inner) => {
    const esc = inner.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r");
    return '"' + esc + '"';
  });

// Escape newlines inside double-quoted strings
let out = "", inDQ = false;
for (let i = 0; i < clean.length; i++) {
  const ch = clean[i], prev = i > 0 ? clean[i - 1] : "";
  if (ch === '"' && prev !== "\\") inDQ = !inDQ, out += ch;
  else if (inDQ && (ch === "\n" || ch === "\r")) out += "\\n";
  else out += ch;
}
clean = out;
clean = clean.replace(/,\s*([}\]])/g, "$1");
clean = clean.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
console.log(clean);
