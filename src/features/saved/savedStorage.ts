import type {ApodImage} from "../../types/apod.ts";

const STORAGE_KEY = 'nasa-apod-display-project-saved-images'

function validateDateString(date: string): boolean {
    try {
        if (date.length !== 10) return false
        if (date[4] !== '-' || date[7] !== '-') return false

        const [year, month, day] = date.split('-').map(value => Number(value))
        if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return false

        const dateObject = new Date(year, month - 1, day)
        return (
            dateObject.getFullYear() === year &&
            dateObject.getMonth() === month - 1 &&
            dateObject.getDate() === day
        )
    } catch {
        return false
    }
}

function validateImage(image: unknown): image is ApodImage {
    if (
        image === null || typeof image !== 'object'
        || !('type' in image) || typeof image.type !== 'string'
        || !('date' in image) || typeof image.date !== 'string'
        || !('url' in image) || typeof image.url !== 'string'
        || !('title' in image) || typeof image.title !== 'string'
        || !('explanation' in image) || typeof image.explanation !== 'string'
        || !('copyright' in image) || typeof image.copyright !== 'string'
    ) {
        return false
    }
    if (image.type !== 'image' && image.type !== 'video') return false
    return validateDateString(image.date)
}

export function removeSavedImagesFromStorage(): boolean {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
        console.warn('Could not remove saved images from storage', error)
        return false
    }
    return true
}

export function loadSavedImagesFromStorage(): Array<ApodImage> {
    try {
        const rawData = localStorage.getItem(STORAGE_KEY)
        if (!rawData) {
            return []
        }
        const data: unknown = JSON.parse(rawData)
        if (!Array.isArray(data) || data.some((obj: unknown) => !validateImage(obj))) {
            removeSavedImagesFromStorage()
            return []
        }
        return data as Array<ApodImage>
    } catch (error) {
        console.warn('Could not load saved images from storage', error)
        removeSavedImagesFromStorage()
        return []
    }
}

export function saveSavedImagesToStorage(data: Array<ApodImage>): boolean {
    if (data.length === 0) {
        return removeSavedImagesFromStorage()
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
        console.warn('Could not save images to storage', error)
        return false
    }
    return true
}