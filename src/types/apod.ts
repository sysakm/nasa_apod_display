export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export type RequestArgs =
    | {type: 'today', args: {}}
    | {type: 'date', args: {date: string}}
    | {type: 'dateRange', args: {start_date: string, end_date: string}}
    | {type: 'random', args: {count: number}}

export type MediaType = 'image' | 'video'

export type ApodDTO = {
    media_type: MediaType;
    date: string;
    url: string;
    title: string;
    explanation: string;
    copyright?: string;
}

export type ApodImage = {
    type: MediaType;
    date: string;
    url: string;
    title: string;
    explanation: string;
    copyright: string;
}

export type ApodError = {
    error?: {message: string};
    msg?: string;
}