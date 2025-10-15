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
      if (
        ref?.current &&
        !ref?.current.contains(e.target as Node) &&
        !isThisRef?.current?.contains(e.target as Node)
      ) {
        if (e.target === null) {
          onClose()
          return
        }

        onClose(e.target as Node)
      }
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
