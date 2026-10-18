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

## Design continuation · 2026-10-18

The conversations “分支 · 網頁設計(work)” and “繼續網頁設計分支” establish the design constraint: evolve Meta's original HTML and components, retain the complete itinerary, and use information hierarchy rather than removing content to resolve density. Keep the existing #f6f6f5 background, white surfaces, #0a84ff accent, #fef9c3 pending state, 24px timeline cards, inset 16–20px surfaces, pill controls, photo proportions and 85vh detail sheet. The original inline stylesheet remains unchanged; scoped integration styles provide the refinements. Prior attached HTML/lecture files are not available through the retrieved chat text, so their contents have not been independently re-audited.

The previous reading/settings pass already delivered larger type, deferred daily maps, storage failure feedback, notes at the bottom and actual offline download progress. This continuation fixes remaining time/marker overlap and aligns each time with its card independently of the preceding transport row. Transport uses quiet 12px text with dashed connectors; pending cards and labels use the existing yellow tokens. Completion controls now have 44px targets, the status clock uses 14px monospace, and card shadows stay within two subtle layers. Appearance preferences persist across reloads, with an explicit message when saving fails. The worker and stylesheet cache versions advance together to deliver the changes to existing installs.

The framework suite retains its original route/style/media protections and adds appearance-save/recovery checks. Chromium validation covers all 22 stops at widths 320, 390, 420, 768, 1024 and 1440px, time/marker separation, time/card alignment, page and detail overflow, light/dark switching, saved notes and appearance after reload, browser Back and service-worker offline reload. These browser checks do not establish physical-device touch feel, Android-specific behavior, external media/tiles availability or clipboard permission behavior.

The sticky status dock and three-day selector use opaque page backgrounds, including the status dock's bottom padding. The itinerary has its own stacking context below both controls so timeline markers cannot paint over them. Scroll checks at five positions in light and dark modes at 320, 420 and 768px verify contiguous dock/selector edges and that both layers remain above list content. The stylesheet/worker cache version for this follow-up is meta6.

## Source document cross-check · 2026-10-18

The user supplied `2026上海行程｜飲食與行程研究筆記.docx`. Its opening MASTER v2026-10-17.1 is the current itinerary; the later research/decision log contains superseded routes and is historical context. The private document and extracted text stay outside the repository and generated site.

Cross-checking the current MASTER confirmed the three-day route, Day 1 meal/bridge/ferry alternatives, conditional Day 2 camera/EVA/hotel branch, and Day 3 shopping/lunch/hotel/airport timing. The pending-conditions guide already retains the required venue, restaurant, ferry and transport checks. Two public detail clarifications were added: the Pudong summary now distinguishes finishing photography around 19:05 from calling a car around 19:05–19:15, and the airport detail restores the document's provisional 18:05 staffed-counter / possible 17:55 self-service deadline, subject to airline confirmation. Arrival remains targeted at 16:30–17:05; deadlines are not target arrival times. No flight identifiers, equipment model identifiers, private hotel contact/address or booking details were imported.

The framework regression suite passes, including all 4,320 trip minutes, unchanged route/style/media protections and both airport deadline facts. Data/worker cache version meta7 delivers these clarifications; the stylesheet remains meta6.
