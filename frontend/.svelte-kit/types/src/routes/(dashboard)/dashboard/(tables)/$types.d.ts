import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/(dashboard)/dashboard/(tables)';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type LayoutRouteId = RouteId | "/(dashboard)/dashboard/(tables)/age-discounts" | "/(dashboard)/dashboard/(tables)/age-discounts/[id]" | "/(dashboard)/dashboard/(tables)/age-discounts/add" | "/(dashboard)/dashboard/(tables)/bills" | "/(dashboard)/dashboard/(tables)/bills/[id]" | "/(dashboard)/dashboard/(tables)/bills/add" | "/(dashboard)/dashboard/(tables)/branches" | "/(dashboard)/dashboard/(tables)/branches/[id]" | "/(dashboard)/dashboard/(tables)/branches/add" | "/(dashboard)/dashboard/(tables)/cities" | "/(dashboard)/dashboard/(tables)/cities/[id]" | "/(dashboard)/dashboard/(tables)/cities/add" | "/(dashboard)/dashboard/(tables)/day-discounts" | "/(dashboard)/dashboard/(tables)/day-discounts/[id]" | "/(dashboard)/dashboard/(tables)/day-discounts/add" | "/(dashboard)/dashboard/(tables)/discount-schedule" | "/(dashboard)/dashboard/(tables)/movieads" | "/(dashboard)/dashboard/(tables)/movieads/[id]" | "/(dashboard)/dashboard/(tables)/movieads/add" | "/(dashboard)/dashboard/(tables)/movies" | "/(dashboard)/dashboard/(tables)/movies/[id]" | "/(dashboard)/dashboard/(tables)/movies/add" | "/(dashboard)/dashboard/(tables)/rooms" | "/(dashboard)/dashboard/(tables)/rooms/[id]" | "/(dashboard)/dashboard/(tables)/rooms/add" | "/(dashboard)/dashboard/(tables)/schedule" | "/(dashboard)/dashboard/(tables)/sessions" | "/(dashboard)/dashboard/(tables)/sessions/[id]" | "/(dashboard)/dashboard/(tables)/sessions/add" | "/(dashboard)/dashboard/(tables)/staff" | "/(dashboard)/dashboard/(tables)/staff/[id]" | "/(dashboard)/dashboard/(tables)/staff/add" | "/(dashboard)/dashboard/(tables)/ticket-types" | "/(dashboard)/dashboard/(tables)/ticket-types/[id]" | "/(dashboard)/dashboard/(tables)/ticket-types/add" | "/(dashboard)/dashboard/(tables)/tickets" | "/(dashboard)/dashboard/(tables)/tickets/[id]" | "/(dashboard)/dashboard/(tables)/tickets/add" | "/(dashboard)/dashboard/(tables)/users" | "/(dashboard)/dashboard/(tables)/users/[id]" | "/(dashboard)/dashboard/(tables)/users/add"
type LayoutParams = RouteParams & { id?: string }
type LayoutParentData = Omit<EnsureDefined<import('../../../$types.js').LayoutData>, keyof import('../$types.js').LayoutData> & EnsureDefined<import('../$types.js').LayoutData>;

export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;