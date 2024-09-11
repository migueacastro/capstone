import { s as subscribe } from "../../../../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { F as Form } from "../../../../../../../chunks/Form.js";
import { u as user } from "../../../../../../../chunks/auth.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => value);
  let fields = [
    { name: "name", type: "text", value: "" },
    { name: "email", type: "text", value: "" },
    {
      name: "password",
      type: "password",
      value: ""
    },
    {
      name: "confirmPassword",
      type: "password",
      value: ""
    },
    {
      name: "is_admin",
      type: "boolean",
      value: false
    },
    {
      name: "is_staff",
      type: "hidden",
      value: true
    }
  ];
  $$unsubscribe_user();
  return `${validate_component(Form, "Form").$$render(
    $$result,
    {
      name: "Staff",
      fields,
      endpointName: "staff"
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
