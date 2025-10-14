/* import type { JSX } from 'react'
import './App.css'
import Header from './components/Header'

function App(): JSX.Element {
  return <Header />
}

export default App 

*/

import type { JSX } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/login'

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  )
}

export default App

