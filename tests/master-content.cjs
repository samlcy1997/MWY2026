// Content/DOM-contract checks only. This is not a browser or a travel feasibility test.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const baseline=execFileSync('git',['show','f57f03f:index.html'],{cwd:root,encoding:'utf8'});
const styles=s=>[...s.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m=>m[1]);
assert.deepEqual(styles(html),styles(baseline),'The shipped RC7.3.1 stylesheet must be unchanged');
assert.ok(!/field-ux\.(css|js)|editorial-ui\.css/.test(html),'Rejected UI assets must not be loaded');
for(const file of ['manifest.webmanifest','assets/fonts/editorial.ttf','assets/fonts/mono.ttf']){
 assert.ok(fs.readFileSync(path.join(root,file)).equals(execFileSync('git',['show',`f57f03f:${file}`],{cwd:root})),`${file} must retain the existing appearance`);
}

class Tokens{
 constructor(values=[]){this.values=new Set(values)}
 contains(x){return this.values.has(x)}
 add(...xs){xs.forEach(x=>this.values.add(x))}
 remove(...xs){xs.forEach(x=>this.values.delete(x))}
 toggle(x,on){const active=on===undefined?!this.contains(x):on;active?this.add(x):this.remove(x);return active}
}
const nodes=new Map();
const node=key=>{
 if(!nodes.has(key))nodes.set(key,{innerHTML:'',textContent:'',dataset:{},classList:new Tokens(key==='#guideView'?['hidden']:[]),scrollTop:0,inert:false,
  setAttribute(k,v){this[k]=v},removeAttribute(k){delete this[k]},getAttribute(k){return this[k]??null},focus(){},blur(){},contains(){return false},getClientRects(){return[{}]},querySelectorAll(){return[]},scrollIntoView(){}});
 return nodes.get(key);
};
const history={state:{},pushState(s,_,hash){this.state=s;location.hash=hash},replaceState(s,_,hash){this.state=s;location.hash=hash},back(){}};
const location={hash:'#day-1-timeline'};
const window={scrollY:0,scrollTo(){},addEventListener(){},open(){}};
const document={querySelector:node,querySelectorAll(){return[]},activeElement:null,body:{classList:new Tokens()}};
const context=vm.createContext({window,document,history,location,navigator:{},setTimeout(){},clearTimeout(){},setInterval(){},console,URLSearchParams,Intl});
const script=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].at(-1)[1].replace(/\ninit\(\);\s*$/,'');
new vm.Script(script);
vm.runInContext(script,context);
const evaluate=source=>vm.runInContext(source,context);
const data=JSON.parse(evaluate('JSON.stringify({SITE,DAYS,PAGE_META,DETAIL_KIND,TRIP_BRIEFS})'));
assert.equal(data.SITE.version,'RC7.3.3');
assert.equal(data.SITE.master,'v2026-10-16.1');
assert.deepEqual(data.DAYS[3].items.map(x=>x.id),['wangji','wukang','zx','newworld','haijinzi','hotelreturn','airport']);
assert.equal(data.DAYS[3].items.at(-1).time,'15:00');
assert.equal(data.DAYS[2].items.find(x=>x.id==='xiaoyang').time,'16:30');
const keys=evaluate('Object.keys(P)');
const rendered={};
for(const id of keys){
 const markup=evaluate(`P[${JSON.stringify(id)}]()`);
 assert.ok(markup.includes('<h1>'),`${id} has a heading`);
 assert.ok(!/undefined|NaN/.test(markup),`${id} renders complete content`);
 for(const [,target] of markup.matchAll(/openDetail\('([^']+)'/g))assert.ok(keys.includes(target),`${id} links to known ${target}`);
 rendered[id]=markup;
}
for(const day of [1,2,3]){
 const items=data.DAYS[day].items;
 assert.equal(new Set(items.map(x=>x.id)).size,items.length);
 evaluate(`openDay(${day},false)`);
 const timeline=node('#timelinePane').innerHTML;
 assert.ok(timeline.includes('今日照走／延誤時下一步'));
 for(const item of items){
  assert.ok(keys.includes(item.id)&&data.PAGE_META[item.id]&&data.DETAIL_KIND[item.id],`${item.id} is linked consistently`);
  assert.ok(timeline.includes(`data-stop-id="${item.id}"`));
  evaluate(`openDetail(${JSON.stringify(item.id)},false,false)`);
  assert.equal(evaluate('detailCurrentId'),item.id);
  assert.ok(node('#article').innerHTML.includes('<h1>'));
  const index=items.indexOf(item),next=items[index+1];
  if(next)assert.ok(node('#detailActions').innerHTML.includes(next.title),`${item.id} footer follows updated chronology`);
  evaluate('hideDetail()');
  assert.equal(evaluate('detailOpen'),false);
  assert.equal(node('.shell').inert,false);
 }
 evaluate('renderMap()');
 for(const item of items)assert.ok(node('#mapPane').innerHTML.includes(`<option value="${item.id}"`));
}
const includes=(id,...texts)=>texts.forEach(text=>assert.ok(rendered[id].includes(text),`${id} retains ${text}`));
includes('arrival','先保正餐','沈大成','不刪一餐');
includes('lailai','不刪午餐','月餅只作加餐','沈大成 南京東路636號');
includes('taikang','不能取代正餐');
includes('bund','17:45–17:50','18:00–18:05','日落後約20–30分鐘','船期');
includes('ferry','末班未確認','國慶','取消浦東反拍','LaLaport','18:30不是已確認末班');
includes('gundam','20:30','先拍機體');
includes('mwyafternoon','14:20仍未離場','14:20–14:55','萬榮路1056號','15:35–15:50','不折返取機','酒店放機不可CUT');
includes('xiaoyang','16:30–17:30','足量晚餐');
includes('zx','TAMASHII NATIONS','南京東路340號','直接取消新世界城');
includes('newworld','CAPCOM','12:20–12:25','南京西路2–68號');
includes('haijinzi','約13:05','玲瓏','陝西南路57號','不排第二間炒菜館','13:45前','不可直接取消午餐');
includes('hotelreturn','14:15–14:30','14:45前','15:00','15:25為高風險警戒');
includes('airport','15:00','15:10','15:25已屬高風險','17:00前','19:05','不無限等恢復');
assert.ok(!rendered.airport.includes('15:30'));
assert.ok(!keys.includes('xjh')&&!keys.includes('zhangyuan'));
for(const [oldId,newId] of [['xjh','zx'],['zhangyuan','hotelreturn']]){
 evaluate(`openDetail('${oldId}',false,false)`);assert.equal(evaluate('detailCurrentId'),newId);evaluate('hideDetail()');
 location.hash='#detail-'+oldId;history.state={};evaluate('restoreFromHash()');assert.equal(evaluate('detailCurrentId'),newId);assert.equal(location.hash,'#detail-'+newId);evaluate('hideDetail()');
}
const guide=evaluate('guideHTML()');
assert.ok(guide.includes('MASTER v2026-10-16.1')&&guide.includes('仍需確認'));
const active=Object.values(rendered).join('')+guide;
assert.ok(!/味香齋|路易號|15:30為正常|15:15–15:25/.test(active),'Superseded execution instructions are absent');
assert.ok(!/Z8|Nikon|24-120|CX\d{3}|長安路1109|HK\$267/.test(html),'Private trip data is not published');
const worker=fs.readFileSync(path.join(root,'sw.js'),'utf8');
assert.ok(worker.includes('mwy2026-rc7.3.3-master-20261016.1'));
assert.ok(worker.includes('"./index.html"'));
assert.ok(!/overscroll-behavior(?:-y)?:\s*(none|contain)/.test(html),'The content update does not suppress native refresh');
const output=process.env.CONTENT_REPORT;
if(output)fs.writeFileSync(output,JSON.stringify({version:data.SITE,days:data.DAYS,pages:rendered,guide},null,2));
console.log('PASS: MASTER content, page rendering, chronology, legacy links, UI preservation, privacy and cache version.');
