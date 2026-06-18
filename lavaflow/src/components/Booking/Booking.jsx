import { useState, useEffect } from 'react'
import { ref, push, onValue } from 'firebase/database'
import { db } from '../../firebase'
import { SERVICES, BUSINESS, getAvailableSlots, bookingWaMsg, waLink } from '../../config'
import './Booking.css'

const STEPS = ['Serviço', 'Data e Hora', 'Seus Dados', 'Confirmado']
const EMPTY  = { name: '', phone: '' }

// Data mínima = hoje
function todayStr() {
  return new Date().toISOString().split('T')[0]
}

// Label legível da data
function formatDate(str) {
  if (!str) return ''
  const [y, m, d] = str.split('-')
  return `${d}/${m}/${y}`
}

export default function Booking() {
  const [step, setStep]           = useState(0)
  const [service, setService]     = useState(null)
  const [date, setDate]           = useState('')
  const [slot, setSlot]           = useState(null)
  const [form, setForm]           = useState(EMPTY)
  const [bookings, setBookings]   = useState([])
  const [slots, setSlots]         = useState([])
  const [sending, setSending]     = useState(false)
  const [error, setError]         = useState('')
  const [bookingId, setBookingId] = useState(null)

  // Lê agendamentos do Firebase em tempo real
  useEffect(() => {
    const unsub = onValue(ref(db, 'bookings'), snap => {
      const data = snap.val()
      if (data) {
        setBookings(Object.values(data))
      } else {
        setBookings([])
      }
    })
    return () => unsub()
  }, [])

  // Recalcula slots quando muda data ou serviço
  useEffect(() => {
    if (date && service) {
      setSlot(null)
      setSlots(getAvailableSlots(date, bookings, service.duration))
    }
  }, [date, service, bookings])

  function selectService(s) {
    setService(s)
    setDate('')
    setSlot(null)
    setStep(1)
  }

  function selectSlot(s) {
    setSlot(s)
    setStep(2)
  }

  async function handleConfirm() {
    setError('')
    if (!form.name.trim())  return setError('Digite seu nome.')
    if (!form.phone.trim()) return setError('Digite seu telefone.')

    setSending(true)
    try {
      const booking = {
        name:      form.name.trim(),
        phone:     form.phone.trim(),
        serviceId: service.id,
        date,
        time:      slot.label,
        startMin:  slot.min,
        duration:  service.duration,
        exclusivo: service.exclusivo,
        createdAt: Date.now(),
      }

      const newRef = await push(ref(db, 'bookings'), booking)
      setBookingId(newRef.key)
      setStep(3)

      // Notifica o Gui no WhatsApp (abre em nova aba)
      const msg = bookingWaMsg({ ...booking }, service)
      window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')

    } catch {
      setError('Erro ao agendar. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  function reset() {
    setStep(0); setService(null); setDate(''); setSlot(null)
    setForm(EMPTY); setError(''); setBookingId(null)
  }

  return (
    <section className="booking" id="agendamento">

      <div className="booking__header">
        <span className="booking__eyebrow">marque seu horário</span>
        <h2 className="booking__title">Agendamento</h2>
      </div>

      {/* Stepper */}
      <div className="booking__stepper">
        {STEPS.map((label, i) => (
          <div key={label} className={`booking__step ${i === step ? 'booking__step--active' : ''} ${i < step ? 'booking__step--done' : ''}`}>
            <div className="booking__step-dot">{i < step ? '✓' : i + 1}</div>
            <span className="booking__step-label">{label}</span>
          </div>
        ))}
      </div>

      {/* STEP 0 — Escolha o serviço */}
      {step === 0 && (
        <div className="booking__panel">
          <p className="booking__hint">Selecione o serviço desejado:</p>
          <div className="booking__services">
            {SERVICES.map(s => (
              <button
                key={s.id}
                className="booking__service-btn"
                onClick={() => selectService(s)}
              >
                <span className="booking__service-icon">{s.icon}</span>
                <div className="booking__service-info">
                  <span className="booking__service-title">{s.title}</span>
                  <span className="booking__service-meta">{s.price} · {s.duration} min</span>
                </div>
                <span className="booking__service-arrow">›</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1 — Escolha data e horário */}
      {step === 1 && (
        <div className="booking__panel">
          <button className="booking__back" onClick={() => setStep(0)}>← Voltar</button>
          <p className="booking__hint">Serviço: <strong>{service.title}</strong> ({service.duration} min)</p>

          <label className="booking__label">Escolha a data:</label>
          <input
            type="date"
            className="booking__date-input"
            min={todayStr()}
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          {date && slots.length === 0 && (
            <p className="booking__empty">Nenhum horário disponível nesta data.</p>
          )}

          {date && slots.length > 0 && (
            <>
              <label className="booking__label">Escolha o horário:</label>
              <div className="booking__slots">
                {slots.map(s => (
                  <button
                    key={s.min}
                    className={`booking__slot ${slot?.min === s.min ? 'booking__slot--active' : ''}`}
                    onClick={() => selectSlot(s)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 2 — Dados do cliente */}
      {step === 2 && (
        <div className="booking__panel">
          <button className="booking__back" onClick={() => setStep(1)}>← Voltar</button>
          <p className="booking__hint">
            <strong>{service.title}</strong> · {formatDate(date)} às {slot?.label}
          </p>

          <label className="booking__label">Seu nome:</label>
          <input
            className="booking__input"
            type="text"
            placeholder="Nome completo"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            maxLength={60}
          />

          <label className="booking__label">Seu WhatsApp:</label>
          <input
            className="booking__input"
            type="tel"
            placeholder="(11) 9 9999-9999"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            maxLength={20}
          />

          {error && <p className="booking__error">{error}</p>}

          <button
            className="booking__confirm-btn"
            onClick={handleConfirm}
            disabled={sending}
          >
            {sending ? 'Agendando...' : 'Confirmar Agendamento'}
          </button>
        </div>
      )}

      {/* STEP 3 — Confirmado */}
      {step === 3 && (
        <div className="booking__panel booking__panel--success">
          <div className="booking__success-icon">✅</div>
          <h3 className="booking__success-title">Agendamento Confirmado!</h3>
          <p className="booking__success-info">
            <strong>{service.title}</strong><br />
            📅 {formatDate(date)} às {slot?.label}<br />
            👤 {form.name}
          </p>
          <p className="booking__success-sub">
            O Gui foi notificado pelo WhatsApp e entrará em contato se necessário.
          </p>
          <button className="booking__confirm-btn" onClick={reset}>
            Fazer outro agendamento
          </button>
        </div>
      )}

    </section>
  )
}
