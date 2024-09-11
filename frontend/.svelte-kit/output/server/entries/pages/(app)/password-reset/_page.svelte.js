import { c as create_ssr_component, d as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import { g as getToastStore } from "../../../../chunks/stores3.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getToastStore();
  let email = "";
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="card m-4"><form><header class="card-header text-center text-4xl font-bold" data-svelte-h="svelte-10t0ncd">Reset Password</header> <section class="p-4"><label class="label my-3"><span data-svelte-h="svelte-1bg9cgq">Email</span> <input type="text" class="input"${add_attribute("value", email, 0)}> ${``}</label></section> <footer class="card-footer" data-svelte-h="svelte-fvd4ed"><button type="Request" class="btn btn-xl variant-filled w-full">Send Email</button></footer></form></div></div>`;
});
export {
  Page as default
};
