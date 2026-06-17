import './App.css'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Services from './components/Services/Services.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import Reviews from './components/Reviews/Reviews.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Contact />
        <Reviews/>
      </main>
      <Footer />
    </>
  )
}

export default App
