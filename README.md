# MWY2026 Shanghai Field Guide

A mobile-first three-day Shanghai field guide built around 未來有你 2026, photography, food, transport and time-critical decision branches.

## Current RC6.0 scope

- Award-craft pass: live timeline state, visible copy feedback, accessible control states, quieter detail motion, larger microcopy, desktop composition refinement, and on-demand map loading

- Scenario-walkthrough fixes: explicit Day 1 delay cuts, 18:45 ferry checkpoint, corrected LaLaport→東泰祥 late-night timing, Day 2 afternoon camera checkpoint, and arrival-time-based PVG transport choice

- Copy-to-navigation actions added at the two transport points where the destination is needed immediately: arrival accommodation and PVG T2

- Final operational gaps: official 新六百YOUNG address, live PVG transport decision rule, and explicit labeling for generic food reference photos

- Operational-data compile: arrival transport, ferry fallback, split MWY morning/night contexts, post-show branches, executable Day 3 backups and the PVG food point are surfaced from the latest research notes

- Microcopy hierarchy cleanup: fewer tiny meta labels, larger section headings, food categories folded into readable lines, and simpler next/previous navigation

- Two restrained GPT Images guide assets are stored in-repo: xiaolongbao eating steps and the Bund north-to-south shooting sequence
- Photography pages still keep real reference photos and real map geometry; the generated Bund guide replaces only the verbose route text

- Event-specific detail layouts instead of one generic content skeleton
- Food pages focus on dish visuals, what to order, relevant eating context, and only meaningful exceptions
- Detail pages support visible previous/next navigation plus horizontal swipe
- Route footer uses one destination-copy action; duplicate sticky copy bars removed

- Content-pruned field guide: primary UI keeps only action-changing information

- Spatial hierarchy redesign: major itinerary anchors carry more visual weight than transit/food steps
- Progressive disclosure for secondary facts, weather branches and advanced photographer references
- Editorial photography references with fewer card-like containers and less metadata clutter
- Reduced persistent chrome; privacy state remains documented in Guide instead of occupying every screen
- Softer detail transition using fade/lift instead of full-screen lateral slide

- Trip-day current/next stop cue using Shanghai local time
- Lazy-loaded detail/reference imagery
- MapLibre CDN fallback for improved resilience

- Day 1 rebuilt from the latest locked itinerary: Nanjing East Road → Waibaidu Bridge / Bund → Pudong reverse-shoot → Jinqiao Freedom Gundam
- Day 1 food line: Lai Lai Xiaolong → Taikang fresh-meat mooncake → late dinner at Dong Tai Xiang
- Shanghai Tower removed from the normal Day 1 timeline and retained only as a weather/time-triggered bonus reference
- Day 2 / Day 3 operational timeline retained
- Timeline ↔ interactive MapLibre + OpenStreetMap linkage
- Page-specific layouts for photography, food, events, transport and area walks
- Photography field guides for the Bund line, Pudong reverse-Bund night shoot, Pudong reverse-shoot, Freedom Gundam, Wukang, Zhangyuan and The Louis
- Reusable reference images plus links to photographer originals where useful
- Pre-trip recheck board for lighting, ferry service, Freedom Gundam night-show timing and volatile opening hours

## Public-data rule

The hotel name is intentionally retained for navigation context. Flight numbers, hotel street address, hotel phone number, booking/payment details, guest details and other private trip records are excluded from the published source.

## Still dynamic

- Freedom Gundam night performance timing for 10/31
- Bund / Lujiazui landscape-lighting arrangement for 10/31
- Dongjin ferry service on the day
- MWY camera / bag / security / re-entry rules
- Late-October Xujiahui IP events
- Zhangyuan / The Louis current pop-ups
- Restaurant closures, relocations and opening-hour changes


## Rollback

RC4.5 rollback point: `52050275c5dbf9d91ad9436a02197c39b84cbe31`.
