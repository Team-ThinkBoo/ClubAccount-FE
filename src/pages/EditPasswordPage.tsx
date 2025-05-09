import PasswordWithConfirm from "@/features/auth/PasswordWithConfirm";
import LabelInput from "@/features/mypage/LabelInput";
import { usePatchPassword } from "@/hooks/useProfile";
import { useValidator } from "@/hooks/useValidator";
import { SignupErrorType, SignupType } from "@/types/auth";
import { ChangePasswordType } from "@/types/mypage";
import { changeProfilePwSchema, passwordCheckSchema, passwordSchema } from "@/utils/schemas";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const schemaMap = {
  password: passwordSchema,
  passwordCheck: passwordCheckSchema
} as const;

const EditPasswordPage = () => {
  const navigate = useNavigate();
  const [curPW, setCurPW] = useState("");
  const [password, setPassword] = useState<ChangePasswordType>({
    password: "",
    passwordCheck: ""
  });
  const { errors, setErrors, validateAndRun } = useValidator<SignupErrorType>();
  const { mutate: patchPasswordMutation } = usePatchPassword();

  function handleSignupInput(key: keyof SignupType, e: ChangeEvent<HTMLInputElement>) {
    setPassword((prev) => {
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
    validateAndRun(changeProfilePwSchema, password, (data) => {
      patchPasswordMutation({
        currentPassword: curPW,
        newPassword: data.password,
        confirmPassword: data.passwordCheck
      });
    });
  }

  return (
    <div className="w-[312px] md:w-[552px] lg:w-[672px] gap-10 flex flex-col items-center justify-center mx-auto h-fit px-5 py-10 rounded-xl shadow-[0px_3px_10.8px_2px_rgba(0,_0,_0,_0.07)]">
      <h1 className="flex flex-col items-center justify-center whitespace-pre title-extra-18 text-gray-01">
        비밀번호 변경
      </h1>
      <ul className="list-disc caption-med-12 text-gray-02">
        <li>다른 아이디/사이트에서 사용하지 않는 비밀번호</li>
        <li>이전에 사용한 적 없는 비밀번호가 안전합니다</li>
      </ul>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <LabelInput
          type="password"
          labelTitle="현재 비밀번호"
          mode="edit"
          value={curPW}
          onChange={(e) => setCurPW(e.target.value)}
        />
        <PasswordWithConfirm errors={errors} onChange={handleSignupInput} />
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-[130px] md:w-[150px] h-12 px-4 py-3 rounded-lg body-bold-16 text-gray-03 bg-gray-06"
        >
          돌아가기
        </button>
        <button
          onClick={handleSubmit}
          className="w-[130px] md:w-[150px] h-12 py-3 rounded-lg body-bold-16 text-gray-01 bg-primary"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default EditPasswordPage;
