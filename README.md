# MWY2026 Shanghai Field Guide

A mobile-first three-day Shanghai itinerary for photography, local food and 未來有你 2026.

## RC7.3.4: MASTER v2026-10-17.1 timeline sync

Only the current MASTER defines the executable plan. Historical research and decision-log snapshots do not override it. This release starts from shipped RC7.3.1; the rejected RC7.3.2 UI changes are excluded. Existing CSS, fonts, colors, photos, navigation structure and manifest are retained.

- **Day 1:** allow about 15:20–16:05 for a full meal. Lailai is check-first; unavailable or queued means a quick full meal nearby. Taikang is an optional snack. If still eating at 16:05, skip Waibaidu Bridge. The 16:15–16:45 bridge/walking window is flexible; photograph from the main Bund position around 16:45–17:40, then start south at 17:40 with 20–25 minutes for walking and quick photos. Aim for the ferry at 18:00–18:05; 18:15/18:30 sailings and last sailing remain unconfirmed. If waiting endangers Freedom, go directly to LaLaport and skip Pudong. Arrival around 19:45–20:15 is a traffic estimate; prioritize the robot, with Base shopping around 20:50–21:15 flexible. Leave LaLaport around 21:10–21:30. Carry water and supplementary savory food before Dong Taixiang supper.
- **Day 2:** protect both meals. With reliable daytime camera permission and favorable timing, leave MWY around 14:00, photograph EVA around 14:20–14:55, travel directly to the hotel at 14:55–15:45, then reserve **15:45–16:00 separately for secure camera storage and changing to a light load**. Return to the venue area at 16:00–16:40; dinner/rest is 16:40–17:25. If still at MWY at 14:20, EVA access is blocked, transport runs late or VIP checking needs more time, skip EVA and secure the camera. Without confirmed permission, leave the camera at the hotel all day and do not activate EVA photography. Cameras never enter the evening concert. 17:45–18:00 is a provisional VIP entrance target subject to official guidance; the only concert is 19:00 VIP.
- **Day 3:** retains the MASTER's v2026-10-16.2 revision: checkout/breakfast, Wukang, ZX, New World City/CAPCOM, Haijinzi, hotel luggage, PVG T2. New World City is normally retained for 20–25 minutes but shortened or skipped first if earlier stops overrun; leave around 12:25–12:30. Aim for lunch around 13:00, allowing 45–55 minutes for ordering, preparation, eating and payment. Decide within 5–10 minutes of arrival; if unable to order by 13:10–13:15, use Linglong only with an immediate seat/order or get a quick full meal on the way to the station. Aim to finish at 13:45–13:55 and leave the lunch area with enough food before 14:00. Return to the hotel around 14:30–14:50 and reserve 20–40 minutes for luggage/necessary organization. **15:15–15:25 is the normal hotel departure window**; if not out at 15:30, recheck current services and T2 ETA. Hotel-to-T2 budget is 75–100 minutes including walking/waiting/transfers, targeting roughly 16:30–17:05 for the 19:05 flight. These are planning estimates. A daytime Bund revisit replaces shopping, never follows the full shopping/lunch plan.

Each daily timeline has an existing-style disclosure for the MASTER Trip Brief: default sequence, delay branches and next step. Details, map selection, copy addresses, summaries and the clock shortcut use the updated itinerary. Old Xujiahui and Zhangyuan detail links redirect to ZX and hotel luggage return. Locations without verified coordinates keep their addresses and Amap keyword searches rather than fabricated pins.

## Verification

Run `node tests/master-content.cjs` from the checkout. It checks source-content requirements, detail rendering, next-stop chronology, map-picker entries, legacy-link redirects, unchanged RC7.3.1 CSS/fonts/manifest, public-data exclusions and the service-worker cache key. These are static/runtime contracts with a minimal DOM harness, not a browser layout test or verification of actual transport, restaurant service, venue access or trip feasibility.

The offline cache is `mwy2026-rc7.3.4-master-20261017.1`. Existing app-shell assets, MapLibre and local reference images are retained. Updated itinerary and Trip Brief are part of the cached HTML. External media and street tiles still depend on connectivity or runtime cache. The Bund route image illustrates locations/sequence; current written times take precedence over times embedded in the image.

## Still pending

- 10/31 lighting, ferry sailings/last sailing/date-specific notices, Freedom performances and Gundam Base operation.
- MWY 2026 daytime eligibility, cameras/photography/re-entry/timed programs; VIP ID, checking, bags, water/rest facilities, glowsticks and batteries. Daytime and concert rules are independent.
- EVA condition/access/photography and actual door-to-door navigation estimates.
- 11/2 ZX, New World City and target shops/pop-ups; Haijinzi lunch last-order/closure; quick meal fallbacks and seating.
- Restaurant operation, weather, Maglev, airport ETA and airline check-in/bag-drop deadlines.

## Public-data rule

The hotel name is intentionally retained for navigation. Do not publish flight numbers, hotel street address/phone, camera/lens model identifiers, booking/payment details, guest details, private notes or identity numbers. The private MASTER document is not copied into this repository.
