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
    ];
    
    
    onMount(async () => {
        onlyAdmin($user);
    });
</script>


<Form name="Staff" fields={fields} endpointName="staff" edit={true}/>