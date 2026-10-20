# Image maintenance

Use the latest GitHub `main` as the source before editing. For image-only requests,
add or replace pictures inside the existing timeline image components using each
stop's `img` and `hasPhoto` fields. Preserve the established UI/UX: do not change
React component markup, CSS, class/style props, component positions, dimensions,
image-frame aspect ratios, navigation, or detail-sheet behavior. Do not change
itinerary text, times, destinations, order, stable IDs, or private-note storage.

Prefer verified local image assets to fragile hotlinks. Inspect their content and
the existing 16:9 center crop; record sources in `assets/PHOTO_SOURCES.md`. Update
the Service Worker cache and image expectations only for the intended picture
changes. Run `node tests/meta-framework.cjs`; do not regenerate renderer/CSS/detail
geometry baselines to conceal a UI change. Preserve Day 3 unless requested.
