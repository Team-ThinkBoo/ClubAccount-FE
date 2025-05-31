import { useState } from "react";
import { ReceiptItemsType } from "../../types/receipt";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ReceiptDetailTable from "./ReceiptDetailTable";
import AddIcon from "@/icons/AddIcon";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReceiptDetailsListProps {
  receiptItems: ReceiptItemsType[];
  onBack: () => void;
  onUpdate: (items: ReceiptItemsType[]) => void;
}

const ReceiptDetailsList = ({ receiptItems, onBack, onUpdate }: ReceiptDetailsListProps) => {
  const [items, setItems] = useState(receiptItems);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState<"normal" | "edit">("normal");

  function handleMode() {
    setMode((pre) => (pre === "edit" ? "normal" : "edit"));
  }

  function handleAddMode() {
    setItems((prev) => [
      ...prev,
      {
        name: "",
        price: 0,
        quantity: 0,
        totalPrice: 0
      }
    ]);
  }

  function handleChange(index: number, field: keyof ReceiptItemsType, value: string | number) {
    setItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;

        const updated = {
          ...item,
          [field]: field === "name" ? value : Number(value)
        };
        if (field === "price" || field === "quantity") {
          updated.totalPrice = updated.price * updated.quantity;
        }
        return updated;
      })
    );
  }

  function handleDelete(index: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  }

  function handleSave() {
    for (const item of items) {
      if (
        item.name.trim() === "" ||
        item.price === 0 ||
        item.quantity === 0 ||
        item.totalPrice === 0
      ) {
        setError(true);
        return;
      }
    }

    onUpdate(items);
    setError(false);
    onBack();
  }

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <button type="button" onClick={onBack}>
          <ArrowLeftIcon className="cursor-pointer" />
        </button>
        <h1 className="flex-1 text-center title-extra-18 text-gray-01">영수증 상세내역</h1>
        <button onClick={handleAddMode} type="button">
          <AddIcon />
        </button>
      </div>

      <div className="flex flex-col items-end w-full gap-3">
        <ScrollArea className="flex flex-col w-full h-[392px] border-[2px] border-gray-04">
          <ReceiptDetailTable
            receipts={items}
            editMode={mode}
            mode="change"
            onChange={handleChange}
            onDelete={handleDelete}
          />
        </ScrollArea>
        <button
          type="button"
          onClick={handleMode}
          className="w-fit bg-warm-gray-02 text-gray-02 body-med-14 px-4 py-2 rounded-[8px]"
        >
          {mode === "normal" ? "목록 편집" : "확인"}
        </button>
      </div>
      {error && <p className="text-red-400 caption-med-12">비어있는 항목을 모두 채워주세요!</p>}
      <button
        onClick={handleSave}
        type="button"
        className="w-full px-4 py-3 text-center rounded-lg bg-primary body-bold-16 text-gray-01"
      >
        상세내역 저장하기
      </button>
    </>
  );
};

export default ReceiptDetailsList;
