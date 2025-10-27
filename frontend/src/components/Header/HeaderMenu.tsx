import useCloseOnScrollOrClickOutside from '@/hooks/useCloseOnScrollOrClickOutside'
import classNames from 'classnames'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import WorldSVG from '../svg-components/WorldSVG'

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

  useCloseOnScrollOrClickOutside({
    isOpen: isMenuOpen,
    onClose: () => setMenuIsOpen(false),
    ref: menuRef,
    isThisRef: burgerDivRef
  })

  const olHandleClick = (): void => setMenuIsOpen(false)

  return (
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
  )
}

export default HeaderMenu
