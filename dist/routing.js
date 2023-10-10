import u, { useEffect as T } from "react";
const B = (r, e) => {
  const t = q(r, e);
  return u.createContext({
    router: t,
    location: {
      pathname: window.location.pathname,
      search: "",
      hash: ""
    },
    go: (c, s) => r(window.location.pathname, c, s)
  });
}, L = (r) => () => {
  const { router: e } = u.useContext(r);
  return e;
};
var V = function(r) {
  T(r, []);
};
const _ = V;
var H = function(r) {
  _(function() {
    r();
  });
};
const C = H, $ = "%[a-f0-9]{2}", O = new RegExp("(" + $ + ")|([^%]+?)", "gi"), x = new RegExp("(" + $ + ")+", "gi");
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
function K(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    let e = r.match(O) || [];
    for (let t = 1; t < e.length; t++)
      r = h(e, t).join(""), e = r.match(O) || [];
    return r;
  }
}
function P(r) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = x.exec(r);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const c = K(t[0]);
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
function z(r) {
  if (typeof r != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof r + "`");
  try {
    return decodeURIComponent(r);
  } catch {
    return P(r);
  }
}
function E(r, e) {
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
function G(r, e) {
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
const J = (r) => r == null, W = (r) => encodeURIComponent(r).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), F = Symbol("encodeFragmentIdentifier");
function X(r) {
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
function Y(r) {
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
function j(r) {
  if (typeof r != "string" || r.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function o(r, e) {
  return e.encode ? e.strict ? W(r) : encodeURIComponent(r) : r;
}
function d(r, e) {
  return e.decode ? z(r) : r;
}
function R(r) {
  return Array.isArray(r) ? r.sort() : typeof r == "object" ? R(Object.keys(r)).sort((e, t) => Number(e) - Number(t)).map((e) => r[e]) : r;
}
function A(r) {
  const e = r.indexOf("#");
  return e !== -1 && (r = r.slice(0, e)), r;
}
function Z(r) {
  let e = "";
  const t = r.indexOf("#");
  return t !== -1 && (e = r.slice(t)), e;
}
function w(r, e) {
  return e.parseNumbers && !Number.isNaN(Number(r)) && typeof r == "string" && r.trim() !== "" ? r = Number(r) : e.parseBooleans && r !== null && (r.toLowerCase() === "true" || r.toLowerCase() === "false") && (r = r.toLowerCase() === "true"), r;
}
function p(r) {
  r = A(r);
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
  }, j(e.arrayFormatSeparator);
  const t = Y(e), n = /* @__PURE__ */ Object.create(null);
  if (typeof r != "string" || (r = r.trim().replace(/^[?#&]/, ""), !r))
    return n;
  for (const c of r.split("&")) {
    if (c === "")
      continue;
    const s = e.decode ? c.replace(/\+/g, " ") : c;
    let [a, f] = E(s, "=");
    a === void 0 && (a = s), f = f === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? f : d(f, e), t(d(a, e), f, n);
  }
  for (const [c, s] of Object.entries(n))
    if (typeof s == "object" && s !== null)
      for (const [a, f] of Object.entries(s))
        s[a] = w(f, e);
    else
      n[c] = w(s, e);
  return e.sort === !1 ? n : (e.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(e.sort)).reduce((c, s) => {
    const a = n[s];
    return a && typeof a == "object" && !Array.isArray(a) ? c[s] = R(a) : c[s] = a, c;
  }, /* @__PURE__ */ Object.create(null));
}
function N(r, e) {
  if (!r)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, j(e.arrayFormatSeparator);
  const t = (a) => e.skipNull && J(r[a]) || e.skipEmptyString && r[a] === "", n = X(e), c = {};
  for (const [a, f] of Object.entries(r))
    t(a) || (c[a] = f);
  const s = Object.keys(c);
  return e.sort !== !1 && s.sort(e.sort), s.map((a) => {
    const f = r[a];
    return f === void 0 ? "" : f === null ? o(a, e) : Array.isArray(f) ? f.length === 0 && e.arrayFormat === "bracket-separator" ? o(a, e) + "[]" : f.reduce(n(a), []).join("&") : o(a, e) + "=" + o(f, e);
  }).filter((a) => a.length > 0).join("&");
}
function U(r, e) {
  var c;
  e = {
    decode: !0,
    ...e
  };
  let [t, n] = E(r, "#");
  return t === void 0 && (t = r), {
    url: ((c = t == null ? void 0 : t.split("?")) == null ? void 0 : c[0]) ?? "",
    query: S(p(r), e),
    ...e && e.parseFragmentIdentifier && n ? { fragmentIdentifier: d(n, e) } : {}
  };
}
function I(r, e) {
  e = {
    encode: !0,
    strict: !0,
    [F]: !0,
    ...e
  };
  const t = A(r.url).split("?")[0] || "", n = p(r.url), c = {
    ...S(n, { sort: !1 }),
    ...r.query
  };
  let s = N(c, e);
  s && (s = `?${s}`);
  let a = Z(r.url);
  if (r.fragmentIdentifier) {
    const f = new URL(t);
    f.hash = r.fragmentIdentifier, a = e[F] ? f.hash : `#${r.fragmentIdentifier}`;
  }
  return `${t}${s}${a}`;
}
function D(r, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [F]: !1,
    ...t
  };
  const { url: n, query: c, fragmentIdentifier: s } = U(r, t);
  return I({
    url: n,
    query: G(c, e),
    fragmentIdentifier: s
  }, t);
}
function k(r, e, t) {
  const n = Array.isArray(e) ? (c) => !e.includes(c) : (c, s) => !e(c, s);
  return D(r, n, t);
}
const g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: k,
  extract: p,
  parse: S,
  parseUrl: U,
  pick: D,
  stringify: N,
  stringifyUrl: I
}, Symbol.toStringTag, { value: "Module" })), v = (r) => Object.keys(r).reduce((e, t) => ([null, void 0, ""].includes(r[t]) || (e[t] = r[t]), e), {}), y = {
  arrayFormat: "bracket",
  parseBooleans: !0
}, nr = (r, e) => {
  const t = g.parse(r, y), n = v({
    ...t,
    ...e
  });
  return g.stringify(n, y);
}, cr = (r, e) => {
  const t = g.parse(r), n = Object.keys(t).reduce((c, s) => (e.includes(s) || (c[s] = t[s]), c), {});
  return g.stringify(n, y);
}, M = (r) => g.parse(r, y), rr = (r) => (e, t) => {
  const { go: n, location: c } = u.useContext(r), s = u.useMemo(() => c ? M(c.search)[e] : void 0, [c, e]), a = u.useCallback((f) => {
    n({ [e]: f });
  }, [n, e]);
  return C(() => {
    !s && t && n({ [e]: t }, !0);
  }), [
    s,
    a
  ];
}, er = (r) => (e, t, n = 500) => {
  const { go: c, location: s } = u.useContext(r), a = u.useRef(), f = u.useMemo(() => {
    const m = s ? M(s.search)[e] : void 0;
    return Array.isArray(m) ? m[0] : m;
  }, [s, e]), [i, l] = u.useState(f), b = u.useCallback(() => {
    c({ [e]: i });
  }, [c, e, i]);
  return u.useEffect(
    () => (f !== i && (a.current = window.setTimeout(() => {
      b();
    }, n)), () => {
      window.clearTimeout(a.current);
    }),
    [b, n, f, i]
  ), u.useEffect(() => {
    l(f);
  }, [f]), C(() => {
    !i && t && (c({ [e]: t }, !0), l(t));
  }), [
    i,
    f,
    l
  ];
}, Q = (r, e, t = "") => {
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
        ...q(r, s.routes, a)
      };
    };
  const n = `${t}${e.path}`;
  return {
    path: n,
    go: (c, s = !1) => r(n, c, s),
    ...Object.keys(e.routes).reduce((c, s) => ({
      ...c,
      [s]: Q(r, e.routes[s], n)
    }), {})
  };
}, q = (r, e, t = "") => Object.keys(e).reduce((n, c) => ({
  ...n,
  [c]: Q(r, e[c], t)
}), {}), sr = (r, e) => {
  const t = B(r, e), n = L(t), c = rr(t), s = er(t);
  return {
    RoutingContext: t,
    useRouter: n,
    useQueryState: c,
    useDebouncedQueryState: s
  };
};
export {
  nr as addQuery,
  q as generateRoutes,
  sr as generateRouting,
  M as parseQuery,
  y as queryStringOptions,
  cr as removeQuery
};
