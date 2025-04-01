import { useState } from "react";
import { AUTH_SEARCH_PARAMS } from "../../constants/constants";
import TermsModal from "./TermsModal";
import AuthLink from "./AuthLink";
import Button from "../../components/Button";
import AuthInput from "./AuthInput";

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

      <div className="flex flex-col items-center justify-center w-full gap-3 mt-16">
        <AuthInput type="text" placeholder="이메일" />
        <AuthInput type="password" placeholder="비밀번호" />
      </div>

      <div className="flex flex-col items-center gap-4 mt-12 w-[272px] md:w-[312px]">
        <Button>로그인</Button>

        <div className="flex w-full px-[60px] justify-between caption-med-12 text-gray-03 mx-auto">
          <AuthLink to={`?mode=${AUTH_SEARCH_PARAMS.CHANGE_PW}`}>비밀번호 변경</AuthLink>
          <button className="caption-med-12 text-grey-03" onClick={handleOpenModal}>
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
