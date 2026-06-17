import { RiMapPin2Line, RiWhatsappLine, RiTimeLine } from 'react-icons/ri'
import { BUSINESS, waLink } from '../../config'
import './Contact.css'

function Contact() {
  const INFO = [
    {
      icon: <RiMapPin2Line size={20} />,
      label: 'Endereço',
      value: BUSINESS.address,
      href: BUSINESS.mapsUrl,
    },
    {
      icon: <RiWhatsappLine size={20} />,
      label: 'WhatsApp',
      value: BUSINESS.phone,
      href: waLink(),
    },
    {
      icon: <RiTimeLine size={20} />,
      label: 'Horário',
      value: BUSINESS.hours,
      href: null,
    },
  ]

  return (
    <section className="contact" id="contato">

      <div className="contact__header">
        <span className="contact__eyebrow">onde estamos</span>
        <h2 className="contact__title">Como nos encontrar</h2>
      </div>

      <div className="contact__list">
        {INFO.map(item => (
          <div key={item.label} className="contact__item">
            <div className="contact__icon">{item.icon}</div>
            <div className="contact__info">
              <span className="contact__info-label">{item.label}</span>
              {item.href
                ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="contact__info-value contact__info-value--link">{item.value}</a>
                : <span className="contact__info-value">{item.value}</span>
              }
            </div>
          </div>
        ))}
      </div>

      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="contact__btn"
      >
        <RiWhatsappLine size={20} />
        Agendar agora pelo WhatsApp
      </a>

    </section>
  )
}

export default Contact
