/* Edit your content here */
const projects = [
  {
      title: 'Jollibee Integrated Business Information System',
          cat: 'Full-Stack', year: 2026,
          text: 'An online ordering website paired with an operations dashboard.',
          problem: 'Customer orders and the back-office dashboard updated stock at the same time, causing conflicting data.',
          solution: 'I used transaction-style updates and role-based views so both sides stay in sync.',
          stack: 'HTML, CSS, JavaScript, PHP',
          image: 'images/jollibee.jpg',
          live: 'https://jollibeewebsite.infinityfreeapp.com/',
          repo: 'https://github.com/fayemirabelsemira/jollibee_redesign',
        },
        {
          title: "Sol's Collection",
          cat: 'Full-Stack', year: 2026,
          text: 'An online reading platform with a chapter reader and a writer studio.',
          problem: 'Long chapters and many readers at once caused slow loading and login problems.',
          solution: 'I used Supabase for login, comments and progress, kept the reader lightweight, and loaded only the data each writer needs.',
          stack: 'HTML, CSS, JavaScript, Supabase, Cloudflare',
          image: 'images/sols.jpg',
          live: 'https://sol.ladyysol.workers.dev/',
          repo: 'https://github.com/fayemirabelsemira/sols-collection',
        },
  {
      title: 'Fabulous Bakery',
      cat: 'Frontend', year: 2026,
      text: 'A website for a homemade cookie and crinkle shop in Tagaytay, with a menu and ordering through Messenger or text.',
      problem: 'The bakery took orders through Facebook and Messenger and had no polished website.',
      solution: 'I built a simple React site where each Order button opens Messenger or SMS with a pre-filled message.',
      stack: 'React, Vercel',
      image: 'images/fab-bakery.jpg',
      live: 'https://fab-baker-boy-react.vercel.app/',
      repo: 'https://github.com/fayemirabelsemira/fab-baker-boy-react',
  },
  {
    title: 'Rosario Poultry Farm',
    cat: 'Frontend', year: 2026,
    text: 'A clean product and ordering site for a local egg supplier in Rosario, Batangas.',
    problem: 'The farm needed a clear way to show egg sizes, prices and delivery, and to let customers order easily.',
    solution: 'I built a mobile-friendly page with product cards and one-tap SMS or WhatsApp order buttons.',
    stack: 'React / Vite, Vercel',
    image: 'images/poultry.jpg', // add this image
    live: 'https://poultry-business.vercel.app/',
    repo: 'https://github.com/fayemirabelsemira/poultry_business',
  },
  {
    title: 'Nexus Analytics',
    cat: 'Full-Stack', year: 2026,
    text: 'A data analytics platform that turns messy sales and expense files into clean data, charts and reports.',
    problem: 'Business owners have messy sales and expense files that are hard to clean, analyze and visualize.',
    solution: 'Nexus Analytics lets owners upload, clean, analyze, visualize and export their data without an account, with secure cloud storage for registered users.',
    stack: 'React, TypeScript, Tailwind CSS, Supabase',
    image: 'images/nexus-analytics.jpg',
    live: 'https://nexus-analytics-xi.vercel.app/',
    repo: 'https://github.com/fayemirabelsemira/nexus-analytics',
  },
  {
    title: 'AI Lead System',
    cat: 'AI Automation', year: 2026,
    text: 'An AI lead assistant for small businesses in the Philippines that scores each inquiry and drafts a reply in English, Tagalog or Taglish.',
    problem: 'Small business owners miss or reply late to website inquiries and lose customers, but fully automatic AI replies can make up prices or promises.',
    solution: 'The AI scores each lead and drafts a reply using only the business\'s own info, with safety rules that block made-up facts. The owner approves, edits or rejects it from Telegram or a dashboard before anything is sent.',
    stack: 'Node.js, Supabase (PostgreSQL), Groq AI, Telegram Bot API, Gmail',
    image: 'images/ai-lead-system.jpg',
    live: 'https://ai-lead-system-topaz.vercel.app/',
    repo: 'https://github.com/fayemirabelsemira/ai-lead-system',
    caseBtn: true,
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
      ${p.problem || p.solution ? `<details${p.caseBtn ? ' class="case-btn"' : ''}><summary>Case Study</summary>
        ${p.problem ? `<h4>Problem that arose</h4><p>${esc(p.problem)}</p>` : ''}
        ${p.solution ? `<h4>Solution I made</h4><p>${esc(p.solution)}</p>` : ''}
      </details>` : ''}
      <div class="actions">
        ${p.caseBtn ? `<button type="button" class="btn ghost" data-case aria-expanded="false">View Case Study</button>` : ''}
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
/* "View Case Study" button: opens/closes that card's Case Study */
$('#grid').addEventListener('click', (e) => {
  const b = e.target.closest('[data-case]');
  if (!b) return;
  const d = b.closest('.card').querySelector('details');
  d.open = !d.open;
  b.textContent = d.open ? 'Hide Case Study' : 'View Case Study';
  b.setAttribute('aria-expanded', d.open);
});

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
