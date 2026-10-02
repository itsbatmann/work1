import { gsap } from '../lib/gsap.js'
import logo from '../lib/logo.json'

// Pizza line-art. With `withLogo`, "baeCafe" is written across the middle
// (the outlines of the Pacifico glyphs, drawn then filled).
// four cuts at the diagonals, leaving the middle clear for the logo
const rays = [45, 135, 225, 315].map(deg => {
  const a = (deg * Math.PI) / 180
  return [100 + Math.cos(a) * 56, 100 + Math.sin(a) * 56, 100 + Math.cos(a) * 79, 100 + Math.sin(a) * 79]
})
const pepperoni = [[100, 38, 9], [100, 162, 9], [168, 100, 5.5], [32, 100, 5.5], [74, 52, 4], [128, 150, 4]]

const S = 118 / logo.width // fit the word to ~118 units of the 200 box
const logoTransform = `translate(100 100) scale(${S}) translate(${-(logo.x + logo.width / 2)} ${-(logo.y + logo.height / 2)})`

export default function PizzaArt({ withLogo = false, className = '' }) {
  return (
    <svg className={`pizza ${className}`} viewBox="0 0 200 200" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle className="stroke crust" cx="100" cy="100" r="92" />
      <circle className="stroke crust" cx="100" cy="100" r="80" />
      {rays.map(([x1, y1, x2, y2], i) => <line key={i} className="stroke ray" x1={x1} y1={y1} x2={x2} y2={y2} />)}
      {pepperoni.map(([x, y, r], i) => <circle key={i} className="pep" cx={x} cy={y} r={r} />)}
      <path className="stroke leaf" d="M124 46c9-4 16 0 19 8-9 4-17 1-19-8z" />
      <path className="stroke leaf" d="M76 154c-9 4-16 0-19-8 9-4 17-1 19 8z" />
      {withLogo && (
        <g transform={logoTransform} strokeWidth={1.4 / S}>
          {logo.glyphs.map((d, i) => <path key={i} className="stroke glyph" d={d} />)}
        </g>
      )}
    </svg>
  )
}

const q = root => gsap.utils.selector(root)

export function pizzaReset(root) {
  const s = q(root)
  gsap.set(s('.stroke'), { drawSVG: '0%' })
  gsap.set(s('.pep'), { scale: 0, transformOrigin: '50% 50%' })
  gsap.set(s('.glyph'), { fillOpacity: 0 })
}

// Draw the pizza (and the logo if present) in.
export function pizzaIn(root) {
  const s = q(root)
  const tl = gsap.timeline()
  tl.to(s('.crust'), { drawSVG: '100%', duration: 1.4, ease: 'power2.inOut', stagger: 0.16 })
    .to(s('.ray'), { drawSVG: '100%', duration: 0.8, ease: 'power2.out', stagger: 0.07 }, '-=0.7')
    .to(s('.pep'), { scale: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.06 }, '-=0.5')
    .to(s('.leaf'), { drawSVG: '100%', duration: 0.7, ease: 'power2.out', stagger: 0.1 }, '-=0.5')
  if (s('.glyph').length) {
    tl.to(s('.glyph'), { drawSVG: '100%', duration: 1.5, ease: 'power2.inOut', stagger: 0.2 }, '-=0.2')
      .to(s('.glyph'), { fillOpacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.6')
  }
  return tl
}

// Undraw it again.
export function pizzaOut(root) {
  const s = q(root)
  const tl = gsap.timeline()
  tl.to(s('.glyph'), { fillOpacity: 0, duration: 0.3 })
    .to(s('.stroke'), { drawSVG: '100% 100%', duration: 0.7, ease: 'power3.in', stagger: 0.015 }, '<')
    .to(s('.pep'), { scale: 0, duration: 0.4, ease: 'power2.in' }, '<')
  return tl
}
