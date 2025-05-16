import axios from "axios";
import { createFetchError } from "./axios";
import { LoadExpenseChartResponse } from "@/types/chart";

interface ILoadExpenseChartProps {
  link: string;
  year: number;
}

export async function loadExpenseChart({ link, year }: ILoadExpenseChartProps) {
  try {
    const response = await axios.get<LoadExpenseChartResponse>(
      `/api/v1/${link}/receipts/expense?year=${year}`
    );
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "지출 차트 로딩 과정에서 오류가 발생하였습니다!");
  }
}
