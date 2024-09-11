import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, e as escape, a as each, d as add_attribute } from "../../../../../chunks/ssr.js";
import { w as weekdayStorage, m as movieStorage, d as sessionStorage, r as roomStorage } from "../../../../../chunks/cinema.js";
import "../../../../../chunks/client.js";
import moment from "moment";
import "../../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredRooms;
  let filteredSessions;
  let filteredMovies;
  let filteredWeekdays;
  let $$unsubscribe_weekdayStorage;
  let $$unsubscribe_movieStorage;
  let $$unsubscribe_sessionStorage;
  let $$unsubscribe_roomStorage;
  $$unsubscribe_weekdayStorage = subscribe(weekdayStorage, (value) => value);
  $$unsubscribe_movieStorage = subscribe(movieStorage, (value) => value);
  $$unsubscribe_sessionStorage = subscribe(sessionStorage, (value) => value);
  $$unsubscribe_roomStorage = subscribe(roomStorage, (value) => value);
  let { data } = $$props;
  let branch;
  let selectedWeekday = moment().weekday();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  filteredRooms = [];
  filteredSessions = [];
  filteredMovies = [];
  filteredWeekdays = [];
  $$unsubscribe_weekdayStorage();
  $$unsubscribe_movieStorage();
  $$unsubscribe_sessionStorage();
  $$unsubscribe_roomStorage();
  return `<div class="container mx-auto flex justify-start items-start align-top flex-col"> <div class="card p-4 h-full pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16 lg:p-10 flex flex-col lg:flex-row"><div class="flex flex-col h-fit"><h2 class="h2 text-center lg:text-start mb-10">${escape(branch?.name)}</h2> <p class="lg:h3 h4 indent-2 my-2 h-fit">${escape(branch?.address)}</p> <div class="flex flex-row space-x-2 overflow-auto my-2">${each(filteredWeekdays, (weekday) => {
    return `<button class="${[
      "flex flex-col card justify-center items-center h-[4rem] w-[3rem] lg:h-[6rem] lg:w-[5rem]",
      (selectedWeekday == weekday.id ? "variant-filled" : "") + " " + (selectedWeekday != weekday.id ? "variant-outline" : "")
    ].join(" ").trim()}"${add_attribute("value", weekday.id, 0)}><p class="h5">${escape(moment().weekday(weekday.id).format("ddd."))}</p> <p class="h3 font-bold">${escape(moment().weekday(weekday.id).format("DD"))}</p> </button>`;
  })}</div> <div class="flex flex-col space-y-2 my-2">${filteredSessions.filter((session) => moment(session.start_time, "YYYY-MM-DD HH:mm:ss Z").weekday() + 1 == selectedWeekday).length > 0 ? `${each(filteredMovies, (movie) => {
    return `${filteredSessions.filter((session) => filteredRooms.filter((room) => room.branch == branch.id).map((room) => room.id).includes(session.room) && moment(session.start_time, "YYYY-MM-DD HH:mm:ss Z").weekday() == selectedWeekday - 1 && session.movie == movie.id).length > 0 ? `<div class="flex flex-col lg:flex-row"><p class="h2 m-2 lg:hidden">${escape(movie.name)}</p> <img${add_attribute("src", movie.image, 0)}${add_attribute("alt", movie.name, 0)} class="w-full lg:w-fit object-contain lg:h-[18rem] lg:my-5 lg:mr-5 rounded-lg"> <div class="flex flex-col"><p class="h2 m-2 hidden lg:block pt-1">${escape(movie.name)}</p> <div class="grid lg:grid-cols-5 grid-cols-1">${filteredSessions.length > 0 ? `${each(filteredSessions, (session) => {
      return `${filteredRooms.find((room) => room.branch == branch.id).id == session.room && moment(session.start_time, "YYYY-MM-DD HH:mm:ss Z").weekday() == selectedWeekday - 1 && session.movie == movie.id ? `<div class="flex flex-row my-5"><a href="${"/sessions/" + escape(session.id, true)}"><div class="m-2 flex flex-col justify-center items-center card variant-soft w-[5rem] h-[6rem] lg:w-[8rem] lg:h-[8rem]"><p class="h3 font-bold">${escape(moment(session.start_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm"))}</p> <p class="h4">${escape(filteredRooms.find((room) => room.id == session.room).name)}</p> </div></a> </div>` : ``}`;
    })}` : ``} </div></div> </div>` : ``}`;
  })}` : `<p class="my-2" data-svelte-h="svelte-18ia265">No movies available this day.</p> <div class="p-[100%]"></div>`}</div></div></div></div>`;
});
export {
  Page as default
};
