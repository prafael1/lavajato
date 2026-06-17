import { useState } from 'react'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { waLink, BUSINESS } from '../../config'
import './Header.css'

const NAV_LINKS = [
  { label: 'Início',    href: '#inicio'   },
  { label: 'Serviços', href: '#servicos'  },
  { label: 'Contato',  href: '#contato'   },
]

function Header() {
  const [open, setOpen] = useState(false)
  function getStatus(){
    const hour = new Date() .getHours()
    const isOpen = hour >= 8 && hour < 18
    return isOpen
      ? {text: 'Aberto agora . Carapicuiba/SP', color: '#22c55e'}
      : {text: 'Aberto amanhã . Carapicuiba/SP', color: '#ef4444'}
    }

  return (
    <header className="header">
      <a href="#inicio" className="header__logo">
        {BUSINESS.name.slice(0, 4)}<span className="header__logo-dot">{BUSINESS.name.slice(4)}</span>
      </a>

      <nav className={`header__nav ${open ? 'header__nav--open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="header__link"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="header__btn-wa"
          onClick={() => setOpen(false)}
        >
          Agendar
        </a>
      </nav>

      <button
        className="header__menu-btn"
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      >
        {open ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
      </button>
    </header>
  )
}

export default Header
