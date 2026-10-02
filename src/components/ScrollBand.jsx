import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'

// Big typographic band whose rows slide in opposite directions as you scroll.
export default function ScrollBand({ rows }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.utils.toArray('.band-row', ref.current).forEach((row, i) => {
      const dir = i % 2 === 0 ? 1 : -1
      gsap.fromTo(row, { xPercent: dir > 0 ? -28 : 0 }, {
        xPercent: dir > 0 ? 0 : -28, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })
  }, { scope: ref })

  return (
    <section className="band" ref={ref} aria-hidden="true">
      {rows.map((words, i) => (
        <div className={`band-row${i % 2 ? ' alt' : ''}`} key={i}>
          {Array.from({ length: 3 }).flatMap((_, k) =>
            words.map((w, j) => <span key={`${k}-${j}`}>{w}<b>✺</b></span>))}
        </div>
      ))}
    </section>
  )
}
