<script>
    import { page } from "$app/stores";
    import { onDestroy, onMount } from "svelte";
    import SeatSelection from "$lib/components/client/SeatSelection.svelte";
    import { movieStorage, getSessions, getBranch, getMovie, getSession, getRoom, getTicketTypes, ticketTypeStorage, getDayDiscount, getWeekday} from "../../../../stores/cinema.js";
    import { selectedCityStorage, cityStorage, sessionStorage } from "../../../../stores/cinema.js";
    import { user, onlyAuthenticated } from "../../../../stores/auth.js";
    import { env } from "$env/dynamic/public";
    import { fade } from "svelte/transition";
    import RowCount from "$lib/components/client/RowCount.svelte";
    import { goto } from "$app/navigation";
    import { ProgressBar, ProgressRadial } from "@skeletonlabs/skeleton";
    import { getToastStore } from "@skeletonlabs/skeleton";
    const toastStore = getToastStore()
    import moment from "moment";
    import Form from "$lib/components/client/Form.svelte";


    export let data;


    $: session = {};
    $: room = {};
    $: branch = {};
    $: movie = {};
    $: selectedSeats = [];
    $: initialTime  = 2 * 60;
    $: timeLeft = initialTime;
    $: currentStep = 1;
    $: currentProgress = currentStep * 100/3;

    
    
    
    let tickets = [];
    let availableTickets = 0;
    let movie;
    let ticketTypes = [];
    let weekday;

    let discount = 0;
    let discount_value = 0;

    let total = 0;
    let subtotal = 0;

    

    $: if (currentStep == 3) {
        for (let type of ticketTypes) {
            if (type.quantity > 0) {       
                let newTicket = {
                    'type': type.id,
                    'price': type.price,
                    'quantity': type.quantity,
                    'subtotal': type.price * type.quantity,
                }
                subtotal += newTicket.subtotal;
                tickets = [...tickets, newTicket];

            }

        }

        if (discount) {
            discount_value = (subtotal * (weekday.discount / 100));
            total = subtotal - discount_value;
        } else {
            total = subtotal;
            discount_value = 0;
        }

    } else {
        subtotal = 0;
        total = 0;
        tickets = [];
    }



    $: if (sessionSocket) {
        sessionSocket.onmessage = (event) => {
            
            const data = JSON.parse(event.data);
            if (data.type == 'seat_reservation_update' && data.data.session_id == session.id) {
                session = {
                    ...session, seats: data.data.seats
                };
            }
            
        };

        sessionSocket.onopen = (event) => {
            console.log("Connected to socket");
        };

        sessionSocket.onclose = (event) => {
            console.log("Disconnected from socket" + event.reason + " ");
        };
    }

    $: if ($ticketTypeStorage.length) {
        ticketTypes = $ticketTypeStorage;
        for (let type of ticketTypes) {
            type.quantity = 0;
            type.price = branch?.standart_price - (branch?.standart_price *type.discount_percentage / 100)
        }
    };

    

    const socketEndpoint = `${env.PUBLIC_BACKEND_URL.split('//')[1]}/sessions/${data.id}`;
    $: sessionSocket = null;

    const resetSteps = () => {
        currentStep = 1;
    }

    const resetSelectedTickets = () => {
        availableTickets = selectedSeats.length;
        for (let type of ticketTypes) {
            type.quantity = 0;
        }
    }

    let timeOutId = null;
    const timer = () => {
        return new Promise(resolve => {
            if (timeLeft - 1 < 0) {
                timeOut();
            } else {
                timeLeft--;
                console.log(`Time left: ${timeLeft} seconds`);
                timeOutId = setTimeout(() => timer().then(resolve),1000);
            }
        });
    }

    const timeOut = async () => {
        if (sessionSocket) {
            sessionSocket.close();
        }
        await goto('/');
        await goto('/sessions/' + data.id);
        
    }

    const handleTicketSelection = (event) => {
        let ticketTypeId = event.target.id.split('-')[1];
        let amount = parseInt(event.data);
        let newValue;

        for (let typeIterator of ticketTypes) {
            if (typeIterator.id == ticketTypeId) {
                if (event.inputType == "deleteContentBackward") {
                    availableTickets += typeIterator.quantity;
                    typeIterator.quantity = 0;
                    newValue = 0;
                } else {
                    let newQuantity = parseInt(event.target.value);
                    let difference = newQuantity - typeIterator.quantity;
                    if (availableTickets < Math.abs(difference)) {
                        newValue = typeIterator.quantity;
                        toastStore.clear();
                        toastStore.trigger({'message': 'Exceeded tickets', 'background': 'variant-filled-error'});
                    } else {
                        typeIterator.quantity = newQuantity;
                        availableTickets -= difference;
                        newValue = newQuantity;
                    }
                }
                break;
            }
        }
        event.target.value = (newValue == 0) ? "" : newValue;
    }
    
    const handleSubmit = async () => {
        let seats = [];
        for (let seat of selectedSeats) {
            seats.push(`${String.fromCharCode(seat[0] + 1 + 64)}-${seat[1] + 1}`);
        }
        const formData = {
            'tickets_list': tickets,
            'subtotal': subtotal,
            'total': total,
            'discount': discount,
            'session': session,
            'branch': branch,
            'room': room,
            'user': $user,
            'weekday': weekday,
            'movie': movie,
            'seats': seats,
        }

        const endpoint = `${env.PUBLIC_BACKEND_URL}/pay`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), 
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            await sessionSocket.close(1000, 'Normal closure');
            await goto('/bills/' + data.bill);
            toastStore.trigger({message: "Success", background: 'variant-filled-success'});
            console.log(data);
            
        }
        else {
            toastStore.trigger({message: "Server error", background: 'variant-filled-error'});
        }


    }
    
    onMount(async () => {
        session = await getSession(data.id);
        room = await getRoom(session.room);
        movie = await getMovie(session.movie);
        branch = await getBranch(room.branch);
        weekday = await getWeekday(moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z').weekday() + 1);
        
        discount = (weekday.discount != null) ? await getDayDiscount(weekday.discount) : null;
        
        sessionSocket = new WebSocket(`ws://${socketEndpoint}`);
        await getTicketTypes();
        timer();

        
        if (moment().isAfter(moment(session.start_time, 'YYYY-MM-DD HH:mm:ss Z'))) {
            await goto('/');
        }

        if (!await onlyAuthenticated()) {
            await goto('/login');
        }
    });

    onDestroy(async () => {
        if (sessionSocket) {
            sessionSocket.close();
        }
        
        clearTimeout(timeOutId);
    });

</script>

<div class="container mx-auto flex justify-start items-start align-top flex-col" in:fade>
    <div class="card p-2 pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16  lg:p-10 flex flex-col">
        <div class="w-[70%] my-5 mx-auto"><ProgressBar value={currentProgress} max={100} /></div>
        <div class="flex lg:flex-row flex-col-reverse">
            <div class="flex flex-col lg:w-[65%] card p-4 shadow-xl m-4">
                
                <ProgressRadial width="w-16 lg:w-24" font="85" stroke={50} value={timeLeft / initialTime * 100}>{moment(timeLeft * 1000).format("mm:ss")  }</ProgressRadial>
                <div class:hidden={currentStep != 1} class="flex flex-col items-center">
                    <p class="h2 text-center mt-5">Select your seats</p>
                    {#if session && sessionSocket}
                        
                        <SeatSelection 
                        on:selectSeat={ (event) => {
                                let rowIndex = event.detail.rowIndex;
                                let seatIndex = event.detail.seatIndex;
                                const seatPos = [rowIndex, seatIndex];
                                
    
                                if (selectedSeats.filter(seat => seatPos[0] === seat[0] && seatPos[1] === seat[1]).length > 0) { 
                                    sessionSocket.send(JSON.stringify({
                                        'type': 'seat_free_message',
                                        'message': 'Release seat!',
                                        'data': {'seat_pos': seatPos},
                                    }));
                                    selectedSeats = selectedSeats.filter(seat => !(seatPos[0] === seat[0] && seatPos[1] === seat[1])); 
                                }
                                else {
                                    
                                    sessionSocket.send(JSON.stringify({
                                        'type': 'seat_reservation_message',
                                        'message': 'Reserve seat!',
                                        'data': {'seat_pos': seatPos    },
                                    }));
                                    selectedSeats = [...selectedSeats, seatPos];
                                }

                                
                                resetSelectedTickets();
                            }   
                        }
                        value={session?.seats} seats={session?.number_seats}/>
                    
                        {#if selectedSeats.length > 0}
                            <div class="flex flex-row mx-auto">
                                {#if selectedSeats.length > 1}
                                    <p class="h3">You have selected {selectedSeats.length} seats</p>
                                {:else}
                                    <p class="h3">You have selected {selectedSeats.length} seat</p>
                                {/if}
                                <button class="btn variant-filled ml-5" on:click={() => currentStep = 2}>Next<i class="fa-solid fa-arrow-right ml-2"></i></button>
                            </div>
                        {/if}
    
                    {/if}
                </div>
                {#if currentStep == 2}
                    <div class="flex flex-col items-center">
                        <p class="h2 text-center my-5">Select your tickets</p>
                        <div class="table-container m-5">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Price</th>
                                        <th width=15>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {#each ticketTypes as ticketType}
                                        <tr>
                                            <td>{ticketType.name}</td>
                                            <td>{ticketType.price} $</td>
                                            <td><input id={"ticketType-" +ticketType.id} type="number" class="input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" min=0 on:input|preventDefault={handleTicketSelection}></td>
                                        </tr>
                                    {/each}
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                        <div class="flex flex-row my-2">
                            <button class="btn variant-filled mx-2" on:click={() => {
                                currentStep = 1;
                                resetSelectedTickets();

                                }}><i class="fa-solid fa-arrow-left mr-5"></i> Previous</button>
                            {#if availableTickets == 0}
                                <button class="btn variant-filled ml-5" on:click={() => currentStep = 3}>Next<i class="fa-solid fa-arrow-right ml-2"></i></button>
                            {/if}
                        </div>
                    </div>
                {/if}
                <div class:hidden={currentStep != 3} class="flex flex-col items-center">
                    <p class="h2 text-center mt-5">Confirm your purchase</p>
                    <div class="table-responsive my-4 lg:mt-8 w-full shadow-xl overflow-auto">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="px-5 py-2 h4">Type</th>
                                    <th class="px-5 py-2 h4 text-center">Price</th>
                                    <th class="px-5 py-2 h4 text-center">Quantity</th>
                                    <th class="px-5 py-2 h4 text-center">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each tickets as ticket}
                                    <tr>
                                        <td class="px-5 py-2 h5">{ticketTypes.find(type => type.id == ticket.type)?.name}</td> 
                                        <td class="px-5 py-2 h5 text-center">{ticketTypes.find(type => type.id == ticket.type)?.price} $</td> 
                                        <td class="px-5 py-2 h5 text-center">{ticket.quantity}</td>
                                        <td class="px-5 py-2 h5 text-center">{ticket.subtotal} $</td>
                                    </tr>
                                {/each}
                            </tbody>
                            <tfoot>
                                {#if discount}
                                <tr>
                                    <td colspan="3" class="px-5 py-2 h4">Base:</td>
                                    <td class="px-5 py-1 h4 font-bold text-center   ">{subtotal.toFixed(2)} $</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="px-5 py-2 h4">Discount</td>
                                    <td class="px-5 py-1 h4 font-bold text-center   ">{discount_value.toFixed(2)} $</td>
                                </tr>
                                {/if}
                                <tr>
                                    <td colspan="3" class="px-5 py-2 h4">Total</td>
                                    <td class="px-5 py-2 h4 font-bold text-center   ">{total.toFixed(2)} $</td>
                                </tr>
                            </tfoot>
                        </table>
                        
                    </div>
                    <p class="h3 text-center lg:hidden my-7"><strong>Total:</strong> {total.toFixed(2)} $</p>
                    <div class="my-5 lg:my-8 w-full">
                        <p class="h3 mb-5 text-center">Selected seats</p>
                        <div class="flex flex-row p-4 mx-auto">
                            {#each selectedSeats as seat}
                            <div class="card flex flex-col relative w-[5rem] h-[5rem] items-center p-2 mx-2 shadow-xl">    
                                <p>{String.fromCharCode(seat[0] + 1 + 64)}-{seat[1] + 1}</p>
                            </div>
                            {/each}
                        </div>
                        
                    </div>
                    
                    <div class="flex flex-row my-2">
    
                        <button class="btn variant-filled mx-2" on:click={() => currentStep = 2}><i class="fa-solid fa-arrow-left mr-5"></i> Previous</button>
                        <button class="btn variant-filled mx-2" on:click={handleSubmit}>Confirm</button>
                    </div>
                </div>
            </div>
            
            <div class="card p-4 flex flex-col items-center m-4 lg:w-[35%] shadow-xl">
                
                <h2 class="h2 my-3">{movie?.name}</h2> 
                <img src="{movie?.image}" alt="{movie?.name}" class="h-[12rem] object-contain object-center rounded-md m-3"/>     
                <div class="grid grid-cols-2 w-full p-3 h5">     
                    <p><strong>Date:</strong></p><p class="text-end"> {moment(session?.start_time, 'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY")}</p>
                    <p><strong>Branch:</strong></p><p class="text-end"> {branch?.name}</p>
                    <p><strong>Start Time:</strong></p><p class="text-end">{moment(session?.start_time, 'YYYY-MM-DD HH:mm:ss').format("HH:mm")}</p>   
                    <p><strong>Room:</strong><p class="text-end"> {room?.name}</p>       
                </div>            
            </div>  
            
        </div>
    </div>
</div>
