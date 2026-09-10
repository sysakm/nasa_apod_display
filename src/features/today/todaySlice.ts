import type {ApodImage, RequestStatus} from "../../types/apod.ts";
import {createSlice} from "@reduxjs/toolkit";
import {loadTodayPhoto} from "./todayThunks.ts";

export type TodayState = {
    displayRandom: boolean;
    status: RequestStatus;
    data: ApodImage | null;
    error: string | null;
    currentRequestId: string | null;
}

const initialState: TodayState = {
    displayRandom: false,
    status: 'idle',
    data: null,
    error: null,
    currentRequestId: null
}

const todaySlice = createSlice({
    name: 'today',
    initialState,
    reducers: {
        toggleDisplayRandom(state) {
            state.displayRandom = !state.displayRandom
        }
    },
    extraReducers: builder => {
        builder.addCase(
            loadTodayPhoto.pending,
            (state, action) => {
                state.status = 'loading'
                state.data = null
                state.error = null
                state.currentRequestId = action.meta.requestId
            }
        ).addCase(
            loadTodayPhoto.fulfilled,
            (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) {
                    return
                }
                state.status = 'success'
                state.data = action.payload
                state.currentRequestId = null
            }
        ).addCase(
            loadTodayPhoto.rejected,
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

export const {toggleDisplayRandom} = todaySlice.actions
export default todaySlice.reducer