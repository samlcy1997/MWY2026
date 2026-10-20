# MWY2026 · Shanghai travel guidebook

The Meta guidebook is the core interface from this migration onward. Its original timeline cards, inline stylesheet and 85vh detail sheet are retained. Itinerary data and added behavior live in `assets/meta-data.js` and `assets/meta-integration.js` (under `dist/` in the Sites checkout).

The working itinerary is MASTER v2026-10-21.1. Day 1 now offers two short, optional Nanjing East Road snacks (Taikang fresh-meat mooncake and Shen Dacheng traditional rice cakes) in the existing snack stop, 16:05–16:25, with 16:45 Bund photography protected. The Lujiazui route still leaves at 19:45 for a planned 20:45 LaLaport arrival and pending 20:55 outdoor show. Day 2 stays at MWY until 14:40, then EVA 15:00–15:25, leaves the camera at the hotel 16:05–16:20, has a small Shengjian snack at Xiaoyang (Xiexin) around 17:02–17:45, returns for VIP check-in around 18:02, watches the 19:00 show and celebrates with Zige Luzi Zibo BBQ near the hotel around 21:35–22:35. Day 3 remains unchanged: Bian Jie breakfast at 08:30–08:55 and Wukang by 09:25, before the previously planned activities and flight. Travel estimates, VIP admission, ferry schedules, daytime camera admission, late-night last orders and restaurant hours remain pending until confirmed. The public guide does not expose private MASTER data.

Migration restores the daily route/contingency brief, all 22 map-selector destinations, hotel actions on arrival and after the show, Clipboard API fallback, visible conditional phase notes, detail swipe navigation, bounded offline preparation, and photo-map routes/error handling. Maps initialize after their disclosure opens and resize when their container becomes visible. Unknown coordinates remain unknown; those stops retain their address and detail link.

The reading refinement keeps the original inline stylesheet, palette, image-card proportions and 85vh sheet. Application labels are at least 11px, detail prose is 14px, and stop times use 14px monospace. Appearance, completion progress and actual offline-image download progress are in the settings drawer. Copy/navigation actions are beside the address, and notes remain at the bottom with visible saving failures and a copy-backup action. Daily maps are collapsed until requested.

## Validation

Run `node tests/meta-framework.cjs` from the checkout. This checks the 22-stop route, practical detail facts, original reference media/links, 54 subphases and 4 photo-map datasets against the pre-migration baseline, all 4,320 trip minutes, component actions, conditional notes, swipe handlers, clipboard fallback, Service Worker timeouts and photo-map lifecycle. It also checks that the original Meta inline stylesheet, complete React renderer, integration stylesheet, detail component geometry, image-card assignments, stable stop IDs and Day 3 data are unchanged from the content-update baseline. Copy can be rewritten: the suite protects times, destinations, references and practical facts rather than requiring old sentences verbatim.

The suite also checks storage failures/recovery, settings and Escape, daily-map deferred loading/failure/reopening, and actual worker progress messages. These are source, component-tree and mocked-platform contracts. Mobile layout, touch feel, browser permissions, Android back behavior and physical-device offline operation still need device testing. External photos, tiles and transport/venue information are not verified by this suite.

## Local HTML copy

Run `python3 scripts/build-standalone.py /absolute/output/path.html`. It embeds application scripts, styles and local reference images. A file URL cannot install a Service Worker, so its offline-image control shows an explanation. The text itinerary works locally; external photos and street tiles still need connectivity.

## Public-data boundary

The hotel name is retained for navigation. Do not publish flight numbers, hotel street address/phone, camera/lens model identifiers, booking/payment details, guest details, private notes or identity numbers. The private MASTER document is not copied into this repository.
