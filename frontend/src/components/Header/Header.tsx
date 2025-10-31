import { useRef, useState } from 'react'
import BurgerMenuSvg from '../svg-components/BurgerMenuSvg'
import logo from '../../assets/the-be-sharps.png'
import { Link } from 'react-router-dom'
import UserSvg from '../svg-components/UserSvg'
import HeaderMenu from './HeaderMenu.tsx'
import LiButton from '../LiButton'
import { useAuthContext } from '@/hooks/useAuthContext.ts'

interface HeaderProps {
  onLoginClick: () => void
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onLogout }) => {
  const [isMenuOpen, setMenuIsOpen] = useState(false)
  const burgerDivRef = useRef<HTMLDivElement>(null)

  const { user } = useAuthContext()

  const handleOpenCloseMenu = (): void => {
    setMenuIsOpen(!isMenuOpen)
  }

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('UserLoginInfo')
    onLogout()
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
        <ol className="flex items-center gap-2">
          {user === null ? (
            <>
              <LiButton
                cssClasses="hover:scale-105"
                handleClick={onLoginClick}
                content="Iniciar sesión"
              />
              <div className="px-2">
                <div className="h-5 w-0.5 bg-white" />
              </div>
              <LiButton
                cssClasses="hover:scale-105"
                content="Registrarse"
                link={<Link to="/register">Registrarse</Link>}
              />
            </>
          ) : (
            <>
              <LiButton
                cssClasses="hover:scale-105 group"
                link={
                  <Link className="flex items-center gap-2" to="/perfil">
                    <div className="w-8 stroke-white group-hover:stroke-amber-800">
                      <UserSvg />
                    </div>
                    <div className="text-xl font-bold text-white group-hover:text-amber-800">
                      {user.full_name}
                    </div>
                  </Link>
                }
              />
              <div className="px-2">
                <div className="h-5 w-0.5 bg-white" />
              </div>
              <LiButton
                cssClasses="hover:scale-110"
                handleClick={handleLogout}
                content="Salir"
              />
            </>
          )}
        </ol>
        <div
          className="w-10 cursor-pointer rounded-md p-0.5 text-white transition-all duration-300 hover:scale-110 hover:bg-amber-300 hover:text-amber-800"
          ref={burgerDivRef}
          onClick={handleOpenCloseMenu}
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
