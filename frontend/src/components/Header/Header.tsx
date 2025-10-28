import { useRef, useEffect, useState } from 'react'
import BurgerMenuSvg from '../svg-components/BurgerMenuSvg'
import logo from '../../assets/the-be-sharps.png'
import { Link } from 'react-router-dom'
import UserSvg from '../svg-components/UserSvg'
import HeaderMenu from './HeaderMenu'

interface HeaderProps {
  onLoginClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setMenuIsOpen] = useState(false)
  const [user, setUser] = useState<{ full_name: string } | null>(null)

  const burgerDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const handleOpenCloseMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault()

    setMenuIsOpen(!isMenuOpen)
  }

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/inicio'
  }

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
      <div className="flex items-center gap-2">
        {user === null ? (
          <ol className="flex items-center gap-2">
            <li
              className="cursor-pointer rounded-md p-2 text-xl font-medium tracking-wide text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-300 hover:text-amber-800"
              onClick={onLoginClick}
            >
              Iniciar sesión
            </li>
            <div className="px-2">
              <div className="h-5 w-0.5 bg-white" />
            </div>
            <li className="cursor-pointer rounded-md p-2 text-xl font-medium tracking-wide text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-300 hover:text-amber-800">
              <Link to="/register">Registrarse</Link>
            </li>
          </ol>
        ) : (
          <ol className="flex items-center gap-2">
            <li>
              <Link className="flex items-center gap-2" to="/perfil">
                <div className="w-8 stroke-white">
                  <UserSvg />
                </div>
                <div className="cursor-pointer text-xl font-medium tracking-wide text-white">
                  {user.full_name}
                </div>
              </Link>
            </li>
            <div className="px-2">
              <div className="h-5 w-0.5 bg-white" />
            </div>
            <li
              className="cursor-pointer text-xl font-medium tracking-wide text-white"
              onClick={handleLogout}
            >
              Salir
            </li>
          </ol>
        )}
        <div
          className="w-10 cursor-pointer rounded-md p-0.5 text-white transition-all duration-300 hover:scale-110 hover:bg-amber-300 hover:text-amber-800"
          ref={burgerDivRef}
          onClick={(e) => handleOpenCloseMenu(e)}
        >
          <BurgerMenuSvg />
        </div>
      </div>
      <HeaderMenu
        burgerDivRef={burgerDivRef}
        setMenuIsOpen={setMenuIsOpen}
        isMenuOpen={isMenuOpen}
      />
    </header>
  )
}

export default Header
