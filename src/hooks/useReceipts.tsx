import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { loadReceiptDetail, loadReceipts } from "../utils/receipt";
import { LoadReceiptsResponseType, ReceiptType } from "../types/receipt";
import { LoginResponseType } from "../types/auth";

export function useLoadReceipts(link: LoginResponseType["link"]) {
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

export function useLoadReceiptDetail(link: LoginResponseType["link"], id: ReceiptType["id"]) {
  const { data, isError, isPending } = useQuery({
    queryKey: ["receipts", link, id],
    queryFn: async () => await loadReceiptDetail(link, id)
  });

  return {
    data,
    isError,
    isPending
  };
}
