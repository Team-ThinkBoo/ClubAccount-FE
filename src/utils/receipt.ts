import api from "./axiosInstance";
import { createFetchError } from "./axios";
import {
  LoadReceiptsResponseType,
  ParseReceiptRequestType,
  ParseReceiptResponseType,
  ReceiptRequestType
} from "../types/receipt";
import axios from "axios";

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
  const token = localStorage.getItem("accessToken");

  if (datas.image) {
    formData.append("image", datas.image);
  }

  try {
    const response = await api.post("/api/v1/receipts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });

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
}

export async function loadReceipts({ page, link, size, sort }: loadReceiptsProps) {
  let api = `/api/v1/${link}/receipts?page=${page}`;
  if (size) {
    api += `&size=${size}`;
  }
  if (sort) {
    api += `&sort=${sort}`;
  }

  try {
    const response = await axios.get<LoadReceiptsResponseType>(api);
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "영수증 로딩 과정에서 오류가 발생하였습니다!");
  }
}
