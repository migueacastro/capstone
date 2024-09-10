<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { getTickets, ticketStorage, billStorage, getBill, getBills, getStaff, staffStorage } from '../../../stores/cinema.js';
    import moment from 'moment';
    import "@carbon/charts-svelte";
    import "@carbon/charts-svelte/styles.css";
    import { BarChartSimple, LineChart } from '@carbon/charts-svelte';
    import { ScaleTypes } from '@carbon/charts-svelte';

    $: mostSoldMoviesChartData = [];
    $: sellsChartData = [];
    $: incomesThisMonth = 0;

    let movieObject;

    $: if ($billStorage.length) {
        for (let bill of $billStorage) {
            
            if (bill?.session?.movie_name) {
                
                movieObject = mostSoldMoviesChartData.find(movieIterator => movieIterator.movie == bill?.session?.movie_name);
                if (!movieObject) {
                    mostSoldMoviesChartData = [...mostSoldMoviesChartData, {movie: bill?.session?.movie_name, tickets: bill?.tickets?.length}];
                } else {
                    movieObject.tickets += bill?.tickets?.length;
                    
                }
                
            }
           
        }
        
        sellsChartData = $billStorage.reduce((acc, bill) => {
            const date = new Date(bill?.created_at);
            const existingDate = acc.find((item) => moment(item.date).date() === moment(date).date());
            if (existingDate) {
                existingDate.value += 1;
            } else {
                acc.push({ date, value: 1 });
            }
            return acc;
        }, []);

        sellsChartData.sort((a, b) => Math.sign(a.date - b.date));

        for (let bill of $billStorage) {
            let month = new Date(bill?.created_at).getMonth();
            let year = new Date(bill?.created_at).getFullYear();
            if (month == new Date().getMonth() && year == new Date().getFullYear()) {
                incomesThisMonth += bill?.total;
            }
        }
    }

    onMount(async () => {
        await getTickets();
        await getBills();
        await getStaff();
        
    });
</script>

<div class="container h-full mx-auto flex justify-startitems-start align-top flex-col" in:fade>
	<!-- <div class="space-y-10 text-center flex flex-col items-center my-6">

	
	</div>-->
    
	<div class="p-4 pt-8 mx-4 w-[90%] lg:w-full mt-4  lg:p-10 flex flex-col">
        <h2 class="h1 text-start mb-4 w-full">Dashboard</h2>
        <div class="flex lg:flex-row flex-col">
            <div class="lg:w-[50%]">
                <div class="card mx-4 mt-4 p-4 shadow-lg">
                    <p class="text-center h3 font-bold">Most sold movies (Tickets)</p>
                    <BarChartSimple
                    data={mostSoldMoviesChartData}
                    options={{
                        theme: 'g90',
                        title: '',
                        height: '400px',
                        axes: {
                            left: { mapsTo: 'tickets', scaleType: 'linear' },
                            bottom: { mapsTo: 'movie', scaleType: 'labels' }
                        }
                    }} />
                </div>
            </div>
            
            <div class="lg:w-[50%]">
                <div class="card mx-4 p-4 mt-4 shadow-lg">
                    <p class="text-center h3 font-bold">Incomes ($)</p>
                    <LineChart
                    data={sellsChartData}
                    options={{
                        theme: 'g90',
                        title: '',
                        height: '400px',
                        
                        axes: {
                            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR },
                            bottom: { mapsTo: 'date', scaleType: ScaleTypes.TIME }
                        }
                    }} />
                </div>
            </div>
        </div>
        
        
		
	</div>
    <div class="px-4  mx-4 w-[90%] lg:w-full lg:px-10 flex flex-col lg:flex-row">

        
        <div class="w-full flex flex-col lg:flex-row mb-5">
            <div class="card mx-4 lg:w-1/3 shadow-lg p-2 lg:p-3 my-2 mt-0 lg:my-0">
                <p class="text-center h3 font-bold">Sold tickets</p>
                <p class="text-center">This month</p>
                <p class="text-center h2 font-bold my-4">{$billStorage.length}</p>
            </div>
            <div class="card mx-4 lg:w-1/3 shadow-lg p-2 lg:p-3 my-2 lg:my-0">
                <p class="text-center h3 font-bold">Total incomes</p>
                <p class="text-center">This month</p>
                <p class="text-center h2 font-bold my-4">{incomesThisMonth.toFixed(2)} $</p>
            </div>
            <div class="card mx-4 lg:w-1/3 shadow-lg p-2 lg:p-3 my-2 lg:my-0">
                <p class="text-center h3 font-bold">Staff Users</p>
                <a href="/dashboard/staff" class="anchor no-underline">
                    <p class="text-center">View all</p>
                </a>
                <p class="text-center h2 font-bold my-4">{$staffStorage.length}</p>
            </div>
        </div>
        
		
	</div>
</div>