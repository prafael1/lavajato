import "./Services.css";

function Services() {
  const services = [
    {
      id: 1,
      title: "Lavagem Simples",
      description: "Limpeza externa rápida para manter seu veículo sempre bonito.",
      price: "A partir de R$ 30",
      icon: "🚗",
    },
    {
      id: 2,
      title: "Lavagem Completa",
      description: "Limpeza interna e externa com acabamento detalhado.",
      price: "A partir de R$ 50",
      icon: "🚙",
    },
    {
      id: 3,
      title: "Polimento",
      description: "Remoção de pequenos riscos e recuperação do brilho.",
      price: "A partir de R$ 150",
      icon: "✨",
    },
    {
      id: 4,
      title: "Vitrificação",
      description: "Proteção duradoura da pintura com efeito espelhado.",
      price: "A partir de R$ 500",
      icon: "🛡️",
    },
    {
      id: 5,
      title: "Higienização",
      description: "Limpeza profunda de bancos, carpetes e painel.",
      price: "A partir de R$ 120",
      icon: "🧼",
    },
    {
      id: 6,
      title: "Motor",
      description: "Limpeza segura do compartimento do motor.",
      price: "A partir de R$ 80",
      icon: "🔧",
    },
  ];

  return (
    <section className="services" id="servicos">
      <div className="services-header">
        <h2>Nossos Serviços</h2>
        <p>
          Soluções completas para deixar seu veículo impecável.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <span className="service-icon">
              {service.icon}
            </span>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <strong>{service.price}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;