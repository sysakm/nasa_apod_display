import {type SubmitEvent} from "react";
import ApodImageDisplay from "../components/ApodImageDisplay.tsx";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {changeDate, changeNDays, resetDateSearch} from "../features/date/dateSlice.ts";
import {loadPhotosByDate} from "../features/date/dateThunks.ts";

function DatePage() {
    const dispatch = useAppDispatch()
    const {date, nDays, status, data, error} = useAppSelector(state => state.date)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        void dispatch(loadPhotosByDate({
            date, nDays,
            force: date === '' && nDays === 1  // force reload if the request asks for today's photo
        }))
    }

    function handleReset() {
        dispatch(resetDateSearch())
    }

    return (
        <div>
            <h2>Choose the picture by date</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='date'>
                    Enter the date
                    <input
                        id='date'
                        type='date'
                        value={date}
                        onChange={(e) => dispatch(changeDate(e.target.value))}
                    />
                </label>
                <label htmlFor='nDays'>
                    Enter number of days between 1 and 10, starting with given date.
                    <input
                        id='nDays'
                        type='number'
                        min='1'
                        max='10'
                        step='1'
                        value={nDays}
                        onChange={(e) => dispatch(changeNDays(+e.target.value))}
                    />
                </label>
                <button type='submit' disabled={status === 'loading'}>Load</button>
                <button type='button' onClick={handleReset}>Reset</button>
            </form>
            {status === 'loading' && (<p>Loading...</p>)}
            {status === 'error' && (<p>{error}</p>)}
            {status === 'success' && (
                data && data.length > 0 ?
                (
                    data.length === 1 ? <ApodImageDisplay image={data[0]} includeExplanation={true}/> : (
                        <div>
                            {data.map(image => <ApodImageDisplay key={image.date} image={image} includeExplanation={false}/>)}
                        </div>
                    )
                ) : <p>something went wrong with the images</p>)}
        </div>
    )
}

export default DatePage