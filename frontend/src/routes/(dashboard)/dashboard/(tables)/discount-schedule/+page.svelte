<script>
    import { onMount } from "svelte";
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { popup } from '@skeletonlabs/skeleton';
    import { storePopup } from '@skeletonlabs/skeleton';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { env } from "$env/dynamic/public";
    import { weekdayStorage, getWeekdays, dayDiscountStorage, getDayDiscounts, selectedCityStorage } from "../../../../../stores/cinema";
  import Datatable from "$lib/components/client/Datatable.svelte";

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    const toastStore = getToastStore();



    const selectWeekdayDiscount = async (weekday, discount) => {
        console.log(discount);
        let weekDayInstance = {
            id: weekday.id,
            name: weekday.name,
            discount: (discount) ? discount.id : null
        }
        

        const response = await fetch(`${env.PUBLIC_BACKEND_URL}/weekdays/${weekday.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(weekDayInstance),
            credentials: 'include'
        });
        if (response.ok) {
            await getDayDiscounts();
            await getWeekdays();
            toastStore.trigger({message: `Discount updated successfully`, background: 'variant-filled-success'});
            
        }
        else {
            toastStore.trigger({message: `Server error`, background: 'variant-filled-error'});
        }
    };
    onMount(async () => {
        await Promise.all([
            getWeekdays(),
            getDayDiscounts()
        ]);
    });
</script>

<div class="animate-show w-full">
    <p class="h1 text-start font-bold mb-5">Discount Schedule</p>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    {#each $weekdayStorage as weekday}
                        <th class="text-center w-[14%]">{weekday.name}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {#each $weekdayStorage as weekday}
                        <td class="text-center">
                            {#if !weekday.discount}
                            <i class="fa fa-plus h2 anchor no-underline" use:popup={{event: 'click', target: `popupClick-weekday-${weekday.id}`, placement: 'center'}}></i>
                            <div class="card p-6 shadow-md" data-popup="popupClick-weekday-{weekday.id}">
                                <p class="h3 font-bold mb-5">Select a discount</p>
                                {#each $dayDiscountStorage as discount}
                                    <button on:click={() => selectWeekdayDiscount(weekday, discount)} class="h3 anchor no-underline">{discount.name}</button>
                                {/each}
                                  
                            </div>
                            {:else}
                                {#if weekday.discount}
                                    {#if $dayDiscountStorage.find(discount => discount.id === weekday.discount)}
                                    <p>{$dayDiscountStorage.find(discount => discount.id === weekday.discount).name}</p>
                                    <button on:click={() => selectWeekdayDiscount(weekday, null)}>
                                        <i class="fa fa-xmark ml-2"></i>
                                    </button>
                                    {/if}
                                {/if} 
                            {/if}

                            
                        </td>
                        
                    {/each}
                </tr>
            </tbody>
        </table>
        
    </div>
</div>