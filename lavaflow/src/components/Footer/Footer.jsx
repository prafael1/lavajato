import { BUSINESS } from '../../config'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()
  const name = BUSINESS.name

  return (
    <footer className="footer">
      <span className="footer__logo">
        {name.slice(0, 4)}<span className="footer__logo-dot">{name.slice(4)}</span>
      </span>
      <p className="footer__copy">
        © {year} {BUSINESS.name} · Todos os direitos reservados
      </p>
    </footer>
  )
}

export default Footer
