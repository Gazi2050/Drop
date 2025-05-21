import { FieldError } from 'react-hook-form';

export type AuthFormProps = {
    type: 'login' | 'signup';
};

export type FormValues = {
    email: string;
    password: string;
};

export type PasswordErrorsProps = {
    error?: FieldError;
};