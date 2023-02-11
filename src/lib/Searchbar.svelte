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
    <form on:submit|preventDefault={onFormSubmit}>
        <input type="text w-full" name="gif-search" id="gif-search" bind:value={search} />
        <Fa icon={faSearch} />
    </form>

</div>