import{w as d}from"./index.CQWoZMGu.js";import{J as f,K as m}from"./scheduler.Cvxp15X3.js";const h={message:"Missing Toast Message",autohide:!0,timeout:5e3},a="toastStore";function I(){const n=f(a);if(!n)throw new Error("toastStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!");return n}function k(){const n=T();return m(a,n)}function g(){const n=Math.random();return Number(n).toString(32)}function T(){const{subscribe:n,set:c,update:s}=d([]),r=e=>s(t=>{if(t.length>0){const o=t.findIndex(l=>l.id===e),i=t[o];i&&(i.callback&&i.callback({id:e,status:"closed"}),i.timeoutId&&clearTimeout(i.timeoutId),t.splice(o,1))}return t});function u(e){if(e.autohide===!0)return setTimeout(()=>{r(e.id)},e.timeout)}return{subscribe:n,close:r,trigger:e=>{const t=g();return s(o=>{e&&e.callback&&e.callback({id:t,status:"queued"}),e.hideDismiss&&(e.autohide=!0);const i={...h,...e,id:t};return i.timeoutId=u(i),o.push(i),o}),t},freeze:e=>s(t=>(t.length>0&&clearTimeout(t[e].timeoutId),t)),unfreeze:e=>s(t=>(t.length>0&&(t[e].timeoutId=u(t[e])),t)),clear:()=>c([])}}export{I as g,k as i};
