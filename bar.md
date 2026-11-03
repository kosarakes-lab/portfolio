# The bar

Reference = Kosara's Figma `index` frame (style from the moodboard: Wellfound Ideas Report pills),
content-strip logic from lucasgeiger.de, project pages from datalands.co/work/nike-viz.
Every line is checkable by looking at a render.

1. **Three colours, accent used for two roles only.** Only ink `#060606`, paper `#f5f6ee`, pink `#da70fb` appear.
   Pink appears only on active filter/nav pills, the filter-count badge and the footer CTA (and footer links
   while hovered). Any other pink on screen is a fail. The footer's secondary line (location and legal links)
   is ink at 70%, grey in the phone menu.

2. **Three type sizes on the index, 36 ≈ 2.6× 14.** Labels 14, card titles 18, display 36. A fourth size, or
   a display line that doesn't dominate the about card, fails. The footer CTA stays 36 when the footer opens.

3. **Every element is a rounded shape, and surface tells you the type.** No square corners anywhere.
   Project = hollow outline card on ink; about = solid paper card. You can tell a project from an about
   card at thumbnail size, by fill alone.

4. **One strip, one gutter.** All content sits in a single 500px-high horizontal row with 30px gaps, and
   name, strip start, filter rows and footer CTA share one left edge (100px at 1280 wide). The page itself
   does not scroll vertically on desktop: the wheel/trackpad moves the row sideways, and the row loops
   so it never hits a dead end (lucasgeiger.de mechanism).

5. **Filtering never leaves a hole or an empty page.** Clicking a pill turns it pink at once, the strip
   reflows with a transition of 250–450ms (cards fade/close up, no jump cut), the row re-anchors to its
   start. Toggling the last active pill off re-enables all. "about" in the nav = all about pills on,
   all project pills off, and vice versa — the nav pill state always mirrors the filter rows.
   A result narrower than the screen stays on the left gutter line (the empty space to its right is
   the one-left-edge rule at work, not a defect); it does not centre or repeat.

6. **Card widths come from the media, not a grid.** Card height is fixed; width follows each image's
   aspect ratio (tall phone screenshot → narrow card, landscape → wide). Strip reads as varied rhythm,
   never as equal tiles.

7. **Project page = Datalands case-study order.** Breadcrumb (`KOSARA KESKINOVA / PROJECT`) top-left;
   title ≥ 4× body size; 3 labelled fields (year · client · discipline) beside the lead paragraph, all
   in the first screen at 1280×832; then media and text alternate (single or paired media) — media full width of the content column,
   text capped at ~65 characters per line, never two text blocks back to back; ends with a
   "NEXT PROJECT" link to the next project. Same three colours and shapes as the index.
