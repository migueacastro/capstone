import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fields = [
    { name: "name", type: "text", value: "" },
    {
      name: "description",
      type: "textarea",
      value: ""
    },
    {
      name: "duration",
      type: "integer",
      value: null
    },
    { name: "image", type: "object", value: [] },
    {
      name: "coming_soon",
      type: "boolean",
      value: false
    }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "movie",
      fields,
      endpointName: "movies",
      edit: true
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
