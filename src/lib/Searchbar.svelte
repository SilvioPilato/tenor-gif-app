<script lang="ts">
    import Fa from 'svelte-fa';
    import {faSearch} from '@fortawesome/free-solid-svg-icons/index';
    export let onSearchbarSubmit: (value: string) => void;
    let onFormSubmit = () => {
        onSearchbarSubmit(search);
    }
    export let search ="";
</script>

<div class="flex w-full xl:w-3/4 justify-center items-center mx-auto">
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
                peer
                
                outline-pink-300
                focus:outline-pink-400
                hover:outline-pink-400
                group-focus:outline-pink-400
                group-hover:outline-pink-400
                dark:bg-gradient-to-r
                dark:animate-gradient
                dark:bg-[length:400%_400%]
                from-indigo-900 via-pink-900 to-violet-900
                dark:text-white
                dark:placeholder-white::placeholder
                dark:bg
                dark:outline-fuchsia-600
                dark:focus:outline-fuchsia-600
                dark:hover:outline-fuchsia-600
                dark:group-focus:outline-fuchsia-600
                shadow-inner
            "
            name="gif-search" id="gif-search" bind:value={search} />
            <button class="
                outline
                outline-4
                outline-offset-[-1px]
                w-1/12
                flex-grow 
                rounded-tr-full 
                rounded-br-full
                flex
                justify-center
                items-center

                bg-pink-300
                outline-pink-300
                focus:bg-pink-400
                hover:bg-pink-400
                focus:outline-pink-400
                hover:outline-pink-400
                peer-focus:outline-pink-400
                peer-focus:bg-pink-400
                peer-hover:outline-pink-400
                peer-hover:bg-pink-400

                dark:bg-fuchsia-600
                dark:outline-fuchsia-600
                dark:focus:bg-fuchsia-600
                dark:hover:bg-fuchsia-600
                dark:focus:outline-fuchsia-600
                dark:hover:outline-fuchsia-600
                dark:peer-focus:outline-fuchsia-600
                dark:peer-focus:bg-fuchsia-600
                dark:peer-hover:outline-fuchsia-600
                dark:peer-hover:bg-fuchsia-600
            " 
            type="submit"
            ><Fa color={"#fafafa"} scale={1.5} icon={faSearch} /></button>
    </form>
</div>