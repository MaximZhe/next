'use client'

import { createContext, useContext, useState } from "react";

const UserAccountProvaider = createContext<any>(undefined);

export function UserAccountContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [accountData, setAccountData] = useState({
        sectionName: 'Мои поездки',
        currentForm: 'login',
        stateButtonLogIn: false,
        valueTicketDetail: false,
    });

    const toggleSectionContent = (newSectionName: string) => {
        setAccountData((prev) => ({ ...prev, sectionName: newSectionName }));
    };
    
    const toggleFormContent = (newFormName: string) => {
        setAccountData((prev) => ({ ...prev, currentForm: newFormName }));
    }
    const toogleStateButton = (newState: boolean) => {
        setAccountData((prev) => ({...prev, stateButtonLogIn: newState }))
    }
    const toggleValueTicketDetail = (newValue: boolean) => {
        setAccountData((prev) => ({...prev, valueTicketDetail: newValue }))
    }
    return (
        <UserAccountProvaider.Provider value={{ accountData, toggleSectionContent,toggleFormContent,toogleStateButton,toggleValueTicketDetail }}>
            {children}
        </UserAccountProvaider.Provider>
    )
}

export function useUserAccountContext() {
    return useContext(UserAccountProvaider);
}