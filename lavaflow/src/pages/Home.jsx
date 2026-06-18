import Header   from '../components/Header/Header.jsx'
import Hero     from '../components/Hero/Hero.jsx'
import Services from '../components/Services/Services.jsx'
import Reviews  from '../components/Reviews/Reviews.jsx'
import Contact  from '../components/Contact/Contact.jsx'
import Footer   from '../components/Footer/Footer.jsx'

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home
