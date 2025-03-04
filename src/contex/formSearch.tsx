'use client'

import { createContext, useContext, useState } from "react";

const CitySelectionProvider = createContext<any>(undefined);

export function CitySelectionContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [citySelectionData, setCitySelectionData] = useState({
        IArrivalSelect: { isCurrent: false, name: '' },
        IDepartureSelect: { isCurrent: false, name: '' },
        cityDepartureData: { Result: [], Error: null },
        cityArrivalData: { Result: [], Error: null },
        isAnimatedArrow: false,
        isSelectedChange: false,
        cityDepartureValueContext: '', 
        cityArrivalValueContext: '', 
    });

    const setIArrivalSelect = (newState: { isCurrent: boolean; name: string }) => {
        setCitySelectionData((prev) => ({ ...prev, IArrivalSelect: newState }));
    };

    const setIDepartureSelect = (newState: { isCurrent: boolean; name: string }) => {
        setCitySelectionData((prev) => ({ ...prev, IDepartureSelect: newState }));
    };

    const setCityDepartureData = (data: any) => {
        setCitySelectionData((prev) => ({ ...prev, cityDepartureData: data }));
    };

    const setCityArrivalData = (data: any) => {
        setCitySelectionData((prev) => ({ ...prev, cityArrivalData: data }));
    };

    const setIsAnimatedArrow = (newState: boolean) => {
        setCitySelectionData((prev) => ({ ...prev, isAnimatedArrow: newState }));
    };

    const setIsSelectedChange = (newState: boolean) => {
        setCitySelectionData((prev) => ({ ...prev, isSelectedChange: newState }));
    };

    const setCityDepartureValueContext = (value: string) => {
        setCitySelectionData((prev) => ({ ...prev, cityDepartureValueContext: value }));
    };

    const setCityArrivalValueContext = (value: string) => {
        setCitySelectionData((prev) => ({ ...prev, cityArrivalValueContext: value }));
    };

    return (
        <CitySelectionProvider.Provider value={{
            citySelectionData,
            setIArrivalSelect,
            setIDepartureSelect,
            setCityDepartureData,
            setCityArrivalData,
            setIsAnimatedArrow,
            setIsSelectedChange,
            setCityDepartureValueContext, 
            setCityArrivalValueContext,     
        }}>
            {children}
        </CitySelectionProvider.Provider>
    );
}

export function useCitySelectionContext() {
    return useContext(CitySelectionProvider);
}