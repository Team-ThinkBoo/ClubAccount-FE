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
      {!inputProps?.disabled && <AuthInput type="text" {...inputProps} />}
      {inputProps?.disabled && (
        <div className="w-[272px] md:w-[312px] h-11 px-4 py-3 rounded-lg text-gray-01 bg-gray-03/20 body-med-14 focus:outline-0 placeholder:text-gray-03 lg:w-[312px]">
          {inputProps.value}
        </div>
      )}
      <button
        className="px-4 py-3 rounded-lg min-w-14 max-w-[74px] shrink-0 text-primary-var1 bg-primary-var2 caption-med-12 whitespace-nowrap"
        {...buttonProps}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AuthActionInput;
