import { cloneElement, useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { profile, projects, certificates, stack, softSkills } from './data'

gsap.registerPlugin(ScrollTrigger)
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

const ICONS = {
  home: <><path d="M4 11 12 4l8 7" /><path d="M6 10v10h12V10" /></>,
  about: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></>,
  portfolio: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></>,
  contact: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" /></svg>
)

/* ---------- Welcome screen: lines rise in, a bar fills, then the screen lifts away ---------- */
function Welcome({ onReveal, onDone }) {
  const root = useRef(null), tl = useRef(null)
  useEffect(() => {
    const q = gsap.utils.selector(root)
    const t = gsap.timeline({ onComplete: onDone })
    if (reduce()) {
      t.call(onReveal, null, 0.9).to(root.current, { opacity: 0, duration: 0.4 }, 0.9)
    } else {
      t.from(q('.w-line > span'), { yPercent: 115, duration: 1, stagger: 0.14, ease: 'power4.out' })
        .from(q('.w-bar'), { scaleX: 0, duration: 1.1, ease: 'power2.inOut' }, 0.3)
        .addLabel('out', '+=0.35')
        .call(onReveal, null, 'out+=0.3')
        .to(root.current, { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, 'out')
    }
    tl.current = t
    return () => t.kill()
  }, [])
  return (
    <div className="welcome" ref={root} role="status">
      <div>
        <p className="w-title" aria-label="Welcome to my Portfolio Website">
          <span className="w-line" aria-hidden="true"><span>Welcome to</span></span>
          <span className="w-line" aria-hidden="true"><span>my Portfolio</span></span>
          <span className="w-line" aria-hidden="true"><span>Website</span></span>
        </p>
        <div className="w-bar" />
      </div>
      <button className="w-skip" onClick={() => tl.current?.timeScale(4)}>Skip</button>
    </div>
  )
}

/* ---------- Pulls an element slightly toward the cursor ---------- */
function Magnetic({ children }) {
  const r = useRef(null)
  useEffect(() => {
    const el = r.current
    if (!el || reduce() || !finePointer()) return
    const xT = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
    const yT = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    const mv = (e) => { const b = el.getBoundingClientRect(); xT((e.clientX - b.left - b.width / 2) * 0.3); yT((e.clientY - b.top - b.height / 2) * 0.3) }
    const lv = () => { xT(0); yT(0) }
    el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv)
    return () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv) }
  }, [])
  return cloneElement(children, { ref: r })
}

/* ---------- ID card on a lanyard: drag it, it swings back ---------- */
function Lanyard() {
  const zone = useRef(null), strap = useRef(null), hang = useRef(null)
  useEffect(() => {
    const z = zone.current, s = strap.current, h = hang.current
    const STRAP = () => parseFloat(getComputedStyle(z).getPropertyValue('--strap')) || 170
    let released = reduce()
    // Starts tucked up under the welcome screen, then drops in and settles when the welcome lifts
    const st = { x: 0, y: released ? 0 : -STRAP() + 24, vx: 0, vy: 0 }
    const tgt = { x: 0, y: 0 }
    let dragging = false, p0 = { x: 0, y: 0 }, s0 = { x: 0, y: 0 }
    gsap.set([s, h], { transformOrigin: '50% 0' })
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)
    const tick = (t) => {
      let tx = 0, ty = 0
      if (dragging) { tx = tgt.x; ty = tgt.y }
      else if (released) { tx = reduce() ? 0 : Math.sin(t * 0.9) * 8 }
      else ty = -STRAP() + 24
      const k = dragging ? 0.22 : 0.07
      st.vx = (st.vx + (tx - st.x) * k) * (dragging ? 0.62 : 0.9); st.x += st.vx
      st.vy = (st.vy + (ty - st.y) * k) * (dragging ? 0.62 : 0.93); st.y += st.vy
      const len = Math.max(STRAP() + st.y, 12)
      const ang = (Math.atan2(st.x, len) * 180) / Math.PI
      gsap.set(s, { height: Math.hypot(st.x, len), rotation: -ang })
      gsap.set(h, { x: st.x, y: st.y, rotation: -ang - st.vx * 0.8 })
    }
    gsap.ticker.add(tick)
    const release = () => { released = true }
    window.addEventListener('welcome-done', release)
    const down = (e) => { if (!released) return; dragging = true; p0 = { x: e.clientX, y: e.clientY }; s0 = { x: st.x, y: st.y }; tgt.x = st.x; tgt.y = st.y; h.setPointerCapture(e.pointerId) }
    const move = (e) => {
      if (!dragging) return
      // keep the whole card inside the window so it is never cut off
      const zr = z.getBoundingClientRect()
      const cx = zr.left + zr.width / 2, w = h.offsetWidth, ht = h.offsetHeight, top = zr.top + STRAP()
      tgt.x = clamp(s0.x + e.clientX - p0.x, -(cx - w / 2 - 8), window.innerWidth - cx - w / 2 - 8)
      tgt.y = clamp(s0.y + e.clientY - p0.y, 8 - top, window.innerHeight - 8 - top - ht)
    }
    const up = () => { dragging = false }
    h.addEventListener('pointerdown', down); h.addEventListener('pointermove', move)
    h.addEventListener('pointerup', up); h.addEventListener('pointercancel', up)
    return () => { gsap.ticker.remove(tick); window.removeEventListener('welcome-done', release); h.removeEventListener('pointerdown', down); h.removeEventListener('pointermove', move); h.removeEventListener('pointerup', up); h.removeEventListener('pointercancel', up) }
  }, [])
  return (
    <div className="lanyard" ref={zone}>
      <div className="strap" ref={strap} />
      <div className="spacer" />
      <div className="hang" ref={hang} aria-label="ID card of Faye Semira. Drag it in any direction.">
        <div className="clip" />
        <div className="card">
          <img src="/faye.png" alt="Portrait of Faye Semira" draggable="false" />
          <div className="card-meta"><strong>{profile.name}</strong><span>{profile.role}</span></div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Background: the perspective-grid image, fixed behind everything ---------- */
function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-vignette" />
    </div>
  )
}

/* ---------- A tech logo. Logos flagged `knockout` (GSAP) have their black tile turned transparent ---------- */
function Logo({ s }) {
  const [src, setSrc] = useState(s.knockout ? null : s.logo)
  useEffect(() => {
    if (!s.knockout) return
    let off = false
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.naturalWidth; c.height = img.naturalHeight
      const x = c.getContext('2d')
      x.drawImage(img, 0, 0)
      const d = x.getImageData(0, 0, c.width, c.height), p = d.data
      for (let i = 0; i < p.length; i += 4) {
        const m = Math.max(p[i], p[i + 1], p[i + 2])
        if (m >= 110) continue
        const k = Math.min(Math.max((m - 18) / 92, 0), 1), f = m > 0 ? 110 / m : 1
        p[i] = Math.min(255, p[i] * f); p[i + 1] = Math.min(255, p[i + 1] * f); p[i + 2] = Math.min(255, p[i + 2] * f)
        p[i + 3] = p[i + 3] * k
      }
      x.putImageData(d, 0, 0)
      if (!off) setSrc(c.toDataURL())
    }
    img.src = s.logo
    return () => { off = true }
  }, [s.logo, s.knockout])
  return src ? <img src={src} className={s.invert ? 'invert' : undefined} alt="" /> : null
}

/* ---------- Tech stack piled up in the intro: a cluttered, overlapping cluster. Each logo drifts, pops when touched,
   swells toward the cursor, and gets shoved away when the ID card is dragged into it ---------- */
const PILE = {
  HTML: [20, 28, 1.05, -10], CSS: [40, 18, 1, 8], JavaScript: [61, 30, 1.1, -6], React: [82, 20, 1, 12],
  GSAP: [12, 62, 1, 6], Supabase: [33, 50, 0.9, -14], Git: [55, 60, 1.05, 10], GitHub: [76, 52, 1.1, -8],
  'VS Code': [42, 83, 1, 14], Cloudflare: [80, 84, 1.15, -4],
}

function FloatingStack() {
  const root = useRef(null)
  useEffect(() => {
    if (reduce()) return
    const items = [...root.current.querySelectorAll('.fs-item')]
    const cleanups = []
    gsap.set(items, { opacity: 0, scale: 0.5 })
    const play = () => gsap.to(items, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.06, ease: 'back.out(1.7)', delay: 0.5 })
    window.addEventListener('welcome-done', play, { once: true })
    cleanups.push(() => window.removeEventListener('welcome-done', play))
    items.forEach((el, i) => {
      const inner = el.querySelector('.fs-inner'), chip = el.querySelector('.fs-chip')
      const bob = gsap.to(inner, { y: (i % 2 ? -1 : 1) * (7 + (i % 3) * 3), x: ((i % 3) - 1) * 4, rotation: (i % 2 ? 1 : -1) * 4, duration: 2.2 + (i % 4) * 0.45, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: -i * 0.4 })
      const over = () => gsap.to(chip, { scale: 1.3, rotation: (i % 2 ? 1 : -1) * 18, y: -8, duration: 0.5, ease: 'back.out(3)', overwrite: true })
      const out = () => gsap.to(chip, { scale: 1, rotation: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.5)', overwrite: true })
      chip.addEventListener('pointerenter', over); chip.addEventListener('pointerleave', out)
      cleanups.push(() => { bob.kill(); chip.removeEventListener('pointerenter', over); chip.removeEventListener('pointerleave', out) })
    })
    // every frame: cursor makes logos swell and lean in; the ID card shoves them out of its way
    const qx = items.map((el) => gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' }))
    const qy = items.map((el) => gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' }))
    const qs = items.map((el) => gsap.quickTo(el.querySelector('.fs-inner'), 'scale', { duration: 0.35, ease: 'power3' }))
    const cur = { x: 0, y: 0, on: false }
    const mv = (e) => { cur.x = e.clientX; cur.y = e.clientY; cur.on = e.pointerType !== 'touch' }
    const lv = () => { cur.on = false }
    if (finePointer()) { window.addEventListener('pointermove', mv); document.documentElement.addEventListener('pointerleave', lv) }
    const card = document.querySelector('.hang')
    const PUSH = 90
    const tick = () => {
      const cr = card ? card.getBoundingClientRect() : null
      items.forEach((el, i) => {
        const b = el.getBoundingClientRect()
        const cx = b.left + b.width / 2 - gsap.getProperty(el, 'x'), cy = b.top + b.height / 2 - gsap.getProperty(el, 'y')
        let tx = 0, ty = 0, sc = 1
        if (cur.on) {
          const dx = cur.x - cx, dy = cur.y - cy, d = Math.hypot(dx, dy)
          sc = 1 + 0.55 * Math.exp(-(d * d) / (2 * 80 * 80))
          if (d < 170 && d > 0) { const f = (1 - d / 170) * 14; tx += dx / d * f; ty += dy / d * f }
        }
        if (cr) {
          const nx = Math.max(cr.left, Math.min(cx, cr.right)), ny = Math.max(cr.top, Math.min(cy, cr.bottom))
          let dx = cx - nx, dy = cy - ny, d = Math.hypot(dx, dy)
          if (d < PUSH) {
            if (d === 0) { dx = cx - (cr.left + cr.right) / 2; dy = cy - (cr.top + cr.bottom) / 2; d = Math.hypot(dx, dy) || 1 }
            const f = (1 - Math.min(d, PUSH) / PUSH) * 170 + 30
            tx += dx / d * f; ty += dy / d * f
          }
        }
        qx[i](tx); qy[i](ty); qs[i](sc)
      })
    }
    gsap.ticker.add(tick)
    cleanups.push(() => { gsap.ticker.remove(tick); window.removeEventListener('pointermove', mv); document.documentElement.removeEventListener('pointerleave', lv) })
    return () => cleanups.forEach((c) => c())
  }, [])
  return (
    <ul className="float-stack" ref={root} aria-label="Tech stack">
      {stack.map((s) => {
        const [x, y, sz, r] = PILE[s.name] || [50, 50, 1, 0]
        return (
          <li className="fs-item" key={s.name} style={{ left: x + '%', top: y + '%', '--s': sz, '--r': r + 'deg' }}>
            <div className="fs-inner">
              <span className="fs-chip" tabIndex={0}><Logo s={s} /></span>
              <span className="fs-label">{s.name}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- React Bits style: split text. Letters rise out of a mask.
   The hero waits for the welcome screen; headings elsewhere play once when scrolled into view ---------- */
function SplitText({ text, as: Tag = 'h2', hero = false }) {
  const root = useRef(null)
  const lines = text.split('|')
  useEffect(() => {
    if (reduce()) return
    const chars = root.current.querySelectorAll('.ch')
    gsap.set(chars, { yPercent: 115 })
    const play = () => gsap.to(chars, { yPercent: 0, duration: 0.9, stagger: 0.025, ease: 'power4.out' })
    if (hero) {
      window.addEventListener('welcome-done', play, { once: true })
      return () => window.removeEventListener('welcome-done', play)
    }
    const st = ScrollTrigger.create({ trigger: root.current, start: 'top 90%', once: true, onEnter: play })
    return () => st.kill()
  }, [])
  return (
    <Tag ref={root} className="split" aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span className="line" key={li} aria-hidden="true">
          {line.split(' ').map((w, wi) => (
            <span key={wi}>
              {wi > 0 && ' '}
              <span className="word">{[...w].map((c, ci) => <span className="mask" key={ci}><span className="ch">{c}</span></span>)}</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

/* ---------- React Bits style: scroll reveal. Words brighten as you read down the page ---------- */
function ScrollReveal({ text, className }) {
  const root = useRef(null)
  useEffect(() => {
    if (reduce()) return
    const words = root.current.querySelectorAll('.w')
    const tw = gsap.fromTo(words, { opacity: 0.2 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: 'top 82%', end: 'bottom 55%', scrub: true },
    })
    return () => { tw.scrollTrigger?.kill(); tw.kill() }
  }, [])
  return <p ref={root} className={className} aria-label={text}>{text.split(' ').map((w, i) => <span className="w" key={i} aria-hidden="true">{w} </span>)}</p>
}

/* ---------- React Bits style: count up ---------- */
function CountUp({ to }) {
  const el = useRef(null)
  useEffect(() => {
    if (reduce()) { el.current.textContent = to; return }
    const o = { v: 0 }
    const st = ScrollTrigger.create({
      trigger: el.current, start: 'top 92%', once: true,
      onEnter: () => gsap.to(o, { v: to, duration: 1.4, ease: 'power3.out', onUpdate: () => { el.current.textContent = Math.round(o.v) } }),
    })
    return () => st.kill()
  }, [to])
  return <span ref={el} className="num">0</span>
}

const stats = [
  { n: projects.length, label: 'Full websites built and deployed online' },
  { n: stack.length, label: 'Tools across front end, data and hosting' },
  { n: certificates.length, label: 'Certified in web design and development' },
]

/* ---------- React Bits style: spotlight + tilt card (mouse devices only) ---------- */
function SpotlightCard({ children, className }) {
  const r = useRef(null)
  useEffect(() => {
    const el = r.current
    if (!el || reduce() || !finePointer()) return
    gsap.set(el, { transformPerspective: 900 })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.45, ease: 'power3' })
    const mv = (e) => {
      const b = el.getBoundingClientRect()
      const px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5
      ry(px * 5); rx(-py * 5)
      el.style.setProperty('--mx', e.clientX - b.left + 'px'); el.style.setProperty('--my', e.clientY - b.top + 'px')
    }
    const lv = () => { rx(0); ry(0) }
    el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv)
    return () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv) }
  }, [])
  return <article ref={r} className={className}>{children}</article>
}

/* ---------- React Bits style: magnetic dock. Icons swell as the cursor nears ---------- */
function Dock({ active, go }) {
  const root = useRef(null)
  useEffect(() => {
    if (reduce() || !finePointer()) return
    const dock = root.current
    const items = [...dock.querySelectorAll('.dock-item')]
    gsap.set(items, { transformOrigin: '50% 100%' })
    const to = items.map((el) => gsap.quickTo(el, 'scale', { duration: 0.28, ease: 'power3' }))
    const mv = (e) => items.forEach((el, i) => {
      const b = el.getBoundingClientRect(), d = e.clientX - (b.left + b.width / 2)
      to[i](1 + 0.5 * Math.exp(-(d * d) / (2 * 56 * 56)))
    })
    const lv = () => to.forEach((t) => t(1))
    dock.addEventListener('pointermove', mv); dock.addEventListener('pointerleave', lv)
    return () => { dock.removeEventListener('pointermove', mv); dock.removeEventListener('pointerleave', lv) }
  }, [])
  return (
    <nav className="dock" ref={root} aria-label="Sections">
      {sections.map((s) => (
        <a key={s.id} href={'#' + s.id} onClick={go(s.id)} className={'dock-item' + (active === s.id ? ' on' : '')} aria-label={s.label} aria-current={active === s.id ? 'true' : undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[s.id]}</svg>
          <span className="dock-tip" aria-hidden="true">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}

/* ---------- Tech stack: big logo cards, no tile behind the logos ---------- */
function TechGrid() {
  const root = useRef(null)
  useEffect(() => {
    if (reduce()) return
    const t = gsap.fromTo(root.current.children, { y: 16, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
    })
    return () => { t.scrollTrigger?.kill(); t.kill() }
  }, [])
  return (
    <ul className="stack-grid" ref={root}>
      {stack.map((s) => (
        <li className="stack-card" key={s.name}>
          <span className="stack-icon"><Logo s={s} /></span>
          <span className="stack-name">{s.name}</span>
        </li>
      ))}
    </ul>
  )
}

function HoverVideo({ src, poster, label }) {
  const v = useRef(null)
  const play = () => { if (!reduce()) v.current?.play().catch(() => {}) }
  const stop = () => v.current?.pause()
  return (
    <div className="video-frame">
      <video
        ref={v}
        src={src}
        poster={poster}
        controls
        controlsList="nofullscreen nodownload noremoteplayback"
        disablePictureInPicture
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPointerEnter={play}
        onPointerLeave={stop}
        onFocus={play}
        onBlur={stop}
      />
    </div>
  )
}

function Portfolio() {
  const [tab, setTab] = useState('Projects')
  const panel = useRef(null)
  useEffect(() => {
    if (!reduce() && panel.current) gsap.fromTo(panel.current.children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' })
  }, [tab])
  const isSwipe = tab === 'Projects'
  return (
    <section id="portfolio" className="work">
      <div className="wrap">
      <p className="eyebrow">Selected work</p>
      <SplitText text="Portfolio" />
      <p className="lead">Projects, certificates, and the tools I use.</p>
      <div className="tabs" role="tablist">
        {['Projects', 'Certificates', 'Tech Stack'].map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={'panel' + (isSwipe ? '' : ' grid-mode')} ref={panel}>
        {tab === 'Projects' && projects.map((p, i) => (
          <SpotlightCard className="item" key={p.title}>
            {p.video && <HoverVideo src={p.video} poster={p.poster} label={p.title + ' demo video'} />}
            <span className="idx">0{i + 1}</span>
            <h3>{p.title}</h3><p>{p.text}</p>
            <div className="links">
              {p.live && p.live !== '#' && <a href={p.live} target="_blank" rel="noreferrer">View live site <Arrow /></a>}
              {p.repo && p.repo !== '#' && <a href={p.repo} target="_blank" rel="noreferrer">View code <Arrow /></a>}
            </div>
          </SpotlightCard>
        ))}
        {tab === 'Certificates' && certificates.map((c) => (
          <SpotlightCard className="item" key={c.title}>
            <h3>{c.title}</h3><p>{c.text}</p>
            <div className="links"><a href={c.link} target="_blank" rel="noreferrer">View certificate <Arrow /></a></div>
          </SpotlightCard>
        ))}
        {tab === 'Tech Stack' && <TechGrid />}
      </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    const body = `${f.get('message')}\n\n${f.get('name')} (${f.get('email')})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio message from ' + f.get('name'))}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <section id="contact" className="sec contact">
      <p className="eyebrow">Contact</p>
      <SplitText text="Let’s talk" />
      <p className="lead">Have a project or a role in mind? Send me a message.</p>
      <form onSubmit={submit}>
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label>Message<textarea name="message" rows="5" required /></label>
        <Magnetic><button type="submit">Send message</button></Magnetic>
        {sent && <p role="status" className="note">Your email app should open with the message ready to send.</p>}
      </form>
      <p className="social"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a></p>
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState('home')
  const [welcome, setWelcome] = useState(true)

  const reveal = useCallback(() => {
    window.__lenis?.start()
    window.dispatchEvent(new Event('welcome-done'))
    if (!reduce()) gsap.to('.hero-text > :not(.split)', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.45 })
  }, [])

  useEffect(() => {
    let lenis
    if (!reduce()) {
      // Hold the hero copy back until the welcome screen lifts
      gsap.set('.hero-text > :not(.split)', { opacity: 0, y: 24 })
      // Smooth scrolling (Lenis) driven by GSAP's ticker, kept in sync with ScrollTrigger
      lenis = new Lenis({ lerp: 0.09 })
      lenis.stop()
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((t) => lenis.raf(t * 1000))
      gsap.ticker.lagSmoothing(0)
      window.__lenis = lenis
    }
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => gsap.set('.progress', { scaleX: s.progress }) })
    sections.forEach(({ id }) => ScrollTrigger.create({ trigger: '#' + id, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(id) }))
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => { lenis?.destroy(); ScrollTrigger.getAll().forEach((s) => s.kill()) }
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    const t = document.getElementById(id)
    window.__lenis ? window.__lenis.scrollTo(t, { offset: -12 }) : t.scrollIntoView()
  }

  return (
    <>
      {welcome && <Welcome onReveal={reveal} onDone={() => setWelcome(false)} />}
      <Backdrop />
      <div className="progress" aria-hidden="true" />
      <header className="top">
        <a href="#home" onClick={go('home')} className="brand">it’s faye!</a>
        <p className="pill"><i className="dot" aria-hidden="true" />Available for work</p>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-visual">
            <FloatingStack />
          </div>
          <Lanyard />
          <div className="hero-text">
            <p className="eyebrow">Hi, I’m {profile.name.split(' ')[0]}</p>
            <SplitText as="h1" hero text="Web|Developer" />
            <p className="lead">{profile.intro}</p>
            <div className="links"><Magnetic><a className="btn" href="#portfolio" onClick={go('portfolio')}>See my work</a></Magnetic><a className="text-link" href="#contact" onClick={go('contact')}>Get in touch</a></div>
          </div>
        </section>
          <section id="about" className="sec">
            <p className="eyebrow">About</p>
            <SplitText text={profile.name} />
            <ScrollReveal className="about-text" text={profile.about} />
            <dl className="edu">
              {profile.education.map((e) => (
                <div className="edu-item" key={e.label}><dt>{e.label}</dt><dd>{e.value}</dd></div>
              ))}
            </dl>
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.label}><CountUp to={s.n} /><p>{s.label}</p></div>
              ))}
            </div>
            <h3 className="group">Tech stack</h3>
            <TechGrid />
            <h3 className="group">Soft skills</h3>
            <div className="chips">{softSkills.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          </section>
          <Portfolio />
          <Contact />
          <footer>© {new Date().getFullYear()} {profile.name}</footer>
      </main>
      <Dock active={active} go={go} />
    </>
  )
}