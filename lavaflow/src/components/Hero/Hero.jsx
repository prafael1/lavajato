import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="inicio">

      <div className="hero-content">

        <h1>
          Seu carro limpo, protegido e com aparência de novo
        </h1>

        <p>
          Lavagem profissional, higienização interna e estética
          automotiva para quem valoriza seu veículo.
        </p>

        <div className="hero-buttons">

          <button className="btn-primary">
            Solicitar Orçamento
          </button>

          <button className="btn-secondary">
            Chamar no WhatsApp
          </button>

        </div>

      </div>

      <div className="hero-image">
        <img
          src="/carro.webp"
          alt="Carro"
        />
      </div>

    </section>
  );
}

export default Hero;