"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const fetchUser = useAuthStore((s) => s.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return <>{children}</>;
}
