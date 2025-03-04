'use server'
export async function postReview (formDatas: any) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    try {
        const response = await fetch(`${url}/api/v1/question/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formDatas),
        });
        const dat = await response.json();
        return dat
     
    }
    catch (error) {
        console.error('Ошибка при отправке данных на сервер отзывов:', error);
    }
}