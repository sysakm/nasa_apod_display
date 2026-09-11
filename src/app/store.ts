import {configureStore} from "@reduxjs/toolkit";
import todayReducer from "../features/today/todaySlice.ts";
import dateReducer from "../features/date/dateSlice.ts";
import randomReducer from "../features/random/randomSlice.ts";
import savedReducer from "../features/saved/savedSlice.ts";

export const store = configureStore({
    reducer: {
        today: todayReducer,
        date: dateReducer,
        random: randomReducer,
        saved: savedReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch