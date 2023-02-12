<script lang="ts">
    import { onMount } from "svelte";
    import Fa from "svelte-fa";
    import {faWhatsapp} from "@fortawesome/free-brands-svg-icons/index";
    import {faLink} from "@fortawesome/free-solid-svg-icons";
    import type { TenorMediaFormat } from "./types";
    import { WA_API_SEND } from "../config";
    export let mediaFormats: TenorMediaFormat[] = [];
    export let onIntersection: () => void;
    export let columns = 2;
    let container: Element;
    const intersected = (entries) => {;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                onIntersection();
            }
        })
    }
    const getColContent = (nColumns: number, content: TenorMediaFormat[] ) => {
        let columns: TenorMediaFormat[][] = [];
        for(let i = 0; i < nColumns; i++) {
            columns.push([]);
        };
        content.forEach((item, index) => {
            columns[index % nColumns].push(item);
        })
        return columns;
    }
    onMount(async () => {
        const observer = new IntersectionObserver(intersected, {rootMargin: '400px', threshold: 0.8});
        observer.observe(container);
    });
    let onImageClick = (url) => {
        window.open(`${WA_API_SEND}?text=${url}`);
    }
    let onCopyClick = (url) => {
        navigator.clipboard.writeText(url);
    }
    
</script>

<div>
    <div class="flex gap-4" >
        {#each getColContent(columns, mediaFormats) as column}
            <div class="flex flex-col gap-4">
                {#each column as content}
                    <figure class="w-full relative">
                        <img src={content.tinygif.url} alt="" />
                        <figcaption class="absolute top-1 left-1">
                            <button on:click|preventDefault={() => onImageClick(content.gif.url)}>
                                <Fa icon={faWhatsapp} />
                            </button>
                            <button on:click|preventDefault={() => onCopyClick(content.gif.url)}>
                                <Fa icon={faLink} />
                            </button>
                        </figcaption>
                    </figure>
                {/each}
            </div>
           
        {/each}
    </div>
    <div bind:this={container} />
</div>


<style>
</style>