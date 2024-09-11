import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fields = [
    {
      name: "user",
      type: "foreignKey",
      value: null,
      table: "users"
    },
    {
      name: "session",
      type: "foreignKey",
      value: null,
      table: "sessions"
    },
    {
      name: "subtotal",
      type: "decimal",
      value: ""
    },
    {
      name: "discount",
      type: "decimal",
      value: ""
    },
    {
      name: "total",
      type: "decimal",
      value: ""
    }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "bill",
      fields,
      endpointName: "bills",
      edit: true
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
