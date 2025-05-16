import LabelInput from "./LabelInput";
import { toast } from "sonner";
import { ProfileType } from "@/types/mypage";
import { formatDate } from "@/utils/util";

interface ViewContentProps {
  mode: "view";
  info: ProfileType;
}

const ViewContent = ({ mode, info }: ViewContentProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}${info.link}`);
      toast.success("복사 완료!");
    } catch {
      toast.error("복사 실패");
    }
  };
  return (
    <>
      <LabelInput labelTitle="조직명" mode={mode} value={info.department} />
      <LabelInput labelTitle="이메일" mode={mode} value={info.email} />
      <LabelInput labelTitle="가입일" mode={mode} value={formatDate(new Date(info.createdAt))} />
      <LabelInput
        labelTitle="일반 사용자 링크"
        className="overflow-hidden underline cursor-pointer body-med-14 whitespace-nowrap text-ellipsis"
        onClick={handleCopy}
        mode={mode}
        value={`${import.meta.env.VITE_BASE_URL}${info.link}`}
      />
    </>
  );
};

export default ViewContent;
