'use server'

import { redirect } from "next/navigation";

interface IDatasUser {
        phone: string,
        password: string,
        passwordRepeat: string,
      
}
export async function getInfoUser(token: string) {
    const url = process.env.NEXT_PUBLIC_APY_URL;
    if(!token){
        redirect('/')
    }
    try {
        const response = await fetch(`${url}/api/v1/Account/owner`, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ Lang: "RUS" }),
            cache: 'no-store',
        });


        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}