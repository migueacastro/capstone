import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import { p as public_env } from "../../../../../../chunks/shared-server.js";
import { D as DatatableHeader, a as Datatable } from "../../../../../../chunks/DatatableHeader.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="animate-show">${validate_component(DatatableHeader, "DatatableHeader").$$render($$result, { title: "Bills" }, {}, {})} <div class="my-3">${validate_component(Datatable, "Datatable").$$render(
    $$result,
    {
      fields: [
        "id",
        "user_name",
        "session",
        "created_at",
        "discount",
        "subtotal",
        "total"
      ],
      endpoint: `${public_env.PUBLIC_BACKEND_URL}/tickets`
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Page as default
};
