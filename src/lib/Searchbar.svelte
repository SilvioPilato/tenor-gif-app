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
    <form class="group flex w-full" on:submit|preventDefault={onFormSubmit}>
        <input autocomplete="off" placeholder="Search all the GIFs" type="text" class="
                h-12 
                font-sans
                text-xl
                w-11/12
                rounded-tl-full
                rounded-bl-full
                pl-4
                outline
                outline-2
                flex-grow-12
                outline-pink-200
                focus:outline-pink-300
                hover:outline-pink-300
                group-hover:outline-pink-300
                
            "
            name="gif-search" id="gif-search" bind:value={search} />
            <button class="
                bg-pink-200
                outline
                outline-2 
                outline-pink-200 
                w-1/12
                flex-grow 
                rounded-tr-full 
                rounded-br-full
                flex
                justify-center
                items-center
                group-hover:outline-pink-300
                group-hover:bg-pink-300
                " 
            type="submit"
            ><Fa color={"#fafafa"} scale={1.5} icon={faSearch} /></button>
    </form>
</div>