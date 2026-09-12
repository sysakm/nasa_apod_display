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
        <section className='page'>
            <header className='page-heading'>
                <h2>Browse random pictures</h2>
            </header>
            <form className='search-panel' onSubmit={handleSubmit}>
                <div className='form-fields form-fields--single'>
                <label className='form-field' htmlFor='count'>
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
                </div>
                <div className='form-actions'>
                    <button className='button button--primary' type='submit' disabled={status === 'loading'}>Load</button>
                    <button className='button button--secondary' type='button' onClick={handleReset}>Reset</button>
                </div>
            </form>
            {status === 'loading' && (<p className='state-message state-message--loading'>Loading...</p>)}
            {status === 'error' && (<p className='state-message state-message--error'>{error}</p>)}
            {status === 'success' && (
                data && data.length > 0 ?
                    (
                        data.length === 1 ? (
                            <div className='apod-results apod-results--single'>
                                <ApodImageDisplay image={data[0]} includeExplanation={true}/>
                            </div>
                        ) : (
                            <div className='apod-results apod-grid'>
                                {data.map(
                                    image =>
                                        <ApodImageDisplay key={image.date} image={image} includeExplanation={false}/>
                                )}
                            </div>
                        )
                    ) : <p className='state-message state-message--error'>something went wrong with the images</p>)}
        </section>
    )
}

export default RandomPage
