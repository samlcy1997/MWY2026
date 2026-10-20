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
