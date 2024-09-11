import { s as subscribe } from "../../../../../../chunks/utils.js";
import { c as create_ssr_component, a as each, e as escape } from "../../../../../../chunks/ssr.js";
import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
import { s as storePopup } from "../../../../../../chunks/popup.js";
import { g as getToastStore } from "../../../../../../chunks/stores3.js";
import "../../../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { w as weekdayStorage, g as dayDiscountStorage } from "../../../../../../chunks/cinema.js";
/* empty css                                                               */
import "../../../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $weekdayStorage, $$unsubscribe_weekdayStorage;
  let $dayDiscountStorage, $$unsubscribe_dayDiscountStorage;
  $$unsubscribe_weekdayStorage = subscribe(weekdayStorage, (value) => $weekdayStorage = value);
  $$unsubscribe_dayDiscountStorage = subscribe(dayDiscountStorage, (value) => $dayDiscountStorage = value);
  storePopup.set({
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow
  });
  getToastStore();
  $$unsubscribe_weekdayStorage();
  $$unsubscribe_dayDiscountStorage();
  return `<div class="animate-show w-full"><p class="h1 text-start font-bold mb-5" data-svelte-h="svelte-1fxa52g">Discount Schedule</p> <div class="table-responsive"><table class="table"><thead><tr>${each($weekdayStorage, (weekday) => {
    return `<th class="text-center w-[14%]">${escape(weekday.name)}</th>`;
  })}</tr></thead> <tbody><tr>${each($weekdayStorage, (weekday) => {
    return `<td class="text-center">${!weekday.discount ? `<i class="fa fa-plus h2 anchor no-underline"></i> <div class="card p-6 shadow-md" data-popup="${"popupClick-weekday-" + escape(weekday.id, true)}"><p class="h3 font-bold mb-5" data-svelte-h="svelte-1nf6hve">Select a discount</p> ${each($dayDiscountStorage, (discount) => {
      return `<button class="h3 anchor no-underline">${escape(discount.name)}</button>`;
    })} </div>` : `${weekday.discount ? `${$dayDiscountStorage.find((discount) => discount.id === weekday.discount) ? `<p>${escape($dayDiscountStorage.find((discount) => discount.id === weekday.discount).name)}</p> <button data-svelte-h="svelte-1g7sb79"><i class="fa fa-xmark ml-2"></i> </button>` : ``}` : ``}`} </td>`;
  })}</tr></tbody></table></div></div>`;
});
export {
  Page as default
};
