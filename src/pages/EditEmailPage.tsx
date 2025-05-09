import LabelInput from "@/features/mypage/LabelInput";
import { useLoadProfile } from "@/hooks/useProfile";
import { useValidator } from "@/hooks/useValidator";
import {
  LoginResponseType,
  LoginType,
  SignupErrorType,
  VerifyCodeType,
  VerifyResponseType
} from "@/types/auth";
import { FetchErrorType } from "@/types/types";
import { UserType } from "@/types/user";
import { queryClient } from "@/utils/http";
import { login } from "@/utils/login";
import { patchEmail } from "@/utils/mypage";
import { authIdSchema, loginSchema } from "@/utils/schemas";
import { checkDuplicateId, checkVerificationEmail, sendVerificationEmail } from "@/utils/signup";
import { useMutation } from "@tanstack/react-query";
import { ButtonHTMLAttributes, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function EditButton({
  text,
  ...props
}: { text: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="shrink-0 w-[53px] h-11 py-[13.5px] text-primary-var1 bg-primary-var3 caption-bold-12 rounded-lg"
      {...props}
    >
      {text}
    </button>
  );
}

const EditEmailPage = () => {
  const [activeEmail, setActiveEmail] = useState(false);
  const [activeCode, setActiveCode] = useState(false);
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const { data } = useLoadProfile();

  const navigate = useNavigate();

  const { validateAndRun } = useValidator<SignupErrorType>();

  const { mutate: passwordCheckMutation } = useMutation<
    LoginResponseType,
    FetchErrorType,
    LoginType
  >({
    mutationFn: login,
    onSuccess: () => {
      toast.success("비밀번호가 확인되었습니다!");
      setActiveEmail(true);
    },
    onError: () => {
      toast.error("비밀번호를 잘못입력하셨습니다");
    }
  });

  const handlePasswordCheck = () => {
    const loginData = {
      authId: data?.email || "",
      password: password
    };

    validateAndRun(loginSchema, loginData, (data) => {
      passwordCheckMutation(data);
    });
  };

  const { mutate: checkEmailMutation } = useMutation<
    UserType["email"],
    FetchErrorType,
    UserType["email"]
  >({
    mutationFn: checkDuplicateId,
    onSuccess: (data) => {
      verifyEmailMutation(data);
      toast.success("📧 이메일 인증 코드가 전송되었습니다!");
      setActiveCode(true);
      setActiveEmail(false);
    },
    onError: (err) => {
      console.error("❌ 이메일 중복 확인 실패:", err);
      toast.error(`📧 ${err.info?.message}`);
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
        patchEmailMutation(newEmail);
      } else {
        toast.error("인증번호가 잘못되었습니다!");
      }
    },
    onError: (err) => {
      console.error("❌ 이메일 인증 실패:", err);
      toast.error("❌ 이메일 인증에 실패했습니다.");
    }
  });

  const { mutate: patchEmailMutation } = useMutation({
    mutationFn: patchEmail,
    onSuccess: () => {
      toast.success("✅ 이메일이 변경되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["profile"], refetchType: "none" });
      navigate(-1);
    },
    onError: (err) => {
      console.error("❌ 이메일 변경 실패:", err);
      toast.error("❌ 이메일 변경에 실패했습니다." + err);
    }
  });

  function handleVerificationEmail() {
    validateAndRun(authIdSchema, { authId: newEmail }, (data) => {
      checkEmailMutation(data.authId);
    });
  }

  function handleCheckVerificationEmail() {
    checkVerifyEmailMutation({ email: newEmail, code: verifyCode });
  }

  return (
    <div className="w-[312px] md:w-[552px] lg:w-[672px] gap-10 flex flex-col items-center justify-center mx-auto h-fit px-5 py-10 rounded-xl shadow-[0px_3px_10.8px_2px_rgba(0,_0,_0,_0.07)]">
      <h1 className="flex flex-col items-center justify-center whitespace-pre title-extra-18 text-gray-01">
        이메일 변경
      </h1>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <LabelInput labelTitle="현재 이메일" mode="edit" defaultValue={data?.email || ""} />
        <LabelInput
          id="password"
          labelTitle="비밀번호"
          mode="edit"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          Button={<EditButton text="확인" onClick={handlePasswordCheck} />}
        />
        <LabelInput
          id="newEmail"
          labelTitle="새로운 이메일"
          mode="edit"
          value={newEmail}
          onChange={(e) => activeEmail && setNewEmail(e.target.value)}
          disabled={!activeEmail}
          Button={
            <EditButton text="인증" disabled={!activeEmail} onClick={handleVerificationEmail} />
          }
        />
        <LabelInput
          id="verifyCode"
          labelTitle="인증번호"
          mode="edit"
          disabled={!activeCode}
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
        />
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-[130px] md:w-[150px] h-12 px-4 py-3 rounded-lg body-bold-16 text-gray-03 bg-gray-06"
        >
          돌아가기
        </button>
        <button
          onClick={handleCheckVerificationEmail}
          className="w-[130px] md:w-[150px] h-12 py-3 rounded-lg body-bold-16 text-gray-01 bg-primary"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default EditEmailPage;
