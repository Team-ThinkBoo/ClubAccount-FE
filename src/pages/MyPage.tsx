import Button from "@/components/Button";
import LabelInput from "@/features/mypage/LabelInput";
import defaultProfile from "/defaultProfile.png";

const MyPage = () => {
  return (
    <div className="w-[312px] md:w-[552px] lg:w-[672px] gap-10 flex flex-col items-center justify-center mx-auto h-fit px-5 py-10 rounded-xl shadow-[0px_3px_10.8px_2px_rgba(0,_0,_0,_0.07)]">
      <h1 className="flex flex-col items-center justify-center whitespace-pre title-extra-18 text-gray-01">
        마이 페이지
      </h1>
      <img src={defaultProfile} className="w-[88px] h-[88px] object-cover rounded-full " />
      <div className="flex flex-col items-center justify-center w-full gap-3 mt-8">
        <LabelInput labelTitle="조직명" mode="view" value="파산한 형제들" />
        <LabelInput labelTitle="이메일" mode="view" value="test@test.com" />
        <LabelInput labelTitle="가입일" mode="view" value="2025년 2월 18일" />
        <LabelInput labelTitle="일반 사용자 링크" mode="view" value="https://asdfasdfasdf.sadf" />
      </div>
      <div>
        <Button>회원정보 수정</Button>
      </div>
    </div>
  );
};

export default MyPage;
