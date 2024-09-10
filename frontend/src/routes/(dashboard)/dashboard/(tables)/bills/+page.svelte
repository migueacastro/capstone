<script>
    import { env } from "$env/dynamic/public";
    import Datatable from "$lib/components/client/Datatable.svelte";
    import DatatableHeader from "$lib/components/client/DatatableHeader.svelte";
</script>

<div class="animate-show">
    <DatatableHeader title="Bills"></DatatableHeader>
    <div class="my-3">
        <Datatable fields={['id','user_name', 'session' ,'created_at','discount', 'subtotal', 'total']} endpoint={`${env.PUBLIC_BACKEND_URL}/tickets`}/>
    </div>
</div>

	

