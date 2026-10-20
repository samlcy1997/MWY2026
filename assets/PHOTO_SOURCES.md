# Homepage photo sources (updated 2026-10-20)

Locally bundled WebP files populate the existing timeline image fields (also shared by their detail headers) and avoid hotlink failures. The itinerary times, destinations, addresses, other text, React components, CSS, and 16:9 image frames are not modified.

| Local asset | Subject and original photo page | Rights note |
| --- | --- | --- |
| `pvg-t2.webp` | [Shanghai Pudong International Airport Terminal 2, interior](https://commons.wikimedia.org/wiki/File:20230720_Interior_of_Terminal_2_of_Shanghai_Pudong_International_Airport.jpg) | Wikimedia Commons, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); resized and converted to WebP. See the linked file page for author attribution. |
| `lailai.webp` | [Lai Lai Xiaolong, 天津路 506 號 storefront](https://note.com/h_l380/n/n50dfee94bfbe) | Third-party travel photograph; reproduction license not confirmed. |
| `taikang.webp` | [Taikang Food, 南京東路 766 號 storefront](https://touch.travel.qunar.com/comment/10158753286) | Third-party travel photograph; reproduction license not confirmed. |

For publicly commercial reuse of the two storefront photographs, seek usage permission or replace them with original/licensed photography.

## Day 1 / Day 2 missing pictures · 2026-10-20

Eight existing cards now have pictures. Only their `img` / `hasPhoto` data fields changed. Original files were resized to at most 1280px and encoded as WebP; their natural aspect ratios are retained and the original UI performs its usual centered 16:9 cover crop. The existing working pictures on other cards remain unchanged. These sources establish the pictured subject, not current opening hours, access, or event schedules.

| Local asset | Subject and original source | Attribution / scope |
| --- | --- | --- |
| `freedom-gundam.webp` | [Bandai Namco China, official Shanghai Freedom statue unveiling report](https://www.bandainamcochina.cn/zh-cn/news/%E3%80%8C%E5%AE%9E%E7%89%A9%E5%A4%A7%E8%87%AA%E7%94%B1%E9%AB%98%E8%BE%BE%E7%AB%8B%E5%83%8F%E6%8F%AD%E5%B9%95%E5%BC%8F%E3%80%8D%E5%8D%8E%E4%B8%BD%E5%BC%80%E5%B9%95%EF%BC%81-%E3%80%8Cgundam-seed-project/), image `JOKE7447-scaled.jpg` | Official publicity photo of the Shanghai statue at night; copyright retained by the respective rights holders. |
| `dongtaixiang.webp` | [SmartShanghai: Dong Tai Xiang, Chongqing Bei Lu](https://www.smartshanghai.com/venue/14527/dong_tai_xiang_chongqing_bei_lu), [storefront image](https://images.smartshanghai.com.cn/uploads/repository/2020/07/22/32d2d8ed-ed27-4b22-bf3e-6d0326c120d3.jpeg) | Restaurant frontage with DONG TAI XIANG signage; third-party photograph, reproduction license not confirmed. |
| `zhang-breakfast.webp` | [Original Baidu listing referenced in the existing detail](https://map.baidu.com/place/e0c22309dbc684e616948e2c), [storefront image](https://taojin-pic-gz.cdn.bcebos.com/bos_gz_ae3eda78f31bd2fb81c2bed622ac96ea.jpg) | Zhang Shifu breakfast sign, already referenced in the guide. Replaces the failing Lemon8 primary image; reproduction license not confirmed. |
| `qiqi-noodles.webp` | [Existing Qiqi noodle photo](https://k.sinaimg.cn/n/sinakd20210308ac/646/w871h575/20210308/02fb-kkxpcze7863750.png/w700d1q75cms.jpg) | Same noodle image previously assigned to the card but hidden by `hasPhoto:false`; reproduction license not confirmed. |
| `eva-unit01.webp` | [SUSAS / The Paper: Jing’an Xinyefang](https://www.thepaper.cn/newsDetail_forward_19234334), [statue photo](https://imagepphcloud.thepaper.cn/pph/image/208/314/572.jpg) | On-site EVA Unit-01 photograph; SUSAS article reproduced on The Paper, reproduction license not confirmed. |
| `xiaoyang-shengjian.webp` | [Existing Xiao Yang restaurant photo](https://pimg.1px.tw/julialkpkpk/1732950853-1027769976-g.jpg) | Brand/storefront reference from another branch, as already disclosed in the detail; not claimed as a current photo of the planned branch. Reproduction license not confirmed. |
| `mwy2026.webp` | [SCLA official 2026 six-character illustration announcement](https://www.scla.com.cn/Cn/Index/pageView/catid/16/id/1107/ip/16.html), image `1791756676737486.jpg` | Art by Z6; © Crypton Future Media, INC. / piapro. Official MIKU WITH YOU 2026 illustration, used for the VIP card, not a photograph of the forthcoming show. |
| `jing-an-exterior.webp` | [Trip.com Jing’an Sports Center](https://sg.trip.com/travel-guide/attraction/shanghai/jing-an-sports-center-56680110/), [venue exterior photo](https://ak-d.tripcdn.com/images/0103c120008qj3h547798.jpg) | Venue exterior for the flexible post-show card; not a new destination or an assertion of the actual VIP entrance. Reproduction license not confirmed. |

Future image maintenance follows `AGENTS.md`: keep the existing component geometry and change image content only.

## Day 3 breakfast replacement · 2026-10-20

| Local asset | Subject and source | Scope |
| --- | --- | --- |
| `bianjie-cooking.webp` | [Jiefang Daily / Shangguan, July 30 2026 report](https://www.jfdaily.com/sgh/detail?id=4029666), photograph `889e3571931c4019b87adf7f66007174.jpg` | Bian Jie preparing an egg pancake; used in the existing shared breakfast header and first detail image. Third-party news photograph; reproduction license not confirmed. |
| `bianjie-pancake.webp` | [Trip.com, Bian Jie Shaanxi South Road branch](https://hk.trip.com/restaurant/china/shanghai/detail/restaurant-84139491/), image `1me0l12000bdfambaEEDD.jpg` | Egg pancake/youtiao reference. Additional fillings visible in the photo are not a required order. Third-party photograph; reproduction license not confirmed. |

The breakfast card's existing `hasPhoto:false` is retained; these replace the previous restaurant's image content without changing the main timeline component or dimensions.

## Day 3 missing timeline pictures · 2026-10-21

Checked the current Google Doc MASTER v2026-10-21.2 against main e5b2015 before this image-only update. Day 1 data and all three days' itinerary text, timings, destinations, ordering, IDs, maps and rich detail HTML remain unchanged. Day 2's MWY image repair is recorded below.

Six existing Day 3 stops now opt into the existing photo-card renderer. No React markup, CSS, class/style props, frame dimensions, centered 16:9 cover crop, navigation, sheet behavior or private-note storage changed. The breakfast image uses the existing local Bian Jie cooking photo; Haijinzi enables its existing image; the airport reuses the existing local Pudong T2 photograph. All 22 timeline cards now have a nonempty img and hasPhoto=true.

| Stop | Image source | Scope |
| --- | --- | --- |
| wangji / 卞姐蛋餅 | Existing ./assets/bianjie-cooking.webp, source recorded above | Enable its existing timeline picture; keep the stable ID and detail images. |
| zx / 百聯ZX | [Shangguan, Jan 8 2024](https://sghexport.shobserver.com/html/baijiahao/2024/01/08/1230364.html), image https://sghimages.shobserver.com/img/catch/2024/01/08/46c36bb4-5aee-4dab-8b51-5210c2a80abb.jpg | Photograph of the Nanjing East Road ZX entrance; article credits the venues, Shanghai Huangpu and Shanghai Bailian Group. Historical venue reference, not a promise of current display contents. Third-party photograph; reproduction license not confirmed. |
| newworld / 新世界城・CAPCOM | [Winshang's on-site opening report, Jun 28 2023](https://m.winshang.com/news714273.html), image https://img3.winshangdata.com/api/server-file/file/access?fileKey=20230628164929780.jpg | Actual Shanghai New World City CAPCOM entrance/queue; not another city's branch or a future event photo. Third-party photograph; reproduction license not confirmed. |
| haijinzi / 海金滋 | Existing https://ak-d.tripcdn.com/images/1mi3i2234b8t2q7k0130F_R_600_400_R5_Q90.jpg?proc=source%2Ftrip | Enable the restaurant image already assigned to this stop and used in its detail. Existing Trip.com food/reference image; reproduction license not confirmed. |
| hotelreturn / 回酒店取行李 | [Official Homeinn hotel photo gallery, property T21013](https://www.bthhotels.com/Hotel/T21013), image https://images.bthhotels.com/hotel_img/T21013_n_1.jpg?x-image-process=image%2Fresize%2Cm_fixed%2Cw_750%2Ch_500%2Climit_0%2Fmarker%2Cu_plus | Official photo from the exact South Square property; not a different Homeinn branch. Copyright retained by the respective owner. |
| airport / 浦東T2 | Existing ./assets/pvg-t2.webp, Commons attribution recorded above | Reuse the bundled photograph of the correct airport terminal. |

New remote image URLs were opened successfully through web retrieval and are included in the existing bounded offline-media warmer. The three new source images remain external URLs because no execution environment was available for downloading and inspecting local raster files. The component's existing center crop is unchanged; there was no fresh pixel-level crop, browser, handset or hotlink/referrer test. Do not interpret source retrieval as proof of handset rendering.

The earlier breakfast note retaining hasPhoto:false described its prior state; this request explicitly enables that existing image card.

Verification: the existing meta-framework and address-contract suites passed in an in-memory V8 harness with virtual filesystem/platform shims (4,320 planned trip minutes and all 22 address records). The actual Node commands and browser/device tests could not run without an execution environment. Renderer/CSS/detail geometry baseline hashes were retained; only image-dependent expectations and cache-version assertions changed. Other existing remote image URLs are not guaranteed by these contract checks.

## Day 2 MWY remote-image repair · 2026-10-21

The existing Trip.com primary stadium image could not be retrieved on two attempts during this audit. This does not prove it fails in every browser. The MWY daytime card now reuses the verified, bundled ./assets/jing-an-exterior.webp photograph of the same Jing'an Sports Center (source and scope recorded above), avoiding that fragile homepage hotlink. It is a venue reference, not a photograph of the upcoming MWY exhibition. Only this stop's img field changed; hasPhoto remains true and rich detail HTML remains unchanged. Day 1's existing Pexels image could not be checked through the web retrieval tool, so no claim is made about its live browser availability; Wukang's existing image was successfully retrieved on retry.
