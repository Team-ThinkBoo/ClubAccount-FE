import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  const { disabled } = props;
  let classes =
    "w-[272px] h-12 flex justify-center items-center md:w-[312px] body-bold-16 px-4 rounded-lg";
  if (disabled) {
    classes += " bg-white text-gray-03 border border-gray-04";
  } else {
    classes += " bg-primary text-gray-01";
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
