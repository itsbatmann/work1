import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'

export default function About() {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from('.big-script', {
      y: 40, opacity: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
    })
    gsap.to('.big-script', {
      yPercent: -14, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
    gsap.from('.wine-glass', {
      rotate: -12, y: 30, opacity: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 65%' },
    })
  }, { scope: ref })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-logo">
        <span className="big-script">baeCafe</span>
        <img className="wine-glass" src="/images/main/wine-glass.png" alt="" />
      </div>
      <div className="about-text">
        <svg className="orn" viewBox="0 0 160 14" fill="none" strokeLinecap="round" aria-hidden="true">
          <path data-draw d="M2 7H64" /><path data-draw d="M96 7H158" /><circle data-draw cx="80" cy="7" r="4.5" />
        </svg>
        <p data-lines>BaeCafe is a cozy pizza spot with a rustic charm, offering a warm welcome to all. Its open display of fresh ingredients and friendly service create a delightful atmosphere.</p>
        <p data-lines>BaeCafe serves up delicious pizzas: classic, gourmet, and custom. Enjoy with coffee, drinks, or wine/beer. Perfect for any meal. Cozy atmosphere, friendly service. The ideal spot to unwind and savor great food.</p>
      </div>
    </section>
  )
}
