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

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Navigate to="/inicio" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inicio" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
