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

export type User = {
    email: string;
    username: string;
};

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
};