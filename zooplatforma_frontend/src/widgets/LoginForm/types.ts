import React from 'react';

export interface LoginFormProps {
  emailValue: string;
  passwordValue: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  emailError: string;
  passwordError: string;
  isSubmitting?: boolean;
  forgotPasswordLink?: string;
  registrationLink: string;
  className?: string;
  // enableSocialLogin?: boolean; оставлю на всякий
}
