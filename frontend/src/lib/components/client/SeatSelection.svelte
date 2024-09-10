<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    export let value;
    export let seats = 0;
    

    $: selectedSeats = [];
    $: if (value) {
        value.forEach(row => {
            row.forEach(slot => {
                if (slot.status != 'available') {
                    seats--;
                }
            })
        });
    }
    const dispatch = createEventDispatcher();

    const emitSeatSelectionEvent = (y, x) => {
        const seat = [y, x];
        if (value) {
            if (selectedSeats.filter(seat => seat[0] === y && seat[1] === x).length > 0) {
                selectedSeats = selectedSeats.filter(seatIterator => !(seatIterator[0] === y && seatIterator[1] === x));
            } else {
                selectedSeats = [...selectedSeats, seat];
            }
        }
        dispatch('selectSeat', {
            seatIndex: x,
            rowIndex: y
        });
        getNumberOfSeats();
    }
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

    export const getRightLetter = (number) => {
        return String.fromCharCode(number + 64);
    }

    const getRowLength = (rowIndex) => {
        return value[rowIndex].filter(slot => slot.type == 'seat' && slot.status == 'available').length;
    };

    const getNumberOfSeats = () => {
        seats = value.reduce((seats, row, index) => seats + getRowLength(index), 0);
    };

    const getEmptySlots = (rowIndex) => {
        return value[rowIndex].filter(slot => slot.type == 'space').length;
    }

    onMount(async () => {
        
    });
</script>

<div tabindex="-1" class="w-full  my-8">
    
    {#if value}
        <div class="flex-row flex justify-center">

            <div class="flex flex-col">
                {#each value as row, index}
                    <div class="card w-8 h-8 variant-outline m-2 flex justify-center items-center">{getLetter(value.length -1 - index)}</div>
                {/each}
            </div>
            <div class="relative flex flex-col w-fit overflow-scroll">
                <div class="flex flex-col">
                    {#each value as row, rowIndex}
                        <div role="button" tabindex="-1" class="flex flex-row relative w-fit ">
                            {#each row as seat, seatIndex}
                                {#if seat.type == 'space'}
                                    <div class="card w-8 h-8 m-2 variant-outline"></div>
                                {:else}    
                                    {#if seat.status == 'available' || (seat.status == 'selected' && selectedSeats.filter(seat => seat[0] === rowIndex && seat[1] === seatIndex).length > 0)}                     
                                    <button on:click={() => emitSeatSelectionEvent(rowIndex, seatIndex, seat)}>
                                        <div class="card w-8 h-8 m-2 flex justify-center items-center"
                                            class:variant-filled-success={seat.status == 'available'}
                                            class:variant-filled-warning={seat.status == 'selected' && selectedSeats.filter(seat => seat[0] === rowIndex && seat[1] === seatIndex).length > 0}
                                        >{seat.value}</div>
                                    </button>
                                    {:else}
                                        <div class="card w-8 h-8 m-2 flex justify-center items-center variant-filled-error">
                                            {seat.value}
                                        </div>
                                    {/if}
                                {/if}
                            {/each}
                        </div>
                    {/each}
                </div>
                <div class="card variant-filled-primary flex p-1  m-2 justify-center rounded-b-full w-full">Screen</div>
            </div>
            
        </div>
        
    {/if}
    <hr class="my-5r">
    <div class="flex flex-row p-4 mx-auto">

        {#each selectedSeats as seat}
            <div class="card flex flex-col relative w-[5rem] h-[5rem] items-center p-2 mx-2 shadow-xl">
                <div class="flex flex-row justify-start w-full ">
                    <button class="ml-0" on:click={emitSeatSelectionEvent(seat[0], seat[1])}><i class="fa-solid fa-xmark"></i></button>
                </div>
                
                <p>{getRightLetter(seat[0] + 1)}-{seat[1] + 1}</p>
            </div>
        {/each}
    </div>
    <p class="text-end">Available seats: {seats}</p>
</div>