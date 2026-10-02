export default function MenuCard({ sections, className = '', style, footer = true }) {
  return (
    <article className={`menu-card ${className}`} style={style}>
      <h3 className="menu-card-title">baeCafe Menu</h3>
      {sections.map(s => (
        <div className="menu-section" key={s.title}>
          <h4>{s.title}</h4>
          {s.items.map(([name, price, desc]) => (
            <div className="menu-item" key={name}>
              <div className="menu-row"><span>{name}</span><i /><span>{price}</span></div>
              <small>({desc})</small>
            </div>
          ))}
        </div>
      ))}
      {footer && (
        <div className="menu-card-foot"><span>SINCE</span><b>baeCafe</b><span>1997</span></div>
      )}
    </article>
  )
}
