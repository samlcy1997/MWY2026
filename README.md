# MWY2026 Shanghai Field Guide

A mobile-first three-day Shanghai field guide built around 未來有你 2026, photography, food, transport and time-critical decision branches.

## Current RC7.3.1 — MASTER sync (2026-10-12)

This release is an itinerary and operational-decision update over RC7.3. It is **not a redesign**. The authoritative document is the **current MASTER section** of the 2026 Shanghai itinerary research document, version `v2026-10-12.5`. Historical Research / Decision Log content must never override it.

- **Day 1**: Lailai Xiao Long at ~15:05 is a **check-first** option: an existing platform lists reopening at 15:30, so do not assume immediate service. If closed, queued or unlikely to finish by 15:40, switch to Taikang / takeaway; food cutoff 15:45. Begin Bund photography ~16:10, stop shooting 17:55–18:00 and reach Jinling East Road ferry around 18:10–18:15. Aim for the 18:15 sailing, consider 18:30 as backup, and switch to metro/car rather than wait if still unable to board at 18:30. Pudong night photography, Freedom Gundam, Gundam Base and Dong Taixiang remain the main route.
- **Day 2**: Breakfast, depart around 08:15–08:30, arrive at Jing'an Sports Center ~09:00 to verify entrance/crowds; official merchandise starts at 10:00. Spend the day on venue merchandise, exhibition, photos, fan activity and rest; **no separate Jing'an/Nanjing West Road sightseeing**. Goods are announced; full exhibition/side-event, camera, re-entry and VIP details remain subject to official 2026 guidance. 12:30–13:15 lunch is near the venue; Qiqi is only a genuinely convenient/no-queue alternative. Dinner 16:45–17:30 is nearby; Xiaoyang only without a long queue. Aim for the evening venue entrance at 17:45–18:00 (earlier if VIP guidance requires). The only concert is the confirmed 19:00 VIP night show; no matinee branch.
- **Day 2 camera branch**: Prefer daytime exhibition photography **only after reliable confirmation** that the 2026 exhibition permits camera entry **and photography**. If carried in the morning, allow 14:30–16:00, approximately 60–90 minutes, for a safe hotel return and storage before heading back to the venue. If permission is denied or cannot be verified, leave the camera secured at the hotel all day and use a phone where allowed; no return trip. Camera equipment must **never** be taken into the 19:00 concert. Keep memory cards with the traveler. This is distinct from concert prohibitions and must not rely on 2025 attendee accounts.
- **Day 3**: Checkout around 07:45–08:00, Wangji breakfast ~08:35–09:00, Wukang 09:25–10:15, Xujiahui 10:30–12:20. At 12:50–13:00 decide whether Haijinzi is feasible; switch to the quick fallback as needed, and head for Zhangyuan by 13:25. Zhangyuan ~13:40–14:05 and The Louis exterior ~14:05–14:25. Stop photography 14:25 and **depart the Louis area by 14:30**. Pick up hotel luggage ~15:05–15:15 and depart with it 15:15–15:25; **15:30 is the latest normal-traffic deadline**. The default airport route uses Metro Lines 1 and 2 via Longyang Road and then Maglev, with day-of alternatives only when warranted.

## Interface and reliability preserved from RC7.3

- Blue photography-led visual system, local serif headings and monospace times, with light/dark modes.
- Collapsible three-day summary; bottom navigation Itinerary / Map / Guide; details return to original view and scroll.
- Day selection is manual; Shanghai time only affects the floating planned-stop shortcut, derived from current itinerary row times.
- The itinerary's timeline, map selection, detailed guides and pre-departure notes are synchronized with the same decisions.
- Camera/lens model identifiers are intentionally excluded from public HTML; operational carry/storage conditions remain described without model names.
- Native browser pull-to-refresh, minimal non-essential motion, offline app shell with MapLibre and two local instructional images. Runtime caching retains viewed external images.
- Versioned service worker cache is bumped to `mwy2026-rc7.3.1`.

## Public-data rule

The hotel name is intentionally retained for navigational context. Flight numbers, hotel street address, hotel phone number, camera body/lens model identifiers, booking/payment details, guest details, internal notes and other private trip records must not be published.

## Content authority

Only the **latest MASTER section** defines the executable itinerary. Research / Decision Log sections are historical or explanatory. When MASTER changes, reconcile timeline times, stop descriptions, detail pages, map destinations, conditional routes, airport buffers, floating shortcut behavior and guide text together.

## Still dynamic — verify before departure

- Bund lighting schedule, Dongjin ferry sailings / closure, Freedom Gundam nighttime performance and Gundam Base hours.
- MWY 2026 exhibition camera entry/photography, queuing, re-entry, security/bag rules, side-event timetable and VIP admission; announced Goods do not confirm exhibition rules.
- Xujiahui IP pop-ups and Zhangyuan / The Louis installations on 11/2.
- Current restaurant trading times including Lailai afternoon reopening.
- Weather, Maglev operation and reliable Shanghai-to-PVG door-to-door ETA.

## Rollback

RC4.5 rollback point: `52050275c5dbf9d91ad9436a02197c39b84cbe31`.
