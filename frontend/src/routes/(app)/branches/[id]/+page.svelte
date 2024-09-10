<script>
	import { onMount } from "svelte";
	import { cityStorage, getCities, selectedCityStorage,  getRooms, getBranch, getSessions, getMovies, getWeekdays} from "../../../../stores/cinema";
    import { branchStorage, movieStorage, roomStorage, sessionStorage, weekdayStorage  } from "../../../../stores/cinema";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";
    import { env } from "$env/dynamic/public";
    import moment from "moment";
  import { filter } from "@skeletonlabs/skeleton";

    export let data;
    let branch;
    let tabSet = 1;
    let selectedWeekday = moment().weekday();
    let loadSignal = false;

    $: filteredRooms = (loadSignal == true) ? $roomStorage.filter(room => {
        if (branch.rooms.includes(room.id)) {
            return true;
        }
    }) : [];


    $: filteredSessions = (loadSignal == true) ?  $sessionStorage.filter((session) => {
        let sessionExists = false;
        if (branch.rooms.includes(session.room)) {
            sessionExists = true;
        }
        
        if (sessionExists) {
            if (moment().isAfter(moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z'))) {

                return false;
            }
            else {
                return true;
            }
        }
    }) : [];
    $: filteredMovies = (loadSignal == true) ? $movieStorage.filter(movie => {
        let movieExists = false;
        filteredRooms.forEach(room => {
            if (branch.rooms.includes(room.id)) {
                filteredSessions.forEach(session => {
                    if (session.room == room.id && session.movie == movie.id) {
                        
                        movieExists = true;
                    }
                })
            }
        });
        return movieExists;
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
            branch = await getBranch(data.id);
            await getSessions();
            await getRooms();
            await getWeekdays();
            await getMovies();
            loadSignal = true;

            await setTimeout(2000);
        }
    );

</script>
<div class="container mx-auto flex justify-start items-start align-top flex-col" in:fade>
	<!-- <div class="space-y-10 text-center flex flex-col items-center my-6">

	
	</div>-->
	<div class="card p-4 h-full pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16  lg:p-10 flex flex-col lg:flex-row">
        <div class="flex flex-col h-fit">
            <h2 class="h2 text-center lg:text-start mb-10">{branch?.name}</h2>
            <p class="lg:h3 h4 indent-2 my-2 h-fit">{branch?.address}</p>
            <div class="flex flex-row space-x-2 overflow-auto my-2">
                {#each filteredWeekdays as weekday}
                    <button on:click={() => selectedWeekday = weekday.id}
                    class="flex flex-col card justify-center items-center h-[4rem] w-[3rem] lg:h-[6rem] lg:w-[5rem]" value={weekday.id} class:variant-filled={selectedWeekday==weekday.id} class:variant-outline={selectedWeekday!=weekday.id}>
                        <p class="h5">{moment().weekday(weekday.id).format("ddd.")}</p>
                        <p class="h3 font-bold">{moment().weekday(weekday.id).format("DD")}</p>
                    </button>
                {/each}
            </div>
            <div class="flex flex-col space-y-2 my-2">
                {#if filteredSessions.filter(session => moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z').weekday() + 1 == selectedWeekday).length > 0}
                    {#each filteredMovies as movie}
                        {#if filteredSessions.filter(session => filteredRooms.filter(room => room.branch == branch.id).map(room => room.id).includes(session.room) && moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z').weekday()  == selectedWeekday -1 && session.movie == movie.id).length > 0}
                            <div class=" flex flex-col lg:flex-row">
                                <p class="h2 m-2 lg:hidden">{movie.name}</p>
                                <img src="{movie.image}" alt="{movie.name}" class="w-full lg:w-fit object-contain lg:h-[18rem] lg:my-5 lg:mr-5 rounded-lg">
                                <div class="flex flex-col">
                                    <p class="h2 m-2 hidden lg:block pt-1">{movie.name}</p>
                                    <div class="grid lg:grid-cols-5 grid-cols-1">
                                        {#if filteredSessions.length > 0}
                                            {#each filteredSessions as session}
                                                {#if filteredRooms.find(room => room.branch == branch.id).id == session.room && moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z').weekday() == selectedWeekday -1 && session.movie == movie.id}
                                                    <div class="flex flex-row my-5">
                                                        
                                                        <a href="/sessions/{session.id}">
                                                            
                                                            <div class="m-2 flex flex-col justify-center items-center card variant-soft w-[5rem] h-[6rem] lg:w-[8rem] lg:h-[8rem]">
                                                                
                                                                <p class="h3 font-bold">{moment(session.start_time, 'YYYY-MM-DD HH:mm:ss').format("HH:mm")}</p>
                                                                <p class="h4">{filteredRooms.find(room => room.id == session.room).name}</p>
                                                            </div>
                                                        </a>
                                                    </div> 
                                                {/if}
                                            {/each}
                                        {/if}
                                    </div>
                                </div>
                                
                            </div>
                            
                        {/if}
                    {/each}
                {:else}
                    <p class="my-2">No movies available this day.</p>
                    <div class="p-[100%]"></div>
                {/if}
            </div>
        </div>
	</div>
</div>

