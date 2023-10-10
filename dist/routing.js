import u, { useEffect as q } from "react";
const T = (r, e) => {
  const t = M(r, e);
  return u.createContext({
    router: t,
    location: {
      pathname: window.location.pathname,
      search: "",
      hash: ""
    },
    go: (c, s) => r(window.location.pathname, c, s)
  });
}, Q = (r) => () => {
  const { router: e } = u.useContext(r);
  return e;
};
var B = function(r) {
  q(r, []);
};
const L = B;
var V = function(r) {
  L(function() {
    r();
  });
};
const O = V, w = "%[a-f0-9]{2}", S = new RegExp("(" + w + ")|([^%]+?)", "gi"), b = new RegExp("(" + w + ")+", "gi");
function y(r, e) {
  try {
    return [decodeURIComponent(r.join(""))];
  } catch {
  }
  if (r.length === 1)
    return r;
  e = e || 1;
  const t = r.slice(0, e), n = r.slice(e);
  return Array.prototype.concat.call([], y(t), y(n));
}
function _(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    let e = r.match(S) || [];
    for (let t = 1; t < e.length; t++)
      r = y(e, t).join(""), e = r.match(S) || [];
    return r;
  }
}
function H(r) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = b.exec(r);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const c = _(t[0]);
      c !== t[0] && (e[t[0]] = c);
    }
    t = b.exec(r);
  }
  e["%C2"] = "�";
  const n = Object.keys(e);
  for (const c of n)
    r = r.replace(new RegExp(c, "g"), e[c]);
  return r;
}
function K(r) {
  if (typeof r != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof r + "`");
  try {
    return decodeURIComponent(r);
  } catch {
    return H(r);
  }
}
function C(r, e) {
  if (!(typeof r == "string" && typeof e == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (r === "" || e === "")
    return [];
  const t = r.indexOf(e);
  return t === -1 ? [] : [
    r.slice(0, t),
    r.slice(t + e.length)
  ];
}
function P(r, e) {
  const t = {};
  if (Array.isArray(e))
    for (const n of e) {
      const c = Object.getOwnPropertyDescriptor(r, n);
      c != null && c.enumerable && Object.defineProperty(t, n, c);
    }
  else
    for (const n of Reflect.ownKeys(r)) {
      const c = Object.getOwnPropertyDescriptor(r, n);
      if (c.enumerable) {
        const s = r[n];
        e(n, s, r) && Object.defineProperty(t, n, c);
      }
    }
  return t;
}
const k = (r) => r == null, z = (r) => encodeURIComponent(r).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), m = Symbol("encodeFragmentIdentifier");
function G(r) {
  switch (r.arrayFormat) {
    case "index":
      return (e) => (t, n) => {
        const c = t.length;
        return n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
          ...t,
          [o(e, r), "[", c, "]"].join("")
        ] : [
          ...t,
          [o(e, r), "[", o(c, r), "]=", o(n, r)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [o(e, r), "[]"].join("")
      ] : [
        ...t,
        [o(e, r), "[]=", o(n, r)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [o(e, r), ":list="].join("")
      ] : [
        ...t,
        [o(e, r), ":list=", o(n, r)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = r.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (n, c) => c === void 0 || r.skipNull && c === null || r.skipEmptyString && c === "" ? n : (c = c === null ? "" : c, n.length === 0 ? [[o(t, r), e, o(c, r)].join("")] : [[n, o(c, r)].join(r.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        o(e, r)
      ] : [
        ...t,
        [o(e, r), "=", o(n, r)].join("")
      ];
  }
}
function J(r) {
  let e;
  switch (r.arrayFormat) {
    case "index":
      return (t, n, c) => {
        if (e = /\[(\d*)]$/.exec(t), t = t.replace(/\[\d*]$/, ""), !e) {
          c[t] = n;
          return;
        }
        c[t] === void 0 && (c[t] = {}), c[t][e[1]] = n;
      };
    case "bracket":
      return (t, n, c) => {
        if (e = /(\[])$/.exec(t), t = t.replace(/\[]$/, ""), !e) {
          c[t] = n;
          return;
        }
        if (c[t] === void 0) {
          c[t] = [n];
          return;
        }
        c[t] = [...c[t], n];
      };
    case "colon-list-separator":
      return (t, n, c) => {
        if (e = /(:list)$/.exec(t), t = t.replace(/:list$/, ""), !e) {
          c[t] = n;
          return;
        }
        if (c[t] === void 0) {
          c[t] = [n];
          return;
        }
        c[t] = [...c[t], n];
      };
    case "comma":
    case "separator":
      return (t, n, c) => {
        const s = typeof n == "string" && n.includes(r.arrayFormatSeparator), a = typeof n == "string" && !s && d(n, r).includes(r.arrayFormatSeparator);
        n = a ? d(n, r) : n;
        const f = s || a ? n.split(r.arrayFormatSeparator).map((i) => d(i, r)) : n === null ? n : d(n, r);
        c[t] = f;
      };
    case "bracket-separator":
      return (t, n, c) => {
        const s = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !s) {
          c[t] = n && d(n, r);
          return;
        }
        const a = n === null ? [] : n.split(r.arrayFormatSeparator).map((f) => d(f, r));
        if (c[t] === void 0) {
          c[t] = a;
          return;
        }
        c[t] = [...c[t], ...a];
      };
    default:
      return (t, n, c) => {
        if (c[t] === void 0) {
          c[t] = n;
          return;
        }
        c[t] = [...[c[t]].flat(), n];
      };
  }
}
function $(r) {
  if (typeof r != "string" || r.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function o(r, e) {
  return e.encode ? e.strict ? z(r) : encodeURIComponent(r) : r;
}
function d(r, e) {
  return e.decode ? K(r) : r;
}
function E(r) {
  return Array.isArray(r) ? r.sort() : typeof r == "object" ? E(Object.keys(r)).sort((e, t) => Number(e) - Number(t)).map((e) => r[e]) : r;
}
function j(r) {
  const e = r.indexOf("#");
  return e !== -1 && (r = r.slice(0, e)), r;
}
function W(r) {
  let e = "";
  const t = r.indexOf("#");
  return t !== -1 && (e = r.slice(t)), e;
}
function x(r, e) {
  return e.parseNumbers && !Number.isNaN(Number(r)) && typeof r == "string" && r.trim() !== "" ? r = Number(r) : e.parseBooleans && r !== null && (r.toLowerCase() === "true" || r.toLowerCase() === "false") && (r = r.toLowerCase() === "true"), r;
}
function h(r) {
  r = j(r);
  const e = r.indexOf("?");
  return e === -1 ? "" : r.slice(e + 1);
}
function F(r, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, $(e.arrayFormatSeparator);
  const t = J(e), n = /* @__PURE__ */ Object.create(null);
  if (typeof r != "string" || (r = r.trim().replace(/^[?#&]/, ""), !r))
    return n;
  for (const c of r.split("&")) {
    if (c === "")
      continue;
    const s = e.decode ? c.replace(/\+/g, " ") : c;
    let [a, f] = C(s, "=");
    a === void 0 && (a = s), f = f === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? f : d(f, e), t(d(a, e), f, n);
  }
  for (const [c, s] of Object.entries(n))
    if (typeof s == "object" && s !== null)
      for (const [a, f] of Object.entries(s))
        s[a] = x(f, e);
    else
      n[c] = x(s, e);
  return e.sort === !1 ? n : (e.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(e.sort)).reduce((c, s) => {
    const a = n[s];
    return a && typeof a == "object" && !Array.isArray(a) ? c[s] = E(a) : c[s] = a, c;
  }, /* @__PURE__ */ Object.create(null));
}
function R(r, e) {
  if (!r)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, $(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && k(r[a]) || e.skipEmptyString && r[a] === "", n = G(e), c = {};
  for (const [a, f] of Object.entries(r))
    t(a) || (c[a] = f);
  const s = Object.keys(c);
  return e.sort !== !1 && s.sort(e.sort), s.map((a) => {
    const f = r[a];
    return f === void 0 ? "" : f === null ? o(a, e) : Array.isArray(f) ? f.length === 0 && e.arrayFormat === "bracket-separator" ? o(a, e) + "[]" : f.reduce(n(a), []).join("&") : o(a, e) + "=" + o(f, e);
  }).filter((a) => a.length > 0).join("&");
}
function A(r, e) {
  var c;
  e = {
    decode: !0,
    ...e
  };
  let [t, n] = C(r, "#");
  return t === void 0 && (t = r), {
    url: ((c = t == null ? void 0 : t.split("?")) == null ? void 0 : c[0]) ?? "",
    query: F(h(r), e),
    ...e && e.parseFragmentIdentifier && n ? { fragmentIdentifier: d(n, e) } : {}
  };
}
function N(r, e) {
  e = {
    encode: !0,
    strict: !0,
    [m]: !0,
    ...e
  };
  const t = j(r.url).split("?")[0] || "", n = h(r.url), c = {
    ...F(n, { sort: !1 }),
    ...r.query
  };
  let s = R(c, e);
  s && (s = `?${s}`);
  let a = W(r.url);
  if (r.fragmentIdentifier) {
    const f = new URL(t);
    f.hash = r.fragmentIdentifier, a = e[m] ? f.hash : `#${r.fragmentIdentifier}`;
  }
  return `${t}${s}${a}`;
}
function U(r, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [m]: !1,
    ...t
  };
  const { url: n, query: c, fragmentIdentifier: s } = A(r, t);
  return N({
    url: n,
    query: P(c, e),
    fragmentIdentifier: s
  }, t);
}
function X(r, e, t) {
  const n = Array.isArray(e) ? (c) => !e.includes(c) : (c, s) => !e(c, s);
  return U(r, n, t);
}
const Y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: X,
  extract: h,
  parse: F,
  parseUrl: A,
  pick: U,
  stringify: R,
  stringifyUrl: N
}, Symbol.toStringTag, { value: "Module" })), Z = {
  arrayFormat: "bracket",
  parseBooleans: !0
}, I = (r) => Y.parse(r, Z), v = (r) => (e, t) => {
  const { go: n, location: c } = u.useContext(r), s = u.useMemo(() => c ? I(c.search)[e] : void 0, [c, e]), a = u.useCallback((f) => {
    n({ [e]: f });
  }, [n, e]);
  return O(() => {
    !s && t && n({ [e]: t }, !0);
  }), [
    s,
    a
  ];
}, rr = (r) => (e, t, n = 500) => {
  const { go: c, location: s } = u.useContext(r), a = u.useRef(), f = u.useMemo(() => {
    const g = s ? I(s.search)[e] : void 0;
    return Array.isArray(g) ? g[0] : g;
  }, [s, e]), [i, l] = u.useState(f), p = u.useCallback(() => {
    c({ [e]: i });
  }, [c, e, i]);
  return u.useEffect(
    () => (f !== i && (a.current = window.setTimeout(() => {
      p();
    }, n)), () => {
      window.clearTimeout(a.current);
    }),
    [p, n, f, i]
  ), u.useEffect(() => {
    l(f);
  }, [f]), O(() => {
    !i && t && (c({ [e]: t }, !0), l(t));
  }), [
    i,
    f,
    l
  ];
}, D = (r, e, t = "") => {
  if (typeof e == "string") {
    const c = `${t}${e}`;
    return {
      path: c,
      go: (s, a = !1) => r(c, s, a)
    };
  }
  if (typeof e == "function")
    return (c) => {
      const s = e(c);
      if (typeof s == "string") {
        const f = `${t}${s}`;
        return {
          path: f,
          go: (i, l = !1) => r(f, i, l)
        };
      }
      const a = `${t}${s.path}`;
      return {
        path: a,
        go: (f, i = !1) => r(a, f, i),
        ...M(r, s.routes, a)
      };
    };
  const n = `${t}${e.path}`;
  return {
    path: n,
    go: (c, s = !1) => r(n, c, s),
    ...Object.keys(e.routes).reduce((c, s) => ({
      ...c,
      [s]: D(r, e.routes[s], n)
    }), {})
  };
}, M = (r, e, t = "") => Object.keys(e).reduce((n, c) => ({
  ...n,
  [c]: D(r, e[c], t)
}), {}), tr = (r, e) => {
  const t = T(r, e), n = Q(t), c = v(t), s = rr(t);
  return {
    RoutingContext: t,
    useRouter: n,
    useQueryState: c,
    useDebouncedQueryState: s
  };
};
export {
  M as generateRoutes,
  tr as generateRouting
};
