import { useAuthStore } from "@/store/useAuthStore";
import LabelInput from "./LabelInput";
import { toast } from "sonner";

interface ViewContentProps {
  mode: "view";
}

const ViewContent = ({ mode }: ViewContentProps) => {
  const { link } = useAuthStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}receipts/${link}`);
      toast.success("복사 완료!");
    } catch {
      toast.error("복사 실패");
    }
  };
  return (
    <>
      <LabelInput labelTitle="조직명" mode={mode} value="파산한 형제들" />
      <LabelInput labelTitle="이메일" mode={mode} value="test@test.com" />
      <LabelInput labelTitle="가입일" mode={mode} value="2025년 2월 18일" />
      <LabelInput
        labelTitle="일반 사용자 링크"
        className="overflow-hidden underline cursor-pointer body-med-14 whitespace-nowrap text-ellipsis"
        onClick={handleCopy}
        mode={mode}
        value={`${import.meta.env.VITE_BASE_URL}receipts/${link}`}
      />
    </>
  );
};

export default ViewContent;
