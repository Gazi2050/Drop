import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/libs/jwt";
import { JwtPayload } from "jsonwebtoken";

export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const payload = verifyToken(token);

        if (
            typeof payload !== "object" ||
            payload === null ||
            !("email" in payload) ||
            !("username" in payload)
        ) {
            return NextResponse.json({ message: "Invalid token structure" }, { status: 401 });
        }

        return NextResponse.json({
            email: (payload as JwtPayload).email,
            username: (payload as JwtPayload).username,
            created_at: (payload as JwtPayload).created_at,
        });
    } catch (err) {
        return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
    }
};
