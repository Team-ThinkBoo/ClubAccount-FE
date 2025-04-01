import AuthActionInput from "../../components/AuthActionInput";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

const Signup = () => {
  return (
    <>
      <h1 className="flex flex-wrap items-center justify-center whitespace-pre title-extra-18 text-gray-01">
        <span>지금 가입하여 </span>
        <span>투명하게 공유해 보세요</span>
      </h1>

      <div className="flex flex-col w-full gap-3 mt-8">
        <AuthInput type="text" placeholder="조직명" />

        <AuthActionInput
          buttonText="인증하기"
          inputProps={{ placeholder: "이메일", name: "email" }}
        />
        <AuthActionInput
          buttonText="확인"
          inputProps={{ placeholder: "인증번호", name: "authCode" }}
        />

        <AuthInput type="password" placeholder="비밀번호" />
        <AuthInput type="password" placeholder="비밀번호 확인" />
      </div>

      <div className="flex flex-col items-center w-full gap-4 mt-12">
        <AuthButton>회원가입</AuthButton>
      </div>
    </>
  );
};

export default Signup;
