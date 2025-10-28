import type { ReactNode } from 'react'

interface LiButtonsProps {
  cssClasess: string
  handleClick?: () => void
  content?: string
  link?: ReactNode
}

const LiButton: React.FC<LiButtonsProps> = ({
  cssClasess,
  handleClick,
  content,
  link
}) => {
  return (
    <li
      className={`cursor-pointer rounded-md p-2 text-xl font-medium tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-amber-300 hover:text-amber-800 ${cssClasess}`}
      onClick={handleClick}
    >
      {link ? link : content}
    </li>
  )
}

export default LiButton
