(function(d,a){typeof exports=="object"&&typeof module<"u"?a(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],a):(d=typeof globalThis<"u"?globalThis:d||self,a(d.routing={},d.React))})(this,function(d,a){"use strict";const L=(r,e)=>{const t=O(r,e);return a.createContext({router:t,location:{pathname:window.location.pathname,search:"",hash:""},go:(c,s)=>r(window.location.pathname,c,s)})},V=r=>()=>{const{router:e}=a.useContext(r);return e};var _=function(r){a.useEffect(r,[])};const H=_;var P=function(r){H(function(){r()})};const C=P,$="%[a-f0-9]{2}",j=new RegExp("("+$+")|([^%]+?)","gi"),E=new RegExp("("+$+")+","gi");function h(r,e){try{return[decodeURIComponent(r.join(""))]}catch{}if(r.length===1)return r;e=e||1;const t=r.slice(0,e),n=r.slice(e);return Array.prototype.concat.call([],h(t),h(n))}function K(r){try{return decodeURIComponent(r)}catch{let e=r.match(j)||[];for(let t=1;t<e.length;t++)r=h(e,t).join(""),e=r.match(j)||[];return r}}function z(r){const e={"%FE%FF":"��","%FF%FE":"��"};let t=E.exec(r);for(;t;){try{e[t[0]]=decodeURIComponent(t[0])}catch{const c=K(t[0]);c!==t[0]&&(e[t[0]]=c)}t=E.exec(r)}e["%C2"]="�";const n=Object.keys(e);for(const c of n)r=r.replace(new RegExp(c,"g"),e[c]);return r}function G(r){if(typeof r!="string")throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof r+"`");try{return decodeURIComponent(r)}catch{return z(r)}}function A(r,e){if(!(typeof r=="string"&&typeof e=="string"))throw new TypeError("Expected the arguments to be of type `string`");if(r===""||e==="")return[];const t=r.indexOf(e);return t===-1?[]:[r.slice(0,t),r.slice(t+e.length)]}function J(r,e){const t={};if(Array.isArray(e))for(const n of e){const c=Object.getOwnPropertyDescriptor(r,n);c!=null&&c.enumerable&&Object.defineProperty(t,n,c)}else for(const n of Reflect.ownKeys(r)){const c=Object.getOwnPropertyDescriptor(r,n);if(c.enumerable){const s=r[n];e(n,s,r)&&Object.defineProperty(t,n,c)}}return t}const W=r=>r==null,X=r=>encodeURIComponent(r).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),F=Symbol("encodeFragmentIdentifier");function Y(r){switch(r.arrayFormat){case"index":return e=>(t,n)=>{const c=t.length;return n===void 0||r.skipNull&&n===null||r.skipEmptyString&&n===""?t:n===null?[...t,[o(e,r),"[",c,"]"].join("")]:[...t,[o(e,r),"[",o(c,r),"]=",o(n,r)].join("")]};case"bracket":return e=>(t,n)=>n===void 0||r.skipNull&&n===null||r.skipEmptyString&&n===""?t:n===null?[...t,[o(e,r),"[]"].join("")]:[...t,[o(e,r),"[]=",o(n,r)].join("")];case"colon-list-separator":return e=>(t,n)=>n===void 0||r.skipNull&&n===null||r.skipEmptyString&&n===""?t:n===null?[...t,[o(e,r),":list="].join("")]:[...t,[o(e,r),":list=",o(n,r)].join("")];case"comma":case"separator":case"bracket-separator":{const e=r.arrayFormat==="bracket-separator"?"[]=":"=";return t=>(n,c)=>c===void 0||r.skipNull&&c===null||r.skipEmptyString&&c===""?n:(c=c===null?"":c,n.length===0?[[o(t,r),e,o(c,r)].join("")]:[[n,o(c,r)].join(r.arrayFormatSeparator)])}default:return e=>(t,n)=>n===void 0||r.skipNull&&n===null||r.skipEmptyString&&n===""?t:n===null?[...t,o(e,r)]:[...t,[o(e,r),"=",o(n,r)].join("")]}}function Z(r){let e;switch(r.arrayFormat){case"index":return(t,n,c)=>{if(e=/\[(\d*)]$/.exec(t),t=t.replace(/\[\d*]$/,""),!e){c[t]=n;return}c[t]===void 0&&(c[t]={}),c[t][e[1]]=n};case"bracket":return(t,n,c)=>{if(e=/(\[])$/.exec(t),t=t.replace(/\[]$/,""),!e){c[t]=n;return}if(c[t]===void 0){c[t]=[n];return}c[t]=[...c[t],n]};case"colon-list-separator":return(t,n,c)=>{if(e=/(:list)$/.exec(t),t=t.replace(/:list$/,""),!e){c[t]=n;return}if(c[t]===void 0){c[t]=[n];return}c[t]=[...c[t],n]};case"comma":case"separator":return(t,n,c)=>{const s=typeof n=="string"&&n.includes(r.arrayFormatSeparator),f=typeof n=="string"&&!s&&l(n,r).includes(r.arrayFormatSeparator);n=f?l(n,r):n;const i=s||f?n.split(r.arrayFormatSeparator).map(u=>l(u,r)):n===null?n:l(n,r);c[t]=i};case"bracket-separator":return(t,n,c)=>{const s=/(\[])$/.test(t);if(t=t.replace(/\[]$/,""),!s){c[t]=n&&l(n,r);return}const f=n===null?[]:n.split(r.arrayFormatSeparator).map(i=>l(i,r));if(c[t]===void 0){c[t]=f;return}c[t]=[...c[t],...f]};default:return(t,n,c)=>{if(c[t]===void 0){c[t]=n;return}c[t]=[...[c[t]].flat(),n]}}}function N(r){if(typeof r!="string"||r.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function o(r,e){return e.encode?e.strict?X(r):encodeURIComponent(r):r}function l(r,e){return e.decode?G(r):r}function U(r){return Array.isArray(r)?r.sort():typeof r=="object"?U(Object.keys(r)).sort((e,t)=>Number(e)-Number(t)).map(e=>r[e]):r}function I(r){const e=r.indexOf("#");return e!==-1&&(r=r.slice(0,e)),r}function k(r){let e="";const t=r.indexOf("#");return t!==-1&&(e=r.slice(t)),e}function Q(r,e){return e.parseNumbers&&!Number.isNaN(Number(r))&&typeof r=="string"&&r.trim()!==""?r=Number(r):e.parseBooleans&&r!==null&&(r.toLowerCase()==="true"||r.toLowerCase()==="false")&&(r=r.toLowerCase()==="true"),r}function p(r){r=I(r);const e=r.indexOf("?");return e===-1?"":r.slice(e+1)}function S(r,e){e={decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1,...e},N(e.arrayFormatSeparator);const t=Z(e),n=Object.create(null);if(typeof r!="string"||(r=r.trim().replace(/^[?#&]/,""),!r))return n;for(const c of r.split("&")){if(c==="")continue;const s=e.decode?c.replace(/\+/g," "):c;let[f,i]=A(s,"=");f===void 0&&(f=s),i=i===void 0?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?i:l(i,e),t(l(f,e),i,n)}for(const[c,s]of Object.entries(n))if(typeof s=="object"&&s!==null)for(const[f,i]of Object.entries(s))s[f]=Q(i,e);else n[c]=Q(s,e);return e.sort===!1?n:(e.sort===!0?Object.keys(n).sort():Object.keys(n).sort(e.sort)).reduce((c,s)=>{const f=n[s];return f&&typeof f=="object"&&!Array.isArray(f)?c[s]=U(f):c[s]=f,c},Object.create(null))}function R(r,e){if(!r)return"";e={encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:",",...e},N(e.arrayFormatSeparator);const t=f=>e.skipNull&&W(r[f])||e.skipEmptyString&&r[f]==="",n=Y(e),c={};for(const[f,i]of Object.entries(r))t(f)||(c[f]=i);const s=Object.keys(c);return e.sort!==!1&&s.sort(e.sort),s.map(f=>{const i=r[f];return i===void 0?"":i===null?o(f,e):Array.isArray(i)?i.length===0&&e.arrayFormat==="bracket-separator"?o(f,e)+"[]":i.reduce(n(f),[]).join("&"):o(f,e)+"="+o(i,e)}).filter(f=>f.length>0).join("&")}function D(r,e){var c;e={decode:!0,...e};let[t,n]=A(r,"#");return t===void 0&&(t=r),{url:((c=t==null?void 0:t.split("?"))==null?void 0:c[0])??"",query:S(p(r),e),...e&&e.parseFragmentIdentifier&&n?{fragmentIdentifier:l(n,e)}:{}}}function q(r,e){e={encode:!0,strict:!0,[F]:!0,...e};const t=I(r.url).split("?")[0]||"",n=p(r.url),c={...S(n,{sort:!1}),...r.query};let s=R(c,e);s&&(s=`?${s}`);let f=k(r.url);if(r.fragmentIdentifier){const i=new URL(t);i.hash=r.fragmentIdentifier,f=e[F]?i.hash:`#${r.fragmentIdentifier}`}return`${t}${s}${f}`}function M(r,e,t){t={parseFragmentIdentifier:!0,[F]:!1,...t};const{url:n,query:c,fragmentIdentifier:s}=D(r,t);return q({url:n,query:J(c,e),fragmentIdentifier:s},t)}function v(r,e,t){const n=Array.isArray(e)?c=>!e.includes(c):(c,s)=>!e(c,s);return M(r,n,t)}const y=Object.freeze(Object.defineProperty({__proto__:null,exclude:v,extract:p,parse:S,parseUrl:D,pick:M,stringify:R,stringifyUrl:q},Symbol.toStringTag,{value:"Module"})),rr=r=>Object.keys(r).reduce((e,t)=>([null,void 0,""].includes(r[t])||(e[t]=r[t]),e),{}),m={arrayFormat:"bracket",parseBooleans:!0},er=(r,e)=>{const t=y.parse(r,m),n=rr({...t,...e});return y.stringify(n,m)},tr=(r,e)=>{const t=y.parse(r),n=Object.keys(t).reduce((c,s)=>(e.includes(s)||(c[s]=t[s]),c),{});return y.stringify(n,m)},b=r=>y.parse(r,m),nr=r=>(e,t)=>{const{go:n,location:c}=a.useContext(r),s=a.useMemo(()=>c?b(c.search)[e]:void 0,[c,e]),f=a.useCallback((i,u=!1)=>{n({[e]:i},u)},[n,e]);return C(()=>{!s&&t&&n({[e]:t},!0)}),[s,f]},cr=r=>(e,t,n=500,c=!1)=>{const{go:s,location:f}=a.useContext(r),i=a.useRef(),u=a.useMemo(()=>{const x=f?b(f.search)[e]:void 0;return Array.isArray(x)?x[0]:x},[f,e]),[g,w]=a.useState(u),B=a.useCallback(()=>{s({[e]:g},c)},[s,e,g,c]);return a.useEffect(()=>(u!==g&&(i.current=window.setTimeout(()=>{B()},n)),()=>{window.clearTimeout(i.current)}),[B,n,u,g]),a.useEffect(()=>{w(u)},[u]),C(()=>{!g&&t&&(s({[e]:t},!0),w(t))}),[g,u,w]},T=(r,e,t="")=>{if(typeof e=="string"){const c=`${t}${e}`;return{path:c,go:(s,f=!1)=>r(c,s,f)}}if(typeof e=="function")return(...c)=>{const s=e(...c);if(typeof s=="string"){const i=`${t}${s}`;return{path:i,go:(u,g=!1)=>r(i,u,g)}}const f=`${t}${s.path}`;return{path:f,go:(i,u=!1)=>r(f,i,u),...O(r,s.routes,f)}};const n=`${t}${e.path}`;return{path:n,go:(c,s=!1)=>r(n,c,s),...Object.keys(e.routes).reduce((c,s)=>({...c,[s]:T(r,e.routes[s],n)}),{})}},O=(r,e,t="")=>Object.keys(e).reduce((n,c)=>({...n,[c]:T(r,e[c],t)}),{}),sr=(r,e)=>{const t=L(r,e),n=V(t),c=nr(t),s=cr(t);return{RoutingContext:t,useRouter:n,useQueryState:c,useDebouncedQueryState:s}};d.addQuery=er,d.generateRoutes=O,d.generateRouting=sr,d.parseQuery=b,d.queryStringOptions=m,d.removeQuery=tr,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
