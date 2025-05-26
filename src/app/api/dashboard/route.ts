import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/utils/getUserFromToken';
import { connectDB } from '@/libs/connectDB';

export async function GET() {
    try {
        const user = await getUserFromToken();
        if (!user || !user.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const client = await connectDB();
        const result = await client.query(
            'SELECT * FROM files WHERE email = $1 ORDER BY created_at DESC',
            [user.email]
        );
        client.release();

        return NextResponse.json({ success: true, files: result.rows });
    } catch (error) {
        console.error('Dashboard fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch files' },
            { status: 500 }
        );
    }
}
