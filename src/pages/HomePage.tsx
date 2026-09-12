import ApodImageDisplay from "../components/ApodImageDisplay.tsx";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {toggleDisplayRandom} from "../features/today/todaySlice.ts";
import {loadTodayPhoto} from "../features/today/todayThunks.ts";

function HomePage() {
    const dispatch = useAppDispatch()
    const {displayRandom, status, error, data} = useAppSelector(state => state.today)

    function handleForceRefresh() {
        void dispatch(loadTodayPhoto({
            displayRandom,
            force: true
        }))
    }

    function handleToggleDisplayRandom() {
        const nextDisplayRandom = !displayRandom
        dispatch(toggleDisplayRandom())
        void dispatch(loadTodayPhoto({
            displayRandom: nextDisplayRandom,
            force: true
        }))
    }

    return (
        <section className='page'>
            <header className='page-heading'>
                <h2>NASA APOD Demo - {displayRandom ? 'Random picture' : 'Picture for today'}</h2>
            </header>
            <div className='page-actions'>
                <button className='button button--primary' type='button' disabled={status === 'loading'} onClick={handleForceRefresh}>
                    {displayRandom ? 'Get another random photo' : 'Refresh the photo for today'}
                </button>
                <button className='button button--secondary' type='button' disabled={status === 'loading'} onClick={handleToggleDisplayRandom}>
                    {displayRandom ? 'Switch to today\'s photo' : 'Switch to random photo'}
                </button>
            </div>
            {status === 'loading' && (<p className='state-message state-message--loading'>Loading...</p>)}
            {status === 'error' && (<p className='state-message state-message--error'>{error}</p>)}
            {status === 'success' && (
                data ? (
                    <div className='apod-results apod-results--single'>
                        <ApodImageDisplay image={data}/>
                    </div>
                ) : (
                    <p className='state-message state-message--error'>something went wrong with the image</p>
                )
            )}
        </section>
    )
}

export default HomePage
