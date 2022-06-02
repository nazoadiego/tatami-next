import { FC } from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler
}

const Button: FC<ButtonProps> = ({ children, ...otherProps }) => {
  return (
    <button
      className="rounded-lg
      bg-yellow-400 px-4 py-6"
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button
