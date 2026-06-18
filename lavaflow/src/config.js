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
  email:     'prafaelpb1@gmail.com',  // ← troque pelo email real
  hours:     'Ter–Sex 7h–17h · Sáb–Dom 7h–19h',
  stats: [
    { num: '500+',  label: 'Clientes' },
    { num: '4.9★', label: 'Avaliação' },
    { num: '5 anos', label: 'Experiência' },
  ],
}

// ============================================================
// SERVIÇOS — duração em minutos e regras de agendamento
// exclusivo: true  → bloqueia todo o período (ex: polimento)
// exclusivo: false → pode intercalar com outros serviços leves
// ============================================================
export const SERVICES = [
  {
    id: 1,
    icon: '🚿',
    title: 'Lavagem Simples',
    price: 'a partir de R$30',
    desc: 'Limpeza externa rápida e cuidadosa.',
    duration: 30,
    exclusivo: true,
  },
  {
    id: 2,
    icon: '🚙',
    title: 'Lavagem Completa',
    price: 'a partir de R$50',
    desc: 'Interna e externa com acabamento detalhado.',
    duration: 45,
    exclusivo: true,
    featured: true,
  },
  {
    id: 3,
    icon: '✨',
    title: 'Polimento',
    price: 'a partir de R$150',
    desc: 'Remove riscos e recupera o brilho da pintura.',
    duration: 90,
    exclusivo: true,
  },
  {
    id: 4,
    icon: '🛡️',
    title: 'Vitrificação',
    price: 'a partir de R$500',
    desc: 'Proteção duradoura com efeito espelhado.',
    duration: 90,
    exclusivo: true,
  },
  {
    id: 5,
    icon: '🧼',
    title: 'Higienização',
    price: 'a partir de R$120',
    desc: 'Limpeza profunda de bancos, carpetes e painel.',
    duration: 90,
    exclusivo: true,
  },
  {
    id: 6,
    icon: '🔧',
    title: 'Limpeza de Motor',
    price: 'a partir de R$80',
    desc: 'Limpeza segura do compartimento do motor.',
    duration: 60,
    exclusivo: true,
  },
  {
    id: 7,
    icon: '🛞',
    title: 'Limpeza de Chassi',
    price: 'a partir de R$80',
    desc: 'Limpeza do chassi e parte inferior do veículo.',
    duration: 60,
    exclusivo: true,
  },
]

// ============================================================
// HORÁRIOS DE FUNCIONAMENTO
// ============================================================
export const SCHEDULE = {
  // 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sáb
  weekdays: { days: [2, 3, 4, 5], open: 7, close: 17 }, // Ter–Sex
  weekend:  { days: [0, 6],       open: 7, close: 19 }, // Sáb–Dom
  // Segunda (1) fechado — não listado
}

// Gera slots de horário disponíveis para uma data
// Recebe agendamentos já existentes e duração do serviço escolhido
export function getAvailableSlots(dateStr, existingBookings, serviceDuration) {
  const date      = new Date(dateStr)
  const dayOfWeek = date.getDay()

  let open = null, close = null
  if (SCHEDULE.weekdays.days.includes(dayOfWeek)) {
    open = SCHEDULE.weekdays.open; close = SCHEDULE.weekdays.close
  } else if (SCHEDULE.weekend.days.includes(dayOfWeek)) {
    open = SCHEDULE.weekend.open; close = SCHEDULE.weekend.close
  }
  if (open === null) return []

  // Gera todos os slots de 30 em 30 min
  const slots = []
  for (let h = open; h < close; h++) {
    for (let m = 0; m < 60; m += 30) {
      const totalMin = h * 60 + m
      if (totalMin + serviceDuration > close * 60) break
      slots.push(totalMin)
    }
  }

  // Filtra agendamentos do dia
  const bookingsOfDay = existingBookings.filter(b => b.date === dateStr)

  return slots.filter(slotMin => {
    const slotEnd = slotMin + serviceDuration

    return !bookingsOfDay.some(b => {
      const bStart = b.startMin
      const bEnd   = b.startMin + b.duration

      // Verifica sobreposição de horário
      const hasOverlap = slotMin < bEnd && slotEnd > bStart
      if (!hasOverlap) return false

      // Serviço novo É exclusivo → bloqueia qualquer sobreposição
      // Serviço existente É exclusivo → bloqueia qualquer sobreposição
      // Ambos NÃO exclusivos → permite (intercala)
      const newService      = SERVICES.find(s => s.duration === serviceDuration)
      const newIsExclusivo  = newService?.exclusivo ?? true
      const existIsExclusivo = b.exclusivo ?? true

      return newIsExclusivo || existIsExclusivo
    })
  }).map(min => {
    const h = Math.floor(min / 60).toString().padStart(2, '0')
    const m = (min % 60).toString().padStart(2, '0')
    return { label: `${h}:${m}`, min }
  })
}

// Formata mensagem de notificação para o Gui no WhatsApp
export function bookingWaMsg(booking, service) {
  return `🔔 *Novo Agendamento!*\n\n` +
    `👤 Cliente: ${booking.name}\n` +
    `📱 Telefone: ${booking.phone}\n` +
    `🚗 Serviço: ${service.title}\n` +
    `📅 Data: ${booking.date}\n` +
    `🕐 Horário: ${booking.time}\n` +
    `⏱ Duração: ${service.duration} min\n\n` +
    `Responda para confirmar ou entrar em contato.`
}

// Monta link do WhatsApp com mensagem pré-definida
export function waLink(msg = 'Olá! Gostaria de agendar um serviço.') {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`
}

// Status de funcionamento em tempo real
export function getStatus() {
  const now  = new Date()
  const hour = now.getHours()
  const day  = now.getDay()

  const isWeekday = SCHEDULE.weekdays.days.includes(day)
  const isWeekend = SCHEDULE.weekend.days.includes(day)

  let isOpen = false
  if (isWeekday) isOpen = hour >= SCHEDULE.weekdays.open && hour < SCHEDULE.weekdays.close
  if (isWeekend) isOpen = hour >= SCHEDULE.weekend.open  && hour < SCHEDULE.weekend.close

  return isOpen
    ? { text: `Aberto agora · ${BUSINESS.city}`, color: '#22c55e' }
    : { text: 'Fechado agora · Abre às 7h',      color: '#ef4444' }
}
