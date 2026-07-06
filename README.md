# Little Marvels Charity Website
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
on SVG text, and CSS `columns` for the gallery masonry.
`prefers-reduced-motion` is respected throughout.
