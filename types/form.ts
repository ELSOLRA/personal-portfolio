export interface FormStatus {
  submitted: boolean;
  submitting: boolean;
  error: boolean;
  message: string | null;
  visible: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
