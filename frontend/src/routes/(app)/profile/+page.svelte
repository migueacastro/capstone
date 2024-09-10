<script>
	import { onMount } from "svelte";
    import { authenticateUser, onlyAuthenticated, user, authenticated } from "../../../stores/auth.js";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";
    import { Avatar } from "@skeletonlabs/skeleton";
    
    onMount(
        async () => {
            await authenticateUser();
            await onlyAuthenticated();
        }
    );

</script>
<div class="container h-full mx-auto flex justify-startitems-start align-top flex-col" in:fade>
	<!-- <div class="space-y-10 text-center flex flex-col items-center my-6">

	
	</div>-->
	<div class="card p-4 pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16  lg:p-10 flex flex-col justify-center text-center">
        <Avatar class="mx-auto my-3" width='w-52' initials={($user.name) ? $user?.name[0] + $user?.name.toString().split(" ")[1][0] : ''}></Avatar>
        <div class="my-3">
            <h2 class="h1 text-center my-5">{$user?.name}</h2>
            <p class="lg:h2 h4 indent-5 h-fit">{$user?.email}</p>
            <a href="#" class="anchor no-underline">
                <p class="lg:h3 h4 text-start indent-5 h-fit mt-4">Edit Profile</p>
            </a>
            <a href="/password-reset" class="anchor no-underline">
                <p class="lg:h3 h4 text-start indent-5 h-fit mt-4">Change Password</p>
            </a>
        </div>
		
		
	</div>
</div>

