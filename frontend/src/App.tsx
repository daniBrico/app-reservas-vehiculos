import { useEffect, useState, type JSX } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import MakeReservation from './pages/ReservationPage'
import VehicleFleerPage from './pages/VehicleFleetPage'
import LoginUser from './components/LoginUser'
import { UserProfilePage } from './pages/UserProfilePage'
import type { UserInfo } from './types/types'

function App(): JSX.Element {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')

    if (storedUser) setUserInfo(JSON.parse(storedUser))
  }, [])

  const handleOnLogout = (): void => {
    setUserInfo(null)
  }

  return (
    <Router>
      <Header
        onLoginClick={() => setIsLoginOpen(true)}
        userInfo={userInfo}
        onLogout={handleOnLogout}
      />
      <main className="w-full flex-grow">
        <Routes>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/generar-reserva" element={<MakeReservation />} />
          <Route path="/flota-vehiculos" element={<VehicleFleerPage />} />
          <Route path="/perfil" element={<UserProfilePage />} />
        </Routes>
      </main>
      <Footer />
      {isLoginOpen && (
        <LoginUser
          onClose={() => setIsLoginOpen(false)}
          isLoginOpen={isLoginOpen}
        />
      )}
    </Router>
  )
}

export default App
