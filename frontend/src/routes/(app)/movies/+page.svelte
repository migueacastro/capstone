<script lang="ts">
	import { onMount } from "svelte";
	import { getMovies, movieStorage } from "../../../stores/cinema";
	import { selectedCityStorage, cityStorage } from "../../../stores/cinema";
  	import { fade } from "svelte/transition";

	let elemMovies: HTMLDivElement ;
	
	$: filteredMovies = $movieStorage.filter(movie => {
	  if ($selectedCityStorage && $selectedCityStorage.on_screen_movies) {
		return $selectedCityStorage.on_screen_movies.includes(movie.id) && movie.coming_soon == false;
	  }
	  return true;
	});
	
    onMount(async () => {
		await getMovies();
	});
</script>
<div class="container h-full mx-auto flex justify-start items-center flex-col" in:fade>
	<!-- <div class="space-y-10 text-center flex flex-col items-center my-6">

		
	</div>-->
	<div class="px-4  mx-4 w-full my-4">
        <a href="/" class="w-fit text-start mx-1 anchor no-underline"><p class="h3"><i class="fa-solid fa-arrow-left mx-2 "></i> Home</p></a>
		<h2 class="h1 lg:h2 text-center mb-10">On Theaters</h2>
		
		<div class="grid  lg:gap-4  items-center ">
			<!-- Button: Left -->

			<!-- Carousel -->
			{#if $movieStorage.length != 0}
			<div class="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-10 lg:gap-20 pb-2 overflow-x-auto mx-auto">
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
			
		</div>
	</div>
	

</div>

