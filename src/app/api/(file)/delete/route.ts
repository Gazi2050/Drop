import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/libs/connectDB';
import { getUserFromToken } from '@/utils/getUserFromToken';
import { deleteFile } from '@/services/fileService';


export async function DELETE(req: NextRequest) {
    try {
        const user = await getUserFromToken();
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const fileId = searchParams.get('id');
        if (!fileId) {
            return NextResponse.json({ success: false, error: 'File ID is required' }, { status: 400 });
        }

        const dbClient = await connectDB();
        try {
            await deleteFile(dbClient, fileId);
        } finally {
            dbClient.release();
        }

        return NextResponse.json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message || 'Delete failed' },
            { status: 500 }
        );
    }
}
