import { useRef } from 'react'
import useScrollFx from '../lib/useScrollFx.js'
import Photo from './Photo.jsx'

const rows = [
  {
    label: 'Our story',
    src: '/images/about/story-chef.png',
    alt: 'Chef holding a glass of white wine',
    text: 'At BaeCafe, our journey began with a profound love for pizza. Our founders, a passionate couple, spent countless evenings perfecting recipes in their home kitchen, blending traditional techniques with innovative twists. Encouraged by friends and family, they opened BaeCafe in 2022 to share their artisanal pizzas with the world.',
  },

]

export default function AboutPage() {
  const ref = useRef(null)
  useScrollFx(ref)

  return (
    <main className="ap" ref={ref}>
      <section className="ap-intro">
        <span className="label" data-fade>Our commitment</span>
        <p className="ap-lead" data-fade>
          Nestled in the heart of the city, BaeCafe offers{' '}
          <em className="ap-em">
            a cozy setting
            <svg className="uline" viewBox="0 0 300 14" preserveAspectRatio="none" fill="none" strokeLinecap="round" aria-hidden="true">
              <path data-draw d="M3 9C55 2 105 13 155 7S250 4 297 9" />
            </svg>
          </em>{' '}
          for friends, families, and couples.
        </p>
      </section>

      {rows.map((r, i) => (
        <section className={`ap-row${i % 2 ? ' flip' : ''}`} key={r.src}>
          <div className="ap-text">
            <span className="label" data-fade>{r.label}</span>
            <p data-lines>{r.text}</p>
          </div>
          <Photo className="ap-photo" src={r.src} alt={r.alt} speed={i % 2 ? 6 : -6} />
        </section>
      ))}
    </main>
  )
}
