<script>
    import { SlideToggle } from "@skeletonlabs/skeleton";
    import { roomStorage, shiftStorage, movieStorage, cityStorage, branchStorage, getCities, getMovies, getBranches, getRooms, getShifts, getWeekdays, weekdayStorage, selectedCityStorage } from "../../../../../stores/cinema";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { draggable, dropzone } from "$lib/components/client/dnd";
    import { popup } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import moment from "moment";
    import { env } from '$env/dynamic/public';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    // 
    const modalStore = getModalStore();
    const toastStore = getToastStore();

    const saveChangesModal = {
        type: 'confirm',
        title: 'Save changes?',
        body: 'Are you sure you wish to proceed?',
        response: (r) => {
            if (r) {
                saveChanges();
                modalStore.close();
            }
        }
    };

    const discardChangesModal = {
        type: 'confirm',
        title: 'Discard changes?',
        body: 'Are you sure you wish to proceed?',
        response: async (r) => {
            if (r) {
            modalStore.close();
            goto('/dashboard')
            .then(
                () => goto('/dashboard/schedule')
            );
            }
        }
    };

    let changed = false;
    let city;
    let branch;
    let room;
    let weekday;
    let lastShiftId;


    $: filteredBranches = $branchStorage.filter(branch => {
	  if (city && branch.city == city) {
        
		return true;
      }
	});

    $: filteredRooms = $roomStorage.filter(room => {
        if (branch && branch !== {} && room.branch == branch && weekday !== {}) {
            return true;
        };
    });
    
    $: filteredShifts = $shiftStorage.filter(shift => {
        if (branch && shift.branch == branch.id && city && branch.city == city.id && weekday && shift.weekday == weekday.id) {
            return true;
        };
    });


    $: filteredMovies = $movieStorage.filter(movie => {
      let selectedCityId = city;
      let selectedCity =$cityStorage.find(city => city.id == selectedCityId);
	  if (selectedCity && selectedCity.on_screen_movies) {
        
		return selectedCity.on_screen_movies.includes(movie.id) && movie.coming_soon == false && weekday !== {};
	  }
	});
    
    // To avoid empty inputs on mount
    $: if (!city && $cityStorage.length > 0) {
        city = $cityStorage[0].id;
    }
    $: if (!branch && filteredBranches.length > 0) {
        branch = filteredBranches[0].id;
    }
    $: if (!room && filteredRooms.length > 0) {
        room = filteredRooms[0].id;
    }
    $: if (!weekday && $weekdayStorage.length > 0) {
        weekday = $weekdayStorage[0].id;
    }
   

    const updateBranchInput = () => {
        branch = filteredBranches[0].id;
    };
    
    const createShift = async (movie_id, room_id, day_id) => {
        changed = true;
        let movie = $movieStorage.find(movie => movie_id == movie.id);
        let room = $roomStorage.find(room => room_id == room.id);
        let day = $weekdayStorage.find(day => day_id == day.id);
        let listShiftsInRoom = $shiftStorage.filter(shift => shift.room == room.id && shift.weekday == day.id);
        let lastShift = listShiftsInRoom[listShiftsInRoom.length - 1];
        let startTime, endTime, newTime;
        let minutesToAdd = 30;

        

        if (listShiftsInRoom.length > 0) {
            
            newTime = moment(lastShift.end_time, 'HH:mm');
            startTime = newTime.clone();
            startTime.add(minutesToAdd, 'minutes'); 
            
        } else {
            startTime = moment(room.opens_at, 'HH:mm');
        }
        
        endTime = startTime.clone();
        endTime.add(movie.duration, 'minutes');
        if (parseInt(endTime.format('mm') % 30) > 0) {
            minutesToAdd = 30 - parseInt(endTime.format('mm'));
            endTime.add(minutesToAdd, 'minutes');
        }

        let newShift = {
                id: lastShiftId, 
                movie: movie.id,
                room: room.id,
                weekday: day.id,
                movie_name: movie.name,
                start_time: startTime.format('HH:mm'),
                end_time: endTime.format('HH:mm'), 
        };
        lastShiftId++;
        shiftStorage.set([...$shiftStorage, newShift]);
    };

    const updateShiftTime = (shift, room_id) => {
        changed = true;
        let selectedShift = shift;
        let selectedRoom = $roomStorage.find(room => room.id == selectedShift.room);
        let listShiftsInRoom = $shiftStorage.filter(shift => shift.room == room_id && shift.weekday == selectedShift.weekday);
        let sortedShifts = listShiftsInRoom.sort((a, b) => moment(a.start_time, 'HH:mm') - moment(b.start_time, 'HH:mm'));
        
        let newTime, startTime, endTime;
        let selectedMovie = $movieStorage.find(movie => movie.id == selectedShift.movie);
        let minutesToAdd = 30;

        sortedShifts.forEach((shift, index) => {

            
            if (index == 0) {
                startTime = moment(selectedRoom.opens_at, 'HH:mm');
                endTime = startTime.clone().add(selectedMovie.duration, 'minutes');
                
            } else {
                startTime = moment(sortedShifts[index - 1].end_time, 'HH:mm').add(30, 'minutes');
                endTime = startTime.clone().add(selectedMovie.duration, 'minutes');
            }

            if (parseInt(endTime.format('mm') % 30) > 0) {
                    minutesToAdd = 30 - parseInt(endTime.format('mm'));
                    endTime.add(minutesToAdd, 'minutes');
                }
            shift.start_time = startTime.format('HH:mm');
            shift.end_time = endTime.format('HH:mm');
        });
    
        shiftStorage.set($shiftStorage);
        console.log($shiftStorage);
    };

    const deleteShift = (shift) => {
        changed = true;
        let selectedShiftId = shift.id;
        shiftStorage.set($shiftStorage.filter(shift => shift.id != selectedShiftId));
        reScheduleRoomShifts(shift.room);
    };
        
    const changeRoomOpenTime = (id, time) => {
        changed = true;
        let room = $roomStorage.find(room => room.id == id);
        room.opens_at = time;
        reScheduleRoomShifts(id);
    };

    const reScheduleRoomShifts = (id) => {
        let room = $roomStorage.find(room => room.id == id);
        for (let shift of $shiftStorage.filter(shift => shift.room == room.id)) {
            if (shift.room == room.id) {
                updateShiftTime(shift, room.id);
            }
        }
    };

    const discardChanges = () => {

    };

    const saveChanges = async () => {
        let list_shifts_to_submit = Array.from($shiftStorage);
        let list_rooms_to_submit = Array.from($roomStorage);

        let endpoint = `${env.PUBLIC_BACKEND_URL}/update-shifts`;
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({list_shifts: list_shifts_to_submit, list_rooms: list_rooms_to_submit}),
            credentials: 'include'
        });
        if (response.ok) {;
            toastStore.trigger({
                message: `Shifts updated successfully`,
                background: 'variant-filled-success',
            });
        }
        else {
            const error = await response.json();
            toastStore.trigger({
                message: `Server error: ${error.message}`,
                background: 'variant-filled-error',
            });
        }
    };

    const getLastShiftId = async () => {
        const response = await fetch(`${env.PUBLIC_BACKEND_URL}/get-last-shiftid`);
        const data = await response.json();
        return data.last_shift_id;
    };

    onMount(async () => {
        
        await getCities();
        await getMovies();
        await getBranches();
        await getRooms();
        await getShifts();
        await getWeekdays();

        // Hack to force reactivity on select inputs
        lastShiftId = await getLastShiftId() + 1;
        city = city;
        branch = branch;
        room = room;
        weekday = weekday;
        
    });

</script>

<div class="flex flex-row items-center gap-4">
    <h2 class="h1 text-start mb-4 w-full">Schedule</h2>
</div>

<div class="flex flex-row space-x-14">
    <div class="flex flex-col lg:w-[75%] w-full space-y-14 ">
        <!-- SCHEDULE FORM -->
        <div class="card   flex flex-col items-start p-6 space-y-4 shadow-lg">
            <div class="flex flex-col lg:flex-row lg:space-x-10 w-full">
                <label class="label text-start lg:indent-2 ">
                    <p>City</p>
                    <select class="select lg:w-40" name="" id="" bind:value={city} on:change={() => { // Another hack to force reactivity with room filtering
                        branch = null;
                        filteredRooms = [];
                    } }>
                        {#each $cityStorage as city, i}
                            <option value={city.id} >{city.name}</option>
                        {/each}
                    </select>
                </label>
                <label class="label text-start lg:indent-2">
                    <p>Branch</p>
                    <select class="select lg:w-40 " name="" id="" bind:value={branch} on:change={() => console.log(filteredRooms)}>
                        {#each filteredBranches as branch}
                            <option value={branch.id}>{branch.name}</option>
                        {/each}
                    </select>
                </label>
                <label class="label text-start lg:indent-2">
                    <p>Day</p>
                    <select class="select lg:w-40" name="" id="" bind:value={weekday} on:change={() => console.log(weekday)}>
                        {#each $weekdayStorage as weekday}
                        <option value="{ weekday.id }">{ weekday.name }</option>   
                        {/each}
                        
                    </select>
                </label>
                
            </div>
            <div class="flex flex-row space-x-3 mx-auto lg:ml-0">
                {#if changed}
                    <button class="btn variant-filled h4" on:click={() => modalStore.trigger(saveChangesModal)}>Save</button>
                    <button class="btn variant-filled-error h4" on:click={() => modalStore.trigger(discardChangesModal)}>Discard</button>
                {/if}
            </div>
            

        </div>
        <!-- END SCHEDULE FORM -->

        <!-- SHIFT LIST -->
        {#if filteredRooms.length > 0}
        <div class="card   flex flex-col h-[80%] p-4 shadow-lg animate-show">
            <h2 class="h2 mb-3">Shifts</h2>
            
            
            <div class="flex flex-col items-center space-y-4">
                {#each filteredRooms as room}
                <div class="card shadow-lg w-full p-5" use:dropzone={{
                        on_dropzone: function (movie) {
                            createShift(movie, room.id, weekday);
                        }
                    }}>
                    <div class="flex flex-row items-center space-x-4 p-4">
                        <p class="h3 font-bold capitalize">{room.name}</p>
                        <p use:popup={{event: 'click', target: `popupClick-room-${room.id}`, placement: 'top'}} class="no-underline anchor">Opens at {room.opens_at}</p>
                        <!-- OPENS AT POPUP-->
                        <div class="card p-4 shadow-md" data-popup="popupClick-room-{room.id}">
                            <p>Select an hour</p>
                            <input type="time" class="input" bind:value={room.opens_at} on:input={() => reScheduleRoomShifts(room.id)}>
                            <div class="arrow variant-filled-primary" />
                        </div>
                        <!-- END OPENS AT POPUP-->
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-3">
                        {#each $shiftStorage as shift}
                            {#if shift.room == room.id && shift.weekday == weekday}
                            <div class="flex flex-row lg:w-[30vh] pointer-events-none m-3" >
                                <div class="card variant-filled-primary w-[7vh] rounded-r-none shadow-md"></div>
                                <div class="card flex flex-col p-3 rounded-l-none w-full shadow-md">
                                    <p class="h3 font-bold">{shift.movie_name}</p>
                                    <p>{moment(shift.start_time, 'HH:mm').format('HH:mm')} - {moment(shift.end_time, 'HH:mm').format('HH:mm')}</p>
                                    <div class="flex flex-row justify-end">
                                        <button on:click={() => deleteShift(shift)} class="pointer-events-auto">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            
                            
                            {/if}
                        {/each}
                        <button class="m-4" use:popup={{event: 'click', target: `popupAddShiftClick-room-${room.id}`, placement: 'top', closeQuery: '.closeOnClick'}}><i class="fa-solid fa-plus"></i></button>
                        <div data-popup="popupAddShiftClick-room-{room.id}" class="card p-4 lg:w-[45vh] shadow-md w-[70%] mx-auto h-[40%] overflow-auto space-y-5">
                            {#each filteredMovies as movie}
                                <button class="closeOnClick flex flex-col h-40 w-full shadow-lg" on:click={() => createShift(movie.id, room.id, weekday)}>
                                   
                                    <div class="w-full h-[75%] rounded-b-none rounded-t-lg relative flex">
                                        <p class="h4 font-bold absolute top-[35%] left-3 z-10 text-white" >{movie.name}</p>
                                        <img src="{movie.image}" class="h-full object-cover w-full rounded-t-lg brightness-50 blur-sm" alt="">
                                    </div>
                                    <div class="card variant-filled-primary rounded-t-none w-full h-[25%] flex-row flex space-x-[75%] px-4 py-1">
                                        <p class="text-nowrap text-center">{movie.duration} Min</p>
                                    </div>
                                    
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
                {/each}
            </div>
        </div>
        {/if}
        
        

        <!-- END SHIFT LIST -->
    </div>

    <!-- AVAILABLE MOVIES LIST -->
    <div class="hidden lg:flex card w-[25%] flex-col h-[100vh] p-4">
        <h2 class="h2 mb-2">Available Movies</h2>
        <p class="font-light mb-3">Drag and drop to add to shifts</p>
        <hr class="mb-5">
        <div class="flex flex-col space-y-6 items-center">
            {#if filteredMovies.length > 0}
                {#each filteredMovies as movie}
                <div class="flex flex-col h-32 w-full shadow-lg" use:draggable={movie.id} draggable="true">
                    <div class="w-[full] h-[75%] rounded-b-none rounded-t-lg relative flex">
                        <p class="h4 font-bold absolute top-[35%] left-3 z-10 text-white" >{movie.name}</p>
                        <img src="{movie.image}" class="h-full object-cover w-full rounded-t-lg brightness-50 blur-sm" alt="">
                    </div>
                    <div class="card variant-filled-primary rounded-t-none w-full h-[25%] flex-row flex space-x-[75%] px-4 py-1">
                        <p class="text-nowrap text-center">{movie.duration} Min</p>
                    </div>
                </div>
                {/each}
            {:else}
                <p class="text-center">No movies available</p>
            {/if}
        </div>
        
    </div>
    <!-- END AVAILABLE MOVIES LIST -->
</div>