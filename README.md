# MWY2026 Shanghai Field Guide

A mobile-first three-day Shanghai field guide built around 未來有你 2026, photography, food, transport and time-critical decision branches.

## Current RC6.12 scope

- Portrait-mobile refinement: compact three-day overview, consistent readable type, smaller detail titles, clear previous/next labels and comfortable source-link targets
- Timeline alternatives no longer collide with the route track; detail return preserves its day/map/guide context, scroll and focus, including directly opened links
- Detail pages expose section headings and modal semantics, contain keyboard focus and keep the background inactive while open

- Offline/weak-network resilience: added a service worker, navigation fallback, runtime caching for viewed images/CDN assets, a user-triggered prewarm for 13 critical recognition images, and a minimal web manifest

- Audit cleanup: removed repeated operational copy, exposed Shanghai Tower as a real Guide backup, removed unreachable standalone fallback pages, added missing image alt semantics, and deleted unused image constants

- Final text-heavy page pass: Gundam Base now uses official exact-store visuals, post-show is a three-way decision with optional Xiandelai imagery, and PVG return uses an arrival-time checkpoint plus a subway fallback schematic

- Non-food visual pass: Arrival now has a transport schematic with a Longyang Road fallback, MWY morning has venue imagery plus hall-function split, and the 15:45 camera checkpoint is rendered as a two-branch decision diagram

- Food visual rollout completed for the remaining main stops: 泰康、琪琪、王記、海金滋 now use storefront + dish pairing with source links, preserving the same recognition→order→special-instruction structure

- Food-page visual grammar: main restaurant pages now pair storefront recognition with food imagery; exact-store imagery is used where verified, non-exact brand references are explicitly labeled, and special instructional visuals remain optional

- Real-device correction: removed the abstract homepage route graphic and decorative stop count, shortened the masthead, forced the title to remain intact, retained only useful editorial numbering and the Bund time-route strip

- Self-review refinement: dynamic stop count and Day 1 monospace time rhythm complete the route-line prototype without adding new content

- Art-direction prototype: a single route-line visual language now links the homepage, Day 1 timeline, and Bund photography detail; day indexing and editorial route typography add identity without changing field-use logic

- Self-review correction: removed layout-skipping optimization that could destabilize off-screen detail maps, enabled map-loader retry after total CDN failure, and tightened dark-surface copy contrast

- Accessibility/performance hardening: stronger muted-text contrast, no intentional 8–9px visible labels in the final style layer, bounded lazy-map loading with CDN fallback, and touch feedback cleanup

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
