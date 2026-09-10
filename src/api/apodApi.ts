import axios from "axios";
import type {ApodDTO, ApodError, ApodImage, MediaType, RequestArgs} from "../types/apod.ts";

const BASE_URL = 'https://api.nasa.gov/planetary'
const END_POINT = '/apod'

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})

function toApodImage(dto: ApodDTO): ApodImage {
    return {
        type: dto.media_type as MediaType,
        date: dto.date,
        url: dto.url,
        title: dto.title,
        explanation: dto.explanation,
        copyright: dto.copyright ?? ''
    }
}

export async function apodRequest({args}: RequestArgs, signal?: AbortSignal): Promise<Array<ApodImage>> {
    const api_key = import.meta.env.VITE_NASA_API_KEY as string | undefined
    if (!api_key) {
        throw new Error('No API key provided - please create .env file with VITE_NASA_API_KEY variable.')
    }
    try {
        const response = await api.get<ApodDTO | Array<ApodDTO>>(
            END_POINT,
            {
                signal,
                params: {
                    api_key, ...args
                }
            }
        )
        const data = Array.isArray(response.data) ? response.data : [response.data]
        return data.map(toApodImage)
    } catch (error) {
        if (axios.isAxiosError<ApodError>(error) && error.response) {
            console.log(error.response)
            throw new Error(
                `${error.response.status}: ${error.response.data?.msg || error.response.data?.error?.message || 'no message'}`
            )
        }
        throw new Error('something went wrong')
    }
}

export async function getApodForToday(signal?: AbortSignal) {
    return (await apodRequest({type: 'today', args: {}}, signal))[0]
}

export async function getApodByDate(date: string, signal?: AbortSignal) {
    return (await apodRequest({type: 'date', args: {date}}, signal))[0]
}

export async function getApodByDateRange(startDate: string, nDays: number, signal?: AbortSignal) {
    if (nDays < 2 || nDays > 10 || !Number.isInteger(nDays)) {
        throw new Error('Number of days has to be an integer between 2 and 10.')
    }
    const endDate = (
        new Date(Date.parse(startDate) + (nDays - 1) * 24 * 60 * 60 * 1000)
    ).toISOString().substring(0, 10)
    return await apodRequest({type: 'dateRange', args: {start_date: startDate, end_date: endDate}}, signal)
}

export async function getRandomApods(count: number, signal?: AbortSignal) {
    if (count < 1 || count > 10 || !Number.isInteger(count)) {
        throw new Error('Image count must be an integer between 1 and 10.')
    }
    return await apodRequest({type: 'random', args: {count}}, signal)
}