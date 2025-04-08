import { useRef, useState } from "react";
import Webcam from "react-webcam";

const ReceiptCamera = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const videoConstraints = {
    facingMode: "environment"
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
      setIsCameraOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isCameraOpen ? (
        <div className="relative w-full max-w-[400px] aspect-video">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="object-cover w-full h-full rounded-md"
          />
          <button
            onClick={capture}
            className="absolute px-6 py-2 text-black -translate-x-1/2 bg-white rounded-full bottom-4 left-1/2"
          >
            📷 찍기
          </button>
        </div>
      ) : photo ? (
        <div className="flex flex-col items-center gap-4">
          <img src={photo} alt="촬영된 영수증" className="w-full max-w-[400px] rounded-md" />
          <div className="flex gap-4">
            <button onClick={() => setIsCameraOpen(true)}>다시 찍기</button>
            <button onClick={() => alert("업로드 또는 저장")}>사용하기</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsCameraOpen(true)}
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          사진 찍기
        </button>
      )}
    </div>
  );
};

export default ReceiptCamera;
