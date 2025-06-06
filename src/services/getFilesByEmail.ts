import { PoolClient } from 'pg';

export async function getFilesByEmail(client: PoolClient, email: string) {
    const result = await client.query(
        'SELECT * FROM files WHERE email = $1 ORDER BY createdAt DESC',
        [email]
    );
    return result.rows;
}
