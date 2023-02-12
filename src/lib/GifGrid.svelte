<script lang="ts">
    import { onMount } from "svelte";
    import Fa from "svelte-fa";
    import {faWhatsapp} from "@fortawesome/free-brands-svg-icons/index";
    import {faLink} from "@fortawesome/free-solid-svg-icons";
    import type { TenorMediaFormat } from "./types";
  import { WA_API_SEND } from "../config";
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
    });
    let onImageClick = (url) => {
        window.open(`${WA_API_SEND}?text=${url}`);
    }
    let onCopyClick = (url) => {
        navigator.clipboard.writeText(url);
    }
</script>

<div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-min" >
    {#each mediaFormats as format}
        <figure class="w-full relative">
            <img src={format.tinygif.url} alt="" />
            <figcaption class="absolute top-1 left-1">
                <button on:click|preventDefault={() => onImageClick(format.gif.url)}>
                    <Fa icon={faWhatsapp} />
                </button>
                <button on:click|preventDefault={() => onCopyClick(format.gif.url)}>
                    <Fa icon={faLink} />
                </button>
            </figcaption>
        </figure>
    {/each}
    <div bind:this={container} />
</div>

<style>
</style>