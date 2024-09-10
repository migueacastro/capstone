<script>
    import { goto } from '$app/navigation';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { FileDropzone, SlideToggle, Autocomplete, InputChip } from '@skeletonlabs/skeleton';
    import { popup } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { page } from '$app/stores';
    import { _fieldsStorage } from '../../../stores/form.js';
    import { env } from '$env/dynamic/public';
    import LayoutField from './LayoutField.svelte';
 
    
    export let name = '';

    export let fields = [{type: null, value: null, name: null, tables: null, hidden: false}];
    export let endpointName = '';
    export let edit = false;
    let id = $page.params.id;
    
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    let tables = {};
    const toastStore = getToastStore();
    let layoutSeats = 0;
    $: {layoutSeats = fields?.find(field => field.type === 'layout')?.seats; console.log(layoutSeats)}


    let manyToManyListsDict = {};
    let inputChipListsDict = {};
    let valueChipListsDict = {};
    let inputChipDict = {};

    let removedOptions = {};

    const loadEditValues = async () => {
        const response = await fetch(`${env.PUBLIC_BACKEND_URL}/${endpointName}/${id}/`, {
            credentials: 'include'
        });
        const data = await response.json();
        return data
    }
    
    const loadCreateForm = async () => {
        
        let data;
        if (edit) {
            data = await loadEditValues();
        }

        for await (let field of fields) {
            if (field.type === 'foreignKey' || field.type === 'manyToMany') {
                let table = await fetch(`${env.PUBLIC_BACKEND_URL}/${field.table}/`, {
                    credentials: 'include'
                });

                table = await table.json();
                tables[field.table] = table;

                if (field.type === 'manyToMany') {
                    let newManyToManyList = table.map(table => ({label: table.name, value: table.id}));
                    
                    inputChipListsDict[field.table] = (edit) ? data[field.name + '_name'] : []; // Initially selected values
                    inputChipDict[field.table] = '';
                    manyToManyListsDict[field.table] = (edit) ? newManyToManyList.filter(newTable => !data.on_screen_movies.includes(newTable.value)) : newManyToManyList;
                    removedOptions[field.table] = (edit) ? newManyToManyList.filter(newTable => data.on_screen_movies.includes(newTable.value)) : [];
                    valueChipListsDict[field.table] = (edit) ? data[field.name] : [];

                } else {
                    field.value = (edit) ? data[field.name] : null;
                }
            } else if (field.type === 'object' && edit) {
                field.value = [data[field.name]];
                console.log(field.value);
            } else if (field.type === 'layout' && edit) {
                field.value = data[field.name];
                field.seats = data['number_seats'];
            }

            if (edit) {
                field.value = data[field.name];
            }
        };
        _fieldsStorage.set(fields);
    }

    
    const addChip = (detail, table) => {
        
        removedOptions[table] = [...removedOptions[table], detail]; // Add the item to removed options array
        manyToManyListsDict[table] = manyToManyListsDict[table].filter(item => item != detail); // Remove the item from manyToManyListsDict
        inputChipListsDict[table] = [...inputChipListsDict[table], detail.label]; // Add the item to inputChipListsDict
        valueChipListsDict[table] = [...valueChipListsDict[table], detail.value];
    };

    const removeChip = (detail, table) => {
        
        let chip = removedOptions[table].find(item => item.label === detail.chipValue); // Find the item by the detail
        manyToManyListsDict[table] = [...manyToManyListsDict[table], chip]; // Add the item to manyToManyListsDict
        removedOptions[table] = removedOptions[table].filter(item => item.label !== detail.chipValue); // Remove the item from removedOptions
        inputChipListsDict[table] = inputChipListsDict[table].filter(item => item !== detail.chipValue); // Remove the item from inputChipListsDict 
        valueChipListsDict[table] = valueChipListsDict[table].filter(item => item !== chip.value);
    };


    const toastSuccessSettings = {
        message: `${capitalizedName} added successfully`,
        background: 'variant-filled-success',
    };

    let validFields = () => {
        $_fieldsStorage.forEach(field => {
            switch (field?.type) {
                case 'text' || 'date' || 'textarea':
                    if (field.length < 1) return false;
                    break;
                case 'integer' || 'decimal':
                    if (field < 1) return false;
                    break;
                case 'boolean':
                    if (field === null) return false;
                    break;
                case 'object':
                    if (field.value.length < 1) return false;
                    break;
                case 'foreignKey':
                    if (!field.value) return false;
                    break;
                case 'manyToMany':
                    if (field.length < 1) return false;
                    break;
                default:
                    return true;
            }
        })
    }

    const showInvalidMessage = (message) => {
        toastStore.trigger({
            message,
            background: 'variant-filled-error',
        });
    }
    
    const handleSubmit = async () => {
        
        if (validFields()) {
            showInvalidMessage('All fields are required');
            return;
        }
        
        const formData = new FormData();
        $_fieldsStorage.forEach(field => {
            if (field.name == 'password' && field.value == '') {
                return;
            }
            if (field.type === 'object') {
                
                if ((edit && typeof(field.value[0]) == 'object') || !edit) {
                    formData.append(field.name, field.value[0]);
                }
               
            } else if (field.type === 'manyToMany') {  
                console.log(valueChipListsDict[field.table]);
                valueChipListsDict[field.table].forEach(value => {
                    formData.append(field.name, value); // Add pk fields of manyToMany
                });
            } else if (field.type === 'layout') {
                formData.append(field.name, JSON.stringify(field.value));
                formData.append('number_seats', field.seats);
            } else {
                formData.append(field.name, field.value);
            }
        });
        let method = (edit) ? 'PUT' : 'POST';
        const response = await fetch(`${env.PUBLIC_BACKEND_URL}/${endpointName}/${edit ? id+'/' : ''}`, {
            method: method,
            body: formData,
            credentials: 'include'
        });
        if (response.ok) {
            await goto(`/dashboard/${endpointName}`);
            toastStore.trigger(toastSuccessSettings);
        }
        else {
            const error = await response.json();
            showInvalidMessage("Server error");
        }
    };

    function onInputChipSelect(event) {
		console.log('onInputChipSelect', event.detail);
		if (inputChipList.includes(event.detail.value) === false) {
			inputChipList = [...inputChipList, event.detail.value];
			inputChip = '';
		}
	}

    const InputChipValidation = (value) => {
        return false;
    }

    onMount(async () => {
        
        await loadCreateForm();
        
        
        
    });
</script>

<div class="animate-show">
    <h2 class="h1 text-start mb-4">{edit ? 'Edit' : 'Add'} {capitalizedName}</h2>
    
    <form class=" gap-10 flex flex-col lg:flex-row" on:submit={handleSubmit}>
        <div class="card my-3 p-10 text-start lg:w-[75%] space-y-6">
            {#each $_fieldsStorage as field}
                <label class="label" for="{(field?.type == 'object') ? 'file' : field?.name }" class:hidden={field?.type === 'hidden'}>
                    <p class="capitalize">{field?.name?.replace(/_name/g, ' ').replace(/_/g, ' ')}</p>
                    {#if field?.type === 'text'}
                        <input class="input" type="text" placeholder="" bind:value={field.value} id="{field.name}"/>
                    {:else if field?.type === 'password'}
                        <input class="input" type="password" placeholder="" bind:value={field.value} id="{field.name}"/>
                    {:else if field?.type === 'decimal'}
                        <input class="input w-[25%]" type="number" placeholder="" min="0" step="0.01" bind:value={field.value} id="{field.name}"/>
                    {:else if field?.type === 'integer'}
                        <input class="input w-[25%]" type="number" placeholder="" min="0" bind:value={field.value} id="{field.name}" disabled={field?.disabled}/>
                    {:else if field?.type === 'boolean'}
                        <SlideToggle bind:checked={field.value} id="toggle-{field.name}"/>
                    {:else if field?.type === 'hidden'}
                        <input class="input" type="hidden" placeholder="" bind:value={field.value} id="{field.name}"/>
                    {:else if field?.type === 'date'}
                        <input class="input" type="date" placeholder="" bind:value={field.value} id="{field.name}"/>
                    {:else if field?.type === 'datetime'}
                        <input class="input" type="datetime-local" placeholder="" bind:value={field.value} id="{field.name}"/>
                    {:else if field?.type === 'textarea'}
                        <textarea class="textarea" rows="4" placeholder="" bind:value={field.value} id="{field.name}"/>
                    {:else if field?.type === 'object'}
                        {#if field.value.length == 0}
                        <FileDropzone name="file" bind:files={field.value} fileInput={{accept: 'image/png, image/jpg, image/jpeg, image/webp'}} id="{'file'}">
                            <svelte:fragment slot="lead"><i class="fa-solid fa-upload"></i></svelte:fragment>
                            <svelte:fragment slot="message">Upload a picture or drop it here</svelte:fragment>
                            <svelte:fragment slot="meta">PNG, JPG and WEBP allowed.</svelte:fragment>
                        </FileDropzone>
                        {:else}
                        
                            <div class="relative inline-block">
                                <button on:click|stopPropagation={() => field.value = []}>
                                    <span class="badge-icon variant-filled-error absolute top-2 -right-2 z-10" >x</span>
                                </button>
                                <img src={(edit && typeof(field.value[0]) == 'string' ) ? field.value : URL.createObjectURL(field.value[0])} alt="dropped-file" class=" lg:h-[20vh]"/>
                            </div>
                        {/if}
                    {:else if field?.type == 'foreignKey'}
                       
                        {#if tables && tables[field.table]}
                        <select class="select" bind:value={field.value} id="{field.name}">
                            {#each tables[field.table] as option}
                                <option value={option.id}>{option.name}</option>
                            {/each}
                        </select>     
                        {/if}
                    {:else if field?.type == 'manyToMany'}
                        <InputChip bind:input={inputChipDict[field.table]} bind:value={inputChipListsDict[field.table]} name="chips" on:remove={({ detail }) => removeChip(detail, field.table)} addChip={(event) => addChip(event.detail, field.table)} validation={InputChipValidation} invalid={''}/>
                        <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
                            <Autocomplete
                                bind:input={inputChipDict[field.table]}
                                options={manyToManyListsDict[field.table]}
                                on:selection={({ detail }) => addChip(detail, field.table)}
                                
                            />
                        </div>
                    {:else if field?.type == 'layout'}
                        <LayoutField bind:value={field.value} bind:seats={field.seats}/>
                    {/if}
                </label>
            {/each}
            <button type="submit" class="btn variant-filled h-fit w-fit mx-auto btn-xl">Save</button>
        </div>    
    </form>
</div>