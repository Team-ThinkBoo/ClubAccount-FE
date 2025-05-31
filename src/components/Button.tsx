import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

const Button = ({ className, children, ...props }: ButtonProps) => {
  const { disabled } = props;

  return (
    <button
      className={cn(
        "w-[272px] h-12 flex justify-center items-center md:w-[312px] body-bold-16 px-4 rounded-lg",
        disabled && "bg-white text-gray-03 border border-gray-04",
        !disabled && "bg-primary text-gray-01",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
