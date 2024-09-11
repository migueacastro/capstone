import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fields = [
    {
      name: "movie",
      type: "foreignKey",
      value: null,
      table: "movies"
    },
    {
      name: "room",
      type: "foreignKey",
      value: null,
      table: "rooms"
    },
    {
      name: "start_time",
      type: "datetime",
      value: ""
    },
    {
      name: "end_time",
      type: "datetime",
      value: ""
    },
    {
      name: "seats",
      type: "integer",
      value: null
    }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "Session",
      fields,
      endpointName: "sessions",
      edit: true
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
