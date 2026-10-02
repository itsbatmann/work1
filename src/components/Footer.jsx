import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'

export default function Footer({ route }) {
  const ref = useRef(null)

  useGSAP(() => {
    const st = { trigger: ref.current, start: 'top 92%' }
    gsap.from('.footer p', { y: 30, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: st })
    gsap.from('.footer-info span', { y: 20, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out', scrollTrigger: st })
    gsap.from('.footer-logo', { y: 30, opacity: 0, rotate: -4, duration: 1.4, delay: 0.2, ease: 'expo.out', scrollTrigger: st })
  }, { scope: ref, dependencies: [route], revertOnUpdate: true })

  return (
    <footer className="footer" ref={ref}>
      <p>Baecafe is more than just a place to dine; it's a destination where every visit feels like a special occasion. Come and discover why Baecafe is the perfect blend of elegance, taste, and warmth.</p>
      <div className="footer-info">
        <span>Open daily · 10:00 – 00:00</span>
        <span>123 Beacon Street, Floor 5, Boston, MA 02108</span>
        <span>897-863-544</span>
      </div>
      <span className="footer-logo">baeCafe</span>
    </footer>
  )
}
