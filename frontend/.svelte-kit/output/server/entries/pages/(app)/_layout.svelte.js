import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, a as each, e as escape, b as add_classes, d as add_attribute } from "../../../chunks/ssr.js";
import { g as getDrawerStore } from "../../../chunks/stores.js";
import "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { D as Drawer, L as LightSwitch, T as Toast, A as AppBar } from "../../../chunks/Toast.js";
import { u as user, a as authenticated } from "../../../chunks/auth.js";
import { c as cityStorage, s as selectedCityStorage } from "../../../chunks/cinema.js";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores4.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let expandedDrawer;
  let $cityStorage, $$unsubscribe_cityStorage;
  let $selectedCityStorage, $$unsubscribe_selectedCityStorage;
  let $$unsubscribe_page;
  let $drawerStore, $$unsubscribe_drawerStore;
  let $user, $$unsubscribe_user;
  let $authenticated, $$unsubscribe_authenticated;
  $$unsubscribe_cityStorage = subscribe(cityStorage, (value) => $cityStorage = value);
  $$unsubscribe_selectedCityStorage = subscribe(selectedCityStorage, (value) => $selectedCityStorage = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_authenticated = subscribe(authenticated, (value) => $authenticated = value);
  const drawerStore = getDrawerStore();
  $$unsubscribe_drawerStore = subscribe(drawerStore, (value) => $drawerStore = value);
  expandedDrawer = false;
  $$unsubscribe_cityStorage();
  $$unsubscribe_selectedCityStorage();
  $$unsubscribe_page();
  $$unsubscribe_drawerStore();
  $$unsubscribe_user();
  $$unsubscribe_authenticated();
  return ` ${validate_component(Drawer, "Drawer").$$render(
    $$result,
    {
      position: "top",
      height: "h-[95%]",
      class: "lg:hidden"
    },
    {},
    {
      default: () => {
        return `${$drawerStore.id === "layoutDrawer" ? `<nav class="list-nav m-2 text-center"><button data-svelte-h="svelte-10zn6ic"><i class="fa-solid fa-arrow-up h2"></i></button>  <ul class="my-2 mx-auto"><li><select class="select w-52 lg:hidden">${each($cityStorage, (city) => {
          return `<option${add_attribute("value", city.id, 0)}>${escape(city.name)}</option>`;
        })}</select></li> <li><a href="/branches" class="w-fit my-2 mx-auto h2" data-svelte-h="svelte-8g7ept">Theatres</a></li> <li><a href="/movies" class="w-fit my-2 mx-auto h2" data-svelte-h="svelte-1lf7fxv">Movies</a></li> ${$user && $user.name ? `${$user.is_staff || $user.is_superuser ? `<li><a href="/dashboard" class="w-fit my-2 mx-auto h2" data-svelte-h="svelte-1nmr4rf">Dashboard</a></li>` : ``} <li><a href="/dashboard/profile" class="w-fit my-2 mx-auto h2"><i class="fa-solid fa-user ml-2 mr-3"></i> ${escape($user.name.split(" ")[0])}</a></li> <li><a class="btn btn-md variant-ghost-surface w-fit my-4 mx-auto h2" rel="noreferrer" href="/login" data-svelte-h="svelte-dwdloa"><i class="fa-solid fa-arrow-right-from-bracket mx-1"></i>
					Logout</a></li>` : `<li><a class="w-fit my-4 mx-auto h2" href="/login" rel="noreferrer" data-svelte-h="svelte-frsfhl">Login</a></li> <li><a class="w-fit my-4 mx-auto h2" href="/register" rel="noreferrer" data-svelte-h="svelte-1ratqg1">Register</a></li>`} <li><button class="mx-auto my-10">${validate_component(LightSwitch, "LightSwitch").$$render($$result, {}, {}, {})}</button></li> </ul></nav>` : ``}`;
      }
    }
  )}  <div class="animate-show h-full overflow-auto">${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})} <header${add_classes(((expandedDrawer == false ? "show-navbar" : "") + " " + (expandedDrawer == true ? "hide-navbar" : "")).trim())}> ${validate_component(AppBar, "AppBar").$$render($$result, { slotDefault: "place-self-center" }, {}, {
    trail: () => {
      return ` ${$user && $user.is_staff ? `<a href="/dashboard" class="hidden lg:block mx-1" data-svelte-h="svelte-1lfsnt2">Dashboard</a>` : ``} <a href="/branches" class="mx-2 hidden lg:block" data-svelte-h="svelte-a1xx3x">Theatres</a> <a href="/movies" class="mx-2 hidden lg:block" data-svelte-h="svelte-f1nvub">Movies</a> ${$authenticated === false ? `<a class="btn btn-sm variant-ghost-surface mx-1" href="/login" rel="noreferrer" data-svelte-h="svelte-a817xh">Login</a> <a class="btn btn-sm variant-ghost-surface mx-1" href="/register" rel="noreferrer" data-svelte-h="svelte-t5dqwv">Register</a>` : `${$user && $user.name ? `<a href="/profile" class="lg:hidden h3 mx-1" data-svelte-h="svelte-194m77o"><i class="fa-solid fa-user px-2"></i></a> <a href="/profile" class="hidden lg:block mx-1"><i class="fa-solid fa-user ml-2 mr-1"></i> ${escape($user.name.split(" ")[0])}</a>` : ``} <a class="btn btn-sm variant-ghost-surface hidden lg:block mx-1" rel="noreferrer" href="/login" data-svelte-h="svelte-k7pg4f"><i class="fa-solid fa-arrow-right-from-bracket mx-1"></i>
					Logout</a>`} ${$cityStorage.length > 1 && $selectedCityStorage ? `<select class="select w-52 hidden lg:block">${each($cityStorage, (city) => {
        return `<option${add_attribute("value", city.id, 0)}>${escape(city.name)}</option>`;
      })}</select>` : ``} ${validate_component(LightSwitch, "LightSwitch").$$render($$result, { class: "hidden lg:block" }, {}, {})} `;
    },
    lead: () => {
      return `<a href="/" class="hidden lg:block" data-svelte-h="svelte-1k0w75c"><strong class="text-xl uppercase">cinema</strong></a> <button class="lg:hidden" data-svelte-h="svelte-12yp0i4"><i class="fa-solid fa-bars h2 px-2"></i></button> `;
    },
    default: () => {
      return ` <a href="/" class="text-xl uppercase lg:hidden" data-svelte-h="svelte-zllayx"><strong>cinema</strong></a>`;
    }
  })}</header>  ${slots.default ? slots.default({}) : ``} <footer class="z-20">${validate_component(AppBar, "AppBar").$$render($$result, { slotDefault: "place-self-center" }, {}, {
    trail: () => {
      return `<div></div> `;
    },
    lead: () => {
      return `<div></div> `;
    },
    default: () => {
      return `<a href="/" class="hidden lg:block" data-svelte-h="svelte-1hdlmxl"><strong class="text-xl uppercase text-center">cinema</strong></a>`;
    }
  })}</footer></div>`;
});
export {
  Layout as default
};
