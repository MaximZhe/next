'use server';

import { NextRequest, NextResponse } from 'next/server';

const url = process.env.NEXT_PUBLIC_APY_URL;
async function authenticateUser(username: string, password: string) {
    const response = await fetch(`${url}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'password',
            username,
            password,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
    }

    return await response.json();
}

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();

    try {
        const authResult = await authenticateUser(username, password);

        
        const response = NextResponse.json(authResult, { status: 200 });
        response.cookies.set('token', authResult.access_token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60,   
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}