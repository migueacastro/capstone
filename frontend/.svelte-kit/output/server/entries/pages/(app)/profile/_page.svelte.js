import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { u as user } from "../../../../chunks/auth.js";
import "../../../../chunks/client.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { A as Avatar } from "../../../../chunks/Avatar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `<div class="container h-full mx-auto flex justify-startitems-start align-top flex-col"> <div class="card p-4 pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16 lg:p-10 flex flex-col justify-center text-center">${validate_component(Avatar, "Avatar").$$render(
    $$result,
    {
      class: "mx-auto my-3",
      width: "w-52",
      initials: $user.name ? $user?.name[0] + $user?.name.toString().split(" ")[1][0] : ""
    },
    {},
    {}
  )} <div class="my-3"><h2 class="h1 text-center my-5">${escape($user?.name)}</h2> <p class="lg:h2 h4 indent-5 h-fit">${escape($user?.email)}</p> <a href="#" class="anchor no-underline" data-svelte-h="svelte-u2l5nw"><p class="lg:h3 h4 text-start indent-5 h-fit mt-4">Edit Profile</p></a> <a href="/password-reset" class="anchor no-underline" data-svelte-h="svelte-yrqm01"><p class="lg:h3 h4 text-start indent-5 h-fit mt-4">Change Password</p></a></div></div></div>`;
});
export {
  Page as default
};
