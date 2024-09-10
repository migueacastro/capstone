<script>
    import Form from "$lib/components/client/Form.svelte";
    let values = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'address',
            type: 'text',
            value: ''},

        {
            name: 'standart_price',
            type: 'decimal',
            value: ''},

        {
            name: 'city',
            type: 'foreignKey',
            table: 'cities',
            value: 1},

        {
            name: 'image',
            type: 'object',
            value: [],
        },
    ];
</script>


<Form name="branch" fields={values} endpointName="branches"/>