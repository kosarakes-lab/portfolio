# Editing your portfolio

Everything you will change lives in two places:

- **`content/content.js`**: all text, projects, about cards, filters, order, contact details and legal details.
- **`assets/`**: your files (images, videos, posters).

You never need to touch `css/`, `js/` or the `.html` files.

---

## 1. See the site on your computer while you edit

Open Terminal and run:

```bash
cd ~/Files/00_Personal/portfolio-website
python3 -m http.server 8765
```

Then open <http://localhost:8765> in your browser. After every change in `content.js`, save and refresh the page.

While the site runs on your computer, a cream box in the corner lists mistakes (an unknown tag, a project missing from the order, a missing comma). Visitors never see this box.

To stop the server, press `Ctrl + C` in Terminal.

---

## 2. Where files go

| What | Folder | Example |
|---|---|---|
| Images (jpg, png) | `assets/images/` | `assets/images/volcano-01.jpg` |
| Full videos for project pages | `assets/videos/` | `assets/videos/happier.mp4` |
| Small videos for cards | `assets/videos/cards/` | `assets/videos/cards/happier.mp4` |
| Still image shown before a video plays | `assets/posters/` | `assets/posters/happier.jpg` |

Rules that save trouble:

- Use lowercase file names with dashes, no spaces or underscores: `two-centuries-01.jpg`, not `Two Centuries 01.JPG`.
- Images: export around **2000px wide**, JPG quality ~80. Bigger files only slow the site down.
- Videos: MP4 (H.264). Keep project-page videos under ~15 MB if you can.
- A poster has **the same file name** as its video, with `.jpg` instead of `.mp4`.

### Make a small card video and a poster (Mac, built-in tools)

Cards play a small version of the video. From the portfolio folder in Terminal:

```bash
avconvert --source assets/videos/happier.mp4 --preset Preset960x540 --output assets/videos/cards/happier.mp4
```

```bash
qlmanage -t -s 1600 -o assets/posters assets/videos/happier.mp4 && sips -s format jpeg assets/posters/happier.mp4.png --out assets/posters/happier.jpg && rm assets/posters/happier.mp4.png
```

Replace `happier` with your file's name.

---

## 3. Add a project

1. Put the files in the folders above.
2. In `content/content.js`, copy an existing project block inside `projects: [ … ]` and change it:

```js
{
  slug: 'happier',                       // lowercase, dashes; becomes the page address
  draft: true,                           // optional: only visible on your computer until you remove this line
  title: 'Happier?',
  client: 'Personal challenge',          // card subtitle + "client" on the page
  year: '2024',
  discipline: 'Motion graphics',
  tags: ['motion-graphics'],             // one or more filter ids (see filters at the top)
  cover: 'assets/videos/cards/happier.mp4', // image or small video shown on the card
  focus: '50% 50%',                      // optional: what to keep in view when a phone crops the cover
  intro: 'One or two sentences that open the project page.',
  blocks: [
    { media: 'assets/videos/happier.mp4', alt: 'Short description of what is shown' },
    { title: 'Starting point', text: 'A paragraph…' },
    { media: ['assets/images/a.jpg', 'assets/images/b.jpg'], alt: 'Two images side by side' },
    { title: 'Process', text: 'Another paragraph…' },
  ],
},
```

3. Add the slug to the `strip: [ … ]` list where you want the card to appear.
4. Save, refresh, check.

**Motion graphics:** give the project the tag `'motion-graphics'` and use a video (`.mp4`) as `cover`. The card then plays the video silently on a loop while it's on screen. Visitors who have reduced motion turned on see the poster instead.

**Blocks:** the first media block opens the page under the title. Alternate media and text; the page warns you (in the corner box) if two text blocks touch.

**Commas:** every `{ … }` block and every line inside it ends with a comma. A missing comma is the most common mistake, and the corner box tells you if the file can't be read.

---

## 4. Change the about cards

In `about: [ … ]`:

- A **statement** card has `statement: 'text'` (big bold text). `width` sets its width on desktop.
- A **table** card has `rows: [{ when, where, what }, …]`, like education, experience and skills. It shows the card's label, then a table with a header row (set it with `columns: ['Years', 'School', 'Degree']`) and one row per entry: `when` in the dark first column (the years; for skills, the area), `where` in bold (for skills, the tools), `what` in light text. Keep each entry short, ideally under 30 characters, so the card stays compact.

Add the card's `id` (for example `'about:languages'`) to `strip` to show it, and give it a `tag` from `filters.about`. To get a new filter pill, add `{ id: 'languages', label: 'languages' }` to `filters.about`.

---

## 5. Filters

`filters.projects` and `filters.about` set the pills. A pill only appears if at least one card uses its tag, so a filter can never show an empty page.

---

## 6. Contact and legal details

At the top of `content.js`, in `site`:

- `email`, `instagram`: used in the footer and menu. `location` ("Soon based in Sofia") appears with the legal links when the footer opens.
- `languages`: the language switch, e.g. `['en', 'bg']`. See section 7.
- `legal`: fills in the privacy policy and terms:
  - `address`: a postal address for legal contact.
  - `host`: the company hosting the site, e.g. `'Netlify, Inc., San Francisco, USA'`.
  - `hostPrivacy`: link to the host's privacy policy.
  - `country`: the law that applies and your data-protection authority (`'Bulgaria'` or `'Netherlands'`).
  - `updated`: the date of your last change to the legal pages, written year-month-day (`'2026-11-02'`). Each language shows it in its own way.

Fill all of these in before the site goes live. The legal pages flag empty fields on your computer.

If you ever add analytics, a contact form, embedded YouTube/Vimeo or Google Fonts, the privacy policy must be updated first, because it currently promises that none of these are used.

---

## 7. Languages (English, Bulgarian, and later Italian)

English is the original: `content/content.js`. Bulgarian text lives in **`content/content.bg.js`**, and the Bulgarian pages are at `/bg/` (for example `kosarakeskinova.com/bg/project.html?p=nepravda`). The EN · BG switch is in the footer, and in the menu on phones.

- **Change a Bulgarian text:** edit it in `content.bg.js`. Projects are matched by their slug, about cards by their id, and the blocks of a project follow the English blocks **in the same order**: a picture gets `{ alt: '…' }`, a text gets `{ title: '…', text: '…' }`.
- **Interface words** (buttons, labels) are in `ui` at the top of `content.bg.js`: the English wording on the left, Bulgarian on the right.
- **Your name** on the Bulgarian pages (top bar, page titles, legal pages) is `site.name` in `content.bg.js`. Remove that line to show it in Latin letters, as in English.
- **After you add or change a project in English:** anything not yet translated is shown in English on the Bulgarian page, and the corner box on your computer lists exactly what's missing. Translate those lines, or ask Claude to.
- **If you move, add or remove a block** in an English project, do the same in `content.bg.js`, so the order still matches. The corner box tells you if it doesn't.
- Use Bulgarian quotation marks „…“ and avoid the straight apostrophe ' inside the text; it ends the line early.

**Adding Italian later:** add `'it'` to `languages` in `content.js`, create `content/content.it.js` (a copy of the Bulgarian file, translated), then in Terminal run `python3 tools/make-language-pages.py`, which makes the `/it/` pages. The switch shows IT automatically.

**If you ever change an `.html` file** (you normally won't), run `python3 tools/make-language-pages.py` again so the Bulgarian pages match.

---

## 8. Put the site online

The site is plain files, with no build step. Any static host works. The simplest:

- **Netlify:** go to app.netlify.com/drop and drag the whole `portfolio-website` folder in. Then connect your domain `kosarakeskinova.com`.
- **GitHub Pages / Cloudflare Pages:** also free, and they keep a history of your changes.

To update the live site later, upload the folder again (or push the changes, if you use GitHub).

Before going live, check:

- [ ] All `// CHECK` lines in `content.js` and `content.bg.js` are confirmed or fixed.
- [ ] No project shows "Placeholder" text (or it's marked `draft: true`).
- [ ] `site.legal` is filled in; the legal pages show no corner box.
- [ ] Every video has a poster in `assets/posters/`.
- [ ] Have someone who knows your country's law read the privacy policy and terms.
