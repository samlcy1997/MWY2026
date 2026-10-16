# MWY2026 Shanghai Field Guide

A mobile-first three-day Shanghai itinerary for photography, local food and 未來有你 2026.

## RC7.3.3: MASTER v2026-10-16.1 content sync

Only the current MASTER defines the executable plan. Historical research and decision-log snapshots do not override it. This release starts from shipped RC7.3.1; the rejected RC7.3.2 UI changes are excluded. Existing CSS, fonts, colors, photos, navigation structure and manifest are retained.

- **Day 1:** complete a proper meal before photography. Lailai is check-first; if unavailable, get a quick full meal nearby, with Shendacheng a pending candidate. Taikang is an optional snack. Delays cut Waibaidu Bridge or Pudong photography, never a meal. Aim to start toward the ferry at 17:45–17:50 and reach it around 18:00–18:05. The 18:15/18:30 sailings and last sailing remain unconfirmed; National Day restrictions cannot be applied to 10/31. If waiting endangers Freedom, go directly to LaLaport and skip Pudong. Carry water and supplementary savory food for the long evening before Dong Taixiang.
- **Day 2:** protect both meals. With reliable daytime camera permission and favorable timing, leave MWY around 14:00, photograph EVA at Jing'an Xinyefang around 14:20–14:55, go directly to the hotel to secure the camera around 15:35–15:50, then return light for dinner/rest. If still at MWY at 14:20, EVA access is blocked, transport runs late or VIP checking needs more time, skip EVA and secure the camera. Without confirmed camera permission, leave it at the hotel all day and do not activate EVA photography. Cameras never enter the evening concert. Dinner is 16:30–17:30; 17:45–18:00 is a provisional VIP entrance target subject to official guidance. The only concert is 19:00 VIP.
- **Day 3:** checkout/breakfast, Wukang, Bailian ZX, optional New World City/CAPCOM, Haijinzi lunch, hotel luggage collection, PVG T2. More time at ZX/Wukang means dropping New World City. Leave New World City by 12:20–12:25, aim for Haijinzi at 12:50–13:00, and switch around 13:05 if immediate ordering is not feasible. Linglong is a fallback only with an immediate seat/order; otherwise get a quick full meal on the way to the station. Leave the lunch area with enough food by 13:45. Aim to reach the hotel at 14:15–14:30, no later than 14:45, and depart with luggage at 15:00. 15:10 is a small tolerance; 15:25 is a high-risk warning, not a normal safe departure. Target T2 before 17:00 for the 19:05 flight. Xujiahui and Zhangyuan/The Louis are removed from the executable plan. A daytime Bund revisit can replace shopping only, not be appended at the end.

Each daily timeline has an existing-style disclosure for the MASTER Trip Brief: default sequence, delay branches and next step. Details, map selection, copy addresses, summaries and the clock shortcut use the updated itinerary. Old Xujiahui and Zhangyuan detail links redirect to ZX and hotel luggage return. Locations without verified coordinates keep their addresses and Amap keyword searches rather than fabricated pins.

## Verification

Run `node tests/master-content.cjs` from the checkout. It checks source-content requirements, detail rendering, next-stop chronology, map-picker entries, legacy-link redirects, unchanged RC7.3.1 CSS/fonts/manifest, public-data exclusions and the service-worker cache key. These are static/runtime contracts with a minimal DOM harness, not a browser layout test or verification of actual transport, restaurant service, venue access or trip feasibility.

The offline cache is `mwy2026-rc7.3.3-master-20261016.1`. Existing app-shell assets, MapLibre and local reference images are retained. Updated itinerary and Trip Brief are part of the cached HTML. External media and street tiles still depend on connectivity or runtime cache.

## Still pending

- 10/31 lighting, ferry sailings/last sailing/date-specific notices, Freedom performances and Gundam Base operation.
- MWY 2026 daytime eligibility, cameras/photography/re-entry/timed programs; VIP ID, checking, bags, water/rest facilities, glowsticks and batteries. Daytime and concert rules are independent.
- EVA condition/access/photography and actual door-to-door navigation estimates.
- 11/2 ZX, New World City and target shops/pop-ups; Haijinzi lunch last-order/closure; quick meal fallbacks and seating.
- Restaurant operation, weather, Maglev, airport ETA and airline check-in/bag-drop deadlines.

## Public-data rule

The hotel name is intentionally retained for navigation. Do not publish flight numbers, hotel street address/phone, camera/lens model identifiers, booking/payment details, guest details, private notes or identity numbers. The private MASTER document is not copied into this repository.
