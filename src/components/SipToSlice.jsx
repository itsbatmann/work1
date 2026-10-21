import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap.js'

const VIDEO = '/images/main/coffee.mp4'
const START = 7 * 60 + 30 // 07:30
const END = 21 * 60 // 21:00

const pad = n => String(n).padStart(2, '0')

// "First sip to last slice": a pinned scroll story.
// The coffee video opens out of a cup-sized circle to fill the screen, then a clock hand
// sweeps round like a knife and cuts the evening pizza in, while a little clock runs 07:30 -> 21:00.
export default function SipToSlice() {
  const ref = useRef(null)

  useGSAP(() => {
    const q = gsap.utils.selector(ref)
    const video = q('.sts-video')[0]
    const time = q('.sts-time')[0]
    const part = q('.sts-part')[0]
    const hour = q('.sts-hour')[0]
    const minute = q('.sts-minute')[0]
    video.muted = true // React doesn't reliably set the attribute; autoplay needs it

    // only fetch / play the (heavy) video while the section is near the screen
    ScrollTrigger.create({
      trigger: ref.current, start: 'top 150%', end: 'bottom -50%',
      onToggle: self => (self.isActive ? video.play().catch(() => {}) : video.pause()),
    })

    let last = -1
    const tick = p => {
      const mins = Math.round((START + p * (END - START)) / 5) * 5
      if (mins === last) return
      last = mins
      time.textContent = `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`
      part.textContent = mins < 12 * 60 ? 'Morning' : mins < 17 * 60 ? 'Afternoon' : 'Evening'
      gsap.set(hour, { rotation: (mins / 720) * 360, svgOrigin: '20 20' })
      gsap.set(minute, { rotation: (mins % 60) * 6, svgOrigin: '20 20' })
    }
    tick(0)

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: 1,
        onUpdate: self => tick(self.progress),
      },
    })

    // 1. the cup opens into the full scene
    tl.fromTo(ref.current, { '--open': 0 }, { '--open': 1, duration: 1.2, ease: 'power2.inOut' })
      .fromTo('.sts-video', { scale: 1.35 }, { scale: 1, duration: 1.2, ease: 'power2.inOut' }, 0)
      .to('.sts-word.l', { xPercent: -60, opacity: 0, duration: 0.7, ease: 'power2.in' }, 0)
      .to('.sts-word.r', { xPercent: 60, opacity: 0, duration: 0.7, ease: 'power2.in' }, 0)
      .to('.sts-ring', { rotation: 140, scale: 2.4, opacity: 0, duration: 0.8, ease: 'power2.in' }, 0)
      .fromTo('.sts-hud', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0.7)

      // 2. morning caption
      .fromTo('.sts-cap.am', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.15)
      .to('.sts-cap.am', { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' }, 1.95)

      // 3. the knife sweeps round and cuts the evening in
      .fromTo('.sts-knife', { opacity: 0 }, { opacity: 1, duration: 0.1 }, 2.05)
      .fromTo(ref.current, { '--cut': '0deg' }, { '--cut': '360deg', duration: 1.3, ease: 'power1.inOut' }, 2.1)
      .fromTo('.sts-pizza img', { scale: 1.2, rotation: -8 }, { scale: 1, rotation: 0, duration: 1.5, ease: 'power2.out' }, 2.1)
      .to('.sts-knife', { opacity: 0, duration: 0.15 }, 3.3)

      // 4. evening caption + call to action
      .fromTo('.sts-cap.pm', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 3.35)
      .fromTo('.sts-end > *', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, 3.5)
      .to({}, { duration: 0.4 })
  }, { scope: ref })

  return (
    <section className="sts" ref={ref} aria-label="From first sip to last slice">
      <div className="sts-stage">
        <div className="sts-morning">
          <video className="sts-video" src={VIDEO} poster="/images/main/coffee-poster.jpg"
            muted loop playsInline preload="none" aria-hidden="true" />
        </div>

        <div className="sts-ring" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs><path id="stsring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" /></defs>
            <text><textPath href="#stsring">FIRST SIP · 07:30 · STILL WARM · FIRST SIP · 07:30 · STILL WARM ·</textPath></text>
          </svg>
        </div>
        <span className="sts-word l">Slow</span>
        <span className="sts-word r">mornings,</span>

        <div className="sts-pizza">
          <img src="/images/main/pizza-boxes.jpg" alt="Three pizzas in open boxes, seen from above" />
        </div>
        <i className="sts-knife" aria-hidden="true" />

        <p className="sts-cap am">
          <b>07:30</b>
          Sunlight through the leaves, a cup that&rsquo;s still warm, nowhere to be.
        </p>
        <div className="sts-cap pm">
          <b>21:00</b>
          <h2>&hellip;and the last slice.</h2>
          <div className="sts-end">
            <p>Coffee at dawn, pizza by night. Same table, same welcome.</p>
            <a className="sts-cta" href="#/menu">See the menu <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <div className="sts-hud" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round">
            <circle cx="20" cy="20" r="18" />
            <path className="sts-hour" d="M20 20V10" />
            <path className="sts-minute" d="M20 20V5" />
          </svg>
          <span><b className="sts-time">07:30</b><small className="sts-part">Morning</small></span>
        </div>
      </div>
    </section>
  )
}
