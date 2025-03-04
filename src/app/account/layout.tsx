


import { UserAccountContext } from "@/contex/userAccount"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Мой аккаунт в Intercars',
    description: 'Intercars - личный кабинет',
    keywords: 'Intercars, личный кабинет',
    openGraph: {
        title: 'Мой аккаунт в Intercars',
        description: 'Intercars - личный кабинет',
        images: [
            {
                url: `https://intercars.ru/opengraph-image.png`,
            },
        ]
    }
}
export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <UserAccountContext>
                {children}
            </UserAccountContext>
        </>
    )

}