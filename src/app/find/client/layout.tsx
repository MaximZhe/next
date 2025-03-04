

import { PriceBaggageContext, PricePromoContext } from "@/contex/index"
import { ModalContext, ModalContextBustiket, ModalContextError, ModalContextFormError } from "@/contex/modal"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Intercars - покупка билета',
    description: 'Intercars - покупка билета',
    keywords: 'Intercars - покупка билета',
    openGraph: {
        title: 'Intercars - покупка билета',
        description: 'Intercars - покупка билета',
        images: [
            {
                url: `https://intercars.ru/opengraph-image.png`,
            },
        ]
    }
}
export default function BookingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <PricePromoContext>
                <PriceBaggageContext>
                    <ModalContext>
                        <ModalContextBustiket>
                            <ModalContextError>
                                <ModalContextFormError>
                                    {children}
                                </ModalContextFormError>
                            </ModalContextError>
                        </ModalContextBustiket>
                    </ModalContext>
                </PriceBaggageContext>
            </PricePromoContext>

        </>

    )

}