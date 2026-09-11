import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ApodImage} from "../../types/apod.ts";
import type {RootState} from "../../app/store.ts";
import {getRandomApods} from "../../api/apodApi.ts";

type RandomArgs = {
    count: number;
}

export const loadRandomPhotos = createAsyncThunk<
    Array<ApodImage>,
    RandomArgs,
    {state: RootState, rejectValue: string}
>(
    'random/load',
    async (
        {count},
        {rejectWithValue, signal}
    ) => {
        if (!Number.isInteger(count) || count < 1 || count > 10) {
            return rejectWithValue('Number of days has to be an integer between 1 and 10.')
        }
        try {
            return await getRandomApods(count, signal)
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Something went wrong')
        }
    },
    {
        condition: (_args, {getState}) => {
            return getState().random.status !== 'loading'
        }
    }
)