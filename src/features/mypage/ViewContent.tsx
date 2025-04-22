import LabelInput from "./LabelInput";

interface ViewContentProps {
  mode: "view";
}

const ViewContent = ({ mode }: ViewContentProps) => {
  return (
    <>
      <LabelInput labelTitle="조직명" mode={mode} value="파산한 형제들" />
      <LabelInput labelTitle="이메일" mode={mode} value="test@test.com" />
      <LabelInput labelTitle="가입일" mode={mode} value="2025년 2월 18일" />
      <LabelInput labelTitle="일반 사용자 링크" mode={mode} value="https://asdfasdfasdf.sadf" />
    </>
  );
};

export default ViewContent;
