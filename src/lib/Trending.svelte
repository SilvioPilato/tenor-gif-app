<script lang="ts">
    import type { TenorCategory } from "./types";
    export let categories: TenorCategory[];
    export let maxElements = 6;
    let cursor = maxElements;
    
    let shown = categories.filter((_, index) => {
        return index < cursor;
    });

</script>
<div>
    <h1 class="text-3xl font-semibold">TRENDING NOW</h1>
    <div class="flex gap-2">
        {#each shown as category}
            <div class="h-24">
                <img src={category.image} alt={category.name} class="object-cover w-full h-full" />
                <p class="break-words">{category.name} </p>
            </div>
        {/each}
    </div>

</div>