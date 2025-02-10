import type { ValidationResult } from "../utils/types/search";

export function useValidation(value: string, minLength: number = 0) {
  const validate = (): ValidationResult => {
    if (minLength && value.length < minLength) {
      return {
        isValid: false,
        errorMessage: `Search term must be at least ${minLength} characters`,
      };
    }

    return {
      isValid: true,
    };
  };

  return { validate };
}
