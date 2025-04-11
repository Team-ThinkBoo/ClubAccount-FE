import axios from "axios";
import {
  CheckDuplicateIdType,
  SignupType,
  VerifyCodeType,
  VerifyResponseType
} from "../types/auth";
import { FetchErrorType } from "../types/types";
import { UserType } from "../types/user";
import { login } from "./login";
import { createFetchError } from "./axios";

export async function checkDuplicateId(email: UserType["email"]) {
  const response = await fetch(`/api/v1/users/sign-up/check-duplicate-auth-id?auth-id=${email}`);

  if (!response.ok) {
    const error: FetchErrorType = new Error("이메일 중복 확인 과정에서 오류가 발생하였습니다!");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { notDuplicated } = (await response.json()) as CheckDuplicateIdType;

  if (!notDuplicated) {
    const error: FetchErrorType = new Error("이메일이 중복되었습니다!");
    error.code = 409;
    error.info = { errorCode: "409 Conflict", message: "이메일이 중복되었습니다!" };
    throw error;
  }

  return email;
}

export async function sendVerificationEmail(email: UserType["email"]) {
  try {
    const response = await axios.post(`/api/v1/email/send`, { email });

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "인증 이메일 발송 과정에서 오류가 발생하였습니다!");
  }
}

export async function checkVerificationEmail({ code, email }: VerifyCodeType) {
  try {
    const response = await axios.post<VerifyResponseType>(`/api/v1/email/verify`, {
      email,
      code
    });

    return response.data;
  } catch (error: unknown) {
    throw createFetchError(error, "인증 이메일 발송 과정에서 오류가 발생하였습니다!");
  }
}

export async function signup(signupData: SignupType) {
  const response = await fetch(`/api/v1/users/sign-up`, {
    method: "POST",
    body: JSON.stringify(signupData),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const error: FetchErrorType = new Error("회원가입중 에러가 발생하였습니다.");
    error.code = response.status;
    error.info = await response.json();
    console.log(error.info);
    throw error;
  }

  const loginData = await login({
    authId: signupData.authId,
    password: signupData.password
  });

  return loginData;
}
