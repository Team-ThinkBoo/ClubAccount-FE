import axios from "axios";
import { createFetchError } from "./axios";
import { LoadCategoryChartResponse, LoadExpenseChartResponse } from "@/types/chart";

interface ILoadExpenseChartProps {
  link: string;
  year: number;
}

export async function loadExpenseChart({ link, year }: ILoadExpenseChartProps) {
  try {
    const response = await axios.get<LoadExpenseChartResponse>(
      `${import.meta.env.VITE_API_BASE_URL}/v1/${link}/receipts/expense?year=${year}`
    );
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "지출 차트 로딩 과정에서 오류가 발생하였습니다!");
  }
}

interface ILoadCategoryChartProps {
  link: string;
}

export async function loadCategoryChart({ link }: ILoadCategoryChartProps) {
  try {
    const response = await axios.get<LoadCategoryChartResponse>(
      `${import.meta.env.VITE_API_BASE_URL}/v1/${link}/receipts/category`
    );
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "카테고리 차트 로딩 과정에서 오류가 발생하였습니다!");
  }
}
