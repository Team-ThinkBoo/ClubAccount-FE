import { ReactNode } from "react";
import AuthInput from "./AuthInput";

interface AuthActionInputProps {
  buttonText: ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const AuthActionInput = ({ buttonText, buttonProps, inputProps }: AuthActionInputProps) => {
  return (
    <div className="flex gap-2 w-[272px] md:w-[312px]">
      <AuthInput type="text" {...inputProps} />
      <button
        className="w-20 px-4 py-3 rounded-lg shrink-0 text-primary-var1 bg-primary-var2 caption-med-12 whitespace-nowrap"
        {...buttonProps}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AuthActionInput;
