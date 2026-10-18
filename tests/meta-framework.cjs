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
const references=JSON.parse(fs.readFileSync(path.join(__dirname,'content-references.json'),'utf8'));
const unescape=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
function contentReferences(html){const refs=[];for(const [,tag,attributes]of html.matchAll(/<([a-z][\w-]*)\b([^>]*?)>/gi)){for(const field of ['src','href','onclick']){const match=attributes.match(new RegExp('\\b'+field+'=(?:"([^"]*)"|\'([^\']*)\')'));if(match)refs.push([tag,field,unescape(match[1]??match[2])])}}return refs}
for(const [id,expected]of Object.entries(references))assert.deepEqual(contentReferences(api.find(id).stop.richHtml),expected,id+' retains images, links and actions');
const facts={arrival:['12:30','14:15–14:45','龍陽路','人民廣場'],lailai:['天津路506號','松茸鮮肉','純鮮肉','沈大成'],bund:['16:45–17:40','17:40','18:00–18:05','17:06–17:07'],ferry:['18:15','18:30','19:05'],mwyafternoon:['萬榮路1056號','14:20','14:55–15:45','15:45–16:00','16:00–16:40','16:40–17:25'],haijinzi:['進賢路240號','葱烤大排','13:10–13:15','陝西南路57號','14:00'],hotelreturn:['14:30–14:50','15:15–15:25','15:30'],airport:['15:15–15:25','15:30','75–100','T2','19:05']};
for(const [id,required]of Object.entries(facts))for(const fact of required)assert(api.find(id).stop.richHtml.includes(fact),id+' retains '+fact);
const readerCopy=all.map(s=>[s.title,s.subtitle,s.why,s.desc,s.tip,...s.tips,s.richHtml.replace(/<[^>]*>/g,' ')].join(' ')).join(' ');
assert(!/足量正餐|先保主片|慢端|補數|保正餐|保住|顧好|門到門預算|規劃預算|先完成/.test(readerCopy),'Reader-facing copy uses ordinary language');
assert.equal(hash(html.match(/<style>([\s\S]*?)<\/style>/)[1]),baseline.inlineStyle);
for(const day of data.days){assert.deepEqual(plain(day.mapPlaces.map(p=>p.id)),plain(day.stops.map(s=>s.id)));for(const place of day.mapPlaces)if(place.longitude!==null)assert(Number.isFinite(place.longitude)&&Number.isFinite(place.latitude))}
assert.equal(data.days.reduce((sum,d)=>sum+api.mappedPlaces(d.mapPlaces).length,0),15);
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
assert(api.plan(new Date('2026-11-01T14:20:00+08:00')).compact.includes('有相機先去'));
assert(api.plan(new Date('2026-11-01T13:15:00+08:00')).sub.includes('有相機先去'));
assert(!/Z8|Nikon|24-120|CX\d{3}|長安路1109|HK\$267/.test(JSON.stringify(data)),'Private MASTER fields remain excluded');
assert.equal(api.actionAddress(api.find('arrival').stop),data.hotel);assert.equal(api.actionAddress(api.find('postshow').stop),data.hotel);
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
assert(text(tree).includes('有相機先去'));
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
 assert(sw.includes('mwy2026-meta4-master-20261017.1'));assert(!/\?v=meta[123]/.test(html));
 const workerEvents={},workerMessages=[];let workerPending;
 const workerContext={self:{addEventListener(name,fn){workerEvents[name]=fn}},caches:{open:async()=>({match:async()=>null,put:async()=>{}})},Request,Response,URL,AbortController,setTimeout,clearTimeout,fetch:async()=>new Response('image')};
 vm.runInNewContext(sw,workerContext);
 workerEvents.message({data:{type:'PREWARM'},ports:[{postMessage(message){workerMessages.push(message)}}],waitUntil(promise){workerPending=promise}});
 await workerPending;
 const workerResult=workerMessages.at(-1);assert.equal(workerResult.failed,0);assert.equal(workerResult.cached,workerResult.total);
 assert.equal(workerMessages.filter(m=>m.type==='progress').length,workerResult.total);assert(workerMessages.some(m=>m.type==='progress'&&m.cached<workerResult.total));
 console.log('PASS: unchanged route/style/media facts, '+minutes+' trip minutes, storage failures/recovery, settings/Escape, offline progress, lazy daily maps and migration controls.');
})().catch(error=>{console.error(error);process.exitCode=1});
