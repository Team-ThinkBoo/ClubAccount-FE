import { ReceiptType } from "../types/types";
import { promiseFetch } from "./promiseFetch";

export function receiptLoader() {
  const data = promiseFetch<ReceiptType[]>("http://localhost:3000/receipt");

  return { data };
}
