import { PoolClient } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export async function saveFileToDB(
    dbClient: PoolClient,
    {
        email,
        fileName,
        fileType,
        fileSize,
        fileUrl,
    }: {
        email: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        fileUrl: string;
    }
) {
    const id = uuidv4();

    await dbClient.query(
        `
    INSERT INTO files (id, email, fileName, fileType, fileSize, fileUrl, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW());
  `,
        [id, email, fileName, fileType, fileSize, fileUrl]
    );
}
