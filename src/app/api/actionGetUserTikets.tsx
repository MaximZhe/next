'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface IGetTikets {
    UserId: string
    Status: number
    Page: number 
}
export async function getTicketsUser(datas: IGetTikets) {
    const token = cookies().get('token')?.value
    const url = process.env.NEXT_PUBLIC_APY_URL;
    if(!token){
        redirect('/')
    }
    const data = {

        Page: datas.Page,
        PageSize: 10,
        UserId: datas.UserId,
        Status: datas.Status,
        Lang: "RUS",

    }
    try {

        const response = await fetch(`${url}/api/v1/tickets/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        const dat = await response.json();
        return dat

    }
    catch (error) {
        
        console.error('Ошибка при отправке данных на сервер getTickets:', error);
    }
}