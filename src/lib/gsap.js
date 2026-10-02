import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })

// Shared Lenis instance so pages can stop/start/scroll it.
export const smooth = { lenis: null }

export { gsap, ScrollTrigger, SplitText, useGSAP }
