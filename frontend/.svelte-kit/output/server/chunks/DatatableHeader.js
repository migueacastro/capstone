import { s as subscribe, g as get_store_value, n as noop } from "./utils.js";
import { c as create_ssr_component, e as escape, d as add_attribute, a as each, v as validate_component } from "./ssr.js";
import { g as getModalStore } from "./stores2.js";
import { g as getToastStore } from "./stores3.js";
import "./ProgressBar.svelte_svelte_type_style_lang.js";
import { w as writable, d as derived } from "./index.js";
/* empty css                                        */
import "./client.js";
import { p as page } from "./stores4.js";
const RowCount = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $rowCount, $$unsubscribe_rowCount;
  let { handler } = $$props;
  const rowCount = handler.getRowCount();
  $$unsubscribe_rowCount = subscribe(rowCount, (value) => $rowCount = value);
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
  $$unsubscribe_rowCount();
  return `<aside class="text-sm leading-8 mr-6">${$rowCount.total > 0 ? `<b>${escape($rowCount.start)}</b>
		- <b>${escape($rowCount.end)}</b>
		/ <b>${escape($rowCount.total)}</b>` : `No entries found`}</aside>`;
});
const ThSort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sorted, $$unsubscribe_sorted;
  let { handler } = $$props;
  let { orderBy } = $$props;
  const sorted = handler.getSort();
  $$unsubscribe_sorted = subscribe(sorted, (value) => $sorted = value);
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
  if ($$props.orderBy === void 0 && $$bindings.orderBy && orderBy !== void 0) $$bindings.orderBy(orderBy);
  $$unsubscribe_sorted();
  return `<th class="cursor-pointer select-none"><div class="flex h-full items-center justify-start gap-x-2">${slots.default ? slots.default({}) : ``} ${$sorted.identifier === orderBy ? `${$sorted.direction === "asc" ? `↓` : `${$sorted.direction === "desc" ? `↑` : ``}`}` : `↕`}</div></th>`;
});
const ThFilter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { handler } = $$props;
  let { filterBy } = $$props;
  let value;
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
  if ($$props.filterBy === void 0 && $$bindings.filterBy && filterBy !== void 0) $$bindings.filterBy(filterBy);
  return `<th><input class="input text-sm w-full" type="text" placeholder="Filter"${add_attribute("value", value, 0)}></th>`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { handler } = $$props;
  let value;
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
  return `<input class="input sm:w-64 w-36" type="search" placeholder="Search..."${add_attribute("value", value, 0)}>`;
});
const RowsPerPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_rowsPerPage;
  let { handler } = $$props;
  const rowsPerPage = handler.getRowsPerPage();
  $$unsubscribe_rowsPerPage = subscribe(rowsPerPage, (value) => value);
  const options = [5, 10, 20, 50, 100];
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
  $$unsubscribe_rowsPerPage();
  return `<aside class="flex place-items-center">Show
	<select class="select ml-2">${each(options, (option) => {
    return `<option${add_attribute("value", option, 0)}>${escape(option)} </option>`;
  })}</select></aside>`;
});
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $pageNumber, $$unsubscribe_pageNumber;
  let $pages, $$unsubscribe_pages;
  let $pageCount, $$unsubscribe_pageCount;
  let { handler } = $$props;
  const pageNumber = handler.getPageNumber();
  $$unsubscribe_pageNumber = subscribe(pageNumber, (value) => $pageNumber = value);
  const pageCount = handler.getPageCount();
  $$unsubscribe_pageCount = subscribe(pageCount, (value) => $pageCount = value);
  const pages = handler.getPages({ ellipsis: true });
  $$unsubscribe_pages = subscribe(pages, (value) => $pages = value);
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
  $$unsubscribe_pageNumber();
  $$unsubscribe_pages();
  $$unsubscribe_pageCount();
  return ` <section class="btn-group variant-ghost-surface [&amp;>*+*]:border-surface-500 h-10 hidden lg:block"><button type="button" class="${["hover:variant-soft-primary", $pageNumber === 1 ? "disabled" : ""].join(" ").trim()}" data-svelte-h="svelte-4wopud">←</button> ${each($pages, (page2) => {
    return `<button type="button" class="${[
      "hover:variant-soft-primary",
      ($pageNumber === page2 ? "active" : "") + " " + (page2 === null ? "ellipse" : "")
    ].join(" ").trim()}">${escape(page2 ?? "...")} </button>`;
  })} <button type="button" class="${["hover:variant-soft-primary", $pageNumber === $pageCount ? "disabled" : ""].join(" ").trim()}" data-svelte-h="svelte-qpr6ty">→</button></section>  <section class="lg:hidden"><button type="button" class="${[
    "btn variant-ghost-surface mr-2 mb-2 hover:variant-soft-primary",
    $pageNumber === 1 ? "disabled" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-1o27j1k">←</button> <button type="button" class="${[
    "btn variant-ghost-surface mb-2 hover:variant-soft-primary",
    $pageNumber === $pageCount ? "disabled" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-r4bvtf">→</button></section>`;
});
const isNull$1 = (value) => {
  if (value === null || value === void 0 || value === "")
    return true;
  return false;
};
const isNotNull = (value) => {
  return !isNull$1(value);
};
const parseField = (field, uid) => {
  const identifier = uid ?? field.toString();
  if (typeof field === "string") {
    return {
      callback: (row) => row[field],
      identifier,
      key: field
    };
  } else if (typeof field === "function") {
    return {
      callback: field,
      identifier,
      key: void 0
    };
  }
  throw new Error(`Invalid field argument: ${String(field)}`);
};
const check = {
  isLike: (entry, value) => {
    return stringify(entry).indexOf(stringify(value)) > -1;
  },
  isNotLike: (entry, value) => {
    return stringify(entry).indexOf(stringify(value)) === -1;
  },
  startsWith: (entry, value) => {
    return stringify(entry).startsWith(stringify(value));
  },
  endsWith: (entry, value) => {
    return stringify(entry).endsWith(stringify(value));
  },
  isEqualTo: (entry, value) => {
    return stringify(entry) === stringify(value);
  },
  isNotEqualTo: (entry, value) => {
    return stringify(entry) !== stringify(value);
  },
  isGreaterThan: (entry, value) => {
    if (isNull(entry))
      return false;
    return entry > value;
  },
  isGreaterThanOrEqualTo: (entry, value) => {
    if (isNull(entry))
      return false;
    return entry >= value;
  },
  isLessThan: (entry, value) => {
    if (isNull(entry))
      return false;
    return entry < value;
  },
  isLessThanOrEqualTo: (entry, value) => {
    if (isNull(entry))
      return false;
    return entry <= value;
  },
  isBetween: (entry, value) => {
    if (isNull(entry))
      return false;
    const [min, max] = value;
    return entry >= min && entry <= max;
  },
  isStrictlyBetween: (entry, value) => {
    if (isNull(entry))
      return false;
    const [min, max] = value;
    return entry > min && entry < max;
  },
  isTrue: (entry, _) => {
    return entry === true;
  },
  isFalse: (entry, _) => {
    return entry === false;
  },
  isNull: (entry, _) => {
    return entry === null || entry === void 0;
  },
  isNotNull: (entry, _) => {
    return entry === null || entry === void 0 ? false : true;
  },
  whereIn: (entry, values = []) => {
    if (isNull(entry))
      return false;
    if (values.length === 0)
      return false;
    for (const { value, comparator } of values) {
      if (comparator(entry, value)) {
        return true;
      }
    }
    return false;
  },
  /**
   * @deprecated use "isLike" instead
   * @since 1.12.7 2023-09-27
   */
  contains: (entry, value) => {
    return check.isLike(entry, value);
  }
};
function stringify(value = null) {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function isNull(entry) {
  if (entry === null || entry === void 0)
    return true;
}
class EventHandler {
  events = {
    change: [],
    clearFilters: [],
    clearSearch: []
  };
  triggerChange = writable(0);
  // legacy
  add(event, callback) {
    this.events[event].push(callback);
  }
  trigger(event) {
    for (const callback of this.events[event]) {
      callback();
    }
    if (event === "change") {
      this.triggerChange.update((store) => {
        return store + 1;
      });
    }
  }
}
class Context {
  event;
  rowsPerPage;
  pageNumber;
  search;
  filters;
  filterCount;
  rawRows;
  filteredRows;
  pagedRows;
  rowCount;
  pages;
  pagesWithEllipsis;
  pageCount;
  sort;
  selected;
  selectScope;
  isAllSelected;
  constructor(data, params) {
    this.event = new EventHandler();
    this.rowsPerPage = writable(params.rowsPerPage);
    this.pageNumber = writable(1);
    this.search = writable({});
    this.filters = writable([]);
    this.filterCount = this.createFilterCount();
    this.rawRows = writable(data);
    this.filteredRows = this.createFilteredRows();
    this.pagedRows = this.createPagedRows();
    this.rowCount = this.createRowCount();
    this.pages = this.createPages();
    this.pagesWithEllipsis = this.createPagesWithEllipsis();
    this.pageCount = this.createPageCount();
    this.sort = writable({});
    this.selected = writable([]);
    this.selectScope = writable("all");
    this.isAllSelected = this.createIsAllSelected();
  }
  createFilterCount() {
    return derived(this.filters, ($filters) => $filters.length);
  }
  createFilteredRows() {
    return derived([this.rawRows, this.search, this.filters], ([$rawRows, $search, $filters]) => {
      if ($search.value) {
        $rawRows = $rawRows.filter((row) => {
          const fields = $search.scope ?? Object.keys(row);
          const scope = fields.map((field) => {
            const { callback } = parseField(field);
            return callback;
          });
          return scope.some((callback) => {
            return this.match(callback(row), $search.value);
          });
        });
        this.pageNumber.set(1);
        this.selected.set([]);
        this.event.trigger("change");
      }
      if ($filters.length > 0) {
        $filters.forEach((filter) => {
          return $rawRows = $rawRows.filter((row) => {
            const entry = filter.callback(row);
            return this.match(entry, filter.value, filter.comparator);
          });
        });
        this.pageNumber.set(1);
        this.selected.set([]);
        this.event.trigger("change");
      }
      return $rawRows;
    });
  }
  match(entry, value, compare = null) {
    if (isNull$1(value)) {
      return true;
    }
    if (!entry && compare) {
      return compare(entry, value);
    }
    if (!entry)
      return check.isLike(entry, value);
    else if (typeof entry === "object") {
      return Object.keys(entry).some((k) => {
        return this.match(entry[k], value, compare);
      });
    }
    if (!compare)
      return check.isLike(entry, value);
    return compare(entry, value);
  }
  createPagedRows() {
    return derived([this.filteredRows, this.rowsPerPage, this.pageNumber], ([$filteredRows, $rowsPerPage, $pageNumber]) => {
      if (!$rowsPerPage) {
        return $filteredRows;
      }
      return $filteredRows.slice(($pageNumber - 1) * $rowsPerPage, $pageNumber * $rowsPerPage);
    });
  }
  createRowCount() {
    return derived([this.filteredRows, this.pageNumber, this.rowsPerPage], ([$filteredRows, $pageNumber, $rowsPerPage]) => {
      const total = $filteredRows.length;
      if (!$rowsPerPage) {
        return { total, start: 1, end: total };
      }
      return {
        total,
        start: $pageNumber * $rowsPerPage - $rowsPerPage + 1,
        end: Math.min($pageNumber * $rowsPerPage, $filteredRows.length)
      };
    });
  }
  createPages() {
    return derived([this.rowsPerPage, this.filteredRows], ([$rowsPerPage, $filteredRows]) => {
      if (!$rowsPerPage) {
        return [1];
      }
      const pages = Array.from(Array(Math.ceil($filteredRows.length / $rowsPerPage)));
      return pages.map((_, i) => i + 1);
    });
  }
  createPagesWithEllipsis() {
    return derived([this.pages, this.pageNumber], ([$pages, $pageNumber]) => {
      if ($pages.length <= 7) {
        return $pages;
      }
      const ellipse = null;
      const firstPage = 1;
      const lastPage = $pages.length;
      if ($pageNumber <= 4) {
        return [
          ...$pages.slice(0, 5),
          ellipse,
          lastPage
        ];
      } else if ($pageNumber < $pages.length - 3) {
        return [
          firstPage,
          ellipse,
          ...$pages.slice($pageNumber - 2, $pageNumber + 1),
          ellipse,
          lastPage
        ];
      } else {
        return [
          firstPage,
          ellipse,
          ...$pages.slice($pages.length - 5, $pages.length)
        ];
      }
    });
  }
  createPageCount() {
    return derived(this.pages, ($pages) => {
      return $pages.length;
    });
  }
  createIsAllSelected() {
    return derived([this.selected, this.pagedRows, this.filteredRows, this.selectScope], ([$selected, $pagedRows, $filteredRows, $selectScope]) => {
      const rowCount = $selectScope === "currentPage" ? $pagedRows.length : $filteredRows.length;
      if (rowCount === $selected.length && rowCount !== 0) {
        return true;
      }
      return false;
    });
  }
}
class SortHandler {
  rawRows;
  event;
  sort;
  backup;
  constructor(context) {
    this.rawRows = context.rawRows;
    this.event = context.event;
    this.sort = context.sort;
    this.backup = [];
  }
  set(orderBy = null, uid) {
    if (!orderBy)
      return;
    const sort = get_store_value(this.sort);
    const { identifier } = parseField(orderBy, uid);
    if (sort.identifier !== identifier) {
      this.sort.update((store) => store.direction = null);
    }
    if (sort.direction === null || sort.direction === "desc") {
      this.asc(orderBy, uid);
    } else if (sort.direction === "asc") {
      this.desc(orderBy, uid);
    }
  }
  asc(orderBy, uid) {
    if (!orderBy)
      return;
    const { identifier, callback, key } = parseField(orderBy, uid);
    this.sort.set({ identifier, callback, direction: "asc", key });
    this.rawRows.update((store) => {
      store.sort((x, y) => {
        const [a, b] = [callback(x), callback(y)];
        if (a === b)
          return 0;
        if (a === null)
          return 1;
        if (b === null)
          return -1;
        if (typeof a === "boolean")
          return a === false ? 1 : -1;
        if (typeof a === "string")
          return a.localeCompare(b);
        if (typeof a === "number")
          return a - b;
        if (typeof a === "object")
          return JSON.stringify(a).localeCompare(JSON.stringify(b));
        else
          return String(a).localeCompare(String(b));
      });
      return store;
    });
    this.log({ identifier, callback, direction: "asc" });
    this.event.trigger("change");
  }
  desc(orderBy, uid) {
    if (!orderBy)
      return;
    const { identifier, callback, key } = parseField(orderBy, uid);
    this.sort.set({ identifier, callback, direction: "desc", key });
    this.rawRows.update((store) => {
      store.sort((x, y) => {
        const [a, b] = [callback(x), callback(y)];
        if (a === b)
          return 0;
        if (a === null)
          return 1;
        if (b === null)
          return -1;
        if (typeof b === "boolean")
          return b === false ? 1 : -1;
        if (typeof b === "string")
          return b.localeCompare(a);
        if (typeof b === "number")
          return b - a;
        if (typeof b === "object")
          return JSON.stringify(b).localeCompare(JSON.stringify(a));
        else
          return String(b).localeCompare(String(a));
      });
      return store;
    });
    this.log({ identifier, callback, direction: "desc" });
    this.event.trigger("change");
  }
  apply(params = null) {
    if (params) {
      switch (params.direction) {
        case "asc":
          return this.asc(params.orderBy);
        case "desc":
          return this.desc(params.orderBy);
        default:
          return this.set(params.orderBy);
      }
    } else {
      this.restore();
    }
  }
  clear() {
    this.backup = [];
    this.sort.set({});
  }
  define(orderBy, direction = "asc") {
    if (!orderBy)
      return;
    const { identifier, callback, key } = parseField(orderBy);
    this.sort.set({ identifier, callback, direction, key });
  }
  restore() {
    for (const sort of this.backup) {
      const { key, callback, direction } = sort;
      const param = key ?? callback;
      this[direction](param);
    }
  }
  log(sort) {
    this.backup = this.backup.filter((item) => item.identifier !== sort.identifier);
    if (this.backup.length >= 3) {
      const [_, slot2, slot3] = this.backup;
      this.backup = [slot2, slot3, sort];
    } else {
      this.backup = [...this.backup, sort];
    }
  }
}
class SelectHandler {
  filteredRows;
  pagedRows;
  selected;
  scope;
  isAllSelected;
  event;
  constructor(context) {
    this.filteredRows = context.filteredRows;
    this.pagedRows = context.pagedRows;
    this.selected = context.selected;
    this.scope = context.selectScope;
    this.isAllSelected = context.isAllSelected;
    this.event = context.event;
  }
  set(value) {
    const selected = get_store_value(this.selected);
    if (selected.includes(value)) {
      this.selected.set(selected.filter((item) => item !== value));
    } else {
      this.selected.set([value, ...selected]);
    }
  }
  all(selectBy = null) {
    const isAllSelected = get_store_value(this.isAllSelected);
    if (isAllSelected) {
      return this.clear();
    }
    const scope = get_store_value(this.scope);
    const rows = scope === "currentPage" ? get_store_value(this.pagedRows) : get_store_value(this.filteredRows);
    if (scope === "currentPage") {
      this.event.add("change", () => this.clear());
    }
    if (selectBy) {
      this.selected.set(rows.map((row) => row[selectBy]));
    } else {
      this.selected.set(rows);
    }
  }
  clear() {
    this.selected.set([]);
  }
}
class PageHandler {
  pageNumber;
  rowCount;
  rowsPerPage;
  event;
  constructor(context) {
    this.pageNumber = context.pageNumber;
    this.rowCount = context.rowCount;
    this.rowsPerPage = context.rowsPerPage;
    this.event = context.event;
  }
  goto(number) {
    this.pageNumber.update((store) => {
      const rowsPerPage = get_store_value(this.rowsPerPage);
      if (rowsPerPage) {
        const total = get_store_value(this.rowCount).total;
        if (number >= 1 && number <= Math.ceil(total / rowsPerPage)) {
          store = number;
          this.event.trigger("change");
        }
      }
      return store;
    });
  }
  previous() {
    const number = get_store_value(this.pageNumber) - 1;
    this.goto(number);
  }
  next() {
    const number = get_store_value(this.pageNumber) + 1;
    this.goto(number);
  }
}
class SearchHandler {
  search;
  event;
  constructor(context) {
    this.search = context.search;
    this.event = context.event;
  }
  set(value, scope = null) {
    this.search.update((store) => {
      store = {
        value: value ?? "",
        scope: scope ?? null
      };
      return store;
    });
  }
  clear() {
    this.search.set({ value: null, scope: null });
    this.event.trigger("change");
    this.event.trigger("clearSearch");
  }
}
class FilterHandler {
  filters;
  event;
  collection;
  constructor(context) {
    this.filters = context.filters;
    this.event = context.event;
  }
  set(value, filterBy, comparator = null, name) {
    const { callback, identifier, key } = parseField(filterBy, name);
    const filter = { value, identifier, callback, comparator, key };
    this.filters.update((store) => {
      store = store.filter((item) => item.identifier !== identifier);
      if (isNotNull(value)) {
        store.push(filter);
      }
      return store;
    });
  }
  clear() {
    this.filters.set([]);
    this.event.trigger("change");
    this.event.trigger("clearFilters");
  }
  get() {
    if (this.collection) {
      return this.collection;
    }
    this.collection = this.createCollection();
    return this.collection;
  }
  createCollection() {
    return derived(this.filters, ($filters) => {
      return $filters.map(({ value, callback, key, comparator }) => {
        const filterBy = key ?? callback;
        return {
          value,
          filterBy,
          check: comparator ? comparator.name : "isLike"
          // set: (value: Value, comparator: Comparator<Row> = check.isLike) => {
          //     this.set(value, filterBy, comparator)
          // },
          // clear: () => {
          //     this.set(undefined, filterBy)
          // }
        };
      });
    });
  }
}
class FilterHelper {
  filterHandler;
  filterBy;
  uid;
  comparator;
  callback;
  constructor(filterHandler, filterBy, comparator) {
    this.filterHandler = filterHandler;
    this.filterBy = filterBy;
    this.uid = "f_" + Math.random().toString(28).substring(2);
    this.comparator = comparator ?? check.isLike;
    this.callback = () => null;
  }
  set(value, comparator) {
    if (comparator) {
      this.comparator = comparator;
    }
    this.filterHandler.set(value, this.filterBy, this.comparator, this.uid);
  }
  clear() {
    this.callback();
    this.filterHandler.set(void 0, this.filterBy);
  }
  on(event, callback) {
    this.callback = callback;
  }
}
class AdvancedFilterHandler {
  filterHandler;
  criteria;
  filterBy;
  selected;
  constructor(filterHandler, filterBy) {
    this.filterHandler = filterHandler;
    this.filterBy = filterBy;
    this.criteria = [];
    this.selected = writable([]);
  }
  set(value, comparator = check.isLike) {
    if (this.criteria.find((criterion) => criterion.value === value)) {
      this.criteria = this.criteria.filter((criterion) => criterion.value !== value);
    } else {
      this.criteria = [{ value, comparator }, ...this.criteria];
    }
    if (this.criteria.length === 0) {
      return this.clear();
    }
    this.filterHandler.set(this.criteria, this.filterBy, check.whereIn);
    this.selected.set(this.criteria.map((criterion) => criterion.value));
  }
  getSelected() {
    return this.selected;
  }
  clear() {
    this.criteria = [];
    this.selected.set([]);
    this.filterHandler.set(void 0, this.filterBy, check.whereIn);
  }
}
class CalcultationHandler {
  rawRows;
  filteredRows;
  callback;
  precision;
  constructor(context, field, param) {
    this.rawRows = context.rawRows;
    this.filteredRows = context.filteredRows;
    this.callback = parseField(field).callback;
    this.precision = param.precision;
  }
  distinct(callback = null) {
    const rawRows = get_store_value(this.rawRows);
    const values = rawRows.map((row) => this.callback(row));
    const array = callback ? callback(values) : values;
    const result = array.reduce((acc, curr) => {
      acc[curr] = (acc[curr] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(result).map(([value, count]) => ({ value, count }));
  }
  avg(callback = null) {
    return derived(this.filteredRows, ($filteredRows) => {
      if ($filteredRows.length === 0)
        return 0;
      const values = $filteredRows.map((row) => this.callback(row)).filter(Boolean);
      const array = callback ? callback(values) : values;
      return this.round(array.reduce((acc, curr) => acc + curr, 0) / array.length);
    });
  }
  sum(callback = null) {
    return derived(this.filteredRows, ($filteredRows) => {
      const values = $filteredRows.map((row) => this.callback(row));
      const array = callback ? callback(values) : values;
      return this.round(array.reduce((acc, curr) => acc + curr, 0));
    });
  }
  bounds(callback = null) {
    const rawRows = get_store_value(this.rawRows);
    const values = rawRows.map((row) => this.callback(row));
    const numbers = callback ? callback(values) : values;
    return [
      Math.min(...numbers.filter(Boolean)),
      Math.max(...numbers.filter(Boolean))
    ];
  }
  setPrecision(value) {
    this.precision = value;
  }
  round(value) {
    if (this.precision === 0) {
      return Math.round(value);
    }
    const denominator = Math.pow(10, this.precision);
    return Math.round((value + Number.EPSILON) * denominator) / denominator;
  }
}
class DataHandler {
  context;
  sortHandler;
  selectHandler;
  pageHandler;
  searchHandler;
  filterHandler;
  i18n;
  constructor(data = [], params = { rowsPerPage: null }) {
    this.i18n = this.translate(params.i18n);
    this.context = new Context(data, params);
    this.sortHandler = new SortHandler(this.context);
    this.selectHandler = new SelectHandler(this.context);
    this.pageHandler = new PageHandler(this.context);
    this.searchHandler = new SearchHandler(this.context);
    this.filterHandler = new FilterHandler(this.context);
  }
  setRows(data) {
    this.context.rawRows.set(data);
    this.context.event.trigger("change");
    this.applySort();
  }
  getRows() {
    return this.context.pagedRows;
  }
  getAllRows() {
    return this.context.filteredRows;
  }
  getRowCount() {
    return this.context.rowCount;
  }
  getRowsPerPage() {
    return this.context.rowsPerPage;
  }
  getPages(param = { ellipsis: false }) {
    if (param.ellipsis) {
      return this.context.pagesWithEllipsis;
    }
    return this.context.pages;
  }
  getPageCount() {
    return this.context.pageCount;
  }
  getPageNumber() {
    return this.context.pageNumber;
  }
  setPage(value) {
    switch (value) {
      case "previous":
        return this.pageHandler.previous();
      case "next":
        return this.pageHandler.next();
      default:
        return this.pageHandler.goto(value);
    }
  }
  search(value, scope = null) {
    this.searchHandler.set(value, scope);
  }
  clearSearch() {
    this.searchHandler.clear();
  }
  sort(orderBy, identifier) {
    this.setPage(1);
    this.sortHandler.set(orderBy, identifier);
  }
  sortAsc(orderBy, identifier) {
    this.setPage(1);
    this.sortHandler.asc(orderBy, identifier);
  }
  sortDesc(orderBy, identifier) {
    this.setPage(1);
    this.sortHandler.desc(orderBy, identifier);
  }
  getSort() {
    return this.context.sort;
  }
  applySort(params = null) {
    this.sortHandler.apply(params);
  }
  defineSort(orderBy, direction) {
    this.sortHandler.define(orderBy, direction);
  }
  clearSort() {
    this.sortHandler.clear();
  }
  filter(value, filterBy, comparator = null) {
    this.filterHandler.set(value, filterBy, comparator);
  }
  getFilters() {
    return this.filterHandler.get();
  }
  createFilter(filterBy, comparator) {
    return new FilterHelper(this.filterHandler, filterBy, comparator);
  }
  createAdvancedFilter(filterBy) {
    return new AdvancedFilterHandler(this.filterHandler, filterBy);
  }
  getFilterCount() {
    return this.context.filterCount;
  }
  clearFilters() {
    this.filterHandler.clear();
  }
  select(value) {
    this.selectHandler.set(value);
  }
  getSelected() {
    return this.context.selected;
  }
  selectAll(params = {}) {
    this.context.selectScope.set(params.scope === "currentPage" ? "currentPage" : "all");
    this.selectHandler.all(params.selectBy ?? null);
  }
  isAllSelected() {
    return this.context.isAllSelected;
  }
  on(event, callback) {
    this.context.event.add(event, callback);
  }
  createCalculation(field, param = null) {
    return new CalcultationHandler(this.context, field, { precision: param?.precision ?? 2 });
  }
  translate(i18n) {
    return {
      ...{
        search: "Search...",
        show: "Show",
        entries: "entries",
        filter: "Filter",
        rowCount: "Showing {start} to {end} of {total} entries",
        noRows: "No entries found",
        previous: "Previous",
        next: "Next"
      },
      ...i18n
    };
  }
  /**
   * @deprecated use setRows() instead
   * @since v0.9.99 2023-01-16
   */
  update(data) {
    console.log("%c%s", "color:#e65100;background:#fff3e0;font-size:12px;border-radius:4px;padding:4px;text-align:center;", `DataHandler.update(data) method is deprecated. Please use DataHandler.setRows(data) instead`);
    this.context.rawRows.set(data);
  }
  /**
   * @deprecated use applySort() instead
   * @since v1.11.0 2023-07-11
   */
  applySorting(params = null) {
    this.applySort(params);
  }
  /**
   * @deprecated use getSort() instead
   * @since v1.11.0 2023-07-11
   */
  getSorted() {
    return this.getSort();
  }
  getTriggerChange() {
    return this.context.event.triggerChange;
  }
}
const Datatable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $rows, $$unsubscribe_rows = noop, $$subscribe_rows = () => ($$unsubscribe_rows(), $$unsubscribe_rows = subscribe(rows, ($$value) => $rows = $$value), rows);
  getModalStore();
  let { endpoint = "" } = $$props;
  let { fields = [] } = $$props;
  getToastStore();
  let data = [{}];
  let handler = new DataHandler(data, { rowsPerPage: 5 });
  let rows = handler.getRows();
  $$subscribe_rows();
  endpoint.split("/").slice(-1)[0];
  if ($$props.endpoint === void 0 && $$bindings.endpoint && endpoint !== void 0) $$bindings.endpoint(endpoint);
  if ($$props.fields === void 0 && $$bindings.fields && fields !== void 0) $$bindings.fields(fields);
  $$unsubscribe_rows();
  return `<div class="overflow-x-auto space-y-4"> <header class="flex justify-between gap-4">${validate_component(Search, "Search").$$render($$result, { handler }, {}, {})} ${validate_component(RowsPerPage, "RowsPerPage").$$render($$result, { handler }, {}, {})}</header>  <table class="table table-hover table-compact w-full table-auto"><thead><tr>${each(fields, (field) => {
    return `${validate_component(ThSort, "ThSort").$$render($$result, { handler, orderBy: field }, {}, {
      default: () => {
        return `${escape(field.replace(/_name/g, " ").replace(/_/g, " "))}`;
      }
    })}`;
  })} <td></td></tr> <tr>${each(fields, (field) => {
    return `${field === "image" ? `${validate_component(ThFilter, "ThFilter").$$render($$result, {}, {}, {})}` : `${validate_component(ThFilter, "ThFilter").$$render($$result, { handler, filterBy: field }, {}, {})}`}`;
  })} <td></td></tr></thead> <tbody>${each($rows, (row) => {
    return `<tr>${each(fields, (field) => {
      return `${field === "image" ? `<td><button class="z-20"><img class="mx-auto break-words lg:max-w-32 lg:h-[10vh] object-cover"${add_attribute("src", row[field], 0)}${add_attribute("alt", field, 0)}></button></td>` : `<td class="text-justify indent-2 text-wrap">${escape(row[field])}</td>`}`;
    })} <td class="flex flex-row gap-3 mx-2"><button data-svelte-h="svelte-vahs1s"><i class="fa-solid fa-pen-to-square text-2xl"></i></button> <button data-svelte-h="svelte-j8zve3"><i class="fa-solid fa-xmark text-2xl"></i></button></td> </tr>`;
  })}</tbody></table>  <footer class="flex justify-between">${validate_component(RowCount, "RowCount").$$render($$result, { handler }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, { handler }, {}, {})}</footer></div>`;
});
const DatatableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { title = "" } = $$props;
  let url = $page.url + "/add";
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  $$unsubscribe_page();
  return `<div class="flex flex-row items-center gap-4"><h2 class="h1 text-start mb-4 w-full">${escape(title)}</h2> <div class="flex flex-row"><a${add_attribute("href", url, 0)} class="btn variant-filled h-fit w-fit mx-auto lg:btn-xl justify-end"><i class="fa-solid fa-plus mr-2"></i>Add</a></div></div>`;
});
export {
  DatatableHeader as D,
  Datatable as a
};
