'use server'

export async function searchhRoutes (id:string) {
    const url = process.env.NEXT_PUBLIC_APY_URL;
    const datas = {
        "SearchId": id,
    };
    try {
        
        const response = await fetch(`${url}/api/v1/routes/getSearch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datas),
            cache: 'no-store',

        });
        const dat = await response.json();
        return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}