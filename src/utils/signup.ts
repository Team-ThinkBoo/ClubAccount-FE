import { CheckDuplicateIdType, SignupType } from "../types/auth";
import { FetchErrorType } from "../types/types";
import { UserType } from "../types/user";
import { login } from "./login";

async function checkDuplicateId(email: UserType["email"]) {
  const response = await fetch(`/api/v1/users/sign-up/check-duplicate-auth-id?auth-id=${email}`);

  if (!response.ok) {
    const error: FetchErrorType = new Error("이메일 중복 확인 과정에서 오류가 발생하였습니다!");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { notDuplicated } = (await response.json()) as CheckDuplicateIdType;

  return !notDuplicated;
}

export async function sendVerificationEmail(email: UserType["email"]) {
  const isDuplicate = await checkDuplicateId(email);

  if (isDuplicate) {
    const error: FetchErrorType = new Error("이메일이 중복되었습니다!");
    error.code = 409;
    error.info = { errorCode: "409 Conflict", message: "이메일이 중복되었습니다!" };
    throw error;
  }
}

export async function checkVerificationEmail(code: string) {
  console.log(code);
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
