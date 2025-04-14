import axios from "axios";
import { createFetchError } from "./axios";
import {
  ParseReceiptRequestType,
  ParseReceiptResponseType,
  ReceiptRequestType
} from "../types/receipt";

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
    const response = await axios.post("/api/v1/receipts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "영수증 파싱 과정에서 오류가 발생하였습니다!");
  }
}
