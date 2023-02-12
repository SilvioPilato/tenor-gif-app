<script lang="ts">
    import { API_LIMIT, GET_REQUEST_OPTIONS, TENOR_API_SEARCH, API_KEY, TENOR_API_FEATURED } from "./config";
    import GifGrid from "./lib/GifGrid.svelte";
    import Searchbar from "./lib/Searchbar.svelte";
    import type { TenorAPI, TenorResponse } from "./lib/types";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from '../tailwind.config.cjs'
  import ThemeSwitcher from "./lib/ThemeSwitcher.svelte";
    const fullConfig = resolveConfig(tailwindConfig)
    let currentSearch = "";
    let mediaformats = [];
    let nextId = "";
    const calculateColumns = (): number => {
        if (lgQuery.matches) return 4;
        if (mdQuery.matches) return 3;
        return 2;
    }
    const smQuery = window.matchMedia(`(mix-width: ${fullConfig.theme.screens["sm"]})`);
    const mdQuery = window.matchMedia(`(min-width: ${fullConfig.theme.screens["md"]})`);
    const lgQuery = window.matchMedia(`(min-width: ${fullConfig.theme.screens["lg"]})`);
    smQuery.addEventListener("change", () => columns = calculateColumns());
    mdQuery.addEventListener("change", () => columns = calculateColumns());
    lgQuery.addEventListener("change", () => columns = calculateColumns());

    let columns = calculateColumns();
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
            nextId = response.next;
        } catch (error) {
            console.error(error);
        }
    }
</script>

<main class="bg-sky-50 dark:bg-slate-900">
    <div class="flex flex-col items-center">
        <div class="w-fit flex flex-col gap-4">
            <div class="flex justify-between w-full">
                <h1 class="text-3xl font-semibold">GIF APP</h1>
                <span>
                    <ThemeSwitcher />
                </span>
            </div>
            <Searchbar onSearchbarSubmit={onSearchbarSubmit}/>
            <GifGrid columns={columns} onIntersection={onIntersection} mediaFormats={mediaformats}/>
        </div>
    </div>
</main>