import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, smooth } from './lib/gsap.js'
import useScrollFx from './lib/useScrollFx.js'
import Preloader from './components/Preloader.jsx'
import PizzaArt, { pizzaReset, pizzaIn, pizzaOut } from './components/PizzaArt.jsx'
import Header from './components/Header.jsx'
import Cursor from './components/Cursor.jsx'
import ToTop from './components/ToTop.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Photo from './components/Photo.jsx'
import Split from './components/Split.jsx'
import Footer from './components/Footer.jsx'
import ScrollBand from './components/ScrollBand.jsx'
import Divider from './components/Divider.jsx'
import { SliceScene, CupScene } from './components/Scene.jsx'
import MenuPage from './components/MenuPage.jsx'
import AboutPage from './components/AboutPage.jsx'

const getRoute = () => window.location.hash.replace(/^#\/?/, '')
const labels = { '': 'baeCafe', menu: 'The Menu', about: 'Our Story' }

function Home() {
  const ref = useRef(null)
  useScrollFx(ref)
  return (
    <main ref={ref}>
      <Hero />
      <About />
      <Divider icon="wine" />
      <Photo className="full" src="/images/main/pizza.png" alt="Margherita pizza on a board" />
      <Split
        text="A destination for great conversations, rich flavors, and memorable moments."
        src="/images/main/toast.png"
        alt="Syrup poured over French toast"
      />
      <ScrollBand rows={[['Fresh daily', 'Made with love', 'Pizza'], ['Coffee', 'Wine', 'Good company']]} />
      <SliceScene>
        <p className="tagline" data-scrub>Every Slice Tells a Story. Made fresh daily with premium ingredients.</p>
      </SliceScene>
      <Divider icon="heart" />
      <CupScene>
        <p className="scene-sign" data-scrub>Pull up a chair. The coffee is on us.</p>
      </CupScene>
    </main>
  )
}

export default function App() {
  const [route, setRoute] = useState(getRoute())
  const [loaded, setLoaded] = useState(false)
  const curtain = useRef(null)
  const curtainLabel = useRef(null)
  const current = useRef(getRoute())

  // smooth scroll, wired into ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9 })
    smooth.lenis = lenis
    lenis.stop() // locked until the preloader finishes
    lenis.on('scroll', ScrollTrigger.update)
    const tick = t => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy(); smooth.lenis = null }
  }, [])

  // page transition: a red iris opens, the pizza draws itself with the page name, iris closes on the new page
  useEffect(() => {
    const root = curtain.current
    const label = curtainLabel.current
    gsap.set(root, { display: 'none' })
    let tl
    const onHash = () => {
      const next = getRoute()
      if (next === current.current) return
      current.current = next
      tl?.kill()
      label.textContent = labels[next] ?? 'baeCafe'
      pizzaReset(root)
      const draw = pizzaIn(root).timeScale(1.9)
      const out = pizzaOut(root).timeScale(1.4)
      tl = gsap.timeline()
      tl.set(root, { display: 'block', clipPath: 'circle(0% at 50% 50%)' })
        .set(label, { opacity: 0, y: 24 })
        .to(root, { clipPath: 'circle(85% at 50% 50%)', duration: 1, ease: 'power3.inOut' })
        .add(draw, '-=0.35')
        .to(label, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .add(() => {
          setRoute(next)
          smooth.lenis?.scrollTo(0, { immediate: true })
          window.scrollTo(0, 0)
        })
        .to(label, { opacity: 0, y: -16, duration: 0.4, ease: 'power2.in' }, '+=0.35')
        .add(out, '<')
        .to(root, { clipPath: 'circle(0% at 50% 50%)', duration: 1.1, ease: 'power3.inOut' }, '>-0.1')
        .set(root, { display: 'none' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('beige', route === 'menu' || route === 'about')
    const id = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(id)
  }, [route, loaded])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  const onReady = () => {
    setLoaded(true)
    smooth.lenis?.start()
  }

  return (
    <>
      <Preloader onReady={onReady} />
      <div className="curtain" ref={curtain}>
        <PizzaArt className="curtain-pizza" />
        <span className="curtain-label" ref={curtainLabel} />
      </div>
      <Cursor />
      <Header route={route} loaded={loaded} />
      {loaded && (route === 'menu' ? <MenuPage /> : route === 'about' ? <AboutPage /> : <Home />)}
      {loaded && <Footer route={route} />}
      {loaded && <ToTop />}
    </>
  )
}
