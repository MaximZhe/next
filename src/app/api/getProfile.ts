import { cookies } from "next/headers";
import { getInfoUser } from "./actionGetProfileUser";

export const getInfoProfile = async () => {
    const cookie =  cookies();
    const token = cookie.get('token')
    try {
        const res = await getInfoUser(token !== undefined ? token.value : '')
        return res
    }
    catch (error) {
        console.log(error)
    }
}