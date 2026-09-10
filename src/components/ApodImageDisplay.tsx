import type {ApodImage} from "../types/apod.ts";

type Props = {
    image: ApodImage;
    includeExplanation?: boolean;
}

function ApodImageDisplay({image, includeExplanation = true}: Props) {
    if (image.type === 'image') {
        return (
            <article>
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