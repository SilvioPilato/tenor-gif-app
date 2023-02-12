<script lang="ts">
    import Fa from 'svelte-fa';
    import {faSearch} from '@fortawesome/free-solid-svg-icons/index';
    export let onSearchbarSubmit: (value: string) => void;
    let onFormSubmit = () => {
        onSearchbarSubmit(search);
    }
    let search ="";
</script>

<div class="flex w-full">
    <form class="w-full" on:submit|preventDefault={onFormSubmit}>
        <input autocomplete="off" type="text" class="
            h-12 
            w-full
            font-sans
            text-xl
            rounded-full
            pl-4
            outline
            outline-2 
            outline-pink-200
            focus:outline-pink-400
            " name="gif-search" id="gif-search" bind:value={search} />
        <Fa icon={faSearch} />
    </form>
</div>