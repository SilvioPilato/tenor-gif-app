<script lang="ts">
    import { onMount } from "svelte";
    import { API_LIMIT, GET_REQUEST_OPTIONS, TENOR_API_SEARCH, API_KEY, TENOR_API_FEATURED } from "./config";
    import GifGrid from "./lib/GifGrid.svelte";
    import Searchbar from "./lib/Searchbar.svelte";
    import type { TenorAPI, TenorResponse } from "./lib/types";
    let currentSearch = "";
    let mediaformats = [];
    let nextId = "";
    const searchGifs = async (api: TenorAPI, searchParams: URLSearchParams) => {
        const response = await fetch(`${api}?${searchParams}`, GET_REQUEST_OPTIONS);
        const result: TenorResponse = await response.json();
        return result;
    }
    const onSearchbarSubmit = async (search: string) => { 
        try {
            currentSearch = search;
            const params = {
                key: API_KEY,
                limit: API_LIMIT.toString(),
                q: search,
            }
            const urlParams = new URLSearchParams(params);
            const response = await searchGifs(TENOR_API_SEARCH, urlParams);
            mediaformats = response.results.map((res)=> {
                return res.media_formats;
            });
            nextId = response.next;
        } catch (error) {
            console.error(error);
        }
    }
    const onIntersection = async () => {
        try {
            const params = {
                key: API_KEY,
                limit: API_LIMIT.toString(),
                ...(nextId) && {pos: nextId},
                ...(currentSearch) && {q: currentSearch}
            }
            const endpoint = currentSearch ? TENOR_API_SEARCH: TENOR_API_FEATURED;
            const urlParams = new URLSearchParams(params);
            const response = await searchGifs(endpoint, urlParams);
            const gifs = response.results.map((res)=> {
                return res.media_formats;
            });
            mediaformats = [...mediaformats, ...gifs];
            console.log(mediaformats);
            nextId = response.next;
        } catch (error) {
            console.error(error);
        }
    }
</script>

<main>
    <div class="flex flex-col items-center">
        <div class="w-fit">
            <Searchbar onSearchbarSubmit={onSearchbarSubmit}/>
            <GifGrid onIntersection={onIntersection} mediaFormats={mediaformats}/>
        </div>
    </div>
</main>