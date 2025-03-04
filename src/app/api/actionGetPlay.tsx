'use server'
export async function getBooking (formDatas: any) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    try {
        const response = await fetch(`${url}/api/v1/tickets/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formDatas),
            cache: 'no-store',
        });
        const dat = response.json();
       return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}