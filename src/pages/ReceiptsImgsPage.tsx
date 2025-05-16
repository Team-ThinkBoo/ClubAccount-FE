import ReceiptsImgCard from "@/features/receiptsImgs/ReceiptsImgCard";
import { useLoadReceipts } from "@/hooks/useReceipts";
import ArrowDownIcon from "@/icons/ArrowDownIcon";
import { formatDate } from "@/utils/util";
import { useEffect, useRef, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const ReceiptsImgsPage = () => {
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });

  const link = localStorage.getItem("link") || "";
  let startDate = "";
  let endDate = "";
  if (date?.startDate) {
    startDate = formatDate(new Date(date.startDate));
  }
  if (date?.endDate) {
    endDate = formatDate(new Date(date.endDate));
  }

  const { receipts, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useLoadReceipts(
    link,
    startDate,
    endDate
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px"
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  let fallback;
  if (status === "pending") {
    fallback = <p className="text-center">영수증 내역을 불러오는 중입니다...</p>;
  }
  if (status === "error") {
    fallback = (
      <p className="text-center">오류가 발생하였습니다! 올바른 경로로 다시 접속해주세요!</p>
    );
  }

  return (
    <div className="flex flex-col pt-[72px] gap-[60px] items-center">
      <h1 className="title-semi-20 text-gray-01">영수증 모음</h1>
      <div className="flex flex-col gap-4">
        <div>
          <Datepicker
            inputName="date"
            inputClassName="p-0 w-full"
            containerClassName={"relative w-[240px]"}
            popupClassName={
              "transition-all ease-out duration-300 absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm translate-y-4 opacity-0 hidden min-w-[296px]"
            }
            popoverDirection="down"
            readOnly
            i18n={"ko"}
            placeholder="기간 선택"
            useRange={false}
            primaryColor="amber"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            toggleIcon={() => <ArrowDownIcon />}
          />
        </div>
        <div className="grid grid-cols-3 gap-x-2.5 gap-y-4 md:grid-cols-4 lg:grid-cols-5">
          {receipts.map((receipt) => {
            if (receipt.receiptImageUrl !== "기본 이미지")
              return (
                <ReceiptsImgCard
                  key={receipt.id}
                  src={receipt.receiptImageUrl}
                  date={receipt.date}
                />
              );
          })}

          <div ref={observerRef} style={{ height: "1px" }} />
        </div>
      </div>
      {fallback}
      {status === "success" && receipts.length === 0 && (
        <p className="text-center">지출 내역을 추가해주세요!</p>
      )}
    </div>
  );
};

export default ReceiptsImgsPage;
