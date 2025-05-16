import { loadExpenseChart } from "@/utils/chart";
import { useQuery } from "@tanstack/react-query";

export function useLoadExpenseChart(link: string, year: number) {
  return useQuery({
    queryKey: ["expenseChart", year],
    queryFn: async () => await loadExpenseChart({ link, year })
  });
}
