import ApodImageDisplay from "../components/ApodImageDisplay.tsx";
import SavedSelector from "../components/SavedSelector.tsx";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {changeSelected} from "../features/saved/savedSlice.ts";

function SavedPage() {
    const dispatch = useAppDispatch()
    const {images, selectedDate} = useAppSelector(state => state.saved)
    const fullSelectedImage = images.find(savedImg => savedImg.date === selectedDate)

    function handleUnselect() {
        dispatch(changeSelected(null))
    }

    return (
        <div>
            <h2>Saved Pictures</h2>
            <SavedSelector/>
            {!selectedDate ? (
                images.length > 0 &&
                <p>Select any saved image to display it!</p>
            ) : (
                fullSelectedImage ?
                <ApodImageDisplay image={fullSelectedImage} includeExplanation={true}/> :
                <p>Something went wrong - the image you selected not found.</p>
            )}
            {selectedDate && (
                <button
                    type='button'
                    onClick={handleUnselect}
                    aria-label='Close selected picture'
                >
                    X
                </button>
            )}
        </div>
    )
}

export default SavedPage