<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'type',
            type: 'hidden',
            value: 'AGE'},

        {
            name: 'value',
            type: 'decimal',
            value: 0.00},
    ];
</script>


<Form name="Age Discounts" fields={fields} endpointName="age-discounts"/>