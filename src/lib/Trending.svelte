<script lang="ts">
    import type { TenorCategory } from "./types";
    export let categories: TenorCategory[];
    export let maxElements = 6;

    export let onCategoryClick: (search: string) => void;
</script>
<div class="w-3/4 mx-auto">
    <h1 class="text-3xl font-semibold">TRENDING NOW</h1>
    <div class="flex gap-2 overflow-x-scroll overflow-y-hidden justify-start flex-nowrap">
        {#each categories as category}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                style={`background-image: url(${category.image})`} 
                on:click={() => onCategoryClick(category.searchterm)} 
                class="h-32 shrink-0 basis-1/5 grow bg-center bg-cover cursor-pointer" 
            />
        {/each}
    </div>

</div>