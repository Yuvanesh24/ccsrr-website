const fs = require("fs");
const path = require("path");

const frontendDir = path.join(__dirname, "..", "frontend", "src", "data");

function extractArray(content, varName) {
  const regex = new RegExp(
    "(?:export\\s+)?(?:const|let|var)\\s+" + varName +
    "\\s*(?::\\s*[^=]+)?=\\s*(\\[)", "s"
  );
  const m = content.match(regex);
  if (!m) return null;

  const start = m.index + m[0].length - 1;
  let depth = 1;
  let inStr = false;
  let strChar = "";
  let i = start + 1;

  while (depth > 0 && i < content.length) {
    const ch = content[i];
    const prev = content[i - 1] || "";
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

  return content.slice(start, i);
}

function tsArrayToJSON(ts) {
  // 1. Remove comments
  let j = ts.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  // 2. Convert template literals to regular strings (escape everything inside)
  // Replace backtick strings with double-quoted strings, escaping internal quotes/newlines
  j = j.replace(/`([\s\S]*?)`/g, (_, inner) => {
    const escaped = inner
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
    return '"' + escaped + '"';
  });

  // 3. Escape unescaped newlines inside double-quoted strings
  // This is tricky because we need to find strings that span multiple lines
  // and escape the embedded newlines
  let result = "";
  let inDQ = false;
  for (let i = 0; i < j.length; i++) {
    const ch = j[i];
    const prev = i > 0 ? j[i - 1] : "";
    if (ch === '"' && prev !== "\\") {
      inDQ = !inDQ;
      result += ch;
    } else if (inDQ && (ch === "\n" || ch === "\r")) {
      result += "\\n";
    } else {
      result += ch;
    }
  }
  j = result;

  // 4. Handle trailing commas
  j = j.replace(/,\s*([}\]])/g, "$1");

  // 5. Quote unquoted keys
  j = j.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');

  return j;
}

const output = {};

// Members
let c = fs.readFileSync(path.join(frontendDir, "members.ts"), "utf8");
let arr = extractArray(c, "members");
if (arr) { output.members = JSON.parse(tsArrayToJSON(arr)); console.log("members:", output.members.length); }
else console.log("members: not found");

// Projects - combine fundedProjects + phdProjects + studentProjects
c = fs.readFileSync(path.join(frontendDir, "projects.ts"), "utf8");
let funded = extractArray(c, "fundedProjects");
let phd = extractArray(c, "phdProjects");
let student = extractArray(c, "studentProjects");
const projects = [];
if (funded) {
  const parsed = JSON.parse(tsArrayToJSON(funded));
  parsed.forEach(p => { p.projectType = "Funded"; projects.push(p); });
}
if (phd) {
  const parsed = JSON.parse(tsArrayToJSON(phd));
  parsed.forEach(p => { p.projectType = "PhD"; projects.push(p); });
}
if (student) {
  const parsed = JSON.parse(tsArrayToJSON(student));
  parsed.forEach(p => { p.projectType = "Student"; projects.push(p); });
}
output.projects = projects;
console.log("projects:", projects.length);

// Devices
c = fs.readFileSync(path.join(frontendDir, "devices.ts"), "utf8");
arr = extractArray(c, "devices");
if (arr) { output.devices = JSON.parse(tsArrayToJSON(arr)); console.log("devices:", output.devices.length); }

// Events
c = fs.readFileSync(path.join(frontendDir, "events.ts"), "utf8");
arr = extractArray(c, "events");
if (arr) { output.events = JSON.parse(tsArrayToJSON(arr)); console.log("events:", output.events.length); }

// Publications
c = fs.readFileSync(path.join(frontendDir, "publications.ts"), "utf8");
arr = extractArray(c, "publications");
if (arr) {
  const parsed = JSON.parse(tsArrayToJSON(arr));
  // Map type -> publicationType
  parsed.forEach(p => { p.publicationType = p.type || "Journal"; delete p.type; });
  output.publications = parsed;
  console.log("publications:", parsed.length);
}

// Gallery
c = fs.readFileSync(path.join(frontendDir, "gallery.ts"), "utf8");
const gVarMatch = c.match(/export\s+(?:const|let|var)\s+(\w+)/);
if (gVarMatch) {
  arr = extractArray(c, gVarMatch[1]);
  if (arr) {
    const parsed = JSON.parse(tsArrayToJSON(arr));
    // Filter out the carouselImages export
    if (Array.isArray(parsed)) {
      output.galleryItems = parsed;
      console.log("gallery:", parsed.length);
    }
  }
}

fs.writeFileSync(path.join(__dirname, "seed-data.json"), JSON.stringify(output, null, 2));
console.log("\nWrote cms/seed-data.json");
