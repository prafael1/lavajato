// ============================================================
// CONFIG — Edite aqui para atualizar todo o site de uma vez
// ============================================================
export const BUSINESS = {
  name:      'LAVA RÁPIDO DO GUI',
  tagline:   'Lava-Jato em Carapicuíba/SP — Lavagem e Estética Automotiva',
  city:      'Carapicuíba/SP',
  address:   'Rua Beverly, 80 — Carapicuíba/SP',
  mapsUrl:   'https://maps.google.com/?q=Rua+Beverly+80+Carapicuiba+SP',
  phone:     '(11) 9 5857-8417',
  whatsapp:  '5511958578417',
  hours:     'Ter–Sex 7h–17h · Sáb–Dom 7h–19h',
  stats: [
    { num: '500+',  label: 'Clientes' },
    { num: '4.9★', label: 'Avaliação' },
    { num: '5 anos', label: 'Experiência' },
  ],
}

// Monta link do WhatsApp com mensagem pré-definida
export function waLink(msg = 'Olá! Gostaria de agendar um serviço.') {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`
}

export function getStatus() {
  const now  = new Date()
  const hour = now.getHours()
  const day  = now.getDay() // 0=Dom, 1=Seg, 2=Ter ... 6=Sáb

  const isMon    = day === 1
  const isWeekday = day >= 2 && day <= 5  // Ter–Sex
  const isWeekend = day === 0 || day === 6 // Sáb–Dom

  let isOpen = false
  if (isWeekday) isOpen = hour >= 7 && hour < 17
  if (isWeekend) isOpen = hour >= 7 && hour < 19
  // Segunda fechado o dia todo

  return isOpen
    ? { text: `Aberto agora · ${BUSINESS.city}`, color: '#22c55e' }
    : { text: 'Fechado agora · Abre às 7h',      color: '#ef4444' }
}