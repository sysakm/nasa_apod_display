import type {ApodImage, RequestStatus} from "../../types/apod.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {loadRandomPhotos} from "./randomThunks.ts";

export type RandomState = {
    count: number;
    status: RequestStatus;
    data: Array<ApodImage> | null;
    error: string | null;
    currentRequestId: string | null;
}

const initialState: RandomState = {
    count: 1,
    status: 'idle',
    data: null,
    error: null,
    currentRequestId: null,
}

const randomSlice = createSlice({
    name: 'random',
    initialState,
    reducers: {
        changeCount(state, action: PayloadAction<number>) {
            state.count = action.payload
        },
        resetRandomSearch() {
            return initialState
        }
    },
    extraReducers: builder => {
        builder.addCase(
            loadRandomPhotos.pending,
            (state, action) => {
                state.status = 'loading'
                state.data = null
                state.error = null
                state.currentRequestId = action.meta.requestId
            }
        ).addCase(
            loadRandomPhotos.fulfilled,
            (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) {
                    return
                }
                state.status = 'success'
                state.data = action.payload
                state.currentRequestId = null
            }
        ).addCase(
            loadRandomPhotos.rejected,
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

export const {changeCount, resetRandomSearch} = randomSlice.actions
export default randomSlice.reducer