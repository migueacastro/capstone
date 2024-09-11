import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, d as add_attribute, a as each, e as escape } from "../../../chunks/ssr.js";
import { m as movieStorage, s as selectedCityStorage, a as movieAdStorage } from "../../../chunks/cinema.js";
import "swiper";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredMovies;
  let filteredMovieAds;
  let comingSoonMovies;
  let $movieStorage, $$unsubscribe_movieStorage;
  let $selectedCityStorage, $$unsubscribe_selectedCityStorage;
  let $movieAdStorage, $$unsubscribe_movieAdStorage;
  $$unsubscribe_movieStorage = subscribe(movieStorage, (value) => $movieStorage = value);
  $$unsubscribe_selectedCityStorage = subscribe(selectedCityStorage, (value) => $selectedCityStorage = value);
  $$unsubscribe_movieAdStorage = subscribe(movieAdStorage, (value) => $movieAdStorage = value);
  let elemMovies;
  let elemMoviesComingSoon;
  let elemCarousel;
  filteredMovies = $movieStorage.filter((movie) => {
    if ($selectedCityStorage && $selectedCityStorage.on_screen_movies) {
      return $selectedCityStorage.on_screen_movies.includes(movie.id) && movie.coming_soon == false;
    }
    return true;
  });
  filteredMovieAds = $movieAdStorage.filter((movieAd) => {
    if ($selectedCityStorage && $selectedCityStorage.on_screen_movies) {
      return $selectedCityStorage.on_screen_movies.includes(movieAd.movie);
    }
    return true;
  });
  comingSoonMovies = $movieStorage.filter((movie) => {
    if (movie.coming_soon == true) {
      return true;
    }
  });
  $$unsubscribe_movieStorage();
  $$unsubscribe_selectedCityStorage();
  $$unsubscribe_movieAdStorage();
  return `<div class="container mx-auto flex justify-center items-center flex-col"> <div class="flex items-center mt-5 lg:mt-10 w-[93%] lg:w-full mx-auto justify-center"> <div class="snap-center snap-mandatory scroll-smooth flex overflow-x-hidden"${add_attribute("this", elemCarousel, 0)}>${each(filteredMovieAds, (ad) => {
    return `<a href="${"/movies/" + escape(ad.movie, true)}" class="shrink-0 w-full"><img class="mx-auto snap-center lg:h-[60vh] object-cover object-center rounded-container-token"${add_attribute("src", ad.image, 0)}${add_attribute("alt", ad.name, 0)} loading="lazy"> </a>`;
  })}</div></div> <div class="grid grid-cols-2 gap-5 lg:gap-10 my-5 mb-3 10 items-center lg:w-full h-35 w-[93%]" data-svelte-h="svelte-5n1hdg"><a class="btn px-10 py-5 text-center variant-soft" href="/movies"><p class="h2 font-bold">On Theatres</p></a> <a class="btn bt px-10 py-5 text-center variant-soft" href="/branches"><p class="h2 font-bold">Branches</p></a></div> <div class="p-4 pt-1 mx-4 lg:w-full"><div class="flex flex-row lg:justify-center items-center my-10" data-svelte-h="svelte-oy7if5"><h2 class="h1 lg:h2 text-center ">On Theatres</h2> <a href="/movies" class="w-fit text-center mx-1 anchor no-underline"><p class="h3"><i class="fa-solid fa-plus mx-2 "></i> See All</p></a></div> <div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center "> <button type="button" class="btn-icon variant-filled" data-svelte-h="svelte-2vgqyp"><i class="fa-solid fa-arrow-left"></i></button>  ${$movieStorage.length != 0 ? `<div class="snap-x snap-mandatory scroll-smooth flex gap-20 pb-2 overflow-x-auto "${add_attribute("this", elemMovies, 0)}>${each(filteredMovies, (movie) => {
    return `<a href="${"/movies/" + escape(movie.id, true)}" class="shrink-0 w-full sm:w-96 snap-start w1"><img class="rounded-container-token hover:brightness-125 h-[22rem] w-[16rem] lg:w-[18rem] lg:h-[24rem] object-cover mx-auto mb-6"${add_attribute("src", movie.image, 0)}${add_attribute("alt", movie.name, 0)}${add_attribute("title", movie.name, 0)} loading="lazy"> <p class="h3 text-center my-1">${escape(movie.name)}</p> </a>`;
  })}</div>` : `<p data-svelte-h="svelte-bnl6du">No movies found.</p>`}  <button type="button" class="btn-icon variant-filled" data-svelte-h="svelte-14637lh"><i class="fa-solid fa-arrow-right"></i></button></div></div> <div class="p-4 pt-1 mx-4 lg:w-full"><div class="flex flex-row lg:justify-center items-center my-10" data-svelte-h="svelte-tijdi4"><h2 class="h1 lg:h2 text-center ">Coming Soon</h2> <a href="/movies/coming-soon" class="w-fit text-center mx-1 anchor no-underline"><p class="h3"><i class="fa-solid fa-plus mx-2 "></i> See All</p></a></div> <div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center "> <button type="button" class="btn-icon variant-filled" data-svelte-h="svelte-1tdmn6x"><i class="fa-solid fa-arrow-left"></i></button>  ${$movieStorage.length != 0 ? `<div class="snap-x snap-mandatory scroll-smooth flex gap-20 pb-2 overflow-x-auto "${add_attribute("this", elemMoviesComingSoon, 0)}>${each(comingSoonMovies, (movie) => {
    return `<a href="${"/movies/" + escape(movie.id, true)}" class="shrink-0 w-full sm:w-96 snap-start w1"><img class="rounded-container-token hover:brightness-125 h-[22rem] w-[16rem] lg:w-[18rem] lg:h-[24rem] object-cover mx-auto mb-6"${add_attribute("src", movie.image, 0)}${add_attribute("alt", movie.name, 0)}${add_attribute("title", movie.name, 0)} loading="lazy"> <p class="h3 text-center my-1">${escape(movie.name)}</p> </a>`;
  })}</div>` : `<p data-svelte-h="svelte-bnl6du">No movies found.</p>`}  <button type="button" class="btn-icon variant-filled" data-svelte-h="svelte-xc4vo5"><i class="fa-solid fa-arrow-right"></i></button></div></div></div>`;
});
export {
  Page as default
};
