import { c as create_ssr_component, d as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "", password = "";
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="card m-4"><form><header class="card-header text-center text-4xl font-bold" data-svelte-h="svelte-vtllqu">Log In</header> <section class="p-4"><label class="label my-1"><span data-svelte-h="svelte-1bg9cgq">Email</span> <input type="text" class="input"${add_attribute("value", email, 0)}> ${``}</label> <label class="label my-1"><span data-svelte-h="svelte-1kvjhoz">Password</span> <input type="password" class="input"${add_attribute("value", password, 0)}> ${``}</label></section> <footer class="card-footer" data-svelte-h="svelte-qlj0d9"><button type="submit" class="btn btn-xl variant-filled w-full">Log In</button> <label class="label mt-2 text-center"><p>Haven&#39;t created an account? <a href="/register">Register</a></p></label></footer></form></div></div>`;
});
export {
  Page as default
};
