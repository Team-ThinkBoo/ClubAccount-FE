import { InputHTMLAttributes } from "react";

interface ReceiptDetailTableCellProps extends InputHTMLAttributes<HTMLInputElement> {
  mode: "change" | "view";
}

const ReceiptDetailTableCell = ({ mode, ...props }: ReceiptDetailTableCellProps) => {
  return (
    <>
      {mode === "change" && <input className="w-full text-center" value={props.value} {...props} />}
      {mode === "view" && <div className="w-full text-center">{props.value}</div>}
    </>
  );
};

export default ReceiptDetailTableCell;
