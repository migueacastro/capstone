<script>
    import { onMount } from 'svelte';

    import { getBill } from '../../../../stores/cinema.js';
    import { fade } from 'svelte/transition';
    import moment from 'moment';

    export let data;

    let bill = {};

    onMount(async () => {
        bill = await getBill(data.id);
    });

</script>

<div class="container h-full mx-auto flex justify-startitems-start align-top flex-col" in:fade>
	<!-- <div class="space-y-10 text-center flex flex-col items-center my-6">

	
	</div>-->
	<div class="p-4 pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16  lg:p-10 flex flex-col lg:flex-row">

        <div class="lg:w-[50%] h-full">
            <img src="{bill?.qr_code}" alt="Qr code" class="mx-auto align-middle object-cover object-top mb-4  w-full lg:w-1/2 rounded-lg ">

        </div>
        
        <div class="lg:w-[50%]">
            <p class="h1 text-center">Bill Details</p>
            <div class="table-responsive my-5 overflow-auto">
                <table class="table">
                    <tbody>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">ID</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.id}</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">User</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.user_name}</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">City</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.city?.name}</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Branch</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.branch?.name}</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Room</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.room?.name}</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Movie</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.session?.movie_name}</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Start time</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{moment(bill?.session?.start_time, 'YYYY-MM-DD HH:mm:ss').format("dddd  DD/MM/YYYY  HH:mm")}</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Seats</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.seats}</p></td>
                        </tr>
                        
                        {#if bill?.discount}
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Base price</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.subtotal}$</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Discount</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.discount?.name} - {bill?.discount_value}$</p></td>
                        </tr>
                        {/if}
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Total</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{bill?.total}$</p></td>
                        </tr>
                        <tr>
                            <td class="p-5 align-middle text-start"><p class="h4 font-bold">Date of purchase</p></td>
                            <td class="p-5 align-middle text-end"><p class="h5">{moment(bill?.created_at, 'YYYY-MM-DD HH:mm:ss').format("dddd  DD/MM/YYYY  HH:mm") }</p></td>
                        </tr>
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
        
		
	</div>
</div>

