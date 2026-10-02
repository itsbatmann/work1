import { Fragment } from 'react'

// Splits text into words > chars so GSAP can animate each character.
export default function Chars({ text, className = '', auto = true }) {
  return (
    <span className={`chars ${className}`} data-chars={auto ? '' : undefined} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>
          <span className="word" aria-hidden="true">
            {[...w].map((c, j) => <span className="char" key={j}>{c}</span>)}
          </span>{' '}
        </Fragment>
      ))}
    </span>
  )
}
