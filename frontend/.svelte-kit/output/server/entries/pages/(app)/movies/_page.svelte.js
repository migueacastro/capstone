import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, a as each, e as escape, d as add_attribute } from "../../../../chunks/ssr.js";
import { s as selectedCityStorage, m as movieStorage } from "../../../../chunks/cinema.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredMovies;
  let $selectedCityStorage, $$unsubscribe_selectedCityStorage;
  let $movieStorage, $$unsubscribe_movieStorage;
  $$unsubscribe_selectedCityStorage = subscribe(selectedCityStorage, (value) => $selectedCityStorage = value);
  $$unsubscribe_movieStorage = subscribe(movieStorage, (value) => $movieStorage = value);
  filteredMovies = $movieStorage.filter((movie) => {
    if ($selectedCityStorage && $selectedCityStorage.on_screen_movies) {
      return $selectedCityStorage.on_screen_movies.includes(movie.id) && movie.coming_soon == false;
    }
    return true;
  });
  $$unsubscribe_selectedCityStorage();
  $$unsubscribe_movieStorage();
  return `<div class="container h-full mx-auto flex justify-start items-center flex-col"> <div class="px-4 mx-4 w-full my-4"><a href="/" class="w-fit text-start mx-1 anchor no-underline" data-svelte-h="svelte-bsvd9l"><p class="h3"><i class="fa-solid fa-arrow-left mx-2 "></i> Home</p></a> <h2 class="h1 lg:h2 text-center mb-10" data-svelte-h="svelte-5mmmtk">On Theaters</h2> <div class="grid lg:gap-4 items-center ">  ${$movieStorage.length != 0 ? `<div class="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-10 lg:gap-20 pb-2 overflow-x-auto mx-auto">${each(filteredMovies, (movie) => {
    return `<a href="${"/movies/" + escape(movie.id, true)}" class="shrink-0 w-full sm:w-96 snap-start w1"><img class="rounded-container-token hover:brightness-125 h-[22rem] w-[16rem] lg:w-[18rem] lg:h-[24rem] object-cover mx-auto mb-6"${add_attribute("src", movie.image, 0)}${add_attribute("alt", movie.name, 0)}${add_attribute("title", movie.name, 0)} loading="lazy"> <p class="h3 text-center my-1">${escape(movie.name)}</p> </a>`;
  })}</div>` : `<p data-svelte-h="svelte-bnl6du">No movies found.</p>`} </div></div></div>`;
});
export {
  Page as default
};
