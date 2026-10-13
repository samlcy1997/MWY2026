# MWY2026 Shanghai Field Guide

A mobile-first three-day Shanghai field guide built around 未來有你 2026, photography, food, transport and time-critical decision branches.

## Current RC7.3.2 — field-use improvements (2026-10-13)

This release improves how the traveler finds actions and makes decisions. It preserves the itinerary and safety conditions of `MASTER v2026-10-12.5` from RC7.3.1.

- First-screen briefings show the action, time limit and next destination. Full timing explanations and photography references remain available on demand; food orders appear before photos.
- Manual camera, food, restaurant and luggage choices persist on the device and update itinerary rows, map destinations and next-stop actions. No camera permission is inferred: unverified entry/photography defaults to leaving the camera at the hotel. The evening concert always prohibits cameras.
- Carrying the camera adds a 14:30–16:00 hotel storage step. Recording safe storage directs navigation back to the venue before dinner. Nearby lunch/dinner are the defaults; backup restaurants enter the map only when selected.
- Day switches compact the shared cover, increase scanning space and distinguish main stops, backup food and on-the-day decisions. Day selection remains manual; time affects only the floating planned-stop shortcut.
- Destination actions provide copy and Amap links. Unconfirmed nearby meals use a local search; hotel and fallback destinations without verified coordinates use keyword search instead of fabricated map points.
- Photos can be enlarged in an accessible dialog. Failed images retain a clear retry action. The Shanghai Freedom Gundam reference is a locally cached, correctly identified full-statue photograph with attribution; the unrelated previous statue images are removed.
- Light/dark themes, direct links, return context, native pull-to-refresh and immediate interactions remain supported. Offline core cache is `mwy2026-rc7.3.2` and includes the field-use assets and Freedom reference.


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
