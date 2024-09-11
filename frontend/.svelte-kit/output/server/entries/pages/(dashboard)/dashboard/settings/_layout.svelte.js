import { c as create_ssr_component } from "../../../../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container h-full mx-auto flex justify-center items-start align-top flex-col"><div class="p-4 mx-auto pt-8 w-[90%] lg:w-full my-4 lg:my-16 lg:p-10 flex flex-col justify-center text-center">${slots.default ? slots.default({}) : ``}</div></div>`;
});
export {
  Layout as default
};
