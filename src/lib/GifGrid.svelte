<script lang="ts">
    import type { TenorMediaFormat } from "./types";
    export let mediaFormats: TenorMediaFormat[] = [];
</script>

<div class="columns-2 gap-2 md:columns-3 lg:columns-4" >
    {#each mediaFormats as format}
        <figure class="mb-2 w-full">
            <img src={format.tinygif.url} alt="" />
        </figure>
    {/each}
</div>