import { useMutation } from "@tanstack/react-query";
import Button from "../../components/Button";
import AuthActionInput from "./AuthActionInput";
import AuthInput from "./AuthInput";
import { FetchErrorType } from "../../types/types";
import { SignupErrorType, SignupType } from "../../types/auth";
import { sendVerificationEmail, signup } from "../../utils/signup";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/user";
import { z } from "zod";
import SignupInputError from "./SignupInputError";

// ✅ 회원가입 유효성 검사용 Zod 스키마
const signupSchema = z
  .object({
    authId: z.string().email("📧 유효한 이메일을 입력하세요!"),
    organization: z.string().min(1, "🏢 조직명을 입력하세요!"),
    password: z
      .string()
      .min(8, "🔒 비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/[A-Za-z]/, "🔠 문자를 포함해야 합니다.")
      .regex(/[0-9]/, "🔢 숫자를 포함해야 합니다.")
      .regex(/[!@#$%^&*]/, "🔣 특수문자(!@#$%^&*)를 포함해야 합니다."),
    passwordCheck: z.string()
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "❌ 비밀번호가 일치하지 않습니다!"
  });

const authIdSchema = z.object({
  authId: z.string().email("📧 유효한 이메일을 입력하세요!")
});

const organizationSchema = z.object({
  organization: z.string().min(1, "🏢 조직명을 입력하세요!")
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "🔒 비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[A-Za-z]/, "🔠 문자를 포함해야 합니다.")
    .regex(/[0-9]/, "🔢 숫자를 포함해야 합니다.")
    .regex(/[!@#$%^&*]/, "🔣 특수문자(!@#$%^&*)를 포함해야 합니다."),
  passwordCheck: z.string()
});

const passwordCheckSchema = z
  .object({
    password: z.string(),
    passwordCheck: z.string()
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "❌ 비밀번호가 일치하지 않습니다!"
  });

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupType>({
    authId: "",
    organization: "",
    password: "",
    passwordCheck: ""
  });
  const [errors, setErrors] = useState<SignupErrorType>({});
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [successVerification, setSuccessVerification] = useState(false);
  const navigate = useNavigate();

  const { mutate: signupMutation } = useMutation<unknown, FetchErrorType, SignupType>({
    mutationFn: signup,
    onSuccess: () => {
      console.log("✅ 회원가입 성공! 리다이렉트 실행");
      navigate("/");
    },
    onError: (err) => {
      console.error("❌ 회원가입 실패:", err);
    }
  });

  const { mutate: verifyEmailMutation } = useMutation<unknown, FetchErrorType, UserType["email"]>({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      alert("📧 이메일 인증 코드가 전송되었습니다!");
      setVerificationSent(true); // ✅ 인증 코드 입력 필드 활성화
    },
    onError: (err) => {
      console.error("❌ 이메일 인증 실패:", err);
      alert("❌ 이메일 인증 요청에 실패했습니다.");
    }
  });

  const { mutate: checkVerifyEmailMutation } = useMutation<unknown, FetchErrorType, string>({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      alert("✅ 인증이 완료되었습니다!");
      setSuccessVerification(true); // ✅ 인증 코드 입력 필드 활성화
    },
    onError: (err) => {
      console.error("❌ 이메일 인증 실패:", err);
      alert("❌ 이메일 인증에 실패했습니다.");
    }
  });

  function handleSubmit() {
    const result = signupSchema.safeParse(signupData);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setErrors({});

    signupMutation({ ...signupData });
  }

  function handleVerificationEmail() {
    const result = authIdSchema.safeParse({ authId: signupData.authId });

    if (!result.success) {
      setErrors((prev) => ({ ...prev, authId: result.error.format().authId }));
      return;
    }

    setErrors({});

    verifyEmailMutation(signupData.authId);
  }

  function handleCheckVerificationEmail() {
    checkVerifyEmailMutation(verificationCode);
  }

  function handleSignupInput(key: keyof SignupType, e: ChangeEvent<HTMLInputElement>) {
    setSignupData((prev) => {
      const updated = { ...prev, [key]: e.target.value };

      if (key === "authId") {
        const result = authIdSchema.safeParse(updated);
        setErrors((prev) =>
          result.success ? { ...prev, [key]: undefined } : { ...prev, ...result.error.format() }
        );
      } else if (key === "organization") {
        const result = organizationSchema.safeParse(updated);
        setErrors((prev) =>
          result.success ? { ...prev, [key]: undefined } : { ...prev, ...result.error.format() }
        );
      } else if (key === "password") {
        const result = passwordSchema.safeParse(updated);
        setErrors((prev) =>
          result.success ? { ...prev, [key]: undefined } : { ...prev, ...result.error.format() }
        );
      } else if (key === "passwordCheck") {
        const result = passwordCheckSchema.safeParse(updated);
        setErrors((prev) =>
          result.success ? { ...prev, [key]: undefined } : { ...prev, ...result.error.format() }
        );
      }

      return updated;
    });
  }

  return (
    <>
      <h1 className="flex flex-col items-center justify-center whitespace-pre title-extra-18 text-gray-01">
        <span>지금 가입하여 </span>
        <span>투명하게 공유해 보세요</span>
      </h1>
      <div className="flex flex-col items-center justify-center w-full gap-3 mt-8">
        <AuthInput
          name="organization"
          type="text"
          placeholder="조직명"
          onChange={(e) => handleSignupInput("organization", e)}
        />
        {errors.organization &&
          errors.organization._errors.map((err) => (
            <SignupInputError key={err}>{err}</SignupInputError>
          ))}

        <AuthActionInput
          buttonText="인증하기"
          inputProps={{
            placeholder: "이메일",
            type: "email",
            name: "authId",
            onChange: (e) => handleSignupInput("authId", e)
          }}
          buttonProps={{ type: "button", onClick: handleVerificationEmail }}
        />
        {errors.authId &&
          errors.authId._errors.map((err) => <SignupInputError key={err}>{err}</SignupInputError>)}

        {verificationSent && (
          <AuthActionInput
            buttonText="확인"
            inputProps={{
              placeholder: "인증번호",
              onChange: (e) => setVerificationCode(e.target.value),
              disabled: !verificationSent
            }}
            buttonProps={{ disabled: !verificationSent, onClick: handleCheckVerificationEmail }}
          />
        )}

        <AuthInput
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={(e) => handleSignupInput("password", e)}
        />
        {!errors.password && (
          <SignupInputError color="gray">
            문자, 숫자, 특수문자(!@#$%^&*) 포함 8자리 이상
          </SignupInputError>
        )}
        {errors.password &&
          errors.password._errors.map((err) => (
            <SignupInputError key={err}>{err}</SignupInputError>
          ))}

        <AuthInput
          type="password"
          name="passwordCheck"
          placeholder="비밀번호 확인"
          onChange={(e) => handleSignupInput("passwordCheck", e)}
        />
        {errors.passwordCheck &&
          errors.passwordCheck._errors.map((err) => (
            <SignupInputError key={err}>{err}</SignupInputError>
          ))}
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
