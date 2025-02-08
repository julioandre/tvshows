export interface SearchProps {
  placeholder?: string;
  minLength?: number;
  debounceTime?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}
