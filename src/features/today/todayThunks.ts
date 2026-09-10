import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ApodImage} from "../../types/apod.ts";
import type {RootState} from "../../app/store.ts";
import {getApodForToday, getRandomApods} from "../../api/apodApi.ts";

type TodayArgs = {
    displayRandom: boolean;
    force?: boolean;
}

export const loadTodayPhoto = createAsyncThunk<
    ApodImage,
    TodayArgs,
    {state: RootState, rejectValue: string}
>(
    'today/load',
    async (
        {displayRandom},
        {rejectWithValue, signal}
    ) => {
        try {
            if (displayRandom) {
                return (await getRandomApods(1, signal))[0]
            } else {
                return await getApodForToday(signal)
            }
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            )
        }
    },
    {
        condition: ({force}, {getState}) => {
            const status = getState().today.status
            if (status === 'loading') return false
            return force || status !== 'success'
        }
    }
)