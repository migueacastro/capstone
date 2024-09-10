<script lang="ts">
	import { onMount } from "svelte";
	import { getBranches, branchStorage } from "../../../stores/cinema";
	import { selectedCityStorage, cityStorage } from "../../../stores/cinema";
  	import { fade } from "svelte/transition";

	let elemMovies: HTMLDivElement ;
	
	$: filteredBranches = $branchStorage.filter(branch => {
	  if ($selectedCityStorage && $selectedCityStorage.branches) {
		return $selectedCityStorage.branches.includes(branch.id);
	  }
	  return true;
	});
	
    onMount(async () => {
		await getBranches();
	});
</script>
<div class="container h-full mx-auto flex justify-start items-center flex-col" in:fade>
	<!-- <div class="space-y-10 text-center flex flex-col items-center my-6">

		
	</div>-->
	<div class="px-4  mx-4 w-full my-4">
        <a href="/" class="w-fit text-start mx-1 anchor no-underline h-fit"><p class="h3"><i class="fa-solid fa-arrow-left mx-2 "></i> Home</p></a>
		<h2 class="h1 lg:h2 text-center mb-10">Theatres</h2>
		
		<div class="grid  lg:gap-4  items-center ">
			<!-- Button: Left -->

			<!-- Carousel -->
			{#if $branchStorage.length != 0}
			<div class="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-10 lg:gap-20 pb-2 overflow-x-auto mx-auto">
				{#each filteredBranches as branch}
					<a href="/branches/{branch.id}" class="shrink-0 w-full sm:w-96 snap-start w1">
                        
                        <img
							class="rounded-container-token hover:brightness-125 h-[22rem]  w-[16rem] lg:w-[18rem] lg:h-[24rem] object-cover mx-auto mb-6"
							src={branch.image}
							alt={branch.name}
							title={branch.name}
							loading="lazy"
							
						/>
						
						<p class="h3 text-center my-1">{branch.name}</p>
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

