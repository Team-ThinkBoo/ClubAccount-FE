import { InputHTMLAttributes } from "react";

const AuthInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="w-[272px] h-11 px-4 py-3 rounded-lg text-gray-01 bg-warm-gray-03 body-med-14 focus:outline-0 placeholder:text-gray-03 lg:w-[312px]"
      type="text"
      {...props}
      required
    />
  );
};

export default AuthInput;
