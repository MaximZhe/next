'use server'

interface IDatasRegistration {
        phone: string,
        password: string,
        passwordRepeat: string,
      
}
export async function setRegistration(datas: IDatasRegistration) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    const onlyPhone = datas.phone.replace(/\D/g, '');
    const data = {
        UserName: `+${onlyPhone}`,
        Password: datas.password,
        ConfirmPassword: datas.passwordRepeat,
        FirstName: '',
        LastName: '',
        MiddleName: '',
        Lang: "RUS"
    }
    try {

        const response = await fetch(`${url}/api/v1/Account/Register`, {
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