<script>
	import { onMount } from "svelte";
    import { authenticateUser, onlyAuthenticated, user, authenticated } from "../../../../stores/auth.js";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";
    import { Avatar } from "@skeletonlabs/skeleton";
</script>
<div class="container h-full mx-auto flex justify-center items-start align-top flex-col" in:fade>
    <div class="p-4 mx-auto pt-8 w-[90%] lg:w-full my-4 lg:my-16  lg:p-10 flex flex-col justify-center text-center">
        <slot/>
    </div>
    
</div>