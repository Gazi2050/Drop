import { PasswordErrorsProps } from '@/constants/type';
import React from 'react';

const PasswordErrors: React.FC<PasswordErrorsProps> = ({ error }) => {
    if (!error) return null;

    // error.message can be string or string[]
    const messages = error.message?.toString().split(', ') || [];

    if (messages.length === 1) {
        return <p className="text-xs text-red-500 mt-1">{messages[0]}</p>;
    }

    return (
        <ul className="text-xs text-red-500 mt-1 list-disc list-inside space-y-0.5">
            {messages.map((msg, idx) => (
                <li key={idx}>{msg}</li>
            ))}
        </ul>
    );
};

export default PasswordErrors;
