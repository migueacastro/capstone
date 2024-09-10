<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'branch',
            type: 'foreignKey',
            value: null,
            table: 'branches'},

        {
            name: 'layout',
            type: 'layout',
            value: [
                [{'type':'seat', 'value': 1, 'status':'available'}, {'type':'seat', 'value': 2, 'status':'available'},],
                [{'type':'seat', 'value': 1, 'status':'available'}, {'type':'seat', 'value': 2, 'status':'available'},],
            ]
        },
    ]
</script>


<Form name="Room" fields={fields} endpointName="rooms"/>