import { queryClient } from "@/utils/http";
import { getProfile, patchLink } from "@/utils/mypage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLoadProfile() {
  const { data, isError, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await getProfile()
  });

  return {
    data,
    isError,
    isPending
  };
}

export function usePatchLick() {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: patchLink,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      const data = await getProfile();
      await navigator.clipboard.writeText(data.link);
      toast.success("새로운 링크가 복사되었습니다!");
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return {
    mutate,
    isError,
    isPending
  };
}
