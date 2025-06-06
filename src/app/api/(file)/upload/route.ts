import { NextRequest, NextResponse } from 'next/server';
import imagekit from '@/utils/imagekit';
import { getUserFromToken } from '@/utils/getUserFromToken';
import { connectDB } from '@/libs/connectDB';
import { saveFileToDB } from '@/services/fileService';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, error: 'No files uploaded' }, { status: 400 });
        }

        const user = await getUserFromToken();
        const dbClient = user ? await connectDB() : null;
        const urls: string[] = [];

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploaded = await imagekit.upload({
                file: buffer,
                fileName: file.name,
                folder: 'drop-folder',
            });

            urls.push(uploaded.url);

            if (user && dbClient) {
                await saveFileToDB(dbClient, {
                    id: uploaded.fileId,
                    email: user.email,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                    fileUrl: uploaded.url,
                });
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
