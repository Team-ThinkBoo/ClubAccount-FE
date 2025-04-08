import { ChangeEvent, useRef } from "react";
import CameraIcon from "../../icons/CameraIcon";
import FolderIcon from "../../icons/FolderIcon";

interface ReceiptCaptureProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ReceiptCapture = ({ onFileChange }: ReceiptCaptureProps) => {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-center w-full gap-3 px-3">
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        onChange={onFileChange}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={onFileChange}
        className="hidden"
      />

      <div className="flex gap-4">
        <button
          type="button"
          className="flex gap-2 justify-center items-center px-3 py-2 rounded-lg bg-gray-05 body-med-14 text-gray-02 w-[calc(50%-6px)] focus:outline-none"
          onClick={() => cameraInputRef.current?.click()}
        >
          <CameraIcon />
          <p>사진 촬영</p>
        </button>
        <button
          type="button"
          className="flex gap-2 justify-center items-center px-3 py-2 rounded-lg bg-gray-05 body-med-14 text-gray-02 w-[calc(50%-6px)] focus:outline-none"
          onClick={() => galleryInputRef.current?.click()}
        >
          <FolderIcon />
          <p>불러 오기</p>
        </button>
      </div>
    </div>
  );
};

export default ReceiptCapture;
