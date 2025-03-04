'use client'

import { createContext, useContext, useState } from "react";

const PricePromoProvaider = createContext<any>(undefined);
const PriceBaggageProvaider = createContext<any>(undefined);
const RecoveryFormProvaider = createContext<any>(undefined);
const SingFormVisibleProvaider = createContext<any>(undefined);
export function PricePromoContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [pricePromo, setPricePromo] = useState('');
    return (
        <PricePromoProvaider.Provider value={{ pricePromo, setPricePromo }}>
            {children}
        </PricePromoProvaider.Provider>
    )
}
export function PriceBaggageContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [priceBaggage, setPriceBaggage] = useState([]);
    return (
        <PriceBaggageProvaider.Provider value={{ priceBaggage, setPriceBaggage }}>
            {children}
        </PriceBaggageProvaider.Provider>
    )
}
export function RecoveryFormContext({
    children,
}:{
    children: React.ReactNode}) {
        const [isRecoveryForm, setIsRecoveryForm] = useState(false);
     return(
        <RecoveryFormProvaider.Provider value={{ isRecoveryForm, setIsRecoveryForm }}>
            {children}
        </RecoveryFormProvaider.Provider>
     )   
}
export function SingFormVisibleContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [isOpenSing, setIsOpenSing] = useState({
        visibleForm: false,
        valueButton: true,
    });

    const toggleVisibleForm = () => {
        setIsOpenSing((prev) => ({ ...prev, visibleForm: !prev.visibleForm }));
    };

    const setValueButton = (value:any) => {
        setIsOpenSing((prev) => ({ ...prev, valueButton: value }));
    };
    return (
        <SingFormVisibleProvaider.Provider value={{ isOpenSing, toggleVisibleForm, setValueButton }}>
            {children}
        </SingFormVisibleProvaider.Provider>
    )
    
}
export function usePriceContext() {
    return useContext(PricePromoProvaider);
}
export function usePriceBaggageContext() {
    return useContext(PriceBaggageProvaider);
}

export function useRecoveryFormContext() {
    return useContext(RecoveryFormProvaider);
}

export function useSingFormVisibleContext() {
    return useContext(SingFormVisibleProvaider);
}