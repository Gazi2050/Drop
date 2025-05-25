import { NextRequest, NextResponse } from 'next/server';
import imagekit from 'imagekit';

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

        const urls = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const uploaded = await ik.upload({
                    file: buffer,
                    fileName: file.name,
                    folder: 'drop-folder',
                });

                return uploaded.url;
            })
        );

        return NextResponse.json({ success: true, urls });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message || 'Upload failed' },
            { status: 500 }
        );
    }
}
