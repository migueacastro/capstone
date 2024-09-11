import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component } from "../../../../../chunks/ssr.js";
import { u as user } from "../../../../../chunks/auth.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `<div><h2 class="h1 text-start mb-4 w-full " data-svelte-h="svelte-d2f9pq">Settings</h2> <div class="grid lg:grid-cols-2 grid-cols-1 lg:space-x-5 space-y space-y-5 lg:space-y-0"><div class="card p-10" data-svelte-h="svelte-93ipiv"><a href="/dashboard/profile" class="h2 flex flex-row justify-center"><i class="fa-solid fa-user mx-5"></i> <h2 class="h2">Profile</h2></a></div> ${$user.is_superuser ? `<div class="card p-10" data-svelte-h="svelte-y4wmqq"><a href="/dashboard/staff" class="h2 flex flex-row justify-center"><i class="fa-solid fa-user-group mx-5"></i> <h2 class="h2">Manage staff</h2></a></div>` : ``}</div></div>`;
});
export {
  Page as default
};
