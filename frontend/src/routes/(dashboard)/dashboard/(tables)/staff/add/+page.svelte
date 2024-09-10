<script>
    import Form from "$lib/components/client/Form.svelte";
    import { onMount } from "svelte";
    import { onlyAdmin, user } from "../../../../../../stores/auth.js";

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
            type: 'password',
            value: ''},
        {
            name: 'confirmPassword',
            type: 'password',
            value: ''},
        {
            name: 'is_admin',
            type: 'boolean',
            value: false},
        {
            name: 'is_staff',
            type: 'hidden',
            value: true},
    ];

    
    
    onMount(async () => {
        onlyAdmin($user);
    });
</script>


<Form name="Staff" fields={fields} endpointName="staff"/>