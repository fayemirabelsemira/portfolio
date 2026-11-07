// Edit everything here. Items marked TODO are still placeholders.

// Prefixes a public-folder path with the site's base URL.
// Locally this is "/", on GitHub Pages it becomes "/portfolio/".
// Always pass paths WITHOUT a leading slash: asset('logos/html.png')
export const asset = (p) => import.meta.env.BASE_URL + p

export const profile = {
  name: 'Faye Semira',
  role: 'Web Developer',
  intro: 'Information Technology student at De La Salle Lipa, with cloud computing as my elective. I build clean, responsive websites with careful motion and clear layouts.',
  about: 'I build full websites from the interface to the database and deploy them online, using Supabase for data and Cloudflare for hosting. I care about layouts that are clear, fast and easy to use on any screen.',
  education: [
    { label: 'School', value: 'De La Salle Lipa' },
    { label: 'Course', value: 'Information Technology' },
    { label: 'Elective', value: 'Cloud Computing' },
  ],
  email: 'fayesemira21@gmail.com',
  formKey: '06541dda-2895-4728-aaab-1c81eafa5afa', // free key from web3forms.com (see steps)
  linkedin: 'https://www.linkedin.com/in/faye-semira/',
  github: 'https://github.com/fayemirabelsemira',
}

export const projects = [
  { title: 'Jollibee Integrated Business Information System',
    text: 'An online ordering website paired with an operations dashboard for managing inventory, sales, suppliers, employees, payroll, and accounting. Built with HTML, CSS, JavaScript, and PHP, and deployed on InfinityFree.',
    video: asset('videos/jollibee.mp4'), poster: asset('videos/jollibee.jpg'),
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'InfinityFree'],
    live: 'https://jollibeewebsite.infinityfreeapp.com/', repo: 'https://github.com/fayemirabelsemira/jollibee_redesign' },
  { title: "Sol's Collection",
    text: 'An online reading platform with a chapter reader, comments, bookmarks, and a writer studio. Built with HTML, CSS, JavaScript, Supabase, and Cloudflare.',
    video: asset('videos/sols.mp4'), poster: asset('videos/sols.jpg'),
    tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Cloudflare'],
    live: 'https://sol.ladyysol.workers.dev/', repo: 'https://github.com/fayemirabelsemira/sols-collection' },
  { title: 'KnowMe',
    text: 'A study tool that turns notes into flashcards. Paste notes, generate cards, quiz yourself, and track progress. Built with HTML, CSS, JavaScript, and Cloudflare.',
    video: asset('videos/knowme.mp4'), poster: asset('videos/knowme.jpg'),
    tech: ['HTML', 'CSS', 'JavaScript', 'Cloudflare'],
    live: '#', repo: '#' },
]

export const certificates = [
  { title: 'Web Design and Web Development', text: 'LinkedIn Learning certificate.', // TODO: add completion date if you want it shown
    link: 'https://www.linkedin.com/learning/certificates/31bd9ead9d495f6e69c978788d78a7710006c57eb9469d25b1577c914602f0b3' },
]

export const stack = [
  { name: 'HTML', logo: asset('logos/html.png') },
  { name: 'CSS', logo: asset('logos/css.png') },
  { name: 'JavaScript', logo: asset('logos/javascript.png') },
  { name: 'React', logo: asset('logos/react.png') },
  { name: 'GSAP', logo: asset('logos/gsap.png'), knockout: true },
  { name: 'Supabase', logo: asset('logos/supabase.png') },
  { name: 'Git', logo: asset('logos/git.png') },
  { name: 'GitHub', logo: asset('logos/github.png'), invert: true },
  { name: 'VS Code', logo: asset('logos/vscode.png') },
  { name: 'Cloudflare', logo: asset('logos/cloudflare.png') },
]

// Logos used only in a project's "Tech stack used" list (not shown in the hero or skills grid).
export const extraTech = [
  { name: 'PHP', logo: asset('logos/php.png') },
  { name: 'InfinityFree', logo: asset('logos/infinityfree.png') },
]

export const softSkills = ['Problem solving', 'Attention to detail', 'Communication', 'Teamwork', 'Time management', 'Quick learner', 'Creativity']