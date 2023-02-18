<script lang="ts">
    import {faChevronCircleLeft, faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import type { TenorCategory } from "./types";
    export let categories: TenorCategory[];
    export let onCategoryClick: (search: string) => void;
    $: maxCategories = categories.length - 1;
    let categoryCursor = 0;
    let slideWindow = 5;
    const scrollBehaviour: ScrollIntoViewOptions = {
        block: "end",
        inline: "start",
        behavior: "smooth"
    }
    let onGoRight = () => {
        let nextCursor = categoryCursor + slideWindow > maxCategories ? maxCategories : categoryCursor + slideWindow;
        let element = document.getElementById(categories[nextCursor].name);
        categoryCursor = nextCursor;
        element.scrollIntoView(scrollBehaviour);
    }
    let onGoLeft = () => {
        let nextCursor = categoryCursor - slideWindow <= 0 ? 0 : categoryCursor - slideWindow;
        let element = document.getElementById(categories[nextCursor].name);
        categoryCursor = nextCursor;
        element.scrollIntoView(scrollBehaviour);
    }
</script>
<div class="w-3/4 mx-auto relative">
    <h1 class="text-3xl font-semibold">TRENDING NOW</h1>
    {#if categoryCursor > 0}
        <button class="absolute -left-8 top-8 bottom-0" on:click|preventDefault={onGoLeft}>
            <Fa 
                on:click={onGoRight} 
                scale={1.5} 
                icon={faChevronCircleLeft}
            />
        </button>
    {/if}
    <div class="flex gap-2 overflow-hidden touch-auto justify-start flex-nowrap">
        {#each categories as category}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div id={category.name} class="h-32 shrink-0 basis-1/5 grow bg-center bg-cover cursor-pointer" >
                <div
                    class="h-24"
                    style={`background-image: url(${category.image})`} 
                    on:click={() => onCategoryClick(category.searchterm)} 
                />
                <p>{category.name}</p>
            </div>
        {/each}
    </div>
    {#if categoryCursor < maxCategories}
        <button class="absolute -right-8 top-8 bottom-0" on:click|preventDefault={onGoRight}>
            <Fa 
                on:click={onGoRight} 
                scale={1.5} 
                icon={faChevronCircleRight}
            />
        </button>
    {/if}
</div>