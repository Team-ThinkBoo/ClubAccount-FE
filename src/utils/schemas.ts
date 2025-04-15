import { z } from "zod";

export const signupSchema = z
  .object({
    authId: z.string().email("📧 유효한 이메일을 입력하세요!"),
    organization: z.string().min(1, "🏢 조직명을 입력하세요!"),
    password: z
      .string()
      .min(8, "🔒 비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/[A-Za-z]/, "🔠 문자를 포함해야 합니다.")
      .regex(/[0-9]/, "🔢 숫자를 포함해야 합니다.")
      .regex(/[!@#$%^&*]/, "🔣 특수문자(!@#$%^&*)를 포함해야 합니다."),
    passwordCheck: z.string()
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "❌ 비밀번호가 일치하지 않습니다!"
  });

export const changePwSchema = z
  .object({
    authId: z.string().email("📧 유효한 이메일을 입력하세요!"),
    password: z
      .string()
      .min(8, "🔒 비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/[A-Za-z]/, "🔠 문자를 포함해야 합니다.")
      .regex(/[0-9]/, "🔢 숫자를 포함해야 합니다.")
      .regex(/[!@#$%^&*]/, "🔣 특수문자(!@#$%^&*)를 포함해야 합니다."),
    passwordCheck: z.string()
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "❌ 비밀번호가 일치하지 않습니다!"
  });

export const authIdSchema = z.object({
  authId: z.string().email("📧 유효한 이메일을 입력하세요!")
});

export const organizationSchema = z.object({
  organization: z.string().min(1, "🏢 조직명을 입력하세요!")
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "🔒 비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[A-Za-z]/, "🔠 문자를 포함해야 합니다.")
    .regex(/[0-9]/, "🔢 숫자를 포함해야 합니다.")
    .regex(/[!@#$%^&*]/, "🔣 특수문자(!@#$%^&*)를 포함해야 합니다."),
  passwordCheck: z.string()
});

export const passwordCheckSchema = z
  .object({
    password: z.string(),
    passwordCheck: z.string()
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "❌ 비밀번호가 일치하지 않습니다!"
  });

export const loginSchema = z
  .object({
    authId: z.string().trim(),
    password: z.string().trim()
  })
  .superRefine((data, ctx) => {
    const hasId = !!data.authId;
    const hasPw = !!data.password;

    if (!hasId && !hasPw) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "아이디와 비밀번호를 입력해주세요"
      });
    } else if (!hasId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "아이디를 입력해주세요"
      });
    } else if (!hasPw) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호를 입력해주세요"
      });
    }
  });
