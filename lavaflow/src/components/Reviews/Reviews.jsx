import { useState, useEffect } from 'react'
import { ref, push, onValue } from 'firebase/database'
import { db } from '../../firebase'
import './Reviews.css'

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="star-picker">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          className={`star-picker__star ${n <= (hovered || value) ? 'star-picker__star--active' : ''}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} estrela${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  const date = new Date(review.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__avatar">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="review-card__name">{review.name}</div>
          <div className="review-card__date">{date}</div>
        </div>
        <div className="review-card__stars">
          {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
        </div>
      </div>
      <p className="review-card__comment">{review.comment}</p>
    </div>
  )
}

const EMPTY = { name: '', stars: 0, comment: '' }

function Reviews() {
  const [reviews, setReviews]   = useState([])
  const [form, setForm]         = useState(EMPTY)
  const [loading, setLoading]   = useState(true)
  const [sending, setSending]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  // Lê avaliações em tempo real
  useEffect(() => {
    const reviewsRef = ref(db, 'reviews')
    const unsub = onValue(reviewsRef, snapshot => {
      const data = snapshot.val()
      if (data) {
        const list = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .sort((a, b) => b.createdAt - a.createdAt)
        setReviews(list)
      } else {
        setReviews([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  async function handleSubmit() {
    setError('')
    if (!form.name.trim())    return setError('Digite seu nome.')
    if (form.stars === 0)     return setError('Selecione uma nota.')
    if (!form.comment.trim()) return setError('Escreva um comentário.')

    setSending(true)
    try {
      await push(ref(db, 'reviews'), {
        name:      form.name.trim(),
        stars:     form.stars,
        comment:   form.comment.trim(),
        createdAt: Date.now(),
      })
      setForm(EMPTY)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch {
      setError('Erro ao enviar. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)
    : null

  return (
    <section className="reviews" id="avaliacoes">

      <div className="reviews__header">
        <span className="reviews__eyebrow">o que dizem</span>
        <h2 className="reviews__title">Avaliações</h2>
        {avg && (
          <div className="reviews__avg">
            <span className="reviews__avg-num">{avg}</span>
            <span className="reviews__avg-stars">★★★★★</span>
            <span className="reviews__avg-total">({reviews.length} avaliações)</span>
          </div>
        )}
      </div>

      {/* Lista de avaliações */}
      <div className="reviews__list">
        {loading && <p className="reviews__empty">Carregando...</p>}
        {!loading && reviews.length === 0 && (
          <p className="reviews__empty">Seja o primeiro a avaliar!</p>
        )}
        {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
      </div>

      {/* Formulário */}
      <div className="reviews__form">
        <h3 className="reviews__form-title">Deixe sua avaliação</h3>

        <input
          className="reviews__input"
          type="text"
          placeholder="Seu nome"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          maxLength={50}
        />

        <div className="reviews__stars-label">Sua nota:</div>
        <StarPicker
          value={form.stars}
          onChange={stars => setForm(f => ({ ...f, stars }))}
        />

        <textarea
          className="reviews__input reviews__textarea"
          placeholder="Conte sua experiência..."
          value={form.comment}
          onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
          maxLength={300}
          rows={4}
        />

        {error   && <p className="reviews__error">{error}</p>}
        {success && <p className="reviews__success">✅ Avaliação enviada! Obrigado!</p>}

        <button
          className="reviews__submit"
          onClick={handleSubmit}
          disabled={sending}
        >
          {sending ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </div>

    </section>
  )
}

export default Reviews
