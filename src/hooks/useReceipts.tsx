import { useInfiniteQuery } from "@tanstack/react-query";
import { loadReceipts } from "../utils/receipt";
import { LoadReceiptsResponseType } from "../types/receipt";

export default function useLoadReceipts(link: string) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<LoadReceiptsResponseType>({
      queryKey: ["receipts", link],
      queryFn: ({ pageParam = 1 }) => loadReceipts({ page: pageParam as number, link }),
      getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.pageNumber + 1),
      initialPageParam: 1
    });

  return {
    data,
    receipts: data?.pages.flatMap((page) => page.content) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  };
}
