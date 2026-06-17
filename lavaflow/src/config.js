// ============================================================
// CONFIG — Edite aqui para atualizar todo o site de uma vez
// ============================================================

export const BUSINESS = {
  name:      'LAVA RÁPIDO DO GUI',
  tagline:   'Lava-Jato em Cotia/SP — Lavagem e Estética Automotiva',
  city:      'Cotia/SP',
  address:   'Rua Exemplo, 123 — Cotia/SP',
  mapsUrl:   'https://maps.google.com/?q=Rua+Exemplo+123+Cotia+SP',
  phone:     '(11) 9 95857-8417',
  whatsapp:  '5511958578417',       // só números, com DDI
  hours:     'Segunda a Sábado, 8h–18h',
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
