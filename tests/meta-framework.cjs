const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const ctx = { window: {}, location: { search: '', pathname: '/' }, Intl, Date, URLSearchParams };
vm.createContext(ctx);
for (const file of ['meta-data.js', 'meta-integration.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'assets', file), 'utf8'), ctx);
}
const data = ctx.window.MWY_DATA;
const api = ctx.window.MWY_FRAMEWORK;
assert.equal(data.source.master, 'v2026-10-17.1');
assert.equal(data.days.length, 3);
const ids = data.days.flatMap(day => day.stops.map(stop => stop.id));
assert.equal(new Set(ids).size, ids.length);
let checked = 0;
for (const day of data.days) {
  for (let minute = 0; minute < 1440; minute++) {
    const hh = String(Math.floor(minute / 60)).padStart(2, '0');
    const mm = String(minute % 60).padStart(2, '0');
    const state = api.plan(new Date(day.dateISO + 'T' + hh + ':' + mm + ':00+08:00'));
    assert.equal(state.state, 'active');
    assert(state.current?.id);
    assert(state.phase);
    checked++;
  }
}
for (const [at, id] of [
  ['2026-11-01T15:50:00+08:00', 'mwyafternoon'],
  ['2026-11-01T19:00:00+08:00', 'mwyshow'],
  ['2026-11-02T15:25:00+08:00', 'airport']
]) assert.equal(api.plan(new Date(at)).current.id, id);
assert.equal(api.plan(new Date('2026-10-30T23:59:00+08:00')).state, 'upcoming');
assert.equal(api.plan(new Date('2026-11-03T00:00:00+08:00')).state, 'finished');
for (let day = 0; day < data.days.length; day++) {
  for (let index = 0; index < data.days[day].stops.length; index++) {
    for (const delta of [-1, 1]) {
      const next = api.adjacent(day, index, delta);
      if (!next) continue;
      assert.equal(api.adjacent(next.dayIdx, next.idx, -delta).stop.id, data.days[day].stops[index].id);
    }
  }
}
for (const rows of Object.values(data.phases)) {
  for (let index = 0; index < rows.length; index++) {
    assert(api.find(rows[index][2]), rows[index][2]);
    if (index) assert(api.minutes(rows[index][0]) > api.minutes(rows[index - 1][0]));
  }
}
console.log('PASS: 3 days, ' + ids.length + ' stops, ' + checked + ' trip minutes, boundaries and cross-day navigation.');
