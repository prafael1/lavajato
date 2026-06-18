import { useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect }   from 'react'
import { ref, push, onValue }    from 'firebase/database'
import { db }                    from '../firebase'
import { SERVICES, BUSINESS, getAvailableSlots, bookingWaMsg } from '../config'
import '../components/Booking/Booking.css'
import './BookingPage.css'

const STEPS = ['Serviço', 'Data e Hora', 'Seus Dados', 'Confirmado']
const EMPTY  = { name: '', phone: '' }

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function formatDate(str) {
  if (!str) return ''
  const [y, m, d] = str.split('-')
  return `${d}/${m}/${y}`
}

function StarDisplay({ count }) {
  return (
    <span style={{ color: '#f59e0b' }}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  )
}

export default function BookingPage() {
  const [searchParams]            = useSearchParams()
  const preSelected               = SERVICES.find(s => s.id === Number(searchParams.get('servico')))

  const [step, setStep]           = useState(preSelected ? 1 : 0)
  const [service, setService]     = useState(preSelected || null)
  const [date, setDate]           = useState('')
  const [slot, setSlot]           = useState(null)
  const [form, setForm]           = useState(EMPTY)
  const [bookings, setBookings]   = useState([])
  const [slots, setSlots]         = useState([])
  const [sending, setSending]     = useState(false)
  const [error, setError]         = useState('')

  useEffect(() => {
    const unsub = onValue(ref(db, 'bookings'), snap => {
      const data = snap.val()
      setBookings(data ? Object.values(data) : [])
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (date && service) {
      setSlot(null)
      setSlots(getAvailableSlots(date, bookings, service.duration))
    }
  }, [date, service, bookings])

  function selectService(s) {
    setService(s); setDate(''); setSlot(null); setStep(1)
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
      await push(ref(db, 'bookings'), booking)
      const msg = bookingWaMsg(booking, service)
      window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
      setStep(3)
    } catch {
      setError('Erro ao agendar. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  function reset() {
    setStep(preSelected ? 1 : 0)
    setService(preSelected || null)
    setDate(''); setSlot(null); setForm(EMPTY); setError('')
  }

  return (
    <div className="bp">

      {/* Topo */}
      <div className="bp__top">
        <Link to="/" className="bp__back-home">← Voltar ao site</Link>
        <div className="bp__logo">
          {BUSINESS.name.slice(0, 4)}
          <span className="bp__logo-dot">{BUSINESS.name.slice(4)}</span>
        </div>
      </div>

      <div className="bp__container">
        <h1 className="bp__title">Agendamento</h1>

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
                <button key={s.id} className="booking__service-btn" onClick={() => selectService(s)}>
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

        {/* STEP 1 — Data e horário */}
        {step === 1 && (
          <div className="booking__panel">
            {!preSelected && (
              <button className="booking__back" onClick={() => setStep(0)}>← Voltar</button>
            )}
            <div className="bp__service-badge">
              <span>{service.icon}</span>
              <span>{service.title}</span>
              <span className="bp__service-duration">· {service.duration} min</span>
            </div>

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
                      onClick={() => { setSlot(s); setStep(2) }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 2 — Dados */}
        {step === 2 && (
          <div className="booking__panel">
            <button className="booking__back" onClick={() => setStep(1)}>← Voltar</button>
            <div className="bp__summary">
              <div className="bp__summary-row">
                <span>Serviço</span>
                <strong>{service.icon} {service.title}</strong>
              </div>
              <div className="bp__summary-row">
                <span>Data</span>
                <strong>{formatDate(date)}</strong>
              </div>
              <div className="bp__summary-row">
                <span>Horário</span>
                <strong>{slot?.label}</strong>
              </div>
              <div className="bp__summary-row">
                <span>Duração</span>
                <strong>{service.duration} min</strong>
              </div>
            </div>

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

            <button className="booking__confirm-btn" onClick={handleConfirm} disabled={sending}>
              {sending ? 'Agendando...' : 'Confirmar Agendamento'}
            </button>
          </div>
        )}

        {/* STEP 3 — Sucesso */}
        {step === 3 && (
          <div className="booking__panel booking__panel--success">
            <div className="booking__success-icon">✅</div>
            <h3 className="booking__success-title">Agendamento Confirmado!</h3>
            <p className="booking__success-info">
              <strong>{service.icon} {service.title}</strong><br />
              📅 {formatDate(date)} às {slot?.label}<br />
              👤 {form.name}<br />
              📱 {form.phone}
            </p>
            <p className="booking__success-sub">
              O Gui foi notificado pelo WhatsApp e entrará em contato se necessário.
            </p>
            <div className="bp__success-btns">
              <button className="booking__confirm-btn" onClick={reset}>
                Fazer outro agendamento
              </button>
              <Link to="/" className="bp__home-btn">Voltar ao site</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
