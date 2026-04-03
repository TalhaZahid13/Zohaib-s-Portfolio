// Custom Cursor
const cur = document.getElementById('cur'), ring = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
  rx += (mx - rx) * .1;
  ry += (my - ry) * .1;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(tick);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '18px';
    cur.style.height = '18px';
    cur.style.background = 'var(--c4)';
    ring.style.width = '52px';
    ring.style.height = '52px';
    ring.style.borderColor = 'rgba(58,134,255,.4)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '10px';
    cur.style.height = '10px';
    cur.style.background = 'var(--c1)';
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(255,77,28,.4)';
  });
});

// Scroll Reveal
document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('up');
    });
  }, { threshold: 0.1 }).observe(el);
});

// Heatmap Generator
const hm = document.getElementById('heatmap');
const cols = [
  'rgba(26,23,20,.04)',
  'rgba(255,77,28,.15)',
  'rgba(255,77,28,.3)',
  'rgba(255,77,28,.55)',
  'rgba(255,77,28,.85)'
];
const w = [.3, .25, .2, .15, .1];

for (let i = 0; i < 84; i++) {
  const d = document.createElement('div');
  d.className = 'hc';
  const r = Math.random();
  let c = cols[0], acc = 0;
  for (let j = 0; j < w.length; j++) {
    acc += w[j];
    if (r < acc) { c = cols[j]; break; }
  }
  d.style.background = c;
  hm.appendChild(d);
}

// Nav Active State on Scroll
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  secs.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  nls.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--c1)';
    }
  });
});