# Meta migration · 2026-10-18

The user selected this Meta-based design as the project's core. Preserve its layout when adding future features.

The previous production snapshot is `60aa9b8294b0b3f39a3fa287443b27b630f55ff2` (RC7.3.8). All 22 timeline stops, 23 detail bodies, the guide, 49 planned phases and 4 photo-map datasets are retained. `tests/migration-baseline.json` records the route/data snapshot and content hashes for reproducible parity checks.

The migration now includes:

- Per-day route and delay instructions using the original three Trip Briefs.
- All 22 stops in each day's relevant map selector, while only 15 verified coordinate entries receive map pins.
- Hotel copy/navigation as the primary action on arrival and after the show.
- Clipboard fallback inside the active dialog, with truthful failure feedback.
- Short conditional captions in the one-line banner and the complete current-phase note in its detail sheet.
- Swipe navigation, with controls, links, text inputs and maps excluded from swipe capture.
- Bounded worker/media preparation; local HTML gives an explicit explanation rather than waiting for a nonexistent worker.
- Photo-map route lines, emphasized main points, timeout/error fallback, deferred initialization and resize handling.

The three-day overview is represented by the existing day switcher; the old dashboard/bottom-navigation layout is not restored. Full detail bodies remain inside the existing disclosure. Completion marks and personal notes continue to use browser-local storage.

Validation: `node tests/meta-framework.cjs`. This is not a browser layout or physical-device test. Actual S23 Ultra layout, clipboard permissions, touch behavior, Android back navigation and real offline reload remain unverified in this environment.
