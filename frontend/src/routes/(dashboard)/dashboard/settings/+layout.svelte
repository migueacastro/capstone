<script>
    import { fade } from "svelte/transition";
</script>
<div class="container h-full mx-auto flex justify-center items-start align-top flex-col" in:fade>
    <div class="p-4 mx-auto pt-8 w-[90%] lg:w-full my-4 lg:my-16  lg:p-10 flex flex-col justify-center text-center">
        <slot/>
    </div>
</div>