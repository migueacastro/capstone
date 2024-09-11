import { c as create_ssr_component, d as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "", email = "", password = "", confirmPassword = "";
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="card m-4"><form><header class="card-header text-center text-4xl font-bold" data-svelte-h="svelte-1628gyy">Register</header> <section class="p-4"><label class="label my-1"><span data-svelte-h="svelte-15ueaex">Name</span> <input type="text" class="input"${add_attribute("value", name, 0)}> ${``}</label> <label class="label my-1"><span data-svelte-h="svelte-1bg9cgq">Email</span> <input type="text" class="input"${add_attribute("value", email, 0)}> ${``}</label> <label class="label my-1"><span data-svelte-h="svelte-1kvjhoz">Password</span> <input type="password" class="input"${add_attribute("value", password, 0)}> ${``}</label> <label class="label my-1"><span data-svelte-h="svelte-icktzz">Confirm Password</span> <input type="password" class="input"${add_attribute("value", confirmPassword, 0)}> ${``}</label></section> <footer class="card-footer" data-svelte-h="svelte-1jhz0qq"><button type="submit" class="btn btn-xl variant-filled w-full">Register</button> <label class="label mt-2 text-center"><p>Already have an account? <a href="/login">Login</a></p></label></footer></form></div></div>`;
});
export {
  Page as default
};
