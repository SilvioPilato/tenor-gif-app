<script lang="ts">
    import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    let isDarkMode = false;
    let icon = faSun;
    const onSwitch = () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            icon = faMoon;
            document.documentElement.classList.add('dark');
        } else {
            icon = faSun;
            document.documentElement.classList.remove('dark');
        }
    }
</script>


<span class="relative flex items-center cursor-pointer">
    <button class="hover:animate-enlarge" on:click={onSwitch} >
        <Fa scale={1.5} color={"#a78bfa"} icon={icon} />
    </button>   
</span>
