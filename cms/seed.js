const { createStrapi } = require('@strapi/strapi');

async function seed() {
  const strapi = await createStrapi().load();

  const count = await strapi.query('api::member.member').count();
  if (count > 0) {
    console.log('CMS already has data (%d members), skipping seed.', count);
    await strapi.destroy();
    return;
  }

  // Read frontend data files
  const path = require('path');
  const fs = require('fs');
  const frontendDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'data');

  function loadTS(file) {
    // Strip TypeScript to get plain JS
    let content = fs.readFileSync(path.join(frontendDir, file), 'utf8');
    content = content
      .replace(/import\s+.*?from\s+['"].*?['"];?\n?/g, '')
      .replace(/export\s+(type|interface)\s+\w+[\s\S]*?(\n\w|$)/g, '\n')
      .replace(/export\s+const\s+(\w+)\s*=\s*/, 'const $1 = ')
      .replace(/:\s*\w+(?:<[\w\s,|&[\]()>]+>)?(?=\s*[=,])/g, '')
      .replace(/:\s*\w+(?:\[\])?(?=\s*[,}\]])/g, '')
      .replace(/:\s*string/g, '')
      .replace(/:\s*number/g, '')
      .replace(/:\s*boolean/g, '')
      .replace(/:\s*string\[\]/g, '')
      .replace(/\bundefined\b/g, 'null')
      .replace(/readonly\s+/g, '')
      .replace(/^\s*export\s*\{.*$/gm, '')
      .replace(/as\s+const\s*;?\n?/g, '');
    return content;
  }

  function evalArray(file, varName) {
    const code = loadTS(file);
    let result;
    eval(code.replace('export ', '') + `\nresult = ${varName};`);
    return result || [];
  }

  try {
    // ---- Members ----
    const members = evalArray('members.ts', 'members');
    for (const m of members) {
      const { id, photo, ...data } = m;
      await strapi.entityService.create('api::member.member', { data });
    }
    console.log(`  members: ${members.length}`);

    // ---- Projects ----
    const projects = evalArray('projects.ts', 'projects');
    for (const p of projects) {
      const { id, ...data } = p;
      await strapi.entityService.create('api::project.project', { data });
    }
    console.log(`  projects: ${projects.length}`);

    // ---- Devices ----
    const devices = evalArray('devices.ts', 'devices');
    for (const d of devices) {
      const { id, image, ...data } = d;
      await strapi.entityService.create('api::device.device', { data });
    }
    console.log(`  devices: ${devices.length}`);

    // ---- Events ----
    const events = evalArray('events.ts', 'events');
    for (const e of events) {
      const { id, poster, ...data } = e;
      await strapi.entityService.create('api::event.event', { data });
    }
    console.log(`  events: ${events.length}`);

    // ---- Publications ----
    const publications = evalArray('publications.ts', 'publications');
    for (const p of publications) {
      const { id, type, ...data } = p;
      data.publicationType = type || 'Journal';
      delete data.type;
      await strapi.entityService.create('api::publication.publication', { data });
    }
    console.log(`  publications: ${publications.length}`);

    // ---- Gallery Items ----
    const gallery = evalArray('gallery.ts', 'galleryData');
    for (const g of gallery) {
      const { id, images, ...data } = g;
      await strapi.entityService.create('api::gallery-item.gallery-item', { data });
    }
    console.log(`  gallery-items: ${gallery.length}`);

    console.log('\nSeed complete! All content imported from frontend data files.');
  } catch (err) {
    console.error('Seed error:', err);
  }

  await strapi.destroy();
}

seed();
