<script>
	import { onMount } from "svelte";
	import { cityStorage, movieStorage, getBranches, getRooms, getSessions, selectedCityStorage, branchStorage, roomStorage, sessionStorage, weekdayStorage, getCities, getWeekdays, getMovie } from "../../../../stores/cinema";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";
    import { env } from "$env/dynamic/public";
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    import moment from "moment";
    export let data;
    
    let movie;
    let tabSet = 1;
    $: selectedWeekday = moment().weekday();
    let loadSignal = false;

    $: filteredBranches = (loadSignal == true) ? $branchStorage.filter(branch => {
        if ($selectedCityStorage && $selectedCityStorage?.branches) {
            if ($selectedCityStorage.branches.includes(branch.id)) {
                return true;
            }
        }
    }) : [];

    $: filteredRooms = (loadSignal == true) ? $roomStorage.filter(room => {
        let roomExistsInBranch = false;
        filteredBranches.forEach(branch => {
            if (branch.id == room.branch) {
                roomExistsInBranch = true;
            }
        });
        return roomExistsInBranch;
    }) : [];


    $: filteredSessions = (loadSignal == true) ?  $sessionStorage.filter((session) => {
        let sessionExists = false;
        
        filteredBranches.forEach(branch => {
            if (branch.rooms.includes(session.room)) {
                sessionExists = true;
            }
        });
        if (sessionExists) {
            
            if (moment().isAfter(moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z'))) {
                
                return false;
            }
            else {
                return true;
            }
        }
    }) : [];
    
    $: filteredWeekdays = (loadSignal == true) ? $weekdayStorage.filter(weekday => {
        
        if (moment().weekday() <=  weekday.id &&  weekday.id < moment().weekday()+ 5) { 
            return true
        } else {
            return false;
        }
    }) : [];

    

    onMount(
        async () => {
            await getCities();
            movie = await getMovie(data.id);
            await getSessions();
            await getRooms();
            await getBranches();
            await getRooms();
            await getWeekdays();
            
            loadSignal = true;
            
            

        }
    );

</script>
<div class="container lg:h-full mx-auto flex justify-startitems-start align-top flex-col" in:fade>
	<!-- <div class="space-y-10 text-center flex flex-col items-center my-6">

	
	</div>-->
	<div class="card p-4 pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16  lg:p-10 flex flex-col lg:flex-row">

        <img src="{movie?.image}" alt="{movie?.name}" class="object-cover object-top mb-4 h-64 lg:h-[80%] w-full lg:w-1/3 rounded-lg lg:mx-10">

        <div class="lg:w-[50%]">
            <TabGroup >
                <Tab bind:group={tabSet} name="tab1" value={0}>
                    Description
                </Tab>
                <Tab bind:group={tabSet} name="tab2" value={1}>
                    Theaters
                </Tab>
                <!-- Tab Panels --->
                <svelte:fragment slot="panel">
                    {#if tabSet === 0}
                        <div class="flex flex-col">
                            <h2 class="h2 text-center lg:text-start mb-10">{movie?.name}</h2>
                            <p class="lg:h3 h4 indent-5 h-fit">{movie?.description}</p>
                        </div>
                    {:else if tabSet === 1}
                        <div class="flex flex-row space-x-2">
                            {#each filteredWeekdays as weekday}
                                <button on:click={() => selectedWeekday = weekday.id }
                                class="flex flex-col card justify-center items-center h-[6rem] w-[5rem]" value={weekday.id} class:variant-filled={selectedWeekday==weekday.id} class:variant-outline={selectedWeekday!=weekday.id}>
                                    <p class="h5">{moment().weekday(weekday.id).format("ddd.")}</p>
                                    <p class="h3 font-bold">{moment().weekday(weekday.id).format("DD")}</p>
                                </button>
                            {/each}
                        </div>
                        <div class="flex flex-col space-y-2 my-2">
                            {#each filteredBranches as branch}
                                {#if filteredSessions.filter(session => filteredRooms.filter(room => room.branch == branch.id).map(room => room.id).includes(session.room) && moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z').weekday() == selectedWeekday -1 && session.movie == movie.id).length > 0}
                                    <div class="card variant-outline p-4">
                                        <p class="h3">{branch.name}</p>
                                        <div class="grid lg:grid-cols-5 grid-cols-1 mx-auto">
                                            {#if filteredSessions.length > 0}
                                                {#each filteredSessions as session}
                                                    {#if filteredRooms.find(room => room.branch == branch.id).id == session.room && moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z').weekday() == selectedWeekday -1 && session.movie == movie.id}
                                                        <a href="/sessions/{session.id}">
                                                            <div class="m-2 flex flex-col justify-center items-center card variant-soft w-[8rem] h-[8rem]">
                                                                <p class="h3 font-bold">{moment(session.start_time, 'YYYY-MM-DD HH:mm:ss').format("HH:mm")}</p>
                                                                <p class="h4">{filteredRooms.find(room => room.id == session.room).name}</p>
                                                            </div>
                                                        </a>
                                                    {/if}
                                                {/each}
                                            {/if}
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                </svelte:fragment>
            </TabGroup>
        </div>
        
		
	</div>
</div>

