import type { TENOR_API_CATEGORIES, TENOR_API_FEATURED, TENOR_API_SEARCH } from "../config";

export type TenorResponse = {
    locale: string,
    results: TenorResult[],
    next: string
}

export type TenorResult = {
    id: string,
    title: string,
    media_formats: TenorMediaFormat,
    created: number,
    content_description: string,
    itemurl: string,
    url: string,
    tags: string[],
    flags: string[],
    hasaudio?: boolean,
    hascaption?: string
}

export type MediaFormatsKeys = 
    "loopedmp4" 
    | "nanomp4" 
    | "mp4" 
    | "nanowebm"
    | "nanogif" 
    | "mediumgif"
    | "tinygifpreview"
    | "webm" 
    | "tinygif" 
    | "gifpreview"
    | "gif" 
    | "nanogifpreview" 
    | "tinywebm"
    | "tinymp4";


export type TenorMediaFormat = {
    [key in MediaFormatsKeys]: {
        url: string,
        duration: number,
        preview: string,
        dims: number[],
        size: number
    }
}

export type TenorCategory = {
    searchTerm: string,
    name: string,
    image: string,
}

export type TenorCategoryResponse = {
    locale: string,
    tags: TenorCategory[],
}

export type TenorAPI = 
    typeof TENOR_API_FEATURED
    | typeof TENOR_API_SEARCH
    | typeof TENOR_API_CATEGORIES;