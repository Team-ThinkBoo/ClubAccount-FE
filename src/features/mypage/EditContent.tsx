import { ButtonHTMLAttributes } from "react";
import LabelInput from "./LabelInput";
import { useNavigate } from "react-router-dom";

interface EditContentProps {
  mode: "edit";
}

function EditButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="shrink-0 w-[53px] h-11 py-[13.5px] text-primary-var1 bg-primary-var3 caption-bold-12 rounded-lg"
      {...props}
    >
      수정
    </button>
  );
}

const EditContent = ({ mode }: EditContentProps) => {
  const navigate = useNavigate();

  function handleNavigate(href: string) {
    navigate(href);
  }
  return (
    <>
      <LabelInput labelTitle="조직명" mode={mode} value="파산한 형제들" />
      <LabelInput
        labelTitle="이메일"
        mode={mode}
        value="test@test.com"
        Button={<EditButton onClick={() => handleNavigate("edit/email")} />}
      />
      <LabelInput
        labelTitle="비밀번호"
        type="password"
        mode={mode}
        value="asdf"
        Button={<EditButton />}
      />
      <LabelInput labelTitle="비밀번호 확인" type="password" mode={mode} value="asdf" />
      <div className="mt-6">
        <button className="px-4 py-2 rounded-lg body-med-14 text-gray-02 bg-warm-gray-02">
          일반 사용자 링크 재발급
        </button>
      </div>
    </>
  );
};

export default EditContent;
