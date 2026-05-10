/* Little Marvels — events.js
 * Fetches public Google Calendar events via Calendar API v3.
 *
 * SETUP (do once when ready to go live):
 *   1. Make the calendar public:
 *      Google Calendar → calendar settings → "Make available to public".
 *   2. Get the Calendar ID from the same settings panel.
 *   3. Create an API key (Google Cloud → APIs & Services → Credentials).
 *      Restrict it to the Calendar API and to your site's domain.
 *   4. Paste both values into CONFIG below.
 *
 * Until those are filled in, sample events render so the UI is reviewable.
 */
(function () {
  'use strict';

  const CONFIG = {
    calendarId: '',     // e.g. 'abcd1234@group.calendar.google.com'
    apiKey:     '',     // e.g. 'AIzaSy...'
    maxResults: 6,
    container:  '#events-list'
  };

  const SAMPLE_EVENTS = [
    {
      summary: 'Coffee Morning',
      description: 'A relaxed gathering for parents and carers — tea, biscuits, and a friendly ear.',
      start: { dateTime: addDays(2, 10, 30) },
      end:   { dateTime: addDays(2, 12, 0) },
      location: 'Little Marvels, 15 Garry St, Glasgow G44 4BA'
    },
    {
      summary: 'Sensory Play Session',
      description: 'A targeted sensory session for children with additional support needs and their siblings.',
      start: { dateTime: addDays(7, 14, 0) },
      end:   { dateTime: addDays(7, 15, 30) },
      location: 'Little Marvels, 15 Garry St, Glasgow G44 4BA'
    },
    {
      summary: 'Caregiver Workshop: Communication Strategies',
      description: 'Practical tools for everyday communication with non-verbal and minimally-verbal children.',
      start: { dateTime: addDays(12, 10, 0) },
      end:   { dateTime: addDays(12, 12, 0) },
      location: 'Little Marvels, 15 Garry St, Glasgow G44 4BA'
    },
    {
      summary: 'Sibling Bonding Afternoon',
      description: 'Crafts, games, and cake for siblings of children with additional needs.',
      start: { dateTime: addDays(20, 13, 0) },
      end:   { dateTime: addDays(20, 16, 0) },
      location: 'Little Marvels, 15 Garry St, Glasgow G44 4BA'
    }
  ];

  function addDays(days, hour, minute) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour, minute, 0, 0);
    return d.toISOString();
  }

  const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  function fmtDate(iso) {
    const d = new Date(iso);
    return {
      day: String(d.getDate()),
      month: MONTHS[d.getMonth()],
      time: d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      weekday: d.toLocaleDateString('en-GB', { weekday: 'long' })
    };
  }

  function eventNode(ev) {
    const start = ev.start?.dateTime || ev.start?.date;
    if (!start) return null;
    const f = fmtDate(start);
    const wrap = document.createElement('article');
    wrap.className = 'event';
    wrap.innerHTML = `
      <div class="event-date" aria-hidden="true">
        <span class="day">${f.day}</span>
        <span class="month">${f.month}</span>
      </div>
      <div class="event-body">
        <h4>${escape(ev.summary || 'Event')}</h4>
        <p class="event-meta">${f.weekday} · ${f.time}${ev.location ? ' · ' + escape(ev.location) : ''}</p>
      </div>
      <a class="event-cta" href="${ev.htmlLink || '#'}">Details →</a>
    `;
    return wrap;
  }

  function escape(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  }

  function render(events, container) {
    container.innerHTML = '';
    if (!events || events.length === 0) {
      container.insertAdjacentHTML('beforeend',
        '<div class="events-empty">No upcoming events at the moment — check back soon.</div>');
      return;
    }
    events.forEach((ev) => {
      const node = eventNode(ev);
      if (node) container.appendChild(node);
    });
  }

  async function loadEvents() {
    const container = document.querySelector(CONFIG.container);
    if (!container) return;

    // No API key configured — render sample events
    if (!CONFIG.calendarId || !CONFIG.apiKey) {
      render(SAMPLE_EVENTS, container);
      return;
    }

    const params = new URLSearchParams({
      key: CONFIG.apiKey,
      timeMin: new Date().toISOString(),
      maxResults: String(CONFIG.maxResults),
      singleEvents: 'true',
      orderBy: 'startTime'
    });
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CONFIG.calendarId)}/events?${params}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Calendar fetch failed: ' + res.status);
      const data = await res.json();
      render(data.items || [], container);
    } catch (err) {
      console.error(err);
      container.innerHTML = '<div class="events-error">Couldn’t load events right now. Please try again later.</div>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadEvents);
  } else {
    loadEvents();
  }
})();
