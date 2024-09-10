<script>
    import { goto } from "$app/navigation";
    import { env } from "$env/dynamic/public";
    import { getToastStore } from "@skeletonlabs/skeleton";
    const toastStore = getToastStore()
    let email = '';
    let errors = {
        email: null,
    };

    const handleSubmit = async () => {
        let endpoint = `${env.PUBLIC_BACKEND_URL}/request-reset-email`;
        await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
                
            },
            body: JSON.stringify({
                'email': email,
            }),
            credentials: 'include',
        })
        .then(response => response.json()
        .then(data => ({status: response.status, body: data})))
        .then(data => {
                goto('/');
                toastStore.trigger(toastSuccessSettings);
        })
    };

    let toastSuccessSettings = {
        message: `Email sent. Please check your inbox.`,
        background: 'variant-filled-success',
    };
</script>
<div class="container h-full mx-auto flex justify-center items-center">
    <div class="card m-4">
            <form on:submit|preventDefault={handleSubmit}>
                <header class="card-header text-center text-4xl font-bold">Reset Password</header>
                <section class="p-4">
                    <label class="label my-3">
                        <span>Email</span>
                        <input type="text" class="input" bind:value={email}>
                        {#if errors?.email}
                            <p class="text-red-500">{errors.email[0]}</p>
                        {/if}
                    </label>
                    
                </section>     
                <footer class="card-footer">
                    <button type="Request" class="btn btn-xl variant-filled w-full">Send Email</button>
                </footer>    
            </form>
    </div>
</div>