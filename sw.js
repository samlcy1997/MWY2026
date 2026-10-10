const VERSION="mwy2026-rc7.3";
const CORE_CACHE=VERSION+"-core";
const MEDIA_CACHE=VERSION+"-media";
const RUNTIME_CACHE=VERSION+"-runtime";
const CORE=["./","./index.html","./manifest.webmanifest","./assets/vendor/maplibre-gl.js","./assets/vendor/maplibre-gl.css","./assets/shanghai-bund-cover.jpg","./assets/fonts/editorial.ttf","./assets/fonts/mono.ttf","./assets/xiaolongbao_steps_guide.jpg","./assets/bund_shooting_route_guide.jpg"];
const CRITICAL_MEDIA=["https://images.gochinafreely.com/AJ010/shanghai-bund-historical-building-lights-at-dusk-blues-hour-800.webp","https://ak-d.tripcdn.com/images/1mh2112000bnerdgzF4CB.jpg","https://youimg1.c-ctrip.com/target/100b1900000169ysl903E.jpg","https://www.woshiji.cn/uploadfile/2024/0308/20240308023754488.jpg","https://wenhui.whb.cn/u/cms/www/202009/13193420g9ue.jpg","https://rachelgouk.com/wp-content/uploads/2023/05/dong-tai-xiang-chinese-food-shanghai-1-768x512.jpg","https://taojin-pic-gz.cdn.bcebos.com/bos_gz_ae3eda78f31bd2fb81c2bed622ac96ea.jpg?x-bce-process=image%2Fcrop%2Cx_430%2Cy_0%2Cw_562%2Ch_562","https://dimg04.c-ctrip.com/images/01060120009ll4bntBB06_D_350_230_Q90.jpg?proc=autoorient","https://pimg.1px.tw/julialkpkpk/1732950853-1027769976-g.jpg","https://ak-d.tripcdn.com/images/0106h120009q2w5b0C48E_D_2208_1242_R5.jpg?proc=autoorient","https://imagepphcloud.thepaper.cn/pph/image/131/403/857.jpg","https://staticcdn.bandaihobbysite.cn/www/assets/wandai/img/gbase/20231227/OfflineImg5_big.jpg","https://staticcdn.bandaihobbysite.cn/www/uploads/20231219/a3658496ff76f4b58bfa6d8d86d6a5ae.jpg"];

async function fetchWithTimeout(request,ms){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),ms||5000);
  try{return await fetch(request,{signal:controller.signal})}finally{clearTimeout(timer)}
}
async function cacheIfUsable(cache,request,response){
  if(response&&(response.ok||response.type==="opaque")){await cache.put(request,response.clone());return true}
  return false;
}
async function warmCriticalMedia(){
  const cache=await caches.open(MEDIA_CACHE);
  let cached=0,failed=0;
  const queue=CRITICAL_MEDIA.slice();
  const worker=async()=>{
    while(queue.length){
      const url=queue.shift();
      const req=new Request(url,{mode:"no-cors",credentials:"omit"});
      try{
        const hit=await cache.match(req);
        if(hit){cached++;continue}
        const res=await fetchWithTimeout(req,9000);
        if(await cacheIfUsable(cache,req,res))cached++;else failed++;
      }catch(e){failed++}
    }
  };
  await Promise.all([worker(),worker(),worker()]);
  return {cached,failed,total:CRITICAL_MEDIA.length};
}
self.addEventListener("install",event=>{
  event.waitUntil((async()=>{const cache=await caches.open(CORE_CACHE);await cache.addAll(CORE);await self.skipWaiting()})());
});
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keep=new Set([CORE_CACHE,MEDIA_CACHE,RUNTIME_CACHE]);
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith("mwy2026-")&&!keep.has(k)).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("message",event=>{
  if(event.data?.type!=="PREWARM")return;
  event.waitUntil((async()=>{const result=await warmCriticalMedia();event.ports?.[0]?.postMessage(result)})());
});
self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(req.mode==="navigate"){
    event.respondWith((async()=>{
      const core=await caches.open(CORE_CACHE);
      try{const res=await fetchWithTimeout(req,4500);if(res?.ok)await core.put("./index.html",res.clone());return res}
      catch(e){return (await core.match("./index.html"))||(await core.match("./"))}
    })());
    return;
  }
  if(req.destination==="image"){
    event.respondWith((async()=>{
      const cached=await caches.match(req);
      const refresh=fetchWithTimeout(req,8000).then(async res=>{
        const cache=await caches.open(url.origin===location.origin?CORE_CACHE:MEDIA_CACHE);
        await cacheIfUsable(cache,req,res);
        return res;
      }).catch(()=>null);
      if(cached){event.waitUntil(refresh);return cached}
      const fresh=await refresh;
      return fresh||new Response("",{status:504,statusText:"Offline"});
    })());
    return;
  }
  if(url.origin===location.origin){
    event.respondWith((async()=>{
      const cached=await caches.match(req);
      if(cached)return cached;
      try{
        const res=await fetchWithTimeout(req,5000);
        if(res?.ok){const cache=await caches.open(RUNTIME_CACHE);await cache.put(req,res.clone())}
        return res;
      }catch(e){return new Response("",{status:504,statusText:"Offline"})}
    })());
    return;
  }
  if(req.destination==="script"||req.destination==="style"){
    event.respondWith((async()=>{
      const cache=await caches.open(RUNTIME_CACHE);
      const cached=await cache.match(req);
      if(cached)return cached;
      try{const res=await fetchWithTimeout(req,7000);await cacheIfUsable(cache,req,res);return res}
      catch(e){return new Response("",{status:504,statusText:"Offline"})}
    })());
  }
});
