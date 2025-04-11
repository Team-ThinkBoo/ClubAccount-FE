import axios from "axios";
import { LoginResponseType, LoginType } from "../types/auth";
import { createFetchError } from "./axios";

export async function login(loginData: LoginType) {
  try {
    const response = await axios.post<LoginResponseType>(`/api/v1/auth/sign-in`, loginData, {
      withCredentials: true
    });

    localStorage.setItem("accessToken", response.data.accessToken);

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "로그인 과정에서 오류가 발생하였습니다!");
  }
}

export async function getNewAccessToken() {
  try {
    const response = await axios.post<LoginResponseType>(
      `/api/v1/auth/token`,
      {},
      {
        withCredentials: true
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "액세스 토큰 생성 과정에서 오류가 발생하였습니다!");
  }
}
