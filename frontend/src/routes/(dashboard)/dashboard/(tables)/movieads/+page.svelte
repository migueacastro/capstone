<script>
  import { env } from "$env/dynamic/public";
    import Datatable from "$lib/components/client/Datatable.svelte";
    import DatatableHeader from "$lib/components/client/DatatableHeader.svelte";
</script>
        
<div class="animate-show">
    <DatatableHeader title="Movie Ads"></DatatableHeader>
    <div class="my-3">
        <Datatable fields={['id','name', 'movie_name', 'image']} endpoint={`${env.PUBLIC_BACKEND_URL}/movieads`}/>
    </div>
</div>
