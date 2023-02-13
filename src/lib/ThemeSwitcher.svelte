<script lang="ts">
    let isDarkMode = false;
    const onSwitch = () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
</script>


<label class="relative flex items-center cursor-pointer">
    <input type="checkbox" value={isDarkMode} class="sr-only peer" on:change={onSwitch}>
    <div 
        class="w-14 
            h-2 
            bg-pink-200 
            rounded-full 
            peer 
            after:content-[''] 
            after:absolute after:top-[-5px] 
            after:left-[-2px] 
            after:bg-white
            after:border-gray-300 
            after:border 
            after:rounded-full 
            after:h-5 
            after:w-5 
            after:transition-all

            dark:bg-gray-700 
            dark:border-gray-600 


            peer-checked:bg-blue-600
            peer-focus:outline-none 
            peer-focus:ring-2 
            peer-focus:ring-blue-300 
            peer-checked:after:translate-x-[200%] 
            peer-checked:after:border-white 
            dark:peer-focus:ring-blue-800 
            "
        ></div>
</label>