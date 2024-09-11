import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fields = [
    { name: "name", type: "text", value: "" },
    {
      name: "type",
      type: "foreignKey",
      value: null,
      table: "ticket-types"
    },
    {
      name: "price",
      type: "decimal",
      value: ""
    },
    {
      name: "created_at",
      type: "datetime",
      value: ""
    }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "ticket",
      fields,
      endpointName: "tickets",
      edit: true
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
