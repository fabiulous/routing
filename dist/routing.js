import u, { useEffect as B } from "react";
const L = (r, e) => {
  const t = T(r, e);
  return u.createContext({
    router: t,
    location: {
      pathname: window.location.pathname,
      search: "",
      hash: ""
    },
    go: (c, s) => r(window.location.pathname, c, s)
  });
}, V = (r) => () => {
  const { router: e } = u.useContext(r);
  return e;
};
var _ = function(r) {
  B(r, []);
};
const H = _;
var K = function(r) {
  H(function() {
    r();
  });
};
const $ = K, E = "%[a-f0-9]{2}", x = new RegExp("(" + E + ")|([^%]+?)", "gi"), w = new RegExp("(" + E + ")+", "gi");
function F(r, e) {
  try {
    return [decodeURIComponent(r.join(""))];
  } catch {
  }
  if (r.length === 1)
    return r;
  e = e || 1;
  const t = r.slice(0, e), n = r.slice(e);
  return Array.prototype.concat.call([], F(t), F(n));
}
function P(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    let e = r.match(x) || [];
    for (let t = 1; t < e.length; t++)
      r = F(e, t).join(""), e = r.match(x) || [];
    return r;
  }
}
function z(r) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = w.exec(r);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const c = P(t[0]);
      c !== t[0] && (e[t[0]] = c);
    }
    t = w.exec(r);
  }
  e["%C2"] = "�";
  const n = Object.keys(e);
  for (const c of n)
    r = r.replace(new RegExp(c, "g"), e[c]);
  return r;
}
function G(r) {
  if (typeof r != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof r + "`");
  try {
    return decodeURIComponent(r);
  } catch {
    return z(r);
  }
}
function j(r, e) {
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
function J(r, e) {
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
const W = (r) => r == null, X = (r) => encodeURIComponent(r).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), p = Symbol("encodeFragmentIdentifier");
function Y(r) {
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
function Z(r) {
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
function R(r) {
  if (typeof r != "string" || r.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function o(r, e) {
  return e.encode ? e.strict ? X(r) : encodeURIComponent(r) : r;
}
function d(r, e) {
  return e.decode ? G(r) : r;
}
function A(r) {
  return Array.isArray(r) ? r.sort() : typeof r == "object" ? A(Object.keys(r)).sort((e, t) => Number(e) - Number(t)).map((e) => r[e]) : r;
}
function N(r) {
  const e = r.indexOf("#");
  return e !== -1 && (r = r.slice(0, e)), r;
}
function k(r) {
  let e = "";
  const t = r.indexOf("#");
  return t !== -1 && (e = r.slice(t)), e;
}
function C(r, e) {
  return e.parseNumbers && !Number.isNaN(Number(r)) && typeof r == "string" && r.trim() !== "" ? r = Number(r) : e.parseBooleans && r !== null && (r.toLowerCase() === "true" || r.toLowerCase() === "false") && (r = r.toLowerCase() === "true"), r;
}
function S(r) {
  r = N(r);
  const e = r.indexOf("?");
  return e === -1 ? "" : r.slice(e + 1);
}
function b(r, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, R(e.arrayFormatSeparator);
  const t = Z(e), n = /* @__PURE__ */ Object.create(null);
  if (typeof r != "string" || (r = r.trim().replace(/^[?#&]/, ""), !r))
    return n;
  for (const c of r.split("&")) {
    if (c === "")
      continue;
    const s = e.decode ? c.replace(/\+/g, " ") : c;
    let [a, f] = j(s, "=");
    a === void 0 && (a = s), f = f === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? f : d(f, e), t(d(a, e), f, n);
  }
  for (const [c, s] of Object.entries(n))
    if (typeof s == "object" && s !== null)
      for (const [a, f] of Object.entries(s))
        s[a] = C(f, e);
    else
      n[c] = C(s, e);
  return e.sort === !1 ? n : (e.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(e.sort)).reduce((c, s) => {
    const a = n[s];
    return a && typeof a == "object" && !Array.isArray(a) ? c[s] = A(a) : c[s] = a, c;
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
  const t = (a) => e.skipNull && W(r[a]) || e.skipEmptyString && r[a] === "", n = Y(e), c = {};
  for (const [a, f] of Object.entries(r))
    t(a) || (c[a] = f);
  const s = Object.keys(c);
  return e.sort !== !1 && s.sort(e.sort), s.map((a) => {
    const f = r[a];
    return f === void 0 ? "" : f === null ? o(a, e) : Array.isArray(f) ? f.length === 0 && e.arrayFormat === "bracket-separator" ? o(a, e) + "[]" : f.reduce(n(a), []).join("&") : o(a, e) + "=" + o(f, e);
  }).filter((a) => a.length > 0).join("&");
}
function I(r, e) {
  var c;
  e = {
    decode: !0,
    ...e
  };
  let [t, n] = j(r, "#");
  return t === void 0 && (t = r), {
    url: ((c = t == null ? void 0 : t.split("?")) == null ? void 0 : c[0]) ?? "",
    query: b(S(r), e),
    ...e && e.parseFragmentIdentifier && n ? { fragmentIdentifier: d(n, e) } : {}
  };
}
function D(r, e) {
  e = {
    encode: !0,
    strict: !0,
    [p]: !0,
    ...e
  };
  const t = N(r.url).split("?")[0] || "", n = S(r.url), c = {
    ...b(n, { sort: !1 }),
    ...r.query
  };
  let s = U(c, e);
  s && (s = `?${s}`);
  let a = k(r.url);
  if (r.fragmentIdentifier) {
    const f = new URL(t);
    f.hash = r.fragmentIdentifier, a = e[p] ? f.hash : `#${r.fragmentIdentifier}`;
  }
  return `${t}${s}${a}`;
}
function M(r, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [p]: !1,
    ...t
  };
  const { url: n, query: c, fragmentIdentifier: s } = I(r, t);
  return D({
    url: n,
    query: J(c, e),
    fragmentIdentifier: s
  }, t);
}
function v(r, e, t) {
  const n = Array.isArray(e) ? (c) => !e.includes(c) : (c, s) => !e(c, s);
  return M(r, n, t);
}
const g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: v,
  extract: S,
  parse: b,
  parseUrl: I,
  pick: M,
  stringify: U,
  stringifyUrl: D
}, Symbol.toStringTag, { value: "Module" })), rr = (r) => Object.keys(r).reduce((e, t) => ([null, void 0, ""].includes(r[t]) || (e[t] = r[t]), e), {}), y = {
  arrayFormat: "bracket",
  parseBooleans: !0
}, cr = (r, e) => {
  const t = g.parse(r, y), n = rr({
    ...t,
    ...e
  });
  return g.stringify(n, y);
}, sr = (r, e) => {
  const t = g.parse(r), n = Object.keys(t).reduce((c, s) => (e.includes(s) || (c[s] = t[s]), c), {});
  return g.stringify(n, y);
}, Q = (r) => g.parse(r, y), er = (r) => (e, t) => {
  const { go: n, location: c } = u.useContext(r), s = u.useMemo(() => c ? Q(c.search)[e] : void 0, [c, e]), a = u.useCallback((f, i = !1) => {
    n({ [e]: f }, i);
  }, [n, e]);
  return $(() => {
    !s && t && n({ [e]: t }, !0);
  }), [
    s,
    a
  ];
}, tr = (r) => (e, t, n = 500, c = !1) => {
  const { go: s, location: a } = u.useContext(r), f = u.useRef(), i = u.useMemo(() => {
    const h = a ? Q(a.search)[e] : void 0;
    return Array.isArray(h) ? h[0] : h;
  }, [a, e]), [l, m] = u.useState(i), O = u.useCallback(() => {
    s({ [e]: l }, c);
  }, [s, e, l, c]);
  return u.useEffect(
    () => (i !== l && (f.current = window.setTimeout(() => {
      O();
    }, n)), () => {
      window.clearTimeout(f.current);
    }),
    [O, n, i, l]
  ), u.useEffect(() => {
    m(i);
  }, [i]), $(() => {
    !l && t && (s({ [e]: t }, !0), m(t));
  }), [
    l,
    i,
    m
  ];
}, q = (r, e, t = "") => {
  if (typeof e == "string") {
    const c = `${t}${e}`;
    return {
      path: c,
      go: (s, a = !1) => r(c, s, a)
    };
  }
  if (typeof e == "function")
    return (...c) => {
      const s = e(...c);
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
        ...T(r, s.routes, a)
      };
    };
  const n = `${t}${e.path}`;
  return {
    path: n,
    go: (c, s = !1) => r(n, c, s),
    ...Object.keys(e.routes).reduce((c, s) => ({
      ...c,
      [s]: q(r, e.routes[s], n)
    }), {})
  };
}, T = (r, e, t = "") => Object.keys(e).reduce((n, c) => ({
  ...n,
  [c]: q(r, e[c], t)
}), {}), ar = (r, e) => {
  const t = L(r, e), n = V(t), c = er(t), s = tr(t);
  return {
    RoutingContext: t,
    useRouter: n,
    useQueryState: c,
    useDebouncedQueryState: s
  };
};
export {
  cr as addQuery,
  T as generateRoutes,
  ar as generateRouting,
  Q as parseQuery,
  y as queryStringOptions,
  sr as removeQuery
};
