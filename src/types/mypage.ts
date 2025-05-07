import { UserType } from "./user";

export interface ProfileType {
  department: string;
  email: string;
  profileUrl?: string;
  link: string;
  createdAt: string;
}

export interface ChangePasswordType {
  password: UserType["password"];
  passwordCheck: UserType["password"];
}

export interface ChangePWRequestType {
  currentPassword: UserType["password"];
  newPassword: UserType["password"];
  confirmPassword: UserType["password"];
}

export interface ChnageProfileType {
  profileImage?: File;
  profile?: {
    organization?: string;
    authId?: string;
  };
}
