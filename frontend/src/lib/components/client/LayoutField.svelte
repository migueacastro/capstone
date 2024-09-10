<script>
  import { onMount } from "svelte";




    export let value;
    export let seats = 0;

    let selectedRow = -1;
    let hoverLayout = false;

    const selectRow = (index) => {
        selectedRow = index;
    };

    const unSelectRow = () => {
        selectedRow = -1;
    };

    const addRow = () => {
        value = [...value, [{'type':'seat', 'value': 1, 'status':'available'}]];
        getNumberOfSeats();
    };

    const removeRow = () => {
        value = value.slice(0, -1);
        getNumberOfSeats();
    };

    const addSlot = (rowIndex) => {
        value[rowIndex] = [...value[rowIndex],{'type':'seat', 'value': value[rowIndex].length + 1 - getEmptySlots(rowIndex), 'status':'available'}];
        getNumberOfSeats();
    };
    const removeSlot = (rowIndex) => {
        value[rowIndex] = value[rowIndex].slice(0, -1);
        getNumberOfSeats();
    };

    const addSpace = (rowIndex) => {
        value[rowIndex] = [...value[rowIndex],{'type':'space', 'status':'available'}];
    };
    const getLetter = (number) => {
        return String.fromCharCode(number + 64 + 1);
    };

    const getRowLength = (rowIndex) => {
        return value[rowIndex].filter(slot => slot.type == 'seat').length;
    };

    const getNumberOfSeats = () => {
        seats = value.reduce((seats, row, index) => seats + getRowLength(index), 0);
        console.log(seats);
    };

    const getEmptySlots = (rowIndex) => {
        return value[rowIndex].filter(slot => slot.type == 'space').length;
    }

    onMount(async () => {
        
        await getNumberOfSeats();
    });
</script>

<div role="button" tabindex="-1" class="w-full overflow-x-auto" >
    <div role="button" tabindex="-1" class="flex flex-row w-full justify-center" on:mouseover={()=> hoverLayout = true} on:focus={()=> hoverLayout = true} on:mouseleave={()=> hoverLayout = false} on:blur={()=> hoverLayout = false}>
        {#if value}
        <div class="flex flex-col">
            {#each value as row, index}
                <div class="card w-8 h-8 variant-outline m-2 flex justify-center items-center">{getLetter(value.length -1 - index)}</div>
            {/each}
        </div>
        <div class="relative flex flex-row w-fit">
            <div class="flex flex-col">
                {#each value as row, index}
                <div role="button" tabindex="-1" class="flex flex-row relative w-fit " on:mouseover={() => selectRow(index)} on:mouseleave={unSelectRow} on:focus={()=> selectRow(index)} on:blur={unSelectRow}>
                    {#each row as seat}
                        {#if seat.type == 'space'}
                            <div class="card w-8 h-8 m-2 variant-outline"></div>
                        {:else}
                            <div class="card w-8 h-8 variant-filled m-2 flex justify-center items-center">{seat.value}</div>
                        {/if}
                    {/each}

                    <span role="group" class="absolute p-2 -top-0 -right-12 z-10 flex flex-col variant-filled w-fit h-fit rounded-full space-y-4 mx-3" class:hidden={selectedRow !== index}>
                        {#if value[index].length > 2}
                        <button type="button" on:click={() => removeSlot(index)}><span class="badge-icon z-10 text-xl hover:text-2xl"><i class="fa fa-xmark"></i></span></button>
                        {/if }
                        {#if value[index].length <= 26}
                        <button type="button" on:click={() =>addSpace(index)}><span class="badge-icon z-10 text-xl" ><i class="fa fa-stairs hover:text-2xl"></i></span></button>
                        <button type="button" on:click={() => addSlot(index)}><span class="badge-icon z-10 text-xl" ><i class="fa fa-plus hover:text-2xl"></i></span>  </button>
                        {/if }
                    </span>
                </div>
            {/each}
            <span class="variant-filled p-2 mx-3 absolute bottom-3 -left-20 flex flex-row variant-outline w-fit h-fit rounded-full space-x-4" class:hidden={!hoverLayout}> 
                {#if value.length > 2}
                <button type="button" on:click={removeRow}><span class="badge-icon z-10 text-xl hover:text-2xl " ><i class="fa fa-xmark hover:text-2xl"></i></span></button>
                {/if}
                {#if value.length <= 26}
                <button type="button" on:click={addRow}><span class="badge-icon z-10 text-xl" ><i class="fa fa-plus hover:text-2xl"></span></button>
                {/if }
            </span>
            <div class="card variant-filled-primary flex p-1  m-2 justify-center rounded-b-full w-ful">Screen</div>
            </div>
        
        </div>
        {/if}
    </div>
    <p class="text-end">Seats: {seats}</p>
    

</div>