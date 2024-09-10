<script>
    import { env } from "$env/dynamic/public";
    import Datatable from "$lib/components/client/Datatable.svelte";
    import DatatableHeader from "$lib/components/client/DatatableHeader.svelte";
</script>

<div class="animate-show">
    <DatatableHeader title="Cities"></DatatableHeader>
    <div class="my-3">
        <Datatable fields={['id','name', 'on_screen_movies_name']} endpoint={`${env.PUBLIC_BACKEND_URL}/cities`}/>
    </div>
</div>

	
