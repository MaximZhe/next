import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootSate } from "@/redux/store/store";
import { useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootSate> = useSelector;