import { UserType } from "./user";

export interface CheckDuplicateIdType {
  authId: UserType["email"];
  notDuplicated: boolean;
}

export interface VerifyCodeType {
  email: UserType["email"];
  code: string;
}

export interface SignupType {
  authId: UserType["email"];
  password: UserType["password"];
  passwordCheck: UserType["password"];
  organization?: UserType["organization"];
}

export type SignupErrorType = {
  _errors?: string[];
} & Partial<Record<keyof SignupType, { _errors: string[] }>>;

export type LoginType = Pick<SignupType, "authId" | "password">;

export interface LoginErrorType {
  _errors?: string[];
}

export interface LoginResponseType {
  accessToken: string;
}

export interface VerifyResponseType {
  success: boolean;
  message: string;
}
