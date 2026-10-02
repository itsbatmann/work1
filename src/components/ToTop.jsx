import { useRef } from 'react'
import { gsap, ScrollTrigger, smooth, useGSAP } from '../lib/gsap.js'

// Back-to-top button whose ring draws itself as you read down the page.
export default function ToTop() {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.set(ref.current, { scale: 0, opacity: 0 })
    gsap.fromTo('.totop-ring', { drawSVG: '0%' }, {
      drawSVG: '100%', ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    let shown = false
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: self => {
        const show = self.scroll() > 500
        if (show === shown) return
        shown = show
        gsap.to(ref.current, {
          scale: show ? 1 : 0, opacity: show ? 1 : 0, duration: 0.6,
          ease: show ? 'back.out(1.8)' : 'power3.in',
        })
      },
    })
  }, { scope: ref })

  return (
    <button ref={ref} className="totop" aria-label="Back to top" onClick={() => smooth.lenis?.scrollTo(0, { duration: 1.8 })}>
      <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle className="totop-track" cx="28" cy="28" r="25" />
        <circle className="totop-ring" cx="28" cy="28" r="25" transform="rotate(-90 28 28)" />
        <path className="totop-arrow" d="M28 36V20M20 27l8-8 8 8" />
      </svg>
    </button>
  )
}
