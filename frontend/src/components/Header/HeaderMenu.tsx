import classNames from 'classnames'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import WorldSVG from '../svg-components/WorldSVG'
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside'
import useCloseOnScroll from '@/hooks/useCloseOnScroll'

interface HeaderMenuProps {
  burgerDivRef: React.RefObject<HTMLDivElement | null>
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMenuOpen: boolean
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  burgerDivRef,
  setMenuIsOpen,
  isMenuOpen
}) => {
  const menuRef = useRef<HTMLOListElement>(null)

  useCloseOnClickOutside({
    isOpen: isMenuOpen,
    onClose: () => setMenuIsOpen(false),
    ref: burgerDivRef
  })

  useCloseOnScroll({
    isOpen: isMenuOpen,
    onClose: () => setMenuIsOpen(false)
  })

  const olHandleClick = (): void => setMenuIsOpen(false)

  return (
    <ol
      className={classNames(
        'absolute top-full right-0 h-[calc(100dvh-120px)] w-62 bg-amber-900 text-white transition-all duration-300 ease-in-out [&_li]:cursor-pointer [&_li]:px-8 [&_li]:py-4 [&_li]:text-xl [&_li]:font-bold [&_li]:tracking-wide [&_li]:hover:bg-amber-800',
        {
          'invisible translate-x-full opacity-0': !isMenuOpen,
          'translate-x-0': isMenuOpen
        }
      )}
      ref={menuRef}
      onClick={olHandleClick}
    >
      <li>
        <Link to="/inicio">Inicio</Link>
      </li>
      <li>
        <Link to="/generar-reserva">Rentar vehículo</Link>
      </li>
      <li>
        <Link to="/flota-vehiculos">Flota de vehículos</Link>
      </li>
      <li>Sucursales</li>
      <li>Beneficios</li>
      <li>Autos usados</li>
      <li className="flex gap-2">
        <div className="w-8">
          <WorldSVG />
        </div>
        <p>es/en</p>
      </li>
    </ol>
  )
}

export default HeaderMenu
