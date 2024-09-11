import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fields = [
    { name: "name", type: "text", value: "" },
    {
      name: "type",
      type: "hidden",
      value: "AGE"
    },
    {
      name: "value",
      type: "decimal",
      value: 0
    }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "Age Discounts",
      fields,
      endpointName: "age-discounts"
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
