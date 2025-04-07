import { ReactNode } from "react";

interface SignupInputErrorProps {
  children: ReactNode;
  color?: "red" | "gray";
}

const SignupInputError = ({ children, color = "red" }: SignupInputErrorProps) => {
  let className;
  if (color === "red") {
    className = "w-[272px] md:w-[312px] text-red-500 caption-med-12";
  } else {
    className = "caption-med-12 text-gray-03";
  }
  return <p className={className}>{children}</p>;
};

export default SignupInputError;
