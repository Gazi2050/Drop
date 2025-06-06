import imagekit from '@/utils/imagekit';
import { PoolClient } from 'pg';

export async function saveFileToDB(
    dbClient: PoolClient,
    {
        id,
        email,
        fileName,
        fileType,
        fileSize,
        fileUrl,
    }: {
        id: string;
        email: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        fileUrl: string;
    }
) {


    await dbClient.query(
        `
    INSERT INTO files (id, email, fileName, fileType, fileSize, fileUrl, createdAt)
    VALUES ($1, $2, $3, $4, $5, $6, NOW());
  `,
        [id, email, fileName, fileType, fileSize, fileUrl]
    );
}

export async function deleteFileFromDB(dbClient: PoolClient, fileId: string) {
    // Delete from ImageKit
    const result = await new Promise((resolve, reject) => {
        imagekit.deleteFile(fileId, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });

    // Delete from database
    await dbClient.query(`DELETE FROM files WHERE id = $1`, [fileId]);

    return result;
}
