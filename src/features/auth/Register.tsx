import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center w-11/12 mx-auto h-fit px-5 py-16 rounded-xl shadow-[0px_3px_10.8px_2px_rgba(0,_0,_0,_0.07)]">
      <h1 className="flex flex-wrap items-center justify-center title-extra-18 text-gray-01">
        <span>지금 가입하여</span>
        <span>투명하게 공유해 보세요</span>
      </h1>

      <div className="flex flex-col w-full gap-3 mt-8">
        <AuthInput type="text" placeholder="조직명" />
        <div className="flex gap-2">
          <AuthInput type="text" placeholder="이메일" />
          <button className="px-4 py-3 rounded-lg text-primary-var1 bg-primary-var2 caption-med-12 whitespace-nowrap">
            인증하기
          </button>
        </div>
        <AuthInput type="password" placeholder="비밀번호" />
        <AuthInput type="password" placeholder="비밀번호 확인" />
      </div>

      <div className="flex flex-col items-center w-full gap-4 mt-12">
        <AuthButton>회원가입</AuthButton>
      </div>
    </div>
  );
};

export default Register;
