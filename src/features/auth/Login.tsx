import { useState } from "react";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import AuthLink from "../../components/AuthLink";
import { AUTH_SEARCH_PARAMS } from "../../constants/constants";
import TermsModal from "./TermsModal";

const Login = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TermsModal open={openModal} onCloseModal={handleCloseModal} />
      <h1 className="text-3xl font-extrabold text-primary">띵부</h1>

      <div className="flex flex-col w-full gap-3 mt-16">
        <AuthInput type="text" placeholder="이메일" />
        <AuthInput type="password" placeholder="비밀번호" />
      </div>

      <div className="flex flex-col items-center w-full gap-4 mt-12">
        <AuthButton>로그인</AuthButton>

        <div className="flex gap-8 w-full px-[60px] justify-between">
          <AuthLink to={`?mode=${AUTH_SEARCH_PARAMS.FIND_PW}`}>비밀번호 변경</AuthLink>
          <button className="caption-med-12 text-grey-03" onClick={handleOpenModal}>
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
