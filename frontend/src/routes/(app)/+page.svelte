<script lang="ts">
	import { onMount } from "svelte";
	import { getMovieAds, getMovies, movieStorage, movieAdStorage } from "../../stores/cinema";
	import { selectedCityStorage, cityStorage } from "../../stores/cinema";
	import { Swiper } from "swiper";
	import { fade, fly } from 'svelte/transition';
	
	import 'swiper/css';


	let elemMovies: HTMLDivElement ;
	let elemMoviesComingSoon: HTMLDivElement ;
	let elemCarousel: HTMLDivElement;
	
	$: filteredMovies = $movieStorage.filter(movie => {
	  if ($selectedCityStorage && $selectedCityStorage.on_screen_movies) {
		return $selectedCityStorage.on_screen_movies.includes(movie.id) && movie.coming_soon == false;
	  }
	  return true;
	});

	$: filteredMovieAds = $movieAdStorage.filter(movieAd => {
	  if ($selectedCityStorage && $selectedCityStorage.on_screen_movies) {
		return $selectedCityStorage.on_screen_movies.includes(movieAd.movie);
	  }
	  return true;
	});

	$: comingSoonMovies = $movieStorage.filter(movie => {
	  if (movie.coming_soon == true) {
		  return true;
	  }
	})
	

	// Functions from Skeleton Documentation https://www.skeleton.dev/elements/scroll-containers

	// Ad Carousel
	function carouselRight(): void {
		try {
			let x = 0;
			if (elemCarousel.scrollLeft < elemCarousel.scrollWidth - elemCarousel.clientWidth - 1) x = elemCarousel.scrollLeft + elemCarousel.clientWidth;
			elemCarousel.scroll(x, 0);
		} catch (error) {
			return; // These errors have to do with page re-rendering with Dev-Tools, though it is not affecting the functionality
		}
		
	}

	// Movie Carousel Left Slide 
	function multiColumnLeft(element): void {
		if (!element) return;
		let x = element.scrollWidth;
		if (element.scrollLeft !== 0) x = element.scrollLeft - element.clientWidth;
		element.scroll(x, 0);
	}

	// Movie Carousel Right Slide
	function multiColumnRight(element): void {
		if (!element) return;
		let x = 0;
		// -1 is used because different browsers use different methods to round scrollWidth pixels.
		if (element.scrollLeft < element.scrollWidth - element.clientWidth - 1) x = element.scrollLeft + element.clientWidth;
		element.scroll(x, 0);
	}
	
	// AutoPlay for the carousel
	const startAutoPlay = () => {
		setInterval(carouselRight, 5000);
	}

	onMount(async () => {
		getMovies();
		getMovieAds();
		startAutoPlay();
	});
</script>
<div class="container mx-auto flex justify-center items-center flex-col" in:fade>
	<!-- <div class="space-y-10 text-center flex flex-col items-center my-6">

	
	</div>-->

	<div class="flex items-center mt-5 lg:mt-10 w-[93%] lg:w-full mx-auto justify-center">
	<!-- Full Images -->
	
		<div bind:this={elemCarousel} class="snap-center snap-mandatory scroll-smooth flex overflow-x-hidden">
			{#each filteredMovieAds as ad}
				<a href="/movies/{ad.movie}" class="shrink-0 w-full">
					<img
						class="  mx-auto  snap-center lg:h-[60vh] object-cover object-center rounded-container-token"
						src={ad.image}
						alt={ad.name}
						loading="lazy"
					/>
				</a>
			{/each}
		</div>
	</div>


	<div class="grid grid-cols-2 gap-5 lg:gap-10 my-5 mb-3 10 items-center lg:w-full h-35  w-[93%]">
		<a class="btn px-10 py-5 text-center variant-soft" href="/movies"><p class="h2 font-bold">On Theatres</p></a>
		<a class="btn bt px-10 py-5 text-center variant-soft" href="/branches"><p class="h2 font-bold">Branches</p></a>
	</div>
	<div class="p-4 pt-1 mx-4 lg:w-full">
		<div class="flex flex-row lg:justify-center items-center my-10">
			<h2 class="h1 lg:h2 text-center ">On Theatres</h2>
			<a href="/movies" class="w-fit text-center mx-1 anchor no-underline"><p class="h3"><i class="fa-solid fa-plus mx-2 "></i> See All</p></a>
		</div>
		
		<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center ">
			<!-- Button: Left -->

			<button type="button" class="btn-icon variant-filled" on:click={() => multiColumnLeft(elemMovies)}>
				<i class="fa-solid fa-arrow-left" />
			</button>

			<!-- Carousel -->
			{#if $movieStorage.length != 0}
			<div bind:this={elemMovies} class="snap-x snap-mandatory scroll-smooth flex gap-20 pb-2 overflow-x-auto ">
				{#each filteredMovies as movie}
					<a href="/movies/{movie.id}" class="shrink-0 w-full sm:w-96 snap-start w1">
						<img
							class="rounded-container-token hover:brightness-125 h-[22rem]  w-[16rem] lg:w-[18rem] lg:h-[24rem] object-cover mx-auto mb-6"
							src={movie.image}
							alt={movie.name}
							title={movie.name}
							loading="lazy"
							
						/>
						<p class="h3 text-center my-1">{movie.name}</p>
					</a>
				{/each}
			</div>
			{:else}
				<p>No movies found.</p>
			{/if}
			<!-- Button-Right -->
		
			<button type="button" class="btn-icon variant-filled" on:click={() => multiColumnRight(elemMovies)}>
				<i class="fa-solid fa-arrow-right" />
			</button>
			
		</div>
		
	</div>
	<div class="p-4 pt-1 mx-4 lg:w-full">
		<div class="flex flex-row lg:justify-center items-center my-10">
			<h2 class="h1 lg:h2 text-center ">Coming Soon</h2>
			<a href="/movies/coming-soon" class="w-fit text-center mx-1 anchor no-underline"><p class="h3"><i class="fa-solid fa-plus mx-2 "></i> See All</p></a>
		</div>
		<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center ">
			<!-- Button: Left -->

			<button type="button" class="btn-icon variant-filled" on:click={() => multiColumnLeft(elemMoviesComingSoon)}>
				<i class="fa-solid fa-arrow-left" />
			</button>

			<!-- Carousel -->
			{#if $movieStorage.length != 0}
			<div bind:this={elemMoviesComingSoon} class="snap-x snap-mandatory scroll-smooth flex gap-20 pb-2 overflow-x-auto ">
				{#each comingSoonMovies as movie}
					<a href="/movies/{movie.id}" class="shrink-0 w-full sm:w-96 snap-start w1">
						<img
							class="rounded-container-token hover:brightness-125 h-[22rem]  w-[16rem] lg:w-[18rem] lg:h-[24rem] object-cover mx-auto mb-6"
							src={movie.image}
							alt={movie.name}
							title={movie.name}
							loading="lazy"
							
						/>
						<p class="h3 text-center my-1">{movie.name}</p>
					</a>
				{/each}
			</div>
			{:else}
				<p>No movies found.</p>
			{/if}
			<!-- Button-Right -->
		
			<button type="button" class="btn-icon variant-filled" on:click={() => multiColumnRight(elemMoviesComingSoon)}>
				<i class="fa-solid fa-arrow-right" />
			</button>
			
		</div>
	</div>

</div>

