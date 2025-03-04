import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST(request: NextRequest) {
    const token = cookies().get('token')?.value;
    const url = process.env.NEXT_PUBLIC_APY_URL;
    if(!token){
        redirect('/')
    }
    const data = {
        Lang: 'RUS',
    };

    try {
        const response = await fetch(`${url}/api/v1/Account/Delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message || 'Failed to delete account' }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result); 
    } catch (error) {
        console.error('Ошибка при отправке данных на сервер Delete Account:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}