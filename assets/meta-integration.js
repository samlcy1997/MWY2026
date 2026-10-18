/* Behaviour adapter for Meta's original React HTML. No replacement card or sheet renderer. */
(function(){
'use strict';
const DATA=window.MWY_DATA,TRIP_START='2026-10-31',TRIP_END='2026-11-02';
const aliases={xjh:'zx',zhangyuan:'hotelreturn'};
const labels={
 '出發前準備':'出發準備','啟程前往上海':'前往上海','入境、取行李／前往酒店':'入境與行李','下午正餐':'下午正餐','餐後前往外灘':'前往外灘','往外灘／外白渡橋短拍':'外白渡橋','外灘日落／藍調攝影':'外灘攝影','沿外灘往金陵東路渡口':'前往渡口','輪渡候船／過江':'輪渡過江','浦東濱江反拍外灘':'浦東夜攝','叫車／前往LaLaport':'前往金橋','Freedom Gundam夜攝':'高達夜攝','Gundam Base重點逛店':'高達基地','離LaLaport／9號線返市中心':'返回市中心','東泰祥宵夜／返酒店':'東泰祥宵夜','回酒店／休息':'回酒店休息','休息／早餐前準備':'早餐前準備','張師傅早餐':'張師傅早餐','前往MWY會場':'前往會場','確認入口／入場準備':'入場準備','MWY場販／展示':'MWY場販','會場附近午餐／補水':'午餐補水','MWY展示／粉絲活動':'MWY活動','步行前往EVA':'前往EVA','EVA攝影':'EVA攝影','帶相機返回酒店':'返酒店放機','酒店放相機／整理輕裝':'放好相機','輕裝返回MWY會場附近':'輕裝回場','晚餐／補水／休息':'晚餐休息','前往VIP入場區':'前往VIP入口','VIP核驗／候場':'VIP入場','VIP演出／散場後休息':'VIP演唱會','休息／退房前準備':'退房前準備','退房／寄存行李':'退房寄存','前往王記早餐':'前往王記','王記葱油餅早餐':'王記早餐','前往武康大樓':'前往武康路','武康大樓／武康路街拍':'武康路街拍','10號線前往百聯ZX':'前往百聯ZX','百聯ZX模型／遊戲IP':'百聯ZX','沿南京路向西往新世界城':'前往新世界城','新世界城／CAPCOM':'新世界城','前往海金滋午餐':'去吃午飯','本幫菜午餐':'本幫菜午餐','1號線返回酒店':'返回酒店','回酒店取行李／整理離店':'取行李','地鐵／磁浮前往PVG T2':'前往機場','抵達T2／登機手續／候機':'T2登機手續','返程航班階段':'返程航班'
};
function minutes(value){const m=String(value).match(/(\d{1,2}):(\d{2})/);return m?+m[1]*60+(+m[2]):0}
function preview(){const p=new URLSearchParams(location.search).get('planPreview')||'';const m=p.match(/^(2026-\d{2}-\d{2})T(\d{2}):(\d{2})$/);return m&&DATA.tripDates[m[1]]&&+m[2]<24&&+m[3]<60?p:null}
function now(){const p=preview();return p?new Date(p+':00+08:00'):new Date()}
function clock(input=now()){
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(input).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
 return{date:`${parts.year}-${parts.month}-${parts.day}`,minutes:+parts.hour*60+(+parts.minute),hhmm:`${parts.hour}:${parts.minute}`,hour:+parts.hour};
}
function find(id){id=aliases[id]||id;for(let dayIdx=0;dayIdx<DATA.days.length;dayIdx++){const idx=DATA.days[dayIdx].stops.findIndex(s=>s.id===id);if(idx>=0)return{stop:DATA.days[dayIdx].stops[idx],dayIdx,idx}}return DATA.extras[id]?{stop:DATA.extras[id],dayIdx:0,idx:-1}:null}
function phase(day,index){const rows=DATA.phases[day],row=rows[index];return{day,start:row[0],end:rows[index+1]?.[0]||'24:00',title:row[1],id:row[2],note:row[3]||''}}
function short(title){return labels[title]||title}
function caption(phase){
 const t=minutes(phase.start),title=short(phase.title);
 if(phase.day===2&&t>=840&&t<895)return '有相機先去・'+title;
 if(phase.day===2&&t>=895&&t<1000)return '如有相機・'+title;
 if(phase.day===1&&phase.id==='ferry')return '船班未確認・'+title;
 return title;
}
function mappedPlaces(places){return places.filter(p=>Number.isFinite(p.longitude)&&Number.isFinite(p.latitude))}
function actionIsHotel(stop){return stop?.id==='arrival'||stop?.id==='postshow'||!stop?.addr}
function actionAddress(stop){return actionIsHotel(stop)?DATA.hotel:stop.addr}
async function copy(text){
 if(!text)return false;
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);return true}}catch{}
 let field,previous=document.activeElement;
 try{
  field=document.createElement('textarea');field.value=text;field.setAttribute('readonly','');field.setAttribute('aria-label','複製地址');
  field.style.cssText='position:fixed;left:0;top:0;opacity:0;pointer-events:none';
  // Keep the fallback inside the dialog: the background is intentionally inert.
  (document.getElementById('metaDialog')||document.body).appendChild(field);field.focus();field.select();field.setSelectionRange?.(0,text.length);
  return !!document.execCommand?.('copy');
 }catch{return false}finally{field?.remove();try{previous?.focus({preventScroll:true})}catch{}}
}
function plan(input=now()){
 const c=clock(input),day=DATA.tripDates[c.date];
 if(!day){const upcoming=c.date<TRIP_START,countdown=Math.max(0,Math.round((Date.parse(TRIP_START)-Date.parse(c.date))/86400000));return{state:upcoming?'upcoming':'finished',timeStr:c.hhmm,todayIdx:upcoming?0:2,targetDay:0,current:null,next:upcoming?DATA.days[0].stops[0]:null,compact:upcoming?'10/31 出發':'行程已結束',sub:upcoming?`還有 ${countdown} 天`:'10/31–11/02',full:upcoming?`10月31日出發，還有${countdown}天`:'三日行程已結束',isDemo:!!preview(),phase:null,nextPhase:null}}
 const rows=DATA.phases[day];let index=0;for(let i=1;i<rows.length;i++){if(minutes(rows[i][0])>c.minutes)break;index=i}
 const p=phase(day,index),n=index+1<rows.length?phase(day,index+1):day<3?phase(day+1,1):null;
 const current=find(p.id).stop,next=n?find(n.id).stop:null;
 const prefix=n&&n.day!==day?`${DATA.days[n.day-1].date.slice(0,5)} `:'';
 return{state:'active',timeStr:c.hhmm,todayIdx:day-1,targetDay:day-1,current,next,phase:p,nextPhase:n,compact:caption(p),sub:n?`${prefix}${n.start} ${caption(n)}`:'其後休息',full:`第${day}天，按行程：${p.title}，${p.start}至${p.end}。${p.note}${n?` 下一步${prefix}${n.start} ${n.title}`:''}`,isDemo:!!preview()};
}
function adjacent(dayIdx,idx,delta){if(idx<0)return null;let d=dayIdx,i=idx+delta;if(i<0){if(d===0)return null;d--;i=DATA.days[d].stops.length-1}else if(i>=DATA.days[d].stops.length){if(d===DATA.days.length-1)return null;d++;i=0}return{stop:DATA.days[d].stops[i],dayIdx:d,idx:i}}
function load(key,fallback){try{const value=JSON.parse(localStorage.getItem('mwy-meta-'+key));if(key==='completed')return Array.isArray(value)?value.filter(id=>find(id)?.idx>=0):fallback;if(key==='notes')return value&&typeof value==='object'&&!Array.isArray(value)?Object.fromEntries(Object.entries(value).filter(([id,note])=>find(id)&&typeof note==='string')):fallback;return value??fallback}catch{return fallback}}
function save(key,value){try{localStorage.setItem('mwy-meta-'+key,JSON.stringify(value));return true}catch{return false}}
function navigate(address){if(!address)return;window.open('https://uri.amap.com/search?keyword='+encodeURIComponent(address)+'&city='+encodeURIComponent('上海'),'_blank','noopener,noreferrer')}
function setHistory(method,state,hash){try{history[method](state,'',hash)}catch{location.hash=hash}}
function closeHash(day){setHistory('replaceState',{mwyMeta:true,day},'#day-'+(day+1)+'-timeline')}
function openHash(stop,day,replace=false){setHistory(replace?'replaceState':'pushState',{mwyMeta:true,detail:stop.id,day},'#detail-'+stop.id)}
function withTimeout(promise,ms,label){return new Promise((resolve,reject)=>{
 const timer=setTimeout(()=>reject(Error(label||'timeout')),ms);
 Promise.resolve(promise).then(value=>{clearTimeout(timer);resolve(value)},error=>{clearTimeout(timer);reject(error)});
})}
async function offline(){
 if(location.protocol==='file:')return true;
 if(!navigator.serviceWorker)return false;
 try{await navigator.serviceWorker.register('./sw.js',{scope:'./'});await withTimeout(navigator.serviceWorker.ready,15000,'worker-timeout');return true}catch{return false}
}
async function warm(){
 if(location.protocol==='file:')return{localFile:true,cached:0,failed:0,total:0};
 if(!navigator.serviceWorker)throw Error('unsupported');
 const registration=await withTimeout(navigator.serviceWorker.ready,15000,'worker-timeout');
 const worker=registration.active||navigator.serviceWorker.controller;
 if(!worker)throw Error('inactive');
 return new Promise((resolve,reject)=>{
  const channel=new MessageChannel();let timer;
  const finish=(error,result)=>{clearTimeout(timer);channel.port1.close();channel.port2.close();error?reject(error):resolve(result)};
  timer=setTimeout(()=>finish(Error('media-timeout')),45000);
  channel.port1.onmessage=e=>finish(null,e.data);
  channel.port1.onmessageerror=()=>finish(Error('message-error'));
  try{worker.postMessage({type:'PREWARM'},[channel.port2])}catch(error){finish(error)}
 });
}
function richMaps(stop,library){
 const cfg=DATA.photoMaps[stop?.id];if(!cfg)return()=>{};
 const target=document.getElementById('photoMap-'+stop.id);if(!target)return()=>{};
 let map=null,timer=null,observer=null,disposed=false,failed=false,ready=false;
 const details=[];for(let el=target.parentElement;el;el=el.parentElement)if(el.tagName==='DETAILS')details.push(el);
 const visible=()=>details.every(el=>el.open)&&target.clientWidth>0;
 const fallback=()=>{
  if(disposed||failed)return;failed=true;clearTimeout(timer);
  try{map?.remove()}catch{}map=null;
  target.textContent='機位底圖暫時無法載入；仍可用下方站位及高德導航。';
 };
 const init=()=>{
  if(disposed||failed||!visible())return;
  if(map){map.resize();return}
  try{
   map=new library.Map({container:target,style:{version:8,sources:{osm:{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,attribution:'© OpenStreetMap contributors'}},layers:[{id:'osm',type:'raster',source:'osm'}]},center:cfg.points[0].wgs,zoom:cfg.zoom||15,interactive:false,attributionControl:true});
   timer=setTimeout(()=>{if(!ready)fallback()},8000);
   map.on('error',()=>{if(!ready)fallback()});
   map.on('load',()=>{
    if(disposed||failed)return;ready=true;clearTimeout(timer);
    cfg.points.forEach(p=>{const el=document.createElement('div');el.className='mwy-photo-pin'+(p.hot?' hot':'');el.textContent=p.label;el.title=p.name;el.setAttribute('aria-label',p.name);new library.Marker({element:el}).setLngLat(p.wgs).addTo(map)});
    if(cfg.points.length>1){
     map.addSource('photo-route',{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:cfg.points.map(p=>p.wgs)}}});
     map.addLayer({id:'photo-route-line',type:'line',source:'photo-route',paint:{'line-color':'#0a84ff','line-width':3,'line-opacity':0.8,'line-dasharray':[1.1,1.2]}});
     const bounds=new library.LngLatBounds;cfg.points.forEach(p=>bounds.extend(p.wgs));map.fitBounds(bounds,{padding:40,maxZoom:cfg.zoom||15,duration:0});
    }
    map.resize();
   });
  }catch{fallback()}
 };
 details.forEach(el=>el.addEventListener('toggle',init));
 if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(init);observer.observe(target)}
 init();
 return()=>{disposed=true;clearTimeout(timer);observer?.disconnect();details.forEach(el=>el.removeEventListener('toggle',init));try{map?.remove()}catch{}};
}
window.MWY_FRAMEWORK={clock,now,preview,minutes,find,plan,phase,short,caption,mappedPlaces,actionIsHotel,actionAddress,copy,adjacent,load,save,navigate,closeHash,openHash,offline,warm,richMaps};
})();
