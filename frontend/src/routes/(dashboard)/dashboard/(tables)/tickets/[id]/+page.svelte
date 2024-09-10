<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'type',
            type: 'foreignKey',
            value: null,
            table: 'ticket-types'},

        {
            name: 'price',
            type: 'decimal',
            value: ''},


        {
            name: 'created_at',
            type: 'datetime',
            value: ''},
    ];
</script>


<Form name="ticket" fields={fields} endpointName="tickets" edit={true}/>