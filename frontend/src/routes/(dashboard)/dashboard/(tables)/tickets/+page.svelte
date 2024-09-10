<script>
    import { env } from "$env/dynamic/public";
    import Datatable from "$lib/components/client/Datatable.svelte";
    import DatatableHeader from "$lib/components/client/DatatableHeader.svelte";
</script>

<div class="animate-show">
    <DatatableHeader title="Tickets"></DatatableHeader>
    <div class="my-3">
        <Datatable fields={['id','type_name', 'price']} endpoint={`${env.PUBLIC_BACKEND_URL}/tickets`}/>
    </div>
</div>

	

