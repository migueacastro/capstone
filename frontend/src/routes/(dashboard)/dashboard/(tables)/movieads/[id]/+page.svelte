<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'movie',
            type: 'foreignKey',
            value: null,
            table: 'movies'},

        
        {
            name: 'image',
            type: 'object',
            value: []},
    ]
</script>


<Form name="Movie Ad" fields={fields} endpointName="movieads" edit={true}/>