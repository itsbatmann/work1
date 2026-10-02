import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'

// Little hand-drawn icons that sit in the middle of a divider (all centred on 0,0).
const icons = {
  slice: <>
    <path d="M-16 -14Q0 -22 16 -14L0 19Z" />
    <circle cx="-4" cy="-5" r="3.2" /><circle cx="5" cy="1" r="2.6" /><circle cx="-1" cy="9" r="1.8" />
  </>,
  cup: <>
    <path d="M-14 -4H10V6Q10 16 -2 16Q-14 16 -14 6Z" />
    <path d="M10 -1H14Q19 -1 19 4Q19 9 12 9" />
    <path d="M-8 -9Q-5 -13 -8 -17" /><path d="M0 -9Q3 -13 0 -17" />
  </>,
  fork: <>
    <path d="M-17 -17V-3M-11 -17V-3M-5 -17V-3" /><path d="M-17 -3Q-11 5 -5 -3" /><path d="M-11 3V18" />
    <path d="M10 -17Q20 -7 10 5V18" />
  </>,
  wine: <>
    <path d="M-10 -17H10Q11 3 0 5Q-11 3 -10 -17Z" /><path d="M0 5V17M-9 17H9" /><path d="M-8 -9H8" />
  </>,
  heart: <>
    <path d="M0 15C-22 -2 -10 -19 0 -8C10 -19 22 -2 0 15Z" />
  </>,
}

// A single hand-drawn icon that draws itself when scrolled into view.
export function DrawIcon({ name = 'slice', className = '' }) {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.fromTo(gsap.utils.selector(ref)('path, circle'), { drawSVG: '0%' }, {
      drawSVG: '100%', duration: 1.4, ease: 'power2.inOut', stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    })
  }, { scope: ref })
  return (
    <svg ref={ref} className={className} viewBox="-24 -24 48 48" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

export default function Divider({ icon = 'slice' }) {
  const ref = useRef(null)

  useGSAP(() => {
    const q = gsap.utils.selector(ref)
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 88%' } })
    tl.fromTo(q('.dv-line'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, ease: 'power2.inOut' })
      .fromTo(q('.dv-icon path, .dv-icon circle'), { drawSVG: '0%' },
        { drawSVG: '100%', duration: 1.1, ease: 'power2.out', stagger: 0.09 }, 0.35)
      .from(q('.dv-icon'), { scale: 0.3, rotate: -25, svgOrigin: '400 30', duration: 1, ease: 'back.out(2.2)' }, 0.35)
      .from(q('.dv-dot'), { scale: 0, svgOrigin: '400 30', duration: 0.6, stagger: 0.1, ease: 'back.out(3)' }, 1.1)
  }, { scope: ref })

  return (
    <div className="divider" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 800 60" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path className="dv-line" d="M368 30Q300 20 236 30T104 30T0 30" />
        <path className="dv-line" d="M432 30Q500 40 564 30T696 30T800 30" />
        <circle className="dv-dot" cx="358" cy="30" r="2" />
        <circle className="dv-dot" cx="442" cy="30" r="2" />
        <g className="dv-icon" transform="translate(400 30) scale(1.6)">{icons[icon]}</g>
      </svg>
    </div>
  )
}
