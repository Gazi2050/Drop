import { cookies } from 'next/headers';
import { verifyToken } from '@/libs/jwt';
import { JwtPayload } from 'jsonwebtoken';

export async function getUserFromToken(): Promise<JwtPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (
        typeof payload !== 'object' ||
        payload === null ||
        !('email' in payload)
    ) {
        return null;
    }

    return payload as JwtPayload;
}
