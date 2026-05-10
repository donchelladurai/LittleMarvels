# Little Marvels — Static Site

Plain HTML / CSS / vanilla JS. No build step. Drop it on any static host
(Cloudflare Pages, GitHub Pages, Netlify, plain Apache/nginx).

**Domain target:** littlemarvels.org.uk
**Registered CIC:** SC842979

## Pages

- `index.html` — Home (Living Canopy hero with interactive marvel-leaves)
- `mission.html` — Mission & Vision
- `what-we-do.html` — Hub for the four service pillars
- `support-children.html` — Inclusive Nursery, Early Years & After-School ASN Provision
- `support-family.html` — Home & Family Support
- `community-events.html` — Community Engagement (also lists upcoming calendar items)
- `createable-hub.html` — CreateAble Hub (creative & sensory development space)
- `getting-here.html` — Address, transport, accessibility, first-visit FAQ
- `gallery.html` — Filterable gallery (placeholders ready to swap for real photos)
- `contact.html` — Form + FAQ
- `404.html` — Friendly not-found page

## Files & folders

```
/
├── *.html
├── css/style.css
├── js/main.js          ← nav toggle, sticky header, reveal animations,
│                         gallery filter, Living Canopy hero behaviour
├── js/events.js        ← Google Calendar API v3 fetcher (with sample fallback)
└── assets/
    ├── logo.png        ← Real wordmark logo (header + footer)
    ├── logo.svg        ← Hand-drawn fallback (still used as favicon)
    ├── tree-hero.svg   ← Older tree illustration (kept; canopy is now inline SVG)
    └── twig.svg        ← Decorative corner accent on inner page heroes
```

## Real-world details

- **Address:** 15 Garry St, Glasgow G44 4BA
- **Phone:** 07494 628105
- **Email:** admin@littlemarvels.org.uk
- **Instagram:** [@littlemarvelscic](https://www.instagram.com/littlemarvelscic)
- **Facebook:** [profile.php?id=61565497287016](https://www.facebook.com/profile.php?id=61565497287016)

## What's still pending

### OG / social-share image
`assets/og-image.png` is referenced by every page but doesn't exist yet.
Design at 1200×630, save as PNG/JPG (SVG is rejected by most platforms).

### Google Calendar credentials
Open `js/events.js` and fill in:

```js
const CONFIG = {
  calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com',
  apiKey:     'YOUR_API_KEY',
  …
};
```

Setup:
1. Make the Google Calendar public (Calendar settings → "Make available to public").
2. Note the Calendar ID.
3. In Google Cloud Console, enable the Calendar API and create an API key.
4. Restrict the API key to: Calendar API only, and the site's domain only.
5. Paste both values into `events.js`.

Until those are filled, the events list shows `SAMPLE_EVENTS` (also in
`events.js`) so the UI doesn't look broken in review.

### Contact form
`contact.html` is wired for [Formspree](https://formspree.io). Replace
`YOUR_FORM_ID` in the `<form action>` URL once a form is created.
Alternatives: Basin, Web3Forms — just swap the action URL.

### Image placeholders
All photo spots use a `<div class="image-ph" data-ratio="X/Y">…</div>`
block with intrinsic aspect ratio. To swap in a real image, replace the
whole div with:

```html
<img src="assets/images/foo.jpg" alt="…" class="image-ph__real">
```

…or keep the wrapper and put an `<img>` inside. The wrapper already has
rounded corners and the right aspect.

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
`aspect-ratio`, `backdrop-filter`, `IntersectionObserver`, individual
transform properties (`translate`/`rotate`/`scale`), `paint-order: stroke`
on SVG text, and CSS `columns` for the gallery masonry.
`prefers-reduced-motion` is respected throughout.
