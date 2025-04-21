import { CATEGORY } from "../constants/constants";

export interface ParseReceiptRequestType {
  image: File;
}

export interface ParseReceiptResponseType {
  MerchantAddress: string;
  MerchantName: string;
  Total: number;
  TransactionDate: string;
  Items: {
    Description: string;
    Price: number;
    Quantity: number;
    TotalPrice: number;
  }[];
}

export type CategoryKeyType = keyof typeof CATEGORY;
export type CategoryValueType = (typeof CATEGORY)[keyof typeof CATEGORY];

export interface ReceiptRequestType {
  image?: File;
  request: {
    category?: CategoryKeyType;
    date: string;
    businessName: string;
    amount: number;
    etc: string;
    receiptItems: ReceiptItemsType[];
  };
}

export interface ReceiptItemsType {
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
}

export interface ReceiptType {
  id: number;
  category: CategoryKeyType;
  businessName: string;
  date: string;
  amount: number;
  etc: string;
  receiptImageUrl: string;
}

export interface LoadReceiptsResponseType {
  content: ReceiptType[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export interface LoadReceiptDetailResponseType extends ReceiptType {
  receiptItems: ({
    id: number;
  } & ReceiptItemsType)[];
}
