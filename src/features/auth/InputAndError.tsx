import { ReactNode } from "react";
import SignupInputError from "./SignupInputError";

interface InputAndErrorProps {
  Input: ReactNode;
  errors?: { _errors: string[] };
  fallbackHint?: React.ReactNode;
}

const InputAndError = ({ Input, errors, fallbackHint }: InputAndErrorProps) => {
  return (
    <>
      {Input}
      {errors
        ? errors._errors.map((err) => <SignupInputError key={err}>{err}</SignupInputError>)
        : fallbackHint ?? null}
    </>
  );
};

export default InputAndError;
