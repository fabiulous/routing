"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("react"),B=(r,e)=>{const t=x(r,e);return u.createContext({router:t,location:{pathname:window.location.pathname,search:"",hash:""},go:(c,s)=>r(window.location.pathname,c,s)})},L=r=>()=>{const{router:e}=u.useContext(r);return e};var V=function(r){u.useEffect(r,[])};const _=V;var H=function(r){_(function(){r()})};const j=H,R="%[a-f0-9]{2}",C=new RegExp("("+R+")|([^%]+?)","gi"),$=new RegExp("("+R+")+","gi");function F(r,e){try{return[decodeURIComponent(r.join(""))]}catch{}if(r.length===1)return r;e=e||1;const t=r.slice(0,e),n=r.slice(e);return Array.prototype.concat.call([],F(t),F(n))}function P(r){try{return decodeURIComponent(r)}catch{let e=r.match(C)||[];for(let t=1;t<e.length;t++)r=F(e,t).join(""),e=r.match(C)||[];return r}}function K(r){const e={"%FE%FF":"��","%FF%FE":"��"};let t=$.exec(r);for(;t;){try{e[t[0]]=decodeURIComponent(t[0])}catch{const c=P(t[0]);c!==t[0]&&(e[t[0]]=c)}t=$.exec(r)}e["%C2"]="�";const n=Object.keys(e);for(const c of n)r=r.replace(new RegExp(c,"g"),e[c]);return r}function z(r){if(typeof r!="string")throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof r+"`");try{return decodeURIComponent(r)}catch{return K(r)}}function A(r,e){if(!(typeof r=="string"&&typeof e=="string"))throw new TypeError("Expected the arguments to be of type `string`");if(r===""||e==="")return[];const t=r.indexOf(e);return t===-1?[]:[r.slice(0,t),r.slice(t+e.length)]}function G(r,e){const t={};if(Array.isArray(e))for(const n of e){const c=Object.getOwnPropertyDescriptor(r,n);c!=null&&c.enumerable&&Object.defineProperty(t,n,c)}else for(const n of Reflect.ownKeys(r)){const c=Object.getOwnPropertyDescriptor(r,n);if(c.enumerable){const s=r[n];e(n,s,r)&&Object.defineProperty(t,n,c)}}return t}const J=r=>r==null,W=r=>encodeURIComponent(r).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),S=Symbol("encodeFragmentIdentifier");function X(r){switch(r.arrayFormat){case"index":return e=>(t,n)=>{const c=t.length;return n===void 0||r.skipNull&&n===null||r.skipEmptyString&&n===""?t:n===null?[...t,[f(e,r),"[",c,"]"].join("")]:[...t,[f(e,r),"[",f(c,r),"]=",f(n,r)].join("")]};case"bracket":return e=>(t,n)=>n===void 0||r.skipNull&&n===null||r.skipEmptyString&&n===""?t:n===null?[...t,[f(e,r),"[]"].join("")]:[...t,[f(e,r),"[]=",f(n,r)].join("")];case"colon-list-separator":return e=>(t,n)=>n===void 0||r.skipNull&&n===null||r.skipEmptyString&&n===""?t:n===null?[...t,[f(e,r),":list="].join("")]:[...t,[f(e,r),":list=",f(n,r)].join("")];case"comma":case"separator":case"bracket-separator":{const e=r.arrayFormat==="bracket-separator"?"[]=":"=";return t=>(n,c)=>c===void 0||r.skipNull&&c===null||r.skipEmptyString&&c===""?n:(c=c===null?"":c,n.length===0?[[f(t,r),e,f(c,r)].join("")]:[[n,f(c,r)].join(r.arrayFormatSeparator)])}default:return e=>(t,n)=>n===void 0||r.skipNull&&n===null||r.skipEmptyString&&n===""?t:n===null?[...t,f(e,r)]:[...t,[f(e,r),"=",f(n,r)].join("")]}}function Y(r){let e;switch(r.arrayFormat){case"index":return(t,n,c)=>{if(e=/\[(\d*)]$/.exec(t),t=t.replace(/\[\d*]$/,""),!e){c[t]=n;return}c[t]===void 0&&(c[t]={}),c[t][e[1]]=n};case"bracket":return(t,n,c)=>{if(e=/(\[])$/.exec(t),t=t.replace(/\[]$/,""),!e){c[t]=n;return}if(c[t]===void 0){c[t]=[n];return}c[t]=[...c[t],n]};case"colon-list-separator":return(t,n,c)=>{if(e=/(:list)$/.exec(t),t=t.replace(/:list$/,""),!e){c[t]=n;return}if(c[t]===void 0){c[t]=[n];return}c[t]=[...c[t],n]};case"comma":case"separator":return(t,n,c)=>{const s=typeof n=="string"&&n.includes(r.arrayFormatSeparator),a=typeof n=="string"&&!s&&d(n,r).includes(r.arrayFormatSeparator);n=a?d(n,r):n;const o=s||a?n.split(r.arrayFormatSeparator).map(i=>d(i,r)):n===null?n:d(n,r);c[t]=o};case"bracket-separator":return(t,n,c)=>{const s=/(\[])$/.test(t);if(t=t.replace(/\[]$/,""),!s){c[t]=n&&d(n,r);return}const a=n===null?[]:n.split(r.arrayFormatSeparator).map(o=>d(o,r));if(c[t]===void 0){c[t]=a;return}c[t]=[...c[t],...a]};default:return(t,n,c)=>{if(c[t]===void 0){c[t]=n;return}c[t]=[...[c[t]].flat(),n]}}}function N(r){if(typeof r!="string"||r.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function f(r,e){return e.encode?e.strict?W(r):encodeURIComponent(r):r}function d(r,e){return e.decode?z(r):r}function U(r){return Array.isArray(r)?r.sort():typeof r=="object"?U(Object.keys(r)).sort((e,t)=>Number(e)-Number(t)).map(e=>r[e]):r}function I(r){const e=r.indexOf("#");return e!==-1&&(r=r.slice(0,e)),r}function Z(r){let e="";const t=r.indexOf("#");return t!==-1&&(e=r.slice(t)),e}function E(r,e){return e.parseNumbers&&!Number.isNaN(Number(r))&&typeof r=="string"&&r.trim()!==""?r=Number(r):e.parseBooleans&&r!==null&&(r.toLowerCase()==="true"||r.toLowerCase()==="false")&&(r=r.toLowerCase()==="true"),r}function p(r){r=I(r);const e=r.indexOf("?");return e===-1?"":r.slice(e+1)}function b(r,e){e={decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1,...e},N(e.arrayFormatSeparator);const t=Y(e),n=Object.create(null);if(typeof r!="string"||(r=r.trim().replace(/^[?#&]/,""),!r))return n;for(const c of r.split("&")){if(c==="")continue;const s=e.decode?c.replace(/\+/g," "):c;let[a,o]=A(s,"=");a===void 0&&(a=s),o=o===void 0?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?o:d(o,e),t(d(a,e),o,n)}for(const[c,s]of Object.entries(n))if(typeof s=="object"&&s!==null)for(const[a,o]of Object.entries(s))s[a]=E(o,e);else n[c]=E(s,e);return e.sort===!1?n:(e.sort===!0?Object.keys(n).sort():Object.keys(n).sort(e.sort)).reduce((c,s)=>{const a=n[s];return a&&typeof a=="object"&&!Array.isArray(a)?c[s]=U(a):c[s]=a,c},Object.create(null))}function Q(r,e){if(!r)return"";e={encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:",",...e},N(e.arrayFormatSeparator);const t=a=>e.skipNull&&J(r[a])||e.skipEmptyString&&r[a]==="",n=X(e),c={};for(const[a,o]of Object.entries(r))t(a)||(c[a]=o);const s=Object.keys(c);return e.sort!==!1&&s.sort(e.sort),s.map(a=>{const o=r[a];return o===void 0?"":o===null?f(a,e):Array.isArray(o)?o.length===0&&e.arrayFormat==="bracket-separator"?f(a,e)+"[]":o.reduce(n(a),[]).join("&"):f(a,e)+"="+f(o,e)}).filter(a=>a.length>0).join("&")}function D(r,e){var c;e={decode:!0,...e};let[t,n]=A(r,"#");return t===void 0&&(t=r),{url:((c=t==null?void 0:t.split("?"))==null?void 0:c[0])??"",query:b(p(r),e),...e&&e.parseFragmentIdentifier&&n?{fragmentIdentifier:d(n,e)}:{}}}function q(r,e){e={encode:!0,strict:!0,[S]:!0,...e};const t=I(r.url).split("?")[0]||"",n=p(r.url),c={...b(n,{sort:!1}),...r.query};let s=Q(c,e);s&&(s=`?${s}`);let a=Z(r.url);if(r.fragmentIdentifier){const o=new URL(t);o.hash=r.fragmentIdentifier,a=e[S]?o.hash:`#${r.fragmentIdentifier}`}return`${t}${s}${a}`}function M(r,e,t){t={parseFragmentIdentifier:!0,[S]:!1,...t};const{url:n,query:c,fragmentIdentifier:s}=D(r,t);return q({url:n,query:G(c,e),fragmentIdentifier:s},t)}function k(r,e,t){const n=Array.isArray(e)?c=>!e.includes(c):(c,s)=>!e(c,s);return M(r,n,t)}const g=Object.freeze(Object.defineProperty({__proto__:null,exclude:k,extract:p,parse:b,parseUrl:D,pick:M,stringify:Q,stringifyUrl:q},Symbol.toStringTag,{value:"Module"})),v=r=>Object.keys(r).reduce((e,t)=>([null,void 0,""].includes(r[t])||(e[t]=r[t]),e),{}),y={arrayFormat:"bracket",parseBooleans:!0},rr=(r,e)=>{const t=g.parse(r,y),n=v({...t,...e});return g.stringify(n,y)},er=(r,e)=>{const t=g.parse(r),n=Object.keys(t).reduce((c,s)=>(e.includes(s)||(c[s]=t[s]),c),{});return g.stringify(n,y)},O=r=>g.parse(r,y),tr=r=>(e,t)=>{const{go:n,location:c}=u.useContext(r),s=u.useMemo(()=>c?O(c.search)[e]:void 0,[c,e]),a=u.useCallback((o,i=!1)=>{n({[e]:o},i)},[n,e]);return j(()=>{!s&&t&&n({[e]:t},!0)}),[s,a]},nr=r=>(e,t,n=500,c=!1)=>{const{go:s,location:a}=u.useContext(r),o=u.useRef(),i=u.useMemo(()=>{const h=a?O(a.search)[e]:void 0;return Array.isArray(h)?h[0]:h},[a,e]),[l,m]=u.useState(i),w=u.useCallback(()=>{s({[e]:l},c)},[s,e,l,c]);return u.useEffect(()=>(i!==l&&(o.current=window.setTimeout(()=>{w()},n)),()=>{window.clearTimeout(o.current)}),[w,n,i,l]),u.useEffect(()=>{m(i)},[i]),j(()=>{!l&&t&&(s({[e]:t},!0),m(t))}),[l,i,m]},T=(r,e,t="")=>{if(typeof e=="string"){const c=`${t}${e}`;return{path:c,go:(s,a=!1)=>r(c,s,a)}}if(typeof e=="function")return(...c)=>{const s=e(...c);if(typeof s=="string"){const o=`${t}${s}`;return{path:o,go:(i,l=!1)=>r(o,i,l)}}const a=`${t}${s.path}`;return{path:a,go:(o,i=!1)=>r(a,o,i),...x(r,s.routes,a)}};const n=`${t}${e.path}`;return{path:n,go:(c,s=!1)=>r(n,c,s),...Object.keys(e.routes).reduce((c,s)=>({...c,[s]:T(r,e.routes[s],n)}),{})}},x=(r,e,t="")=>Object.keys(e).reduce((n,c)=>({...n,[c]:T(r,e[c],t)}),{}),cr=(r,e)=>{const t=B(r,e),n=L(t),c=tr(t),s=nr(t);return{RoutingContext:t,useRouter:n,useQueryState:c,useDebouncedQueryState:s}};exports.addQuery=rr;exports.generateRoutes=x;exports.generateRouting=cr;exports.parseQuery=O;exports.queryStringOptions=y;exports.removeQuery=er;
