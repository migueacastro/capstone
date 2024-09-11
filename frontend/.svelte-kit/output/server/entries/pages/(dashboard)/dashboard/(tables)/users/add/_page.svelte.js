import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fields = [
    { name: "name", type: "text", value: "" },
    { name: "email", type: "text", value: "" },
    {
      name: "password",
      type: "text",
      value: ""
    }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "User",
      fields,
      endpointName: "users"
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
