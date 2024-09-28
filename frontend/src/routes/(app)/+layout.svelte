<script>

	import '@fortawesome/fontawesome-free/css/all.min.css'
	import { env } from "$env/dynamic/public";
	import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import { authenticated, user, unauthenticateUser } from '../../stores/auth';
	import { cityStorage, getCities, selectedCityStorage, getMovies, getBranches } from '../../stores/cinema';
	import { goto } from '$app/navigation';
	import { Toast, Drawer } from '@skeletonlabs/skeleton';

  	import { onMount } from 'svelte';
	import { page } from "$app/stores";
  	
	
	$:expandedDrawer = false;
	let selectedCityId;

	
	const drawerStore = getDrawerStore();
	const layoutDrawerSettings = {'id': 'layoutDrawer'}

	const checkMovieAvailability = async () => {
		// Check if the movie is available in the selected city screen
		// Very important to avoid selecting a movie from an incorrect city
        if ($page?.data  && $page?.data?.type == 'movies') {
            await getMovies();
			// Check if the movie is available in the selected city screen
            if ($selectedCityStorage && $selectedCityStorage.on_screen_movies &&
				!$selectedCityStorage.on_screen_movies.includes($page.data?.id)
			) {
				goto('/branches');
			}
        } else if ($page?.data  && $page?.data?.type == 'branches') {
            await getBranches();
			// Check if the movie is available in the selected city screen
            if ($selectedCityStorage && $selectedCityStorage.on_screen_movies &&
				!$selectedCityStorage.on_screen_movies.includes($page.data?.id)
			) {
				goto('/branches');
			}
        }
    };
	
	const handleSelectCity = async () => {
		await getCities();
		// onchange and value binding go at the same time so they have to be in two different variables
		$selectedCityStorage = $cityStorage.find(city => city.id === selectedCityId);
		checkMovieAvailability();
	};

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
				goto('/login');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	}

	const hideDrawer = () =>{
		expandedDrawer = false;
		setTimeout(drawerStore.close, 400);}

	onMount(async () => {
  		await getCities();

		await setTimeout(2000);
		
		if (!$cityStorage.length) {
            const endpoint = `${env.PUBLIC_BACKEND_URL}/api/cities/`;
            const response = await fetch(endpoint);
            const data = await response.json();
            cityStorage.set(data);
        }
		if (!$selectedCityStorage.id || !selectedCityId) {
			if ($cityStorage[0]) {
				selectedCityId = $cityStorage[0].id;
				selectedCityStorage.set($cityStorage[0]);
			}
		}
		await checkMovieAvailability();
	});



</script>


<!-- Drawer -->
<Drawer position='top' height='h-[95%]' class="lg:hidden">
	{#if $drawerStore.id === 'layoutDrawer'}

		<nav class="list-nav m-2 text-center" >
			<button on:click={hideDrawer}>
			<i class="fa-solid fa-arrow-up h2"></i></button>
			<!-- (optionally you can provide a label here) -->
			<ul class="my-2 mx-auto">
				<li>
					<select class="select w-52 lg:hidden" bind:value={selectedCityId} 
						on:change={handleSelectCity}>
							{#each $cityStorage as city}
								<option value={city.id}>{city.name}</option>
							{/each}
					</select>
				</li>
				<li>
					<a href="/branches" class="w-fit my-2 mx-auto h2" on:click={hideDrawer}>
						Theatres
					</a>
				</li>
				<li>
					<a href="/movies" class="w-fit my-2 mx-auto h2" on:click={hideDrawer}>
						Movies
					</a>
				</li>
				{#if $user && $user.name}
					{#if $user.is_staff || $user.is_superuser} 
						<li>
							<a href="/dashboard" class="w-fit my-2 mx-auto h2" on:click={hideDrawer}>
								Dashboard
							</a>
						</li>
					{/if}
				<li>
					<a href="/dashboard/profile" class="w-fit my-2 mx-auto h2" on:click={hideDrawer}>
						<i class="fa-solid fa-user ml-2 mr-3"></i>
						{$user.name.split(' ')[0]}
					</a>
				</li>
				<li>
					<a
					class="btn btn-md variant-ghost-surface w-fit my-4 mx-auto h2"
					on:click={handleLogout}
					rel="noreferrer"
					href="/login"
					><i class="fa-solid fa-arrow-right-from-bracket mx-1"></i>
					Logout
					</a>
					
				</li>
				{:else}
				<li>
					<a
					class="w-fit my-4 mx-auto h2"
					href="/login"
					rel="noreferrer"
					on:click={hideDrawer}
					>
					Login
					</a>
				</li>

				<li>
					<a
					class="w-fit my-4 mx-auto h2"
					href="/register"
					rel="noreferrer"
					on:click={hideDrawer}
					>
					Register
					</a>
				</li>
				{/if}
				<li >
					<button class="mx-auto my-10">
						<LightSwitch />
					</button>
				</li>

				<!-- ... -->
			</ul>
		</nav>

	{/if}
</Drawer>

<!-- App Shell -->

<div class="animate-show h-full overflow-auto">
	<Toast/>
	<header class:show-navbar={expandedDrawer == false} class:hide-navbar={expandedDrawer == true}>
		<!-- App Bar -->
		<AppBar slotDefault="place-self-center" >
			<svelte:fragment slot="lead">
				<a href="/" class="hidden lg:block">
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
			<a href="/" class="text-xl uppercase lg:hidden"><strong >cinema</strong></a>
			

			<svelte:fragment slot="trail" >
				{#if $user && $user.is_staff}

					<a href="/dashboard" class="hidden lg:block mx-1">
						Dashboard
					</a>
				{/if}

				<a href="/branches" class="mx-2 hidden lg:block">
					Theatres
				</a>

				<a href="/movies" class="mx-2 hidden lg:block">
					Movies
				</a>
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
					<a href="/profile" class="lg:hidden h3  mx-1">
						<i class="fa-solid fa-user px-2"></i>
					</a>
					<a href="/profile" class="hidden lg:block mx-1">
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
				{#if $cityStorage.length > 1 && $selectedCityStorage}
				<select class="select w-52 hidden lg:block" bind:value={selectedCityId} 
				on:change={handleSelectCity}>
					{#each $cityStorage as city}
						<option value={city.id}>{city.name}</option>
					{/each}
				</select>
				{/if}
				<LightSwitch class="hidden lg:block"/>
			</svelte:fragment>
		</AppBar>
	</header>



	<!-- Page Route Content -->
	<slot />
	
	<footer class="z-20">
		<AppBar slotDefault="place-self-center" >
			<svelte:fragment slot="lead">
				<div></div>
			</svelte:fragment>
			<a href="/" class="hidden lg:block">
				<strong class="text-xl uppercase text-center">cinema</strong>
			</a>
			<svelte:fragment slot="trail">
				<div></div>
			</svelte:fragment>
		</AppBar>
	</footer>
</div>

