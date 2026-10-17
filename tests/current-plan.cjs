// Runtime/DOM contracts only: no browser layout, real location or transport verification.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {evaluate,node,context,data}=require('./master-content.cjs');
const read=code=>JSON.parse(evaluate(`JSON.stringify(${code})`));
const state=(date,time)=>read(`planState({date:${JSON.stringify(date)},minutes:stopMinutes(${JSON.stringify(time)})})`);
const phase=(date,time,title,id)=>{const s=state(date,time);assert.equal(s.phase.title,title,`${date} ${time}`);assert.equal(s.phase.detailId,id);return s};

// UTC instants must be converted to Shanghai, regardless of the device's display zone.
assert.deepEqual(read("shanghaiClock(new Date('2026-10-30T16:00:00Z'))"),{date:'2026-10-31',minutes:0});
assert.deepEqual(read("shanghaiClock(new Date('2026-11-01T07:50:00Z'))"),{date:'2026-11-01',minutes:950});
assert.deepEqual(read("shanghaiClock(new Date('2026-11-02T16:00:00Z'))"),{date:'2026-11-03',minutes:0});
assert.equal(state('2026-10-30','23:59').state,'upcoming');
assert.equal(state('2026-10-31','00:00').phase.title,'出發前準備');
assert.equal(state('2026-11-01','00:00').phase.title,'休息／早餐前準備');
assert.equal(state('2026-11-02','00:00').phase.title,'休息／退房前準備');
assert.equal(state('2026-11-03','00:00').state,'finished');
assert.equal(state('2027-01-01','12:00').state,'finished');
assert.equal(evaluate("currentPlanTarget({date:'2026-10-18',minutes:74})"),null);
assert.equal(evaluate("currentPlanTarget({date:'2026-11-03',minutes:0})"),null);

phase('2026-10-31','17:39','外灘日落／藍調攝影','bund');
phase('2026-10-31','17:40','沿外灘往金陵東路渡口','ferry');
phase('2026-10-31','18:04','沿外灘往金陵東路渡口','ferry');
assert.ok(phase('2026-10-31','18:05','輪渡候船／過江','ferry').phase.note.includes('班次仍待核'));
assert.ok(phase('2026-10-31','18:25','浦東濱江反拍外灘','ferry').phase.note.includes('過江順利才拍'));
phase('2026-11-01','14:19','相機分支：步行往EVA','mwyafternoon');
assert.ok(phase('2026-11-01','14:20','相機分支：EVA攝影','mwyafternoon').phase.note.includes('無帶機留MWY'));
phase('2026-11-01','14:55','相機分支：直接返酒店','mwyafternoon');
phase('2026-11-01','15:44','相機分支：直接返酒店','mwyafternoon');
phase('2026-11-01','15:45','酒店放相機／整理輕裝','mwyafternoon');
phase('2026-11-01','15:59','酒店放相機／整理輕裝','mwyafternoon');
phase('2026-11-01','16:00','輕裝返回MWY會場附近','mwyafternoon');
phase('2026-11-01','16:40','晚餐／補水／休息','xiaoyang');
phase('2026-11-01','17:25','前往VIP入場區','mwyshow');
phase('2026-11-01','17:45','VIP核驗／候場','mwyshow');
phase('2026-11-01','19:00','VIP演出／散場後休息','mwyshow');
phase('2026-11-02','12:29','新世界城／CAPCOM','newworld');
phase('2026-11-02','12:30','前往海金滋午餐','haijinzi');
phase('2026-11-02','13:00','本幫菜午餐','haijinzi');
phase('2026-11-02','13:50','1號線返回酒店','hotelreturn');
phase('2026-11-02','14:30','回酒店取行李／整理離店','hotelreturn');
phase('2026-11-02','15:15','地鐵／磁浮前往PVG T2','airport');
phase('2026-11-02','16:30','抵達T2／登機手續／候機','airport');
phase('2026-11-02','19:05','返程航班階段','airport');
assert.equal(state('2026-10-31','23:59').next.start,'08:00');
assert.equal(state('2026-10-31','23:59').next.day,2);
assert.equal(state('2026-11-01','23:59').next.start,'07:45');
assert.equal(state('2026-11-02','23:59').next,null);

// Every minute of the three days maps to one valid, ordered phase and same-day detail.
assert.equal(evaluate(`(()=>{
 for(const [date,day] of Object.entries(TRIP_DATES)){
  const rows=PLAN_PHASES[day];if(rows[0][0]!=='00:00')return false;
  for(let i=0;i<rows.length;i++){
   if(!DAYS[day].items.some(item=>item.id===rows[i][2]))return false;
   if(i&&stopMinutes(rows[i-1][0])>=stopMinutes(rows[i][0]))return false;
  }
  for(let minutes=0;minutes<1440;minutes++){
   const s=planState({date,minutes});
   if(s.day!==day||stopMinutes(s.phase.start)>minutes||stopMinutes(s.phase.end)<=minutes)return false;
  }
 }
 return true;
})()`),true);

// Render into stable elements; time updates must not change the selected itinerary day.
evaluate('const savedShanghaiClock=shanghaiClock; currentDay=1; shanghaiClock=()=>({date:"2026-11-01",minutes:950})');
evaluate('refreshPlanShortcut()');
assert.equal(evaluate('currentDay'),1);
assert.equal(node('#currentPlanTitle').textContent,'酒店放相機／整理輕裝');
assert.equal(node('#currentPlanRange').textContent,'15:45–16:00');
assert.equal(node('#currentPlanClock').textContent,'上海 11/01 15:50');
assert.equal(node('#currentPlanClock').getAttribute('datetime'),'2026-11-01T15:50:00+08:00');
assert.equal(node('#currentPlanNext').textContent,'16:00 輕裝返回MWY會場附近');
assert.ok(node('#currentPlanNote').textContent.includes('無帶機留MWY'));
assert.ok(node('#planShortcut').getAttribute('aria-label').includes('酒店放相機'));
assert.equal(node('#planShortcut').classList.contains('hidden'),false);
evaluate('openPlanShortcut()');
assert.equal(evaluate('detailCurrentId'),'mwyafternoon');
evaluate('hideDetail()');
let writes=0,value=node('#currentPlanTitle').textContent;
Object.defineProperty(node('#currentPlanTitle'),'textContent',{configurable:true,get(){return value},set(x){writes++;value=x}});
evaluate('shanghaiClock=()=>({date:"2026-11-01",minutes:951});refreshPlanShortcut()');
assert.equal(writes,0,'Within-phase clock ticks must not replace the focused title or announce unchanged content');
assert.equal(node('#currentPlanClock').textContent,'上海 11/01 15:51');
evaluate('shanghaiClock=()=>({date:"2026-11-01",minutes:960});refreshPlanShortcut()');
assert.equal(writes,1);
assert.equal(node('#currentPlanTitle').textContent,'輕裝返回MWY會場附近');

evaluate('shanghaiClock=()=>({date:"2026-10-18",minutes:74});refreshPlanShortcut()');
assert.equal(node('#currentPlanTitle').textContent,'行程尚未開始');
assert.equal(node('#currentPlanNext').textContent,'10/31 09:45 啟程前往上海');
assert.equal(node('#planShortcut').classList.contains('hidden'),true);
evaluate('openPlanShortcut()');assert.equal(evaluate('detailCurrentId'),'arrival');evaluate('hideDetail()');
evaluate('shanghaiClock=()=>({date:"2026-11-03",minutes:0});refreshPlanShortcut()');
assert.equal(node('#currentPlanTitle').textContent,'三日行程已結束');
assert.equal(node('#currentPlanNextRow').classList.contains('hidden'),true);
assert.equal(node('#planShortcut').classList.contains('hidden'),true);
evaluate('openPlanShortcut()');assert.equal(evaluate('currentDay'),3);

// A preview must be explicit, bounded to the trip, and never persist on ordinary URLs.
evaluate('location.search="?planPreview=2026-11-01T15:50";refreshPlanShortcut()');
assert.equal(node('#currentPlanLabel').textContent,'預覽 · 第2日 · 按計劃');
assert.equal(node('#currentPlanTitle').textContent,'酒店放相機／整理輕裝');
assert.equal(node('#currentPlanLive').classList.contains('hidden'),false);
assert.equal(read('planClock()').preview,true);
for(const value of ['2026-11-01T24:00','2026-11-01T15:60','2026-11-04T15:50','invalid','2026-11-01T15:50<script>']){
 evaluate(`location.search=${JSON.stringify('?planPreview='+encodeURIComponent(value))}`);
 assert.ok(!read('planClock()').preview,`Reject invalid preview ${value}`);
}
evaluate('location.search="";refreshPlanShortcut()');
assert.equal(node('#currentPlanLive').classList.contains('hidden'),true);
assert.equal(node('#currentPlanTitle').textContent,'三日行程已結束');

// Minute-aligned scheduling also refreshes after returning to the tab / BFCache.
let scheduled;
context.setTimeout=(fn,delay)=>{scheduled={fn,delay};return 123};
evaluate('schedulePlanRefresh()');
assert.ok(scheduled.delay>0&&scheduled.delay<=60040);
assert.equal(typeof scheduled.fn,'function');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.ok(html.includes("if(!document.hidden)schedulePlanRefresh()"));
assert.ok(html.includes("window.addEventListener('pageshow',schedulePlanRefresh)"));
assert.ok(html.includes('${currentPlanHTML()}<section id="dayView">'),'Current phase is independent of selected day, map and guide views');
const markup=evaluate('currentPlanHTML()');
assert.ok(markup.includes('aria-live="polite"')&&markup.includes('aria-atomic="true"'));
assert.ok(markup.includes('aria-describedby="currentPlanRange currentPlanNote"'));
assert.ok(markup.includes('<button')&&markup.includes('<time'));
assert.ok(html.includes('href="./assets/current-plan.css"'));
assert.ok(fs.readFileSync(path.join(root,'sw.js'),'utf8').includes('"./assets/current-plan.css"'));
evaluate('shanghaiClock=savedShanghaiClock');
console.log('PASS: Shanghai timezone, phase boundaries, all 4,320 trip minutes, conditional routes, next steps, DOM updates and minute refresh.');
