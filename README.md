# Little Marvels — Static Site (stub)

Plain HTML / CSS / vanilla JS. No build step. Drop it on any static host
(Cloudflare Pages, GitHub Pages, Netlify, plain Apache/nginx).

## Pages

- `index.html` — Home
- `mission.html` — Mission & Vision
- `what-we-do.html` — Hub for the three programme areas
- `support-children.html` — Children & Young People
- `support-family.html` — Family & Carer Support
- `community-events.html` — Community Events (also lists upcoming calendar items)
- `getting-here.html` — Address, transport, accessibility, first-visit FAQ
- `gallery.html` — Filterable gallery (placeholders ready to swap for real photos)
- `contact.html` — Form + FAQ

## Files & folders

```
/
├── *.html
├── css/style.css
├── js/main.js          ← nav toggle, sticky header, reveal animations, gallery filter
├── js/events.js        ← Google Calendar API v3 fetcher (with sample fallback)
└── assets/
    ├── logo.svg        ← Brand mark used in header & favicon
    ├── tree-hero.svg   ← Big tree on the home page hero
    └── twig.svg        ← Decorative corner accent on inner page heroes
```

## What's stubbed and ready to replace later

### Address
Every page shows `Address line 1 / 2 / 3 / City, Postcode`.
Search + replace once the real address is decided. The footer has it once,
plus `getting-here.html` (3 places) and `contact.html` (1 place).

### Image placeholders
All photo spots use a `<div class="image-ph" data-ratio="X/Y">…</div>`
block with intrinsic aspect ratio. To swap in a real image, replace the
whole div with:

```html
<img src="assets/images/foo.jpg" alt="…" class="image-ph__real">
```

…or just keep the same wrapper and put an `<img>` inside. The wrapper
already has rounded corners and the right aspect.

### Google Calendar
Open `js/events.js` and fill in:

```js
const CONFIG = {
  calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com',
  apiKey:     'YOUR_API_KEY',
  …
};
```

Setup steps:
1. Make the Google Calendar public (Calendar settings → "Make available to public").
2. Note the Calendar ID from the same panel.
3. In Google Cloud Console, enable the Calendar API and create an API key.
4. Restrict the API key to: Calendar API only, and the site's domain only.
5. Paste both values into `events.js`.

Until those are filled in, the events list shows sample events so the UI
doesn't look broken in review.

### Contact form
`contact.html` is wired for [Formspree](https://formspree.io). Replace
`YOUR_FORM_ID` in the `<form action>` URL once a form is created.
Alternative: any other form-to-email service with a similar API
(Basin, Web3Forms) — just swap the action URL.

### Phone / email
- `hello@littlemarvels.co.uk`
- `+44 (0)0000 000 000`

Both are placeholders — search & replace.

### Social links
All `href="#"` for now. Update Facebook / Instagram URLs in:
- footer (every page) — same `<div class="footer-social">` block
- `contact.html` (one extra copy in the contact info card)

## Design system

CSS custom properties at the top of `css/style.css` control everything:

- Brand colours: `--c-orange`, `--c-purple`, `--c-charcoal`, `--c-cream`
- Type: Fraunces (display) + Hanken Grotesk (body), both Google Fonts
- Spacing scale: `--s-1` through `--s-10`
- Type scale: `--fs-xs` through `--fs-4xl` (fluid via `clamp()`)
- Radii, shadows, easings: all tokenised

## Local preview

```powershell
# From the project root
npx serve
# or
dotnet serve
```

VS Code's Live Server extension also works. Any static file server is fine.

## Browser support

Modern evergreen browsers. Uses CSS custom properties, `clamp()`,
`aspect-ratio`, `backdrop-filter`, `IntersectionObserver`, and CSS
`columns` for the gallery masonry. Reduced-motion is respected.
