# Meta migration · 2026-10-18

The user selected this Meta-based design as the project's core. Preserve its layout when adding future features.

The previous production snapshot is `60aa9b8294b0b3f39a3fa287443b27b630f55ff2` (RC7.3.8). All 22 timeline stops, the 23 detail destinations, guide, 49 planned phases and 4 photo-map datasets are retained. `tests/migration-baseline.json` records route/data facts, and `tests/content-references.json` records source media, links and actions. Reader-facing copy has been rewritten as a travel guide: what to see, eat and photograph first, with timings in the time fields and practical exceptions in the notes. Tests protect facts and functions rather than preserving the old planning prose.

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

The reading refinement preserves the original inline stylesheet and visual tokens. Stop times are 14px monospace, detail prose is 14px, and application labels are at least 11px. Daily maps are collapsed and initialize on demand, with failure text and all stop links retained. The settings drawer contains appearance, completion progress and offline downloads with progress from the actual worker. Address actions are grouped beside the address; notes remain at the bottom and show saving failures with a copy action for backup.

Validation: `node tests/meta-framework.cjs`, including storage failure/recovery, settings/Escape, daily-map lazy loading/failure/reopening and worker progress. This is not a browser layout or physical-device test. Actual S23 Ultra layout, clipboard permissions, touch behavior, Android back navigation and real offline reload remain unverified in this environment.
