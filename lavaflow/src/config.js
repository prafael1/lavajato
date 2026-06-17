// ============================================================
// CONFIG — Edite aqui para atualizar todo o site de uma vez
// ============================================================

export const BUSINESS = {
  name:      'LAVA RÁPIDO DO GUI',
  tagline:   'Lava-Jato em Carapicuiba/SP — Lavagem e Estética Automotiva',
  city:      'Carapicuiba/SP',
  address:   'Rua Beverly, 80 —   Carapicuiba/SP',
  mapsUrl:   'https://maps.google.com/?q=Rua Beverly, 80 Carapicuiba/SP',
  phone:     '(11) 9 95857-8417',
  whatsapp:  '5511958578417',       // só números, com DDI
  hours:     'Terça a Sexta, 7h–17h e Sábado e Domingo, 7h–19h',
  stats: [
    { num: '500+',   label: 'Clientes' },
    { num: '4.9★',  label: 'Avaliação' },
    { num: '5 anos', label: 'Experiência' },
  ],
}

// Monta link do WhatsApp com mensagem pré-definida
export function waLink(msg = 'Olá! Gostaria de agendar um serviço.') {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`
}
