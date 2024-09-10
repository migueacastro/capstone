import { writable } from "svelte/store"

export const _fieldsStorage = writable([{type: null, value: null, name: null, tables: null}]);