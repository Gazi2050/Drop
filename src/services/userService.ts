import { connectDB } from "@/libs/connectDB";
import bcrypt from "bcryptjs";

export const checkEmailExists = async (email: string) => {
    const client = await connectDB();
    const result = await client.query("SELECT 1 FROM users WHERE email = $1", [email]);
    client.release();
    return result.rowCount && result.rowCount > 0;
};

export const createUser = async (email: string, password: string, username: string) => {
    const client = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
        "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id",
        [email, hashedPassword, username]
    );
    client.release();
    return result.rows[0].id;
};

export const validateUser = async (email: string, password: string) => {
    const client = await connectDB();
    const result = await client.query("SELECT username, password FROM users WHERE email = $1", [email]);
    client.release();

    if (result.rowCount === 0) return null;

    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    return isMatch ? result.rows[0].username : null;
};
