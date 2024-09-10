<script>
    import { env } from "$env/dynamic/public";
    import Datatable from "$lib/components/client/Datatable.svelte";
    import DatatableHeader from "$lib/components/client/DatatableHeader.svelte";
</script>

<div class="animate-show">
    <DatatableHeader title="Theatres"></DatatableHeader>
    <div class="my-3">
        <Datatable fields={['id','name', 'address', 'city_name', 'standart_price','image']} endpoint={`${env.PUBLIC_BACKEND_URL}/branches`}/>
    </div>
</div>

	

