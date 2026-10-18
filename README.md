# MWY2026 · Shanghai travel guidebook

The Meta guidebook is the core interface from this migration onward. Its original timeline cards, inline stylesheet and 85vh detail sheet are retained. Itinerary data and added behavior live in `assets/meta-data.js` and `assets/meta-integration.js` (under `dist/` in the Sites checkout).

The working itinerary is MASTER v2026-10-17.1. Ferry schedules, daytime camera admission, VIP entry details and restaurant hours retain their pending conditions. Timed suggestions describe the plan, not the traveler's actual location.

Migration restores the daily route/contingency brief, all 22 map-selector destinations, hotel actions on arrival and after the show, Clipboard API fallback, visible conditional phase notes, detail swipe navigation, bounded offline preparation, and photo-map routes/error handling. Maps initialize after their disclosure opens and resize when their container becomes visible. Unknown coordinates remain unknown; those stops retain their address and detail link.

## Validation

Run `node tests/meta-framework.cjs` from the checkout. This checks the 22-stop route, 23 complete detail bodies, guide, 49 subphases and 4 photo-map datasets against the pre-migration baseline, all 4,320 trip minutes, component actions, conditional notes, swipe handlers, clipboard fallback, Service Worker timeouts and photo-map lifecycle. It also checks that the original Meta inline stylesheet is unchanged.

These are source, component-tree and mocked-platform contracts. Mobile layout, touch feel, browser permissions, Android back behavior and physical-device offline operation still need device testing. External photos, tiles and transport/venue information are not verified by this suite.

## Local HTML copy

Run `python3 scripts/build-standalone.py /absolute/output/path.html`. It embeds application scripts, styles and local reference images. A file URL cannot install a Service Worker, so its offline-image control shows an explanation. The text itinerary works locally; external photos and street tiles still need connectivity.

## Public-data boundary

The hotel name is retained for navigation. Do not publish flight numbers, hotel street address/phone, camera/lens model identifiers, booking/payment details, guest details, private notes or identity numbers. The private MASTER document is not copied into this repository.
