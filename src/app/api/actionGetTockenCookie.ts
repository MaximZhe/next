'use server'

import { cookies } from 'next/headers';

export const getTockenCookie = async () => {
    const cookieTocken = await cookies().get('token')
    return cookieTocken
}