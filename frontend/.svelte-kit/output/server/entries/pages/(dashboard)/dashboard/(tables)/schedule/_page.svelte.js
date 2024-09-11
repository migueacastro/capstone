import { s as subscribe } from "../../../../../../chunks/utils.js";
import { c as create_ssr_component, a as each, d as add_attribute, e as escape } from "../../../../../../chunks/ssr.js";
import { s as storePopup } from "../../../../../../chunks/popup.js";
import { g as getModalStore } from "../../../../../../chunks/stores2.js";
import { g as getToastStore } from "../../../../../../chunks/stores3.js";
import "../../../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { r as roomStorage, h as shiftStorage, m as movieStorage, w as weekdayStorage, c as cityStorage, b as branchStorage } from "../../../../../../chunks/cinema.js";
import "../../../../../../chunks/client.js";
import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
import moment from "moment";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredBranches;
  let filteredRooms;
  let filteredMovies;
  let $roomStorage, $$unsubscribe_roomStorage;
  let $shiftStorage, $$unsubscribe_shiftStorage;
  let $movieStorage, $$unsubscribe_movieStorage;
  let $weekdayStorage, $$unsubscribe_weekdayStorage;
  let $cityStorage, $$unsubscribe_cityStorage;
  let $branchStorage, $$unsubscribe_branchStorage;
  $$unsubscribe_roomStorage = subscribe(roomStorage, (value) => $roomStorage = value);
  $$unsubscribe_shiftStorage = subscribe(shiftStorage, (value) => $shiftStorage = value);
  $$unsubscribe_movieStorage = subscribe(movieStorage, (value) => $movieStorage = value);
  $$unsubscribe_weekdayStorage = subscribe(weekdayStorage, (value) => $weekdayStorage = value);
  $$unsubscribe_cityStorage = subscribe(cityStorage, (value) => $cityStorage = value);
  $$unsubscribe_branchStorage = subscribe(branchStorage, (value) => $branchStorage = value);
  storePopup.set({
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow
  });
  getModalStore();
  getToastStore();
  let city;
  let branch;
  let room;
  let weekday;
  {
    if (!city && $cityStorage.length > 0) {
      city = $cityStorage[0].id;
    }
  }
  filteredBranches = $branchStorage.filter((branch2) => {
    if (city && branch2.city == city) {
      return true;
    }
  });
  {
    if (!branch && filteredBranches.length > 0) {
      branch = filteredBranches[0].id;
    }
  }
  {
    if (!weekday && $weekdayStorage.length > 0) {
      weekday = $weekdayStorage[0].id;
    }
  }
  filteredRooms = $roomStorage.filter((room2) => {
    if (branch && branch !== {} && room2.branch == branch && weekday !== {}) {
      return true;
    }
  });
  $shiftStorage.filter((shift2) => {
    if (branch && shift2.branch == branch.id && city && branch.city == city.id && weekday && shift2.weekday == weekday.id) {
      return true;
    }
  });
  filteredMovies = $movieStorage.filter((movie) => {
    let selectedCityId = city;
    let selectedCity = $cityStorage.find((city2) => city2.id == selectedCityId);
    if (selectedCity && selectedCity.on_screen_movies) {
      return selectedCity.on_screen_movies.includes(movie.id) && movie.coming_soon == false && weekday !== {};
    }
  });
  {
    if (!room && filteredRooms.length > 0) {
      room = filteredRooms[0].id;
    }
  }
  $$unsubscribe_roomStorage();
  $$unsubscribe_shiftStorage();
  $$unsubscribe_movieStorage();
  $$unsubscribe_weekdayStorage();
  $$unsubscribe_cityStorage();
  $$unsubscribe_branchStorage();
  return `<div class="flex flex-row items-center gap-4" data-svelte-h="svelte-1hf1e66"><h2 class="h1 text-start mb-4 w-full">Schedule</h2></div> <div class="flex flex-row space-x-14"><div class="flex flex-col lg:w-[75%] w-full space-y-14 "> <div class="card flex flex-col items-start p-6 space-y-4 shadow-lg"><div class="flex flex-col lg:flex-row lg:space-x-10 w-full"><label class="label text-start lg:indent-2 "><p data-svelte-h="svelte-61eib5">City</p> <select class="select lg:w-40" name="" id="">${each($cityStorage, (city2, i) => {
    return `<option${add_attribute("value", city2.id, 0)}>${escape(city2.name)}</option>`;
  })}</select></label> <label class="label text-start lg:indent-2"><p data-svelte-h="svelte-1pptkos">Branch</p> <select class="select lg:w-40 " name="" id="">${each(filteredBranches, (branch2) => {
    return `<option${add_attribute("value", branch2.id, 0)}>${escape(branch2.name)}</option>`;
  })}</select></label> <label class="label text-start lg:indent-2"><p data-svelte-h="svelte-4g15e6">Day</p> <select class="select lg:w-40" name="" id="">${each($weekdayStorage, (weekday2) => {
    return `<option${add_attribute("value", weekday2.id, 0)}>${escape(weekday2.name)}</option>`;
  })}</select></label></div> <div class="flex flex-row space-x-3 mx-auto lg:ml-0">${``}</div></div>   ${filteredRooms.length > 0 ? `<div class="card flex flex-col h-[80%] p-4 shadow-lg animate-show"><h2 class="h2 mb-3" data-svelte-h="svelte-1wx94ud">Shifts</h2> <div class="flex flex-col items-center space-y-4">${each(filteredRooms, (room2) => {
    return `<div class="card shadow-lg w-full p-5"><div class="flex flex-row items-center space-x-4 p-4"><p class="h3 font-bold capitalize">${escape(room2.name)}</p> <p class="no-underline anchor">Opens at ${escape(room2.opens_at)}</p>  <div class="card p-4 shadow-md" data-popup="${"popupClick-room-" + escape(room2.id, true)}"><p data-svelte-h="svelte-7qkeux">Select an hour</p> <input type="time" class="input"${add_attribute("value", room2.opens_at, 0)}> <div class="arrow variant-filled-primary"></div></div> </div> <div class="grid grid-cols-1 lg:grid-cols-3">${each($shiftStorage, (shift2) => {
      return `${shift2.room == room2.id && shift2.weekday == weekday ? `<div class="flex flex-row lg:w-[30vh] pointer-events-none m-3"><div class="card variant-filled-primary w-[7vh] rounded-r-none shadow-md"></div> <div class="card flex flex-col p-3 rounded-l-none w-full shadow-md"><p class="h3 font-bold">${escape(shift2.movie_name)}</p> <p>${escape(moment(shift2.start_time, "HH:mm").format("HH:mm"))} - ${escape(moment(shift2.end_time, "HH:mm").format("HH:mm"))}</p> <div class="flex flex-row justify-end"><button class="pointer-events-auto" data-svelte-h="svelte-c4elck"><i class="fa-solid fa-xmark"></i></button> </div></div> </div>` : ``}`;
    })} <button class="m-4" data-svelte-h="svelte-1v7zzd6"><i class="fa-solid fa-plus"></i></button> <div data-popup="${"popupAddShiftClick-room-" + escape(room2.id, true)}" class="card p-4 lg:w-[45vh] shadow-md w-[70%] mx-auto h-[40%] overflow-auto space-y-5">${each(filteredMovies, (movie) => {
      return `<button class="closeOnClick flex flex-col h-40 w-full shadow-lg"><div class="w-full h-[75%] rounded-b-none rounded-t-lg relative flex"><p class="h4 font-bold absolute top-[35%] left-3 z-10 text-white">${escape(movie.name)}</p> <img${add_attribute("src", movie.image, 0)} class="h-full object-cover w-full rounded-t-lg brightness-50 blur-sm" alt=""></div> <div class="card variant-filled-primary rounded-t-none w-full h-[25%] flex-row flex space-x-[75%] px-4 py-1"><p class="text-nowrap text-center">${escape(movie.duration)} Min</p></div> </button>`;
    })} </div></div> </div>`;
  })}</div></div>` : ``} </div>  <div class="hidden lg:flex card w-[25%] flex-col h-[100vh] p-4"><h2 class="h2 mb-2" data-svelte-h="svelte-178nfwv">Available Movies</h2> <p class="font-light mb-3" data-svelte-h="svelte-1mpp1m8">Drag and drop to add to shifts</p> <hr class="mb-5"> <div class="flex flex-col space-y-6 items-center">${filteredMovies.length > 0 ? `${each(filteredMovies, (movie) => {
    return `<div class="flex flex-col h-32 w-full shadow-lg" draggable="true"><div class="w-[full] h-[75%] rounded-b-none rounded-t-lg relative flex"><p class="h4 font-bold absolute top-[35%] left-3 z-10 text-white">${escape(movie.name)}</p> <img${add_attribute("src", movie.image, 0)} class="h-full object-cover w-full rounded-t-lg brightness-50 blur-sm" alt=""></div> <div class="card variant-filled-primary rounded-t-none w-full h-[25%] flex-row flex space-x-[75%] px-4 py-1"><p class="text-nowrap text-center">${escape(movie.duration)} Min</p></div> </div>`;
  })}` : `<p class="text-center" data-svelte-h="svelte-1p04ipb">No movies available</p>`}</div></div> </div>`;
});
export {
  Page as default
};
