import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let values = [
    { name: "name", type: "text", value: "" },
    { name: "address", type: "text", value: "" },
    {
      name: "standart_price",
      type: "decimal",
      value: ""
    },
    {
      name: "city",
      type: "foreignKey",
      table: "cities",
      value: 1
    },
    { name: "image", type: "object", value: [] }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "branch",
      endpointName: "branches",
      edit: true,
      fields: values
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
