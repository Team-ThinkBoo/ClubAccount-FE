import Button from "../../components/Button";
import EmailVerificationInput from "./EmailVerificationInput";
import { ChangeEvent, useState } from "react";
import { SignupErrorType, SignupType } from "../../types/auth";
import { useValidator } from "../../hooks/useValidator";
import {
  authIdSchema,
  changePwSchema,
  passwordCheckSchema,
  passwordSchema
} from "../../utils/schemas";
import PasswordWithConfirm from "./PasswordWithConfirm";

const schemaMap = {
  authId: authIdSchema,
  password: passwordSchema,
  passwordCheck: passwordCheckSchema
} as const;

const ChangePW = () => {
  const [signupData, setSignupData] = useState<SignupType>({
    authId: "",
    password: "",
    passwordCheck: ""
  });
  const [successVerification, setSuccessVerification] = useState(false);

  const { errors, setErrors, validateAndRun } = useValidator<SignupErrorType>();

  function handleSuccessVerification(success: boolean) {
    setSuccessVerification(success);
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

  function handleSubmit() {
    validateAndRun(changePwSchema, signupData, (data) => {
      console.log(data);
    });
  }
  return (
    <>
      <h1 className="flex flex-col items-center justify-center whitespace-pre title-extra-18 text-gray-01">
        <span>지금 가입하여 </span>
        <span>투명하게 공유해 보세요</span>
      </h1>

      <div className="flex flex-col items-center justify-center w-full gap-3 mt-8">
        <EmailVerificationInput
          data={signupData}
          errors={errors}
          mode="changePW"
          onSuccess={handleSuccessVerification}
          onChange={handleSignupInput}
        />

        <PasswordWithConfirm errors={errors} onChange={handleSignupInput} />
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-4 mt-12">
        <Button onClick={handleSubmit} disabled={!successVerification}>
          확인
        </Button>
      </div>
    </>
  );
};

export default ChangePW;
