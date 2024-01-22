import React, { ButtonHTMLAttributes } from 'react'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary",
}

const Button = ({ variant, children, ...props }: CustomButtonProps) => {

  return (
    <button type={props.type || "submit"} className={`${variant}-button ${props.className}`} {...props}>
      {children}
    </button>
  )
}

export default Button;
