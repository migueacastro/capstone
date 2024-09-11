import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, f as createEventDispatcher, e as escape, d as add_attribute, g as spread, h as escape_object, v as validate_component, m as missing_component, b as add_classes } from "../../../../chunks/ssr.js";
import { g as getDrawerStore } from "../../../../chunks/stores.js";
import { g as getModalStore } from "../../../../chunks/stores2.js";
import { p as prefersReducedMotionStore } from "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { D as Drawer, L as LightSwitch, T as Toast, A as AppBar } from "../../../../chunks/Toast.js";
import { f as fly } from "../../../../chunks/index2.js";
import { u as user, a as authenticated } from "../../../../chunks/auth.js";
import "../../../../chunks/client.js";
import { p as page } from "../../../../chunks/stores4.js";
const cBackdrop = "fixed top-0 left-0 right-0 bottom-0 bg-surface-backdrop-token p-4";
const cTransitionLayer = "w-full h-fit min-h-full overflow-y-auto flex justify-center";
const cModal = "block overflow-y-auto";
const cModalImage = "w-full h-auto";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cPosition;
  let classesBackdrop;
  let classesTransitionLayer;
  let classesModal;
  let parent;
  let $modalStore, $$unsubscribe_modalStore;
  let $prefersReducedMotionStore, $$unsubscribe_prefersReducedMotionStore;
  $$unsubscribe_prefersReducedMotionStore = subscribe(prefersReducedMotionStore, (value) => $prefersReducedMotionStore = value);
  createEventDispatcher();
  let { components = {} } = $$props;
  let { position = "items-center" } = $$props;
  let { background = "bg-surface-100-800-token" } = $$props;
  let { width = "w-modal" } = $$props;
  let { height = "h-auto" } = $$props;
  let { padding = "p-4" } = $$props;
  let { spacing = "space-y-4" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow-xl" } = $$props;
  let { zIndex = "z-[999]" } = $$props;
  let { buttonNeutral = "variant-ghost-surface" } = $$props;
  let { buttonPositive = "variant-filled" } = $$props;
  let { buttonTextCancel = "Cancel" } = $$props;
  let { buttonTextConfirm = "Confirm" } = $$props;
  let { buttonTextSubmit = "Submit" } = $$props;
  let { regionBackdrop = "" } = $$props;
  let { regionHeader = "text-2xl font-bold" } = $$props;
  let { regionBody = "max-h-[200px] overflow-hidden" } = $$props;
  let { regionFooter = "flex justify-end space-x-2" } = $$props;
  let { transitions = !$prefersReducedMotionStore } = $$props;
  let { transitionIn = fly } = $$props;
  let { transitionInParams = { duration: 150, opacity: 0, x: 0, y: 100 } } = $$props;
  let { transitionOut = fly } = $$props;
  let { transitionOutParams = { duration: 150, opacity: 0, x: 0, y: 100 } } = $$props;
  let promptValue;
  const buttonTextDefaults = {
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit
  };
  let currentComponent;
  let modalElement;
  let windowHeight;
  let backdropOverflow = "overflow-y-hidden";
  const modalStore = getModalStore();
  $$unsubscribe_modalStore = subscribe(modalStore, (value) => $modalStore = value);
  function handleModals(modals) {
    if (modals[0].type === "prompt") promptValue = modals[0].value;
    buttonTextCancel = modals[0].buttonTextCancel || buttonTextDefaults.buttonTextCancel;
    buttonTextConfirm = modals[0].buttonTextConfirm || buttonTextDefaults.buttonTextConfirm;
    buttonTextSubmit = modals[0].buttonTextSubmit || buttonTextDefaults.buttonTextSubmit;
    currentComponent = typeof modals[0].component === "string" ? components[modals[0].component] : modals[0].component;
  }
  function onModalHeightChange(modal) {
    let modalHeight = modal?.clientHeight;
    if (!modalHeight) modalHeight = modal?.firstChild?.clientHeight;
    if (!modalHeight) return;
    if (modalHeight > windowHeight) {
      backdropOverflow = "overflow-y-auto";
    } else {
      backdropOverflow = "overflow-y-hidden";
    }
  }
  function onClose() {
    if ($modalStore[0].response) $modalStore[0].response(false);
    modalStore.close();
  }
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0) $$bindings.background(background);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0) $$bindings.zIndex(zIndex);
  if ($$props.buttonNeutral === void 0 && $$bindings.buttonNeutral && buttonNeutral !== void 0) $$bindings.buttonNeutral(buttonNeutral);
  if ($$props.buttonPositive === void 0 && $$bindings.buttonPositive && buttonPositive !== void 0) $$bindings.buttonPositive(buttonPositive);
  if ($$props.buttonTextCancel === void 0 && $$bindings.buttonTextCancel && buttonTextCancel !== void 0) $$bindings.buttonTextCancel(buttonTextCancel);
  if ($$props.buttonTextConfirm === void 0 && $$bindings.buttonTextConfirm && buttonTextConfirm !== void 0) $$bindings.buttonTextConfirm(buttonTextConfirm);
  if ($$props.buttonTextSubmit === void 0 && $$bindings.buttonTextSubmit && buttonTextSubmit !== void 0) $$bindings.buttonTextSubmit(buttonTextSubmit);
  if ($$props.regionBackdrop === void 0 && $$bindings.regionBackdrop && regionBackdrop !== void 0) $$bindings.regionBackdrop(regionBackdrop);
  if ($$props.regionHeader === void 0 && $$bindings.regionHeader && regionHeader !== void 0) $$bindings.regionHeader(regionHeader);
  if ($$props.regionBody === void 0 && $$bindings.regionBody && regionBody !== void 0) $$bindings.regionBody(regionBody);
  if ($$props.regionFooter === void 0 && $$bindings.regionFooter && regionFooter !== void 0) $$bindings.regionFooter(regionFooter);
  if ($$props.transitions === void 0 && $$bindings.transitions && transitions !== void 0) $$bindings.transitions(transitions);
  if ($$props.transitionIn === void 0 && $$bindings.transitionIn && transitionIn !== void 0) $$bindings.transitionIn(transitionIn);
  if ($$props.transitionInParams === void 0 && $$bindings.transitionInParams && transitionInParams !== void 0) $$bindings.transitionInParams(transitionInParams);
  if ($$props.transitionOut === void 0 && $$bindings.transitionOut && transitionOut !== void 0) $$bindings.transitionOut(transitionOut);
  if ($$props.transitionOutParams === void 0 && $$bindings.transitionOutParams && transitionOutParams !== void 0) $$bindings.transitionOutParams(transitionOutParams);
  {
    if ($modalStore.length) handleModals($modalStore);
  }
  {
    onModalHeightChange(modalElement);
  }
  cPosition = $modalStore[0]?.position ?? position;
  classesBackdrop = `${cBackdrop} ${regionBackdrop} ${zIndex} ${$$props.class ?? ""} ${$modalStore[0]?.backdropClasses ?? ""}`;
  classesTransitionLayer = `${cTransitionLayer} ${cPosition ?? ""}`;
  classesModal = `${cModal} ${background} ${width} ${height} ${padding} ${spacing} ${rounded} ${shadow} ${$modalStore[0]?.modalClasses ?? ""}`;
  parent = {
    position,
    // ---
    background,
    width,
    height,
    padding,
    spacing,
    rounded,
    shadow,
    // ---
    buttonNeutral,
    buttonPositive,
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit,
    // ---
    regionBackdrop,
    regionHeader,
    regionBody,
    regionFooter,
    // ---
    onClose
  };
  $$unsubscribe_modalStore();
  $$unsubscribe_prefersReducedMotionStore();
  return ` ${$modalStore.length > 0 ? `   <div class="${"modal-backdrop " + escape(classesBackdrop, true) + " " + escape(backdropOverflow, true)}" data-testid="modal-backdrop"> <div class="${"modal-transition " + escape(classesTransitionLayer, true)}">${$modalStore[0].type !== "component" ? ` <div class="${"modal " + escape(classesModal, true)}" data-testid="modal" role="dialog" aria-modal="true"${add_attribute("aria-label", $modalStore[0].title ?? "", 0)}${add_attribute("this", modalElement, 0)}> ${$modalStore[0]?.title ? `<header class="${"modal-header " + escape(regionHeader, true)}"><!-- HTML_TAG_START -->${$modalStore[0].title}<!-- HTML_TAG_END --></header>` : ``}  ${$modalStore[0]?.body ? `<article class="${"modal-body " + escape(regionBody, true)}"><!-- HTML_TAG_START -->${$modalStore[0].body}<!-- HTML_TAG_END --></article>` : ``}  ${$modalStore[0]?.image && typeof $modalStore[0]?.image === "string" ? `<img class="${"modal-image " + escape(cModalImage, true)}"${add_attribute("src", $modalStore[0]?.image, 0)} alt="Modal">` : ``}  ${$modalStore[0].type === "alert" ? ` <footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button></footer>` : `${$modalStore[0].type === "confirm" ? ` <footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button> <button type="button" class="${"btn " + escape(buttonPositive, true)}">${escape(buttonTextConfirm)}</button></footer>` : `${$modalStore[0].type === "prompt" ? ` <form class="space-y-4"><input${spread(
    [
      { class: "modal-prompt-input input" },
      { name: "prompt" },
      { type: "text" },
      escape_object($modalStore[0].valueAttr)
    ],
    {}
  )}${add_attribute("value", promptValue, 0)}> <footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button> <button type="submit" class="${"btn " + escape(buttonPositive, true)}">${escape(buttonTextSubmit)}</button></footer></form>` : ``}`}`}</div>` : `  <div class="${"modal contents " + escape($modalStore[0]?.modalClasses ?? "", true)}" data-testid="modal-component" role="dialog" aria-modal="true"${add_attribute("aria-label", $modalStore[0].title ?? "", 0)}${add_attribute("this", modalElement, 0)}>${currentComponent?.slot ? `${validate_component(currentComponent?.ref || missing_component, "svelte:component").$$render($$result, Object.assign({}, currentComponent?.props, { parent }), {}, {
    default: () => {
      return `<!-- HTML_TAG_START -->${currentComponent?.slot}<!-- HTML_TAG_END -->`;
    }
  })}` : `${validate_component(currentComponent?.ref || missing_component, "svelte:component").$$render($$result, Object.assign({}, currentComponent?.props, { parent }), {}, {})}`}</div>`}</div></div>` : ``}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let thisUrl;
  let isSelected;
  let expandedDrawer;
  let $user, $$unsubscribe_user;
  let $page, $$unsubscribe_page;
  let $drawerStore, $$unsubscribe_drawerStore;
  let $authenticated, $$unsubscribe_authenticated;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_authenticated = subscribe(authenticated, (value) => $authenticated = value);
  getModalStore();
  const drawerStore = getDrawerStore();
  $$unsubscribe_drawerStore = subscribe(drawerStore, (value) => $drawerStore = value);
  thisUrl = $page.url.pathname.split("/");
  isSelected = (url) => {
    if (thisUrl[1] == url && thisUrl.length == 2) {
      return true;
    } else {
      if (thisUrl[2] == url) {
        return true;
      }
      return false;
    }
  };
  expandedDrawer = false;
  $$unsubscribe_user();
  $$unsubscribe_page();
  $$unsubscribe_drawerStore();
  $$unsubscribe_authenticated();
  return `${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      height: "h-auto",
      regionBody: "h-auto overflow-hidden"
    },
    {},
    {}
  )}  ${validate_component(Drawer, "Drawer").$$render(
    $$result,
    {
      position: "top",
      height: "h-[97%]",
      class: "lg:hidden"
    },
    {},
    {
      default: () => {
        return `${$drawerStore.id === "layoutDrawer" ? `<nav class="list-nav m-2 text-center"><button data-svelte-h="svelte-2v6xjm"><i class="fa-solid fa-arrow-up h2"></i></button>  <ul class="my-2 mx-auto"><li><a href="/dashboard" class="w-fit my-2 mx-auto h4 font-bold" data-svelte-h="svelte-bs04dk">Dashboard</a></li> <li><button class="font-bold w-fit my-2 mx-auto h4" data-svelte-h="svelte-qt3wl4">Movies</button> <ul class="${[
          "font-light h-0",
          "ml-[100vh]  opacity-0  hide-text-mobile"
        ].join(" ").trim()}"><li><a href="/dashboard/movies" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-r5n59h">Movies</a></li> <li><a href="/dashboard/movieads" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-2v8q7l">Movie Ads</a></li></ul></li> <li><button class="font-bold w-fit my-2 mx-auto h4" data-svelte-h="svelte-1x2ywkv">Locations</button> <ul class="${[
          "font-light h-0",
          "ml-[100vh]  opacity-0  hide-text-mobile"
        ].join(" ").trim()}"><li><a href="/dashboard/theaters" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-gwabsr">Theaters</a></li> <li><a href="/dashboard/rooms" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-69uu81">Rooms</a></li> <li><a href="/dashboard/cities" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-jzrpi1">Cities</a></li></ul></li> <li><button class="font-bold w-fit my-2 mx-auto h4" data-svelte-h="svelte-ypdz5s">Events</button> <ul class="${[
          "font-light h-0",
          "ml-[100vh]  opacity-0  hide-text-mobile"
        ].join(" ").trim()}"><li><a href="/dashboard/sessions" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-13szard">Sessions</a></li> <li><a href="/dashboard/schedule" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-b7aai9">Schedule</a></li></ul></li> <li><button class="font-bold w-fit my-2 mx-auto h4" data-svelte-h="svelte-18ok6xs">Tickets</button> <ul class="${[
          "font-light h-0",
          "ml-[100vh]  opacity-0  hide-text-mobile"
        ].join(" ").trim()}"><li><a href="/dashboard/tickets" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-1nlxhpd">Tickets</a></li> <li><a href="/dashboard/ticket-types" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-5cvi20">Types</a></li></ul></li> <li><button class="font-bold w-fit my-2 mx-auto h4" data-svelte-h="svelte-fsah57">Discounts</button> <ul class="${[
          "font-light h-0",
          " ml-[100vh] opacity-0  hide-text-mobile"
        ].join(" ").trim()}"><li><a href="/dashboard/day-discounts" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-17nl4na">Day Discounts</a></li> <li><a href="/dashboard/age-discounts" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-u1iq62">Age Discounts</a></li> <li><a href="/dashboard/discount-schedule" class="w-fit my-2 mx-auto h4" data-svelte-h="svelte-17blrln">Schedule</a></li></ul></li> <li><a href="/" class="w-fit my-2 mx-auto h4 font-bold" data-svelte-h="svelte-10b4oi4">Exit</a></li> <li><a href="/dashboard/users" class="font-bold w-fit my-2 mx-auto h4" data-svelte-h="svelte-1winfjl">Users</a></li> <li><a href="/dashboard/settings" class="font-bold w-fit my-2 mx-auto h4" data-svelte-h="svelte-1p0i2rz">Settings</a></li> ${$user && $user.name ? `<li><a href="/dashboard/profile" class="font-bold w-fit my-2 mx-auto h4"><i class="fa-solid fa-user ml-2 mr-3"></i> ${escape($user.name.split(" ")[0])}</a></li> <li class="flex flex-row justify-center"><a class="btn btn-md variant-ghost-surface my-4 h4" rel="noreferrer" href="/login" data-svelte-h="svelte-10dnqi2"><i class="fa-solid fa-arrow-right-from-bracket mx-1"></i>
					Logout</a> <button class="my-2">${validate_component(LightSwitch, "LightSwitch").$$render($$result, {}, {}, {})}</button></li>` : ``} </ul></nav>` : ``}`;
      }
    }
  )}  <div class="h-screen animate-show flex flex-col overflow-auto"><div class="lg:ml-20 w-full lg:w-[calc(100%-5rem)] flex flex-justify-center flex-col">${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})} <header${add_classes(((expandedDrawer == false ? "show-navbar" : "") + " " + (expandedDrawer == true ? "hide-navbar" : "")).trim())}> ${validate_component(AppBar, "AppBar").$$render($$result, { slotDefault: "place-self-center" }, {}, {
    trail: () => {
      return ` ${$authenticated === false ? `<a class="btn btn-sm variant-ghost-surface mx-1" href="/login" rel="noreferrer" data-svelte-h="svelte-1au5f6v">Login</a> <a class="btn btn-sm variant-ghost-surface mx-1" href="/register" rel="noreferrer" data-svelte-h="svelte-152klo9">Register</a>` : `${$user && $user.name ? `<a href="/dashboard/profile" class="lg:hidden h3 mx-1" data-svelte-h="svelte-qrq2so"><i class="fa-solid fa-user px-2"></i></a> <a href="/dashboard/profile" class="hidden lg:block mx-1 "><i class="fa-solid fa-user ml-2 mr-1"></i> ${escape($user.name.split(" ")[0])}</a>` : ``} <a class="btn btn-sm variant-ghost-surface hidden lg:block mx-1" rel="noreferrer" href="/login" data-svelte-h="svelte-1czt5z8"><i class="fa-solid fa-arrow-right-from-bracket mx-1"></i>
                        Logout</a>`} ${validate_component(LightSwitch, "LightSwitch").$$render($$result, { class: "hidden lg:block" }, {}, {})} `;
    },
    lead: () => {
      return `<a href="/dashboard" class="hidden lg:block" data-svelte-h="svelte-1q6t8ft"><strong class="text-xl uppercase">cinema</strong></a> <button class="lg:hidden" data-svelte-h="svelte-104mgvm"><i class="fa-solid fa-bars h2 px-2"></i></button> `;
    },
    default: () => {
      return ` <a href="/dashboard" class="text-xl uppercase lg:hidden" data-svelte-h="svelte-5rjjlf"><strong>cinema</strong></a>`;
    }
  })}</header> ${slots.default ? slots.default({}) : ``}</div> <aside class="${[
    "lg:block lg:fixed card w-20 h-screen ease-linear rounded-none z-10 hidden hover:show-sidebar hover:w-[14rem]",
    "hide-sidebar"
  ].join(" ").trim()}"><div class="px-7 pb-10 flex flex-row items-center "><i class="${[
    "py-5 absolute top-6 fa fa-arrow-right h3 w-20 opacity-0",
    " opacity-1"
  ].join(" ").trim()}"></i> <i class="${[
    "py-5 relative top-6 fa fa-bars h3 w-20 opacity-1",
    "animate-hide "
  ].join(" ").trim()}"></i></div> <a href="/dashboard" class=""><div class="px-7 flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><i class="py-5 fa-solid fa-house h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-192k538">Dashboard</p></div></a> <div role="tab" tabindex="0" class="relative "><div class="px-7 flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><i class="py-5 fa-solid fa-film h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-1y339lf">Movies</p></div> <div id="dropdownMovies" class="${[
    "flex flex-col absolute left-[14rem] w-[10rem] top-[0rem] rounded-none card",
    "hidden"
  ].join(" ").trim()}"><a href="/dashboard/movies" class=""><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-lkyqfu">Movies</p></div></a> <a href="/dashboard/movieads"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-16yu7zl">Movie Ads</p></div></a></div></div> <div role="tab" tabindex="0" class="relative "><div class="px-7 flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><i class="py-5 fa-solid fa-location-dot h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-oi5wqg">Locations</p></div> <div id="dropdownLocations" class="${[
    "flex flex-col absolute left-[14rem] w-[10rem] top-[0rem] rounded-none card",
    "hidden"
  ].join(" ").trim()}"><a href="/dashboard/branches"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-m765ut">Theaters</p></div></a> <a href="/dashboard/rooms"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-197psd7">Rooms</p></div></a> <a href="/dashboard/cities"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-145pmxs">Cities</p></div></a></div></div> <div role="tab" tabindex="0" class="relative "><div class="px-7 flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><i class="py-5 fa-solid fa-calendar h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-8miorn">Events</p></div> <div id="dropdownEvents" class="${[
    "flex flex-col absolute left-[14rem] w-[10rem] top-[0rem] rounded-none card",
    "hidden"
  ].join(" ").trim()}"><a href="/dashboard/sessions"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-dpqloq">Sessions</p></div></a> <a href="/dashboard/schedule"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-1cb5106">Schedule</p></div></a></div></div> <div role="tab" tabindex="0" class="relative "><div class="px-7 flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><i class="py-5 fa-solid fa-tag h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-1p0gpz0">Discounts</p></div> <div id="dropdownDiscounts" class="${[
    "flex flex-col absolute left-[14rem] w-[12rem] top-[0rem] rounded-none card",
    "hidden"
  ].join(" ").trim()}"><a href="/dashboard/age-discounts"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-8x1wlq">Age Discounts</p></div></a> <a href="/dashboard/day-discounts"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-olav2x">Day Discounts</p></div></a> <a href="/dashboard/discount-schedule"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-1tb2emi">Schedule</p></div></a></div></div> <div role="tab" tabindex="0" class="relative "><div class="px-7 flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><i class="py-5 fa-solid fa-ticket h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-n1ct49">Tickets</p></div> <div id="dropdownTickets" class="${[
    "flex flex-col absolute left-[14rem] w-[10rem] top-[0rem] rounded-none card",
    "hidden"
  ].join(" ").trim()}"><a href="/dashboard/tickets"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-kz3mv8">Tickets</p></div></a> <a href="/dashboard/ticket-types"><div class="flex flex-row items-center bg-gradient-to-br hover:variant-soft-surface"><p class="${[
    "font-bold h5 m-5",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-atg0co">Types</p></div></a></div></div> <a href="/dashboard/users"><div class="px-6 flex flex-row items-center hover:variant-soft-surface"><i class="py-5 fa-solid fa-users h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-14bn7di">Users</p></div></a> <a href="/"><div class="px-6 flex flex-row items-center hover:variant-soft-surface"><i class="py-5 fa fa-door-open h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-1ptizui">Exit</p></div></a> <a href="/dashboard/settings" class="fixed bottom-6"><div class="${[
    "px-6 flex flex-row items-center bg-gradient-to-br transition-all-500 delay-200",
    (isSelected("settings") ? "variant-gradient-tertiary-primary" : "") + " " + (!isSelected("settings") ? "hover:variant-soft-surface" : "") + " w-[5rem] "
  ].join(" ").trim()}"><i class="py-5 fa-solid fa-gear h3 w-20 "></i> <p class="${[
    "font-bold h5 fixed left-20 ",
    "opacity-0  hide-text"
  ].join(" ").trim()}" data-svelte-h="svelte-198z95l">Settings</p></div></a></aside> </div>`;
});
export {
  Layout as default
};
