import type {ApodImage, RequestStatus} from "../../types/apod.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {loadPhotosByDate} from "./dateThunks.ts";

export type DateState = {
    date: string;
    nDays: number;
    status: RequestStatus;
    data: Array<ApodImage> | null;
    error: string | null;
    loadedQuery: {date: string, nDays: number} | null;
    currentRequestId: string | null;
}

const initialState: DateState = {
    date: '',
    nDays: 1,
    status: 'idle',
    data: null,
    error: null,
    loadedQuery: null,
    currentRequestId: null
}

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        changeDate(state, action: PayloadAction<string>) {
            state.date = action.payload
        },
        changeNDays(state, action: PayloadAction<number>) {
            state.nDays = action.payload
        },
        resetDateSearch() {
            return initialState
        }
    },
    extraReducers: builder => {
        builder.addCase(
            loadPhotosByDate.pending,
            (state, action) => {
                state.status = 'loading'
                state.data = null
                state.error = null
                state.currentRequestId = action.meta.requestId
            }
        ).addCase(
            loadPhotosByDate.fulfilled,
            (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) {
                    return
                }
                state.status = 'success'
                state.data = action.payload
                state.loadedQuery = {
                    date: action.meta.arg.date,
                    nDays: action.meta.arg.nDays
                }
                state.currentRequestId = null
            }
        ).addCase(
            loadPhotosByDate.rejected,
            (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) {
                    return
                }
                state.status = action.meta.aborted ? 'idle' : 'error'
                state.error = action.meta.aborted ? null : (
                    action.payload ?? action.error.message ?? 'request failed'
                )
                state.currentRequestId = null
            }
        )
    }
})

export const {changeDate, changeNDays, resetDateSearch} = dateSlice.actions
export default dateSlice.reducer