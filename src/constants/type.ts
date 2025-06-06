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

export interface User {
    email: string;
    username: string;
    created_at: string;
}

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
};

export interface FilePreviewProps {
    file: File;
    previewUrl?: string;
    onRemove: () => void;
}

export interface UploadAreaProps {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserFile {
    id: string;
    filename: string;
    filetype: string;
    size: string;
    filesize: string;
    fileurl: string;
    created_at: string;
}

export interface UploadSuccessModalProps {
    urls: string[];
    onClose: () => void;
}