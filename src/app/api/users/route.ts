import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/schemas/userSchema";
import { checkEmailExists, createUser, validateUser } from "@/services/userService";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
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

    } catch (error) {
        console.error("POST /api/users error:", error);
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const password = searchParams.get("password");

        const parsed = userSchema.safeParse({ email, password });

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
        }

        const username = await validateUser(email!, password!);
        if (!username) {
            return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
        }

        return NextResponse.json({ email, username });

    } catch (error) {
        console.error("GET /api/users error:", error);
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
};
