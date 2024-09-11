import { s as subscribe } from "../../../../../../chunks/utils.js";
import { c as create_ssr_component, d as add_attribute, e as escape } from "../../../../../../chunks/ssr.js";
import { g as getToastStore } from "../../../../../../chunks/stores3.js";
import "../../../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { p as page } from "../../../../../../chunks/stores4.js";
import "../../../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const params = $page.params;
  params.uidb64;
  params.token;
  getToastStore();
  let password = "";
  let confirmPassword = "";
  let errors = { confirmPassword: null };
  $$unsubscribe_page();
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="card m-4"><form><header class="card-header text-center text-4xl font-bold" data-svelte-h="svelte-10t0ncd">Reset Password</header> <section class="p-4"><label class="label my-1"><span data-svelte-h="svelte-1kvjhoz">Password</span> <input type="password" class="input"${add_attribute("value", password, 0)}> ${errors?.password ? `<p class="text-red-500">${escape(errors.password[0])}</p>` : ``}</label> <label class="label my-1"><span data-svelte-h="svelte-icktzz">Confirm Password</span> <input type="password" class="input"${add_attribute("value", confirmPassword, 0)}> ${``}</label></section> <footer class="card-footer" data-svelte-h="svelte-1i6wdir"><button type="Request" class="btn btn-xl variant-filled w-full">Reset Password</button></footer></form></div></div>`;
});
export {
  Page as default
};
