import Modal from "../../components/Modal";
import { formatAmount, getLink } from "../../utils/util";
import ReceiptDetailTable from "./ReceiptDetailTable";
import { CATEGORY } from "../../constants/constants";
import { useLoadReceiptDetail } from "../../hooks/useReceipts";
import { useState } from "react";
import UpdateModalContent from "./UpdateModalContent";
import { ReceiptType } from "@/types/receipt";
import { useAuthStore } from "@/store/useAuthStore";

interface ReceiptDetailModalProps {
  receipt: ReceiptType;
  id: number;
  open: boolean;
  onCloseModal: () => void;
}

const ReceiptDetailModal = ({ receipt, id, open, onCloseModal }: ReceiptDetailModalProps) => {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const link = getLink();
  const { data, isPending } = useLoadReceiptDetail(link, id);
  const { isLoggedIn } = useAuthStore();

  function handleMode(mode: "view" | "edit") {
    setMode(mode);
  }

  if (isPending || !data) return null;

  return (
    <Modal open={open} onClose={onCloseModal}>
      <div className="w-[312px] md:w-[368px] h-[640px] rounded-2xl bg-white flex flex-col justify-center items-center py-8 px-5 gap-6">
        {isPending && <p className="text-center">로딩중...</p>}
        {!isPending && mode === "view" && (
          <>
            <div className="flex w-full gap-4">
              <div className="flex-shrink-0 w-1/4 h-full">
                {receipt.receiptImageUrl && (
                  <img
                    className="object-cover w-full h-full"
                    src={receipt.receiptImageUrl}
                    alt="영수증 이미지"
                  />
                )}
              </div>
              <div className="flex h-[130px] flex-col gap-4 justify-between w-[calc(75%-1rem)]">
                <div>
                  <p className="body-bold-14 text-gray-01">{receipt.date}</p>
                  <p className="caption-med-12 text-gray-03">{CATEGORY[receipt.category]}</p>
                </div>

                <div className="body-bold-16 text-gray-01">
                  <p>{receipt.businessName}</p>
                  <p>{formatAmount(receipt.amount)}</p>
                </div>

                <div>
                  <p className="truncate caption-med-12 text-gray-02">{receipt.etc}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-[282px] overflow-scroll">
              <ReceiptDetailTable mode="view" receipts={data} />
            </div>
            <footer className="flex flex-col w-full gap-3">
              {isLoggedIn && (
                <button
                  onClick={() => handleMode("edit")}
                  className="px-4 py-3 text-center rounded-lg bg-primary body-bold-16 text-gray-01"
                >
                  수정하기
                </button>
              )}
              <button
                type="button"
                onClick={onCloseModal}
                className="px-4 py-3 text-center rounded-lg bg-gray-05 body-bold-16 text-gray-03"
              >
                취소
              </button>
            </footer>
          </>
        )}
        {mode === "edit" && (
          <UpdateModalContent receipt={receipt} receiptItems={data} onCloseModal={onCloseModal} />
        )}
      </div>
    </Modal>
  );
};

export default ReceiptDetailModal;
