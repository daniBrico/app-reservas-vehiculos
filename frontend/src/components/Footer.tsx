import { Link } from 'react-router-dom'
import logo from '../assets/the-be-sharps.png'
import WorldSVG from './svg-components/WorldSVG'
import type { JSX } from 'react'

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-amber-400 px-16 text-amber-950 shadow-lg shadow-amber-600">
      <div className="grid grid-cols-1 gap-2 py-8 md:grid-cols-4">
        {/* Logo y descripción */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Los Borbotones logo" className="mb-3 w-36" />
          <p className="text-sm font-bold tracking-wide">
            © {new Date().getFullYear()} Los Borbotones. Todos los derechos
            reservados.
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="mb-3 text-lg font-bold tracking-wide">Enlaces</h3>
          <ul className="space-y-2 font-bold tracking-wide">
            <li>
              <Link to="/login" className="transition hover:text-amber-800">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="#" className="transition hover:text-amber-800">
                Nuestros autos
              </Link>
            </li>
          </ul>
        </div>

        {/* Configuración */}
        <div>
          <h3 className="mb-3 text-lg font-bold tracking-wide">
            Configuración
          </h3>
          <div className="flex cursor-pointer items-center gap-2 transition hover:text-amber-800">
            <div className="w-8">
              <WorldSVG />
            </div>
            <p className="font-bold tracking-wide">es / en</p>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="mb-3 text-lg font-bold tracking-wide">Contacto</h3>
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
