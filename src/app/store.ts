import {configureStore} from "@reduxjs/toolkit";
import todayReducer from "../features/today/todaySlice.ts";
import dateReducer from "../features/date/dateSlice.ts";
import randomReducer from "../features/random/randomSlice.ts";
import savedReducer from "../features/saved/savedSlice.ts";
import {saveSavedImagesToStorage} from "../features/saved/savedStorage.ts";

export const store = configureStore({
    reducer: {
        today: todayReducer,
        date: dateReducer,
        random: randomReducer,
        saved: savedReducer
    }
})

let previousSavedImagesState = store.getState().saved.images
store.subscribe(() => {
    const currentImages = store.getState().saved.images
    if (currentImages !== previousSavedImagesState) {
        previousSavedImagesState = currentImages
        saveSavedImagesToStorage(currentImages)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch