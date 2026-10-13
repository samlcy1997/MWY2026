/* RC7.3.2: explicit traveler choices over the unchanged MASTER itinerary. */
const FIELD_KEY='mwy2026-field-choices-v1';
const FIELD_OPTIONS={camera:['unknown','hotel','carry','stored'],food:['ask','lailai','taikang','skip'],lunch:['nearby','qiqi'],dinner:['nearby','xiaoyang'],meal:['haijinzi','weixiang'],airport:['hotel','airport']};
const FIELD={choices:{camera:'unknown',food:'ask',lunch:'nearby',dinner:'nearby',meal:'haijinzi',airport:'hotel'},compact:false};
const FIELD_INFO={
 arrival:['先到酒店放低行李','磁浮 → 龍陽路 → 2號線／1號線','14:15–14:45','放妥行李就出發；前段慢咗，食物先縮短。'],
 lailai:['一籠小籠就夠','松茸鮮肉／純鮮肉二選一；有胃再加雞鴨血湯。','15:45前走','未開、有隊或15:40前食唔完，就用泰康／外帶。'],
 taikang:['鮮肉月餅 1 個','拎到趁熱食；萊萊已食到，呢站可以跳過。','15:45前走','時間留畀16:10外白渡橋。'],
 bund:['先拍外白渡橋，再向南','35–50mm做橋體基準；17:05後留外灘主平台拍藍調。','17:55–18:00收機','18:10–18:15到金陵東路渡口候船。'],
 ferry:['先過江，再拍外灘亮燈','東昌路落船：50–70mm整體 → 85–120mm地標。','18:30未上船就轉線','浦東反拍約18:25–19:05；19:15收機叫車去金橋。'],
 gundam:['先完成一張全身','南廣場退後取景，24–35mm全身；50–70mm頭胸，85–120mm細節。','20:40上4F','先拍靜態主片，再等一輪演出；場次臨行再核。'],
 gundambase:['先看最想買的限定','LaLaport 4F 429–430；再看SEED／Freedom展示。','21:10離店','去台兒莊路站，9號線返市中心。'],
 dongtaixiang:['特色生煎4隻＋咖喱牛肉湯','有胃再加蝦仁小餛飩；先試原味，再蘸醋。','約22:20–22:40到','24小時營業，毋須為晚餐趕離LaLaport。'],
 zhang:['鹹豆漿＋粢飯團','出門前先選好相機安排；有胃才加大餅／油條。','08:15–08:30出發','09:00到會場確認入口，10:00場販開始。'],
 mwy:['先確認入口與現場隊列','小羽館主場販；大羽館展示＋CALL棒，按現場進度逛。','09:00到／10:00場販','上午留畀展示、獲准的攝影與粉絲活動。'],
 mwyafternoon:['繼續逛會場，按帶機狀態走','13:15–14:30展示／粉絲活動；帶機才需要酒店往返。','17:45–18:00到入口','附近快食約16:45–17:30；VIP要求提早就提前。'],
 qiqi:['午餐先求順路、快食','12:30–13:15附近用餐；琪琪只在順路、無隊時選。','不跨區追餐廳','先確認重入規則，按現場進度調整。'],
 xiaoyang:['演出前快食一餐','16:45–17:30附近快食；小楊只有無長隊才去。','17:45–18:00到入口','最小份生煎；仍餓才加粉絲湯。'],
 mwyshow:['輕裝到VIP入口','票、袋、安檢和VIP入場要求最後核一次；夜場禁帶相機。','19:00夜場','17:45–18:00到入場區；VIP通知更早就提前。'],
 postshow:['先看體力，再決定宵夜','唔餓或太攰直接返酒店；想食就查仍營業、順路的店。','宵夜即場決定','食物只服務體力，明早還有街拍。'],
 wangji:['退房寄行李，再吃早餐','原味葱油餅1個＋黑米粥／甜豆漿二選一；相機跟身。','07:45–08:00退房','08:35–09:00早餐；09:25到武康。'],
 wukang:['源點廣場先做船頭主片','35mm完整建築；再沿武康路用35–50mm街景、70–120mm細節。','10:15前走','遲到就縮短街拍；保10:30徐家匯。'],
 xjh:['美羅城為主，另外兩站按興趣','美羅城5–6F → TPY B2 → 新六百外牆；有啱口味IP才延長。','約12:20去午飯','延長就壓縮午餐／張園，保14:30離開路易號。'],
 haijinzi:['葱烤大排＋飯＋一個輕菜','12:50–13:00未能順利落單，就轉味香齋快食。','13:25往張園','胃夠才加醬爆豬肝／響油鱔絲二選一。'],
 zhangyuan:['西進東出，最後拍路易號','13:40–14:05張園巷弄；14:05–14:25路易號外觀。','14:25收機／14:30走','外觀先拍齊；內部只在已預約或低排隊才入。'],
 airport:['先取行李，再去PVG T2','酒店取行李約15:05–15:15；1號線 → 2號線 → 龍陽路磁浮。','15:30前出酒店','目標約17:00到T2，19:05起飛。']
};
function fieldInit(){
 try{const saved=JSON.parse(localStorage.getItem(FIELD_KEY)||'{}');for(const [key,values] of Object.entries(FIELD_OPTIONS))if(values.includes(saved[key]))FIELD.choices[key]=saved[key]}catch(e){}
 PAGE_META.camerastore={title:'酒店放妥相機'};DETAIL_KIND.camerastore='event';P.camerastore=()=>cameraStorePage();
 const dialog=document.createElement('dialog');dialog.id='photoViewer';dialog.className='photo-viewer';dialog.innerHTML='<form method="dialog"><button aria-label="關閉放大照片">關閉 ×</button></form><img alt=""><p></p>';document.body.appendChild(dialog);
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
 dialog.addEventListener('close',()=>{if(detailOpen){$('.shell').inert=true;$('#detail').inert=false}});
}
function fieldEscape(value=''){return String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll("'",'&#39;')}
function fieldItem(id){for(const day of Object.values(DAYS)){const item=day.items.find(x=>x.id===id);if(item)return resolveFieldItem(item)}if(id==='camerastore')return cameraStoreItem();return null}
function cameraStoreItem(){return{id:'camerastore',time:'14:30',title:'酒店放妥相機',sub:FIELD.choices.camera==='stored'?'已放妥 · 記憶卡跟身，輕裝回會場':'帶機才往返 · 14:30–16:00預留60–90分鐘',kind:'相機安排',move:'放妥後返上海靜安體育中心',coord:null,address:HOTEL,anchor:true}}
function resolveFieldItem(base){
 const x={...base},c=FIELD.choices;
 if(x.id==='qiqi'&&c.lunch==='nearby')Object.assign(x,{title:'會場附近午餐',sub:'12:30–13:15快食 · 琪琪只作順路、無隊備選',coord:null,address:'上海靜安體育中心附近 · 目的地即場決定'});
 if(x.id==='xiaoyang'&&c.dinner==='nearby')Object.assign(x,{title:'會場附近晚餐',sub:'16:45–17:30快食 · 17:45–18:00到VIP入口',coord:null,address:'上海靜安體育中心附近 · 目的地即場決定'});
 if(x.id==='haijinzi'&&c.meal==='weixiang')Object.assign(x,{title:'味香齋 · 快速後備',sub:'麻醬麵＋小牛湯 · 13:25往張園',coord:null,address:'味香齋 雁蕩路14號'});
 if(x.id==='airport'&&c.airport==='hotel')Object.assign(x,{title:'返酒店取行李 → PVG',coord:null});
 if(x.id==='mwyafternoon')x.sub=c.camera==='carry'?'有帶機 · 14:30–16:00返酒店放妥再回場':c.camera==='stored'?'相機已放妥 · 繼續會場活動，準備晚餐／入場':'相機留酒店 · 下午留給會場活動，毋須往返';
 if(x.id==='taikang'&&c.food==='lailai')x.sub='萊萊已食到，可跳過；想買才停 · 15:45前走';
 return x;
}
function getDayItems(day){
 const c=FIELD.choices;let items=DAYS[day].items.map(resolveFieldItem);
 if(day===1){if(c.food==='lailai')items=items.filter(x=>x.id!=='taikang');if(c.food==='taikang')items=items.filter(x=>x.id!=='lailai');if(c.food==='skip')items=items.filter(x=>!['lailai','taikang'].includes(x.id))}
 if(day===2&&['carry','stored'].includes(c.camera)){const i=items.findIndex(x=>x.id==='mwyafternoon');items.splice(i+1,0,cameraStoreItem())}
 return items;
}
function fieldNext(id){
 if(id==='camerastore')return FIELD.choices.camera==='stored'?'mwyafternoon':null;
 if(id==='arrival'&&FIELD.choices.food==='skip')return 'bund';
 if(id==='lailai')return FIELD.choices.food==='lailai'||FIELD.choices.food==='skip'?'bund':'taikang';
 if(id==='mwyafternoon')return FIELD.choices.camera==='carry'?'camerastore':'xiaoyang';
 const p=findItemPosition(id);return p?.items[p.index+1]?.id||null;
}
function fieldChoice(key,title,options,note=''){
 return `<section class="field-choice" aria-label="${fieldEscape(title)}"><h2>${title}</h2><div class="field-options">${options.map(([value,label])=>`<button type="button" data-choice="${key}-${value}" aria-pressed="${FIELD.choices[key]===value}" onclick="chooseField('${key}','${value}',this)">${label}</button>`).join('')}</div>${note?`<p class="field-choice-note">${note}</p>`:''}</section>`;
}
function fieldChoicesHTML(id){
 if(['lailai','taikang'].includes(id))return fieldChoice('food','食物段怎走？',[['ask','到店再決定'],['lailai','食萊萊，略過泰康'],['taikang','直接泰康／外帶'],['skip','跳過，去外灘']],'15:45截止；選擇會同步到行程、地圖和下一站。');
 if(['zhang','mwy','mwyafternoon'].includes(id))return fieldChoice('camera','今日相機安排',[['hotel','相機留酒店'],['carry','已確認可拍，帶機'],...(id==='mwyafternoon'?[['stored','已放妥相機']]:[])],'未核實時以留酒店為準；只有可靠確認2026展區准帶、准拍才帶機。夜場一律禁帶。');
 if(id==='qiqi')return fieldChoice('lunch','今餐去哪裡？',[['nearby','會場附近快食'],['qiqi','順路無隊，去琪琪']],'附近快食不預設店；琪琪只有順路、無隊才選。');
 if(id==='xiaoyang')return fieldChoice('dinner','演出前怎吃？',[['nearby','附近快食'],['xiaoyang','無長隊，去小楊']],'17:45–18:00到入場區，VIP要求更早就提前。');
 if(id==='haijinzi')return fieldChoice('meal','午市狀態如何？',[['haijinzi','海金滋可落單'],['weixiang','轉味香齋快食']],'12:50–13:00決定；13:25往張園，保返程時間。');
 if(id==='airport')return fieldChoice('airport','行李取好了嗎？',[['hotel','先返酒店取行李'],['airport','已取好，去PVG']],'選擇只調整導航目的地，返程時間保持。');
 return '';
}
function chooseField(key,value,button){
 if(!FIELD_OPTIONS[key]?.includes(value))return;
 const choice=button?.dataset.choice;FIELD.choices[key]=value;try{localStorage.setItem(FIELD_KEY,JSON.stringify(FIELD.choices))}catch(e){}
 if(detailOpen){const scroll=$('#detail').scrollTop;renderFieldArticle(detailCurrentId);$('#detail').scrollTop=scroll;if(choice)$('#article').querySelector(`[data-choice="${choice}"]`)?.focus({preventScroll:true});else if(button?.classList.contains('field-confirm'))$('#article .field-confirm')?.focus({preventScroll:true})}
 const active=getDayItems(currentDay);if(selectedStopIds[currentDay]&&!active.some(x=>x.id===selectedStopIds[currentDay]))selectedStopIds[currentDay]=active[0].id;
 if(mode==='timeline')renderTimeline();else{renderMap();initMap()}
 refreshPlanShortcut();showToast('已更新行程與目的地');
}
function fieldDestination(id){
 const x=fieldItem(id);if(!x)return null;
 if(id==='camerastore'&&FIELD.choices.camera==='stored')return {name:'上海靜安體育中心',address:'上海靜安體育中心 汶水路116號',coord:DAYS[2].items.find(x=>x.id==='mwy').coord,mode:'bus'};
 if(['arrival','camerastore','postshow'].includes(id)||(id==='airport'&&FIELD.choices.airport==='hotel'))return {name:HOTEL,address:HOTEL,coord:null,mode:'bus'};
 if(id==='qiqi'&&FIELD.choices.lunch==='nearby'||id==='xiaoyang'&&FIELD.choices.dinner==='nearby')return {name:'會場附近快食',address:'上海靜安體育中心附近餐飲',coord:null,search:'餐飲',center:DAYS[2].items.find(x=>x.id==='mwy').coord};
 if(id==='ferry')return {name:'金陵東路渡口',address:'金陵東路渡口 上海',coord:null};
 return {name:x.title,address:x.address,coord:mapCoordinate(x),mode:['airport','gundam','mwy'].includes(id)?'bus':'walk'};
}
function amapURL(destination){
 if(!destination)return '';
 if(destination.coord){const p=new URLSearchParams({to:`${destination.coord.join(',')},${destination.name}`,mode:destination.mode||'walk',src:'MWY2026',callnative:'1'});return 'https://uri.amap.com/navigation?'+p}
 const p=new URLSearchParams({keyword:destination.search||destination.address||destination.name,city:'上海',src:'MWY2026',callnative:'1'});if(destination.center)p.set('center',destination.center.join(','));return 'https://uri.amap.com/search?'+p;
}
function fieldNavLink(id,label='高德導航',className='field-nav'){
 const dest=fieldDestination(id);return dest?`<a class="${className}" href="${fieldEscape(amapURL(dest))}" target="_blank" rel="noopener noreferrer" aria-label="${fieldEscape(label+'：'+dest.name)}">${label}</a>`:'';
}
function fieldBrief(id){
 let info=FIELD_INFO[id];if(!info)return '';
 info=[...info];
 if(id==='haijinzi'&&FIELD.choices.meal==='weixiang')info=['麻醬麵＋小牛湯','已選味香齋快速後備；食完向張園移動。','13:25往張園','地址：雁蕩路14號。'];
 if(id==='mwyafternoon')info[1]=FIELD.choices.camera==='carry'?'帶相機：14:30–16:00返酒店放妥，再回會場。':FIELD.choices.camera==='stored'?'相機已安全放妥，輕裝繼續會場活動。':'相機留酒店，下午留在會場，按Part.2／現場活動調整。';
 return `<section class="field-brief" aria-label="本站重點"><h2>${info[0]}</h2><p>${info[1]}</p><div class="field-deadline"><span>${info[2]}</span><p>${info[3]}</p></div></section>`;
}
function prepareFieldArticle(id,html){
 const t=document.createElement('template');t.innerHTML=html;const root=t.content;
 const header=root.querySelector('h1');if(['qiqi','xiaoyang','haijinzi'].includes(id))header.textContent=fieldItem(id).title;const deck=root.querySelector('.deck');if(deck){const d=document.createElement('details');d.className='field-explanation';d.innerHTML='<summary>時間與安排詳情</summary>';deck.before(d);d.append(deck)}
 const facts=root.querySelector('.facts');if(facts){const more=root.querySelector('.facts-more');if(more){more.append(facts)}else{const d=document.createElement('details');d.className='facts-more';d.innerHTML='<summary>快速資料</summary>';facts.before(d);d.append(facts)}}
 const briefing=document.createElement('div');briefing.innerHTML=fieldBrief(id)+fieldChoicesHTML(id);header?.after(briefing);
 const kind=DETAIL_KIND[id];
 if(kind==='food'){
  const blocks=[...root.querySelectorAll('.block')];const order=blocks.find(b=>/^(點咩|一個人點法|兩樣主角)$/.test(b.querySelector('h2')?.textContent.trim()||''));
  const photos=root.querySelector('.food-visual-grid');if(order&&photos)photos.before(order);
  if(order&&((id==='qiqi'&&FIELD.choices.lunch==='nearby')||(id==='xiaoyang'&&FIELD.choices.dinner==='nearby'))){const d=document.createElement('details');d.className='field-explanation';d.innerHTML='<summary>備選'+(id==='qiqi'?'琪琪':'小楊')+'的點法</summary>';order.before(d);d.append(order)}
  if(order&&id==='haijinzi'&&FIELD.choices.meal==='weixiang'){const d=document.createElement('details');d.className='field-explanation';d.innerHTML='<summary>原主選海金滋的點法</summary>';order.before(d);d.append(order);const quick=document.createElement('section');quick.className='block';quick.innerHTML='<h2 class="block-title">快食點法</h2>'+foodList([['主食','麻醬麵','濃香麻醬拌勻再食。'],['配搭','小牛湯','配麵解膩；13:25往張園。']]);d.before(quick);const facts=root.querySelector('.facts-more>summary');if(facts)facts.textContent='原主選海金滋資料'}
  if(photos){const d=document.createElement('details');d.className='field-photos';d.innerHTML='<summary>門面與食物照片 <span>點照片可放大</span></summary>';photos.before(d);d.append(photos)}
  if(id==='zhang'){const camera=blocks.find(b=>b.querySelector('h2')?.textContent.includes('相機方案'));if(camera){const d=document.createElement('details');d.className='field-explanation';d.innerHTML='<summary>相機保管細節</summary>';camera.before(d);d.append(camera)}}
 }
 if(kind==='photo'){
  const map=root.querySelector('.photo-map-wrap')?.closest('.block');const gallery=root.querySelector('.ref-grid')?.closest('.block');
  if(map&&gallery)gallery.before(map);
  if(gallery){const d=document.createElement('details');d.className='field-photos';d.innerHTML='<summary>構圖參考照片 <span>點照片可放大</span></summary>';gallery.before(d);d.append(gallery);const credit=root.querySelector('.image-credit');if(credit)d.append(credit)}
 }
 const hop=root.querySelector('.next-hop');if(hop){const dest=fieldDestination(id);hop.innerHTML=`<strong>${dest?.name||'目的地'}</strong><p>${dest?.address||''}</p><div class="next-actions">${fieldNavLink(id,'在高德打開目的地')}</div>`;hop.classList.add('field-destination')}
 for(const img of root.querySelectorAll('img:not(.photo-map img)')){
  if(img.closest('button'))continue;const frame=document.createElement('div');frame.className='field-image-frame';img.before(frame);frame.append(img);const button=document.createElement('button');button.type='button';button.className='photo-open';button.dataset.src=img.getAttribute('src');button.dataset.alt=img.alt;button.setAttribute('aria-label','放大：'+(img.alt||'照片'));frame.replaceChildren(button);button.append(img);button.setAttribute('onclick','openFieldPhoto(this)');
  img.setAttribute('onerror','fieldImageFailed(this)');img.setAttribute('onload','fieldImageReady(this)');
  const status=document.createElement('div');status.className='field-image-status';status.innerHTML='<span>相片未能載入</span><button type="button" onclick="retryFieldImage(this)">重試</button>';frame.append(status);
 }
 return t.innerHTML;
}
function renderFieldArticle(id){
 $('#article').innerHTML=prepareFieldArticle(id,P[id]())+detailPagerHTML(id);$('#detailTitle').textContent=fieldItem(id)?.title||PAGE_META[id]?.title||id;$('#detailActions').innerHTML=detailActionHTML(id);
 $('#article h1')?.setAttribute('tabindex','-1');setTimeout(()=>{if(detailOpen&&detailCurrentId===id)initDetailPhotoMap(id)},35);
}
function fieldImageFailed(img){img.closest('.field-image-frame')?.classList.add('failed')}
function fieldImageReady(img){img.closest('.field-image-frame')?.classList.remove('failed')}
function retryFieldImage(button){const frame=button.closest('.field-image-frame'),img=frame.querySelector('img'),url=frame.querySelector('.photo-open').dataset.src;frame.classList.remove('failed');img.src=url;}
function openFieldPhoto(button){
 const dialog=$('#photoViewer'),img=dialog.querySelector('img');img.src=button.dataset.src;img.alt=button.dataset.alt;dialog.querySelector('p').textContent=button.dataset.alt;dialog.showModal();
}
function cameraStorePage(){return `${pageHead('第2日 · 14:30–16:00','酒店放妥相機','上午帶了相機，先返酒店安全存放，再輕裝回會場；預留60–90分鐘。')}${block('放妥後照住做',rules([['安全存放','鎖入行李箱、收在不顯眼位置，DND／要求不執房；前台正式保管只在已確認尺寸及寄存憑證後使用。'],['記憶卡跟身','已拍內容的記憶卡自行帶走。'],['回會場','先看回程ETA，保16:45–17:30晚餐及17:45–18:00入場區。']]))}<button class="field-confirm" onclick="${FIELD.choices.camera==='stored'?'openFieldNext()':"chooseField('camera','stored',this)"}">${FIELD.choices.camera==='stored'?'回會場繼續活動 →':'相機已放妥，準備回會場'}</button>${FIELD.choices.camera==='stored'?`<div class="field-confirmed" role="status">已記錄：相機放妥。${fieldNavLink('mwy','高德導航回會場')}</div>`:''}`}
function timelineFieldCopy(item){
 const copy={arrival:'先到酒店放行李，約14:15–14:45完成',lailai:'先核實營業；未開／有隊就用備案',taikang:'鮮肉月餅1個，萊萊成功可略過',bund:'外白渡橋向南拍；17:55–18:00收機',ferry:'18:15優先；18:30未上船就轉線',gundam:'夜攝＋一輪演出；20:40上4F',gundambase:'先看限定；21:10離店',dongtaixiang:'生煎4隻＋咖喱牛肉湯',zhang:'鹹豆漿＋粢飯團；出門前選相機方案',mwy:'09:00確認入口；10:00場販開始',qiqi:FIELD.choices.lunch==='qiqi'?'已選琪琪：順路且無隊才去':'12:30–13:15附近快食，店即場選',mwyafternoon:item.sub,xiaoyang:FIELD.choices.dinner==='xiaoyang'?'已選小楊：無長隊才去':'附近快食；17:45–18:00到入口',mwyshow:'19:00 VIP夜場；相機禁帶',postshow:'按體力決定，餐廳不預設',wangji:'先寄行李；08:35–09:00吃早餐',wukang:'船頭主片＋街拍；10:15前走',xjh:'美羅城為主，另外兩站按興趣',haijinzi:FIELD.choices.meal==='weixiang'?'麻醬麵＋小牛湯，13:25往張園':'12:50–13:00決定；不穩就轉快食',zhangyuan:'張園向東拍路易號；14:30最遲走',airport:'取行李後15:15–15:25出發，最遲15:30'};
 return copy[item.id]||item.sub;
}
function fieldDayNote(day){return day===2?`<div class="field-day-note"><b>${FIELD.choices.camera==='carry'?'今日帶機，下午須寄存':FIELD.choices.camera==='stored'?'相機已放妥':'相機預設留酒店'}</b><span>午晚餐以附近快食為主；點站點可更改選擇。</span></div>`:day===3?'<div class="field-day-note"><b>14:30離開路易號</b><span>15:30前帶行李離開酒店，保機場時間。</span></div>':''}
