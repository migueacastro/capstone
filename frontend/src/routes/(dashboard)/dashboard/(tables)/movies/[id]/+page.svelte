<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'description',
            type: 'textarea',
            value: ''},

        {
            name: 'duration',
            type: 'integer',
            value: null},

        {
            name: 'image',
            type: 'object',
            value: []},

        {
            name: 'coming_soon',
            type: 'boolean',
            value: false},
    ]
</script>


<Form name="movie" fields={fields} endpointName="movies" edit={true}/>