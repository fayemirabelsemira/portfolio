/* Edit your content here */
const projects = [
  {
      title: 'Jollibee Integrated Business Information System',
          cat: 'Full-Stack', year: 2026,
          text: 'An online ordering website paired with an operations dashboard.',
          problem: 'Building a single system that handled both customer-facing ordering and a complete back-office (inventory, suppliers, sales, employees, payroll, and accounting) while keeping data consistent across modules was the hardest part. Early versions had race conditions when stock was updated from orders and the ops dashboard at the same time.',
          solution: 'Designed a clear data model with transaction-style updates and role-based views so the ordering side and the operations dashboard always stayed in sync. Separated the customer site from the admin/ops interface and added proper validation and status flows for every cycle (expenditure, revenue, HR, accounting).',
          stack: 'HTML, CSS, JavaScript, PHP',
          image: 'images/jollibee.jpg',
          live: 'https://jollibeewebsite.infinityfreeapp.com/',
          repo: 'https://github.com/fayemirabelsemira/jollibee_redesign',
        },
        {
          title: "Sol's Collection",
          cat: 'Full-Stack', year: 2026,
          text: 'An online reading platform with a chapter reader and a writer studio.',
          problem: 'Creating a smooth chapter-reading experience (progress tracking, bookmarks, comments) while also giving writers a usable studio to manage books and chapters, all on a serverless + Supabase stack, led to performance and auth headaches—especially with long chapter content and concurrent readers.',
          solution: 'Used Supabase for auth, real-time comments, and progress storage, kept the chapter reader lightweight with client-side state, and built a simple writer studio that only loads the data a writer actually needs. Deployed on Cloudflare Workers for fast global delivery.',
          stack: 'HTML, CSS, JavaScript, Supabase, Cloudflare',
          image: 'images/sols.jpg',
          live: 'https://sol.ladyysol.workers.dev/',
          repo: 'https://github.com/fayemirabelsemira/sols-collection',
        },
  {
      title: 'Fabulous Bakery',
      cat: 'Frontend', year: 2026,
      text: 'A website for a homemade cookie and crinkle shop in Tagaytay, with a menu and ordering through Messenger or text.',
      problem: 'The real bakery had no polished online presence and relied on Facebook posts and Messenger for orders. Translating their warm, homemade feel into a modern React site while keeping the ordering flow extremely simple (no cart, just direct contact) was the main design challenge.',
      solution: 'Built a clean React + Vite site focused on visuals and storytelling. Menu, photos, and reviews live in simple data arrays so the owner can update them easily. “Order” buttons open Messenger or SMS with a pre-filled message so customers can place orders in one tap without any complicated checkout.',
      stack: 'React, Vercel',
      image: 'images/fab-bakery.jpg',
      live: 'https://fab-baker-boy-react.vercel.app/',
      repo: 'https://github.com/fayemirabelsemira/fab-baker-boy-react',
  },
  {
    title: 'Rosario Poultry Farm',
    cat: 'Frontend', year: 2026,
    text: 'A clean product and ordering site for a local egg supplier in Rosario, Batangas.',
    problem: 'The farm needed a professional online presence that clearly showed egg sizes, pricing, and delivery coverage, while making it effortless for customers to order via SMS or WhatsApp.',
    solution: 'Designed a simple, mobile-friendly landing page with clear product cards and one-tap “Order via SMS/WhatsApp” buttons that pre-fill the message. Focused on trust signals (location, delivery area, fresh-from-farm messaging) so first-time buyers feel confident.',
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
    solution: 'Nexus Analytics lets business owners easily upload, clean, analyze, visualize and export their data without requiring an account, while offering secure cloud storage for registered users.',
    stack: 'React, TypeScript, Tailwind CSS, Supabase',
    image: 'images/nexus-analytics.jpg',
    live: 'https://poultry-business.vercel.app/', // NOTE: this is the Rosario Poultry Farm link; replace with the Nexus Analytics URL once it is deployed
    repo: 'https://github.com/fayemirabelsemira/nexus-analytics',
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
