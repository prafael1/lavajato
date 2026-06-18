import { Link } from 'react-router-dom'
import { SERVICES, waLink } from '../../config'
import './Services.css'

function Services() {
  return (
    <section className="services" id="servicos">
      <div className="services__header">
        <span className="services__eyebrow">o que fazemos</span>
        <h2 className="services__title">Serviços e Preços</h2>
        <p className="services__subtitle">
          Soluções completas para deixar seu veículo impecável.
        </p>
      </div>

      <div className="services__grid">
        {SERVICES.map(s => (
          <div
            key={s.id}
            className={`services__card ${s.featured ? 'services__card--featured' : ''}`}
          >
            <span className="services__icon">{s.icon}</span>
            <h3 className="services__card-title">{s.title}</h3>
            <p className="services__card-desc">{s.desc}</p>
            <span className="services__price">{s.price}</span>
            <Link
              to={`/agendamento?servico=${s.id}`}
              className="services__agendar-btn"
            >
              Agendar
            </Link>
          </div>
        ))}
      </div>

      <div className="services__cta">
        <p>Não encontrou o que precisa? Fale com a gente.</p>
        <a
          href={waLink('Olá! Gostaria de um orçamento.')}
          target="_blank"
          rel="noopener noreferrer"
          className="services__cta-btn"
        >
          Pedir Orçamento pelo WhatsApp
        </a>
      </div>
    </section>
  )
}

export default Services
