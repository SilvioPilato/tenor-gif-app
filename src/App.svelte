<script lang="ts">
    import { onMount } from "svelte";
    import { API_LIMIT, GET_REQUEST_OPTIONS, TENOR_API_SEARCH, API_KEY, TENOR_API_FEATURED } from "./config";
    import GifGrid from "./lib/GifGrid.svelte";
    import Searchbar from "./lib/Searchbar.svelte";
    import type { TenorResponse } from "./lib/types";
    import {featured} from "./mocks/mock_featured";
    let mediaformats = [];
    onMount(async () => {
        try {
            const searchParams = new URLSearchParams({
                key: API_KEY,
                limit: API_LIMIT.toString(),
            });
            const response = await fetch(`${TENOR_API_FEATURED}?${searchParams}`, GET_REQUEST_OPTIONS);
            const result: TenorResponse = await response.json();
            mediaformats = result.results.map((res)=> {
                return res.media_formats;
            });
        } catch (error) {
            console.error(error);
        }
	});
    featured.results.map((result) => {
        return result.media_formats;
    })
    const onSearchbarSubmit = async (search: string) => { 
        try {
            const searchParams = new URLSearchParams({
                key: API_KEY,
                q: search,
                limit: API_LIMIT.toString(),
            });
            const response = await fetch(`${TENOR_API_SEARCH}?${searchParams}`, GET_REQUEST_OPTIONS);
            const result: TenorResponse = await response.json();
            mediaformats = result.results.map((res)=> {
                return res.media_formats;
            });
        } catch (error) {
            console.error(error);
        }
    }
</script>

<main>
    <div class="flex flex-col items-center">
        <div class="w-fit">
            <Searchbar onSearchbarSubmit={onSearchbarSubmit}/>
            <GifGrid mediaFormats={mediaformats}/>
        </div>
    </div>

</main>

<style lang="postcss">
   
</style>