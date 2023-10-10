import o, { useEffect as T } from "react";
const $ = (r, e, t = "") => {
  if (typeof e == "string") {
    const c = `${t}${e}`;
    return {
      path: c,
      go: (s, f = !1) => r(c, s, f)
    };
  }
  if (typeof e == "function")
    return (c) => {
      const s = e(c);
      if (typeof s == "string") {
        const a = `${t}${s}`;
        return {
          path: a,
          go: (u, y = !1) => r(a, u, y)
        };
      }
      const f = `${t}${s.path}`;
      return {
        path: f,
        go: (a, u = !1) => r(f, a, u),
        ...E(r, s.routes, f)
      };
    };
  const n = `${t}${e.path}`;
  return {
    path: n,
    go: (c, s = !1) => r(n, c, s),
    ...Object.keys(e.routes).reduce((c, s) => ({
      ...c,
      [s]: $(r, e.routes[s], n)
    }), {})
  };
}, E = (r, e, t = "") => Object.keys(e).reduce((n, c) => ({
  ...n,
  [c]: $(r, e[c], t)
}), {}), p = o.createContext({
  router: E(() => {
  }, {}),
  location: {
    pathname: window.location.pathname,
    search: "",
    hash: ""
  },
  go: () => {
  }
}), v = () => {
  const { router: r } = o.useContext(p);
  return r;
};
var B = function(r) {
  T(r, []);
};
const L = B;
var V = function(r) {
  L(function() {
    r();
  });
};
const C = V, j = "%[a-f0-9]{2}", b = new RegExp("(" + j + ")|([^%]+?)", "gi"), x = new RegExp("(" + j + ")+", "gi");
function h(r, e) {
  try {
    return [decodeURIComponent(r.join(""))];
  } catch {
  }
  if (r.length === 1)
    return r;
  e = e || 1;
  const t = r.slice(0, e), n = r.slice(e);
  return Array.prototype.concat.call([], h(t), h(n));
}
function _(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    let e = r.match(b) || [];
    for (let t = 1; t < e.length; t++)
      r = h(e, t).join(""), e = r.match(b) || [];
    return r;
  }
}
function H(r) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = x.exec(r);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const c = _(t[0]);
      c !== t[0] && (e[t[0]] = c);
    }
    t = x.exec(r);
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
function A(r, e) {
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
const z = (r) => r == null, G = (r) => encodeURIComponent(r).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), F = Symbol("encodeFragmentIdentifier");
function J(r) {
  switch (r.arrayFormat) {
    case "index":
      return (e) => (t, n) => {
        const c = t.length;
        return n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
          ...t,
          [i(e, r), "[", c, "]"].join("")
        ] : [
          ...t,
          [i(e, r), "[", i(c, r), "]=", i(n, r)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [i(e, r), "[]"].join("")
      ] : [
        ...t,
        [i(e, r), "[]=", i(n, r)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [i(e, r), ":list="].join("")
      ] : [
        ...t,
        [i(e, r), ":list=", i(n, r)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = r.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (n, c) => c === void 0 || r.skipNull && c === null || r.skipEmptyString && c === "" ? n : (c = c === null ? "" : c, n.length === 0 ? [[i(t, r), e, i(c, r)].join("")] : [[n, i(c, r)].join(r.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        i(e, r)
      ] : [
        ...t,
        [i(e, r), "=", i(n, r)].join("")
      ];
  }
}
function W(r) {
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
        const s = typeof n == "string" && n.includes(r.arrayFormatSeparator), f = typeof n == "string" && !s && d(n, r).includes(r.arrayFormatSeparator);
        n = f ? d(n, r) : n;
        const a = s || f ? n.split(r.arrayFormatSeparator).map((u) => d(u, r)) : n === null ? n : d(n, r);
        c[t] = a;
      };
    case "bracket-separator":
      return (t, n, c) => {
        const s = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !s) {
          c[t] = n && d(n, r);
          return;
        }
        const f = n === null ? [] : n.split(r.arrayFormatSeparator).map((a) => d(a, r));
        if (c[t] === void 0) {
          c[t] = f;
          return;
        }
        c[t] = [...c[t], ...f];
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
function R(r) {
  if (typeof r != "string" || r.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function i(r, e) {
  return e.encode ? e.strict ? G(r) : encodeURIComponent(r) : r;
}
function d(r, e) {
  return e.decode ? K(r) : r;
}
function N(r) {
  return Array.isArray(r) ? r.sort() : typeof r == "object" ? N(Object.keys(r)).sort((e, t) => Number(e) - Number(t)).map((e) => r[e]) : r;
}
function I(r) {
  const e = r.indexOf("#");
  return e !== -1 && (r = r.slice(0, e)), r;
}
function X(r) {
  let e = "";
  const t = r.indexOf("#");
  return t !== -1 && (e = r.slice(t)), e;
}
function w(r, e) {
  return e.parseNumbers && !Number.isNaN(Number(r)) && typeof r == "string" && r.trim() !== "" ? r = Number(r) : e.parseBooleans && r !== null && (r.toLowerCase() === "true" || r.toLowerCase() === "false") && (r = r.toLowerCase() === "true"), r;
}
function O(r) {
  r = I(r);
  const e = r.indexOf("?");
  return e === -1 ? "" : r.slice(e + 1);
}
function S(r, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, R(e.arrayFormatSeparator);
  const t = W(e), n = /* @__PURE__ */ Object.create(null);
  if (typeof r != "string" || (r = r.trim().replace(/^[?#&]/, ""), !r))
    return n;
  for (const c of r.split("&")) {
    if (c === "")
      continue;
    const s = e.decode ? c.replace(/\+/g, " ") : c;
    let [f, a] = A(s, "=");
    f === void 0 && (f = s), a = a === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? a : d(a, e), t(d(f, e), a, n);
  }
  for (const [c, s] of Object.entries(n))
    if (typeof s == "object" && s !== null)
      for (const [f, a] of Object.entries(s))
        s[f] = w(a, e);
    else
      n[c] = w(s, e);
  return e.sort === !1 ? n : (e.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(e.sort)).reduce((c, s) => {
    const f = n[s];
    return f && typeof f == "object" && !Array.isArray(f) ? c[s] = N(f) : c[s] = f, c;
  }, /* @__PURE__ */ Object.create(null));
}
function U(r, e) {
  if (!r)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, R(e.arrayFormatSeparator);
  const t = (f) => e.skipNull && z(r[f]) || e.skipEmptyString && r[f] === "", n = J(e), c = {};
  for (const [f, a] of Object.entries(r))
    t(f) || (c[f] = a);
  const s = Object.keys(c);
  return e.sort !== !1 && s.sort(e.sort), s.map((f) => {
    const a = r[f];
    return a === void 0 ? "" : a === null ? i(f, e) : Array.isArray(a) ? a.length === 0 && e.arrayFormat === "bracket-separator" ? i(f, e) + "[]" : a.reduce(n(f), []).join("&") : i(f, e) + "=" + i(a, e);
  }).filter((f) => f.length > 0).join("&");
}
function D(r, e) {
  var c;
  e = {
    decode: !0,
    ...e
  };
  let [t, n] = A(r, "#");
  return t === void 0 && (t = r), {
    url: ((c = t == null ? void 0 : t.split("?")) == null ? void 0 : c[0]) ?? "",
    query: S(O(r), e),
    ...e && e.parseFragmentIdentifier && n ? { fragmentIdentifier: d(n, e) } : {}
  };
}
function M(r, e) {
  e = {
    encode: !0,
    strict: !0,
    [F]: !0,
    ...e
  };
  const t = I(r.url).split("?")[0] || "", n = O(r.url), c = {
    ...S(n, { sort: !1 }),
    ...r.query
  };
  let s = U(c, e);
  s && (s = `?${s}`);
  let f = X(r.url);
  if (r.fragmentIdentifier) {
    const a = new URL(t);
    a.hash = r.fragmentIdentifier, f = e[F] ? a.hash : `#${r.fragmentIdentifier}`;
  }
  return `${t}${s}${f}`;
}
function q(r, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [F]: !1,
    ...t
  };
  const { url: n, query: c, fragmentIdentifier: s } = D(r, t);
  return M({
    url: n,
    query: P(c, e),
    fragmentIdentifier: s
  }, t);
}
function Y(r, e, t) {
  const n = Array.isArray(e) ? (c) => !e.includes(c) : (c, s) => !e(c, s);
  return q(r, n, t);
}
const l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: Y,
  extract: O,
  parse: S,
  parseUrl: D,
  pick: q,
  stringify: U,
  stringifyUrl: M
}, Symbol.toStringTag, { value: "Module" })), Z = (r) => Object.keys(r).reduce((e, t) => ([null, void 0, ""].includes(r[t]) || (e[t] = r[t]), e), {}), g = {
  arrayFormat: "bracket",
  parseBooleans: !0
}, rr = (r, e) => {
  const t = l.parse(r, g), n = Z({
    ...t,
    ...e
  });
  return l.stringify(n, g);
}, er = (r, e) => {
  const t = l.parse(r), n = Object.keys(t).reduce((c, s) => (e.includes(s) || (c[s] = t[s]), c), {});
  return l.stringify(n, g);
}, Q = (r) => l.parse(r, g), tr = (r, e) => {
  const { go: t, location: n } = o.useContext(p), c = o.useMemo(() => n ? Q(n.search)[r] : void 0, [n, r]), s = o.useCallback((f) => {
    t({ [r]: f });
  }, [t, r]);
  return C(() => {
    !c && e && t({ [r]: e }, !0);
  }), [
    c,
    s
  ];
}, nr = (r, e, t = 500) => {
  const { location: n, go: c } = o.useContext(p), s = o.useRef(), f = o.useMemo(() => {
    const m = n ? Q(n.search)[r] : void 0;
    return Array.isArray(m) ? m[0] : m;
  }, [n, r]), [a, u] = o.useState(f), y = o.useCallback(() => {
    c({ [r]: a });
  }, [c, r, a]);
  return o.useEffect(
    () => (f !== a && (s.current = window.setTimeout(() => {
      y();
    }, t)), () => {
      window.clearTimeout(s.current);
    }),
    [y, t, f, a]
  ), o.useEffect(() => {
    u(f);
  }, [f]), C(() => {
    !a && e && (c({ [r]: e }, !0), u(e));
  }), [
    a,
    f,
    u
  ];
};
export {
  p as RoutingContext,
  rr as addQuery,
  Q as parseQuery,
  g as queryStringOptions,
  er as removeQuery,
  nr as useDebouncedQueryState,
  tr as useQueryState,
  v as useRouter
};
