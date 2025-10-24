import { useRef, useState, useEffect, type JSX } from 'react'
import BurgerMenu from './svg-components/BurgerMenu'
import logo from '../assets/the-be-sharps.png'
import WorldSVG from './svg-components/WorldSVG'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import useCloseOnScrollOrClickOutside from '../hooks/useCloseOnScrollOrClickOutside'

const Header = (): JSX.Element => {
  const [isMenuOpen, setMenuIsOpen] = useState(false)
  const [user, setUser] = useState<{ full_name: string } | null>(null)

  const menuRef = useRef<HTMLOListElement>(null)
  const burgerDivRef = useRef<HTMLDivElement>(null)

  const handleOpenCloseMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault()

    setMenuIsOpen(!isMenuOpen)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/inicio'
  }

  const olHandleClick = (): void => setMenuIsOpen(false)

  useCloseOnScrollOrClickOutside({
    isOpen: isMenuOpen,
    onClose: () => setMenuIsOpen(false),
    ref: menuRef,
    isThisRef: burgerDivRef
  })

  return (
    <header className="relative flex items-center justify-between bg-amber-400 px-16 shadow-lg shadow-amber-600">
      <div className="flex items-center justify-center gap-2">
        <Link to="/inicio">
          <img
            className="w-30 cursor-pointer"
            src={logo}
            alt="Los Borbotones logo"
          />
        </Link>
      </div>
      <div
        className="w-10 cursor-pointer text-white"
        onClick={(e) => handleOpenCloseMenu(e)}
        ref={burgerDivRef}
      >
        <BurgerMenu />
      </div>
      <ol
        className={classNames(
          'absolute top-full right-0 h-[calc(100dvh-120px)] w-62 bg-amber-900 text-white transition-all duration-300 ease-in-out',
          {
            'invisible translate-x-full opacity-0': !isMenuOpen,
            'translate-x-0': isMenuOpen
          }
        )}
        ref={menuRef}
        onClick={olHandleClick}
      >
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          <Link to="/inicio">Inicio</Link>
        </li>
        {!user ? (
          <>
            <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
              <Link to="/login">Iniciar sesión</Link>
            </li>
            <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        ) : (
          <>
            <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
              Bienvenido, {user.full_name}
            </li>
            <li
              className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800"
              onClick={handleLogout}
            >
              Salir
            </li>
          </>
        )}
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          <Link to="/generar-reserva">Rentar vehículo</Link>
        </li>
        <li className="cursor-pointer px-8 py-4 text-xl font-bold tracking-wide hover:bg-amber-800">
          <Link to="/flota-vehiculos">Flota de vehículos</Link>
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
