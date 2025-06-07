import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/schemas/userSchema";
import { checkEmailExists, createUser, validateUser } from "@/services/userService";
import { signToken } from "@/libs/jwt";

interface UserRequestBody {
    email: string;
    password: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const body: UserRequestBody = await req.json();
        const parsed = userSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
        }

        const { email, password } = parsed.data;
        const username = email.split("@")[0];

        const emailTaken = await checkEmailExists(email);
        if (emailTaken) {
            return NextResponse.json({ message: "Email is already registered" }, { status: 409 });
        }

        const insertedId = await createUser(email, password, username);
        return NextResponse.json({ message: "User registered successfully", insertedId }, { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("POST /api/users error:", error.message);
        } else {
            console.error("POST /api/users unknown error:", error);
        }
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const password = searchParams.get("password");

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password required." }, { status: 400 });
        }

        const parsed = userSchema.safeParse({ email, password });

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
        }

        const user = await validateUser(email, password);
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
        }

        const { username, created_at } = user;

        const token = signToken({ email, username, created_at });

        const response = NextResponse.json({ email, username, created_at });
        response.headers.set(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`
        );

        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("GET /api/users error:", error.message);
        } else {
            console.error("GET /api/users unknown error:", error);
        }
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
};
