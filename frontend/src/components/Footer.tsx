import { Link } from 'react-router-dom'
import logo from '../assets/the-be-sharps.png'
import WorldSVG from './svg-components/WorldSVG'

const Footer = () => {
  return (
    <footer className="bg-amber-400 text-amber-950 mt-16 shadow-lg shadow-amber-600">
      <div className="max-w-6xl mx-auto px-16 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo y descripción */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Los Borbotones logo" className="w-36 mb-3" />
          <p className="text-sm font-bold tracking-wide">
            © {new Date().getFullYear()} Los Borbotones. Todos los derechos reservados.
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="text-lg font-bold mb-3 tracking-wide">Enlaces</h3>
          <ul className="space-y-2 font-bold tracking-wide">
            <li>
              <Link to="/login" className="hover:text-amber-800 transition">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-amber-800 transition">
                Nuestros autos
              </Link>
            </li>
          </ul>
        </div>

        {/* Configuración */}
        <div>
          <h3 className="text-lg font-bold mb-3 tracking-wide">Configuración</h3>
          <div className="flex items-center gap-2 cursor-pointer hover:text-amber-800 transition">
            <div className="w-8">
              <WorldSVG />
            </div>
            <p className="font-bold tracking-wide">es / en</p>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-bold mb-3 tracking-wide">Contacto</h3>
          <ul className="space-y-2 font-bold tracking-wide">
            <li className="flex items-center gap-2">
              📞 <span>+54 9 11 4567-8901</span>
            </li>
            <li className="flex items-center gap-2">
              ✉️ <span>contacto@losborbotones.com</span>
            </li>
            <li className="flex items-center gap-2">
              📍 <span>San Martin 742, Bahia Blanca</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
