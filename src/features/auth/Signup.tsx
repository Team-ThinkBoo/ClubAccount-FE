import { useMutation } from "@tanstack/react-query";
import Button from "../../components/Button";
import AuthActionInput from "./AuthActionInput";
import AuthInput from "./AuthInput";
import { FetchErrorType } from "../../types/types";
import {
  LoginResponseType,
  SignupErrorType,
  SignupType,
  VerifyCodeType,
  VerifyResponseType
} from "../../types/auth";
import {
  checkDuplicateId,
  checkVerificationEmail,
  sendVerificationEmail,
  signup
} from "../../utils/signup";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/user";
import SignupInputError from "./SignupInputError";
import {
  authIdSchema,
  organizationSchema,
  passwordCheckSchema,
  passwordSchema,
  signupSchema
} from "../../utils/schemas";
import InputAndError from "./InputAndError";
import { useValidator } from "../../hooks/useValidator";
import { useAuthStore } from "../../store/useAuthStore";
import TermsModal from "./TermsModal";

const schemaMap = {
  authId: authIdSchema,
  organization: organizationSchema,
  password: passwordSchema,
  passwordCheck: passwordCheckSchema
} as const;

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupType>({
    authId: "",
    organization: "",
    password: "",
    passwordCheck: ""
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [successVerification, setSuccessVerification] = useState(false);
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const { errors, setErrors, validateAndRun } = useValidator<SignupErrorType>();

  const { mutate: signupMutation } = useMutation<LoginResponseType, FetchErrorType, SignupType>({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("✅ 회원가입 성공! 리다이렉트 실행");
      setAuth(data.accessToken);
      navigate("/");
    },
    onError: (err) => {
      console.error("❌ 회원가입 실패:", err);
    }
  });

  const { mutate: checkEmailMutation } = useMutation<
    UserType["email"],
    FetchErrorType,
    UserType["email"]
  >({
    mutationFn: checkDuplicateId,
    onSuccess: (data) => {
      verifyEmailMutation(data);
      alert("📧 이메일 인증 코드가 전송되었습니다!");
      setVerificationSent(true); // ✅ 인증 코드 입력 필드 활성화
    },
    onError: (err) => {
      console.error("❌ 이메일 중복 확인 실패:", err);
      alert(`📧 ${err.info?.message}`);
    }
  });

  const { mutate: verifyEmailMutation } = useMutation<unknown, FetchErrorType, UserType["email"]>({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {},
    onError: (err) => {
      console.error("❌ 이메일 인증 실패:", err);
      alert("❌ 이메일 인증 요청에 실패했습니다.");
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
        alert("✅ 인증이 완료되었습니다!");
        setSuccessVerification(true);
        setEmailInputDisabled(true);
      } else {
        alert("인증번호가 잘못되었습니다!");
        setSuccessVerification(false);
      }
    },
    onError: (err) => {
      console.error("❌ 이메일 인증 실패:", err);
      alert("❌ 이메일 인증에 실패했습니다.");
    }
  });

  function handleSubmit() {
    validateAndRun(signupSchema, signupData, (data) => {
      signupMutation({ ...data });
    });
  }

  function handleVerificationEmail() {
    validateAndRun(authIdSchema, signupData, (data) => {
      checkEmailMutation(data.authId);
    });
  }

  function handleCheckVerificationEmail() {
    checkVerifyEmailMutation({ email: signupData.authId, code: verificationCode });
  }

  function handleSignupInput(key: keyof SignupType, e: ChangeEvent<HTMLInputElement>) {
    setSignupData((prev) => {
      const updated = { ...prev, [key]: e.target.value };

      const schema = schemaMap[key as keyof typeof schemaMap];
      if (schema) {
        const result = schema.safeParse(updated);
        setErrors((prev) =>
          result.success ? { ...prev, [key]: undefined } : { ...prev, ...result.error.format() }
        );
      }

      return updated;
    });
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TermsModal open={openModal} onCloseModal={handleCloseModal} />

      <h1 className="flex flex-col items-center justify-center whitespace-pre title-extra-18 text-gray-01">
        <span>지금 가입하여 </span>
        <span>투명하게 공유해 보세요</span>
      </h1>
      <div className="flex flex-col items-center justify-center w-full gap-3 mt-8">
        <InputAndError
          Input={
            <AuthInput
              name="organization"
              type="text"
              placeholder="조직명"
              onChange={(e) => handleSignupInput("organization", e)}
            />
          }
          errors={errors.organization}
        />

        <InputAndError
          Input={
            <AuthActionInput
              buttonText="인증하기"
              inputProps={{
                disabled: emailInputDisabled,
                placeholder: "이메일",
                type: "email",
                name: "authId",
                value: signupData.authId,
                onChange: (e) => handleSignupInput("authId", e)
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

        <InputAndError
          Input={
            <AuthInput
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={(e) => handleSignupInput("password", e)}
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
              onChange={(e) => handleSignupInput("passwordCheck", e)}
            />
          }
          errors={errors.passwordCheck}
        />
      </div>
      <div className="flex flex-col items-center w-full gap-4 mt-12">
        <Button onClick={handleSubmit} disabled={!successVerification}>
          회원가입
        </Button>
      </div>
    </>
  );
};

export default Signup;
