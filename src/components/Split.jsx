import Photo from './Photo.jsx'

export default function Split({ text, src, alt, reverse = false }) {
  return (
    <section className={`split${reverse ? ' reverse' : ''}`}>
      {reverse && <Photo src={src} alt={alt} speed={-7} />}
      <p className={`tagline${reverse ? ' small' : ''}`} data-scrub data-speed={reverse ? 6 : 9}>{text}</p>
      {!reverse && <Photo src={src} alt={alt} speed={-7} />}
    </section>
  )
}
