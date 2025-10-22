import { Link } from 'react-router-dom'
import logo from '../assets/the-be-sharps.png'
import WorldSVG from './svg-components/WorldSVG'

const Footer = () => {
  return (
    <footer className="bg-amber-400 text-amber-950 mt-16 shadow-inner shadow-amber-700">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo y descripción */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Los Borbotones logo" className="w-40 mb-3" />
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} Los Borbotones. Todos los derechos
            reservados.
          </p>
        </div>
    
        {/* Enlaces */}
        <div>
          <h3 className="text-lg font-bold mb-3">Enlaces</h3>
          <ul className="space-y-2 font-semibold">
            <li>
              <Link to="/login" className="hover:text-amber-800 transition">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-amber-800 transition">
                Flota de autos
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-amber-800 transition">
                Beneficios
              </Link>
            </li>
          </ul>
        </div>

        {/* Idioma y redes */}
        <div>
          <h3 className="text-lg font-bold mb-3">Configuración</h3>
          <div className="flex items-center gap-2 cursor-pointer hover:text-amber-800 transition">
            <div className="w-6">
              <WorldSVG />
            </div>
            <p className="font-semibold">es / en</p>
          </div>

          <div className="mt-4 flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-amber-800 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-amber-800 transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-amber-800 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer