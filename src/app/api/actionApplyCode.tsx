'use server'

interface IDatasReset {
    code: string,
    phone: string,
    password: string,
    confirmPassword: string
}
export async function setNewPassword(datas: IDatasReset) {

    const url = process.env.NEXT_PUBLIC_APY_URL;
    const data = {
        Code: datas.code,
        Phone: datas.phone,
        Password: datas.password,
        ConfirmPassword: datas.confirmPassword,
        Lang: "RUS"
    }
    try {

        const response = await fetch(`${url}/api/v1/Account/ResetPassword`, {
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