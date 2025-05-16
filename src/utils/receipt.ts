import api from "./axiosInstance";
import { createFetchError } from "./axios";
import {
  LoadReceiptsResponseType,
  ParseReceiptRequestType,
  ParseReceiptResponseType,
  ReceiptItemsType,
  ReceiptRequestType,
  ReceiptType
} from "../types/receipt";
import axios from "axios";
import { LoginResponseType } from "../types/auth";
import { UpdateReceiptProps } from "../hooks/useReceipts";

export async function parseReceipt({ image }: ParseReceiptRequestType) {
  try {
    const response = await axios.post<ParseReceiptResponseType>(
      "https://kohn54c7m9.execute-api.ap-northeast-2.amazonaws.com/default/receipt-ocr",
      image,
      {
        headers: {
          "Content-Type": image.type
        }
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "영수증 파싱 과정에서 오류가 발생하였습니다!");
  }
}

export async function createReceipt(datas: ReceiptRequestType) {
  const formData = new FormData();
  const uploaderString = JSON.stringify(datas.request);
  formData.append("request", new Blob([uploaderString], { type: "application/json" }));

  if (datas.image) {
    formData.append("image", datas.image);
  }

  try {
    const response = await api.post(
      `${import.meta.env.VITE_API_BASE_URL}/v1/receipts/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "영수증 생성 과정에서 오류가 발생하였습니다!");
  }
}

interface loadReceiptsProps {
  page: number;
  link: string;
  size?: number;
  sort?: "createAt,asc" | "createAt,desc";
  startDate?: string;
  endDate?: string;
}

export async function loadReceipts({
  page,
  link,
  size,
  sort,
  startDate,
  endDate
}: loadReceiptsProps) {
  let api = `${import.meta.env.VITE_API_BASE_URL}/v1/${link}/receipts?page=${page}`;
  if (size) {
    api += `&size=${size}`;
  }
  if (sort) {
    api += `&sort=${sort}`;
  }
  if (startDate) {
    api += `&startDate=${startDate}`;
  }
  if (endDate) {
    api += `&endDate=${endDate}`;
  }

  try {
    const response = await axios.get<LoadReceiptsResponseType>(api);
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "영수증 로딩 과정에서 오류가 발생하였습니다!");
  }
}

export async function loadReceiptDetail(link: LoginResponseType["link"], id: ReceiptType["id"]) {
  try {
    const response = await axios.get<ReceiptItemsType[]>(
      `${import.meta.env.VITE_API_BASE_URL}/v1/${link}/receipts/${id}`
    );

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "영수증 로딩 과정에서 오류가 발생하였습니다!");
  }
}

export async function updateReceipt({ id, datas }: UpdateReceiptProps) {
  try {
    const response = await api.put(
      `${import.meta.env.VITE_API_BASE_URL}/v1/receipts/${id}`,
      datas,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "영수증 업데이트 과정에서 오류가 발생하였습니다!");
  }
}
