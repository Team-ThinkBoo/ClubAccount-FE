import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  let classes =
    "w-[272px] md:w-[312px] h-[41px] gap-1 px-4 border body-med-14 text-gray-01 rounded-xl border-gray-05 focus:outline-0";
  if (className) {
    classes += ` ${className}`;
  }

  return <input autoFocus={false} className={classes} {...props} />;
};

export default Input;
