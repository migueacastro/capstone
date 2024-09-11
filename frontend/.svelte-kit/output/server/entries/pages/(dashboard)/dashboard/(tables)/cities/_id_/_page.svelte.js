import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let values = [
    { name: "name", type: "text", value: "" },
    {
      name: "on_screen_movies",
      type: "manyToMany",
      table: "movies",
      value: []
    }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "city",
      fields: values,
      endpointName: "cities",
      edit: true
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
