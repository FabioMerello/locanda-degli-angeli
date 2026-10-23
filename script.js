(() => {
  const $ = id => document.getElementById(id);
  const burger = $('burger'), nav = $('nav');
  const setOpen = o => { nav.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Chiudi il menu' : 'Apri il menu'); };
  burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => e.key === 'Escape' && setOpen(false));
  $('year').textContent = new Date().getFullYear();

  const hours = $('hours');
  if (hours) {
    // Ora italiana, indipendente dal fuso del visitatore. Aperto 12-15 e 19-24, chiuso il mercoledì.
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    const m = (+p.hour % 24) * 60 + +p.minute;
    hours.querySelector(`li[data-d="${day}"]`)?.classList.add('today');
    const open = day !== 3 && ((m >= 720 && m < 900) || m >= 1140);
    const s = $('status');
    if (s) s.textContent = open ? 'Aperto ora' : day === 3 ? 'Oggi siamo chiusi' : m < 720 ? 'Chiuso ora, apriamo alle 12:00' : 'Chiuso ora, riapriamo alle 19:00';
  }
  const btn = $('loadmap');
  if (btn) btn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.title = 'Mappa di La Locanda degli Angeli'; f.loading = 'lazy';
    f.src = 'https://www.google.com/maps?q=Piazza+Cosma+Clavarino+4+16154+Genova&output=embed';
    $('map').replaceChildren(f);
  });
})();
