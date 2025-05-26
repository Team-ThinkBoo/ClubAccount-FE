import { ChangeEvent, useState } from "react";
import AuthActionInput from "./AuthActionInput";
import InputAndError from "./InputAndError";
import { useMutation } from "@tanstack/react-query";
import { UserType } from "../../types/user";
import { FetchErrorType } from "../../types/types";
import {
  checkDuplicateId,
  checkValidId,
  checkVerificationEmail,
  sendVerificationEmail
} from "../../utils/signup";
import { SignupErrorType, SignupType, VerifyCodeType, VerifyResponseType } from "../../types/auth";
import { useValidator } from "../../hooks/useValidator";
import { authIdSchema } from "../../utils/schemas";

interface EmailVerificationInputProps {
  data: SignupType;
  errors: Partial<SignupErrorType>;
  mode?: "signup" | "changePW";
  onChange: (key: keyof SignupType, e: ChangeEvent<HTMLInputElement>) => void;
  onSuccess: (success: boolean) => void;
}

const EmailVerificationInput = ({
  data,
  errors,
  mode = "signup",
  onSuccess,
  onChange
}: EmailVerificationInputProps) => {
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);

  const { validateAndRun } = useValidator<SignupErrorType>();

  const { mutate: checkEmailMutation } = useMutation<
    UserType["email"],
    FetchErrorType,
    UserType["email"]
  >({
    mutationFn: mode === "signup" ? checkDuplicateId : checkValidId,
    onSuccess: (data) => {
      verifyEmailMutation(data);
      alert("이메일 인증 코드가 전송되었습니다!");
      setVerificationSent(true);
    },
    onError: (err) => {
      console.error("이메일 중복 확인 실패:", err);
      alert(`${err.info?.message}`);
    }
  });

  const { mutate: verifyEmailMutation } = useMutation<unknown, FetchErrorType, UserType["email"]>({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {},
    onError: (err) => {
      console.error("이메일 인증 실패:", err);
      alert("이메일 인증 요청에 실패했습니다.");
    }
  });

  const { mutate: checkVerifyEmailMutation } = useMutation<
    VerifyResponseType,
    FetchErrorType,
    VerifyCodeType
  >({
    mutationFn: checkVerificationEmail,
    onSuccess: (data) => {
      if (data.success) {
        alert("인증이 완료되었습니다!");
        onSuccess(true);
        setEmailInputDisabled(true);
      } else {
        alert("인증번호가 잘못되었습니다!");
        onSuccess(false);
      }
    },
    onError: (err) => {
      console.error("이메일 인증 실패:", err);
      alert("이메일 인증에 실패했습니다.");
    }
  });

  function handleVerificationEmail() {
    validateAndRun(authIdSchema, data, (data) => {
      checkEmailMutation(data.authId);
    });
  }

  function handleCheckVerificationEmail() {
    checkVerifyEmailMutation({ email: data.authId, code: verificationCode });
  }

  return (
    <>
      <InputAndError
        Input={
          <AuthActionInput
            buttonText="인증하기"
            inputProps={{
              disabled: emailInputDisabled,
              placeholder: "이메일",
              type: "email",
              name: "authId",
              value: data.authId,
              onChange: (e) => onChange("authId", e)
            }}
            buttonProps={{
              disabled: emailInputDisabled,
              type: "button",
              onClick: handleVerificationEmail
            }}
          />
        }
        errors={errors.authId}
      />

      {verificationSent && (
        <AuthActionInput
          buttonText="확인"
          inputProps={{
            placeholder: "인증번호",
            value: verificationCode,
            onChange: (e) => setVerificationCode(e.target.value),
            disabled: emailInputDisabled
          }}
          buttonProps={{ disabled: emailInputDisabled, onClick: handleCheckVerificationEmail }}
        />
      )}
    </>
  );
};

export default EmailVerificationInput;
