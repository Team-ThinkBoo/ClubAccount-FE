import { ReceiptType } from "../../types/types";
import TimelineContentCard from "./TimelineContentCard";

interface TimelineContentsProps {
  receipts: ReceiptType[];
}

const TimelineContents = ({ receipts }: TimelineContentsProps) => {
  return (
    <ul className="grid grid-cols-1 min-w-[312px] w-full max-w-[568px] mx-auto gap-4 p-6 md:px-0 mid:grid-cols-2 mid:min-w-[658px] mid:max-w-[990px] lg-mid:grid-cols-3 lg-mid:w-[992px]">
      {receipts.length === 0 && <p>지출 내역을 추가해주세요!</p>}
      {receipts.length > 0 &&
        receipts.map((receipt) => <TimelineContentCard key={receipt.id} receipt={receipt} />)}
    </ul>
  );
};

export default TimelineContents;
