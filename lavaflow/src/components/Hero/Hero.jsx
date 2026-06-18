import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../../firebase'
import { RiWhatsappLine, RiArrowDownLine } from 'react-icons/ri'
import { BUSINESS, waLink, getStatus } from '../../config'
import './Hero.css'

function Hero() {
  const status = getStatus()

  const [avgRating, setAvgRating] = useState(null)
  const [totalBookings, setTotalBookings] = useState(null)

  useEffect(() => {
    const unsub = onValue(ref(db, 'reviews'), snap => {
      const data = snap.val()
      if (!data) { setAvgRating(null); return }
      const list  = Object.values(data)
      const total = list.reduce((sum, r) => sum + r.stars, 0)
      const avg   = Math.ceil((total / list.length) * 10) / 10
      setAvgRating(avg.toFixed(1))
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const unsub = onValue(ref(db, 'bookings'), snap => {
      const data = snap.val()
      setTotalBookings(data ? Object.keys(data).length : 0)
    })
    return () => unsub()
  }, [])

  const stats = [
    { num: totalBookings !== null ? `${totalBookings}+` : '...', label: 'Clientes' },
    { num: avgRating !== null ? `${avgRating}★` : '5.0★', label: 'Avaliação' },
    { num: '5 anos', label: 'Experiência' },
  ]

  return (
    <section className="hero" id="inicio">
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" style={{ background: status.color }} />
          {status.text}
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
          src="/carro4.jpeg"
          alt="Carro limpo após lavagem profissional"
          onError={e => e.target.closest('.hero__image').style.display = 'none'}
        />
      </div>
      <div className="hero__stats">
        {stats.map(s => (
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