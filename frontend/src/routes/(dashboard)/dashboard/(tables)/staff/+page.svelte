<script>
    import { env } from "$env/dynamic/public";
    import Datatable from "$lib/components/client/Datatable.svelte";
    import DatatableHeader from "$lib/components/client/DatatableHeader.svelte";
    import { onMount } from "svelte";
    import { onlyAdmin, user } from "../../../../../stores/auth";
    
    onMount(async () => {
        onlyAdmin($user);
    });
</script>

<div class="animate-show">
    <DatatableHeader title="Staff"></DatatableHeader>
    <div class="my-3">
        <Datatable fields={['id', 'name', 'email']} endpoint={`${env.PUBLIC_BACKEND_URL}/staff`}/>
    </div>
</div>
