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
            value: 'DAY'},

        {
            name: 'value',
            type: 'decimal',
            value: 0.00},
    ];
</script>


<Form name="Day Discounts" fields={fields} endpointName="day-discounts"/>