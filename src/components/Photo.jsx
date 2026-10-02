import { useState } from 'react'

// Shows a warm gradient placeholder if the image file is missing.
// `speed` gives the frame its own parallax drift (percent) for layered scrolling.
export default function Photo({ src, alt, className = '', id, reveal = true, speed }) {
  const [failed, setFailed] = useState(false)
  return (
    <figure
      id={id}
      className={`img ${className}`}
      data-reveal={reveal ? '' : undefined}
      data-speed={speed}
      data-hover
    >
      {!failed && <img src={src} alt={alt} decoding="async" onError={() => setFailed(true)} />}
    </figure>
  )
}
