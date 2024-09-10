<script>
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { env } from "$env/dynamic/public";

    const params = $page.params;
    const uidb64 = params.uidb64;
    const token = params.token;
    const toastStore = getToastStore()
    let password= '';
    let confirmPassword = '';
    let errors = {
        confirmPassword: null,
    };

    const handleSubmit = async () => {
        if (password != confirmPassword) {
            errors.confirmPassword = ['Passwords do not match.'];
            return;
        }
        let endpoint = `${env.PUBLIC_BACKEND_URL}/password-reset-complete`;
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                
                
            },
            body: JSON.stringify({
                'password': password,
                'uidb64': uidb64,
                'token': token
            }),
            credentials: 'include',
        })
        .then(response => response.json()
        .then(data => ({status: response.status, body: data})))
        .then(data => {
                if(data.status == 200) {
                    goto('/');
                    toastStore.trigger(toastSuccessSettings);   
                }
                else {
                    toastStore.trigger(toastErrorSettings);
                }
                
        })
    };

    let toastSuccessSettings = {
        message: `Password successfully reset.`,
        background: 'variant-filled-success',
    };

    let toastErrorSettings = {
        message: `Error resetting password.`,
        background: 'variant-filled-error',
    };

    let toastInvalidSettings = {
        message: `Invalid link.`,
        background: 'variant-filled-error',
    };

    onMount(async () => {
        let endpoint = `${env.PUBLIC_BACKEND_URL}/password-reset/${uidb64}/${token}`;
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
        
            },
            credentials: 'include',
        })
        .then(response => response.json()
        .then(data => ({status: response.status, body: data})))
        .then(data => {
                if(data.status != 200) {
                    goto('/');
                    toastStore.trigger(toastInvalidSettings);
                }
                else {
                    return;
                } 
        })
    });
</script>
<div class="container h-full mx-auto flex justify-center items-center">
    <div class="card m-4">
            <form on:submit|preventDefault={handleSubmit}>
                <header class="card-header text-center text-4xl font-bold">Reset Password</header>
                <section class="p-4">
                    <label class="label my-1">
                        <span>Password</span>
                        <input type="password" class="input" bind:value={password}>
                        {#if errors?.password}
                            <p class="text-red-500">{errors.password[0]}</p>
                        {/if}
                    </label>
                    <label class="label my-1">
                        <span>Confirm Password</span>
                        <input type="password" class="input" bind:value={confirmPassword}>
                        {#if errors?.confirmPassword}
                            <p class="text-red-500">{errors.confirmPassword[0]}</p>
                        {/if}
                    </label>
                    
                </section>     
                <footer class="card-footer">
                    <button type="Request" class="btn btn-xl variant-filled w-full">Reset Password</button>
                </footer>    
            </form>
    </div>
</div>