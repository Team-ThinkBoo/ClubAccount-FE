import { ReceiptItemsType } from "../../types/receipt";
import { formatNumber } from "../../utils/util";
import ReceiptDetailTableCell from "./ReceiptDetailTableCell";

interface ViewModeProps {
  receipts?: ReceiptItemsType[];
  mode: "view";
}

interface ChangeModeProps {
  receipts?: ReceiptItemsType[];
  mode: "change";
  onDelete: (index: number) => void;
  onChange: (index: number, field: keyof ReceiptItemsType, value: string | number) => void;
}

type ReceiptDetailTableProps = ViewModeProps | ChangeModeProps;

const ReceiptDetailTable = (props: ReceiptDetailTableProps) => {
  const { receipts: rowReceipts, mode } = props;

  const receipts = rowReceipts?.map((item) => ({
    ...item,
    price: formatNumber(item.price),
    totalPrice: formatNumber(item.totalPrice)
  }));

  return (
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
        {receipts?.map((data, index) => (
          <tr key={`${data.toString()}-${index}`} className="relative text-gray-01 caption-med-12">
            <td className="py-[10px] text-center border-[1.5px] border-gray-04">
              <ReceiptDetailTableCell
                mode={mode}
                value={data.name}
                onChange={(e) => mode === "change" && props.onChange(index, "name", e.target.value)}
              />
            </td>
            <td className="py-[10px] text-center border-[1.5px] border-gray-04">
              <ReceiptDetailTableCell
                mode={mode}
                value={data.price}
                onChange={(e) =>
                  mode === "change" && props.onChange(index, "price", e.target.value)
                }
              />
            </td>
            <td className="py-[10px] text-center border-[1.5px] border-gray-04">
              <ReceiptDetailTableCell
                mode={mode}
                value={data.quantity}
                onChange={(e) =>
                  mode === "change" && props.onChange(index, "quantity", e.target.value)
                }
              />
            </td>
            <td className="py-[10px] text-center border-[1.5px] border-gray-04">
              <ReceiptDetailTableCell
                mode={mode}
                value={data.totalPrice}
                onChange={(e) =>
                  mode === "change" && props.onChange(index, "totalPrice", e.target.value)
                }
              />
              {mode === "change" && (
                <button
                  onClick={() => mode === "change" && props.onDelete(index)}
                  type="button"
                  className="absolute z-10 w-5 h-5 text-xs text-white bg-red-500 rounded-full -right-6 hover:bg-red-600"
                >
                  &minus;
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReceiptDetailTable;
