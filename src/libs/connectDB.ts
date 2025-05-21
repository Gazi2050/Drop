import { Pool, PoolClient } from "pg";

let pool: Pool | null = null;

export const connectDB = async (): Promise<PoolClient> => {
    if (!pool) {
        const uri = process.env.NEXT_PUBLIC_DB_URL;
        if (!uri) throw new Error("NEXT_PUBLIC_DB_URL is not defined");

        pool = new Pool({
            connectionString: uri,
            ssl: {
                rejectUnauthorized: false,
            },
        });
    }

    try {
        const client = await pool.connect();
        return client;
    } catch (error) {
        console.error("Failed to connect to PostgreSQL:", error);
        throw new Error("Database connection failed");
    }
};
