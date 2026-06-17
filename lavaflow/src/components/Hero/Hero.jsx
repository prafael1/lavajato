import { RiWhatsappLine, RiArrowDownLine } from 'react-icons/ri'
import { BUSINESS, waLink } from '../../config'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="inicio">

      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Aberto agora · {BUSINESS.city}
        </div>

        <h1 className="hero__title">
          Seu carro <em>brilhando</em><br />em menos de 1h
        </h1>

        <p className="hero__subtitle">
          Lavagem profissional, polimento e estética automotiva
          para quem valoriza o próprio veículo.
        </p>

        <div className="hero__buttons">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn-wa"
          >
            <RiWhatsappLine size={20} />
            Chamar no WhatsApp
          </a>
          <a href="#servicos" className="hero__btn-secondary">
            Ver serviços e preços
          </a>
        </div>
      </div>

     <div className="hero__image">
  <img
    src="/carro.png"
    alt="Carro limpo após lavagem profissional"
    onError={e => e.target.closest('.hero__image').style.display = 'none'}
  />
</div>

      <div className="hero__stats">
        {BUSINESS.stats.map(s => (
          <div key={s.label} className="hero__stat">
            <span className="hero__stat-num">{s.num}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <a href="#servicos" className="hero__scroll-hint" aria-label="Ver serviços">
        <RiArrowDownLine size={20} />
      </a>

    </section>
  )
}

export default Hero
