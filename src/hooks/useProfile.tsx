import { getProfile } from "@/utils/mypage";
import { useQuery } from "@tanstack/react-query";

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
