import { c as compute_slots, s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, e as escape, d as add_attribute, k as add_styles, f as createEventDispatcher, a as each, o as onDestroy, v as validate_component } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/client.js";
import { t as ticketTypeStorage } from "../../../../../chunks/cinema.js";
import { u as user } from "../../../../../chunks/auth.js";
import { p as public_env } from "../../../../../chunks/shared-server.js";
import { g as getToastStore } from "../../../../../chunks/stores3.js";
import "../../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import moment from "moment";
const css = {
  code: ".anim-indeterminate.svelte-12wvf64{transform-origin:0% 50%;animation:svelte-12wvf64-anim-indeterminate 2s infinite linear}@keyframes svelte-12wvf64-anim-indeterminate{0%{transform:translateX(0) scaleX(0)}40%{transform:translateX(0) scaleX(0.4)}100%{transform:translateX(100%) scaleX(0.5)}}",
  map: '{"version":3,"file":"ProgressBar.svelte","sources":["ProgressBar.svelte"],"sourcesContent":["<script>export let value = void 0;\\nexport let min = 0;\\nexport let max = 100;\\nexport let height = \\"h-2\\";\\nexport let rounded = \\"rounded-token\\";\\nexport let transition = \\"transition-[width]\\";\\nexport let animIndeterminate = \\"anim-indeterminate\\";\\nexport let meter = \\"bg-surface-900-50-token\\";\\nexport let track = \\"bg-surface-200-700-token\\";\\nexport let labelledby = \\"\\";\\nconst cTrack = \\"w-full overflow-hidden\\";\\nconst cMeter = \\"h-full\\";\\n$:\\n  fillPercent = value ? 100 * (value - min) / (max - min) : 0;\\n$:\\n  indeterminate = value === void 0 || value < 0;\\n$:\\n  classesIndeterminate = indeterminate ? animIndeterminate : \\"\\";\\n$:\\n  classesTrack = `${cTrack} ${track} ${height} ${rounded} ${$$props.class ?? \\"\\"}`;\\n$:\\n  classesMeter = `${cMeter} ${meter} ${rounded} ${classesIndeterminate} ${transition}`;\\n<\/script>\\n\\n<!-- Track -->\\n<div\\n\\tclass=\\"progress-bar {classesTrack}\\"\\n\\tdata-testid=\\"progress-bar\\"\\n\\trole=\\"progressbar\\"\\n\\taria-labelledby={labelledby}\\n\\taria-valuenow={value}\\n\\taria-valuemin={min}\\n\\taria-valuemax={max - min}\\n>\\n\\t<!-- Meter -->\\n\\t<div class=\\"progress-bar-meter {classesMeter}\\" style:width=\\"{indeterminate ? 100 : fillPercent}%\\"></div>\\n</div>\\n\\n<style>\\n\\t.anim-indeterminate {\\n\\t\\ttransform-origin: 0% 50%;\\n\\t\\tanimation: anim-indeterminate 2s infinite linear;\\n\\t}\\n\\t/* prettier-ignore */\\n\\t@keyframes anim-indeterminate {\\n\\t\\t0% { transform: translateX(0) scaleX(0); }\\n\\t\\t40% { transform: translateX(0) scaleX(0.4); }\\n\\t\\t100% { transform: translateX(100%) scaleX(0.5); }\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAuCC,kCAAoB,CACnB,gBAAgB,CAAE,EAAE,CAAC,GAAG,CACxB,SAAS,CAAE,iCAAkB,CAAC,EAAE,CAAC,QAAQ,CAAC,MAC3C,CAEA,WAAW,iCAAmB,CAC7B,EAAG,CAAE,SAAS,CAAE,WAAW,CAAC,CAAC,CAAC,OAAO,CAAC,CAAG,CACzC,GAAI,CAAE,SAAS,CAAE,WAAW,CAAC,CAAC,CAAC,OAAO,GAAG,CAAG,CAC5C,IAAK,CAAE,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,OAAO,GAAG,CAAG,CACjD"}'
};
const cTrack = "w-full overflow-hidden";
const cMeter = "h-full";
const ProgressBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fillPercent;
  let indeterminate;
  let classesIndeterminate;
  let classesTrack;
  let classesMeter;
  let { value = void 0 } = $$props;
  let { min = 0 } = $$props;
  let { max = 100 } = $$props;
  let { height = "h-2" } = $$props;
  let { rounded = "rounded-token" } = $$props;
  let { transition = "transition-[width]" } = $$props;
  let { animIndeterminate = "anim-indeterminate" } = $$props;
  let { meter = "bg-surface-900-50-token" } = $$props;
  let { track = "bg-surface-200-700-token" } = $$props;
  let { labelledby = "" } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.animIndeterminate === void 0 && $$bindings.animIndeterminate && animIndeterminate !== void 0) $$bindings.animIndeterminate(animIndeterminate);
  if ($$props.meter === void 0 && $$bindings.meter && meter !== void 0) $$bindings.meter(meter);
  if ($$props.track === void 0 && $$bindings.track && track !== void 0) $$bindings.track(track);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0) $$bindings.labelledby(labelledby);
  $$result.css.add(css);
  fillPercent = value ? 100 * (value - min) / (max - min) : 0;
  indeterminate = value === void 0 || value < 0;
  classesIndeterminate = indeterminate ? animIndeterminate : "";
  classesTrack = `${cTrack} ${track} ${height} ${rounded} ${$$props.class ?? ""}`;
  classesMeter = `${cMeter} ${meter} ${rounded} ${classesIndeterminate} ${transition}`;
  return ` <div class="${"progress-bar " + escape(classesTrack, true) + " svelte-12wvf64"}" data-testid="progress-bar" role="progressbar"${add_attribute("aria-labelledby", labelledby, 0)}${add_attribute("aria-valuenow", value, 0)}${add_attribute("aria-valuemin", min, 0)}${add_attribute("aria-valuemax", max - min, 0)}> <div class="${"progress-bar-meter " + escape(classesMeter, true) + " svelte-12wvf64"}"${add_styles({
    "width": `${indeterminate ? 100 : fillPercent}%`
  })}></div> </div>`;
});
const cBase = "progress-radial relative overflow-hidden";
const cBaseTrack = "fill-transparent";
const cBaseMeter = "fill-transparent -rotate-90 origin-[50%_50%]";
const baseSize = 512;
const ProgressRadial = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let $$slots = compute_slots(slots);
  let { value = void 0 } = $$props;
  let { stroke = 40 } = $$props;
  let { font = 56 } = $$props;
  let { strokeLinecap = "butt" } = $$props;
  let { transition = "transition-[stroke-dashoffset]" } = $$props;
  let { width = "w-36" } = $$props;
  let { meter = "stroke-surface-900 dark:stroke-surface-50" } = $$props;
  let { track = "stroke-surface-500/30" } = $$props;
  let { fill = "fill-token" } = $$props;
  let { labelledby = "" } = $$props;
  const radius = baseSize / 2 - stroke / 2;
  let circumference = radius;
  let dashoffset;
  function setProgress(percent) {
    circumference = radius * 2 * Math.PI;
    dashoffset = circumference - percent / 100 * circumference;
  }
  setProgress(0);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0) $$bindings.stroke(stroke);
  if ($$props.font === void 0 && $$bindings.font && font !== void 0) $$bindings.font(font);
  if ($$props.strokeLinecap === void 0 && $$bindings.strokeLinecap && strokeLinecap !== void 0) $$bindings.strokeLinecap(strokeLinecap);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.meter === void 0 && $$bindings.meter && meter !== void 0) $$bindings.meter(meter);
  if ($$props.track === void 0 && $$bindings.track && track !== void 0) $$bindings.track(track);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0) $$bindings.fill(fill);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0) $$bindings.labelledby(labelledby);
  classesBase = `${cBase} ${width} ${$$props.class ?? ""}`;
  return `  <figure class="${"progress-radial " + escape(classesBase, true)}" data-testid="progress-radial" role="meter"${add_attribute("aria-labelledby", labelledby, 0)}${add_attribute("aria-valuenow", value || 0, 0)}${add_attribute("aria-valuetext", value ? `${value}%` : "Indeterminate Spinner", 0)}${add_attribute("aria-valuemin", 0, 0)}${add_attribute("aria-valuemax", 100, 0)}> <svg viewBox="${"0 0 " + escape(baseSize, true) + " " + escape(baseSize, true)}" class="${["rounded-full", value === void 0 ? "animate-spin" : ""].join(" ").trim()}"><circle class="${"progress-radial-track " + escape(cBaseTrack, true) + " " + escape(track, true)}"${add_attribute("stroke-width", stroke, 0)}${add_attribute("r", radius, 0)} cx="50%" cy="50%"></circle><circle class="${"progress-radial-meter " + escape(cBaseMeter, true) + " " + escape(meter, true) + " " + escape(transition, true)}"${add_attribute("stroke-width", stroke, 0)}${add_attribute("r", radius, 0)} cx="50%" cy="50%"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_styles({
    "stroke-dasharray": `${circumference}
			${circumference}`,
    "stroke-dashoffset": dashoffset
  })}></circle>${value != void 0 && value >= 0 && $$slots.default ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-weight="bold"${add_attribute("font-size", font, 0)} class="${"progress-radial-text " + escape(fill, true)}">${slots.default ? slots.default({}) : ``}</text>` : ``}</svg></figure>`;
});
const SeatSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedSeats;
  let { value } = $$props;
  let { seats = 0 } = $$props;
  createEventDispatcher();
  const getLetter = (number) => {
    return String.fromCharCode(number + 64 + 1);
  };
  const getRightLetter = (number) => {
    return String.fromCharCode(number + 64);
  };
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.seats === void 0 && $$bindings.seats && seats !== void 0) $$bindings.seats(seats);
  if ($$props.getRightLetter === void 0 && $$bindings.getRightLetter && getRightLetter !== void 0) $$bindings.getRightLetter(getRightLetter);
  selectedSeats = [];
  {
    if (value) {
      value.forEach((row) => {
        row.forEach((slot) => {
          if (slot.status != "available") {
            seats--;
          }
        });
      });
    }
  }
  return `<div tabindex="-1" class="w-full my-8">${value ? `<div class="flex-row flex justify-center"><div class="flex flex-col">${each(value, (row, index) => {
    return `<div class="card w-8 h-8 variant-outline m-2 flex justify-center items-center">${escape(getLetter(value.length - 1 - index))}</div>`;
  })}</div> <div class="relative flex flex-col w-fit overflow-scroll"><div class="flex flex-col">${each(value, (row, rowIndex) => {
    return `<div role="button" tabindex="-1" class="flex flex-row relative w-fit ">${each(row, (seat, seatIndex) => {
      return `${seat.type == "space" ? `<div class="card w-8 h-8 m-2 variant-outline"></div>` : `${seat.status == "available" || seat.status == "selected" && selectedSeats.filter((seat2) => seat2[0] === rowIndex && seat2[1] === seatIndex).length > 0 ? `<button><div class="${[
        "card w-8 h-8 m-2 flex justify-center items-center",
        (seat.status == "available" ? "variant-filled-success" : "") + " " + (seat.status == "selected" && selectedSeats.filter((seat2) => seat2[0] === rowIndex && seat2[1] === seatIndex).length > 0 ? "variant-filled-warning" : "")
      ].join(" ").trim()}">${escape(seat.value)}</div> </button>` : `<div class="card w-8 h-8 m-2 flex justify-center items-center variant-filled-error">${escape(seat.value)} </div>`}`}`;
    })} </div>`;
  })}</div> <div class="card variant-filled-primary flex p-1 m-2 justify-center rounded-b-full w-full" data-svelte-h="svelte-zrl1ua">Screen</div></div></div>` : ``} <hr class="my-5r"> <div class="flex flex-row p-4 mx-auto">${each(selectedSeats, (seat) => {
    return `<div class="card flex flex-col relative w-[5rem] h-[5rem] items-center p-2 mx-2 shadow-xl"><div class="flex flex-row justify-start w-full "><button class="ml-0" data-svelte-h="svelte-1mt36sz"><i class="fa-solid fa-xmark"></i></button></div> <p>${escape(getRightLetter(seat[0] + 1))}-${escape(seat[1] + 1)}</p> </div>`;
  })}</div> <p class="text-end">Available seats: ${escape(seats)}</p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let session;
  let room;
  let branch;
  let selectedSeats;
  let initialTime;
  let timeLeft;
  let currentStep;
  let currentProgress;
  let sessionSocket;
  let $$unsubscribe_user;
  let $ticketTypeStorage, $$unsubscribe_ticketTypeStorage;
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_ticketTypeStorage = subscribe(ticketTypeStorage, (value) => $ticketTypeStorage = value);
  getToastStore();
  let { data } = $$props;
  let tickets = [];
  let movie;
  let ticketTypes = [];
  let total = 0;
  let subtotal = 0;
  `${public_env.PUBLIC_BACKEND_URL.split("//")[1]}/sessions/${data.id}`;
  let timeOutId = null;
  onDestroy(async () => {
    if (sessionSocket) {
      sessionSocket.close();
    }
    clearTimeout(timeOutId);
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  session = {};
  room = {};
  branch = {};
  movie = {};
  selectedSeats = [];
  initialTime = 2 * 60;
  timeLeft = initialTime;
  currentStep = 1;
  currentProgress = currentStep * 100 / 3;
  {
    if ($ticketTypeStorage.length) {
      ticketTypes = $ticketTypeStorage;
      for (let type of ticketTypes) {
        type.quantity = 0;
        type.price = branch?.standart_price - branch?.standart_price * type.discount_percentage / 100;
      }
    }
  }
  {
    if (currentStep == 3) {
      for (let type of ticketTypes) {
        if (type.quantity > 0) {
          let newTicket = {
            "type": type.id,
            "price": type.price,
            "quantity": type.quantity,
            "subtotal": type.price * type.quantity
          };
          subtotal += newTicket.subtotal;
          tickets = [...tickets, newTicket];
        }
      }
      {
        total = subtotal;
      }
    } else {
      subtotal = 0;
      total = 0;
      tickets = [];
    }
  }
  {
    if (sessionSocket) {
      sessionSocket.onmessage = (event) => {
        const data2 = JSON.parse(event.data);
        if (data2.type == "seat_reservation_update" && data2.data.session_id == session.id) {
          session = { ...session, seats: data2.data.seats };
        }
      };
      sessionSocket.onopen = (event) => {
        console.log("Connected to socket");
      };
      sessionSocket.onclose = (event) => {
        console.log("Disconnected from socket" + event.reason + " ");
      };
    }
  }
  sessionSocket = null;
  $$unsubscribe_user();
  $$unsubscribe_ticketTypeStorage();
  return `<div class="container mx-auto flex justify-start items-start align-top flex-col"><div class="card p-2 pt-8 mx-4 w-[90%] lg:w-full my-4 lg:my-16 lg:p-10 flex flex-col"><div class="w-[70%] my-5 mx-auto">${validate_component(ProgressBar, "ProgressBar").$$render($$result, { value: currentProgress, max: 100 }, {}, {})}</div> <div class="flex lg:flex-row flex-col-reverse"><div class="flex flex-col lg:w-[65%] card p-4 shadow-xl m-4">${validate_component(ProgressRadial, "ProgressRadial").$$render(
    $$result,
    {
      width: "w-16 lg:w-24",
      font: "85",
      stroke: 50,
      value: timeLeft / initialTime * 100
    },
    {},
    {
      default: () => {
        return `${escape(moment(timeLeft * 1e3).format("mm:ss"))}`;
      }
    }
  )} <div class="${["flex flex-col items-center", currentStep != 1 ? "hidden" : ""].join(" ").trim()}"><p class="h2 text-center mt-5" data-svelte-h="svelte-17ak3q8">Select your seats</p> ${session && sessionSocket ? `${validate_component(SeatSelection, "SeatSelection").$$render(
    $$result,
    {
      value: session?.seats,
      seats: session?.number_seats
    },
    {},
    {}
  )} ${selectedSeats.length > 0 ? `<div class="flex flex-row mx-auto">${selectedSeats.length > 1 ? `<p class="h3">You have selected ${escape(selectedSeats.length)} seats</p>` : `<p class="h3">You have selected ${escape(selectedSeats.length)} seat</p>`} <button class="btn variant-filled ml-5" data-svelte-h="svelte-1idfg3y">Next<i class="fa-solid fa-arrow-right ml-2"></i></button></div>` : ``}` : ``}</div> ${currentStep == 2 ? `<div class="flex flex-col items-center"><p class="h2 text-center my-5" data-svelte-h="svelte-w4i3m2">Select your tickets</p> <div class="table-container m-5"><table class="table"><thead data-svelte-h="svelte-k8mph1"><tr><th>Type</th> <th>Price</th> <th width="15">Quantity</th></tr></thead> <tbody>${each(ticketTypes, (ticketType) => {
    return `<tr><td>${escape(ticketType.name)}</td> <td>${escape(ticketType.price)} $</td> <td><input${add_attribute("id", "ticketType-" + ticketType.id, 0)} type="number" class="input [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none" min="0"></td> </tr>`;
  })}</tbody></table></div> <div class="flex flex-row my-2"><button class="btn variant-filled mx-2" data-svelte-h="svelte-1rsezzs"><i class="fa-solid fa-arrow-left mr-5"></i> Previous</button> ${`<button class="btn variant-filled ml-5" data-svelte-h="svelte-1u6v5gf">Next<i class="fa-solid fa-arrow-right ml-2"></i></button>`}</div></div>` : ``} <div class="${["flex flex-col items-center", currentStep != 3 ? "hidden" : ""].join(" ").trim()}"><p class="h2 text-center mt-5" data-svelte-h="svelte-3yzujb">Confirm your purchase</p> <div class="table-responsive my-4 lg:mt-8 w-full shadow-xl overflow-auto"><table class="table"><thead data-svelte-h="svelte-1mavptc"><tr><th class="px-5 py-2 h4">Type</th> <th class="px-5 py-2 h4 text-center">Price</th> <th class="px-5 py-2 h4 text-center">Quantity</th> <th class="px-5 py-2 h4 text-center">Subtotal</th></tr></thead> <tbody>${each(tickets, (ticket) => {
    return `<tr><td class="px-5 py-2 h5">${escape(ticketTypes.find((type) => type.id == ticket.type)?.name)}</td> <td class="px-5 py-2 h5 text-center">${escape(ticketTypes.find((type) => type.id == ticket.type)?.price)} $</td> <td class="px-5 py-2 h5 text-center">${escape(ticket.quantity)}</td> <td class="px-5 py-2 h5 text-center">${escape(ticket.subtotal)} $</td> </tr>`;
  })}</tbody> <tfoot>${``} <tr><td colspan="3" class="px-5 py-2 h4" data-svelte-h="svelte-1sqvq3t">Total</td> <td class="px-5 py-2 h4 font-bold text-center ">${escape(total.toFixed(2))} $</td></tr></tfoot></table></div> <p class="h3 text-center lg:hidden my-7"><strong data-svelte-h="svelte-1h3ll1s">Total:</strong> ${escape(total.toFixed(2))} $</p> <div class="my-5 lg:my-8 w-full"><p class="h3 mb-5 text-center" data-svelte-h="svelte-1teednr">Selected seats</p> <div class="flex flex-row p-4 mx-auto">${each(selectedSeats, (seat) => {
    return `<div class="card flex flex-col relative w-[5rem] h-[5rem] items-center p-2 mx-2 shadow-xl"><p>${escape(String.fromCharCode(seat[0] + 1 + 64))}-${escape(seat[1] + 1)}</p> </div>`;
  })}</div></div> <div class="flex flex-row my-2"><button class="btn variant-filled mx-2" data-svelte-h="svelte-x1ww1p"><i class="fa-solid fa-arrow-left mr-5"></i> Previous</button> <button class="btn variant-filled mx-2" data-svelte-h="svelte-1857cn7">Confirm</button></div></div></div> <div class="card p-4 flex flex-col items-center m-4 lg:w-[35%] shadow-xl"><h2 class="h2 my-3">${escape(movie?.name)}</h2> <img${add_attribute("src", movie?.image, 0)}${add_attribute("alt", movie?.name, 0)} class="h-[12rem] object-contain object-center rounded-md m-3"> <div class="grid grid-cols-2 w-full p-3 h5"><p data-svelte-h="svelte-87nn23"><strong>Date:</strong></p><p class="text-end">${escape(moment(session?.start_time, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY"))}</p> <p data-svelte-h="svelte-85spsv"><strong>Branch:</strong></p><p class="text-end">${escape(branch?.name)}</p> <p data-svelte-h="svelte-66ck3k"><strong>Start Time:</strong></p><p class="text-end">${escape(moment(session?.start_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm"))}</p> <p data-svelte-h="svelte-6ayr5n"><strong>Room:</strong></p><p class="text-end">${escape(room?.name)}</p></div></div></div></div></div>`;
});
export {
  Page as default
};
