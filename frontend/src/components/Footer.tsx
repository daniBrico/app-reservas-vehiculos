import { Link } from 'react-router-dom'
import logo from '../assets/the-be-sharps.png'
import type { JSX } from 'react'

const Footer = (): JSX.Element => {
  return (
    <footer className="shadow-top text bg-amber-400 px-16 text-amber-950 shadow-md shadow-amber-600">
      <div className="flex justify-between py-8">
        {/* Logo y descripción */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Los Borbotones logo" className="mb-3 w-24" />
          <p className="text-sm font-bold tracking-wide">
            © {new Date().getFullYear()} Los Borbotones <br /> Todos los
            derechos reservados
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <ul className="space-y-2 font-bold tracking-wide">
            <li>
              <Link to="#" className="transition hover:text-amber-800">
                Flota de autos
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
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
