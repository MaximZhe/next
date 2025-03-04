'use server'
export async function getSingle (datas: any) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    try {
        const response = await fetch(`${url}/api/v1/routes/getRoute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datas),
            cache: 'no-store',
        });
        const dat = response.json();
       return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}