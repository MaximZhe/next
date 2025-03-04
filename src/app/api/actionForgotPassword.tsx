'use server'
export async function getCodeMassage (phone: string) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    const data = {
        Lang: "RUS",
        Phone: phone
    }
    try {
        
        const response = await fetch(`${url}/api/v1/Account/ForgotPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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