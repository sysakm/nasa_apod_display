import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {changeSelected, clearSaved} from "../features/saved/savedSlice.ts";

function SavedSelector() {
    const dispatch = useAppDispatch()
    const {images, selectedDate} = useAppSelector(state => state.saved)

    function handleSelectImage(date: string) {
        dispatch(changeSelected(date))
    }
    function handleClearSaved() {
        dispatch(clearSaved())
    }

    return (
        <aside>
            <h3>Saved list</h3>
            <div>
                {
                    images.map(image => (
                        <button
                            key={image.date}
                            type='button'
                            disabled={image.date === selectedDate}
                            onClick={() => handleSelectImage(image.date)}
                        >
                            <span>{image.date}: {image.title}</span>
                            {image.copyright !== '' && <small>{image.copyright}</small>}
                        </button>
                    ))
                }
                {images.length === 0 && <p>Nothing here yet! Save some pictures to see them here.</p>}
            </div>
            {images.length > 0 &&
                <button
                    type='button'
                    onClick={handleClearSaved}
                >
                    Clear saved list
                </button>}

        </aside>
    )
}

export default SavedSelector