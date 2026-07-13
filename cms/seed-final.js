const fs = require("fs");
const path = require("path");
const vm = require("vm");

const STRAPI_URL = "http://localhost:1337";
const frontendDir = path.join(__dirname, "..", "frontend", "src", "data");

function extractExpression(file, varName) {
  const content = fs.readFileSync(path.join(frontendDir, file), "utf8");
  const declRegex = new RegExp(
    "(?:export\\s+)?(?:const|let|var)\\s+" + varName + "\\s*(?::\\s*[^=]+)?=\\s*", "s"
  );
  const declMatch = content.match(declRegex);
  if (!declMatch) throw new Error(`Cannot find ${varName} in ${file}`);

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
  return content.slice(start, i);
}

function safeEval(expr, filename) {
  const script = new vm.Script(`__r = ${expr};`, { filename });
  const ctx = { __r: null };
  script.runInNewContext(ctx);
  return ctx.__r;
}

console.log("Loading data...\n");

const datasets = {};

try {
  const members = safeEval(extractExpression("members.ts", "members"), "members.ts");
  datasets.members = members;
  console.log(`members: ${members.length}`);
} catch (e) { console.error("members:", e.message); process.exit(1); }

try {
  const projects = [];
  const funded = safeEval(extractExpression("projects.ts", "fundedProjects"), "projects.ts");
  funded.forEach(p => { p.projectType = "Funded"; projects.push(p); });
  const phd = safeEval(extractExpression("projects.ts", "phdProjects"), "projects.ts");
  phd.forEach(p => { p.projectType = "PhD"; projects.push(p); });
  const student = safeEval(extractExpression("projects.ts", "studentProjects"), "projects.ts");
  student.forEach(p => { p.projectType = "Student"; projects.push(p); });
  datasets.projects = projects;
  console.log(`projects: ${projects.length}`);
} catch (e) { console.error("projects:", e.message); process.exit(1); }

try {
  const devices = safeEval(extractExpression("devices.ts", "devices"), "devices.ts");
  datasets.devices = devices;
  console.log(`devices: ${devices.length}`);
} catch (e) { console.error("devices:", e.message); process.exit(1); }

try {
  const events = safeEval(extractExpression("events.ts", "events"), "events.ts");
  datasets.events = events;
  console.log(`events: ${events.length}`);
} catch (e) { console.error("events:", e.message); process.exit(1); }

try {
  const publications = safeEval(extractExpression("publications.ts", "publications"), "publications.ts");
  publications.forEach(p => { p.publicationType = p.type || "Journal"; delete p.type; });
  datasets.publications = publications;
  console.log(`publications: ${publications.length}`);
} catch (e) { console.error("publications:", e.message); process.exit(1); }

try {
  const gallery = safeEval(extractExpression("gallery.ts", "galleryItems"), "gallery.ts");
  datasets.galleryItems = gallery;
  console.log(`gallery: ${gallery.length}`);
} catch (e) { console.error("gallery:", e.message); process.exit(1); }

console.log("\nAll data loaded successfully!");

// Now seed via API
async function seed() {
  console.log("\nConnecting to Strapi...");

  // Check if admin exists
  const initRes = await fetch(`${STRAPI_URL}/admin/init`);
  const initData = await initRes.json();
  
  if (!initData.data || !initData.data.hasAdmin) {
    console.log("Registering admin...");
    const regRes = await fetch(`${STRAPI_URL}/admin/register-admin`, {
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
      console.error("Register failed:", await regRes.text());
      return;
    }
    console.log("Admin registered");
  }

  // Login
  const loginRes = await fetch(`${STRAPI_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@ccsrr.manipal.edu", password: "CCSRR@Admin2026" }),
  });
  if (!loginRes.ok) { console.error("Login failed:", await loginRes.text()); return; }
  const { data: { token: jwt } } = await loginRes.json();
  console.log("Logged in");

  // Check if data already exists
  const checkRes = await fetch(`${STRAPI_URL}/api/members`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  const checkData = await checkRes.json();
  if (checkData.data && checkData.data.length > 0) {
    console.log(`\nStrapi already has ${checkData.data.length} members. Delete .tmp/data.db and restart to reseed.`);
    console.log("\nAPI credentials for admin panel:");
    console.log("  http://localhost:1337/admin");
    console.log("  Email: admin@ccsrr.manipal.edu");
    console.log("  Password: CCSRR@Admin2026");
    return;
  }

  // Delete old read-only token if exists, then create full-access token
  let apiToken = jwt;
  const listRes = await fetch(`${STRAPI_URL}/admin/api-tokens`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  if (listRes.ok) {
    const listData = await listRes.json();
    if (listData.data) {
      for (const t of listData.data) {
        await fetch(`${STRAPI_URL}/admin/api-tokens/${t.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${jwt}` },
        });
      }
    }
  }

  const tokenRes = await fetch(`${STRAPI_URL}/admin/api-tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    body: JSON.stringify({
      name: "Frontend API Token",
      description: "For Next.js frontend",
      type: "full-access",
    }),
  });
  if (tokenRes.ok) {
    const tokenData = await tokenRes.json();
    apiToken = tokenData.data.accessKey;
    console.log("API token created:", apiToken);
  } else {
    console.error("Failed to create API token:", await tokenRes.text());
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
  };

  // Map frontend fields to Strapi fields for each content type
  const mappers = {
    members: (item) => {
      const { id, photo, ...rest } = item;
      return { ...rest, email: rest.email || "unknown@ccsrr.manipal.edu" };
    },
    projects: (item) => {
      const { id, coGuide, year, category: studentCat, ...rest } = item;
      const data = { ...rest };
      if (coGuide) data.coPi = coGuide;
      if (studentCat) data.studentCategory = studentCat;
      // PhD projects have no title — use studentName + thesisTitle
      if (!data.title) {
        data.title = data.studentName ? data.studentName + " - " + (data.thesisTitle || "PhD Research") : "Project";
      }
      return data;
    },
    devices: (item) => {
      const { id, image, specs, ...rest } = item;
      return { ...rest, specifications: specs || "" };
    },
    events: (item) => {
      const { id, poster, type, ...rest } = item;
      // Parse date: extract first 4-digit year and first month-day
      let date = null;
      if (rest.date && typeof rest.date === "string") {
        const months = {jan:"01",feb:"02",mar:"03",apr:"04",may:"05",jun:"06",
                        jul:"07",aug:"08",sep:"09",oct:"10",nov:"11",dec:"12"};
        const ds = rest.date.toLowerCase();
        const m = ds.match(/(\d{1,2})\s*(?:-\s*\d{1,2})?\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(\d{4})/);
        if (m) {
          date = m[3] + "-" + months[m[2]] + "-" + m[1].padStart(2, "0");
        }
      }
      // Map event types that don't match Strapi enum (Workshop|Seminar|Other)
      const typeMap = { Lecture: "Seminar", Other: "Other", Workshop: "Workshop", Seminar: "Seminar" };
      return { ...rest, date, eventType: typeMap[type] || "Other" };
    },
    publications: (item) => {
      const { id, type, ...rest } = item;
      return rest;
    },
    galleryItems: (item) => {
      const { id, image, images, ...rest } = item;
      return rest;
    },
  };

  const endpointMap = {
    members: "members",
    projects: "projects",
    devices: "devices",
    events: "events",
    publications: "publications",
    galleryItems: "gallery-items",
  };

  // Seed
  for (const [key, items] of Object.entries(datasets)) {
    const endpoint = endpointMap[key];
    const mapper = mappers[key];
    console.log(`\nSeeding ${endpoint}...`);
    let ok = 0, err = 0;
    for (const item of items) {
      const data = mapper(item);
      try {
        const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
          method: "POST", headers,
          body: JSON.stringify({ data }),
        });
        if (res.ok) ok++;
        else { err++; if (err <= 3) console.error(`  ${res.status}: ${(await res.text()).slice(0, 100)}`); }
      } catch (e) { err++; }
    }
    console.log(`  ${ok} created, ${err} errors`);
  }

  console.log("\n=================================");
  console.log("SEEDING COMPLETE!");
  console.log("=================================\n");
  console.log("Admin panel: http://localhost:1337/admin");
  console.log("  Email: admin@ccsrr.manipal.edu");
  console.log("  Password: CCSRR@Admin2026\n");
  console.log("Add to frontend/.env.local:");
  console.log("  NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337");
  console.log(`  NEXT_PUBLIC_STRAPI_API_TOKEN=${apiToken}\n`);
}

seed().catch(console.error);
