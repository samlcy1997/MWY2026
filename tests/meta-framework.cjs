// Runtime/component contracts; no browser layout or device claims.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {MessageChannel}=require('node:worker_threads');
const root=path.resolve(__dirname,'..'),dist=fs.existsSync(path.join(root,'dist/index.html'))?path.join(root,'dist'):root;
const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'migration-baseline.json'),'utf8'));
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const moduleCode=html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const timers=new Map();let timerId=0;
const local=new Map(),opened=[],clipboard=[],listeners={};
const tokens={toggle(){},add(){},remove(){},contains(){return false}};
let selectedField=null,execAllowed=true,appendTarget=null;
const document={hidden:false,activeElement:{focus(){}},documentElement:{classList:tokens},body:{style:{},appendChild(el){appendTarget='body';selectedField=el}},querySelectorAll(){return[]},
 getElementById(id){if(id==='metaDialog'||id==='metaSettings')return{appendChild(el){appendTarget='dialog';selectedField=el},querySelectorAll(){return[]}};if(id==='metaSheetScroll')return{scrollTop:0};if(id==='metaSheetClose'||id==='metaSettingsClose')return{focus(){}};return null},
 createElement(){return{style:{},setAttribute(){},focus(){},select(){},setSelectionRange(){},remove(){}}},execCommand(){if(execAllowed)clipboard.push(selectedField.value);return execAllowed},
 addEventListener(name,fn){listeners['document:'+name]=fn},removeEventListener(){}};
const location={protocol:'file:',pathname:'/index.html',search:'?planPreview=2026-11-01T14:20',hash:''};
const history={calls:[],pushState(s,_,hash){this.calls.push(hash);location.hash=hash},replaceState(s,_,hash){this.calls.push(hash);location.hash=hash}};
const window={open(url){opened.push(url)},scrollTo(){},addEventListener(name,fn){listeners[name]=fn},removeEventListener(){}};
const navigator={clipboard:{writeText:async()=>{throw Error('denied')}}};
const ctx={window,document,location,history,navigator,Intl,Date,URLSearchParams,MessageChannel,console,
 localStorage:{getItem:k=>local.get(k)||null,setItem:(k,v)=>local.set(k,v)},
 setTimeout(fn,ms){const id=++timerId;timers.set(id,{fn,ms});return id},clearTimeout(id){timers.delete(id)}};
vm.createContext(ctx);
for(const file of ['meta-data.js','meta-integration.js'])vm.runInContext(fs.readFileSync(path.join(dist,'assets',file),'utf8'),ctx);
const data=window.MWY_DATA,api=window.MWY_FRAMEWORK;
const plain=x=>JSON.parse(JSON.stringify(x));
assert.deepEqual(plain(data.sourceDays),baseline.DAYS);
assert.deepEqual(plain(Object.fromEntries(Object.entries(data.phases).map(([day,rows])=>[day,rows.map(r=>[r[0],r[2]])]))),Object.fromEntries(Object.entries(baseline.PLAN_PHASES).map(([day,rows])=>[day,rows.map(r=>[r[0],r[2]])])));
assert.deepEqual(plain(data.photoMaps),baseline.PHOTO_MAPS);
for(const day of [1,2,3])assert(data.briefs[day].length>=3);
const stops=data.days.flatMap(day=>day.stops),all=[...stops,...Object.values(data.extras)];
assert.equal(stops.length,22);assert.equal(new Set(stops.map(s=>s.id)).size,22);
assert.deepEqual(plain(data.days.map(d=>d.stops.map(({id,time,endTime,addr})=>({id,time,endTime,addr})))),baseline.displayRoute);
for(const [id,image] of [['arrival','pvg-t2.webp'],['lailai','lailai.webp'],['taikang','taikang.webp']]){
 const stop=stops.find(s=>s.id===id);
 assert.equal(stop.img,'./assets/'+image,id+' homepage photo');
 assert.equal(stop.hasPhoto,true,id+' displays image card');
 assert(fs.statSync(path.join(dist,'assets',image)).size>10000,id+' locally bundled photo');
}
for(const day of data.days.slice(0,2))for(const stop of day.stops){
 assert(stop.hasPhoto&&stop.img,stop.id+' has a homepage timeline picture');
 if(stop.img.startsWith('./assets/'))assert(fs.statSync(path.join(dist,stop.img)).size>10000,stop.id+' bundled picture is present');
}
const references=JSON.parse(fs.readFileSync(path.join(__dirname,'content-references.json'),'utf8'));
const unescape=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
function contentReferences(html){const refs=[];for(const [,tag,attributes]of html.matchAll(/<([a-z][\w-]*)\b([^>]*?)>/gi)){for(const field of ['src','href','onclick']){const match=attributes.match(new RegExp('\\b'+field+'=(?:"([^"]*)"|\'([^\']*)\')'));if(match)refs.push([tag,field,unescape(match[1]??match[2])])}}return refs}
for(const [id,expected]of Object.entries(references))assert.deepEqual(contentReferences(api.find(id).stop.richHtml),expected,id+' retains images, links and actions');
const facts={arrival:['12:30','14:15–14:45','龍陽路','人民廣場'],lailai:['天津路506號','松茸鮮肉','純鮮肉','沈大成'],bund:['16:45–17:40','17:40','18:00–18:05','17:06–17:07'],ferry:['18:15','18:30','日落長廊','正大廣場','東方明珠','東泰路×花園石橋路','19:45','20:45','20:55','3.4公里','46分鐘'],mwyafternoon:['萬榮路1056號','15:00','15:25–16:05','16:05–16:20','16:20–17:02','17:02–17:45'],qiqi:['12:10–12:55','13:25','麥當勞','北寶興路296–298號'],haijinzi:['進賢路240號','葱烤大排','13:10–13:15','陝西南路57號','14:00'],hotelreturn:['14:30–14:50','15:15–15:25','15:30'],airport:['15:15–15:25','15:30','75–100','T2','19:05','18:05','17:55']};
for(const [id,required]of Object.entries(facts))for(const fact of required)assert(api.find(id).stop.richHtml.includes(fact),id+' retains '+fact);
const readerCopy=all.map(s=>[s.title,s.subtitle,s.why,s.desc,s.tip,...s.tips,s.richHtml.replace(/<[^>]*>/g,' ')].join(' ')).join(' ');
assert(!/足量正餐|先保主片|慢端|補數|保正餐|保住|顧好|門到門預算|規劃預算|先完成/.test(readerCopy),'Reader-facing copy uses ordinary language');
assert.equal(hash(html.match(/<style>([\s\S]*?)<\/style>/)[1]),baseline.inlineStyle);
for(const day of data.days){assert.deepEqual(plain(day.mapPlaces.map(p=>p.id)),plain(day.stops.map(s=>s.id)));for(const place of day.mapPlaces)if(place.longitude!==null)assert(Number.isFinite(place.longitude)&&Number.isFinite(place.latitude))}
assert.equal(data.days.reduce((sum,d)=>sum+api.mappedPlaces(d.mapPlaces).length,0),14);
assert.equal(data.days[2].mapPlaces[0].address,'陝西南路162號');
assert.equal(data.days[2].mapPlaces[0].longitude,null,'new breakfast uses address navigation until coordinates are verified');
for(const stop of all)for(const [,id]of(stop.richHtml||'').matchAll(/openDetail\('([^']+)'/g))assert(api.find(id));
for(let day=0;day<data.days.length;day++)for(let index=0;index<data.days[day].stops.length;index++)for(const delta of[-1,1]){const n=api.adjacent(day,index,delta);if(n)assert.equal(api.adjacent(n.dayIdx,n.idx,-delta).stop.id,data.days[day].stops[index].id)}
let minutes=0;
for(const day of data.days)for(let m=0;m<1440;m++){
 const at=day.dateISO+'T'+String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')+':00+08:00',state=api.plan(new Date(at));
 const rows=baseline.PLAN_PHASES[data.days.indexOf(day)+1];let index=0;for(let i=1;i<rows.length;i++){if(api.minutes(rows[i][0])>m)break;index=i}
 assert.equal(state.current.id,rows[index][2]);assert(state.phase.note.length>0);minutes++;
}
assert.equal(api.plan(new Date('2026-10-30T23:59:00+08:00')).state,'upcoming');
assert.equal(api.plan(new Date('2026-11-03T00:00:00+08:00')).state,'finished');
assert.equal(api.plan(new Date('2026-11-01T14:20:00+08:00')).compact,'MWY活動');
assert.equal(api.plan(new Date('2026-11-01T13:15:00+08:00')).sub,'13:25 MWY活動');
// Independently specified MASTER milestones, including both sides of changed boundaries.
for(const [at,id,title]of [
 ['2026-10-31T19:44','ferry','陸家嘴區內夜攝'],['2026-10-31T19:45','gundam','叫車／前往LaLaport'],
 ['2026-10-31T20:45','gundam','Freedom戶外廣場找位'],['2026-10-31T20:55','gundam','Freedom夜間SHOW目標'],
 ['2026-11-01T08:15','zhang','前往張師傅早餐'],['2026-11-01T08:35','zhang','張師傅早餐'],
 ['2026-11-01T09:35','mwy','確認入口／入場準備'],['2026-11-01T11:40','qiqi','前往琪琪麵館'],
 ['2026-11-01T12:10','qiqi','琪琪午餐／補水'],['2026-11-01T12:55','qiqi','午餐後返回MWY'],
 ['2026-11-01T13:25','mwyafternoon','MWY展示／粉絲活動'],['2026-11-01T14:40','mwyafternoon','前往EVA'],
 ['2026-11-01T15:00','mwyafternoon','EVA攝影'],['2026-11-01T15:25','mwyafternoon','帶相機返回酒店'],
 ['2026-11-01T16:05','mwyafternoon','酒店放相機／整理輕裝'],['2026-11-01T16:20','xiaoyang','前往協信小楊生煎'],
 ['2026-11-01T17:02','xiaoyang','小楊生煎／補水'],['2026-11-01T17:45','xiaoyang','步行返回VIP會場'],
 ['2026-11-01T18:02','mwyshow','VIP核驗／候場'],['2026-11-01T19:00','mwyshow','VIP演出'],
 ['2026-11-01T20:40','postshow','散場→燒烤慶功→酒店'],
]){const state=api.plan(new Date(at+':00+08:00'));assert.equal(state.current.id,id,at);assert.equal(state.phase.title,title,at);assert(!/有相機先去|如有相機/.test(state.compact+state.sub),at+' uses one camera route')}
assert.equal(data.source.master,'v2026-10-21.1');

// Independent acceptance milestones for the finalized October 21 itinerary.
assert.equal(api.find('taikang').stop.title,'泰康食品／沈大成');
assert.equal(api.find('taikang').stop.endTime,'16:25');
assert.equal(api.find('bund').stop.time,'16:25');
assert(api.find('taikang').stop.richHtml.includes('桂花條頭糕／雙釀團'));
assert.equal(api.find('mwyafternoon').stop.endTime,'16:20');
assert.equal(api.find('xiaoyang').stop.addr,'江場路1212號協信星光廣場北區B1');
assert.equal(api.find('xiaoyang').stop.endTime,'18:02');
assert.equal(api.find('mwyshow').stop.endTime,'20:40');
assert.equal(api.find('postshow').stop.time,'21:35');
assert.equal(api.find('postshow').stop.title,'散場後 · 淄博燒烤');
assert.equal(api.find('postshow').stop.addr,'恒通路與長安路交叉口北約40米');
assert.deepEqual(plain(data.phases[2].map(r=>r[0])),[
 '00:00','08:15','08:35','09:00','09:35','10:00','11:40','12:10','12:55','13:25',
 '14:40','15:00','15:25','16:05','16:20','17:02','17:45','18:02','19:00','20:40'
]);
for(const day2stop of data.days[1].stops)assert(!/14:20–14:55|15:35–15:50|16:15–17:20|17:45–18:00/.test(JSON.stringify(day2stop)),'old Day2 times removed from '+day2stop.id);
// Old script query versions are deliberate; the worker must bypass HTTP cache for both files.
const sw=fs.readFileSync(path.join(dist,'sw.js'),'utf8');
assert(sw.includes('mwy2026-meta13-master-20261021.1'));
assert(sw.includes("cache.add(new Request('./assets/meta-data.js?v=meta11',{cache:'reload'}))"));
assert(sw.includes("cache.add(new Request('./assets/meta-integration.js?v=meta6',{cache:'reload'}))"));

for(const [at,id,title]of [
 ['07:45','wangji','退房／寄存行李'],['08:00','wangji','前往卞姐蛋餅'],
 ['08:29','wangji','前往卞姐蛋餅'],['08:30','wangji','卞姐蛋餅早餐'],
 ['08:54','wangji','卞姐蛋餅早餐'],['08:55','wukang','前往武康大樓'],
 ['09:24','wukang','前往武康大樓'],['09:25','wukang','武康大樓／武康路街拍'],
]){const state=api.plan(new Date('2026-11-02T'+at+':00+08:00'));assert.equal(state.current.id,id,at);assert.equal(state.phase.title,title,at)}
const breakfast=api.find('wangji').stop;
assert.equal(breakfast.title,'卞姐蛋餅');assert.equal(breakfast.time,'08:30');assert.equal(breakfast.endTime,'08:55');
assert.equal(api.actionAddress(breakfast),'陝西南路162號');
for(const fact of ['08:30–08:55','雙蛋蛋餅','油條','現磨豆漿','超過15分鐘','08:55','10號線','30分鐘'])assert(breakfast.richHtml.includes(fact),'breakfast retains '+fact);
assert(!/王記|東諸安浜|江蘇路|11號線/.test(JSON.stringify(data)),'superseded breakfast/address/route removed from all user-facing data');
assert.equal(api.find('ferry').stop.title,'陸家嘴夜攝');
assert.equal(api.find('gundambase').stop.optional,true);
assert.equal(api.actionAddress(api.find('qiqi').stop),'北寶興路296–298號');
// Content-only revision: freeze the shipped renderer, stylesheet, stable IDs and detail geometry.
const ui=JSON.parse(fs.readFileSync(path.join(__dirname,'content-ui-baseline.json'),'utf8'));
assert.equal(hash(moduleCode),ui.renderer,'React components and their class/style props remain unchanged');
assert.equal(hash(fs.readFileSync(path.join(dist,'assets/meta-integration.css'),'utf8')),ui.integrationCss,'all sizes/positions/sticky layers remain unchanged');
assert.deepEqual(plain(data.days.map(d=>d.stops.map(s=>s.id))),ui.ids,'notes and completion IDs remain stable');
assert.deepEqual(plain(stops.map(({id,img,hasPhoto})=>({id,img,hasPhoto}))),ui.images,'timeline photos match the approved image-only revision');
const imageOnlyContent=plain(data);
for(const day of imageOnlyContent.days.slice(0,2))for(const stop of day.stops){delete stop.img;delete stop.hasPhoto}
assert.equal(hash(JSON.stringify(imageOnlyContent)),ui.imageOnlyContent,'itinerary content matches the approved MASTER revision');
assert.equal(hash(JSON.stringify(data.days[2])),ui.day3,'Day 3 matches MASTER v2026-10-20.6');
assert.equal(hash(JSON.stringify({days:data.days.slice(0,2),sourceDays:[data.sourceDays[1],data.sourceDays[2]],phases:[data.phases[1],data.phases[2]],briefs:[data.briefs[1],data.briefs[2]]})),ui.day12,'Day1/2 remain exactly unchanged');
assert.equal(hash(JSON.stringify({stops:data.days[2].stops.slice(1),mapPlaces:data.days[2].mapPlaces.slice(1),phases:data.phases[3].slice(5),sourceItems:data.sourceDays[3].items.slice(1)})),ui.day3Continuation,'Day3 after breakfast/arrival at Wukang is unchanged');
function richGeometry(text){return[...text.matchAll(/<(\/?)([a-z][\w-]*)\b([^>]*?)>/gi)].map(([,close,tag,attrs])=>[close,tag,[...attrs.matchAll(/\b(class|style|id|width|height)="([^"]*)"/g)].map(([,k,v])=>[k,v])])}
for(const stop of all)assert.equal(hash(JSON.stringify(richGeometry(stop.richHtml))),ui.detailGeometry[stop.id],stop.id+' preserves detail component structure and geometry');
assert(!/Z8|Nikon|24-120|CX\d{3}|長安路1109|HK\$267/.test(JSON.stringify(data)),'Private MASTER fields remain excluded');
assert.equal(api.actionAddress(api.find('arrival').stop),data.hotel);assert.equal(api.actionAddress(api.find('postshow').stop),'恒通路與長安路交叉口北約40米');
assert.equal(api.actionAddress(api.find('zx').stop),api.find('zx').stop.addr);

// Render the shipped component into an element tree, using a minimal hook runtime.
let hooks=[],cursor=0,effects=[];
ctx.bl={useState(initial){const i=cursor++;if(!(i in hooks))hooks[i]=typeof initial==='function'?initial():initial;return[hooks[i],v=>{hooks[i]=typeof v==='function'?v(hooks[i]):v}]},useRef(initial){const i=cursor++;return hooks[i]??=( {current:initial})},useMemo(fn){cursor++;return fn()},useEffect(fn,deps){const i=cursor++,old=hooks[i];if(!old||deps.some((d,j)=>!Object.is(d,old.deps[j]))){effects.push(()=>{old?.cleanup?.();hooks[i]={deps,cleanup:fn()}})}}};
const element=(type,props,key)=>({type,props:props||{},key});ctx.L1=ctx.T1=element;
ctx._0=data.days;ctx.MWY_META=api;ctx.Pr={default:{}};
ctx.L8=()=>api.clock().hour;ctx.S8=()=>false;ctx.K8=Symbol('Fragment');
const app=moduleCode.slice(moduleCode.indexOf('function UW(){'),moduleCode.lastIndexOf('iV.createRoot'));
for(const [,name]of app.matchAll(/(?:L1|T1)\(([A-Za-z_$][\w$]*),/g))if(!(name in ctx))ctx[name]=function Icon(){};
vm.runInContext(app,ctx);
function render(){cursor=0;effects=[];const tree=vm.runInContext('UW()',ctx);for(const run of effects)run();return tree}
function nodes(tree,predicate,result=[]){if(!tree||typeof tree!=='object')return result;if(predicate(tree))result.push(tree);const c=tree.props?.children;for(const child of Array.isArray(c)?c:[c])if(Array.isArray(child))child.forEach(x=>nodes(x,predicate,result));else nodes(child,predicate,result);return result}
function text(tree){if(tree==null||typeof tree==='boolean')return'';if(typeof tree!=='object')return String(tree);const c=tree.props?.children;return(Array.isArray(c)?c:[c]).map(x=>Array.isArray(x)?x.map(text).join(''):text(x)).join('')}
let tree=render();
assert.equal(nodes(tree,n=>n.type==='details'&&n.props.className==='mwy-day-brief').length,1);
assert(text(tree).includes(data.briefs[1][0]));
window.openDetail('mwyafternoon');tree=render();
assert.equal(nodes(tree,n=>n.props.id==='metaNowBar').length,1);
assert(text(nodes(tree,n=>n.props.className==='mwy-phase-note')[0]).includes(api.plan().phase.note));
assert(text(tree).includes('EVA攝影'));
assert(!text(tree).includes('有相機先去'));
const sheet=nodes(tree,n=>n.props.id==='metaSheetScroll')[0];assert.equal(typeof sheet.props.onTouchStart,'function');assert.equal(typeof sheet.props.onTouchEnd,'function');
const before=history.calls.length;nodes(tree,n=>n.type==='button'&&n.props.className==='mwy-now-jump')[0].props.onClick();assert.equal(history.calls.length,before,'Opening the current detail again does not navigate');
window.openDetail('arrival');tree=render();
const arrivalCopy=nodes(tree,n=>n.type==='button'&&text(n).trim()==='複製住宿地址')[0];assert(arrivalCopy);
const arrivalNav=nodes(tree,n=>n.type==='button'&&text(n).trim()==='前往酒店')[0];assert(arrivalNav);arrivalNav.props.onClick();assert(opened.at(-1).includes(encodeURIComponent(data.hotel)));
let scroller=nodes(tree,n=>n.props.id==='metaSheetScroll')[0];
scroller.props.onTouchStart({touches:[{clientX:200,clientY:100}],target:{closest:()=>null}});scroller.props.onTouchEnd({changedTouches:[{clientX:90,clientY:105}]});tree=render();
assert.equal(nodes(tree,n=>n.props.id==='metaSheetTitle')[0].props.children,'萊萊小籠');
scroller=nodes(tree,n=>n.props.id==='metaSheetScroll')[0];scroller.props.onTouchStart({touches:[{clientX:200,clientY:100}],target:{closest:()=>({})}});scroller.props.onTouchEnd({changedTouches:[{clientX:90,clientY:100}]});tree=render();
assert.equal(nodes(tree,n=>n.props.id==='metaSheetTitle')[0].props.children,'萊萊小籠');

// Storage failures stay visible, rather than presenting a successful save.
const originalSet=ctx.localStorage.setItem;
ctx.localStorage.setItem=()=>{throw Error('storage denied')};
const note=nodes(tree,n=>n.type==='textarea')[0];note.props.onChange({target:{value:'test note'}});tree=render();tree=render();
assert(text(tree).includes('未能儲存，請複製備份'));
nodes(tree,n=>n.props.className==='mwy-complete-action')[0].props.onClick();tree=render();tree=render();
assert(text(tree).includes('完成標記未能儲存'));
ctx.localStorage.setItem=originalSet;
nodes(tree,n=>n.type==='textarea')[0].props.onChange({target:{value:'saved note'}});tree=render();tree=render();
assert.equal(JSON.parse(local.get('mwy-meta-notes')).lailai,'saved note');
assert(!text(tree).includes('未能儲存，請複製備份'));

// Settings contain the appearance/real offline controls; Escape closes and restores the day hash.
nodes(tree,n=>n.props.id==='metaSheetClose')[0].props.onClick();tree=render();
nodes(tree,n=>n.props['aria-label']==='外觀與離線設定')[0].props.onClick();tree=render();
assert.equal(location.hash,'#settings');assert.equal(nodes(tree,n=>n.props.id==='metaSettings').length,1);
assert.equal(nodes(tree,n=>n.props.className==='mwy-theme-options').length,1);
assert.equal(nodes(tree,n=>n.props.className==='mwy-offline-download').length,1);
nodes(tree,n=>n.type==='button'&&text(n)==='夜間')[0].props.onClick();tree=render();tree=render();
assert.equal(nodes(tree,n=>n.type==='button'&&text(n)==='夜間')[0].props['aria-pressed'],true);
assert.equal(JSON.parse(local.get('mwy-meta-appearance')),'dark');
ctx.localStorage.setItem=()=>{throw Error('storage denied')};
nodes(tree,n=>n.type==='button'&&text(n)==='日間')[0].props.onClick();tree=render();tree=render();
assert(text(tree).includes('外觀設定未能儲存'));
ctx.localStorage.setItem=originalSet;
nodes(tree,n=>n.type==='button'&&text(n)==='夜間')[0].props.onClick();tree=render();tree=render();
assert(!text(tree).includes('外觀設定未能儲存'));
listeners['document:keydown']({key:'Escape',preventDefault(){}});tree=render();
assert.equal(nodes(tree,n=>n.props.id==='metaSettings').length,0);assert(location.hash.startsWith('#day-'));

(async()=>{
 assert.equal(await api.copy('天津路506號'),true);assert.equal(appendTarget,'dialog');assert.equal(clipboard.at(-1),'天津路506號');
 execAllowed=false;assert.equal(await api.copy('測試地址'),false);execAllowed=true;
 assert.equal(await api.offline(),true);assert.equal((await api.warm()).localFile,true);
 location.protocol='https:';delete navigator.serviceWorker;await assert.rejects(api.warm(),/unsupported/);
 navigator.serviceWorker={ready:new Promise(()=>{})};const pending=api.warm();const timeout=[...timers.values()].find(t=>t.ms===15000);assert(timeout);timeout.fn();await assert.rejects(pending,/worker-timeout/);
 navigator.serviceWorker={ready:Promise.resolve({active:{postMessage(message,ports){assert.equal(message.type,'PREWARM');ports[0].postMessage({cached:2,failed:0,total:2})}}})};
 assert.deepEqual(await api.warm(),{cached:2,failed:0,total:2});
 const progress=[];
 navigator.serviceWorker={ready:Promise.resolve({active:{postMessage(_,ports){ports[0].postMessage({type:'progress',cached:1,failed:0,total:2});ports[0].postMessage({cached:2,failed:0,total:2})}}})};
 assert.deepEqual(await api.warm(p=>progress.push(p)),{cached:2,failed:0,total:2});assert.equal(progress.length,1);assert.equal(progress[0].cached,1);

 // The daily map makes no map request until expanded, and has a useful failure state.
 hooks=[];
 let dailyConstructed=0,dailyRemoved=0,dailyMap;
 ctx.PV={};ctx.TV={};
 class DailyMap{constructor(){dailyConstructed++;dailyMap=this;this.events={}}addControl(){}on(name,fn){this.events[name]=fn}remove(){dailyRemoved++}}
 ctx.Pr={default:{Map:DailyMap,NavigationControl:class{}}};
 vm.runInContext(moduleCode.slice(moduleCode.indexOf('function tF('),moduleCode.indexOf('function UW(){')),ctx);
 function renderDaily(){cursor=0;effects=[];const result=vm.runInContext('tF({poster:"",places:MWY_META.find("arrival")?window.MWY_DATA.days[0].mapPlaces:[],title:"Day1",isDark:false})',ctx);for(const node of nodes(result,n=>n.props.ref))node.props.ref.current={};for(const run of effects)run();return result}
 let daily=renderDaily();assert.equal(dailyConstructed,0);assert.equal(nodes(daily,n=>n.type==='button').length,data.days[0].stops.length);
 nodes(daily,n=>n.type==='details')[0].props.onToggle({currentTarget:{open:true}});daily=renderDaily();assert.equal(dailyConstructed,1);
 dailyMap.events.error();daily=renderDaily();assert(text(daily).includes('地圖暫時未能載入'));assert(dailyRemoved>0);
 nodes(daily,n=>n.type==='details')[0].props.onToggle({currentTarget:{open:false}});daily=renderDaily();
 nodes(daily,n=>n.type==='details')[0].props.onToggle({currentTarget:{open:true}});daily=renderDaily();assert.equal(dailyConstructed,2);

 // A hidden photo map waits for disclosure; load adds route/markers, failure gives a textual fallback.
 const previousGet=document.getElementById;let isOpen=false,constructed=0,removed=0,resized=0;const toggles=new Set(),markers=[],sources=[],layers=[];let map;
 const detail={tagName:'DETAILS',get open(){return isOpen},parentElement:null,addEventListener(_,fn){toggles.add(fn)},removeEventListener(_,fn){toggles.delete(fn)}};
 const target={parentElement:detail,get clientWidth(){return isOpen?300:0},textContent:''};document.getElementById=()=>target;
 class Map{constructor(){constructed++;map=this;this.events={}}on(name,fn){this.events[name]=fn;return this}addSource(...x){sources.push(x)}addLayer(x){layers.push(x)}fitBounds(){}resize(){resized++}remove(){removed++}}
 class Marker{constructor(options){markers.push(options.element)}setLngLat(){return this}addTo(){return this}}
 class Bounds{extend(){return this}}
 let cleanup=api.richMaps({id:'bund'},{Map,Marker,LngLatBounds:Bounds});assert.equal(constructed,0);
 isOpen=true;for(const toggle of toggles)toggle();assert.equal(constructed,1);map.events.load();assert(layers.some(x=>x.id==='photo-route-line'));assert.equal(markers.length,data.photoMaps.bund.points.length);assert(markers.some(m=>m.className.includes('hot')));assert(resized>0);cleanup();assert.equal(toggles.size,0);
 cleanup=api.richMaps({id:'bund'},{Map,Marker,LngLatBounds:Bounds});map.events.error();assert(target.textContent.includes('暫時無法載入'));cleanup();assert(removed>=2);document.getElementById=previousGet;
 const sw=fs.readFileSync(path.join(dist,'sw.js'),'utf8');const core=JSON.parse(sw.match(/const CORE=(\[[^;]+\]);/)[1]);for(const resource of core){const file=resource.split('?')[0];assert(fs.existsSync(path.join(dist,file)),resource)}
 assert(sw.includes('mwy2026-meta11-master-20261020.6'));assert(html.includes('./assets/meta-integration.css?v=meta6'));assert(html.includes('./assets/meta-data.js?v=meta11'));assert(html.includes('./assets/meta-integration.js?v=meta6'));assert(!/\?v=meta[123](?:["&]|$)/.test(html));
 const workerEvents={},workerMessages=[];let workerPending;
 const workerContext={self:{addEventListener(name,fn){workerEvents[name]=fn}},caches:{open:async()=>({match:async()=>null,put:async()=>{}})},Request,Response,URL,AbortController,setTimeout,clearTimeout,fetch:async()=>new Response('image')};
 vm.runInNewContext(sw,workerContext);
 workerEvents.message({data:{type:'PREWARM'},ports:[{postMessage(message){workerMessages.push(message)}}],waitUntil(promise){workerPending=promise}});
 await workerPending;
 const workerResult=workerMessages.at(-1);assert.equal(workerResult.failed,0);assert.equal(workerResult.cached,workerResult.total);
 assert.equal(workerMessages.filter(m=>m.type==='progress').length,workerResult.total);assert(workerMessages.some(m=>m.type==='progress'&&m.cached<workerResult.total));
 console.log('PASS: MASTER v2026-10-20.6 breakfast/transport milestones, unchanged renderer/CSS/detail geometry/Day1/Day2/Day3 continuation, '+minutes+' trip minutes, storage recovery, settings, offline progress, maps and migration controls.');
})().catch(error=>{console.error(error);process.exitCode=1});
