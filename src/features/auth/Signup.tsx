import { useMutation } from "@tanstack/react-query";
import Button from "../../components/Button";
import AuthInput from "./AuthInput";
import { FetchErrorType } from "../../types/types";
import { LoginResponseType, SignupErrorType, SignupType } from "../../types/auth";
import { signup } from "../../utils/signup";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import EmailVerificationInput from "./EmailVerificationInput";
import PasswordWithConfirm from "./PasswordWithConfirm";

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
  const [successVerification, setSuccessVerification] = useState(false);

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

  function handleSuccessVerification(success: boolean) {
    setSuccessVerification(success);
  }

  function handleSubmit() {
    validateAndRun(signupSchema, signupData, (data) => {
      signupMutation({ ...data });
    });
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

        <EmailVerificationInput
          errors={errors}
          onSuccess={handleSuccessVerification}
          onChange={handleSignupInput}
          data={signupData}
        />

        <PasswordWithConfirm errors={errors} onChange={handleSignupInput} />
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
