import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home        from './pages/Home.jsx'
import BookingPage from './pages/BookingPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/agendamento" element={<BookingPage />} />
    </Routes>
  )
}

export default App
