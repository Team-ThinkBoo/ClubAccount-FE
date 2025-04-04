import { UserType } from "./user";

export interface CheckDuplicateIdType {
  authId: UserType["email"];
  notDuplicated: boolean;
}

export interface SignupType {
  authId: UserType["email"];
  password: UserType["password"];
  passwordCheck: UserType["password"];
  organization: UserType["organization"];
}
