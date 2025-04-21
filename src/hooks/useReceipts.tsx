import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { loadReceiptDetail, loadReceipts, updateReceipt } from "../utils/receipt";
import { LoadReceiptsResponseType, ReceiptRequestType, ReceiptType } from "../types/receipt";
import { LoginResponseType } from "../types/auth";
import { FetchErrorType } from "../types/types";
import { queryClient } from "../utils/http";

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

export interface UpdateReceiptProps {
  id: ReceiptType["id"];
  datas: ReceiptRequestType["request"];
}

export function useUpdateReceipt(link: LoginResponseType["link"], onSuccess?: () => void) {
  const { mutate, status } = useMutation<unknown, FetchErrorType, UpdateReceiptProps>({
    mutationFn: updateReceipt,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["receipts", link] });
    },
    onError: (err) => {
      alert(err);
    }
  });

  return { mutate, status };
}
