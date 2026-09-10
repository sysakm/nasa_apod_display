import {configureStore} from "@reduxjs/toolkit";
import todayReducer from "../features/today/todaySlice.ts";
import dateReducer from "../features/date/dateSlice.ts";

export const store = configureStore({
    reducer: {
        today: todayReducer,
        date: dateReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch