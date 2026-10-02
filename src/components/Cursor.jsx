import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'

// Soft follower: a dot and a trailing ring that blooms over links and photos.
export default function Cursor() {
  const ref = useRef(null)

  useGSAP(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.body.classList.add('cursor-on')
    const dot = ref.current.querySelector('.cursor-dot')
    const ring = ref.current.querySelector('.cursor-ring')
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const dx = gsap.quickTo(dot, 'x', { duration: 0.12 })
    const dy = gsap.quickTo(dot, 'y', { duration: 0.12 })
    const rx = gsap.quickTo(ring, 'x', { duration: 0.6, ease: 'power3' })
    const ry = gsap.quickTo(ring, 'y', { duration: 0.6, ease: 'power3' })

    const move = e => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.4, overwrite: 'auto' })
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
    }
    const over = e => {
      const link = e.target.closest('a, button')
      const photo = e.target.closest('[data-hover]')
      gsap.to(ring, { scale: link ? 1.9 : photo ? 2.6 : 1, duration: 0.5, ease: 'expo.out' })
      gsap.to(dot, { scale: link || photo ? 0.4 : 1, duration: 0.3 })
      ring.classList.toggle('photo', !!photo && !link)
    }
    const leave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    return () => {
      document.body.classList.remove('cursor-on')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
    }
  }, { scope: ref })

  return (
    <div ref={ref} aria-hidden="true">
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </div>
  )
}
