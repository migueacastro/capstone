<script>
    import { env } from "$env/dynamic/public";
    import Datatable from "$lib/components/client/Datatable.svelte";
    import DatatableHeader from "$lib/components/client/DatatableHeader.svelte";
</script>

<div class="animate-show">
    <DatatableHeader title="Rooms"></DatatableHeader>
    <div class="my-3">
        <Datatable fields={['id','name', 'branch_name', 'number_seats']} endpoint={`${env.PUBLIC_BACKEND_URL}/rooms`}/>
    </div>
</div>

