import { ChangePWRequestType, ChnageProfileType, ProfileType } from "@/types/mypage";
import { createFetchError } from "./axios";
import api from "./axiosInstance";

export async function patchEmail(email: string) {
  const formData = new FormData();
  const json = JSON.stringify({
    authId: email
  });

  formData.append("profile", new Blob([json], { type: "application/json" }));

  try {
    const response = await api.patch(
      `${import.meta.env.VITE_API_BASE_URL}/v1/profile/update`,
      formData
    );
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "이메일 수정 과정에서 오류가 발생하였습니다!");
  }
}

export async function getProfile() {
  try {
    const response = await api.get(`${import.meta.env.VITE_API_BASE_URL}/v1/profile`);
    return response.data as ProfileType;
  } catch (error: unknown) {
    throw createFetchError(error, "프로필 정보 로드 과정에서 오류가 발생하였습니다!");
  }
}

export async function patchLink() {
  try {
    const response = await api.patch(
      `${import.meta.env.VITE_API_BASE_URL}/v1/profile/regenerate-link`
    );
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "사용자 링크 수정 과정에서 오류가 발생하였습니다!");
  }
}

export async function patchPassword(data: ChangePWRequestType) {
  try {
    const response = await api.patch(
      `${import.meta.env.VITE_API_BASE_URL}/v1/profile/password`,
      data,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "사용자 링크 수정 과정에서 오류가 발생하였습니다!");
  }
}

export async function patchProfile(data: ChnageProfileType) {
  const formData = new FormData();
  const json = JSON.stringify(data.profile);

  formData.append("profile", new Blob([json], { type: "application/json" }));

  if (data.profileImage) {
    formData.append("profileImage", data.profileImage);
  }

  try {
    const response = await api.patch(
      `${import.meta.env.VITE_API_BASE_URL}/v1/profile/update`,
      formData
    );
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "프로필 수정 과정에서 오류가 발생하였습니다!");
  }
}

export async function deleteProfile() {
  try {
    const response = await api.delete(`${import.meta.env.VITE_API_BASE_URL}/v1/users`);
    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "프로필 삭제 과정에서 오류가 발생하였습니다!");
  }
}
