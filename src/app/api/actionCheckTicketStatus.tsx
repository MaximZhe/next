'use server'
export async function fetchStatusTicket (placeData: any) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    try {
        
        const response = await fetch(`${url}/api/v1/tickets/selectplace`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(placeData),
            cache: 'no-store',
        });
        const dat = await response.json();
       return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}
export async function fetchStatusTicketRemove (placeData: any) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    try {
        
        const response = await fetch(`${url}/api/v1/tickets/removeplace`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(placeData),
            cache: 'no-store',
        });
        const dat = await response.json();
       return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}