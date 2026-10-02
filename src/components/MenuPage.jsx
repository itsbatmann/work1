import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'
import useScrollFx from '../lib/useScrollFx.js'
import Photo from './Photo.jsx'
import Chars from './Chars.jsx'
import { DrawIcon } from './Divider.jsx'
import { menus } from '../menuData.js'

const groups = [
  { title: 'Drinks', icon: 'wine', sections: menus.drinks, photo: ['/images/menu/cocktails.png', 'Two cocktails'] },
  { title: 'Pizza', icon: 'slice', sections: menus.pizzas },
  { title: 'Sweets', icon: 'cup', sections: menus.desserts, photo: ['/images/menu/tea.png', 'Pouring tea'] },
]

// the source copy has stray brackets and spaces before commas; tidy them for display
const tidy = d => {
  const t = d.replace(/[()]/g, '').replace(/\s+,/g, ',').replace(/\s{2,}/g, ' ').trim()
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export default function MenuPage() {
  const ref = useRef(null)
  useScrollFx(ref)

  useGSAP(() => {
    gsap.from('.mp-head .label, .mp-sub', { y: 20, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.15, delay: 0.3 })
    gsap.from('.mp-banner', { y: 60, opacity: 0, duration: 1.6, ease: 'expo.out', delay: 0.5 })

    gsap.utils.toArray('.mp-group').forEach(group => {
      const st = { trigger: group, start: 'top 72%' }
      gsap.from(group.querySelectorAll('.mp-item'), { y: 26, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.07, scrollTrigger: st })
      gsap.from(group.querySelectorAll('.mp-line'), {
        scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power3.out', stagger: 0.07, scrollTrigger: st,
      })
      gsap.from(group.querySelectorAll('.mp-sec h3'), { x: -20, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.15, scrollTrigger: st })
    })

    // gentle price nudge on hover
    gsap.utils.toArray('.mp-item').forEach(item => {
      const price = item.querySelector('.mp-price')
      item.addEventListener('mouseenter', () => gsap.to(price, { x: -6, duration: 0.5, ease: 'expo.out' }))
      item.addEventListener('mouseleave', () => gsap.to(price, { x: 0, duration: 0.6, ease: 'expo.out' }))
    })
  }, { scope: ref })

  return (
    <main className="mp" ref={ref}>
      <header className="mp-head">
        <span className="label">The menu</span>
        <h1><Chars text="Made fresh," /> <em><Chars text="served warm." /></em></h1>
        <p className="mp-sub">Open daily 10:00 – 00:00 &nbsp;·&nbsp; 123 Beacon Street, Floor 5, Boston, MA 02108</p>
      </header>

      <Photo className="mp-banner" reveal={false} src="/images/menu/menu-hero.png" alt="Pizzas in boxes" />

      {groups.map((g, gi) => (
        <section className="mp-group" key={g.title}>
          <aside className="mp-aside">
            <span className="mp-num">0{gi + 1}</span>
            <h2 className="mp-title">{g.title}</h2>
            <DrawIcon name={g.icon} className="mp-icon" />
            {g.photo && <Photo className="mp-photo" src={g.photo[0]} alt={g.photo[1]} />}
          </aside>

          <div className="mp-sections">
            {g.sections.map(sec => (
              <div className="mp-sec" key={sec.title}>
                <h3>{sec.title}</h3>
                {sec.items.map(([name, price, desc]) => (
                  <div className="mp-item" key={name}>
                    <div className="mp-row">
                      <span className="mp-name">{name}</span>
                      <i className="mp-line" />
                      <span className="mp-price">{price}</span>
                    </div>
                    <p className="mp-desc">{tidy(desc)}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
