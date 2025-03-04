'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function fetchDetailTicket(id:string) {
    const token = cookies().get('token')?.value;
    if(!token){
        redirect('/')
    }
    const url = process.env.NEXT_PUBLIC_APY_URL;
    const data = {
        Number: id,
        Lang: "RUS"
    }
    try {

        const response = await fetch(`${url}/api/v1/tickets/details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        const dat = await response.json();
        // console.log(dat)
        return dat

    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}