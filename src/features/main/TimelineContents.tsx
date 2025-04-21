import { useEffect, useRef } from "react";
import useLoadReceipts from "../../hooks/useReceipts";
import TimelineContentCard from "./TimelineContentCard";

const TimelineContents = () => {
  const link = localStorage.getItem("link") || "";
  const { receipts, fetchNextPage, hasNextPage, isFetchingNextPage } = useLoadReceipts(link);

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

  return (
    <ul className="grid grid-cols-1 min-w-[312px] w-full max-w-[568px] mx-auto gap-4 p-6 md:px-0 mid:grid-cols-2 mid:min-w-[658px] mid:max-w-[990px] lg-mid:grid-cols-3 lg-mid:w-[992px]">
      {receipts.length === 0 && <p>지출 내역을 추가해주세요!</p>}
      {receipts.length > 0 &&
        receipts.map((receipt) => <TimelineContentCard key={receipt.id} receipt={receipt} />)}
      <div ref={observerRef} style={{ height: "1px" }} />
    </ul>
  );
};

export default TimelineContents;
