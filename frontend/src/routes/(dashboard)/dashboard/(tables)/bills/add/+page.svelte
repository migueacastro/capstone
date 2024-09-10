<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [
        {
            name: 'user',
            type: 'foreignKey',
            value: null,
            table: 'users'},

        {
            name: 'session',
            type: 'foreignKey',
            value: null,
            table: 'sessions'},

        {
            name: 'subtotal',
            type: 'decimal',
            value: ''},
        
        {
            name: 'discount',
            type: 'decimal',
            value: ''},
        
        {
            name: 'total',
            type: 'decimal',
            value: ''},
    ];
</script>


<Form name="Bill" fields={fields} endpointName="bills"/>