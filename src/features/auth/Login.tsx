import { useRef } from "react";
import { AUTH_SEARCH_PARAMS } from "../../constants/constants";
import AuthLink from "./AuthLink";
import Button from "../../components/Button";
import AuthInput from "./AuthInput";
import LogoIcon from "../../icons/LogoIcon";
import { loginSchema } from "../../utils/schemas";
import { LoginErrorType, LoginResponseType, LoginType } from "../../types/auth";
import SignupInputError from "./SignupInputError";
import { useValidator } from "../../hooks/useValidator";
import { useMutation } from "@tanstack/react-query";
import { FetchErrorType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/login";
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const { errors: error, validateAndRun } = useValidator<LoginErrorType>();
  const authIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setAuth } = useAuthStore();

  const navigate = useNavigate();

  const { mutate: loginMutation } = useMutation<LoginResponseType, FetchErrorType, LoginType>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("✅ 로그인 성공! 리다이렉트 실행");

      setAuth(data.accessToken);
      navigate("/");
    },
    onError: (err) => {
      console.error("❌ 로그인 실패:", err);
    }
  });

  const handleLogin = () => {
    const loginData = {
      authId: authIdRef.current?.value,
      password: passwordRef.current?.value
    };

    validateAndRun(loginSchema, loginData, (data) => {
      loginMutation(data);
    });
  };

  return (
    <>
      <LogoIcon className="w-16 h-[35px]" />

      <div className="flex flex-col items-center justify-center w-full gap-3 mt-16">
        <AuthInput type="text" placeholder="이메일" ref={authIdRef} />
        <AuthInput type="password" placeholder="비밀번호" ref={passwordRef} />
      </div>
      <SignupInputError>{error._errors}</SignupInputError>

      <div className="flex flex-col items-center gap-4 mt-12 w-[272px] md:w-[312px]">
        <Button onClick={handleLogin}>로그인</Button>

        <div className="flex w-full px-[60px] justify-between caption-med-12 text-gray-03 mx-auto">
          <AuthLink to={`?mode=${AUTH_SEARCH_PARAMS.CHANGE_PW}`}>비밀번호 변경</AuthLink>
          <AuthLink to={`?mode=${AUTH_SEARCH_PARAMS.SIGNUP}`}>회원가입</AuthLink>
        </div>
      </div>
    </>
  );
};

export default Login;
