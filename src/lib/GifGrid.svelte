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
                    <figure class="animate-grow origin-top group w-full relative rounded-md">
                        <img src={content.tinygif.url} alt="" class="rounded-md"/>
                        <div 
                            class="
                                bg-gradient-to-r 
                                from-purple-500 via-green-500 to-red-500 
                                opacity-30 
                                w-full 
                                h-full 
                                hidden 
                                absolute 
                                top-0 
                                left-0
                                rounded-md 
                                group-hover:block" 
                        />
                        <button class="top-4 left-4 absolute hidden group-hover:block" on:click|preventDefault={() => onImageClick(content.gif.url)}>
                            <Fa scale={1.5} color={"#fafafa"} icon={faWhatsapp} />
                        </button>
                        <button class="top-4 right-4 absolute hidden group-hover:block" on:click|preventDefault={() => onCopyClick(content.gif.url)}>
                            <Fa scale={1.5} color={"#fafafa"} icon={faLink} />
                        </button>
                    </figure>
                {/each}
            </div>
           
        {/each}
    </div>
    <div bind:this={container} />
</div>


<style>
</style>