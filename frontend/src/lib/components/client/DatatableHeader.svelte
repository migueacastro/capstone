<script>
    import { page } from "$app/stores";
    export let title = "";
    let url = $page.url + "/add";
    
</script>

<div class="flex flex-row items-center gap-4">
    <h2 class="h1 text-start mb-4 w-full">{title}</h2>
    <div class="flex flex-row">
        <a href="{url}" class="btn variant-filled h-fit w-fit mx-auto lg:btn-xl justify-end">
            <i class="fa-solid fa-plus mr-2"></i>Add
        </a>
    </div>
</div>