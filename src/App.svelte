<script lang="ts">
    import { API_LIMIT, GET_REQUEST_OPTIONS, TENOR_API_SEARCH, API_KEY, TENOR_API_FEATURED, TENOR_LOCALE, TENOR_API_CATEGORIES } from "./config";
    import GifGrid from "./lib/GifGrid.svelte";
    import Searchbar from "./lib/Searchbar.svelte";
    import type { TenorAPI, TenorCategoryResponse, TenorResponse } from "./lib/types";
    import ThemeSwitcher from "./lib/ThemeSwitcher.svelte";
    import { onMount } from "svelte";
    import Trending from "./lib/Trending.svelte";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from '../tailwind.config.cjs'
    const fullConfig = resolveConfig(tailwindConfig)
    let currentSearch = "";
    let mediaformats = [];
    let nextId = "";
    let categories = [];
    const calculateColumns = (): number => {
        if (lgQuery.matches) return 4;
        if (mdQuery.matches) return 3;
        return 1;
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
    const fetchCategories = async(searchParams: URLSearchParams) => {
        const response = await fetch(`${TENOR_API_CATEGORIES}?${searchParams}`, GET_REQUEST_OPTIONS);
        const result: TenorCategoryResponse = await response.json();
        return result;
    }
    const onSearchbarSubmit = async (search: string) => { 
        try {
            currentSearch = search;
            const params = {
                key: API_KEY,
                limit: API_LIMIT.toString(),
                q: search,
                locale: TENOR_LOCALE
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
                locale: TENOR_LOCALE,
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

    onMount(async () => {
        const params = {
                key: API_KEY,
                locale: TENOR_LOCALE,
                type: 'trending'
            };
        let response = await fetchCategories(new URLSearchParams(params));
        categories = response.tags;
    });
</script>

<main class="bg-sky-50 dark:bg-slate-900">
    <div class="container mx-auto">
        <div class="flex flex-col gap-4 justify-center items-center text-pink-400 dark:text-fuchsia-600">
            <div class="flex justify-between w-full xl:w-3/4 pt-4 pl-2 pr-2">
                <h1 class="text-3xl font-semibold">GIF APP</h1>
                <span>
                    <ThemeSwitcher />
                </span>
            </div>
            <Searchbar search={currentSearch} onSearchbarSubmit={onSearchbarSubmit}/>
            <Trending categories={categories} onCategoryClick={onSearchbarSubmit} />
            <GifGrid columns={columns} onIntersection={onIntersection} mediaFormats={mediaformats}/>
        </div>
    </div>
</main>