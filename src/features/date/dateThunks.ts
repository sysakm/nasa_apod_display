import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ApodImage} from "../../types/apod.ts";
import type {RootState} from "../../app/store.ts";
import {getApodByDate, getApodByDateRange, getApodForToday} from "../../api/apodApi.ts";

type DateArgs = {
    date: string;
    nDays: number;
    force?: boolean;
}

export const loadPhotosByDate = createAsyncThunk<
    Array<ApodImage>,
    DateArgs,
    {state: RootState, rejectValue: string}
>(
    'date/load',
    async (
        {date, nDays},
        {rejectWithValue, signal}
    ) => {
        if (!date && nDays !== 1) {
            return rejectWithValue('Empty date allowed only for single image request')
        }
        if (!Number.isInteger(nDays) || nDays < 1 || nDays > 10) {
            return rejectWithValue('Number of days has to be an integer between 1 and 10.')
        }
        try {
            if (!date) {
                return [await getApodForToday(signal)]
            } else if (nDays === 1) {
                return [await getApodByDate(date, signal)]
            } else {
                return await getApodByDateRange(date, nDays, signal)
            }
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            )
        }
    },
    {
        condition: ({date, nDays, force}, {getState})=> {
            const {status, loadedQuery} = getState().date
            if (status === 'loading') return false
            const isDifferentRequest =
                !loadedQuery
                || loadedQuery.date !== date
                || loadedQuery.nDays !== nDays
            return force || status !== 'success' || isDifferentRequest
        }
    }
)