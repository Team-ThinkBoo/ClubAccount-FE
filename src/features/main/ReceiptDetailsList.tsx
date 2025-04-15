import { useState } from "react";
import { ReceiptItemsType } from "../../types/receipt";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";

interface ReceiptDetailsListProps {
  receiptItems: ReceiptItemsType[];
  onBack: () => void;
  onUpdate: (items: ReceiptItemsType[]) => void;
}

const ReceiptDetailsList = ({ receiptItems, onBack, onUpdate }: ReceiptDetailsListProps) => {
  const [items, setItems] = useState(receiptItems);
  const [error, setError] = useState(false);

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

  function handleChage(index: number, field: keyof ReceiptItemsType, value: string | number) {
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
      </div>
      <div className="flex flex-col w-full h-full overflow-scroll">
        <table>
          <thead>
            <tr className="text-gray-03 body-med-14">
              <th className="py-[10px] border-[1.5px] w-4/12 border-gray-04">상품명</th>
              <th className="py-[10px] border-[1.5px] w-3/12 border-gray-04">단가</th>
              <th className="py-[10px] border-[1.5px] w-2/12 border-gray-04">수량</th>
              <th className="py-[10px] border-[1.5px] w-3/12 border-gray-04">금액</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((data, index) => (
              <tr
                key={`${data.toString()}-${index}`}
                className="relative text-gray-01 caption-med-12"
              >
                <td className="py-[10px] text-center border-[1.5px] border-gray-04">
                  <input
                    className="w-full text-center"
                    value={data.name}
                    onChange={(e) => handleChage(index, "name", e.target.value)}
                  />
                </td>
                <td className="py-[10px] text-center border-[1.5px] border-gray-04">
                  <input
                    className="w-full text-center"
                    value={data.price}
                    onChange={(e) => handleChage(index, "price", e.target.value)}
                  />
                </td>
                <td className="py-[10px] text-center border-[1.5px] border-gray-04">
                  <input
                    className="w-full text-center"
                    value={data.quantity}
                    onChange={(e) => handleChage(index, "quantity", e.target.value)}
                  />
                </td>
                <td className="py-[10px] text-center border-[1.5px] border-gray-04">
                  <input
                    className="w-full text-center"
                    value={data.totalPrice}
                    onChange={(e) => handleChage(index, "totalPrice", e.target.value)}
                  />
                  <button
                    onClick={() => handleDelete(index)}
                    type="button"
                    className="absolute z-10 w-5 h-5 text-xs text-white bg-red-500 rounded-full -right-6 hover:bg-red-600"
                  >
                    &minus;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleAddMode}
          type="button"
          className="w-full py-2 text-center body-med-14 bg-gray-05"
        >
          상품 추가하기
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
