import { useState, type JSX } from 'react'
import BurgerMenu from './svg-components/BurgerMenu'
import logo from '../assets/the-be-sharps.png'
import WorldSVG from './svg-components/WorldSVG'
import classNames from 'classnames'
import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleOpenCloseMenu = (): void => setMenuIsOpen(!menuIsOpen)

  return (
    <header className="relative flex items-center justify-between bg-amber-400 px-16 shadow-lg shadow-amber-600">
      <div className="flex items-center justify-center gap-2">
        <img
          className="w-30 cursor-pointer"
          src={logo}
          alt="Los Borbotones logo"
        />
      </div>
      <div
        className="w-10 cursor-pointer text-white"
        onClick={handleOpenCloseMenu}
      >
        <BurgerMenu />
      </div>
      <ol
        className={classNames(
          'absolute top-full right-0 h-dvh w-62 bg-amber-900 text-white transition-all duration-300 ease-in-out',
          {
            'translate-x-full': menuIsOpen,
            'translate-x-0': !menuIsOpen
          }
        )}
      >
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          <Link to="/login">Iniciar sesión</Link>
        </li>
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          Rentar un auto
        </li>
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          Flota de autos
        </li>
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          Sucursales
        </li>
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          Beneficios
        </li>
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          Autos usados
        </li>
        <li className="flex cursor-pointer gap-2 px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          <div className="w-8">
            <WorldSVG />
          </div>
          <p>es/en</p>
        </li>
      </ol>
    </header>
  )
}

export default Header
