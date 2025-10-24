import { useEffect } from 'react'

interface UseProps {
  isOpen: boolean
  onClose: (currentTarget?: Node) => void
  ref: React.RefObject<HTMLElement | null>
  isThisRef: React.RefObject<HTMLDivElement | null>
}

const useCloseOnScrollOrClickOutside = ({
  isOpen,
  onClose,
  ref,
  isThisRef
}: UseProps): void => {
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = (): void => onClose()

    const handleOutsideClick = (e: MouseEvent): void => {
      const target = e.target as Node | null
      const element = ref?.current
      const excluded = isThisRef?.current

      // No hay referencias validas
      if (!element || !target) return

      const clickedOutside =
        !element.contains(target) && !excluded?.contains(target)

      if (!clickedOutside) return

      onClose(target)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    window.addEventListener('scroll', handleScroll)

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])
}

export default useCloseOnScrollOrClickOutside
