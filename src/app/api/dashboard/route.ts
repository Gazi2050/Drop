import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/utils/getUserFromToken';
import { connectDB } from '@/libs/connectDB';
import { getFilesByEmail } from '@/services/getFilesByEmail';

export async function GET() {
    try {
        const user = await getUserFromToken();
        if (!user || !user.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const client = await connectDB();
        const files = await getFilesByEmail(client, user.email);
        client.release();

        return NextResponse.json({ success: true, files });
    } catch (error) {
        console.error('Dashboard fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch files' },
            { status: 500 }
        );
    }
}
