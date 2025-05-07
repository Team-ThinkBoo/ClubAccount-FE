import { ButtonHTMLAttributes, useState } from "react";
import LabelInput from "./LabelInput";
import { useNavigate } from "react-router-dom";
import { usePatchLick } from "@/hooks/useProfile";
import { ProfileType } from "@/types/mypage";

interface EditContentProps {
  mode: "edit";
  info: ProfileType;
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

const EditContent = ({ mode, info }: EditContentProps) => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState(info.department);
  const { mutate: newLinkMutation } = usePatchLick();

  function handleNavigate(href: string) {
    navigate(href);
  }
  return (
    <>
      <LabelInput
        labelTitle="조직명"
        mode={mode}
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <LabelInput
        labelTitle="이메일"
        mode={mode}
        defaultValue={info.email}
        disabled
        Button={<EditButton onClick={() => handleNavigate("edit/email")} />}
      />
      <LabelInput
        labelTitle="비밀번호"
        type="password"
        mode={mode}
        defaultValue="1231231212"
        disabled
        Button={<EditButton />}
      />
      <div className="mt-6">
        <button
          onClick={() => newLinkMutation()}
          className="px-4 py-2 rounded-lg body-med-14 text-gray-02 bg-warm-gray-02"
        >
          일반 사용자 링크 재발급
        </button>
      </div>
    </>
  );
};

export default EditContent;
