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
        <aside className='saved-list' aria-label='Saved pictures'>
            <h3>Saved list</h3>
            <div className='saved-list__items'>
                {
                    images.map(image => (
                        <button
                            key={image.date}
                            type='button'
                            className={`saved-list__item${image.date === selectedDate ? ' saved-list__item--active' : ''}`}
                            disabled={image.date === selectedDate}
                            onClick={() => handleSelectImage(image.date)}
                        >
                            <span>{image.date}: {image.title}</span>
                            {image.copyright !== '' && <small>{image.copyright}</small>}
                        </button>
                    ))
                }
                {images.length === 0 && <p className='saved-list__empty'>Nothing here yet! Save some pictures to see them here.</p>}
            </div>
            {images.length > 0 &&
                <button
                    className='button button--secondary saved-list__clear'
                    type='button'
                    onClick={handleClearSaved}
                >
                    Clear saved list
                </button>}
        </aside>
    )
}

export default SavedSelector
