export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","fonts/SpaceGrotesk.ttf"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf"},
	_: {
		client: {"start":"_app/immutable/entry/start.BhPFGMvU.js","app":"_app/immutable/entry/app.CTe4b9mI.js","imports":["_app/immutable/entry/start.BhPFGMvU.js","_app/immutable/chunks/entry.C_b26GiN.js","_app/immutable/chunks/scheduler.Cvxp15X3.js","_app/immutable/chunks/index.CQWoZMGu.js","_app/immutable/entry/app.CTe4b9mI.js","_app/immutable/chunks/scheduler.Cvxp15X3.js","_app/immutable/chunks/index.RxifS9Fo.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":true},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js')),
			__memo(() => import('./nodes/31.js')),
			__memo(() => import('./nodes/32.js')),
			__memo(() => import('./nodes/33.js')),
			__memo(() => import('./nodes/34.js')),
			__memo(() => import('./nodes/35.js')),
			__memo(() => import('./nodes/36.js')),
			__memo(() => import('./nodes/37.js')),
			__memo(() => import('./nodes/38.js')),
			__memo(() => import('./nodes/39.js')),
			__memo(() => import('./nodes/40.js')),
			__memo(() => import('./nodes/41.js')),
			__memo(() => import('./nodes/42.js')),
			__memo(() => import('./nodes/43.js')),
			__memo(() => import('./nodes/44.js')),
			__memo(() => import('./nodes/45.js')),
			__memo(() => import('./nodes/46.js')),
			__memo(() => import('./nodes/47.js')),
			__memo(() => import('./nodes/48.js')),
			__memo(() => import('./nodes/49.js')),
			__memo(() => import('./nodes/50.js')),
			__memo(() => import('./nodes/51.js')),
			__memo(() => import('./nodes/52.js')),
			__memo(() => import('./nodes/53.js')),
			__memo(() => import('./nodes/54.js')),
			__memo(() => import('./nodes/55.js')),
			__memo(() => import('./nodes/56.js')),
			__memo(() => import('./nodes/57.js')),
			__memo(() => import('./nodes/58.js')),
			__memo(() => import('./nodes/59.js')),
			__memo(() => import('./nodes/60.js')),
			__memo(() => import('./nodes/61.js')),
			__memo(() => import('./nodes/62.js'))
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/bills/[id]",
				pattern: /^\/bills\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/branches",
				pattern: /^\/branches\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(app)/branches/[id]",
				pattern: /^\/branches\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/age-discounts",
				pattern: /^\/dashboard\/age-discounts\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/age-discounts/add",
				pattern: /^\/dashboard\/age-discounts\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/age-discounts/[id]",
				pattern: /^\/dashboard\/age-discounts\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/bills",
				pattern: /^\/dashboard\/bills\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/bills/add",
				pattern: /^\/dashboard\/bills\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/bills/[id]",
				pattern: /^\/dashboard\/bills\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/branches",
				pattern: /^\/dashboard\/branches\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/branches/add",
				pattern: /^\/dashboard\/branches\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/branches/[id]",
				pattern: /^\/dashboard\/branches\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/cities",
				pattern: /^\/dashboard\/cities\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/cities/add",
				pattern: /^\/dashboard\/cities\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/cities/[id]",
				pattern: /^\/dashboard\/cities\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/day-discounts",
				pattern: /^\/dashboard\/day-discounts\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/day-discounts/add",
				pattern: /^\/dashboard\/day-discounts\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/day-discounts/[id]",
				pattern: /^\/dashboard\/day-discounts\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/discount-schedule",
				pattern: /^\/dashboard\/discount-schedule\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/movieads",
				pattern: /^\/dashboard\/movieads\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/movieads/add",
				pattern: /^\/dashboard\/movieads\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/movieads/[id]",
				pattern: /^\/dashboard\/movieads\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/movies",
				pattern: /^\/dashboard\/movies\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/movies/add",
				pattern: /^\/dashboard\/movies\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/movies/[id]",
				pattern: /^\/dashboard\/movies\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/profile",
				pattern: /^\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 61 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/rooms",
				pattern: /^\/dashboard\/rooms\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/rooms/add",
				pattern: /^\/dashboard\/rooms\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 44 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/rooms/[id]",
				pattern: /^\/dashboard\/rooms\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 43 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/schedule",
				pattern: /^\/dashboard\/schedule\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 45 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/sessions",
				pattern: /^\/dashboard\/sessions\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 46 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/sessions/add",
				pattern: /^\/dashboard\/sessions\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 48 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/sessions/[id]",
				pattern: /^\/dashboard\/sessions\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 47 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,3,5,], errors: [1,,,], leaf: 62 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/staff",
				pattern: /^\/dashboard\/staff\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 49 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/staff/add",
				pattern: /^\/dashboard\/staff\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 51 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/staff/[id]",
				pattern: /^\/dashboard\/staff\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 50 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/ticket-types",
				pattern: /^\/dashboard\/ticket-types\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 52 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/ticket-types/add",
				pattern: /^\/dashboard\/ticket-types\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 54 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/ticket-types/[id]",
				pattern: /^\/dashboard\/ticket-types\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 53 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/tickets",
				pattern: /^\/dashboard\/tickets\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 55 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/tickets/add",
				pattern: /^\/dashboard\/tickets\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 57 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/tickets/[id]",
				pattern: /^\/dashboard\/tickets\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 56 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/users",
				pattern: /^\/dashboard\/users\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 58 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/users/add",
				pattern: /^\/dashboard\/users\/add\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 60 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard/(tables)/users/[id]",
				pattern: /^\/dashboard\/users\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 59 },
				endpoint: null
			},
			{
				id: "/(app)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(app)/movies",
				pattern: /^\/movies\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(app)/movies/coming-soon",
				pattern: /^\/movies\/coming-soon\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(app)/movies/[id]",
				pattern: /^\/movies\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(app)/password-reset",
				pattern: /^\/password-reset\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(app)/password-reset/[uidb64]/[token]",
				pattern: /^\/password-reset\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"uidb64","optional":false,"rest":false,"chained":false},{"name":"token","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(app)/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(app)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(app)/sessions/[id]",
				pattern: /^\/sessions\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
