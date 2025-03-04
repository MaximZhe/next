'use server'
export async function fetchGetTicket (datas:any) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    const data = {
        OrderId: datas.OrderId,
        SiteVersionId: datas.SiteVersionId,
        Lang: datas.Lang
    }
    try {
        
        const response = await fetch(`${url}/api/v1/tickets/getTicketBlanks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        const dat = await response.json();
       return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
}