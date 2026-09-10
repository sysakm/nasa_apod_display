import {configureStore} from "@reduxjs/toolkit";
import todayReducer from "../features/today/todaySlice.ts";

export const store = configureStore({
    reducer: {
        today: todayReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch