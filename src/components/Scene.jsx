import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'

const STAR = 'M0-9C0-3 3 0 9 0 3 0 0 3 0 9 0 3-3 0-9 0-3 0 0-3 0-9Z'

// A large hand-drawn illustration that draws itself as you scroll (scrubbed DrawSVG).
export function SliceScene({ children }) {
  const ref = useRef(null)

  useGSAP(() => {
    const q = gsap.utils.selector(ref)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'center 45%', scrub: 1 },
    })
    tl.fromTo(q('.wash'), { fillOpacity: 0 }, { fillOpacity: 0.32, duration: 1 }, 2.6)
      .fromTo(q('.ink'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.4, ease: 'none', stagger: 0.25 }, 0)
      .fromTo(q('.pep'), { scale: 0, svgOrigin: undefined, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.2 }, 1.8)
      .fromTo(q('.steam'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, ease: 'none', stagger: 0.3 }, 2)
      .fromTo(q('.spark path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, stagger: 0.3 }, 3)
    gsap.to(q('.spark'), { rotate: 25, transformOrigin: '50% 50%', duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.5 })
    gsap.to(q('.steam'), { y: -8, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.4 })
  }, { scope: ref })

  return (
    <section className="scene" ref={ref}>
      <svg className="scene-art" viewBox="0 -24 400 404" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="wash" d="M64 92Q200 30 336 92L212 346Q200 362 188 346Z" fill="#d9a441" fillOpacity="0" stroke="none" />
        <path className="ink" d="M64 92Q200 30 336 92L212 346Q200 362 188 346Z" />
        <path className="ink" d="M72 102Q200 44 328 102" />
        <path className="ink" d="M80 122Q200 66 320 122" />
        <path className="ink" d="M106 142Q110 170 122 174Q134 176 136 152" />
        <path className="ink" d="M250 140Q254 178 268 182Q282 184 284 148" />
        <path className="ink" d="M188 150Q204 126 226 140Q214 166 188 150Z" />
        <path className="ink" d="M194 150Q208 144 222 140" />
        <circle className="ink pep" cx="152" cy="176" r="21" />
        <circle className="ink pep" cx="238" cy="204" r="19" />
        <circle className="ink pep" cx="194" cy="272" r="16" />
        <circle className="ink" cx="152" cy="176" r="12" />
        <circle className="ink" cx="238" cy="204" r="11" />
        <circle className="ink" cx="194" cy="272" r="9" />
        <path className="ink" d="M150 232l4 3M236 262l3 4M170 214l3-3M222 160l3 2" />
        <path className="steam" d="M150 36Q136 22 150 8T150-18" />
        <path className="steam" d="M200 28Q186 14 200 0T200-26" />
        <path className="steam" d="M250 36Q236 22 250 8T250-18" />
        <g className="spark" transform="translate(52 300)"><path d={STAR} /></g>
        <g className="spark" transform="translate(352 60)"><path d={STAR} /></g>
      </svg>
      <div className="scene-text">{children}</div>
    </section>
  )
}

export function CupScene({ children }) {
  const ref = useRef(null)

  useGSAP(() => {
    const q = gsap.utils.selector(ref)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'center 50%', scrub: 1 },
    })
    tl.fromTo(q('.ink'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.4, ease: 'none', stagger: 0.25 }, 0)
      .fromTo(q('.heart'), { drawSVG: '0%', fillOpacity: 0 }, { drawSVG: '100%', fillOpacity: 0.9, duration: 1, ease: 'none' }, 2)
      .fromTo(q('.steam'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.6, ease: 'none', stagger: 0.3 }, 2.2)
      .fromTo(q('.spark path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, stagger: 0.3 }, 3.2)
    gsap.to(q('.steam'), { y: -10, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.4 })
    gsap.to(q('.spark'), { rotate: 25, transformOrigin: '50% 50%', duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.5 })
  }, { scope: ref })

  return (
    <section className="scene scene-cup" ref={ref}>
      <div className="scene-text">{children}</div>
      <svg className="scene-art" viewBox="0 -20 440 340" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="ink" d="M60 250Q220 300 380 250" />
        <path className="ink" d="M86 264Q220 306 354 264" />
        <path className="ink" d="M110 110H330V176Q330 256 220 256Q110 256 110 176Z" />
        <path className="ink" d="M110 110Q220 136 330 110" />
        <path className="ink" d="M330 132H356Q392 132 392 168Q392 204 350 204H326" />
        <path className="heart" d="M220 196C198 170 164 198 220 238C276 198 242 170 220 196Z" fill="#b3321f" fillOpacity="0" />
        <path className="steam" d="M170 92Q150 68 170 46Q190 24 170 2" />
        <path className="steam" d="M220 96Q200 72 220 48Q240 24 220 0" />
        <path className="steam" d="M270 92Q250 68 270 46Q290 24 270 2" />
        <g className="spark" transform="translate(54 90)"><path d={STAR} /></g>
        <g className="spark" transform="translate(410 70)"><path d={STAR} /></g>
      </svg>
    </section>
  )
}
