// Navigation/address contracts for the Shanghai guide. Run with Node.js, no browser required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/meta-data.js'), 'utf8');
const data = JSON.parse(source.match(/window\.MWY_DATA=([\s\S]*);\s*$/)[1]);
const adapter = fs.readFileSync(path.join(root, 'assets/meta-integration.js'), 'utf8');
const all = data.days.flatMap(day => day.stops);
const singlePOI = new Set(['arrival','bund','ferry','hotelreturn','airport']);
const readable = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
assert.equal(all.length, 22, 'stable 22-stop itinerary');
assert.equal(data.source.master, 'v2026-10-21.2');
assert(adapter.includes('stop?.navQuery||address'), 'navigation must use the named POI query');
for (let dayIndex = 0; dayIndex < data.days.length; dayIndex++) {
  const day = data.days[dayIndex];
  const sourceItems = data.sourceDays[String(dayIndex+1)].items;
  assert.deepEqual(day.stops.map(s => s.id), day.mapPlaces.map(p => p.id), 'map selector and timeline IDs agree');
  for (const stop of day.stops) {
    assert.equal(typeof stop.addr, 'string', stop.id+' missing address');
    assert.equal(typeof stop.navQuery, 'string', stop.id+' missing POI search keyword');
    assert(stop.navQuery.trim().length > 5, stop.id+' incomplete POI keyword');
    assert(!/交叉口|附近餐飲|北約?\d+米|按現場情況決定|／外灘/.test(stop.addr), stop.id+' relative placeholder in address: '+stop.addr);
    if (!singlePOI.has(stop.id)) {
      assert(/(?:路|街|大道|弄|巷|道)[^\s]*?\d+(?:[-–—]\d+)?號/.test(stop.addr),
        stop.id+' requires a real street and house number, got '+stop.addr);
      assert(/\d+/.test(stop.navQuery), stop.id+' POI keyword should include house number');
    }
    const src = sourceItems.find(s => s.id === stop.id);
    const pin = day.mapPlaces.find(p => p.id === stop.id);
    assert(src && pin, stop.id+' has corresponding source/map records');
    assert.equal(src.address, stop.addr, stop.id+' source itinerary uses wrong address');
    assert.equal(pin.address, stop.addr, stop.id+' map selector uses wrong address');
    const html = stop.richHtml || '';
    const next = html.match(/<div class="next-hop compact">([\s\S]*?)<\/div><\/div>/);
    if (next) {
      const p = next[1].match(/<p>([^<]+)<\/p>/);
      const copy = next[1].match(/onclick="copyText\('([^']+)'\)"/);
      assert(p && copy, stop.id+' next-hop needs a displayed and copyable destination');
      assert.equal(readable(copy[1]), readable(p[1]), stop.id+' next-hop copy target does not match displayed destination');
    }
    for (const m of html.matchAll(/<button class="copy-place"[^>]*onclick="copyText\('([^']+)'\)"[^>]*>([\s\S]*?)<\/button>/g)) {
      const span=m[2].match(/<span>([^<]+)<\/span>/);
      assert(span, stop.id+' copy-place button lacks visible address');
      assert.equal(readable(m[1]), readable(span[1]), stop.id+' copy-place address differs from label');
    }
  }
}
const get = id => all.find(x => x.id === id);
assert.equal(get('postshow').addr, '恒通路357號現代交通商務大廈1樓');
assert.equal(get('postshow').navQuery, '淄个炉子·淄博烧烤 恒通路357号');
assert(get('postshow').richHtml.includes("copyText('淄個爐子·淄博燒烤 恒通路357號現代交通商務大廈1樓')"));
assert.equal(get('bund').addr, '外灘－陳毅廣場（中山東一路外灘內）');
assert.equal(get('ferry').addr, '金陵東路渡口（輪渡站）');
assert(get('taikang').richHtml.includes("copyText('沈大成 南京東路636號')"));
assert(get('mwyafternoon').richHtml.includes("copyText('小楊生煎 江場路1212號協信星光廣場北區B1')"));
assert(!/長安路1109|Z8|Nikon|24-120|CX\d{3}/.test(source), 'private trip details must not leak');
console.log('PASS: 22 street/POI/navigation records, source and map synchronization, copy-button consistency, privacy and exact restaurant address');
