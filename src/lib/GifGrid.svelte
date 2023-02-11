<script lang="ts">
  import { onMount } from "svelte";
    import type { TenorMediaFormat } from "./types";
    export let mediaFormats: TenorMediaFormat[] = [];
    export let onIntersection: () => void;
    let container: Element;
    const intersected = (entries) => {;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                onIntersection();
            }
        })
    }
    onMount(async () => {
        const observer = new IntersectionObserver(intersected, {rootMargin: '200px', threshold: 0.8});
        observer.observe(container);
    })
</script>

<div class="columns-2 gap-2 md:columns-3 lg:columns-4" >
    {#each mediaFormats as format}
        <figure class="mb-2 w-full">
            <img src={format.tinygif.url} alt="" />
        </figure>
    {/each}
    <div bind:this={container} />
</div>