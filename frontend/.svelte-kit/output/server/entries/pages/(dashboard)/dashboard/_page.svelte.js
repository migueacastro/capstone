import { a as compute_rest_props, s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, f as createEventDispatcher, o as onDestroy, g as spread, j as escape_attribute_value, h as escape_object, d as add_attribute, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { e as billStorage, f as staffStorage } from "../../../../chunks/cinema.js";
import moment from "moment";
import { SimpleBarChart, LineChart as LineChart$1, ScaleTypes } from "@carbon/charts";
const chartHolderCssClass = "cds--chart-holder";
const BaseChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["data", "options", "Chart", "chart", "ref", "id"]);
  let { data = [] } = $$props;
  let { options = {} } = $$props;
  let { Chart } = $$props;
  let { chart } = $$props;
  let { ref } = $$props;
  let { id = `chart-${Math.random().toString(36)}` } = $$props;
  const dispatch = createEventDispatcher();
  onDestroy(() => {
    if (chart) {
      dispatch("destroy");
      chart.components.forEach((component) => component.destroy());
      chart.model.set({ destroyed: true }, { skipUpdate: true });
      chart = void 0;
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.Chart === void 0 && $$bindings.Chart && Chart !== void 0) $$bindings.Chart(Chart);
  if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0) $$bindings.chart(chart);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  return `<div${spread(
    [
      { id: escape_attribute_value(id) },
      {
        class: escape_attribute_value(chartHolderCssClass)
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", ref, 0)}></div>`;
});
const BarChartSimple = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["options", "data", "chart", "ref"]);
  let { options } = $$props;
  let { data } = $$props;
  let { chart = void 0 } = $$props;
  let { ref = void 0 } = $$props;
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0) $$bindings.chart(chart);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(BaseChart, "BaseChart").$$render(
      $$result,
      Object.assign({}, $$restProps, { Chart: SimpleBarChart }, { options }, { data }, { ref }, { chart }),
      {
        ref: ($$value) => {
          ref = $$value;
          $$settled = false;
        },
        chart: ($$value) => {
          chart = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const LineChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["options", "data", "chart", "ref"]);
  let { options } = $$props;
  let { data } = $$props;
  let { chart = void 0 } = $$props;
  let { ref = void 0 } = $$props;
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0) $$bindings.chart(chart);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(BaseChart, "BaseChart").$$render(
      $$result,
      Object.assign({}, $$restProps, { Chart: LineChart$1 }, { options }, { data }, { ref }, { chart }),
      {
        ref: ($$value) => {
          ref = $$value;
          $$settled = false;
        },
        chart: ($$value) => {
          chart = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mostSoldMoviesChartData;
  let sellsChartData;
  let incomesThisMonth;
  let $billStorage, $$unsubscribe_billStorage;
  let $staffStorage, $$unsubscribe_staffStorage;
  $$unsubscribe_billStorage = subscribe(billStorage, (value) => $billStorage = value);
  $$unsubscribe_staffStorage = subscribe(staffStorage, (value) => $staffStorage = value);
  let movieObject;
  mostSoldMoviesChartData = [];
  sellsChartData = [];
  incomesThisMonth = 0;
  {
    if ($billStorage.length) {
      for (let bill of $billStorage) {
        if (bill?.session?.movie_name) {
          movieObject = mostSoldMoviesChartData.find((movieIterator) => movieIterator.movie == bill?.session?.movie_name);
          if (!movieObject) {
            mostSoldMoviesChartData = [
              ...mostSoldMoviesChartData,
              {
                movie: bill?.session?.movie_name,
                tickets: bill?.tickets?.length
              }
            ];
          } else {
            movieObject.tickets += bill?.tickets?.length;
          }
        }
      }
      sellsChartData = $billStorage.reduce(
        (acc, bill) => {
          const date = new Date(bill?.created_at);
          const existingDate = acc.find((item) => moment(item.date).date() === moment(date).date());
          if (existingDate) {
            existingDate.value += 1;
          } else {
            acc.push({ date, value: 1 });
          }
          return acc;
        },
        []
      );
      sellsChartData.sort((a, b) => Math.sign(a.date - b.date));
      for (let bill of $billStorage) {
        let month = new Date(bill?.created_at).getMonth();
        let year = new Date(bill?.created_at).getFullYear();
        if (month == (/* @__PURE__ */ new Date()).getMonth() && year == (/* @__PURE__ */ new Date()).getFullYear()) {
          incomesThisMonth += bill?.total;
        }
      }
    }
  }
  $$unsubscribe_billStorage();
  $$unsubscribe_staffStorage();
  return `<div class="container h-full mx-auto flex justify-startitems-start align-top flex-col"> <div class="p-4 pt-8 mx-4 w-[90%] lg:w-full mt-4 lg:p-10 flex flex-col"><h2 class="h1 text-start mb-4 w-full" data-svelte-h="svelte-hg57fd">Dashboard</h2> <div class="flex lg:flex-row flex-col"><div class="lg:w-[50%]"><div class="card mx-4 mt-4 p-4 shadow-lg"><p class="text-center h3 font-bold" data-svelte-h="svelte-10ocnw2">Most sold movies (Tickets)</p> ${validate_component(BarChartSimple, "BarChartSimple").$$render(
    $$result,
    {
      data: mostSoldMoviesChartData,
      options: {
        theme: "g90",
        title: "",
        height: "400px",
        axes: {
          left: { mapsTo: "tickets", scaleType: "linear" },
          bottom: { mapsTo: "movie", scaleType: "labels" }
        }
      }
    },
    {},
    {}
  )}</div></div> <div class="lg:w-[50%]"><div class="card mx-4 p-4 mt-4 shadow-lg"><p class="text-center h3 font-bold" data-svelte-h="svelte-100enp3">Incomes ($)</p> ${validate_component(LineChart, "LineChart").$$render(
    $$result,
    {
      data: sellsChartData,
      options: {
        theme: "g90",
        title: "",
        height: "400px",
        axes: {
          left: {
            mapsTo: "value",
            scaleType: ScaleTypes.LINEAR
          },
          bottom: {
            mapsTo: "date",
            scaleType: ScaleTypes.TIME
          }
        }
      }
    },
    {},
    {}
  )}</div></div></div></div> <div class="px-4 mx-4 w-[90%] lg:w-full lg:px-10 flex flex-col lg:flex-row"><div class="w-full flex flex-col lg:flex-row mb-5"><div class="card mx-4 lg:w-1/3 shadow-lg p-2 lg:p-3 my-2 mt-0 lg:my-0"><p class="text-center h3 font-bold" data-svelte-h="svelte-vusuq5">Sold tickets</p> <p class="text-center" data-svelte-h="svelte-1hip7be">This month</p> <p class="text-center h2 font-bold my-4">${escape($billStorage.length)}</p></div> <div class="card mx-4 lg:w-1/3 shadow-lg p-2 lg:p-3 my-2 lg:my-0"><p class="text-center h3 font-bold" data-svelte-h="svelte-6v91ac">Total incomes</p> <p class="text-center" data-svelte-h="svelte-1hip7be">This month</p> <p class="text-center h2 font-bold my-4">${escape(incomesThisMonth.toFixed(2))} $</p></div> <div class="card mx-4 lg:w-1/3 shadow-lg p-2 lg:p-3 my-2 lg:my-0"><p class="text-center h3 font-bold" data-svelte-h="svelte-1f4byhc">Staff Users</p> <a href="/dashboard/staff" class="anchor no-underline" data-svelte-h="svelte-11fiv4r"><p class="text-center">View all</p></a> <p class="text-center h2 font-bold my-4">${escape($staffStorage.length)}</p></div></div></div></div>`;
});
export {
  Page as default
};
