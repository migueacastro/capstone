<script>
	//Import local datatable components
	import ThSort from '$lib/components/client/ThSort.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import Search from '$lib/components/client/Search.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';

	//Load local data
    import { getData } from '$lib/components/client/data';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	

	//Import handler from SSD
	import { DataHandler } from '@vincjo/datatables';
    import { onMount } from 'svelte';
  	import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
  	import { goto } from '$app/navigation';
  

	// Get modal store
	const modalStore = getModalStore();
	//Init data handler - CLIENT

    // Custom props I added to reuse this component
    export let endpoint = ''
	export let fields = []

	const capitalize = (s) => {
		if (typeof s !== 'string') return ''
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
	const formatTitle = (s) => {
		return s.replace(/_/g, ' ')
	}

	const toastStore = getToastStore();
    let data = [{}];
	let handler = new DataHandler(data, { rowsPerPage: 5 });
	let rows = handler.getRows();
	const endpointName = endpoint.split('/').slice(-1)[0];


	const modalDelete = (row) => {
		modalStore.trigger({
			type: 'confirm',
			title: 'Delete ' + row.name,
			body: 'Are you sure you want to delete ' + row.name + '?',
			response: (r) => {
				if (r) {
					deleteRow(row);
				}
			},
		});
	}

	const deleteRow = (row) => {
		//TODO: Delete row
		fetch(endpoint + '/' + row.id, {
			method: 'DELETE',
			credentials: 'include'
		}).then((response) => {
			if (response.ok) {
				modalStore.close();
				toastStore.trigger({message: 'Deleted ' + row.name, background: 'variant-filled-warning'});
				getData(endpoint).then((data) => {
					handler = new DataHandler(data, { rowsPerPage: 5 });
					rows = handler.getRows();
				});
			}
			else {
				modalStore.close();
				toastStore.trigger({message: 'Failed to delete ' + row.name, background: 'variant-filled-error'});
			}
		})
	}
	const openModalRow = (row) => {
		modalStore.clear(); // Prevents a modal queue
		let content = '';
		let settings = {type: 'confirm', buttonTextConfirm: 'Edit', response: async(r) => {if (r) await goto(`/dashboard/${endpointName}/${row.id}`)}};
		for (const [key, value] of Object.entries(row)) {
			switch (key) {
				case 'id':
					break;
				case 'name':
					settings['title'] = capitalize(value);
 					break;
				case 'image':
					content += `<img class="mx-auto max-h-[35vh]" src="${value}" alt="${value}"/>`;
					break;
				case 'duration':
					content += `<h2 class="capitalize">${formatTitle(key)}:</h2><p>${value} min.</p>`
					break;
				case 'layout':
					break;
				default:
					content += `<h2 class="capitalize">${formatTitle(key)}:</h2><p>${value}</p>`
			};
		}
		settings['body'] = content;

		modalStore.trigger(settings);
	};


	const closeModal = () => {
		modalStore.clear();
	}

	const openImage = (image) => {
		modalStore.clear(); // Prevents a modal queue
		let settings = {
			type: 'image',
			image: image,
		}
		modalStore.trigger(settings);
	}

    onMount(async() => {
        data = await getData(endpoint);
		handler = new DataHandler(data, { rowsPerPage: 5 });
		rows = handler.getRows();
	    
    });
</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>   
			<tr>
                {#each fields as field}
				<ThSort {handler} orderBy={field}>{field.replace(/_name/g, ' ').replace(/_/g, ' ')}</ThSort>
				{/each}
				<td></td>
			</tr>
			<tr>
                {#each fields as field}

					{#if field === 'image'}
						<ThFilter></ThFilter>
					{:else}
						<ThFilter {handler} filterBy="{field}" />
					{/if}
                {/each}
				<td></td>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
			
				<tr on:click={() => openModalRow(row)}>
					
                    {#each fields as field}
						{#if field === 'image'}
							<td><button class="z-20" on:click|stopPropagation={openImage(row[field])}><img class="mx-auto break-words lg:max-w-32 lg:h-[10vh] object-cover" src={row[field]} alt={field} /></button></td>
						{:else}
							<td class="text-justify indent-2  text-wrap">{row[field]}</td>
						{/if}
					{/each}
					<td class="flex flex-row gap-3 mx-2">
						<button on:click|stopPropagation={async () => await goto(`/dashboard/${endpointName}/${row.id}`)}><i class="fa-solid fa-pen-to-square text-2xl"></i></button>
						<button on:click|stopPropagation={() => modalDelete(row)}><i class="fa-solid fa-xmark text-2xl"></i></button>
					</td>
					
				</tr>
			
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
