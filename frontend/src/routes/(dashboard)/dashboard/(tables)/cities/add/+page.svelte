<script>
    import Form from "$lib/components/client/Form.svelte";
    let values = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'on_screen_movies',
            type: 'manyToMany',
            table: 'movies',
            value: []},
    ];
</script>


<Form name="city" fields={values} endpointName="cities"/>