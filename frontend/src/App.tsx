import { useState, type JSX } from 'react'
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
import ReservationPage from './pages/ReservationPage'
import VehicleFleerPage from './pages/VehicleFleetPage'
import LoginUser from './components/LoginUser'
import UserProfilePage from './pages/UserProfilePage'
// import type { UserLoginInfo } from './types/types'
import AuthProvider from './context/AuthContext'

function App(): JSX.Element {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  // const [UserLoginInfo, setUserInfo] = useState<UserLoginInfo | null>(null)

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('UserLoginInfo')

  //   if (storedUser) setUserInfo(JSON.parse(storedUser))
  // }, [])

  const handleOnLogout = (): void => {
    // setUserInfo(null)
  }

  return (
    <AuthProvider>
      <Router>
        <Header
          onLoginClick={() => setIsLoginOpen(true)}
          onLogout={handleOnLogout}
        />
        <main className="w-full flex-grow">
          <Routes>
            <Route index element={<Navigate to="/inicio" replace />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/inicio" element={<HomePage />} />
            <Route path="/generar-reserva" element={<ReservationPage />} />
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
    </AuthProvider>
  )
}

export default App
