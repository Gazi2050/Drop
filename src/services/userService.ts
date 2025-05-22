import { connectDB } from "@/libs/connectDB";
import crypto from "crypto";

const algorithm = "aes-256-cbc";

// ⚠️ Use strong, securely stored key in production
const key = crypto.createHash('sha256').update(String("your-secret-key")).digest("base64").substr(0, 32);
const iv = Buffer.alloc(16, 0); // Fixed IV (16 bytes of zero)

function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decrypt(encrypted: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

export const checkEmailExists = async (email: string) => {
    const client = await connectDB();
    const result = await client.query("SELECT 1 FROM users WHERE email = $1", [email]);
    client.release();
    return result.rowCount && result.rowCount > 0;
};

export const createUser = async (email: string, password: string, username: string) => {
    const client = await connectDB();
    const encryptedPassword = encrypt(password);

    const result = await client.query(
        "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id",
        [email, encryptedPassword, username]
    );

    client.release();
    return result.rows[0].id;
};

export const validateUser = async (email: string, password: string) => {
    const client = await connectDB();
    const result = await client.query(
        "SELECT username, password FROM users WHERE email = $1",
        [email]
    );
    client.release();

    if (result.rowCount === 0) return null;

    const decryptedPassword = decrypt(result.rows[0].password);
    return decryptedPassword === password ? result.rows[0].username : null;
};
