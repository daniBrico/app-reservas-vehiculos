import type { JSX } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MakeReservation from './pages/ReservationPage'
import VehicleFleerPage from './pages/VehicleFleetPage'

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <main className="w-full flex-grow">
        <Routes>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/generar-reserva" element={<MakeReservation />} />
          <Route path="/flota-vehiculos" element={<VehicleFleerPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
