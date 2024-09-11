import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fields = [
    { name: "name", type: "text", value: "" },
    {
      name: "branch",
      type: "foreignKey",
      value: null,
      table: "branches"
    },
    {
      name: "layout",
      type: "layout",
      value: [
        [
          {
            "type": "seat",
            "value": 1,
            "status": "available"
          },
          {
            "type": "seat",
            "value": 2,
            "status": "available"
          }
        ],
        [
          {
            "type": "seat",
            "value": 1,
            "status": "available"
          },
          {
            "type": "seat",
            "value": 2,
            "status": "available"
          }
        ]
      ]
    }
  ];
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "Room",
      fields,
      endpointName: "rooms"
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
