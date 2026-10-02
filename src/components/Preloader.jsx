import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'
import PizzaArt, { pizzaReset, pizzaIn, pizzaOut } from './PizzaArt.jsx'

export default function Preloader({ onReady }) {
  const ref = useRef(null)
  const fired = useRef(false)
  const ready = () => { if (!fired.current) { fired.current = true; onReady() } }

  useGSAP(() => {
    const root = ref.current
    const counter = root.querySelector('.pre-count')
    const num = { v: 0 }

    pizzaReset(root)
    gsap.set(root, { clipPath: 'circle(85% at 50% 50%)' })

    const draw = pizzaIn(root)
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => gsap.set(root, { display: 'none' }),
    })
    tl.add(draw, 0.2)
      .from('.pre-tag', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out' }, 0.8)
      .to(num, {
        v: 100, duration: draw.duration(), ease: 'power1.inOut',
        onUpdate: () => { counter.textContent = String(Math.round(num.v)).padStart(3, '0') },
      }, 0.2)
      .to('.pre-bar', { scaleX: 1, duration: draw.duration(), ease: 'power1.inOut' }, 0.2)
      .to('.pre-count, .pre-tag, .pre-bar', { opacity: 0, duration: 0.4 }, '>0.5')
      .add(pizzaOut(root), '<')
      .add(ready, '>-0.1')
      .to(root, { clipPath: 'circle(0% at 50% 50%)', duration: 1.3, ease: 'power3.inOut' }, '<0.1')

    setTimeout(() => { ready(); gsap.set(root, { display: 'none' }) }, 12000) // failsafe

    // wait for webfonts so the tagline doesn't flash a fallback face
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]).then(() => tl.play())
  }, { scope: ref })

  return (
    <div className="preloader" ref={ref}>
      <PizzaArt withLogo className="pre-art" />
      <span className="pre-tag">All you need is love and food</span>
      <span className="pre-count">000</span>
      <span className="pre-bar" />
    </div>
  )
}
