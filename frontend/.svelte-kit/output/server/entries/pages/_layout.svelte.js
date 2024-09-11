import { c as create_ssr_component } from "../../chunks/ssr.js";
import { i as initializeDrawerStore } from "../../chunks/stores.js";
import "../../chunks/client.js";
import { w as writable } from "../../chunks/index.js";
import { s as storePopup } from "../../chunks/popup.js";
import { i as initializeModalStore } from "../../chunks/stores2.js";
import { i as initializeToastStore } from "../../chunks/stores3.js";
import "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
const storeHighlightJs = writable(void 0);
function initializeStores() {
  initializeModalStore();
  initializeToastStore();
  initializeDrawerStore();
}
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  initializeStores();
  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("css", css);
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("typescript", typescript);
  storeHighlightJs.set(hljs);
  storePopup.set({
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow
  });
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
