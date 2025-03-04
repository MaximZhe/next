'use client'

import { createContext, useContext, useState } from "react";

const ModalClientProvaider = createContext<any>(undefined);
const ModalBustiketProvaider = createContext<any>(undefined);
const ModalErrorProvaider = createContext<any>(undefined);
const ModalErrorFormProvaider = createContext<any>(undefined);
const ModalErrorSearchIdProvaider = createContext<any>(undefined);
export function ModalContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [isModal, setIsModal] = useState(false);
    return (
        <ModalClientProvaider.Provider value={{ isModal, setIsModal }}>       
                    {children}
        </ModalClientProvaider.Provider>
    )
}
export function ModalContextBustiket({
    children,
}: {
    children: React.ReactNode
}) {

    const [isOpenModalPlace, setIsOpenModalPlace] = useState(false);

    return (
        <ModalBustiketProvaider.Provider value={{ isOpenModalPlace, setIsOpenModalPlace }}>
            {children}
        </ModalBustiketProvaider.Provider>

    )
}
export function ModalContextError({
    children,
}: {
    children: React.ReactNode
}) {
    const [isModalError, setIsModalError] = useState(false);
    return (

        <ModalErrorProvaider.Provider value={{ isModalError, setIsModalError }}>
            {children}
        </ModalErrorProvaider.Provider>
    )
}
export function ModalContextFormError({
    children,
}: {
    children: React.ReactNode
}) {
    const [isModalErrorForm, setIsModalErrorForm] = useState(false);
    return (

        <ModalErrorFormProvaider.Provider value={{ isModalErrorForm, setIsModalErrorForm }}>
            {children}
        </ModalErrorFormProvaider.Provider>
    )
}
export function ModalContextSearchId({
    children,
}: {
    children: React.ReactNode
}) {
    const [isModalErrorSearchId, setIsModalErrorSearchId] = useState(false);
    return (

        <ModalErrorSearchIdProvaider.Provider value={{ isModalErrorSearchId, setIsModalErrorSearchId }}>
            {children}
        </ModalErrorSearchIdProvaider.Provider>
    )
}
export function useModalContext() {
    return useContext(ModalClientProvaider);
}
export function useModalPlaceContext() {
    return useContext(ModalBustiketProvaider);
}
export function useModalErrorContext() {
    return useContext(ModalErrorProvaider);
} 
export function useModalErrorFormContext() {
    return useContext(ModalErrorFormProvaider);
} 
export function useModalErrorSearchIdContext() {
    return useContext(ModalErrorSearchIdProvaider);
}   