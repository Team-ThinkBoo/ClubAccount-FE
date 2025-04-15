import axios from "axios";
import { LoginResponseType, LoginType } from "../types/auth";
import { createFetchError } from "./axios";

export async function login(loginData: LoginType) {
  try {
    const response = await axios.post<LoginResponseType>(`/api/v1/auth/sign-in`, loginData, {
      withCredentials: true
    });

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "로그인 과정에서 오류가 발생하였습니다!");
  }
}
