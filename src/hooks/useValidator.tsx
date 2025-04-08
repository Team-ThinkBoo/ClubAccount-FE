import { useState, useCallback } from "react";
import { ZodSchema } from "zod";

export function useValidator<ErrorType>() {
  const [errors, setErrors] = useState<Partial<ErrorType>>({});

  const validateAndRun = useCallback(
    <T,>(schema: ZodSchema<T>, data: unknown, onSuccess: (data: T) => void) => {
      const result = schema.safeParse(data);

      if (!result.success) {
        setErrors(result.error.format() as ErrorType);
        return;
      }

      setErrors({});
      onSuccess(result.data);
    },
    []
  );

  return { errors, setErrors, validateAndRun };
}
