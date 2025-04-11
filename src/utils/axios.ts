import axios from "axios";
import { FetchErrorType } from "../types/types";

export function createFetchError(error: unknown, fallbackMsg: string): FetchErrorType {
  if (axios.isAxiosError(error)) {
    const err: FetchErrorType = new Error(fallbackMsg);
    err.code = error.response?.status;
    err.info = error.response?.data;
    return err;
  }

  const err: FetchErrorType = new Error("알 수 없는 에러가 발생했습니다.");
  return err;
}
