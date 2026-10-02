import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap.js'

const links = [
  { href: '#/menu', label: 'Menu', key: 'menu' },
  { href: '#/about', label: 'About', key: 'about' },
]

function NavLink({ href, label, active }) {
  const ref = useRef(null)

  // gentle magnetic pull toward the cursor
  useGSAP(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.45)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.45)' })
    const move = e => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
      yTo((e.clientY - (r.top + r.height / 2)) * 0.25)
    }
    const leave = () => { xTo(0); yTo(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, { scope: ref })

  return (
    <a ref={ref} href={href} className={`nav-link${active ? ' active' : ''}`} aria-current={active ? 'page' : undefined}>
      <span className="roll"><span>{label}</span><span aria-hidden="true">{label}</span></span>
    </a>
  )
}

// Floating glass pill: transparent at the top of the page, condenses into a pill on scroll,
// hides on scroll down, and a liquid highlight glides between links.
export default function Header({ route, loaded }) {
  const ref = useRef(null)

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: self => {
        ref.current.classList.toggle('solid', self.scroll() > 60)
        const hide = self.direction === 1 && self.scroll() > 320
        gsap.to(ref.current, { yPercent: hide ? -180 : 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
      },
    })
    gsap.to('.nav-progress', {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
    })
  }, { scope: ref })

  // liquid highlight that follows the hovered link and rests on the active one
  useGSAP(() => {
    const nav = ref.current
    const blob = nav.querySelector('.nav-blob')
    const items = gsap.utils.toArray('.nav-link', nav)
    const place = (el, animate = true) => {
      if (!el) { gsap.to(blob, { opacity: 0, duration: 0.3 }); return }
      gsap.to(blob, {
        x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight,
        opacity: 1, duration: animate ? 0.7 : 0, ease: 'expo.out', overwrite: 'auto',
      })
    }
    const active = () => nav.querySelector('.nav-link.active')
    place(active(), false)
    if (!active()) gsap.set(blob, { opacity: 0 })
    const enters = items.map(el => { const f = () => place(el); el.addEventListener('mouseenter', f); return [el, f] })
    const leave = () => place(active())
    nav.addEventListener('mouseleave', leave)
    return () => {
      enters.forEach(([el, f]) => el.removeEventListener('mouseenter', f))
      nav.removeEventListener('mouseleave', leave)
    }
  }, { scope: ref, dependencies: [route], revertOnUpdate: true })

  // entrance once the preloader is gone
  useGSAP(() => {
    if (!loaded) return
    gsap.from(ref.current, { y: -80, opacity: 0, duration: 1.3, ease: 'expo.out', delay: 0.2 })
  }, { scope: ref, dependencies: [loaded] })

  return (
    <>
      <header className="nav" ref={ref}>
        <span className="nav-blob" />
        <NavLink href={links[0].href} label={links[0].label} active={route === links[0].key} />
        <a href="#/" className="nav-logo" aria-label="baeCafe home">baeCafe</a>
        <NavLink href={links[1].href} label={links[1].label} active={route === links[1].key} />
        <span className="nav-progress" />
      </header>
      <div className="nav-spacer" />
    </>
  )
}
