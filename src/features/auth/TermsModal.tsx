import Modal from "../../components/Modal";
import Button from "../../components/Button";
import LogoIcon from "../../icons/LogoIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AUTH_SEARCH_PARAMS } from "../../constants/constants";

interface TermsModalProps {
  open: boolean;
  onCloseModal: () => void;
}

const TermsModal = ({ open, onCloseModal }: TermsModalProps) => {
  const navigate = useNavigate();
  const [isAgreeClose, setIsAgreeClose] = useState(false);

  function handleClose() {
    if (!isAgreeClose) {
      navigate(`/auth?mode=${AUTH_SEARCH_PARAMS.LOGIN}`);
    }

    onCloseModal();
    setIsAgreeClose(false);
  }

  const handleAgree = () => {
    setIsAgreeClose(true);
    onCloseModal();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex flex-col items-center gap-4 p-6 bg-white max-w-[370px] justify-center rounded-xl">
        <LogoIcon className="w-16 h-[35px]" />
        <h2 className="text-base font-semibold">약관 동의</h2>
        <div className="flex flex-col gap-4 caption-med-12">
          <p>
            • 본 서비스는 동아리 및 소모임의 회계 기록과 관리를 지원하기 위한 도구로, 개인 사용자 및
            단체는 서비스 목적에 맞게 사용해야 합니다.
          </p>
          <p>
            • 회계 관련 데이터(지출내역, 영수증 이미지, 회계 보고서 등)는 사용자가 직접 입력하거나
            업로드해야 하며, 서비스는 해당 데이터를 보관 및 통계용으로만 활용합니다.
          </p>
          <p>
            • 저장된 정보는 암호화되어 안전하게 저장되며, 입력된 회계 데이터는 회계 요약/리포트 기능
            및 내부 통계 분석 용도로만 사용되며 외부에 공개되지 않습니다.
          </p>
          <p>
            • 본 서비스는 제공되는 기능을 기반으로 회계 보조를 돕는 도구이며, 법적 효력을 갖는 공식
            회계 보고 시스템은 아닙니다. 공식 회계 결과 제출 시에는 소속 단체의 담당자 또는 상급
            기관에 확인을 권장합니다.
          </p>
          <p>
            • 동의서, 영수증 이미지 등 업로드한 문서는 서비스 운영 목적 외에 절대 사용되지 않으며,
            서비스 탈퇴 시 관련 정보는 즉시 삭제됩니다. 단, 법적/기술적 사유로 일정 기간 보관이
            필요한 경우 이에 따라 처리됩니다.
          </p>
        </div>
        <Button onClick={handleAgree}>동의합니다</Button>
      </div>
    </Modal>
  );
};

export default TermsModal;
