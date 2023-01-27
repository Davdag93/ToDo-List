import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {ThunkDispatch} from "@reduxjs/toolkit";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
/* export const useAppDispatch = () => useDispatch<AppDispatch>(); */
export const useAppDispatch = () => useDispatch<ThunkDispatch<any, any, any>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

