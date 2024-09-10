<script lang="ts">

	import '@fortawesome/fontawesome-free/css/all.min.css'
	import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import { authenticated, user, unauthenticateUser,  onlyStaff } from '../../../stores/auth';
	import { goto } from '$app/navigation';
	import {  Drawer } from '@skeletonlabs/skeleton';
  	import { onMount } from 'svelte';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import { Toast } from '@skeletonlabs/skeleton';
    import { writable } from 'svelte/store';
    import { page } from '$app/stores';
    import { env } from "$env/dynamic/public";
    
    const modalStore = getModalStore();
    let openedDropdownIndex = -1;
    let openedDropdownIndexMobile = -1;

    // Reactive variables that change inmediately
    $:thisUrl = $page.url.pathname.split('/');
    $: isSelected = (url) => {
        if (thisUrl[1] == url && thisUrl.length == 2) {
            return true;
        } else {
            if (thisUrl[2] == url) {
                return true;
            }
            return false;
        }
    };
    $:expandedDrawer = false;
	const drawerStore = getDrawerStore();
	const layoutDrawerSettings = {'id': 'layoutDrawer'}
    let expandedSideBar = false;

    

	const handleLogout = async () => {
		try {
			let endpoint = `${env.PUBLIC_BACKEND_URL}/logout`;
			const response = await fetch(endpoint, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					
				},
				credentials: 'include' // This line is important, otherwise cookies will not be stored in the client browser
			})
	
			if (response.ok) {
				// User logged out successfully
				unauthenticateUser();
				await goto('/login');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	}

    const hideDrawer = () =>{
				expandedDrawer = false;
                setTimeout(drawerStore.close, 400);
    };

	onMount(async () => {

    await setTimeout(() => onlyStaff($user), 2000);
	
});

</script>

<Modal height="h-auto" regionBody="h-auto overflow-hidden"/>

<!-- Drawer -->
<Drawer position='top' height='h-[97%]' class="lg:hidden">
	{#if $drawerStore.id === 'layoutDrawer'}

		<nav class="list-nav m-2 text-center">
			<button on:click={() => {
                expandedDrawer = false;
                setTimeout(drawerStore.close, 400);
                }}><i class="fa-solid fa-arrow-up h2"></i></button>
			<!-- (optionally you can provide a label here) -->
			<ul class="my-2 mx-auto">
				<li>
					<a href="/dashboard" class="w-fit my-2 mx-auto h4 font-bold" on:click={hideDrawer}>
						Dashboard
					</a>
				</li>
                <li>
                    <button on:click={() => (openedDropdownIndexMobile == 1) ? openedDropdownIndexMobile = -1 : openedDropdownIndexMobile = 1 } class="font-bold w-fit my-2 mx-auto h4">
                        Movies
                    </button>
                    <ul class="font-light h-0"
                    class:ml-[100vh]={openedDropdownIndexMobile !== 1} 
                    class:h-auto={openedDropdownIndexMobile === 1}
                    class:opacity-0={openedDropdownIndexMobile !== 1} 
                    class:show-text-mobile={openedDropdownIndexMobile === 1} 
                    class:hide-text-mobile={openedDropdownIndexMobile !== 1}>
                        <li>
                            <a href="/dashboard/movies" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Movies
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/movieads" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Movie Ads
                            </a>
                        </li>
                    </ul>
                </li>
				<li>
                    <button on:click={() => (openedDropdownIndexMobile == 2) ? openedDropdownIndexMobile = -1 : openedDropdownIndexMobile = 2 } class="font-bold w-fit my-2 mx-auto h4">
                        Locations
                    </button>
                    <ul class="font-light h-0"
                    class:ml-[100vh]={openedDropdownIndexMobile !== 2} 
                    class:h-auto={openedDropdownIndexMobile === 2}
                    class:opacity-0={openedDropdownIndexMobile !== 2} 
                    class:show-text-mobile={openedDropdownIndexMobile === 2} 
                    class:hide-text-mobile={openedDropdownIndexMobile !== 2}>
                        <li>
                            <a href="/dashboard/theaters" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Theaters
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/rooms" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Rooms
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/cities" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Cities
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <button on:click={() => (openedDropdownIndexMobile == 3) ? openedDropdownIndexMobile = -1 : openedDropdownIndexMobile = 3 } class="font-bold w-fit my-2 mx-auto h4">
                        Events
                    </button>
                    <ul class="font-light h-0"
                    class:ml-[100vh]={openedDropdownIndexMobile !== 3} 
                    class:h-auto={openedDropdownIndexMobile === 3}
                    class:opacity-0={openedDropdownIndexMobile !== 3} 
                    class:show-text-mobile={openedDropdownIndexMobile === 3} 
                    class:hide-text-mobile={openedDropdownIndexMobile !== 3}>
                        <li>
                            <a href="/dashboard/sessions" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Sessions
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/schedule" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Schedule
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <button on:click={() => {(openedDropdownIndexMobile == 4) ? openedDropdownIndexMobile = -1 : openedDropdownIndexMobile = 4} } class="font-bold w-fit my-2 mx-auto h4">
                        Tickets
                    </button>
                    <ul class="font-light h-0"
                    class:ml-[100vh]={openedDropdownIndexMobile !== 4} 
                    class:h-auto={openedDropdownIndexMobile === 4}
                    class:opacity-0={openedDropdownIndexMobile !== 4} 
                    class:show-text-mobile={openedDropdownIndexMobile === 4} 
                    class:hide-text-mobile={openedDropdownIndexMobile !== 4}>
                        <li>
                            <a href="/dashboard/tickets" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Tickets
                            </a>
                            
                        </li>
                        <li>
                            <a href="/dashboard/ticket-types" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Types
                            </a>
                            
                        </li>
                        
                    </ul>
                </li>
                <li>
                    <button on:click={() => (openedDropdownIndexMobile == 5) ? openedDropdownIndexMobile = -1 : openedDropdownIndexMobile = 5  } class="font-bold w-fit my-2 mx-auto h4">
                        Discounts
                    </button>
                    <ul class="font-light h-0"
                    class:h-auto={openedDropdownIndexMobile === 5}
                    class:ml-[100vh]={openedDropdownIndexMobile !== 5} 
                    class:opacity-0={openedDropdownIndexMobile !== 5} 
                    class:show-text-mobile={openedDropdownIndexMobile === 5} 
                    class:hide-text-mobile={openedDropdownIndexMobile !== 5}>
                        <li>
                            <a href="/dashboard/day-discounts" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Day Discounts
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/age-discounts" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Age Discounts
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/discount-schedule" class="w-fit my-2 mx-auto h4" on:click={hideDrawer}>
                                Schedule
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
					<a href="/" class="w-fit my-2 mx-auto h4 font-bold" on:click={hideDrawer}>
						Exit
					</a>
				</li>
                
                
               
                
                
                
                <li>
					<a href="/dashboard/users" class="font-bold w-fit my-2 mx-auto h4" on:click={hideDrawer}>
						Users
					</a>
				</li>
                <li>
					<a href="/dashboard/settings" class="font-bold w-fit my-2 mx-auto h4" on:click={hideDrawer}>
						Settings
					</a>
				</li>
				{#if $user && $user.name}
				<li>
					<a href="/dashboard/profile" class="font-bold w-fit my-2 mx-auto h4" on:click={hideDrawer}>
						<i class="fa-solid fa-user ml-2 mr-3"></i>
						{$user.name.split(' ')[0]}
					</a>
				</li>
				<li class="flex flex-row justify-center">
					<a
					class="btn btn-md variant-ghost-surface my-4 h4"
					on:click={handleLogout}
					rel="noreferrer"
					href="/login"
					><i class="fa-solid fa-arrow-right-from-bracket mx-1"></i>
					Logout
					</a>
				    <button class="my-2">
						<LightSwitch />
					</button>
				</li>
				{/if}
				

				<!-- ... -->
			</ul>
		</nav>

	{/if}
</Drawer>

<!-- App Shell -->

<div class="h-screen animate-show flex flex-col overflow-auto">
    <div class="lg:ml-20 w-full lg:w-[calc(100%-5rem)] flex flex-justify-center flex-col">
        <Toast/>
        <header class:show-navbar={expandedDrawer == false} class:hide-navbar={expandedDrawer == true}>
            <!-- App Bar -->
            <AppBar slotDefault="place-self-center" >
                <svelte:fragment slot="lead">
                    <a href="/dashboard" class="hidden lg:block">
                        <strong class="text-xl uppercase">cinema</strong>
                    </a>
                    <button class=" lg:hidden" on:click={() => {
                        expandedDrawer = true;
                        setTimeout(() => drawerStore.open(layoutDrawerSettings), 400);
                        }}>
                        <i class="fa-solid fa-bars h2 px-2"></i>
                    </button>
                </svelte:fragment>
                
                <!-- Title -->
                <a href="/dashboard" class="text-xl uppercase lg:hidden"><strong >cinema</strong></a>
                
    
                <svelte:fragment slot="trail" >
    
                    {#if $authenticated === false}
                    <a
                        class="btn btn-sm variant-ghost-surface mx-1"
                        href="/login"
                        rel="noreferrer"
                    >
                        Login
                    </a>
                    <a
                        class="btn btn-sm variant-ghost-surface mx-1"
                        href="/register"
                        rel="noreferrer"
                    >
                        Register
                    </a>
                    {:else}
                    
                    {#if $user && $user.name}
                        <a href="/dashboard/profile" class="lg:hidden h3 mx-1">
                            <i class="fa-solid fa-user px-2"></i>
                        </a>
                        <a href="/dashboard/profile" class="hidden lg:block mx-1 ">
                            <i class="fa-solid fa-user ml-2 mr-1"></i>
                            {$user.name.split(' ')[0]}
                        </a>
                    {/if}
                    
                    <a
                        class="btn btn-sm variant-ghost-surface hidden lg:block mx-1"
                        on:click={handleLogout}
                        rel="noreferrer"
                        href="/login"
                    ><i class="fa-solid fa-arrow-right-from-bracket mx-1"></i>
                        Logout
                    </a>
                    {/if}
                    <LightSwitch class="hidden lg:block"/>
                </svelte:fragment>
            </AppBar>
            
        </header>

        <slot/>
    </div>
	
    <aside class="lg:block lg:fixed card  w-20 h-screen ease-linear rounded-none  z-10 hidden hover:show-sidebar hover:w-[14rem]" class:hide-sidebar={!expandedSideBar} on:mouseover={() => expandedSideBar = true} on:mouseleave={() => expandedSideBar = false} on:focus >

        <div class="px-7 pb-10 flex flex-row items-center ">
            <i class="py-5 absolute top-6 fa fa-arrow-right h3 w-20 opacity-0"  class:animate-show={expandedSideBar} class:opacity-1={!expandedSideBar}></i>           
            <i class="py-5 relative top-6 fa fa-bars h3 w-20 opacity-1"  class:animate-hide={!expandedSideBar} class:opacity-0={expandedSideBar}></i>  
            
        </div>

        <a href="/dashboard" class="">
            <div class="px-7  flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                <i class="py-5 fa-solid fa-house h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 "    
                class:opacity-0={!expandedSideBar} 
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}>Dashboard</p>              
            </div>
        </a>

        <div role="tab" tabindex="0" class="relative " on:mouseover={() => openedDropdownIndex = 1} on:mouseleave={() => openedDropdownIndex = -1} on:focus>
            <div class="px-7  flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                <i class="py-5 fa-solid fa-film h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 " 
                class:opacity-0={!expandedSideBar} 
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}
                >Movies</p>              
            </div>
            <div id="dropdownMovies" class="flex flex-col absolute left-[14rem] w-[10rem] top-[0rem] rounded-none card" class:hidden={openedDropdownIndex !== 1}>
                <a href="/dashboard/movies" class="">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Movies</p>              
                    </div>
                </a>
                <a href="/dashboard/movieads">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Movie Ads</p>              
                    </div>
                </a>
            </div>
        </div>
        
        <div role="tab" tabindex="0" class="relative " on:mouseover={() => openedDropdownIndex = 2} on:mouseleave={() => openedDropdownIndex = -1} on:focus>
            <div class="px-7  flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                <i class="py-5 fa-solid fa-location-dot h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 " 
                class:opacity-0={!expandedSideBar} 
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}
                >Locations</p>              
            </div>
            <div id="dropdownLocations" class="flex flex-col absolute left-[14rem] w-[10rem] top-[0rem] rounded-none card" class:hidden={openedDropdownIndex !== 2}>
                <a href="/dashboard/branches">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Theaters</p>              
                    </div>
                </a>
                <a href="/dashboard/rooms">
                    
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Rooms</p>              
                    </div>
                </a>
                <a href="/dashboard/cities">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Cities</p>              
                    </div>
                </a>
            </div>
        </div>
        
        <div role="tab" tabindex="0" class="relative " on:mouseover={() => openedDropdownIndex = 3} on:mouseleave={() => openedDropdownIndex = -1} on:focus>
            <div class="px-7  flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                <i class="py-5 fa-solid fa-calendar h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 " 
                class:opacity-0={!expandedSideBar} 
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}
                >Events</p>              
            </div>
            <div id="dropdownEvents" class="flex flex-col absolute left-[14rem] w-[10rem] top-[0rem] rounded-none card" class:hidden={openedDropdownIndex !== 3}>
                <a href="/dashboard/sessions">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Sessions</p>              
                    </div>
                </a>
                
                <a href="/dashboard/schedule">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Schedule </p>              
                    </div>
                </a>
            </div>
        </div>

        <div role="tab" tabindex="0" class="relative " on:mouseover={() => openedDropdownIndex = 5} on:mouseleave={() => openedDropdownIndex = -1} on:focus>
            <div class="px-7  flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                <i class="py-5 fa-solid fa-tag h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 " 
                class:opacity-0={!expandedSideBar} 
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}
                >Discounts</p>              
            </div>
            <div id="dropdownDiscounts" class="flex flex-col absolute left-[14rem] w-[12rem] top-[0rem] rounded-none card" class:hidden={openedDropdownIndex !== 5}>
                <a href="/dashboard/age-discounts">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Age Discounts</p>              
                    </div>
                </a>
                
                <a href="/dashboard/day-discounts">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Day Discounts</p>              
                    </div>
                </a>
                <a href="/dashboard/discount-schedule">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Schedule</p>              
                    </div>
                </a>
            </div>
        </div>

        <div role="tab" tabindex="0" class="relative " on:mouseover={() => openedDropdownIndex = 4} on:mouseleave={() => openedDropdownIndex = -1} on:focus>
            <div class="px-7  flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                <i class="py-5 fa-solid fa-ticket h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 " 
                class:opacity-0={!expandedSideBar} 
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}
                >Tickets</p>              
            </div>
            <div id="dropdownTickets" class="flex flex-col absolute left-[14rem] w-[10rem] top-[0rem] rounded-none card" class:hidden={openedDropdownIndex !== 4}>
                <a href="/dashboard/tickets">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Tickets</p>              
                    </div>
                </a>
                
                <a href="/dashboard/ticket-types">
                    <div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface">
                        <p class="font-bold h5 m-5"        
                        class:opacity-0={!expandedSideBar} 
                        class:show-text={expandedSideBar} 
                        class:hide-text={!expandedSideBar}>Types </p>              
                    </div>
                </a>
            </div>
        </div>
        
        
        
        <a href="/dashboard/users">
            <div class="px-6  flex flex-row items-center  hover:variant-soft-surface">
                <i class="py-5 fa-solid fa-users h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 " 
                class:opacity-0={!expandedSideBar} 
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}>Users</p>              
            </div>
        </a>
        <a href="/">
            <div class="px-6  flex flex-row items-center  hover:variant-soft-surface">
                <i class="py-5 fa fa-door-open h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 " 
                class:opacity-0={!expandedSideBar} 
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}>Exit</p>              
            </div>
        </a>
        <a href="/dashboard/settings" class="fixed bottom-6">
            <div class="px-6 flex flex-row items-center bg-gradient-to-br transition-all-500 delay-200"
            class:variant-gradient-tertiary-primary={isSelected('settings')}
            class:hover:variant-soft-surface={!isSelected('settings')}
            class:w-[5rem]={!expandedSideBar} 
            class:w-[14rem]={expandedSideBar}>
                <i class="py-5 fa-solid fa-gear h3 w-20 "></i>
                <p class="font-bold h5 fixed left-20 " 
                class:opacity-0={!expandedSideBar}
                
                class:show-text={expandedSideBar} 
                class:hide-text={!expandedSideBar}>Settings</p>              
            </div>
        </a>
    </aside>
   
	<!-- Page Route Content -->
	
	
</div>
