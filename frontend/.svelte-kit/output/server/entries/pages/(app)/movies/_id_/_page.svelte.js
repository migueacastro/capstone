import { c as compute_slots, a as compute_rest_props, s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, s as setContext, e as escape, d as add_attribute, i as getContext, g as spread, j as escape_attribute_value, h as escape_object, v as validate_component, a as each } from "../../../../../chunks/ssr.js";
import { w as weekdayStorage, d as sessionStorage, r as roomStorage, s as selectedCityStorage, b as branchStorage } from "../../../../../chunks/cinema.js";
import "../../../../../chunks/client.js";
import "../../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import moment from "moment";
const cBase$1 = "space-y-4";
const cList = "flex overflow-x-auto hide-scrollbar";
const cPanel = "";
const TabGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesList;
  let classesPanel;
  let $$slots = compute_slots(slots);
  let { justify = "justify-start" } = $$props;
  let { border = "border-b border-surface-400-500-token" } = $$props;
  let { active = "border-b-2 border-surface-900-50-token" } = $$props;
  let { hover = "hover:variant-soft" } = $$props;
  let { flex = "flex-none" } = $$props;
  let { padding = "px-4 py-2" } = $$props;
  let { rounded = "rounded-tl-container-token rounded-tr-container-token" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { regionList = "" } = $$props;
  let { regionPanel = "" } = $$props;
  let { labelledby = "" } = $$props;
  let { panel = "" } = $$props;
  setContext("active", active);
  setContext("hover", hover);
  setContext("flex", flex);
  setContext("padding", padding);
  setContext("rounded", rounded);
  setContext("spacing", spacing);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0) $$bindings.justify(justify);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0) $$bindings.border(border);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0) $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0) $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
  if ($$props.regionList === void 0 && $$bindings.regionList && regionList !== void 0) $$bindings.regionList(regionList);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0) $$bindings.regionPanel(regionPanel);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0) $$bindings.labelledby(labelledby);
  if ($$props.panel === void 0 && $$bindings.panel && panel !== void 0) $$bindings.panel(panel);
  classesBase = `${cBase$1} ${$$props.class ?? ""}`;
  classesList = `${cList} ${justify} ${border} ${regionList}`;
  classesPanel = `${cPanel} ${regionPanel}`;
  return `<div class="${"tab-group " + escape(classesBase, true)}" data-testid="tab-group"> <div class="${"tab-list " + escape(classesList, true)}" role="tablist"${add_attribute("aria-labelledby", labelledby, 0)}>${slots.default ? slots.default({}) : ``}</div>  ${$$slots.panel ? `<div class="${"tab-panel " + escape(classesPanel, true)}" role="tabpanel"${add_attribute("aria-labelledby", panel, 0)} tabindex="0">${slots.panel ? slots.panel({}) : ``}</div>` : ``}</div>`;
});
const cBase = "text-center cursor-pointer transition-colors duration-100";
const cInterface = "";
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let classesActive;
  let classesBase;
  let classesInterface;
  let classesTab;
  let $$restProps = compute_rest_props($$props, [
    "group",
    "name",
    "value",
    "title",
    "controls",
    "regionTab",
    "active",
    "hover",
    "flex",
    "padding",
    "rounded",
    "spacing"
  ]);
  let $$slots = compute_slots(slots);
  let { group } = $$props;
  let { name } = $$props;
  let { value } = $$props;
  let { title = "" } = $$props;
  let { controls = "" } = $$props;
  let { regionTab = "" } = $$props;
  let { active = getContext("active") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { flex = getContext("flex") } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { spacing = getContext("spacing") } = $$props;
  let elemInput;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.controls === void 0 && $$bindings.controls && controls !== void 0) $$bindings.controls(controls);
  if ($$props.regionTab === void 0 && $$bindings.regionTab && regionTab !== void 0) $$bindings.regionTab(regionTab);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0) $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0) $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
  selected = value === group;
  classesActive = selected ? active : hover;
  classesBase = `${cBase} ${flex} ${padding} ${rounded} ${classesActive} ${$$props.class ?? ""}`;
  classesInterface = `${cInterface} ${spacing}`;
  classesTab = `${regionTab}`;
  return `<label${add_attribute("class", classesBase, 0)}${add_attribute("title", title, 0)}> <div class="${"tab " + escape(classesTab, true)}" data-testid="tab" role="tab"${add_attribute("aria-controls", controls, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("tabindex", selected ? 0 : -1, 0)}> <div class="h-0 w-0 overflow-hidden"><input${spread(
    [
      { type: "radio" },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) },
      escape_object(prunedRestProps()),
      { tabindex: "-1" }
    ],
    {}
  )}${add_attribute("this", elemInput, 0)}${value === group ? add_attribute("checked", true, 1) : ""}></div>  <div class="${"tab-interface " + escape(classesInterface, true)}">${$$slots.lead ? `<div class="tab-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``} <div class="tab-label">${slots.default ? slots.default({}) : ``}</div></div></div></label>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedWeekday;
  let filteredBranches;
  let filteredRooms;
  let filteredSessions;
  let filteredWeekdays;
  let $$unsubscribe_weekdayStorage;
  let $$unsubscribe_sessionStorage;
  let $$unsubscribe_roomStorage;
  let $$unsubscribe_selectedCityStorage;
  let $$unsubscribe_branchStorage;
  $$unsubscribe_weekdayStorage = subscribe(weekdayStorage, (value) => value);
  $$unsubscribe_sessionStorage = subscribe(sessionStorage, (value) => value);
  $$unsubscribe_roomStorage = subscribe(roomStorage, (value) => value);
  $$unsubscribe_selectedCityStorage = subscribe(selectedCityStorage, (value) => value);
  $$unsubscribe_branchStorage = subscribe(branchStorage, (value) => value);
  let { data } = $$props;
  let movie;
  let tabSet = 1;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    selectedWeekday = moment().weekday();
    filteredBranches = [];
    filteredRooms = [];
    filteredSessions = [];
    filteredWeekdays = [];
    $$rendered = `<div class="container lg:h-full mx-auto flex justify-startitems-start align-top flex-col"> <div class="card p-4 pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16 lg:p-10 flex flex-col lg:flex-row"><img${add_attribute("src", movie?.image, 0)}${add_attribute("alt", movie?.name, 0)} class="object-cover object-top mb-4 h-64 lg:h-[80%] w-full lg:w-1/3 rounded-lg lg:mx-10"> <div class="lg:w-[50%]">${validate_component(TabGroup, "TabGroup").$$render($$result, {}, {}, {
      panel: () => {
        return ` ${tabSet === 0 ? `<div class="flex flex-col"><h2 class="h2 text-center lg:text-start mb-10">${escape(movie?.name)}</h2> <p class="lg:h3 h4 indent-5 h-fit">${escape(movie?.description)}</p></div>` : `${tabSet === 1 ? `<div class="flex flex-row space-x-2">${each(filteredWeekdays, (weekday) => {
          return `<button class="${[
            "flex flex-col card justify-center items-center h-[6rem] w-[5rem]",
            (selectedWeekday == weekday.id ? "variant-filled" : "") + " " + (selectedWeekday != weekday.id ? "variant-outline" : "")
          ].join(" ").trim()}"${add_attribute("value", weekday.id, 0)}><p class="h5">${escape(moment().weekday(weekday.id).format("ddd."))}</p> <p class="h3 font-bold">${escape(moment().weekday(weekday.id).format("DD"))}</p> </button>`;
        })}</div> <div class="flex flex-col space-y-2 my-2">${each(filteredBranches, (branch) => {
          return `${filteredSessions.filter((session) => filteredRooms.filter((room) => room.branch == branch.id).map((room) => room.id).includes(session.room) && moment(session.start_time, "YYYY-MM-DD HH:mm:ss Z").weekday() == selectedWeekday - 1 && session.movie == movie.id).length > 0 ? `<div class="card variant-outline p-4"><p class="h3">${escape(branch.name)}</p> <div class="grid lg:grid-cols-5 grid-cols-1 mx-auto">${filteredSessions.length > 0 ? `${each(filteredSessions, (session) => {
            return `${filteredRooms.find((room) => room.branch == branch.id).id == session.room && moment(session.start_time, "YYYY-MM-DD HH:mm:ss Z").weekday() == selectedWeekday - 1 && session.movie == movie.id ? `<a href="${"/sessions/" + escape(session.id, true)}"><div class="m-2 flex flex-col justify-center items-center card variant-soft w-[8rem] h-[8rem]"><p class="h3 font-bold">${escape(moment(session.start_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm"))}</p> <p class="h4">${escape(filteredRooms.find((room) => room.id == session.room).name)}</p></div> </a>` : ``}`;
          })}` : ``}</div> </div>` : ``}`;
        })}</div>` : ``}`} `;
      },
      default: () => {
        return `${validate_component(Tab, "Tab").$$render(
          $$result,
          { name: "tab1", value: 0, group: tabSet },
          {
            group: ($$value) => {
              tabSet = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `Description`;
            }
          }
        )} ${validate_component(Tab, "Tab").$$render(
          $$result,
          { name: "tab2", value: 1, group: tabSet },
          {
            group: ($$value) => {
              tabSet = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `Theaters`;
            }
          }
        )} `;
      }
    })}</div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_weekdayStorage();
  $$unsubscribe_sessionStorage();
  $$unsubscribe_roomStorage();
  $$unsubscribe_selectedCityStorage();
  $$unsubscribe_branchStorage();
  return $$rendered;
});
export {
  Page as default
};
