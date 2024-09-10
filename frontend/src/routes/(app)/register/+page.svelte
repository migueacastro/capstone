<script>
    import { goto } from "$app/navigation";
    import { env } from "$env/dynamic/public";
    import { authenticated, authenticateUser } from "../../../stores/auth";

    let name = '', email = '', password = '', confirmPassword = '';

    // These are the possible attributes the errors may get
    let errors = {
        name: null,
        email: null,
        password: null,
        confirmPassword: null
    };

    const handleSubmit = async () => {
       let endpoint = `${env.PUBLIC_BACKEND_URL}/register`;
       await fetch(endpoint, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               
           },
           credentials: 'include',
           body: JSON.stringify({ // Make all those binded values a json object
               name,
               email,
               password,
               confirmPassword
           })
       })
       .then(response => response.json().then(data => ({status: response.status, body: data})))
       .then(data => {
           if (data.status === 200 || data.status === 201) {
                // I added this line so that the navbar updates instantly, otherwise it would take a refresh to update it
                goto('/');
                authenticateUser();
           } else {
               errors = data.body;
               console.log(data);
           }
       })

       
    };

</script>
<div class="container h-full mx-auto flex justify-center items-center">
    <div class="card m-4">
            <form on:submit|preventDefault={handleSubmit}>
                <header class="card-header text-center text-4xl font-bold">Register</header>
                <section class="p-4">
                    
                    <label class="label my-1">
                        <span>Name</span>
                        <input type="text" class="input" bind:value={name}>
                        {#if errors?.name}
                            <p class="text-red-500">{errors.name[0]}</p>
                        {/if}
                    </label>
                    <label class="label my-1">
                        <span>Email</span>
                        <input type="text" class="input" bind:value={email}>
                        {#if errors?.email}
                            <p class="text-red-500">{errors.email[0]}</p>
                        {/if}
                    </label>
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
                    
                    <button type="submit" class="btn btn-xl variant-filled w-full">Register</button>
                    <label class="label mt-2 text-center">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </label> 
                </footer>    
            </form>
    </div>
</div>