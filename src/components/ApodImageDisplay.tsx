import type {ApodImage} from "../types/apod.ts";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {addToSaved, removeFromSaved} from "../features/saved/savedSlice.ts";

type Props = {
    image: ApodImage;
    includeExplanation?: boolean;
}

function ApodImageDisplay({image, includeExplanation = true}: Props) {
    const dispatch = useAppDispatch()
    const imageInSaved = useAppSelector(
        state => state.saved.images.some(savedImg => savedImg.date === image.date)
    )

    function handleToggleSaveImage() {
        if (!imageInSaved) {
            dispatch(addToSaved(image))
        } else {
            dispatch(removeFromSaved(image))
        }
    }

    const isEmbedVideo = image.type === 'video' && (
        image.url.includes('youtube.com') ||
        image.url.includes('vimeo.com')
    )

    return (
        <article className={`apod-card ${includeExplanation ? 'apod-card--detail' : 'apod-card--compact'}`}>
            <div className='apod-card__media'>
                <button
                    className={`favorite-button${imageInSaved ? ' favorite-button--active' : ''}`}
                    type='button'
                    onClick={handleToggleSaveImage}
                    aria-label={imageInSaved ? 'Remove from saved pictures' : 'Add to saved pictures'}
                    aria-pressed={imageInSaved}
                    title={imageInSaved ? 'Remove from saved pictures' : 'Add to saved pictures'}
                >
                    <svg aria-hidden='true' viewBox='0 0 24 24'>
                        <path d='M12 21s-7.2-4.35-9.42-8.46C.85 9.35 2.15 5.5 5.7 4.38A5.4 5.4 0 0 1 12 6.3a5.4 5.4 0 0 1 6.3-1.92c3.55 1.12 4.85 4.97 3.12 8.16C19.2 16.65 12 21 12 21Z'/>
                    </svg>
                    <span className='sr-only'>
                        {imageInSaved ? 'Remove from saved pictures' : 'Add to saved pictures'}
                    </span>
                </button>

                {image.type === 'image' ? (
                    <img src={image.url} alt={image.title}/>
                ) : isEmbedVideo ? (
                    <iframe
                        src={image.url}
                        title={image.title}
                        loading='lazy'
                        allowFullScreen
                    />
                ) : (
                    <video controls preload='metadata' playsInline>
                        <source src={image.url}/>
                    </video>
                )}
            </div>

            <div className='apod-card__content'>
                <p className='apod-card__date'>{image.date}</p>
                <h3>{image.title}</h3>
                {image.copyright !== '' && (
                    <p className='apod-card__copyright'>{image.copyright}</p>
                )}
                {includeExplanation && (
                    <p className='apod-card__explanation'>{image.explanation}</p>
                )}
            </div>
        </article>
    )
}

export default ApodImageDisplay
