<script>
    import { env } from "$env/dynamic/public";
    import Datatable from "$lib/components/client/Datatable.svelte";
    import DatatableHeader from "$lib/components/client/DatatableHeader.svelte";
</script>

<div class="animate-show">
    <DatatableHeader title="Sessions"></DatatableHeader>
    <div class="my-3">
        <Datatable fields={['id', 'movie_name', 'room_name', 'start_time', 'end_time']} endpoint={`${env.PUBLIC_BACKEND_URL}/sessions`}/>
    </div>
</div>
