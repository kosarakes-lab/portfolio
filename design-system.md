# Design system — Kosara Keskinova portfolio

Source of truth: Figma `portfolio-web` → page `website-pages` → frame `index` (1:117), 1280×832.
Values below are read from the Figma layers. Figma has no variables/styles defined, so these are the tokens.

## Colour (exactly three)
| token        | value     | use |
|--------------|-----------|-----|
| `--ink`      | `#060606` | page background, text on paper, year column of table rows |
| `--paper`    | `#f5f6ee` | text on ink, outlines, about-card fill, footer fill, idle filter fill |
| `--accent`   | `#da70fb` | active filters and nav pills, the filter-count badge, footer "Let's work together!", footer link hover — nothing else |

One grey, for the footer's secondary line only (location, Privacy Policy, Terms of Use, from Figma): `--muted` `#8b8c85` on ink, `--muted-paper` `#6b6c66` on paper (darkened to stay readable). No other colours or tints.

## Type — Inter only
| role                 | size | weight | case       | line-height |
|----------------------|------|--------|------------|-------------|
| nav / labels / meta  | 14   | 400    | UPPERCASE  | 1.08 |
| card subtitle        | 14   | 300    | Capitalize | 1.08 |
| pill text            | 14   | 700    | as written | 1.08 |
| card title           | 18   | 700    | UPPERCASE  | 1.08 |
| display (about statement, table-card title, CTA) | 36   | 700    | sentence   | 1.08 |

Three sizes on the index: 14 / 18 / 36. The footer CTA stays 36 when the footer opens. Project page may add one display size for the title.

## Shape
- Cards: radius 15, padding 25, height 500, inner gap 20.
- Card media: radius 15, height ~379, width follows the image's aspect ratio.
- Pills (filters): radius 20, padding 10, gap 3 between pills.
- Nav pills (projects / about): radius 15, padding 10.
- Outlines: 1px `--paper` on ink, 1px `--ink` on paper.

## Two surface languages
- **Project card** = hollow: `--ink` fill, 1px `--paper` outline, paper text.
- **About card** = solid: `--paper` fill, ink text, no outline.
- Every about card has the same label: 14/400 uppercase, top-left. No numbering.
- **Table card** (education, experience, awards, exhibitions, skills), from the calendar and table-of-contents references:
  the label, then the table 20px under it (the card's own gap), so any spare space falls below the table. Owner's decision: short tables (Education, Awards) keep their natural row height and leave the spare cream below them; rows never stretch to fill the card.
  The table is one block like a spreadsheet: radius 15, 1px ink outline, rows and columns split by 1px ink hairlines.
  A header row (14/400 uppercase, about 32px tall) names the columns (e.g. YEARS · SCHOOL · DEGREE). Then the rows: first column (ink fill, running down the whole table including the header,
  paper text, tabular figures, 14/400: the years, or the area for skills) · where / tools (18/700) · what (14/300). Rows about 58px tall (they tighten on short screens so the table always fits).
  On phone the table has two columns: the first column spans each entry's two lines, and the header reads e.g. "SCHOOL / DEGREE".

## Layout (≥ 800px)
- Left gutter 100px (40px between 800 and 1099px) for header name, strip start, filters and footer CTA. Right gutter the same for the nav.
- The strip runs to both screen edges, with no fade or mask. At rest after load or filtering, the first card sits on the gutter line, in line with the filters, and nothing shows in the gutter. After a scroll or swipe, the strip settles with a card edge on the gutter line.
- Header 70px tall, items centred vertically, space-between.
- Content strip: single horizontal row, 30px gap between cards, vertically centred in its band.
- Filters: a label "WHAT WOULD YOU LIKE TO EXPLORE?" (14/400 uppercase) ; then the projects row and the about row, 23px apart.
- Filters label is followed by the count badge: pink circle, ink 14/400 number = how many filters are on. Shown only while some but not all filters are on (none on means everything is shown, so no count). The label row keeps its height either way.
- Footer (Figma `footer`): 100px bar, `--paper` fill, one line 22px from the bottom: CTA in `--accent` 36/700 (a mailto link), then EMAIL · INSTAGRAM 14/400 uppercase ink, 25px apart; all share one baseline. "Soon based in Sofia · Privacy Policy · Terms of Use" (14/400, `--muted-paper`) sit at the right edge on the same line, and appear only when the footer opens (touch screens, which can't hover, always show them). Below 1100px wide the right group appears above the line instead, at the right edge, when the footer opens.
- Footer open (Figma `footer` hover frame): on hover or keyboard focus it grows upwards (450ms, slow in/out) until its top edge meets the bottom of the strip, covering the whole filter block (about 250–270px; Figma 242), so the edge never slices through the filter label. The line stays where it is and nothing changes size; the location and legal links fade in at its right end.

## Project and legal pages (not in Figma, defined here, built on the index tokens)
- Title: the one extra display size, `clamp(56px, 9vw, 120px)` / 700 / uppercase / line-height 1.08.
- Order: title (full width), then a two-column row with meta (1/3) beside the lead (2/3), then the first image. Text blocks below use the same 1/3 + 2/3 columns.
- Meta: three label (14/400 uppercase) + outline pill pairs (year, client, discipline), stacked 20px apart. All three are the same surface.
- Lead paragraph: 24 / 400 / line-height 1.3 (phone: 20). The page's second extra size, for the one paragraph that introduces it.
- Section headings: card-title style 18/700 uppercase.
- Long-form body: 18 / 300 / line-height 1.45, max ~65 characters per line. This is the only reading-text role. 1.08 is for labels and headlines and is unreadable for paragraphs.
- Media: radius 15, full content width. Portrait media (taller than wide) sits in the left half beside the text section that follows it (two equal columns, 30px gap, text aligned to the media's top); with no text after it, it is max 520px wide. Videos show a poster from `assets/posters/`.
- Media can also come as a pair, side by side (30px gap) to vary the rhythm; images in a pair crop to 4:5, videos keep their proportions.
- Legal pages use the same head with two meta pairs: last updated, contact.
- Next project / also read: outlined card (radius 15, padding 25) with label + display 36 title, uppercase.

## Phone and small tablet (< 800px), from the Figma mobile frames
- Vertical list that scrolls with the page. No horizontal strip.
- Header 48px, sticky: name left, hamburger (two 40px lines) right; it turns into an X when the menu is open.
- Gutter 20; cards full width, 5px apart, padding 20, inner gap 10; card title 18/700, subtitle 14/300.
- Every card is the full column width, and every card's media is the full card width: no card or cover is narrower than another. Media keeps its proportions; anything taller than 4:5 is cropped to 4:5.
- Statement cards 24/700 and as tall as their text. Table rows: year cell on the left spanning two lines, where above what.
- Menu (Figma `menu` frame): ink sheet under the header, matching the interface, left-aligned. The label "WHAT WOULD YOU LIKE TO EXPLORE?", then PROJECTS (nav pill, paper outline) with the project filters under it, ABOUT (nav pill, paper fill) with the about filters, then the EXPLORE pill (paper) that closes the menu. Then EN. At the bottom, on the same left edge as everything else: CTA 36/700 pink, EMAIL · INSTAGRAM, then Privacy Policy · Terms of Use in `--muted` on one line, then "Soon based in Sofia" in `--muted`.
- Menu pills look and behave exactly as on desktop: project pills paper outline (pink outline + text when on), about pills paper fill (pink fill when on).
- An "EXPLORE" pill (paper, ink outline, 700 weight, soft drop shadow so it lifts off the cards, fixed bottom centre, always visible while scrolling) opens the menu at the filters; it carries the pink count badge under the same rule as desktop.
- The page footer is not shown; the footer lives in the menu.
- Project pages on phone: one column; the meta pairs wrap side by side in a row (20px gaps) instead of stacking, so the lead stays near the top.

## Interactive states
- Filter idle: projects row = 1px paper outline, paper text; about row = paper fill, ink text.
- Filter **active** (Figma `projects` and `about` frames): projects row = pink outline and pink text, no fill; about row = pink fill, ink text.
- Nav pills wear the style of their row: PROJECTS idle = paper outline, active = pink outline and text; ABOUT idle = paper fill, active = pink fill.
- Nav pill is active exactly when every filter of its group is on and no other filter is on.
- Hover never underlines. Idle pills swap fill and outline (outline pill fills, filled pill empties), never turning pink; links turn pink; project-card media zooms 1.03 (600ms); next-project card fills paper; the footer opens.
- Keyboard focus: 2px paper outline (ink on paper surfaces). Never pink.
- Motion-graphics cards play their video silently on a loop while on screen and pause off screen. With reduced motion turned on they show the poster.

## Fonts
- Inter 300–700 is self-hosted from `assets/fonts/` (latin, latin-ext, cyrillic). Do not link Google Fonts: it sends every visitor's IP address to Google, which the privacy policy says does not happen.

## Project page media
- Videos are never cropped: they show full width at their own proportions, in the hero, alone and in pairs. Only still images in a pair are cropped to 4:5.
