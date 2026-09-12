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
        <section className='page saved-page'>
            <header className='page-heading'>
                <h2>Saved Pictures</h2>
            </header>
            <div className='saved-layout'>
                <SavedSelector/>
                <div className='saved-preview'>
                    {!selectedDate ? (
                        images.length > 0 ? (
                            <p className='saved-preview__placeholder'>Select any saved image to display it!</p>
                        ) : (
                            <p className='saved-preview__placeholder'>Your selected picture will appear here.</p>
                        )
                    ) : (
                        fullSelectedImage ? (
                            <div className='saved-selection'>
                                <button
                                    className='saved-selection__close'
                                    type='button'
                                    onClick={handleUnselect}
                                    aria-label='Close selected picture'
                                    title='Close selected picture'
                                >
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                <ApodImageDisplay image={fullSelectedImage} includeExplanation={true}/>
                            </div>
                        ) : (
                            <p className='state-message state-message--error'>Something went wrong - the image you selected not found.</p>
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

export default SavedPage
