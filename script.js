/* Edit your content here */
const projects = [
  {
    title: 'Jollibee Integrated Business Information System',
    cat: 'Full-Stack', year: 2026,
    text: 'An online ordering website paired with an operations dashboard.',
    problem: '', // TODO: the problem that came up while building this
    solution: '', // TODO: what you did to solve it
    stack: 'HTML, CSS, JavaScript, PHP',
    image: 'images/jollibee.jpg',
    live: 'https://jollibeewebsite.infinityfreeapp.com/',
    repo: 'https://github.com/fayemirabelsemira/jollibee_redesign',
  },
  {
    title: "Sol's Collection",
    cat: 'Full-Stack', year: 2026,
    text: 'An online reading platform with a chapter reader and a writer studio.',
    problem: '', // TODO: the problem that came up while building this
    solution: '', // TODO: what you did to solve it
    stack: 'HTML, CSS, JavaScript, Supabase, Cloudflare',
    image: 'images/sols.jpg',
    live: 'https://sol.ladyysol.workers.dev/',
    repo: 'https://github.com/fayemirabelsemira/sols-collection',
  },
  {
    title: 'Fabulous Bakery',
    cat: 'Frontend', year: 2026,
    text: 'A website for a homemade cookie and crinkle shop in Tagaytay, with a menu and ordering through Messenger or text.',
    problem: '', // TODO: the problem that came up while building this
    solution: '', // TODO: what you did to solve it
    stack: 'React, Vercel',
    image: 'images/fab-bakery.jpg',
    live: 'https://fab-baker-boy-react.vercel.app/', repo: 'https://github.com/fayemirabelsemira/fab-baker-boy-react',
  },
  {
    title: 'Rosario Poultry Farm',
    cat: 'Frontend', year: 2026,
    text: 'A website for a poultry farm selling fresh eggs in small, medium and large sizes, with orders by SMS or WhatsApp.',
    problem: '', // TODO: the problem that came up while building this
    solution: '', // TODO: what you did to solve it
    stack: 'Vercel',
    image: 'images/rosario-poultry.jpg',
    live: 'https://poultry-business.vercel.app/', repo: 'https://github.com/fayemirabelsemira/poultry_business',
  },
];

const tech = [
  ['HTML', 'logos/html.png'], ['CSS', 'logos/css.png'], ['JavaScript', 'logos/javascript.png'],
  ['React', 'logos/react.png'], ['GSAP', 'logos/gsap.png'], ['Supabase', 'logos/supabase.png'],
  ['Git', 'logos/git.png'], ['GitHub', 'logos/github.png', true], ['VS Code', 'logos/vscode.png'],
  ['Cloudflare', 'logos/cloudflare.png'],
];
const soft = ['Problem solving', 'Attention to detail', 'Communication', 'Teamwork', 'Time management', 'Quick learner', 'Creativity'];

const $ = (s) => document.querySelector(s);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const real = (u) => u && u !== '#';

/* Projects + filter */
function render(filter) {
  const list = projects.filter((p) => filter === 'All' || p.cat === filter);
  $('#count').textContent = `Showing ${list.length} of ${projects.length} projects`;
  $('#grid').innerHTML = list.map((p) => `
    <article class="card">
      <div class="thumb"><img src="${p.image}" alt="${esc(p.title)} screenshot" loading="lazy" /></div>
      <span class="meta">${p.cat} · ${p.year}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.text)}</p>
      <p class="st">Stack: ${esc(p.stack)}</p>
      ${p.problem || p.solution ? `<details><summary>Case Study</summary>
        ${p.problem ? `<h4>Problem that arose</h4><p>${esc(p.problem)}</p>` : ''}
        ${p.solution ? `<h4>Solution I made</h4><p>${esc(p.solution)}</p>` : ''}
      </details>` : ''}
      <div class="actions">
        ${real(p.live) ? `<a class="btn primary" href="${p.live}" target="_blank" rel="noreferrer">Live Demo</a>` : ''}
        ${real(p.repo) ? `<a class="btn ghost" href="${p.repo}" target="_blank" rel="noreferrer">Source Code</a>` : ''}
      </div>
    </article>`).join('');
}
document.querySelectorAll('.chip').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('.chip').forEach((c) => { c.classList.toggle('on', c === b); c.setAttribute('aria-pressed', c === b); });
  render(b.dataset.f);
}));
render('All');

/* Skills */
$('#tech').innerHTML = tech.map(([n, src, inv]) => `<li><img src="${src}" alt="" ${inv ? 'class="invert"' : ''} loading="lazy" />${n}</li>`).join('');
$('#soft').innerHTML = soft.map((s) => `<li>${s}</li>`).join('');

/* Theme toggle */
const root = document.documentElement, tbtn = $('#theme');
const label = () => { tbtn.textContent = root.dataset.theme === 'dark' ? 'Light theme' : 'Dark theme'; };
label();
tbtn.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  label();
});

$('#yr').textContent = new Date().getFullYear();
