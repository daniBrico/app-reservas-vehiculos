import { useRef, useEffect, useState } from 'react'
import BurgerMenuSvg from '../svg-components/BurgerMenuSvg'
import logo from '../../assets/the-be-sharps.png'
import { Link } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
import UserSvg from '../svg-components/UserSvg'

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
      <div className="flex items-center gap-4">
        {user && (
          <>
            <ol className="flex items-center gap-2">
              <li className="flex items-center gap-2">
                <div className="w-8 stroke-white">
                  <UserSvg />
                </div>
                <div className="cursor-pointer text-xl font-medium tracking-wide text-white">
                  {user.full_name}
                </div>
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
          </>
        )}
        <div
          className="w-10 cursor-pointer text-white"
          ref={burgerDivRef}
          onClick={(e) => handleOpenCloseMenu(e)}
        >
          <BurgerMenuSvg />
        </div>
      </div>
      <HeaderMenu
        burgerDivRef={burgerDivRef}
        onLoginClick={onLoginClick}
        setMenuIsOpen={setMenuIsOpen}
        isMenuOpen={isMenuOpen}
        user={user}
      />
    </header>
  )
}

export default Header
