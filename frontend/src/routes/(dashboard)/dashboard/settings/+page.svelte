<script>
    import { onMount } from 'svelte';
    import { user, authenticateUser } from '../../../../stores/auth.js';

    onMount(async () => {
        await authenticateUser();
    })
</script>

<div>
    <h2 class="h1 text-start mb-4 w-full ">Settings</h2>
    <div class="grid lg:grid-cols-2 grid-cols-1  lg:space-x-5 space-y space-y-5 lg:space-y-0">
        <div class="card p-10">
            <a href="/dashboard/profile" class="h2 flex flex-row justify-center">
                <i class="fa-solid fa-user mx-5"></i>
                <h2 class="h2">Profile</h2>
            </a>
        </div>
        {#if $user.is_superuser}
        <div class="card p-10">
            <a href="/dashboard/staff" class="h2 flex flex-row justify-center">
                <i class="fa-solid fa-user-group mx-5"></i>
                <h2 class="h2">Manage staff</h2>
            </a>
        </div>
        {/if}
    </div>
</div>