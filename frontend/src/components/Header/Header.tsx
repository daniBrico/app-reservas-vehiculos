import { useRef, useEffect, useState } from 'react'
import BurgerMenuSvg from '../svg-components/BurgerMenuSvg'
import logo from '../../assets/the-be-sharps.png'
import { Link } from 'react-router-dom'
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
        <BurgerMenuSvg />
      </div>
      <HeaderMenu
        burgerDivRef={burgerDivRef}
        onLoginClick={onLoginClick}
        setMenuIsOpen={setMenuIsOpen}
        isMenuOpen={isMenuOpen}
        user={user}
        setUser={setUser}
      />
    </header>
  )
}

export default Header
