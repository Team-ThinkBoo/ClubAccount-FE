import InputAndError from "./InputAndError";
import AuthInput from "./AuthInput";
import SignupInputError from "./SignupInputError";
import { SignupErrorType, SignupType } from "../../types/auth";
import { ChangeEvent } from "react";

interface PasswordWithConfirmProps {
  errors: Partial<SignupErrorType>;
  onChange: (key: keyof SignupType, e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordWithConfirm = ({ errors, onChange }: PasswordWithConfirmProps) => {
  return (
    <>
      <InputAndError
        Input={
          <AuthInput
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={(e) => onChange("password", e)}
          />
        }
        errors={errors.password}
        fallbackHint={
          <SignupInputError color="gray">
            문자, 숫자, 특수문자(!@#$%^&*) 포함 8자리 이상
          </SignupInputError>
        }
      />

      <InputAndError
        Input={
          <AuthInput
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            onChange={(e) => onChange("passwordCheck", e)}
          />
        }
        errors={errors.passwordCheck}
      />
    </>
  );
};

export default PasswordWithConfirm;
