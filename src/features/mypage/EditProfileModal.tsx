import Button from "@/components/Button";
import Capture from "@/components/Capture";
import Modal from "@/components/Modal";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ open, onClose }: EditProfileModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white w-[312px] md:w-[368px] pt-8 pb-6 px-5 flex flex-col gap-10 rounded-2xl items-center">
        <h1 className="text-lg font-extrabold text-center text-gray-01">프로필 수정</h1>
        <Capture onFileChange={() => {}} />
        <Button onClick={onClose}>취소</Button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
