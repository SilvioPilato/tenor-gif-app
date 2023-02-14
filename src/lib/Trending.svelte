<script lang="ts">
    import type { TenorCategory } from "./types";
    export let categories: TenorCategory[];
    export let maxElements = 6;

</script>
<div>
    <h1 class="text-3xl font-semibold">TRENDING NOW</h1>
    <div class="mx-auto flex gap-2 overflow-auto justify-start flex-nowrap w-">
        {#each categories as category}
            <div class="h-24 grow-0 shrink-0 basis-auto">
                <img src={category.image} alt={category.name} class="object-cover  h-full" />
            </div>
        {/each}
    </div>

</div>