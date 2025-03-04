'use server'

import { formatedDateFetch } from "../utils/formatedDateFetch";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
export async function setUpdateProfile(datas: any) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    const token = cookies().get('token')?.value
    const newDateFormated = formatedDateFetch(datas.birthDate); 
    if(!token){
        redirect('/')
    }
    const data = {
        FirstName: datas.firstName,    
        LastName: datas.lastName,
        MiddleName: datas.middleName,
        Email: datas.email,
        Phone: datas.phone,
        NewPassword: datas.Password,
        ConfirmPassword: datas.confirmPassword,
        Lang: "RUS",
        Pasport: datas.pasport,
        DateOfBirthDay: newDateFormated
    }
    try {

        const response = await fetch(`${url}/api/v1/Account/Update`, {
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
        // console.log(dat)
        return dat

    }
    catch (error) {
        console.error('Ошибка при отправке сохранения профиля на сервер:', error);
    }
    finally{
        
    }
}