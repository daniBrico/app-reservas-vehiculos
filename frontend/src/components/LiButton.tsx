import type { ReactNode } from 'react'

interface LiButtonsProps {
  cssClasses: string
  handleClick?: () => void
  content?: string
  link?: ReactNode
}

const LiButton: React.FC<LiButtonsProps> = ({
  cssClasses,
  handleClick,
  content,
  link
}) => {
  return (
    <li
      className={`cursor-pointer rounded-md p-2 text-xl font-bold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-amber-300 hover:text-amber-800 ${cssClasses}`}
      onClick={handleClick}
    >
      {link ? link : content}
    </li>
  )
}

export default LiButton
