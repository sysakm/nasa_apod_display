import {type FormEvent, useState} from "react";
import type {ApodImage, RequestStatus} from "./types/apod.ts";
import {getApodByDate} from "./api/apodApi.ts";
import ApodImageDisplay from "./components/ApodImageDisplay.tsx";

function App() {

    const [date, setDate] = useState<string>('')
    const [status, setStatus] = useState<RequestStatus>('idle')
    const [data, setData] = useState<ApodImage | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function handleClick(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('loading')
        setData(null)
        setError(null)
        try {
            const data = await getApodByDate(date)
            setStatus('success')
            setData(data)
            setError(null)
        } catch (error) {
            setStatus('error')
            setData(null)
            setError(error instanceof Error ? error.message : 'something went wrong')
        }
    }

    return (
        <main>
            <form onSubmit={handleClick}>
                <label htmlFor='date'>
                    Enter the date
                    <input
                        id='date'
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <button type='submit'>Load</button>
            </form>
            {status === 'loading' && (<p>Loading...</p>)}
            {status === 'error' && (<p>{error}</p>)}
            {status === 'success' && (data ? <ApodImageDisplay image={data}/> : <p>something went wrong with the image</p>)}
        </main>
    )
}

export default App