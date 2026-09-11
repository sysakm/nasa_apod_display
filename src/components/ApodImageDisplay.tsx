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

    if (image.type === 'image') {
        return (
            <article>
                <button
                    type='button'
                    onClick={handleToggleSaveImage}
                >
                    {imageInSaved ? 'Unsave' : 'Save'}
                </button>
                <img src={image.url} alt={image.date}/>
                <h3>{image.date}: {image.title}</h3>
                {image.copyright !== '' && <span>{image.copyright}</span>}
                {includeExplanation && <p>{image.explanation}</p>}
            </article>
        )
    } else if (image.type === 'video') {
        const isEmbedVideo =
            image.url.includes('youtube.com') ||
            image.url.includes('vimeo.com')
        return (
            <article>
                <button
                    type='button'
                    onClick={handleToggleSaveImage}
                >
                    {imageInSaved ? 'Unsave' : 'Save'}
                </button>
                {isEmbedVideo ? (
                    <iframe src={image.url} title={image.title}/>
                ) : (
                    <video>
                        <source src={image.url}/>
                    </video>
                )}
                <h3>{image.date}: {image.title}</h3>
                {image.copyright !== '' && <span>{image.copyright}</span>}
                {includeExplanation && <p>{image.explanation}</p>}
            </article>
        )
    }
}

export default ApodImageDisplay