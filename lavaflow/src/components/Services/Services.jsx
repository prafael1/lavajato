import { waLink } from '../../config'
import './Services.css'

const SERVICES = [
  { id: 1, icon: '🚿', title: 'Lavagem Simples',   price: 'a partir de R$30',  desc: 'Limpeza externa rápida e cuidadosa.' },
  { id: 2, icon: '🚙', title: 'Lavagem Completa',  price: 'a partir de R$50',  desc: 'Interna e externa com acabamento detalhado.', featured: true },
  { id: 3, icon: '✨', title: 'Polimento',          price: 'a partir de R$150', desc: 'Remove riscos e recupera o brilho da pintura.' },
  { id: 4, icon: '🛡️', title: 'Vitrificação',       price: 'a partir de R$500', desc: 'Proteção duradoura com efeito espelhado.' },
  { id: 5, icon: '🧼', title: 'Higienização',       price: 'a partir de R$120', desc: 'Limpeza profunda de bancos, carpetes e painel.' },
  { id: 6, icon: '🔧', title: 'Limpeza de Motor',  price: 'a partir de R$80',  desc: 'Limpeza segura do compartimento do motor.' },
  { id: 7, icon: '⚙️', title: 'Limpeza de Chassi', price: 'a partir de R$80', desc: 'Limpeza do Chassi e do carro.' },
  { id: 8, icon: '🏠', title: 'Lavagem em Domicilio ', price: 'a combinar', desc: 'Lavamos seu carro em casa, doméstico ou em outro lugar.' },
]

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
