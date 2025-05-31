import axios from "axios";
import { LoginResponseType, LoginType, resetPasswordType } from "../types/auth";
import { createFetchError } from "./axios";
import api from "./axiosInstance";

export async function login(loginData: LoginType) {
  try {
    const response = await axios.post<LoginResponseType>(
      `${import.meta.env.VITE_API_BASE_URL}/v1/auth/sign-in`,
      loginData,
      {
        withCredentials: true
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "로그인 과정에서 오류가 발생하였습니다!");
  }
}

export async function logoutFn() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post(
      `${import.meta.env.VITE_API_BASE_URL}/v1/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );

    return response;
  } catch (error: unknown) {
    throw createFetchError(error, "로그아웃 과정에서 오류가 발생하였습니다!");
  }
}

export async function resetPassword(data: resetPasswordType) {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_API_BASE_URL}/v1/auth/reset-password`,
      data,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "비밀번호 수정 과정에서 오류가 발생하였습니다!");
  }
}
