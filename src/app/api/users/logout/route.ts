import { NextResponse } from "next/server";

export const POST = async () => {
    const response = NextResponse.json({ message: "Logged out successfully" });

    response.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    return response;
};
