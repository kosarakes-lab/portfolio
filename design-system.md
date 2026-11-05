# Design system — Kosara Keskinova portfolio

Source of truth: Figma `portfolio-web` → page `website-pages` → frame `index` (1:117), 1280×832.
Values below are read from the Figma layers. Figma has no variables/styles defined, so these are the tokens.

## Colour (exactly three)
| token        | value     | use |
|--------------|-----------|-----|
| `--ink`      | `#060606` | page background, text on paper, year column of table rows |
| `--paper`    | `#f5f6ee` | text on ink, outlines, about-card fill, footer fill, idle filter fill |
| `--accent`   | `#da70fb` | active filters and nav pills, the filter-count badge, footer "Let's work together!", footer link hover — nothing else |

Secondary text (location, Privacy Policy, Terms of Use): ink at 70% opacity in the paper footer; `--muted` `#8b8c85` in the ink phone menu. No other colours or tints.

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
- Cards: radius 15, padding 25, inner gap 20. On screens ≥ 800px their height fills the space between the nav bar and the footer, leaving 24px above the footer.
- Card media: radius 15, height is the card height minus 121, width follows the image's aspect ratio (at most 3% cropped when a very wide image reaches the screen's width).
- Pills (filters): radius 20, padding 10, gap 3 between pills.
- Nav pills (projects / about): radius 15, padding 10.
- Outlines: 1px `--paper` on ink, 1px `--ink` on paper.

## Two surface languages
- **Project card** = hollow: `--ink` fill, 1px `--paper` outline, paper text.
- **About card** = solid: `--paper` fill, ink text, no outline.
- Every about card has the same label: 14/400 uppercase, top-left. No numbering.
- About cards on screens ≥ 800px carry the same 11-point spiky star in `--accent` at 10% opacity, sized to fill the free space under the text: as wide as the card at most, its top 28px below the text, its bottom cut off by the card's edge. A card with under 70px to spare has none. Never on phones.
- While the strip scrolls, the star turns (0.2° per pixel) and crosses its card, from the right side as the card enters at the right of the screen to the left side as it leaves. With reduced motion turned on it stays still in the centre.
- **Table card** (education, experience, awards, exhibitions, skills), from the calendar and table-of-contents references:
  the label, then the table 20px under it (the card's own gap), so any spare space falls below the table. Owner's decision: short tables (Education, Awards) keep their natural row height and leave the spare cream below them; rows never stretch to fill the card.
  The table is one block like a spreadsheet: radius 15, 1px ink outline, rows and columns split by 1px ink hairlines.
  A header row (14/400 uppercase, about 32px tall) names the columns (e.g. YEARS · SCHOOL · DEGREE). Then the rows: first column (ink fill, running down the whole table including the header,
  paper text, tabular figures, 14/400: the years, or the area for skills) · where / tools (18/700) · what (14/300). Rows about 58px tall (they tighten on short screens so the table always fits).
  On phone the table has two columns: the first column spans each entry's two lines, and the header reads e.g. "SCHOOL / DEGREE".

## Layout (≥ 800px)
- Left gutter 100px (40px between 800 and 1099px) for header name, nav bar, strip start and footer. Right gutter the same for "Let's talk" and the language switch.
- The strip runs to both screen edges, with no fade or mask. At rest after load or filtering, the first card sits on the gutter line, in line with the filters, and nothing shows in the gutter. After a scroll or swipe, the strip settles with a card edge on the gutter line.
- Header 70px tall, items centred vertically, space-between: the name on the left, "Let's talk" on the right (a mailto link for now): the same text style as the name, then a 24px pink circle with an ink arrow; the text turns pink on hover.
- Nav bar under the name, on every page: ABOUT, then PROJECTS. On the home page, clicking PROJECTS shows only the projects and opens the project filters right beside it (3px apart); clicking ABOUT shows only the about cards and has no filters. Clicking the active pill again returns to everything mixed, which is also how the page loads. The bar keeps its height with the filters closed, so the cards never resize.
- Content strip: single horizontal row, 30px gap between cards, directly under the nav bar.
- Footer: 40px bar, `--accent` fill, ink text, no hover effect or animation. EMAIL · INSTAGRAM (14/700 uppercase, 25px apart) on the left; Privacy Policy · Terms of Use at 20% opacity in the exact middle; the language switch EN · BG (· IT) on the right (14px apart, the current language 700).

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
- Menu (Figma `menu` frame): ink sheet under the header, matching the interface, left-aligned. The label "WHAT WOULD YOU LIKE TO EXPLORE?", then ABOUT (nav pill; choosing it closes the menu), then PROJECTS (nav pill), with the project filters opening under it when it is on. The X closes the menu otherwise. At the bottom, edge to edge, a pink block with ink text, stacked on the left: the language switch (EN · BG, current in bold), EMAIL · INSTAGRAM (700), then Privacy Policy · Terms of Use at 20% opacity (they wrap on narrow phones).
- Menu pills look and behave exactly as on desktop. There is no "Let's talk" or "Explore" button on phones.
- The pink footer closes the page with the same stack as the menu's pink block.
- Project pages on phone: one column; the meta pairs wrap side by side in a row (20px gaps) instead of stacking, so the lead stays near the top.

## Interactive states
- Filter idle: 1px paper outline, paper text. **Active**: pink outline and pink text, no fill. No filter on means all projects.
- PROJECTS and ABOUT are bold and identical: idle = paper outline and text, active = pink outline and text. A nav pill is active while its view is showing.
- Hover never underlines. Idle pills fill with paper, never turning pink; the name and "Let's talk" text turn pink; project-card media zooms 1.03 (600ms); next-project card fills paper; the footer does nothing.
- Keyboard focus: 2px paper outline (ink on paper surfaces). Never pink.
- Motion-graphics cards play their video silently on a loop while on screen and pause off screen. With reduced motion turned on they show the poster.

## Fonts
- Inter 300–700 is self-hosted from `assets/fonts/` (latin, latin-ext, cyrillic). Do not link Google Fonts: it sends every visitor's IP address to Google, which the privacy policy says does not happen.

## Project page media
- Videos are never cropped: they show full width at their own proportions, in the hero, alone and in pairs. Only still images in a pair are cropped to 4:5.

## Languages
- English is the original, at the top level; each other language lives in its own folder (`/bg/`, later `/it/`) with the same pages. Every page links to its other language versions (hreflang), and links inside a language stay in it.
- The switch is in the footer on every screen, and also in the menu on phones. Layouts must hold with Bulgarian text, which runs about 10–20% longer than English.
