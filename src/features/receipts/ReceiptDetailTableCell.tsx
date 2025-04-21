import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InputHTMLAttributes, useState } from "react";

interface ReceiptDetailTableCellProps extends InputHTMLAttributes<HTMLInputElement> {
  mode: "change" | "view";
}

const ReceiptDetailTableCell = ({ mode, ...props }: ReceiptDetailTableCellProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {mode === "change" && <input className="w-full text-center" value={props.value} {...props} />}
      {mode === "view" && (
        <HoverCard open={open} onOpenChange={setOpen}>
          <HoverCardTrigger
            asChild
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onTouchStart={() => setOpen(true)}
          >
            <span className="block w-full truncate">{props.value}</span>
          </HoverCardTrigger>
          <HoverCardContent>{props.value}</HoverCardContent>
        </HoverCard>
      )}
    </>
  );
};

export default ReceiptDetailTableCell;
