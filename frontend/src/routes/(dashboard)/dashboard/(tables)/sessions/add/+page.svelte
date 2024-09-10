<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [

        {
            name: 'movie',
            type: 'foreignKey',
            value: null,
            table: 'movies'},

        {
            name: 'room',
            type: 'foreignKey',
            value: null,
            table: 'rooms'},

        {
            name: 'start_time',
            type: 'datetime',
            value: ''},
        {
            name: 'end_time',
            type: 'datetime',
            value: ''},    
        {
            name: 'seats',
            type: 'integer',
            value: null},
    ]
</script>


<Form name="Session" fields={fields} endpointName="sessions"/>