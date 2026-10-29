// Edit everything here. Items marked TODO are still placeholders.
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
  email: 'fayemirabelsemira14@gmail.com',
  linkedin: 'https://www.linkedin.com/in/faye-semira/',
  github: 'https://github.com/fayemirabelsemira',
}

export const projects = [
  { title: 'Jollibee Integrated Business Information System',
    text: 'An online ordering website paired with an operations dashboard for managing inventory, sales, suppliers, employees, payroll, and accounting. Built with HTML, CSS, JavaScript, and Supabase, and deployed on Cloudflare Pages.',
    video: '/videos/jollibee.mp4', poster: '/videos/jollibee.jpg',
    tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Cloudflare'],
    live: 'https://jollibeewebsite.pages.dev/', repo: 'https://github.com/fayemirabelsemira/jollibee_redesign' },
  { title: "Sol's Collection",
    text: 'An online reading platform with a chapter reader, comments, bookmarks, and a writer studio. Built with HTML, CSS, JavaScript, Supabase, and Cloudflare.',
    video: '/videos/sols.mp4', poster: '/videos/sols.jpg',
    tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Cloudflare'],
    live: 'https://sol.ladyysol.workers.dev/', repo: 'https://github.com/fayemirabelsemira/sols-collection' },
  { title: 'KnowMe',
    text: 'A study tool that turns notes into flashcards. Paste notes, generate cards, quiz yourself, and track progress. Built with HTML, CSS, JavaScript, and Cloudflare.',
    video: '/videos/knowme.mp4', poster: '/videos/knowme.jpg',
    tech: ['HTML', 'CSS', 'JavaScript', 'Cloudflare'],
    live: '#', repo: '#' },
]

export const certificates = [
  { title: 'Web Design and Web Development', text: 'LinkedIn Learning certificate.', // TODO: add completion date if you want it shown
    link: 'https://www.linkedin.com/learning/certificates/31bd9ead9d495f6e69c978788d78a7710006c57eb9469d25b1577c914602f0b3' },
]

export const stack = [
  { name: 'HTML', logo: '/logos/html.png' },
  { name: 'CSS', logo: '/logos/css.png' },
  { name: 'JavaScript', logo: '/logos/javascript.png' },
  { name: 'React', logo: '/logos/react.png' },
  { name: 'GSAP', logo: '/logos/gsap.png', knockout: true },
  { name: 'Supabase', logo: '/logos/supabase.png' },
  { name: 'Git', logo: '/logos/git.png' },
  { name: 'GitHub', logo: '/logos/github.png', invert: true },
  { name: 'VS Code', logo: '/logos/vscode.png' },
  { name: 'Cloudflare', logo: '/logos/cloudflare.png' },
]

export const softSkills = ['Problem solving', 'Attention to detail', 'Communication', 'Teamwork', 'Time management', 'Quick learner', 'Creativity']