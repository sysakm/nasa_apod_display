import ApodImageDisplay from "../components/ApodImageDisplay.tsx";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {changeCount, resetRandomSearch} from "../features/random/randomSlice.ts";
import type {SubmitEvent} from "react";
import {loadRandomPhotos} from "../features/random/randomThunks.ts";

function RandomPage() {
    const dispatch = useAppDispatch()
    const {count, data, status, error} = useAppSelector(state => state.random)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        void dispatch(loadRandomPhotos({count}))
    }

    function handleReset() {
        dispatch(resetRandomSearch())
    }

    return (
        <div>
            <h2>Browse random pictures</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='count'>
                    Enter number of random days between 1 and 10.
                    <input
                        id='count'
                        type='number'
                        min='1'
                        max='10'
                        step='1'
                        value={count}
                        onChange={
                            (e) =>
                                dispatch(changeCount(+e.target.value))
                        }
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
                                {data.map(
                                    image =>
                                        <ApodImageDisplay key={image.date} image={image} includeExplanation={false}/>
                                )}
                            </div>
                        )
                    ) : <p>something went wrong with the images</p>)}
        </div>
    )
}

export default RandomPage