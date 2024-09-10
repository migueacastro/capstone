<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'discount',
            type: 'foreignKey',
            value: null,
            table: 'age-discounts'},

    ];
</script>


<Form name="Ticket Type" fields={fields} endpointName="ticket-types"/>