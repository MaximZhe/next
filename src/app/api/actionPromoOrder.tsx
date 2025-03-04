'use server'
export async function fetchGetPromoPrice (datasPromo:any) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    
    try {
        
        const response = await fetch(`${url}/api/v1/tickets/promoPrice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datasPromo),
            cache: 'no-store',
        });
        const dat = response.json();
       return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}
