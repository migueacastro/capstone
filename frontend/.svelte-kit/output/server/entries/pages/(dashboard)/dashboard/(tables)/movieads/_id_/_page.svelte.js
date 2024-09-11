import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fields = [
    { name: "name", type: "text", value: "" },
    {
      name: "movie",
      type: "foreignKey",
      value: null,
      table: "movies"
    },
    { name: "image", type: "object", value: [] }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "Movie Ad",
      fields,
      endpointName: "movieads",
      edit: true
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
