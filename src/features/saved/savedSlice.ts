import type {ApodImage} from "../../types/apod.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type SavedState = {
    images: Array<ApodImage>;
    selectedDate: string | null;
}

const initialState: SavedState = {
    images: [],
    selectedDate: null
}

const savedSlice = createSlice({
    name: 'saved',
    initialState,
    reducers: {
        addToSaved(state, action: PayloadAction<ApodImage>) {
            if (!state.images.some(img => img.date === action.payload.date)) {
                state.images.push(action.payload)
            }
        },
        removeFromSaved(state, action: PayloadAction<ApodImage>) {
            state.images = state.images.filter(img => img.date !== action.payload.date)
            if (state.selectedDate === action.payload.date) {
                state.selectedDate = null
            }
        },
        changeSelected(state, action: PayloadAction<string | null>) {
            state.selectedDate = action.payload
        },
        clearSaved() {
            return initialState
        }
    }
})

export const {addToSaved, removeFromSaved, changeSelected, clearSaved} = savedSlice.actions
export default savedSlice.reducer