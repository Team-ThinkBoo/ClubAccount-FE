import Capture from "@/components/Capture";
import Modal from "@/components/Modal";
import { ChangeEvent } from "react";

interface EditProfileModalProps {
  open: boolean;
  preview?: string;
  onClose: () => void;
  onImgChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
}

const EditProfileModal = ({
  open,
  preview,
  onClose,
  onConfirm,
  onImgChange
}: EditProfileModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white w-[312px] md:w-[368px] pt-8 pb-6 px-5 flex flex-col gap-10 rounded-2xl items-center">
        <h1 className="text-lg font-extrabold text-center text-gray-01">프로필 수정</h1>
        <Capture onFileChange={onImgChange} />
        {preview && (
          <div className="overflow-hidden rounded-full w-60 h-60">
            <img
              src={preview}
              alt="프로필 미리보기 이미지"
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex gap-2">
          <button
            className="w-[130px] md:w-[150px] h-12 px-4 py-3 rounded-lg body-bold-16 text-gray-03 bg-gray-06"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="w-[130px] md:w-[150px] h-12 py-3 rounded-lg body-bold-16 text-gray-01 bg-primary"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
