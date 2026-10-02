import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'
import Photo from './Photo.jsx'
import Chars from './Chars.jsx'

const STAR = 'M12 1C12 9 15 12 23 12 15 12 12 15 12 23 12 15 9 12 1 12 9 12 12 9 12 1Z'

export default function Hero() {
  const ref = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.fromTo('.hero-img', { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', clearProps: 'clipPath' })
      .fromTo('.hero-img img', { scale: 1.25 }, { scale: 1, duration: 2.2 }, 0)
      .from('.hero .script', { y: 30, opacity: 0, duration: 0.8 }, 0.5)
      .fromTo('.hero .char', { yPercent: 125 }, { yPercent: 0, duration: 1.1, stagger: 0.04 }, 0.6)
      .from('.open-sign', { scale: 0, rotate: -70, duration: 1, ease: 'back.out(1.7)' }, 1.4)
      .fromTo('.scribble path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, ease: 'power2.inOut' }, 1.5)
      .fromTo('.doodle path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, ease: 'power2.inOut', stagger: 0.25 }, 1.6)
      .fromTo('.stamp-ring, .stamp-star', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.6, ease: 'power2.inOut', stagger: 0.2 }, 1.7)
      .from('.stamp', { scale: 0.4, rotate: -40, opacity: 0, duration: 1.2, ease: 'back.out(1.8)' }, 1.7)
      .from('.scroll-cue', { opacity: 0, y: 20, duration: 1 }, 2.2)
      .add(() => {
        gsap.to('.doodle', { y: -14, rotate: 14, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.6 })
        gsap.fromTo('.scroll-cue i', { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 1.3, repeat: -1, repeatDelay: 0.4, ease: 'power2.inOut' })
        gsap.to('.stamp-text', { rotation: 360, svgOrigin: '60 60', duration: 22, repeat: -1, ease: 'none' })
        gsap.to('.open-sign', { y: -10, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      })

    // scroll parallax
    gsap.to('.hero-img img', {
      yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to('.hero-text', {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    })

    // mouse parallax on the hero image and doodles
    if (window.matchMedia('(pointer: fine)').matches) {
      const ix = gsap.quickTo('.hero-img', 'x', { duration: 1.2, ease: 'power3' })
      const iy = gsap.quickTo('.hero-img', 'y', { duration: 1.2, ease: 'power3' })
      const move = e => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        ix(nx * -22); iy(ny * -22)
      }
      window.addEventListener('mousemove', move)
      return () => window.removeEventListener('mousemove', move)
    }
  }, { scope: ref })

  return (
    <section className="hero" ref={ref}>
      <Photo className="hero-img" reveal={false} src="/images/main/hero.png" alt="Hands sharing pizza at the table" />
      <div className="hero-text">
        <span className="script">baeCafe</span>
        <h1>
          <Chars auto={false} className="red" text="All" /> <Chars auto={false} className="teal" text="you Need is" />
          <br />
          <Chars auto={false} className="red it" text="Love and" />
          <br />
          <Chars auto={false} className="red it" text="food" />
        </h1>
        <svg className="scribble" viewBox="0 0 400 26" fill="none" strokeLinecap="round" aria-hidden="true">
          <path d="M4 18C70 4 130 24 200 11S330 7 396 15" />
        </svg>
        <svg className="doodle d1" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={STAR} /></svg>
        <svg className="doodle d2" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={STAR} /></svg>
        <img className="open-sign" src="/images/main/open-sign.png" alt="Yes! We're open" />
      </div>
      <div className="stamp" aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none" strokeLinecap="round">
          <circle className="stamp-ring" cx="60" cy="60" r="57" />
          <circle className="stamp-ring" cx="60" cy="60" r="36" />
          <defs><path id="stampc" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" /></defs>
          <g className="stamp-text"><text><textPath href="#stampc">BAECAFE · FRESH DAILY · SINCE 1997 ·</textPath></text></g>
          <path className="stamp-star" d="M60 45C60 55 65 60 75 60 65 60 60 65 60 75 60 65 55 60 45 60 55 60 60 55 60 45Z" />
        </svg>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>Scroll</span><i /></div>
    </section>
  )
}
