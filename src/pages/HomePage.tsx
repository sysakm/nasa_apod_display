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
        <div>
            <h2>NASA APOD Demo - {displayRandom ? 'Random picture' : 'Picture for today'}</h2>
            <button type='button' onClick={handleForceRefresh}>{displayRandom ? 'Get another random photo' : 'Refresh the photo for today'}</button>
            <button type='button' onClick={handleToggleDisplayRandom}>
                {displayRandom ? 'Switch to today\'s photo' : 'Switch to random photo'}
            </button>
            {status === 'loading' && (<p>Loading...</p>)}
            {status === 'error' && (<p>{error}</p>)}
            {status === 'success' && (data ? <ApodImageDisplay image={data}/> : <p>something went wrong with the image</p>)}
        </div>
    )
}

export default HomePage