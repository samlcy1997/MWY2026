# MWY2026 Shanghai Field Guide

A mobile-first three-day Shanghai field guide built around 未來有你 2026, photography, food, transport and time-critical decision branches.

## Current RC7.3 scope

- RC7.3 is a fixing / consolidation pass over RC7.2, not a redesign: navigation, itinerary IA, timeline/map behavior and field-guide art direction stay unchanged
- Public-source privacy cleanup removes camera body and lens model identifiers while keeping the same carry/storage decisions
- RC7 light/dark tokens are now the single theme source of truth; superseded root token blocks were removed
- Detail pages now expose stable archetype hooks (food / photo / transport / event / place / decision) for consistent styling without changing content structure
- Field-use metadata and captions are raised to a more readable floor, and residual large-radius imagery / decorative event glow are normalized to the RC7 visual system
- Blue photography-led visual system, local serif headings and monospace times, with matching light and dark themes
- Unified itinerary entry: collapsible three-day summary above the full daily timeline; bottom navigation is Itinerary / Map / Guide
- Dates remain manually selected. Shanghai time affects only the floating planned-stop shortcut, which returns to the original browsing context
- Timeline and map share day and stop selection; details preserve the originating view, scroll and keyboard focus
- 21-stop itinerary and 22 detailed guides aligned with the source document's `MASTER｜唯一現行行程｜v2026-10-09`
- Day 2 camera storage happens before leaving the hotel; the superseded afternoon carry/storage branch and its destination override are removed
- Day 3 includes checkout and luggage storage, a firm 13:15 lunch fallback decision, and the original 15:15 photography / airport cutoff
- Morning event time remains flexible, dinner follows the current order, and post-show food is decided on the day without old fixed restaurant branches
- Native browser pull-to-refresh restored by removing vertical overscroll suppression
- Immediate mobile response without scaling, spring recovery or full-page motion
- Offline app shell includes the city cover, local fonts, MapLibre 5.24.0 and the two instructional images; viewed remote images and map assets retain runtime caching

## Public-data rule

The hotel name is intentionally retained for navigation context. Flight numbers, hotel street address, hotel phone number, booking/payment details, guest details and other private trip records are excluded from the published source.

## Content authority

Only the current MASTER section defines the executable itinerary. Research / Decision Log sections provide background and must never override it. Reconcile timeline rows, detailed guides, navigation actions, overview text and pre-departure notes together when the MASTER changes.

## Still dynamic

- Freedom Gundam night performance timing for 10/31
- Bund / Lujiazui landscape-lighting arrangement for 10/31
- Dongjin ferry service on the day
- MWY Part.2 / bag / security / re-entry rules; camera stays at the hotel unless a later official notice explicitly relaxes the restriction
- Late-October Xujiahui IP events
- Zhangyuan / The Louis current pop-ups
- Restaurant closures, relocations and opening-hour changes


## Rollback

RC4.5 rollback point: `52050275c5dbf9d91ad9436a02197c39b84cbe31`.
