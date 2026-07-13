const fs = require("fs");
const c = fs.readFileSync(
  "/Users/yuvaneshs/Downloads/ccsrr-website/frontend/src/data/publications.ts",
  "utf8"
);

const regex = new RegExp(
  "(?:export\\s+)?(?:const|let|var)\\s+publications\\s*(?::\\s*[^=]+)?=\\s*(\\[)", "s"
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

// Show positions 480-530 character by character
console.log("Position | Char | Context");
for (let p = 480; p < 535; p++) {
  if (p >= extracted.length) break;
  const ch = extracted[p];
  const chDisplay = ch === "\n" ? "\\n" : ch === "\r" ? "\\r" : ch === " " ? "·" : ch;
  const ctx = extracted.slice(Math.max(0, p - 3), p + 10).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  const isQuote = ch === '"' ? " <-- QUOTE" : "";
  console.log(String(p).padStart(6) + " | " + chDisplay + "     | " + ctx + isQuote);
}
