const fs = require("fs");
const path = require("path");

const STRAPI_URL = "http://localhost:1337";

// We'll generate the seed data by running a small script for each data file
// Instead of parsing TS, let's use Node's vm module with careful type stripping
// For each file, we extract the array expression and evaluate as JavaScript

const frontendDir = path.join(__dirname, "..", "frontend", "src", "data");

function loadData(file, varName) {
  const content = fs.readFileSync(path.join(frontendDir, file), "utf8");

  // Find the array expression
  const declRegex = new RegExp(
    "(?:export\\s+)?(?:const|let|var)\\s+" + varName +
    "\\s*(?::\\s*[^=]+)?=\\s*", "s"
  );
  const declMatch = content.match(declRegex);
  if (!declMatch) throw new Error(`Cannot find ${varName} in ${file}`);

  const start = declMatch.index + declMatch[0].length;
  let depth = 0, inStr = false, strChar = "", i = start;
  let firstChar = true;

  while (i < content.length) {
    const ch = content[i], prev = i > 0 ? content[i - 1] : "";

    if (firstChar) {
      if (ch === "[") { depth = 1; firstChar = false; i++; continue; }
      else throw new Error(`Expected [ at start of ${varName}`);
    }

    if (inStr) {
      if (ch === strChar && prev !== "\\") inStr = false;
    } else {
      if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strChar = ch; }
      else if (ch === "[" || ch === "{") depth++;
      else if (ch === "]" || ch === "}") { depth--; if (depth === 0) { i++; break; } }
    }
    i++;
  }

  let expr = content.slice(start, i);

  // Clean to valid JS
  // 1. Remove comments
  expr = expr.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  // 2. Convert template literals
  expr = expr.replace(/`([\s\S]*?)`/g, (_, inner) => {
    const esc = inner.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    return '"' + esc + '"';
  });

  // 3. Remove type annotations: `: TypeName` or `: Type[]` or `: Type<...>`
  // but NOT `: "stringValue"` or `: 123`
  // Strategy: remove any `: UPPERCASE_WORD` pattern (TypeScript types start with uppercase)
  expr = expr.replace(/:\s*([A-Z]\w*(?:<[^>]*>|\[\])?)\s*(?=[,}\]])/g, "");

  // 4. Remove trailing commas
  expr = expr.replace(/,\s*([}\]])/g, "$1");

  // 5. Quote object keys (only if not already quoted)
  expr = expr.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');

  // Evaluate
  const vm = require("vm");
  const script = new vm.Script(`__result = ${expr};`, { filename: file });
  const ctx = { __result: null };
  script.runInNewContext(ctx);
  return ctx.__result;
}

async function seed() {
  console.log("Loading data from frontend...\n");

  const datasets = {};

  try {
    const members = loadData("members.ts", "members");
    datasets.members = members;
    console.log(`members: ${members.length}`);
  } catch (e) { console.error("members:", e.message); return; }

  try {
    const projects = [];
    const funded = loadData("projects.ts", "fundedProjects");
    funded.forEach(p => { p.projectType = "Funded"; projects.push(p); });
    const phd = loadData("projects.ts", "phdProjects");
    phd.forEach(p => { p.projectType = "PhD"; projects.push(p); });
    const student = loadData("projects.ts", "studentProjects");
    student.forEach(p => { p.projectType = "Student"; projects.push(p); });
    datasets.projects = projects;
    console.log(`projects: ${projects.length}`);
  } catch (e) { console.error("projects:", e.message); return; }

  try {
    const devices = loadData("devices.ts", "devices");
    datasets.devices = devices;
    console.log(`devices: ${devices.length}`);
  } catch (e) { console.error("devices:", e.message); return; }

  try {
    const events = loadData("events.ts", "events");
    datasets.events = events;
    console.log(`events: ${events.length}`);
  } catch (e) { console.error("events:", e.message); return; }

  try {
    const publications = loadData("publications.ts", "publications");
    publications.forEach(p => { p.publicationType = p.type || "Journal"; delete p.type; });
    datasets.publications = publications;
    console.log(`publications: ${publications.length}`);
  } catch (e) { console.error("publications:", e.message); return; }

  try {
    const gallery = loadData("gallery.ts", "galleryData");
    datasets.galleryItems = gallery;
    console.log(`gallery: ${gallery.length}`);
  } catch (e) { console.error("gallery:", e.message); return; }

  console.log("\nConnecting to Strapi at", STRAPI_URL);

  // Check Strapi health
  try {
    const health = await fetch(`${STRAPI_URL}/_health`);
    console.log("Strapi health:", health.status);
  } catch (e) {
    console.error("Cannot reach Strapi:", e.message);
    return;
  }

  // Login
  const loginRes = await fetch(`${STRAPI_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@ccsrr.manipal.edu", password: "CCSRR@Admin2026" }),
  });

  if (!loginRes.ok) {
    // Try registering admin
    console.log("Admin not found, registering...");
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
    if (!regRes.ok) {
      const err = await regRes.text();
      console.error("Register failed:", err.slice(0, 200));
      return;
    }
    console.log("Admin registered, logging in...");
  }

  const loginRes2 = await fetch(`${STRAPI_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@ccsrr.manipal.edu", password: "CCSRR@Admin2026" }),
  });

  if (!loginRes2.ok) {
    console.error("Login failed:", await loginRes2.text());
    return;
  }

  const { data: { token: jwt } } = await loginRes2.json();
  console.log("Logged in");

  // Check existing data count
  const memberCount = await fetch(`${STRAPI_URL}/api/members`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  const memberData = await memberCount.json();
  if (memberData.data && memberData.data.length > 0) {
    console.log(`\nStrapi already has ${memberData.data.length} members. Skipping seed.`);
    return;
  }

  // Create API token
  const tokenRes = await fetch(`${STRAPI_URL}/api/admin/api-tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    body: JSON.stringify({
      name: "Frontend API Token",
      description: "API token for frontend",
      type: "custom",
      permissions: {},
    }),
  });

  let apiToken;
  if (tokenRes.ok) {
    const tokenData = await tokenRes.json();
    apiToken = tokenData.data.accessKey;
    console.log("API token created:", apiToken);
  } else {
    const errText = await tokenRes.text();
    if (errText.includes("already exists")) {
      // List existing tokens
      const listRes = await fetch(`${STRAPI_URL}/api/admin/api-tokens`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const listData = await listRes.json();
      if (listData.data && listData.data.length > 0) {
        apiToken = listData.data[0].accessKey;
        console.log("Using existing API token:", apiToken);
      }
    } else {
      console.error("Token creation error:", errText.slice(0, 200));
      // Use admin JWT as fallback
      apiToken = jwt;
      console.log("Using admin JWT as fallback");
    }
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken || jwt}`,
  };

  // Seed each content type
  for (const [plural, items] of Object.entries(datasets)) {
    console.log(`\nSeeding ${plural}...`);
    let count = 0;
    for (const item of items) {
      const { id, ...data } = item;
      try {
        const res = await fetch(`${STRAPI_URL}/api/${plural}`, {
          method: "POST",
          headers,
          body: JSON.stringify({ data }),
        });
        if (res.ok) count++;
        else {
          const errText = await res.text();
          if (count < 3) console.error(`  Error: ${errText.slice(0, 80)}`);
        }
      } catch (e) {
        console.error(`  Network error: ${e.message}`);
      }
    }
    console.log(`  ${count}/${items.length} created`);
  }

  console.log("\n=== SEEDING COMPLETE ===");
  console.log("\nAPI Token for frontend:");
  console.log(`  ${apiToken}`);
  console.log("\nAdd to frontend/.env.local:");
  console.log("  NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337");
  console.log(`  NEXT_PUBLIC_STRAPI_API_TOKEN=${apiToken}`);
  console.log("\nAdmin panel: http://localhost:1337/admin");
  console.log("  Email: admin@ccsrr.manipal.edu");
  console.log("  Password: CCSRR@Admin2026");
}

seed().catch(console.error);
