import { useAuthStore } from "@/store/useAuthStore";
import { ChangePWRequestType, ChnageProfileType } from "@/types/mypage";
import { FetchErrorType } from "@/types/types";
import { queryClient } from "@/utils/http";
import { getProfile, patchLink, patchPassword, patchProfile } from "@/utils/mypage";
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
  const { setLink } = useAuthStore();
  const { mutate, isError, isPending } = useMutation({
    mutationFn: patchLink,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      const data = await getProfile();
      await navigator.clipboard.writeText(data.link);
      setLink(data.link);
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

export function usePatchProfile() {
  const navigate = useNavigate();
  const { mutate, isError, isPending } = useMutation<unknown, FetchErrorType, ChnageProfileType>({
    mutationFn: patchProfile,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("프로필 정보가 변경되었습니다!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.info?.message);
    }
  });

  return {
    mutate,
    isError,
    isPending
  };
}
