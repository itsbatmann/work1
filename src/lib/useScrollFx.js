import { gsap, SplitText, useGSAP } from './gsap.js'

// Compositor-friendly scroll motion (transform + opacity only). Images never end
// scaled above 1:1, so low-resolution photos stay as sharp as they can be.
//   [data-reveal]  photo drifts up + fades in; inner image settles and parallaxes
//                  (.full photos grow from a smaller frame as you scroll)
//   [data-speed]   element drifts at its own speed (percent) for layered parallax
//   [data-lines]   SplitText masked line-by-line rise
//   [data-scrub]   words light up one by one as you scroll through the text
//   [data-fade]    fade/slide up
//   [data-chars]   per-character rise (see <Chars>)
//   [data-draw]    SVG stroke draws itself (DrawSVG)
export default function useScrollFx(scope) {
  useGSAP(() => {
    gsap.utils.toArray('[data-reveal]').forEach(el => {
      const img = el.querySelector('img')
      const st = { trigger: el, start: 'top 92%' }

      if (el.classList.contains('full')) {
        gsap.fromTo(el, { scale: 0.88, opacity: 0.4 }, {
          scale: 1, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 100%', end: 'top 30%', scrub: 1 },
        })
      } else {
        gsap.from(el, { y: 80, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: st })
      }

      if (img) {
        gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'expo.out', scrollTrigger: st })
        gsap.fromTo(img, { yPercent: -5 }, {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }
    })

    gsap.utils.toArray('[data-speed]').forEach(el => {
      gsap.fromTo(el, { yPercent: 0 }, {
        yPercent: Number(el.dataset.speed), ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })

    gsap.utils.toArray('[data-lines]').forEach(el => {
      SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit(self) {
          self.masks?.forEach(m => { m.style.paddingBottom = '0.14em'; m.style.marginBottom = '-0.14em' })
          return gsap.from(self.lines, {
            yPercent: 115, duration: 1.5, ease: 'expo.out', stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          })
        },
      })
    })

    gsap.utils.toArray('[data-scrub]').forEach(el => {
      SplitText.create(el, {
        type: 'words', autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(self.words, { opacity: 0.16 }, {
            opacity: 1, ease: 'none', stagger: 0.12,
            scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true },
          })
        },
      })
    })

    gsap.utils.toArray('[data-fade]').forEach(el => {
      gsap.from(el, {
        y: 36, opacity: 0, duration: 1.6, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      })
    })

    gsap.utils.toArray('[data-chars]').forEach(el => {
      gsap.fromTo(el.querySelectorAll('.char'), { yPercent: 120 }, {
        yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.04,
        scrollTrigger: { trigger: el, start: 'top 92%' },
      })
    })

    gsap.utils.toArray('[data-draw]').forEach(el => {
      gsap.fromTo(el, { drawSVG: '0%' }, {
        drawSVG: '100%', duration: 1.8, ease: 'power2.inOut',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      })
    })
  }, { scope })
}
