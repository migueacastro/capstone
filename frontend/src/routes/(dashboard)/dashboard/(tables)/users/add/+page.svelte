<script>
    import Form from "$lib/components/client/Form.svelte";
    let fields = [
        {
            name: 'name',
            type: 'text',
            value: ''},

        {
            name: 'email',
            type: 'text',
            value: ''},

        {
            name: 'password',
            type: 'text',
            value: ''},
    ]
</script>


<Form name="User" fields={fields} endpointName="users"/>