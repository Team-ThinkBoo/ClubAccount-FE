import { ChangePWRequestType } from "@/types/mypage";
import { FetchErrorType } from "@/types/types";
import { queryClient } from "@/utils/http";
import { getProfile, patchLink, patchPassword } from "@/utils/mypage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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

export function usePatchPassword() {
  const navigate = useNavigate();
  const { mutate, isError, isPending } = useMutation<unknown, FetchErrorType, ChangePWRequestType>({
    mutationFn: patchPassword,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["profile"], refetchType: "none" });
      toast.success("비밀번호가 변경되었습니다!");
      navigate(-1);
    },
    onError: () => {
      toast.error("기존 비밀번호가 올바르지 않습니다");
    }
  });

  return {
    mutate,
    isError,
    isPending
  };
}
