import { InputHTMLAttributes } from "react";

const AuthInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="w-full px-4 py-3 rounded-lg text-gray-03 bg-warm-gray-03 body-med-14 focus:outline-0"
      type="text"
      {...props}
    />
  );
};

export default AuthInput;
