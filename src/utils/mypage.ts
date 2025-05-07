import { ProfileType } from "@/types/mypage";
import { createFetchError } from "./axios";
import api from "./axiosInstance";

export async function patchEmail(email: string) {
  const formData = new FormData();
  const json = JSON.stringify({
    authId: email
  });

  formData.append("profile", new Blob([json], { type: "application/json" }));

  try {
    const response = await api.patch("/api/v1/profile/update", formData);
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "이메일 수정 과정에서 오류가 발생하였습니다!");
  }
}

export async function getProfile() {
  try {
    const response = await api.get("/api/v1/profile");
    return response.data as ProfileType;
  } catch (error: unknown) {
    throw createFetchError(error, "이메일 수정 과정에서 오류가 발생하였습니다!");
  }
}
