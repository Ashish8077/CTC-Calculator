import { type ReactNode, type ButtonHTMLAttributes, forwardRef, type Ref, } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  children: ReactNode,
}

const Button = forwardRef(({ className, children, ...rest }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  return <button className={`${className}`} ref={ref} {...rest}>{children}</button>
});

Button.displayName = "Button"


export default Button;
