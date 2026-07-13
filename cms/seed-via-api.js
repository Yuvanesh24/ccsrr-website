/**
 * Seed script: reads data from frontend/src/data/ and posts to Strapi REST API.
 * Usage: node seed-via-api.js
 */
const fs = require("fs");
const path = require("path");

const STRAPI_URL = "http://localhost:1337";

// Read all data from frontend
const frontendDir = path.join(__dirname, "..", "frontend", "src", "data");

function extractArray(content, varName) {
  const regex = new RegExp(
    "(?:export\\s+)?(?:const|let|var)\\s+" + varName +
    "\\s*(?::\\s*[^=]+)?=\\s*(\\[)", "s"
  );
  const m = content.match(regex);
  if (!m) return null;
  const start = m.index + m[0].length - 1;
  let depth = 1, inStr = false, strChar = "", i = start + 1;
  while (depth > 0 && i < content.length) {
    const ch = content[i], prev = content[i - 1] || "";
    if (inStr) { if (ch === strChar && prev !== "\\") inStr = false; }
    else {
      if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strChar = ch; }
      else if (ch === "[" || ch === "{") depth++;
      else if (ch === "]" || ch === "}") depth--;
    }
    i++;
  }
  return content.slice(start, i);
}

function cleanAndParse(ts, isLast = false) {
  let j = ts
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/`([\s\S]*?)`/g, (_, inner) => {
      const esc = inner.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r");
      return '"' + esc + '"';
    });
  // Escape newlines inside double-quoted strings
  let out = "", inDQ = false;
  for (let i = 0; i < j.length; i++) {
    const ch = j[i], prev = i > 0 ? j[i - 1] : "";
    if (ch === '"' && prev !== "\\") inDQ = !inDQ, out += ch;
    else if (inDQ && (ch === "\n" || ch === "\r")) out += "\\n";
    else out += ch;
  }
  j = out;
  j = j.replace(/,\s*([}\]])/g, "$1");
  j = j.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
  return JSON.parse(j);
}

// Read all data
const datasets = {};

// Members
let c = fs.readFileSync(path.join(frontendDir, "members.ts"), "utf8");
let arr = extractArray(c, "members");
if (arr) datasets.members = cleanAndParse(arr);

// Projects (combine funded + phd + student)
c = fs.readFileSync(path.join(frontendDir, "projects.ts"), "utf8");
const projects = [];
["fundedProjects", "phdProjects", "studentProjects"].forEach(type => {
  const a = extractArray(c, type);
  if (a) {
    const parsed = cleanAndParse(a);
    const pType = type === "fundedProjects" ? "Funded" : type === "phdProjects" ? "PhD" : "Student";
    parsed.forEach(p => { p.projectType = pType; projects.push(p); });
  }
});
datasets.projects = projects;

// Devices
c = fs.readFileSync(path.join(frontendDir, "devices.ts"), "utf8");
arr = extractArray(c, "devices");
if (arr) datasets.devices = cleanAndParse(arr);

// Events
c = fs.readFileSync(path.join(frontendDir, "events.ts"), "utf8");
arr = extractArray(c, "events");
if (arr) datasets.events = cleanAndParse(arr);

// Publications
c = fs.readFileSync(path.join(frontendDir, "publications.ts"), "utf8");
arr = extractArray(c, "publications");
if (arr) {
  const parsed = cleanAndParse(arr);
  parsed.forEach(p => { p.publicationType = p.type || "Journal"; delete p.type; });
  datasets.publications = parsed;
}

// Gallery
c = fs.readFileSync(path.join(frontendDir, "gallery.ts"), "utf8");
const gVar = c.match(/export\s+(?:const|let|var)\s+(\w+)/);
if (gVar) {
  arr = extractArray(c, gVar[1]);
  if (arr) {
    const parsed = cleanAndParse(arr);
    if (Array.isArray(parsed)) datasets.galleryItems = parsed;
  }
}

console.log("Data loaded:");
Object.entries(datasets).forEach(([k, v]) => console.log(`  ${k}: ${v.length} items`));

// Now post to Strapi
async function postToStrapi(token) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  for (const [contentType, items] of Object.entries(datasets)) {
    const pluralName = contentType; // strapi uses plural API names
    const count = 0;

    for (const item of items) {
      const { id, ...data } = item;
      try {
        const res = await fetch(`${STRAPI_URL}/api/${pluralName}`, {
          method: "POST",
          headers,
          body: JSON.stringify({ data }),
        });
        if (!res.ok) {
          const err = await res.text();
          console.error(`  ${contentType}: error creating item: ${err.slice(0, 100)}`);
        }
      } catch (e) {
        console.error(`  ${contentType}: network error: ${e.message}`);
      }
    }
    console.log(`  ${contentType}: ${items.length} items posted`);
  }
  console.log("\nSeeding complete!");
}

// First, register admin and get token
async function main() {
  // Check if admin already exists
  try {
    const initRes = await fetch(`${STRAPI_URL}/api/admin/init`);
    const initData = await initRes.json();
    
    if (!initData.data || !initData.data.hasAdmin) {
      // Register admin
      const regRes = await fetch(`${STRAPI_URL}/api/admin/register-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@ccsrr.manipal.edu",
          password: "CCSRR@Admin2026",
          firstname: "CCSRR",
          lastname: "Admin",
        }),
      });
      if (regRes.ok) {
        console.log("Admin created successfully");
      } else {
        const err = await regRes.text();
        console.log("Register admin response:", err.slice(0, 200));
      }
    } else {
      console.log("Admin already exists, logging in...");
    }

    // Login to get JWT
    const loginRes = await fetch(`${STRAPI_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@ccsrr.manipal.edu",
        password: "CCSRR@Admin2026",
      }),
    });

    if (!loginRes.ok) {
      console.error("Login failed:", await loginRes.text());
      return;
    }

    const loginData = await loginRes.json();
    const jwt = loginData.data.token;
    console.log("Logged in, got JWT token");

    // Create API token
    const tokenRes = await fetch(`${STRAPI_URL}/api/admin/api-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: "Frontend API Token",
        description: "API token for frontend Next.js app",
        type: "custom",
        permissions: {
          "api::member.member": { actions: ["find", "findOne"] },
          "api::project.project": { actions: ["find", "findOne"] },
          "api::device.device": { actions: ["find", "findOne"] },
          "api::event.event": { actions: ["find", "findOne"] },
          "api::publication.publication": { actions: ["find", "findOne"] },
          "api::gallery-item.gallery-item": { actions: ["find", "findOne"] },
          "api::page-content.page-content": { actions: ["find", "findOne"] },
        },
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      // Check if token already exists
      if (errText.includes("already exists")) {
        // Try to get existing token
        const listRes = await fetch(`${STRAPI_URL}/api/admin/api-tokens`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        const listData = await listRes.json();
        if (listData.data && listData.data.length > 0) {
          const existingToken = listData.data[0];
          console.log("Using existing API token:", existingToken.name);
          console.log("Token:", existingToken.accessKey);
          await postToStrapi(existingToken.accessKey);
        }
      } else {
        console.error("Create token failed:", errText.slice(0, 200));
      }
      return;
    }

    const tokenData = await tokenRes.json();
    const apiToken = tokenData.data.accessKey;
    console.log("API Token created:", apiToken);

    // Now seed data
    await postToStrapi(apiToken);

    console.log("\n=== NEXT STEPS ===");
    console.log(`1. Copy this token to frontend/.env.local:`);
    console.log(`   NEXT_PUBLIC_STRAPI_API_TOKEN=${apiToken}`);
    console.log(`2. Set the frontend URL:`);
    console.log(`   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337`);
    console.log(`3. Start the frontend:`);
    console.log(`   cd frontend && npm run dev`);

  } catch (e) {
    console.error("Error:", e.message);
  }
}

main();
