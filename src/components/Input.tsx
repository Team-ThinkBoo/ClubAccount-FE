import { InputHTMLAttributes } from "react";

const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      autoFocus={false}
      className="w-[272px] md:w-[312px] h-[41px] gap-1 px-4 border body-med-14 text-gray-01 rounded-xl border-gray-05 focus:outline-0"
      {...props}
    />
  );
};

export default Input;
