import { NextRequest, NextResponse } from 'next/server';
import imagekit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';
import { getUserFromToken } from '@/utils/getUserFromToken';
import { connectDB } from '@/libs/connectDB';

const ik = new imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, error: 'No files uploaded' }, { status: 400 });
        }

        const user = await getUserFromToken();

        const urls: string[] = [];

        const dbClient = user ? await connectDB() : null;

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploaded = await ik.upload({
                file: buffer,
                fileName: file.name,
                folder: 'drop-folder',
            });

            urls.push(uploaded.url);

            if (user && dbClient) {
                const id = uuidv4();
                await dbClient.query(
                    `
          INSERT INTO files (id, email, fileName, fileType, fileSize, fileUrl, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, NOW());
        `,
                    [
                        id,
                        user.email,
                        file.name,
                        file.type,
                        file.size,
                        uploaded.url,
                    ]
                );
            }
        }

        if (dbClient) dbClient.release();

        return NextResponse.json({ success: true, urls });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message || 'Upload failed' },
            { status: 500 }
        );
    }
}
