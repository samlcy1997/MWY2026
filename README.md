# MWY2026 · Meta framework test

This branch adapts Meta's supplied `guidebook-3day.html` directly. The original inline stylesheet, varied timeline cards and 85vh detail sheet are retained. Current itinerary and behavior are connected through `assets/meta-data.js` and `assets/meta-integration.js`.

- Itinerary baseline: Google Drive MASTER v2026-10-17.1.
- Independent test site: https://mwy2026-meta-framework-test.bravemelon.chatgpt.site
- Main production branch: unchanged by this test branch.
- Source HTML: `index.html`. Static hosting needs no build step.
- Verification: `node tests/meta-framework.cjs`.

The tests cover all 4,320 trip minutes, phase references, cross-day navigation, and important arrival/departure boundaries. Browser layout and touch interaction QA remain unverified in the current environment.

Ferry schedules, day exhibition camera admission, VIP entry details and restaurant hours retain their pending labels. Scheduled suggestions are planning estimates, not live location tracking.
