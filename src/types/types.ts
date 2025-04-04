import { AUTH_SEARCH_PARAMS, PARAMS_IDS } from "../constants/constants";

export type AuthPageSearchParams = (typeof AUTH_SEARCH_PARAMS)[keyof typeof AUTH_SEARCH_PARAMS];

export type ParamsIds = (typeof PARAMS_IDS)[keyof typeof PARAMS_IDS];

export interface ReceiptType {
  id: string;
  user_id: string;
  store_name: string;
  category: string;
  amount: number;
  date: Date;
  etc?: string;
  receipt_image_url?: string;
}

export type AddModalType = "receipt" | "self";

export interface FetchErrorType extends Error {
  code?: number;
  info?: {
    errorCode: string;
    message: string;
  };
}
