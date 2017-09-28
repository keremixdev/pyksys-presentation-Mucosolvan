function extend(e, t) {
    var n;
    e || (e = {});
    for (n in t) e[n] = t[n];
    return e
}

function merge() {
    var e, t = arguments,
        n, r = {},
        i = function(e, t) {
            var n, r;
            typeof e != "object" && (e = {});
            for (r in t) t.hasOwnProperty(r) && (n = t[r], n && typeof n == "object" && Object.prototype.toString.call(n) !== "[object Array]" && r !== "renderTo" && typeof n.nodeType != "number" ? e[r] = i(e[r] || {}, n) : e[r] = t[r]);
            return e
        };
    t[0] === !0 && (r = t[1], t = Array.prototype.slice.call(t, 2)), n = t.length;
    for (e = 0; e < n; e++) r = i(r, t[e]);
    return r
}

function pInt(e, t) {
    return parseInt(e, t || 10)
}

function isString(e) {
    return typeof e == "string"
}

function isObject(e) {
    return e && typeof e == "object"
}

function isArray(e) {
    return Object.prototype.toString.call(e) === "[object Array]"
}

function defined(e) {
    return e !== UNDEFINED && e !== null
}

function attr(e, t, n) {
    var r, i;
    if (isString(t)) defined(n) ? e.setAttribute(t, n) : e && e.getAttribute && (i = e.getAttribute(t));
    else if (defined(t) && isObject(t))
        for (r in t) e.setAttribute(r, t[r]);
    return i
}

function pick() {
    var e = arguments,
        t, n, r = e.length;
    for (t = 0; t < r; t++) {
        n = e[t];
        if (n !== UNDEFINED && n !== null) return n
    }
}

function css(e, t) {
    extend(e.style, t)
}

function createElement(e, t, n, r, i) {
    var s = doc.createElement(e);
    return t && extend(s, t), i && css(s, {
        padding: 0,
        border: NONE,
        margin: 0
    }), n && css(s, n), r && r.appendChild(s), s
}

function animate(e, t, n) {
    var r, i = "",
        s, o, u, a;
    e.stopAnimation = !1;
    if (typeof n != "object" || n === null) u = arguments, n = {
        duration: u[2],
        easing: u[3],
        complete: u[4]
    };
    typeof n.duration != "number" && (n.duration = 400), n.easing = Math[n.easing] || Math.easeInOutSine, n.curAnim = extend({}, t);
    for (a in t) o = new Fx(e, n, a), s = null, a === "d" ? (o.paths = pathAnim.init(e, e.d, t.d), o.toD = t.d, r = 0, s = 1) : e.attr ? r = e.attr(a) : (r = parseFloat(getStyle(e, a)) || 0, a !== "opacity" && (i = "px")), s || (s = t[a]), o.custom(r, s, i)
}

function getStyle(e, t) {
    return window.getComputedStyle(e, undefined).getPropertyValue(t)
}

function stop(e) {
    e.stopAnimation = !0
}

function each(e, t) {
    return Array.prototype.forEach.call(e, t)
}

function SVGElement() {}
var requirejs, require, define;
(function(global) {
    function isFunction(e) {
        return ostring.call(e) === "[object Function]"
    }

    function isArray(e) {
        return ostring.call(e) === "[object Array]"
    }

    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length; n += 1)
                if (e[n] && t(e[n], n, e)) break
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1; n -= 1)
                if (e[n] && t(e[n], n, e)) break
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var n;
        for (n in e)
            if (hasProp(e, n) && t(e[n], n)) break
    }

    function mixin(e, t, n, r) {
        return t && eachProp(t, function(t, i) {
            if (n || !hasProp(e, i)) r && typeof t == "object" && t && !isArray(t) && !isFunction(t) && !(t instanceof RegExp) ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t
        }), e
    }

    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function(e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, n, r) {
        var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
    }

    function newContext(e) {
        function m(e) {
            var t, n;
            for (t = 0; t < e.length; t++) {
                n = e[t];
                if (n === ".") e.splice(t, 1), t -= 1;
                else if (n === "..") {
                    if (t === 0 || t == 1 && e[2] === ".." || e[t - 1] === "..") continue;
                    t > 0 && (e.splice(t - 1, 2), t -= 2)
                }
            }
        }

        function g(e, t, n) {
            var r, i, s, u, a, f, l, c, h, p, d, v, g = t && t.split("/"),
                y = o.map,
                b = y && y["*"];
            e && (e = e.split("/"), l = e.length - 1, o.nodeIdCompat && jsSuffixRegExp.test(e[l]) && (e[l] = e[l].replace(jsSuffixRegExp, "")), e[0].charAt(0) === "." && g && (v = g.slice(0, g.length - 1), e = v.concat(e)), m(e), e = e.join("/"));
            if (n && y && (g || b)) {
                s = e.split("/");
                e: for (u = s.length; u > 0; u -= 1) {
                    f = s.slice(0, u).join("/");
                    if (g)
                        for (a = g.length; a > 0; a -= 1) {
                            i = getOwn(y, g.slice(0, a).join("/"));
                            if (i) {
                                i = getOwn(i, f);
                                if (i) {
                                    c = i, h = u;
                                    break e
                                }
                            }
                        }!p && b && getOwn(b, f) && (p = getOwn(b, f), d = u)
                }!c && p && (c = p, h = d), c && (s.splice(0, h, c), e = s.join("/"))
            }
            return r = getOwn(o.pkgs, e), r ? r : e
        }

        function y(e) {
            isBrowser && each(scripts(), function(t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName) return t.parentNode.removeChild(t), !0
            })
        }

        function b(e) {
            var t = getOwn(o.paths, e);
            if (t && isArray(t) && t.length > 1) return t.shift(), r.require.undef(e), r.makeRequire(null, {
                skipMap: !0
            })([e]), !0
        }

        function w(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function E(e, t, n, i) {
            var s, o, u, a, f = null,
                l = t ? t.name : null,
                h = e,
                p = !0,
                m = "";
            return e || (p = !1, e = "_@r" + (d += 1)), a = w(e), f = a[0], e = a[1], f && (f = g(f, l, i), o = getOwn(c, f)), e && (f ? o && o.normalize ? m = o.normalize(e, function(e) {
                return g(e, l, i)
            }) : m = e.indexOf("!") === -1 ? g(e, l, i) : e : (m = g(e, l, i), a = w(m), f = a[0], m = a[1], n = !0, s = r.nameToUrl(m))), u = f && !o && !n ? "_unnormalized" + (v += 1) : "", {
                prefix: f,
                name: m,
                parentMap: t,
                unnormalized: !!u,
                url: s,
                originalName: h,
                isDefine: p,
                id: (f ? f + "!" + m : m) + u
            }
        }

        function S(e) {
            var t = e.id,
                n = getOwn(u, t);
            return n || (n = u[t] = new r.Module(e)), n
        }

        function x(e, t, n) {
            var r = e.id,
                i = getOwn(u, r);
            hasProp(c, r) && (!i || i.defineEmitComplete) ? t === "defined" && n(c[r]) : (i = S(e), i.error && t === "error" ? n(i.error) : i.on(t, n))
        }

        function T(e, t) {
            var n = e.requireModules,
                r = !1;
            t ? t(e) : (each(n, function(t) {
                var n = getOwn(u, t);
                n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
            }), r || req.onError(e))
        }

        function N() {
            globalDefQueue.length && (apsp.apply(l, [l.length, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function C(e) {
            delete u[e], delete a[e]
        }

        function k(e, t, n) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function(r, i) {
                var s = r.id,
                    o = getOwn(u, s);
                o && !e.depMatched[i] && !n[s] && (getOwn(t, s) ? (e.defineDep(i, c[s]), e.check()) : k(o, t, n))
            }), n[r] = !0)
        }

        function L() {
            var e, n, i = o.waitSeconds * 1e3,
                u = i && r.startTime + i < (new Date).getTime(),
                f = [],
                l = [],
                c = !1,
                h = !0;
            if (t) return;
            t = !0, eachProp(a, function(e) {
                var t = e.map,
                    r = t.id;
                if (!e.enabled) return;
                t.isDefine || l.push(e);
                if (!e.error)
                    if (!e.inited && u) b(r) ? (n = !0, c = !0) : (f.push(r), y(r));
                    else if (!e.inited && e.fetched && t.isDefine) {
                    c = !0;
                    if (!t.prefix) return h = !1
                }
            });
            if (u && f.length) return e = makeError("timeout", "Load timeout for modules: " + f, null, f), e.contextName = r.contextName, T(e);
            h && each(l, function(e) {
                k(e, {}, {})
            }), (!u || n) && c && (isBrowser || isWebWorker) && !s && (s = setTimeout(function() {
                s = 0, L()
            }, 50)), t = !1
        }

        function A(e) {
            hasProp(c, e[0]) || S(E(e[0], null, !0)).init(e[1], e[2])
        }

        function O(e, t, n, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
        }

        function M(e) {
            var t = e.currentTarget || e.srcElement;
            return O(t, r.onScriptLoad, "load", "onreadystatechange"), O(t, r.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function _() {
            var e;
            N();
            while (l.length) {
                e = l.shift();
                if (e[0] === null) return T(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                A(e)
            }
        }
        var t, n, r, i, s, o = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            u = {},
            a = {},
            f = {},
            l = [],
            c = {},
            h = {},
            p = {},
            d = 1,
            v = 1;
        return i = {
            require: function(e) {
                return e.require ? e.require : e.require = r.makeRequire(e.map)
            },
            exports: function(e) {
                e.usingExports = !0;
                if (e.map.isDefine) return e.exports ? c[e.map.id] = e.exports : e.exports = c[e.map.id] = {}
            },
            module: function(e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        return getOwn(o.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        }, n = function(e) {
            this.events = getOwn(f, e.id) || {}, this.map = e, this.shim = getOwn(o.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, n.prototype = {
            init: function(e, t, n, r) {
                r = r || {};
                if (this.inited) return;
                this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
                    this.emit("error", e)
                })), e && e.slice && (this.depMaps = e && e.slice(0)), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function() {
                if (this.fetched) return;
                this.fetched = !0, r.startTime = (new Date).getTime();
                var e = this.map;
                if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
                r.makeRequire(this.map, {
                    enableBuildCallback: !0
                })(this.shim.deps || [], bind(this, function() {
                    return e.prefix ? this.callPlugin() : this.load()
                }))
            },
            load: function() {
                var e = this.map.url;
                h[e] || (h[e] = !0, r.load(this.map.id, e))
            },
            check: function() {
                if (!this.enabled || this.enabling) return;
                var e, t, n = this.map.id,
                    i = this.depExports,
                    s = this.exports,
                    o = this.factory;
                if (!this.inited) this.fetch();
                else if (this.error) this.emit("error", this.error);
                else if (!this.defining) {
                    this.defining = !0;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(o)) {
                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                s = r.execCb(n, o, i, s)
                            } catch (u) {
                                e = u
                            } else s = r.execCb(n, o, i, s);
                            this.map.isDefine && s === undefined && (t = this.module, t ? s = t.exports : this.usingExports && (s = this.exports));
                            if (e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", T(this.error = e)
                        } else s = o;
                        this.exports = s, this.map.isDefine && !this.ignore && (c[n] = s, req.onResourceLoad && req.onResourceLoad(r, this.map, this.depMaps)), C(n), this.defined = !0
                    }
                    this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                }
            },
            callPlugin: function() {
                var e = this.map,
                    t = e.id,
                    n = E(e.prefix);
                this.depMaps.push(n), x(n, "defined", bind(this, function(n) {
                    var i, s, a, f = getOwn(p, this.map.id),
                        l = this.map.name,
                        c = this.map.parentMap ? this.map.parentMap.name : null,
                        h = r.makeRequire(e.parentMap, {
                            enableBuildCallback: !0
                        });
                    if (this.map.unnormalized) {
                        n.normalize && (l = n.normalize(l, function(e) {
                            return g(e, c, !0)
                        }) || ""), s = E(e.prefix + "!" + l, this.map.parentMap), x(s, "defined", bind(this, function(e) {
                            this.init([], function() {
                                return e
                            }, null, {
                                enabled: !0,
                                ignore: !0
                            })
                        })), a = getOwn(u, s.id), a && (this.depMaps.push(s), this.events.error && a.on("error", bind(this, function(e) {
                            this.emit("error", e)
                        })), a.enable());
                        return
                    }
                    if (f) {
                        this.map.url = r.nameToUrl(f), this.load();
                        return
                    }
                    i = bind(this, function(e) {
                        this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0
                        })
                    }), i.error = bind(this, function(e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(u, function(e) {
                            e.map.id.indexOf(t + "_unnormalized") === 0 && C(e.map.id)
                        }), T(e)
                    }), i.fromText = bind(this, function(n, s) {
                        var u = e.name,
                            a = E(u),
                            f = useInteractive;
                        s && (n = s), f && (useInteractive = !1), S(a), hasProp(o.config, t) && (o.config[u] = o.config[t]);
                        try {
                            req.exec(n)
                        } catch (l) {
                            return T(makeError("fromtexteval", "fromText eval for " + t + " failed: " + l, l, [t]))
                        }
                        f && (useInteractive = !0), this.depMaps.push(a), r.completeLoad(u), h([u], i)
                    }), n.load(e.name, h, i, o)
                })), r.enable(n, this), this.pluginMaps[n.id] = n
            },
            enable: function() {
                a[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
                    var n, s, o;
                    if (typeof e == "string") {
                        e = E(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, o = getOwn(i, e.id);
                        if (o) {
                            this.depExports[t] = o(this);
                            return
                        }
                        this.depCount += 1, x(e, "defined", bind(this, function(e) {
                            this.defineDep(t, e), this.check()
                        })), this.errback && x(e, "error", bind(this, this.errback))
                    }
                    n = e.id, s = u[n], !hasProp(i, n) && s && !s.enabled && r.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function(e) {
                    var t = getOwn(u, e.id);
                    t && !t.enabled && r.enable(e, this)
                })), this.enabling = !1, this.check()
            },
            on: function(e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []), n.push(t)
            },
            emit: function(e, t) {
                each(this.events[e], function(e) {
                    e(t)
                }), e === "error" && delete this.events[e]
            }
        }, r = {
            config: o,
            contextName: e,
            registry: u,
            defined: c,
            urlFetched: h,
            defQueue: l,
            Module: n,
            makeModuleMap: E,
            nextTick: req.nextTick,
            onError: T,
            configure: function(e) {
                e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
                var t = o.shim,
                    n = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(e, function(e, t) {
                    n[t] ? (o[t] || (o[t] = {}), mixin(o[t], e, !0, !0)) : o[t] = e
                }), e.bundles && eachProp(e.bundles, function(e, t) {
                    each(e, function(e) {
                        e !== t && (p[e] = t)
                    })
                }), e.shim && (eachProp(e.shim, function(e, n) {
                    isArray(e) && (e = {
                        deps: e
                    }), (e.exports || e.init) && !e.exportsFn && (e.exportsFn = r.makeShimExports(e)), t[n] = e
                }), o.shim = t), e.packages && each(e.packages, function(e) {
                    var t, n;
                    e = typeof e == "string" ? {
                        name: e
                    } : e, n = e.name, t = e.location, t && (o.paths[n] = e.location), o.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(u, function(e, t) {
                    !e.inited && !e.map.unnormalized && (e.map = E(t))
                }), (e.deps || e.callback) && r.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }
                return t
            },
            makeRequire: function(t, n) {
                function s(o, a, f) {
                    var l, h, p;
                    return n.enableBuildCallback && a && isFunction(a) && (a.__requireJsBuild = !0), typeof o == "string" ? isFunction(a) ? T(makeError("requireargs", "Invalid require call"), f) : t && hasProp(i, o) ? i[o](u[t.id]) : req.get ? req.get(r, o, t, s) : (h = E(o, t, !1, !0), l = h.id, hasProp(c, l) ? c[l] : T(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (_(), r.nextTick(function() {
                        _(), p = S(E(null, t)), p.skipMap = n.skipMap, p.init(o, a, f, {
                            enabled: !0
                        }), L()
                    }), s)
                }
                return n = n || {}, mixin(s, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var n, i = e.lastIndexOf("."),
                            s = e.split("/")[0],
                            o = s === "." || s === "..";
                        return i !== -1 && (!o || i > 1) && (n = e.substring(i, e.length), e = e.substring(0, i)), r.nameToUrl(g(e, t && t.id, !0), n, !0)
                    },
                    defined: function(e) {
                        return hasProp(c, E(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = E(e, t, !1, !0).id, hasProp(c, e) || hasProp(u, e)
                    }
                }), t || (s.undef = function(e) {
                    N();
                    var n = E(e, t, !0),
                        r = getOwn(u, e);
                    y(e), delete c[e], delete h[n.url], delete f[e], eachReverse(l, function(t, n) {
                        t[0] === e && l.splice(n, 1)
                    }), r && (r.events.defined && (f[e] = r.events), C(e))
                }), s
            },
            enable: function(e) {
                var t = getOwn(u, e.id);
                t && S(e).enable()
            },
            completeLoad: function(e) {
                var t, n, r, i = getOwn(o.shim, e) || {},
                    s = i.exports;
                N();
                while (l.length) {
                    n = l.shift();
                    if (n[0] === null) {
                        n[0] = e;
                        if (t) break;
                        t = !0
                    } else n[0] === e && (t = !0);
                    A(n)
                }
                r = getOwn(u, e);
                if (!t && !hasProp(c, e) && r && !r.inited) {
                    if (o.enforceDefine && (!s || !getGlobal(s))) {
                        if (b(e)) return;
                        return T(makeError("nodefine", "No define call for " + e, null, [e]))
                    }
                    A([e, i.deps || [], i.exportsFn])
                }
                L()
            },
            nameToUrl: function(e, t, n) {
                var i, s, u, a, f, l, c, h = getOwn(o.pkgs, e);
                h && (e = h), c = getOwn(p, e);
                if (c) return r.nameToUrl(c, t, n);
                if (req.jsExtRegExp.test(e)) f = e + (t || "");
                else {
                    i = o.paths, s = e.split("/");
                    for (u = s.length; u > 0; u -= 1) {
                        a = s.slice(0, u).join("/"), l = getOwn(i, a);
                        if (l) {
                            isArray(l) && (l = l[0]), s.splice(0, u, l);
                            break
                        }
                    }
                    f = s.join("/"), f += t || (/^data\:|\?/.test(f) || n ? "" : ".js"), f = (f.charAt(0) === "/" || f.match(/^[\w\+\.\-]+:/) ? "" : o.baseUrl) + f
                }
                return o.urlArgs ? f + ((f.indexOf("?") === -1 ? "?" : "&") + o.urlArgs) : f
            },
            load: function(e, t) {
                req.load(r, e, t)
            },
            execCb: function(e, t, n, r) {
                return t.apply(r, n)
            },
            onScriptLoad: function(e) {
                if (e.type === "load" || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = M(e);
                    r.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = M(e);
                if (!b(t.id)) return T(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
            }
        }, r.require = r.makeRequire(), r
    }

    function getInteractiveScript() {
        return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript : (eachReverse(scripts(), function(e) {
            if (e.readyState === "interactive") return interactiveScript = e
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.14",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = typeof window != "undefined" && typeof navigator != "undefined" && !!window.document,
        isWebWorker = !isBrowser && typeof importScripts != "undefined",
        readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]",
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if (typeof define != "undefined") return;
    if (typeof requirejs != "undefined") {
        if (isFunction(requirejs)) return;
        cfg = requirejs, requirejs = undefined
    }
    typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined), req = requirejs = function(e, t, n, r) {
        var i, s, o = defContextName;
        return !isArray(e) && typeof e != "string" && (s = e, isArray(t) ? (e = t, t = n, n = r) : e = []), s && s.context && (o = s.context), i = getOwn(contexts, o), i || (i = contexts[o] = req.s.newContext(o)), s && i.configure(s), i.require(e, t, n)
    }, req.config = function(e) {
        return req(e)
    }, req.nextTick = typeof setTimeout != "undefined" ? function(e) {
        setTimeout(e, 4)
    } : function(e) {
        e()
    }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
        contexts: contexts,
        newContext: newContext
    }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
        req[e] = function() {
            var t = contexts[defContextName];
            return t.require[e].apply(t, arguments)
        }
    }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e, t, n) {
        var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
    }, req.load = function(e, t, n) {
        var r = e && e.config || {},
            i;
        if (isBrowser) return i = req.createNode(r, t, n), i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
        if (isWebWorker) try {
            importScripts(n), e.completeLoad(t)
        } catch (s) {
            e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, s, [t]))
        }
    }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
        head || (head = e.parentNode), dataMain = e.getAttribute("data-main");
        if (dataMain) return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
    }), define = function(e, t, n) {
        var r, i;
        typeof e != "string" && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, n) {
            t.push(n)
        }), t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
    }, define.amd = {
        jQuery: !0
    }, req.exec = function(text) {
        return eval(text)
    }, req(cfg)
})(this), define("requireLib", function() {}), ! function(e, t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(a, b) {
        function s(e) {
            var t = e.length,
                r = n.type(e);
            return "function" === r || n.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
        }

        function x(e, t, r) {
            if (n.isFunction(t)) return n.grep(e, function(e, n) {
                return !!t.call(e, n, e) !== r
            });
            if (t.nodeType) return n.grep(e, function(e) {
                return e === t !== r
            });
            if ("string" == typeof t) {
                if (w.test(t)) return n.filter(t, e, r);
                t = n.filter(t, e)
            }
            return n.grep(e, function(e) {
                return g.call(t, e) >= 0 !== r
            })
        }

        function D(e, t) {
            while ((e = e[t]) && 1 !== e.nodeType);
            return e
        }

        function G(e) {
            var t = F[e] = {};
            return n.each(e.match(E) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function I() {
            l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready()
        }

        function K() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                    return {}
                }
            }), this.expando = n.expando + Math.random()
        }

        function P(e, t, r) {
            var i;
            if (void 0 === r && 1 === e.nodeType)
                if (i = "data-" + t.replace(O, "-$1").toLowerCase(), r = e.getAttribute(i), "string" == typeof r) {
                    try {
                        r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : N.test(r) ? n.parseJSON(r) : r
                    } catch (s) {}
                    M.set(e, t, r)
                } else r = void 0;
            return r
        }

        function Z() {
            return !0
        }

        function $() {
            return !1
        }

        function _() {
            try {
                return l.activeElement
            } catch (e) {}
        }

        function jb(e, t) {
            return n.nodeName(e, "table") && n.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function kb(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function lb(e) {
            var t = gb.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function mb(e, t) {
            for (var n = 0, r = e.length; r > n; n++) L.set(e[n], "globalEval", !t || L.get(t[n], "globalEval"))
        }

        function nb(e, t) {
            var r, i, s, o, u, a, f, l;
            if (1 === t.nodeType) {
                if (L.hasData(e) && (o = L.access(e), u = L.set(t, o), l = o.events)) {
                    delete u.handle, u.events = {};
                    for (s in l)
                        for (r = 0, i = l[s].length; i > r; r++) n.event.add(t, s, l[s][r])
                }
                M.hasData(e) && (a = M.access(e), f = n.extend({}, a), M.set(t, f))
            }
        }

        function ob(e, t) {
            var r = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
            return void 0 === t || t && n.nodeName(e, t) ? n.merge([e], r) : r
        }

        function pb(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && T.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }

        function sb(e, t) {
            var r, i = n(t.createElement(e)).appendTo(t.body),
                s = a.getDefaultComputedStyle && (r = a.getDefaultComputedStyle(i[0])) ? r.display : n.css(i[0], "display");
            return i.detach(), s
        }

        function tb(e) {
            var t = l,
                r = rb[e];
            return r || (r = sb(e, t), "none" !== r && r || (qb = (qb || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = qb[0].contentDocument, t.write(), t.close(), r = sb(e, t), qb.detach()), rb[e] = r), r
        }

        function xb(e, t, r) {
            var i, s, o, u, a = e.style;
            return r = r || wb(e), r && (u = r.getPropertyValue(t) || r[t]), r && ("" !== u || n.contains(e.ownerDocument, e) || (u = n.style(e, t)), vb.test(u) && ub.test(t) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = u, u = r.width, a.width = i, a.minWidth = s, a.maxWidth = o)), void 0 !== u ? u + "" : u
        }

        function yb(e, t) {
            return {
                get: function() {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function Fb(e, t) {
            if (t in e) return t;
            var n = t[0].toUpperCase() + t.slice(1),
                r = t,
                i = Eb.length;
            while (i--)
                if (t = Eb[i] + n, t in e) return t;
            return r
        }

        function Gb(e, t, n) {
            var r = Ab.exec(t);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
        }

        function Hb(e, t, r, i, s) {
            for (var o = r === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, u = 0; 4 > o; o += 2) "margin" === r && (u += n.css(e, r + R[o], !0, s)), i ? ("content" === r && (u -= n.css(e, "padding" + R[o], !0, s)), "margin" !== r && (u -= n.css(e, "border" + R[o] + "Width", !0, s))) : (u += n.css(e, "padding" + R[o], !0, s), "padding" !== r && (u += n.css(e, "border" + R[o] + "Width", !0, s)));
            return u
        }

        function Ib(e, t, r) {
            var i = !0,
                s = "width" === t ? e.offsetWidth : e.offsetHeight,
                o = wb(e),
                u = "border-box" === n.css(e, "boxSizing", !1, o);
            if (0 >= s || null == s) {
                if (s = xb(e, t, o), (0 > s || null == s) && (s = e.style[t]), vb.test(s)) return s;
                i = u && (k.boxSizingReliable() || s === e.style[t]), s = parseFloat(s) || 0
            }
            return s + Hb(e, t, r || (u ? "border" : "content"), i, o) + "px"
        }

        function Jb(e, t) {
            for (var r, i, s, o = [], u = 0, a = e.length; a > u; u++) i = e[u], i.style && (o[u] = L.get(i, "olddisplay"), r = i.style.display, t ? (o[u] || "none" !== r || (i.style.display = ""), "" === i.style.display && S(i) && (o[u] = L.access(i, "olddisplay", tb(i.nodeName)))) : (s = S(i), "none" === r && s || L.set(i, "olddisplay", s ? r : n.css(i, "display"))));
            for (u = 0; a > u; u++) i = e[u], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[u] || "" : "none"));
            return e
        }

        function Kb(e, t, n, r, i) {
            return new Kb.prototype.init(e, t, n, r, i)
        }

        function Sb() {
            return setTimeout(function() {
                Lb = void 0
            }), Lb = n.now()
        }

        function Tb(e, t) {
            var n, r = 0,
                i = {
                    height: e
                };
            for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = R[r], i["margin" + n] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function Ub(e, t, n) {
            for (var r, i = (Rb[t] || []).concat(Rb["*"]), s = 0, o = i.length; o > s; s++)
                if (r = i[s].call(n, t, e)) return r
        }

        function Vb(e, t, r) {
            var i, s, o, u, a, f, l, c, h = this,
                p = {},
                d = e.style,
                v = e.nodeType && S(e),
                m = L.get(e, "fxshow");
            r.queue || (a = n._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, f = a.empty.fire, a.empty.fire = function() {
                a.unqueued || f()
            }), a.unqueued++, h.always(function() {
                h.always(function() {
                    a.unqueued--, n.queue(e, "fx").length || a.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (r.overflow = [d.overflow, d.overflowX, d.overflowY], l = n.css(e, "display"), c = "none" === l ? L.get(e, "olddisplay") || tb(e.nodeName) : l, "inline" === c && "none" === n.css(e, "float") && (d.display = "inline-block")), r.overflow && (d.overflow = "hidden", h.always(function() {
                d.overflow = r.overflow[0], d.overflowX = r.overflow[1], d.overflowY = r.overflow[2]
            }));
            for (i in t)
                if (s = t[i], Nb.exec(s)) {
                    if (delete t[i], o = o || "toggle" === s, s === (v ? "hide" : "show")) {
                        if ("show" !== s || !m || void 0 === m[i]) continue;
                        v = !0
                    }
                    p[i] = m && m[i] || n.style(e, i)
                } else l = void 0;
            if (n.isEmptyObject(p)) "inline" === ("none" === l ? tb(e.nodeName) : l) && (d.display = l);
            else {
                m ? "hidden" in m && (v = m.hidden) : m = L.access(e, "fxshow", {}), o && (m.hidden = !v), v ? n(e).show() : h.done(function() {
                    n(e).hide()
                }), h.done(function() {
                    var t;
                    L.remove(e, "fxshow");
                    for (t in p) n.style(e, t, p[t])
                });
                for (i in p) u = Ub(v ? m[i] : 0, i, h), i in m || (m[i] = u.start, v && (u.end = u.start, u.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function Wb(e, t) {
            var r, i, s, o, u;
            for (r in e)
                if (i = n.camelCase(r), s = t[i], o = e[r], n.isArray(o) && (s = o[1], o = e[r] = o[0]), r !== i && (e[i] = o, delete e[r]), u = n.cssHooks[i], u && "expand" in u) {
                    o = u.expand(o), delete e[i];
                    for (r in o) r in e || (e[r] = o[r], t[r] = s)
                } else t[i] = s
        }

        function Xb(e, t, r) {
            var i, s, o = 0,
                u = Qb.length,
                a = n.Deferred().always(function() {
                    delete f.elem
                }),
                f = function() {
                    if (s) return !1;
                    for (var t = Lb || Sb(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, i = 1 - r, o = 0, u = l.tweens.length; u > o; o++) l.tweens[o].run(i);
                    return a.notifyWith(e, [l, i, n]), 1 > i && u ? n : (a.resolveWith(e, [l]), !1)
                },
                l = a.promise({
                    elem: e,
                    props: n.extend({}, t),
                    opts: n.extend(!0, {
                        specialEasing: {}
                    }, r),
                    originalProperties: t,
                    originalOptions: r,
                    startTime: Lb || Sb(),
                    duration: r.duration,
                    tweens: [],
                    createTween: function(t, r) {
                        var i = n.Tween(e, l.opts, t, r, l.opts.specialEasing[t] || l.opts.easing);
                        return l.tweens.push(i), i
                    },
                    stop: function(t) {
                        var n = 0,
                            r = t ? l.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; r > n; n++) l.tweens[n].run(1);
                        return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
                    }
                }),
                c = l.props;
            for (Wb(c, l.opts.specialEasing); u > o; o++)
                if (i = Qb[o].call(l, e, c, l.opts)) return i;
            return n.map(c, Ub, l), n.isFunction(l.opts.start) && l.opts.start.call(e, l), n.fx.timer(n.extend(f, {
                elem: e,
                anim: l,
                queue: l.opts.queue
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function rc(e) {
            return function(t, r) {
                "string" != typeof t && (r = t, t = "*");
                var i, s = 0,
                    o = t.toLowerCase().match(E) || [];
                if (n.isFunction(r))
                    while (i = o[s++]) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(r)) : (e[i] = e[i] || []).push(r)
            }
        }

        function sc(e, t, r, i) {
            function u(l) {
                var h;
                return s[l] = !0, n.each(e[l] || [], function(e, n) {
                    var a = n(t, r, i);
                    return "string" != typeof a || o || s[a] ? o ? !(h = a) : void 0 : (t.dataTypes.unshift(a), u(a), !1)
                }), h
            }
            var s = {},
                o = e === oc;
            return u(t.dataTypes[0]) || !s["*"] && u("*")
        }

        function tc(e, t) {
            var r, i, s = n.ajaxSettings.flatOptions || {};
            for (r in t) void 0 !== t[r] && ((s[r] ? e : i || (i = {}))[r] = t[r]);
            return i && n.extend(!0, e, i), e
        }

        function uc(e, t, n) {
            var r, i, s, o, u = e.contents,
                a = e.dataTypes;
            while ("*" === a[0]) a.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r)
                for (i in u)
                    if (u[i] && u[i].test(r)) {
                        a.unshift(i);
                        break
                    }
            if (a[0] in n) s = a[0];
            else {
                for (i in n) {
                    if (!a[0] || e.converters[i + " " + a[0]]) {
                        s = i;
                        break
                    }
                    o || (o = i)
                }
                s = s || o
            }
            return s ? (s !== a[0] && a.unshift(s), n[s]) : void 0
        }

        function vc(e, t, n, r) {
            var i, s, o, u, a, f = {},
                l = e.dataTypes.slice();
            if (l[1])
                for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
            s = l.shift();
            while (s)
                if (e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift())
                    if ("*" === s) s = a;
                    else if ("*" !== a && a !== s) {
                if (o = f[a + " " + s] || f["* " + s], !o)
                    for (i in f)
                        if (u = i.split(" "), u[1] === s && (o = f[a + " " + u[0]] || f["* " + u[0]])) {
                            o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                            break
                        }
                if (o !== !0)
                    if (o && e["throws"]) t = o(t);
                    else try {
                        t = o(t)
                    } catch (c) {
                        return {
                            state: "parsererror",
                            error: o ? c : "No conversion from " + a + " to " + s
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function Bc(e, t, r, i) {
            var s;
            if (n.isArray(t)) n.each(t, function(t, n) {
                r || xc.test(e) ? i(e, n) : Bc(e + "[" + ("object" == typeof n ? t : "") + "]", n, r, i)
            });
            else if (r || "object" !== n.type(t)) i(e, t);
            else
                for (s in t) Bc(e + "[" + s + "]", t[s], r, i)
        }

        function Kc(e) {
            return n.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
        }
        var c = [],
            d = c.slice,
            e = c.concat,
            f = c.push,
            g = c.indexOf,
            h = {},
            i = h.toString,
            j = h.hasOwnProperty,
            k = {},
            l = a.document,
            m = "2.1.1",
            n = function(e, t) {
                return new n.fn.init(e, t)
            },
            o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            p = /^-ms-/,
            q = /-([\da-z])/gi,
            r = function(e, t) {
                return t.toUpperCase()
            };
        n.fn = n.prototype = {
            jquery: m,
            constructor: n,
            selector: "",
            length: 0,
            toArray: function() {
                return d.call(this)
            },
            get: function(e) {
                return null != e ? 0 > e ? this[e + this.length] : this[e] : d.call(this)
            },
            pushStack: function(e) {
                var t = n.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e, t) {
                return n.each(this, e, t)
            },
            map: function(e) {
                return this.pushStack(n.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(d.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: f,
            sort: c.sort,
            splice: c.splice
        }, n.extend = n.fn.extend = function() {
            var e, t, r, i, s, o, u = arguments[0] || {},
                a = 1,
                f = arguments.length,
                l = !1;
            for ("boolean" == typeof u && (l = u, u = arguments[a] || {}, a++), "object" == typeof u || n.isFunction(u) || (u = {}), a === f && (u = this, a--); f > a; a++)
                if (null != (e = arguments[a]))
                    for (t in e) r = u[t], i = e[t], u !== i && (l && i && (n.isPlainObject(i) || (s = n.isArray(i))) ? (s ? (s = !1, o = r && n.isArray(r) ? r : []) : o = r && n.isPlainObject(r) ? r : {}, u[t] = n.extend(l, o, i)) : void 0 !== i && (u[t] = i));
            return u
        }, n.extend({
            expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === n.type(e)
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return null != e && e === e.window
            },
            isNumeric: function(e) {
                return !n.isArray(e) && e - parseFloat(e) >= 0
            },
            isPlainObject: function(e) {
                return "object" !== n.type(e) || e.nodeType || n.isWindow(e) ? !1 : e.constructor && !j.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? h[i.call(e)] || "object" : typeof e
            },
            globalEval: function(a) {
                var b, c = eval;
                a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a))
            },
            camelCase: function(e) {
                return e.replace(p, "ms-").replace(q, r)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, n) {
                var r, i = 0,
                    o = e.length,
                    u = s(e);
                if (n) {
                    if (u) {
                        for (; o > i; i++)
                            if (r = t.apply(e[i], n), r === !1) break
                    } else
                        for (i in e)
                            if (r = t.apply(e[i], n), r === !1) break
                } else if (u) {
                    for (; o > i; i++)
                        if (r = t.call(e[i], i, e[i]), r === !1) break
                } else
                    for (i in e)
                        if (r = t.call(e[i], i, e[i]), r === !1) break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(o, "")
            },
            makeArray: function(e, t) {
                var r = t || [];
                return null != e && (s(Object(e)) ? n.merge(r, "string" == typeof e ? [e] : e) : f.call(r, e)), r
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : g.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, r = 0, i = e.length; n > r; r++) e[i++] = t[r];
                return e.length = i, e
            },
            grep: function(e, t, n) {
                for (var r, i = [], s = 0, o = e.length, u = !n; o > s; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
                return i
            },
            map: function(t, n, r) {
                var i, o = 0,
                    u = t.length,
                    a = s(t),
                    f = [];
                if (a)
                    for (; u > o; o++) i = n(t[o], o, r), null != i && f.push(i);
                else
                    for (o in t) i = n(t[o], o, r), null != i && f.push(i);
                return e.apply([], f)
            },
            guid: 1,
            proxy: function(e, t) {
                var r, i, s;
                return "string" == typeof t && (r = e[t], t = e, e = r), n.isFunction(e) ? (i = d.call(arguments, 2), s = function() {
                    return e.apply(t || this, i.concat(d.call(arguments)))
                }, s.guid = e.guid = e.guid || n.guid++, s) : void 0
            },
            now: Date.now,
            support: k
        }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            h["[object " + t + "]"] = t.toLowerCase()
        });
        var t = function(e) {
            function st(e, t, r, i) {
                var s, u, f, l, c, d, g, y, S, x;
                if ((t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [], !e || "string" != typeof e) return r;
                if (1 !== (l = t.nodeType) && 9 !== l) return [];
                if (v && !i) {
                    if (s = Z.exec(e))
                        if (f = s[1]) {
                            if (9 === l) {
                                if (u = t.getElementById(f), !u || !u.parentNode) return r;
                                if (u.id === f) return r.push(u), r
                            } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f) return r.push(u), r
                        } else {
                            if (s[2]) return P.apply(r, t.getElementsByTagName(e)), r;
                            if ((f = s[3]) && n.getElementsByClassName && t.getElementsByClassName) return P.apply(r, t.getElementsByClassName(f)), r
                        }
                    if (n.qsa && (!m || !m.test(e))) {
                        if (y = g = w, S = t, x = 9 === l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) {
                            d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
                            while (c--) d[c] = y + mt(d[c]);
                            S = et.test(e) && dt(t.parentNode) || t, x = d.join(",")
                        }
                        if (x) try {
                            return P.apply(r, S.querySelectorAll(x)), r
                        } catch (T) {} finally {
                            g || t.removeAttribute("id")
                        }
                    }
                }
                return a(e.replace(z, "$1"), t, r, i)
            }

            function ot() {
                function t(n, i) {
                    return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                }
                var e = [];
                return t
            }

            function ut(e) {
                return e[w] = !0, e
            }

            function at(e) {
                var t = p.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function ft(e, t) {
                var n = e.split("|"),
                    i = e.length;
                while (i--) r.attrHandle[n[i]] = t
            }

            function lt(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || A) - (~e.sourceIndex || A);
                if (r) return r;
                if (n)
                    while (n = n.nextSibling)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function ct(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function ht(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function pt(e) {
                return ut(function(t) {
                    return t = +t, ut(function(n, r) {
                        var i, s = e([], n.length, t),
                            o = s.length;
                        while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function dt(e) {
                return e && typeof e.getElementsByTagName !== L && e
            }

            function vt() {}

            function mt(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
                return r
            }

            function gt(e, t, n) {
                var r = t.dir,
                    i = n && "parentNode" === r,
                    s = x++;
                return t.first ? function(t, n, s) {
                    while (t = t[r])
                        if (1 === t.nodeType || i) return e(t, n, s)
                } : function(t, n, o) {
                    var u, a, f = [S, s];
                    if (o) {
                        while (t = t[r])
                            if ((1 === t.nodeType || i) && e(t, n, o)) return !0
                    } else
                        while (t = t[r])
                            if (1 === t.nodeType || i) {
                                if (a = t[w] || (t[w] = {}), (u = a[r]) && u[0] === S && u[1] === s) return f[2] = u[2];
                                if (a[r] = f, f[2] = e(t, n, o)) return !0
                            }
                }
            }

            function yt(e) {
                return e.length > 1 ? function(t, n, r) {
                    var i = e.length;
                    while (i--)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function bt(e, t, n) {
                for (var r = 0, i = t.length; i > r; r++) st(e, t[r], n);
                return n
            }

            function wt(e, t, n, r, i) {
                for (var s, o = [], u = 0, a = e.length, f = null != t; a > u; u++)(s = e[u]) && (!n || n(s, r, i)) && (o.push(s), f && t.push(u));
                return o
            }

            function Et(e, t, n, r, i, s) {
                return r && !r[w] && (r = Et(r)), i && !i[w] && (i = Et(i, s)), ut(function(s, o, u, a) {
                    var f, l, c, h = [],
                        p = [],
                        d = o.length,
                        v = s || bt(t || "*", u.nodeType ? [u] : u, []),
                        m = !e || !s && t ? v : wt(v, h, e, u, a),
                        g = n ? i || (s ? e : d || r) ? [] : o : m;
                    if (n && n(m, g, u, a), r) {
                        f = wt(g, p), r(f, [], u, a), l = f.length;
                        while (l--)(c = f[l]) && (g[p[l]] = !(m[p[l]] = c))
                    }
                    if (s) {
                        if (i || e) {
                            if (i) {
                                f = [], l = g.length;
                                while (l--)(c = g[l]) && f.push(m[l] = c);
                                i(null, g = [], f, a)
                            }
                            l = g.length;
                            while (l--)(c = g[l]) && (f = i ? B.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                        }
                    } else g = wt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : P.apply(o, g)
                })
            }

            function St(e) {
                for (var t, n, i, s = e.length, o = r.relative[e[0].type], u = o || r.relative[" "], a = o ? 1 : 0, l = gt(function(e) {
                        return e === t
                    }, u, !0), c = gt(function(e) {
                        return B.call(t, e) > -1
                    }, u, !0), h = [function(e, n, r) {
                        return !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                    }]; s > a; a++)
                    if (n = r.relative[e[a].type]) h = [gt(yt(h), n)];
                    else {
                        if (n = r.filter[e[a].type].apply(null, e[a].matches), n[w]) {
                            for (i = ++a; s > i; i++)
                                if (r.relative[e[i].type]) break;
                            return Et(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({
                                value: " " === e[a - 2].type ? "*" : ""
                            })).replace(z, "$1"), n, i > a && St(e.slice(a, i)), s > i && St(e = e.slice(i)), s > i && mt(e))
                        }
                        h.push(n)
                    }
                return yt(h)
            }

            function xt(e, t) {
                var n = t.length > 0,
                    i = e.length > 0,
                    s = function(s, o, u, a, l) {
                        var c, h, d, v = 0,
                            m = "0",
                            g = s && [],
                            y = [],
                            b = f,
                            w = s || i && r.find.TAG("*", l),
                            E = S += null == b ? 1 : Math.random() || .1,
                            x = w.length;
                        for (l && (f = o !== p && o); m !== x && null != (c = w[m]); m++) {
                            if (i && c) {
                                h = 0;
                                while (d = e[h++])
                                    if (d(c, o, u)) {
                                        a.push(c);
                                        break
                                    }
                                l && (S = E)
                            }
                            n && ((c = !d && c) && v--, s && g.push(c))
                        }
                        if (v += m, n && m !== v) {
                            h = 0;
                            while (d = t[h++]) d(g, y, o, u);
                            if (s) {
                                if (v > 0)
                                    while (m--) g[m] || y[m] || (y[m] = _.call(a));
                                y = wt(y)
                            }
                            P.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(a)
                        }
                        return l && (S = E, f = b), g
                    };
                return n ? ut(s) : s
            }
            var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + -(new Date),
                E = e.document,
                S = 0,
                x = 0,
                T = ot(),
                N = ot(),
                C = ot(),
                k = function(e, t) {
                    return e === t && (c = !0), 0
                },
                L = "undefined",
                A = 1 << 31,
                O = {}.hasOwnProperty,
                M = [],
                _ = M.pop,
                D = M.push,
                P = M.push,
                H = M.slice,
                B = M.indexOf || function(e) {
                    for (var t = 0, n = this.length; n > t; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                F = "[\\x20\\t\\r\\n\\f]",
                I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                q = I.replace("w", "w#"),
                R = "\\[" + F + "*(" + I + ")(?:" + F + "*([*^$|!~]?=)" + F + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + F + "*\\]",
                U = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|.*)\\)|)",
                z = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
                W = new RegExp("^" + F + "*," + F + "*"),
                X = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
                V = new RegExp("=" + F + "*([^\\]'\"]*?)" + F + "*\\]", "g"),
                $ = new RegExp(U),
                J = new RegExp("^" + q + "$"),
                K = {
                    ID: new RegExp("^#(" + I + ")"),
                    CLASS: new RegExp("^\\.(" + I + ")"),
                    TAG: new RegExp("^(" + I.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + R),
                    PSEUDO: new RegExp("^" + U),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + j + ")$", "i"),
                    needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
                },
                Q = /^(?:input|select|textarea|button)$/i,
                G = /^h\d$/i,
                Y = /^[^{]+\{\s*\[native \w/,
                Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                et = /[+~]/,
                tt = /'|\\/g,
                nt = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"),
                rt = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                };
            try {
                P.apply(M = H.call(E.childNodes), E.childNodes), M[E.childNodes.length].nodeType
            } catch (it) {
                P = {
                    apply: M.length ? function(e, t) {
                        D.apply(e, H.call(t))
                    } : function(e, t) {
                        var n = e.length,
                            r = 0;
                        while (e[n++] = t[r++]);
                        e.length = n - 1
                    }
                }
            }
            n = st.support = {}, s = st.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, h = st.setDocument = function(e) {
                var t, i = e ? e.ownerDocument || e : E,
                    o = i.defaultView;
                return i !== p && 9 === i.nodeType && i.documentElement ? (p = i, d = i.documentElement, v = !s(i), o && o !== o.top && (o.addEventListener ? o.addEventListener("unload", function() {
                    h()
                }, !1) : o.attachEvent && o.attachEvent("onunload", function() {
                    h()
                })), n.attributes = at(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), n.getElementsByTagName = at(function(e) {
                    return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
                }), n.getElementsByClassName = Y.test(i.getElementsByClassName) && at(function(e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), n.getById = at(function(e) {
                    return d.appendChild(e).id = w, !i.getElementsByName || !i.getElementsByName(w).length
                }), n.getById ? (r.find.ID = function(e, t) {
                    if (typeof t.getElementById !== L && v) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, r.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete r.find.ID, r.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                    return typeof t.getElementsByTagName !== L ? t.getElementsByTagName(e) : void 0
                } : function(e, t) {
                    var n, r = [],
                        i = 0,
                        s = t.getElementsByTagName(e);
                    if ("*" === e) {
                        while (n = s[i++]) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return s
                }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                    return typeof t.getElementsByClassName !== L && v ? t.getElementsByClassName(e) : void 0
                }, g = [], m = [], (n.qsa = Y.test(i.querySelectorAll)) && (at(function(e) {
                    e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && m.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + F + "*(?:value|" + j + ")"), e.querySelectorAll(":checked").length || m.push(":checked")
                }), at(function(e) {
                    var t = i.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + F + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                })), (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && at(function(e) {
                    n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", U)
                }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !!r && 1 === r.nodeType && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))
                } : function(e, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === e) return !0;
                    return !1
                }, k = t ? function(e, t) {
                    if (e === t) return c = !0, 0;
                    var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === i || e.ownerDocument === E && b(E, e) ? -1 : t === i || t.ownerDocument === E && b(E, t) ? 1 : l ? B.call(l, e) - B.call(l, t) : 0 : 4 & r ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return c = !0, 0;
                    var n, r = 0,
                        s = e.parentNode,
                        o = t.parentNode,
                        u = [e],
                        a = [t];
                    if (!s || !o) return e === i ? -1 : t === i ? 1 : s ? -1 : o ? 1 : l ? B.call(l, e) - B.call(l, t) : 0;
                    if (s === o) return lt(e, t);
                    n = e;
                    while (n = n.parentNode) u.unshift(n);
                    n = t;
                    while (n = n.parentNode) a.unshift(n);
                    while (u[r] === a[r]) r++;
                    return r ? lt(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
                }, i) : p
            }, st.matches = function(e, t) {
                return st(e, null, null, t)
            }, st.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']"), !(!n.matchesSelector || !v || g && g.test(t) || m && m.test(t))) try {
                    var r = y.call(e, t);
                    if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                } catch (i) {}
                return st(t, p, null, [e]).length > 0
            }, st.contains = function(e, t) {
                return (e.ownerDocument || e) !== p && h(e), b(e, t)
            }, st.attr = function(e, t) {
                (e.ownerDocument || e) !== p && h(e);
                var i = r.attrHandle[t.toLowerCase()],
                    s = i && O.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : void 0;
                return void 0 !== s ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
            }, st.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, st.uniqueSort = function(e) {
                var t, r = [],
                    i = 0,
                    s = 0;
                if (c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k), c) {
                    while (t = e[s++]) t === e[s] && (i = r.push(s));
                    while (i--) e.splice(r[i], 1)
                }
                return l = null, e
            }, i = st.getText = function(e) {
                var t, n = "",
                    r = 0,
                    s = e.nodeType;
                if (s) {
                    if (1 === s || 9 === s || 11 === s) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                    } else if (3 === s || 4 === s) return e.nodeValue
                } else
                    while (t = e[r++]) n += i(t);
                return n
            }, r = st.selectors = {
                cacheLength: 50,
                createPseudo: ut,
                match: K,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && st.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(nt, rt).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = T[e + " "];
                        return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && T(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var i = st.attr(r, e);
                            return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r, i) {
                        var s = "nth" !== e.slice(0, 3),
                            o = "last" !== e.slice(-4),
                            u = "of-type" === t;
                        return 1 === r && 0 === i ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, a) {
                            var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                g = u && t.nodeName.toLowerCase(),
                                y = !a && !u;
                            if (m) {
                                if (s) {
                                    while (v) {
                                        c = t;
                                        while (c = c[v])
                                            if (u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) return !1;
                                        d = v = "only" === e && !d && "nextSibling"
                                    }
                                    return !0
                                }
                                if (d = [o ? m.firstChild : m.lastChild], o && y) {
                                    l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                                    while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                        if (1 === c.nodeType && ++h && c === t) {
                                            l[e] = [S, p, h];
                                            break
                                        }
                                } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1];
                                else
                                    while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                        if ((u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++h && (y && ((c[w] || (c[w] = {}))[e] = [S, h]), c === t)) break;
                                return h -= i, h === r || h % r === 0 && h / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
                        return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function(e, n) {
                            var r, s = i(e, t),
                                o = s.length;
                            while (o--) r = B.call(e, s[o]), e[r] = !(n[r] = s[o])
                        }) : function(e) {
                            return i(e, 0, n)
                        }) : i
                    }
                },
                pseudos: {
                    not: ut(function(e) {
                        var t = [],
                            n = [],
                            r = u(e.replace(z, "$1"));
                        return r[w] ? ut(function(e, t, n, i) {
                            var s, o = r(e, null, i, []),
                                u = e.length;
                            while (u--)(s = o[u]) && (e[u] = !(t[u] = s))
                        }) : function(e, i, s) {
                            return t[0] = e, r(t, null, s, n), !n.pop()
                        }
                    }),
                    has: ut(function(e) {
                        return function(t) {
                            return st(e, t).length > 0
                        }
                    }),
                    contains: ut(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                        }
                    }),
                    lang: ut(function(e) {
                        return J.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === d
                    },
                    focus: function(e) {
                        return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !r.pseudos.empty(e)
                    },
                    header: function(e) {
                        return G.test(e.nodeName)
                    },
                    input: function(e) {
                        return Q.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: pt(function() {
                        return [0]
                    }),
                    last: pt(function(e, t) {
                        return [t - 1]
                    }),
                    eq: pt(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: pt(function(e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: pt(function(e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: pt(function(e, t, n) {
                        for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: pt(function(e, t, n) {
                        for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }, r.pseudos.nth = r.pseudos.eq;
            for (t in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) r.pseudos[t] = ct(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) r.pseudos[t] = ht(t);
            return vt.prototype = r.filters = r.pseudos, r.setFilters = new vt, o = st.tokenize = function(e, t) {
                var n, i, s, o, u, a, f, l = N[e + " "];
                if (l) return t ? 0 : l.slice(0);
                u = e, a = [], f = r.preFilter;
                while (u) {
                    (!n || (i = W.exec(u))) && (i && (u = u.slice(i[0].length) || u), a.push(s = [])), n = !1, (i = X.exec(u)) && (n = i.shift(), s.push({
                        value: n,
                        type: i[0].replace(z, " ")
                    }), u = u.slice(n.length));
                    for (o in r.filter) !(i = K[o].exec(u)) || f[o] && !(i = f[o](i)) || (n = i.shift(), s.push({
                        value: n,
                        type: o,
                        matches: i
                    }), u = u.slice(n.length));
                    if (!n) break
                }
                return t ? u.length : u ? st.error(e) : N(e, a).slice(0)
            }, u = st.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    s = C[e + " "];
                if (!s) {
                    t || (t = o(e)), n = t.length;
                    while (n--) s = St(t[n]), s[w] ? r.push(s) : i.push(s);
                    s = C(e, xt(i, r)), s.selector = e
                }
                return s
            }, a = st.select = function(e, t, i, s) {
                var a, f, l, c, h, p = "function" == typeof e && e,
                    d = !s && o(e = p.selector || e);
                if (i = i || [], 1 === d.length) {
                    if (f = d[0] = d[0].slice(0), f.length > 2 && "ID" === (l = f[0]).type && n.getById && 9 === t.nodeType && v && r.relative[f[1].type]) {
                        if (t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t) return i;
                        p && (t = t.parentNode), e = e.slice(f.shift().value.length)
                    }
                    a = K.needsContext.test(e) ? 0 : f.length;
                    while (a--) {
                        if (l = f[a], r.relative[c = l.type]) break;
                        if ((h = r.find[c]) && (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && dt(t.parentNode) || t))) {
                            if (f.splice(a, 1), e = s.length && mt(f), !e) return P.apply(i, s), i;
                            break
                        }
                    }
                }
                return (p || u(e, d))(s, t, !v, i, et.test(e) && dt(t.parentNode) || t), i
            }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = at(function(e) {
                return 1 & e.compareDocumentPosition(p.createElement("div"))
            }), at(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || ft("type|href|height|width", function(e, t, n) {
                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), n.attributes && at(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || ft("value", function(e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
            }), at(function(e) {
                return null == e.getAttribute("disabled")
            }) || ft(j, function(e, t, n) {
                var r;
                return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }), st
        }(a);
        n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
        var u = n.expr.match.needsContext,
            v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            w = /^.[^:#\[\.,]*$/;
        n.filter = function(e, t, r) {
            var i = t[0];
            return r && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? n.find.matchesSelector(i, e) ? [i] : [] : n.find.matches(e, n.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, n.fn.extend({
            find: function(e) {
                var t, r = this.length,
                    i = [],
                    s = this;
                if ("string" != typeof e) return this.pushStack(n(e).filter(function() {
                    for (t = 0; r > t; t++)
                        if (n.contains(s[t], this)) return !0
                }));
                for (t = 0; r > t; t++) n.find(e, s[t], i);
                return i = this.pushStack(r > 1 ? n.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
            },
            filter: function(e) {
                return this.pushStack(x(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(x(this, e || [], !0))
            },
            is: function(e) {
                return !!x(this, "string" == typeof e && u.test(e) ? n(e) : e || [], !1).length
            }
        });
        var y, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            A = n.fn.init = function(e, t) {
                var r, i;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : z.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || y).find(e) : this.constructor(t).find(e);
                    if (r[1]) {
                        if (t = t instanceof n ? t[0] : t, n.merge(this, n.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : l, !0)), v.test(r[1]) && n.isPlainObject(t))
                            for (r in t) n.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    }
                    return i = l.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = l, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : n.isFunction(e) ? "undefined" != typeof y.ready ? y.ready(e) : e(n) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), n.makeArray(e, this))
            };
        A.prototype = n.fn, y = n(l);
        var B = /^(?:parents|prev(?:Until|All))/,
            C = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        n.extend({
            dir: function(e, t, r) {
                var i = [],
                    s = void 0 !== r;
                while ((e = e[t]) && 9 !== e.nodeType)
                    if (1 === e.nodeType) {
                        if (s && n(e).is(r)) break;
                        i.push(e)
                    }
                return i
            },
            sibling: function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        }), n.fn.extend({
            has: function(e) {
                var t = n(e, this),
                    r = t.length;
                return this.filter(function() {
                    for (var e = 0; r > e; e++)
                        if (n.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                for (var r, i = 0, s = this.length, o = [], a = u.test(e) || "string" != typeof e ? n(e, t || this.context) : 0; s > i; i++)
                    for (r = this[i]; r && r !== t; r = r.parentNode)
                        if (r.nodeType < 11 && (a ? a.index(r) > -1 : 1 === r.nodeType && n.find.matchesSelector(r, e))) {
                            o.push(r);
                            break
                        }
                return this.pushStack(o.length > 1 ? n.unique(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? g.call(n(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(n.unique(n.merge(this.get(), n(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), n.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return n.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, r) {
                return n.dir(e, "parentNode", r)
            },
            next: function(e) {
                return D(e, "nextSibling")
            },
            prev: function(e) {
                return D(e, "previousSibling")
            },
            nextAll: function(e) {
                return n.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return n.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, r) {
                return n.dir(e, "nextSibling", r)
            },
            prevUntil: function(e, t, r) {
                return n.dir(e, "previousSibling", r)
            },
            siblings: function(e) {
                return n.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return n.sibling(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument || n.merge([], e.childNodes)
            }
        }, function(e, t) {
            n.fn[e] = function(r, i) {
                var s = n.map(this, t, r);
                return "Until" !== e.slice(-5) && (i = r), i && "string" == typeof i && (s = n.filter(i, s)), this.length > 1 && (C[e] || n.unique(s), B.test(e) && s.reverse()), this.pushStack(s)
            }
        });
        var E = /\S+/g,
            F = {};
        n.Callbacks = function(e) {
            e = "string" == typeof e ? F[e] || G(e) : n.extend({}, e);
            var t, r, i, s, o, u, a = [],
                f = !e.once && [],
                l = function(n) {
                    for (t = e.memory && n, r = !0, u = s || 0, s = 0, o = a.length, i = !0; a && o > u; u++)
                        if (a[u].apply(n[0], n[1]) === !1 && e.stopOnFalse) {
                            t = !1;
                            break
                        }
                    i = !1, a && (f ? f.length && l(f.shift()) : t ? a = [] : c.disable())
                },
                c = {
                    add: function() {
                        if (a) {
                            var r = a.length;
                            ! function u(t) {
                                n.each(t, function(t, r) {
                                    var i = n.type(r);
                                    "function" === i ? e.unique && c.has(r) || a.push(r) : r && r.length && "string" !== i && u(r)
                                })
                            }(arguments), i ? o = a.length : t && (s = r, l(t))
                        }
                        return this
                    },
                    remove: function() {
                        return a && n.each(arguments, function(e, t) {
                            var r;
                            while ((r = n.inArray(t, a, r)) > -1) a.splice(r, 1), i && (o >= r && o--, u >= r && u--)
                        }), this
                    },
                    has: function(e) {
                        return e ? n.inArray(e, a) > -1 : !!a && !!a.length
                    },
                    empty: function() {
                        return a = [], o = 0, this
                    },
                    disable: function() {
                        return a = f = t = void 0, this
                    },
                    disabled: function() {
                        return !a
                    },
                    lock: function() {
                        return f = void 0, t || c.disable(), this
                    },
                    locked: function() {
                        return !f
                    },
                    fireWith: function(e, t) {
                        return !a || r && !f || (t = t || [], t = [e, t.slice ? t.slice() : t], i ? f.push(t) : l(t)), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return c
        }, n.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", n.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", n.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", n.Callbacks("memory")]
                    ],
                    r = "pending",
                    i = {
                        state: function() {
                            return r
                        },
                        always: function() {
                            return s.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return n.Deferred(function(r) {
                                n.each(t, function(t, o) {
                                    var u = n.isFunction(e[t]) && e[t];
                                    s[o[1]](function() {
                                        var e = u && u.apply(this, arguments);
                                        e && n.isFunction(e.promise) ? e.promise().done(r.resolve).fail(r.reject).progress(r.notify) : r[o[0] + "With"](this === i ? r.promise() : this, u ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? n.extend(e, i) : i
                        }
                    },
                    s = {};
                return i.pipe = i.then, n.each(t, function(e, n) {
                    var o = n[2],
                        u = n[3];
                    i[n[1]] = o.add, u && o.add(function() {
                        r = u
                    }, t[1 ^ e][2].disable, t[2][2].lock), s[n[0]] = function() {
                        return s[n[0] + "With"](this === s ? i : this, arguments), this
                    }, s[n[0] + "With"] = o.fireWith
                }), i.promise(s), e && e.call(s, s), s
            },
            when: function(e) {
                var t = 0,
                    r = d.call(arguments),
                    i = r.length,
                    s = 1 !== i || e && n.isFunction(e.promise) ? i : 0,
                    o = 1 === s ? e : n.Deferred(),
                    u = function(e, t, n) {
                        return function(r) {
                            t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --s || o.resolveWith(t, n)
                        }
                    },
                    a, f, l;
                if (i > 1)
                    for (a = new Array(i), f = new Array(i), l = new Array(i); i > t; t++) r[t] && n.isFunction(r[t].promise) ? r[t].promise().done(u(t, l, r)).fail(o.reject).progress(u(t, f, a)) : --s;
                return s || o.resolveWith(l, r), o.promise()
            }
        });
        var H;
        n.fn.ready = function(e) {
            return n.ready.promise().done(e), this
        }, n.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? n.readyWait++ : n.ready(!0)
            },
            ready: function(e) {
                (e === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, e !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))))
            }
        }), n.ready.promise = function(e) {
            return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(e)
        }, n.ready.promise();
        var J = n.access = function(e, t, r, i, s, o, u) {
            var a = 0,
                f = e.length,
                l = null == r;
            if ("object" === n.type(r)) {
                s = !0;
                for (a in r) n.access(e, t, a, r[a], !0, o, u)
            } else if (void 0 !== i && (s = !0, n.isFunction(i) || (u = !0), l && (u ? (t.call(e, i), t = null) : (l = t, t = function(e, t, r) {
                    return l.call(n(e), r)
                })), t))
                for (; f > a; a++) t(e[a], r, u ? i : i.call(e[a], a, t(e[a], r)));
            return s ? e : l ? t.call(e) : f ? t(e[0], r) : o
        };
        n.acceptData = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        }, K.uid = 1, K.accepts = n.acceptData, K.prototype = {
            key: function(e) {
                if (!K.accepts(e)) return 0;
                var t = {},
                    r = e[this.expando];
                if (!r) {
                    r = K.uid++;
                    try {
                        t[this.expando] = {
                            value: r
                        }, Object.defineProperties(e, t)
                    } catch (i) {
                        t[this.expando] = r, n.extend(e, t)
                    }
                }
                return this.cache[r] || (this.cache[r] = {}), r
            },
            set: function(e, t, r) {
                var i, s = this.key(e),
                    o = this.cache[s];
                if ("string" == typeof t) o[t] = r;
                else if (n.isEmptyObject(o)) n.extend(this.cache[s], t);
                else
                    for (i in t) o[i] = t[i];
                return o
            },
            get: function(e, t) {
                var n = this.cache[this.key(e)];
                return void 0 === t ? n : n[t]
            },
            access: function(e, t, r) {
                var i;
                return void 0 === t || t && "string" == typeof t && void 0 === r ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, n.camelCase(t))) : (this.set(e, t, r), void 0 !== r ? r : t)
            },
            remove: function(e, t) {
                var r, i, s, o = this.key(e),
                    u = this.cache[o];
                if (void 0 === t) this.cache[o] = {};
                else {
                    n.isArray(t) ? i = t.concat(t.map(n.camelCase)) : (s = n.camelCase(t), t in u ? i = [t, s] : (i = s, i = i in u ? [i] : i.match(E) || [])), r = i.length;
                    while (r--) delete u[i[r]]
                }
            },
            hasData: function(e) {
                return !n.isEmptyObject(this.cache[e[this.expando]] || {})
            },
            discard: function(e) {
                e[this.expando] && delete this.cache[e[this.expando]]
            }
        };
        var L = new K,
            M = new K,
            N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            O = /([A-Z])/g;
        n.extend({
            hasData: function(e) {
                return M.hasData(e) || L.hasData(e)
            },
            data: function(e, t, n) {
                return M.access(e, t, n)
            },
            removeData: function(e, t) {
                M.remove(e, t)
            },
            _data: function(e, t, n) {
                return L.access(e, t, n)
            },
            _removeData: function(e, t) {
                L.remove(e, t)
            }
        }), n.fn.extend({
            data: function(e, t) {
                var r, i, s, o = this[0],
                    u = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (s = M.get(o), 1 === o.nodeType && !L.get(o, "hasDataAttrs"))) {
                        r = u.length;
                        while (r--) u[r] && (i = u[r].name, 0 === i.indexOf("data-") && (i = n.camelCase(i.slice(5)), P(o, i, s[i])));
                        L.set(o, "hasDataAttrs", !0)
                    }
                    return s
                }
                return "object" == typeof e ? this.each(function() {
                    M.set(this, e)
                }) : J(this, function(t) {
                    var r, i = n.camelCase(e);
                    if (o && void 0 === t) {
                        if (r = M.get(o, e), void 0 !== r) return r;
                        if (r = M.get(o, i), void 0 !== r) return r;
                        if (r = P(o, i, void 0), void 0 !== r) return r
                    } else this.each(function() {
                        var n = M.get(this, i);
                        M.set(this, i, t), -1 !== e.indexOf("-") && void 0 !== n && M.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    M.remove(this, e)
                })
            }
        }), n.extend({
            queue: function(e, t, r) {
                var i;
                return e ? (t = (t || "fx") + "queue", i = L.get(e, t), r && (!i || n.isArray(r) ? i = L.access(e, t, n.makeArray(r)) : i.push(r)), i || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var r = n.queue(e, t),
                    i = r.length,
                    s = r.shift(),
                    o = n._queueHooks(e, t),
                    u = function() {
                        n.dequeue(e, t)
                    };
                "inprogress" === s && (s = r.shift(), i--), s && ("fx" === t && r.unshift("inprogress"), delete o.stop, s.call(e, u, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var r = t + "queueHooks";
                return L.get(e, r) || L.access(e, r, {
                    empty: n.Callbacks("once memory").add(function() {
                        L.remove(e, [t + "queue", r])
                    })
                })
            }
        }), n.fn.extend({
            queue: function(e, t) {
                var r = 2;
                return "string" != typeof e && (t = e, e = "fx", r--), arguments.length < r ? n.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var r = n.queue(this, e, t);
                    n._queueHooks(this, e), "fx" === e && "inprogress" !== r[0] && n.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    n.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var r, i = 1,
                    s = n.Deferred(),
                    o = this,
                    u = this.length,
                    a = function() {
                        --i || s.resolveWith(o, [o])
                    };
                "string" != typeof e && (t = e, e = void 0), e = e || "fx";
                while (u--) r = L.get(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
                return a(), s.promise(t)
            }
        });
        var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            R = ["Top", "Right", "Bottom", "Left"],
            S = function(e, t) {
                return e = t || e, "none" === n.css(e, "display") || !n.contains(e.ownerDocument, e)
            },
            T = /^(?:checkbox|radio)$/i;
        ! function() {
            var e = l.createDocumentFragment(),
                t = e.appendChild(l.createElement("div")),
                n = l.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), k.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var U = "undefined";
        k.focusinBubbles = "onfocusin" in a;
        var V = /^key/,
            W = /^(?:mouse|pointer|contextmenu)|click/,
            X = /^(?:focusinfocus|focusoutblur)$/,
            Y = /^([^.]*)(?:\.(.+)|)$/;
        n.event = {
            global: {},
            add: function(e, t, r, i, s) {
                var o, u, a, f, l, c, h, p, d, v, m, g = L.get(e);
                if (g) {
                    r.handler && (o = r, r = o.handler, s = o.selector), r.guid || (r.guid = n.guid++), (f = g.events) || (f = g.events = {}), (u = g.handle) || (u = g.handle = function(t) {
                        return typeof n !== U && n.event.triggered !== t.type ? n.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(E) || [""], l = t.length;
                    while (l--) a = Y.exec(t[l]) || [], d = m = a[1], v = (a[2] || "").split(".").sort(), d && (h = n.event.special[d] || {}, d = (s ? h.delegateType : h.bindType) || d, h = n.event.special[d] || {}, c = n.extend({
                        type: d,
                        origType: m,
                        data: i,
                        handler: r,
                        guid: r.guid,
                        selector: s,
                        needsContext: s && n.expr.match.needsContext.test(s),
                        namespace: v.join(".")
                    }, o), (p = f[d]) || (p = f[d] = [], p.delegateCount = 0, h.setup && h.setup.call(e, i, v, u) !== !1 || e.addEventListener && e.addEventListener(d, u, !1)), h.add && (h.add.call(e, c), c.handler.guid || (c.handler.guid = r.guid)), s ? p.splice(p.delegateCount++, 0, c) : p.push(c), n.event.global[d] = !0)
                }
            },
            remove: function(e, t, r, i, s) {
                var o, u, a, f, l, c, h, p, d, v, m, g = L.hasData(e) && L.get(e);
                if (g && (f = g.events)) {
                    t = (t || "").match(E) || [""], l = t.length;
                    while (l--)
                        if (a = Y.exec(t[l]) || [], d = m = a[1], v = (a[2] || "").split(".").sort(), d) {
                            h = n.event.special[d] || {}, d = (i ? h.delegateType : h.bindType) || d, p = f[d] || [], a = a[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length;
                            while (o--) c = p[o], !s && m !== c.origType || r && r.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, h.remove && h.remove.call(e, c));
                            u && !p.length && (h.teardown && h.teardown.call(e, v, g.handle) !== !1 || n.removeEvent(e, d, g.handle), delete f[d])
                        } else
                            for (d in f) n.event.remove(e, d + t[l], r, i, !0);
                    n.isEmptyObject(f) && (delete g.handle, L.remove(e, "events"))
                }
            },
            trigger: function(e, t, r, i) {
                var s, o, u, f, c, h, p, d = [r || l],
                    v = j.call(e, "type") ? e.type : e,
                    m = j.call(e, "namespace") ? e.namespace.split(".") : [];
                if (o = u = r = r || l, 3 !== r.nodeType && 8 !== r.nodeType && !X.test(v + n.event.triggered) && (v.indexOf(".") >= 0 && (m = v.split("."), v = m.shift(), m.sort()), c = v.indexOf(":") < 0 && "on" + v, e = e[n.expando] ? e : new n.Event(v, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = m.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), t = null == t ? [e] : n.makeArray(t, [e]), p = n.event.special[v] || {}, i || !p.trigger || p.trigger.apply(r, t) !== !1)) {
                    if (!i && !p.noBubble && !n.isWindow(r)) {
                        for (f = p.delegateType || v, X.test(f + v) || (o = o.parentNode); o; o = o.parentNode) d.push(o), u = o;
                        u === (r.ownerDocument || l) && d.push(u.defaultView || u.parentWindow || a)
                    }
                    s = 0;
                    while ((o = d[s++]) && !e.isPropagationStopped()) e.type = s > 1 ? f : p.bindType || v, h = (L.get(o, "events") || {})[e.type] && L.get(o, "handle"), h && h.apply(o, t), h = c && o[c], h && h.apply && n.acceptData(o) && (e.result = h.apply(o, t), e.result === !1 && e.preventDefault());
                    return e.type = v, i || e.isDefaultPrevented() || p._default && p._default.apply(d.pop(), t) !== !1 || !n.acceptData(r) || c && n.isFunction(r[v]) && !n.isWindow(r) && (u = r[c], u && (r[c] = null), n.event.triggered = v, r[v](), n.event.triggered = void 0, u && (r[c] = u)), e.result
                }
            },
            dispatch: function(e) {
                e = n.event.fix(e);
                var t, r, i, s, o, u = [],
                    a = d.call(arguments),
                    f = (L.get(this, "events") || {})[e.type] || [],
                    l = n.event.special[e.type] || {};
                if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                    u = n.event.handlers.call(this, e, f), t = 0;
                    while ((s = u[t++]) && !e.isPropagationStopped()) {
                        e.currentTarget = s.elem, r = 0;
                        while ((o = s.handlers[r++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, i = ((n.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, a), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()))
                    }
                    return l.postDispatch && l.postDispatch.call(this, e), e.result
                }
            },
            handlers: function(e, t) {
                var r, i, s, o, u = [],
                    a = t.delegateCount,
                    f = e.target;
                if (a && f.nodeType && (!e.button || "click" !== e.type))
                    for (; f !== this; f = f.parentNode || this)
                        if (f.disabled !== !0 || "click" !== e.type) {
                            for (i = [], r = 0; a > r; r++) o = t[r], s = o.selector + " ", void 0 === i[s] && (i[s] = o.needsContext ? n(s, this).index(f) >= 0 : n.find(s, this, null, [f]).length), i[s] && i.push(o);
                            i.length && u.push({
                                elem: f,
                                handlers: i
                            })
                        }
                return a < t.length && u.push({
                    elem: this,
                    handlers: t.slice(a)
                }), u
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, t) {
                    var n, r, i, s = t.button;
                    return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || l, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
                }
            },
            fix: function(e) {
                if (e[n.expando]) return e;
                var t, r, i, s = e.type,
                    o = e,
                    u = this.fixHooks[s];
                u || (this.fixHooks[s] = u = W.test(s) ? this.mouseHooks : V.test(s) ? this.keyHooks : {}), i = u.props ? this.props.concat(u.props) : this.props, e = new n.Event(o), t = i.length;
                while (t--) r = i[t], e[r] = o[r];
                return e.target || (e.target = l), 3 === e.target.nodeType && (e.target = e.target.parentNode), u.filter ? u.filter(e, o) : e
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        return this !== _() && this.focus ? (this.focus(), !1) : void 0
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === _() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
                    },
                    _default: function(e) {
                        return n.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function(e, t, r, i) {
                var s = n.extend(new n.Event, r, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                i ? n.event.trigger(s, null, t) : n.event.dispatch.call(t, s), s.isDefaultPrevented() && r.preventDefault()
            }
        }, n.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        }, n.Event = function(e, t) {
            return this instanceof n.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? Z : $) : this.type = e, t && n.extend(this, t), this.timeStamp = e && e.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(e, t)
        }, n.Event.prototype = {
            isDefaultPrevented: $,
            isPropagationStopped: $,
            isImmediatePropagationStopped: $,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = Z, e && e.preventDefault && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = Z, e && e.stopPropagation && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = Z, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, n.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            n.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var r, i = this,
                        s = e.relatedTarget,
                        o = e.handleObj;
                    return (!s || s !== i && !n.contains(i, s)) && (e.type = o.origType, r = o.handler.apply(this, arguments), e.type = t), r
                }
            }
        }), k.focusinBubbles || n.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var r = function(e) {
                n.event.simulate(t, e.target, n.event.fix(e), !0)
            };
            n.event.special[t] = {
                setup: function() {
                    var n = this.ownerDocument || this,
                        i = L.access(n, t);
                    i || n.addEventListener(e, r, !0), L.access(n, t, (i || 0) + 1)
                },
                teardown: function() {
                    var n = this.ownerDocument || this,
                        i = L.access(n, t) - 1;
                    i ? L.access(n, t, i) : (n.removeEventListener(e, r, !0), L.remove(n, t))
                }
            }
        }), n.fn.extend({
            on: function(e, t, r, i, s) {
                var o, u;
                if ("object" == typeof e) {
                    "string" != typeof t && (r = r || t, t = void 0);
                    for (u in e) this.on(u, t, r, e[u], s);
                    return this
                }
                if (null == r && null == i ? (i = t, r = t = void 0) : null == i && ("string" == typeof t ? (i = r, r = void 0) : (i = r, r = t, t = void 0)), i === !1) i = $;
                else if (!i) return this;
                return 1 === s && (o = i, i = function(e) {
                    return n().off(e), o.apply(this, arguments)
                }, i.guid = o.guid || (o.guid = n.guid++)), this.each(function() {
                    n.event.add(this, e, i, r, t)
                })
            },
            one: function(e, t, n, r) {
                return this.on(e, t, n, r, 1)
            },
            off: function(e, t, r) {
                var i, s;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, n(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (s in e) this.off(s, t, e[s]);
                    return this
                }
                return (t === !1 || "function" == typeof t) && (r = t, t = void 0), r === !1 && (r = $), this.each(function() {
                    n.event.remove(this, e, r, t)
                })
            },
            trigger: function(e, t) {
                return this.each(function() {
                    n.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var r = this[0];
                return r ? n.event.trigger(e, t, r, !0) : void 0
            }
        });
        var ab = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            bb = /<([\w:]+)/,
            cb = /<|&#?\w+;/,
            db = /<(?:script|style|link)/i,
            eb = /checked\s*(?:[^=]|=\s*.checked.)/i,
            fb = /^$|\/(?:java|ecma)script/i,
            gb = /^true\/(.*)/,
            hb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            ib = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        ib.optgroup = ib.option, ib.tbody = ib.tfoot = ib.colgroup = ib.caption = ib.thead, ib.th = ib.td, n.extend({
            clone: function(e, t, r) {
                var i, s, o, u, a = e.cloneNode(!0),
                    f = n.contains(e.ownerDocument, e);
                if (!(k.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || n.isXMLDoc(e)))
                    for (u = ob(a), o = ob(e), i = 0, s = o.length; s > i; i++) pb(o[i], u[i]);
                if (t)
                    if (r)
                        for (o = o || ob(e), u = u || ob(a), i = 0, s = o.length; s > i; i++) nb(o[i], u[i]);
                    else nb(e, a);
                return u = ob(a, "script"), u.length > 0 && mb(u, !f && ob(e, "script")), a
            },
            buildFragment: function(e, t, r, i) {
                for (var s, o, u, a, f, l, c = t.createDocumentFragment(), h = [], p = 0, d = e.length; d > p; p++)
                    if (s = e[p], s || 0 === s)
                        if ("object" === n.type(s)) n.merge(h, s.nodeType ? [s] : s);
                        else if (cb.test(s)) {
                    o = o || c.appendChild(t.createElement("div")), u = (bb.exec(s) || ["", ""])[1].toLowerCase(), a = ib[u] || ib._default, o.innerHTML = a[1] + s.replace(ab, "<$1></$2>") + a[2], l = a[0];
                    while (l--) o = o.lastChild;
                    n.merge(h, o.childNodes), o = c.firstChild, o.textContent = ""
                } else h.push(t.createTextNode(s));
                c.textContent = "", p = 0;
                while (s = h[p++])
                    if ((!i || -1 === n.inArray(s, i)) && (f = n.contains(s.ownerDocument, s), o = ob(c.appendChild(s), "script"), f && mb(o), r)) {
                        l = 0;
                        while (s = o[l++]) fb.test(s.type || "") && r.push(s)
                    }
                return c
            },
            cleanData: function(e) {
                for (var t, r, i, s, o = n.event.special, u = 0; void 0 !== (r = e[u]); u++) {
                    if (n.acceptData(r) && (s = r[L.expando], s && (t = L.cache[s]))) {
                        if (t.events)
                            for (i in t.events) o[i] ? n.event.remove(r, i) : n.removeEvent(r, i, t.handle);
                        L.cache[s] && delete L.cache[s]
                    }
                    delete M.cache[r[M.expando]]
                }
            }
        }), n.fn.extend({
            text: function(e) {
                return J(this, function(e) {
                    return void 0 === e ? n.text(this) : this.empty().each(function() {
                        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = jb(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = jb(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function(e, t) {
                for (var r, i = e ? n.filter(e, this) : this, s = 0; null != (r = i[s]); s++) t || 1 !== r.nodeType || n.cleanData(ob(r)), r.parentNode && (t && n.contains(r.ownerDocument, r) && mb(ob(r, "script")), r.parentNode.removeChild(r));
                return this
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (n.cleanData(ob(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                    return n.clone(this, e, t)
                })
            },
            html: function(e) {
                return J(this, function(e) {
                    var t = this[0] || {},
                        r = 0,
                        i = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !db.test(e) && !ib[(bb.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(ab, "<$1></$2>");
                        try {
                            for (; i > r; r++) t = this[r] || {}, 1 === t.nodeType && (n.cleanData(ob(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (s) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = arguments[0];
                return this.domManip(arguments, function(t) {
                    e = this.parentNode, n.cleanData(ob(this)), e && e.replaceChild(t, this)
                }), e && (e.length || e.nodeType) ? this : this.remove()
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(t, r) {
                t = e.apply([], t);
                var i, s, o, u, a, f, l = 0,
                    c = this.length,
                    h = this,
                    p = c - 1,
                    d = t[0],
                    v = n.isFunction(d);
                if (v || c > 1 && "string" == typeof d && !k.checkClone && eb.test(d)) return this.each(function(e) {
                    var n = h.eq(e);
                    v && (t[0] = d.call(this, e, n.html())), n.domManip(t, r)
                });
                if (c && (i = n.buildFragment(t, this[0].ownerDocument, !1, this), s = i.firstChild, 1 === i.childNodes.length && (i = s), s)) {
                    for (o = n.map(ob(i, "script"), kb), u = o.length; c > l; l++) a = i, l !== p && (a = n.clone(a, !0, !0), u && n.merge(o, ob(a, "script"))), r.call(this[l], a, l);
                    if (u)
                        for (f = o[o.length - 1].ownerDocument, n.map(o, lb), l = 0; u > l; l++) a = o[l], fb.test(a.type || "") && !L.access(a, "globalEval") && n.contains(f, a) && (a.src ? n._evalUrl && n._evalUrl(a.src) : n.globalEval(a.textContent.replace(hb, "")))
                }
                return this
            }
        }), n.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            n.fn[e] = function(e) {
                for (var r, i = [], s = n(e), o = s.length - 1, u = 0; o >= u; u++) r = u === o ? this : this.clone(!0), n(s[u])[t](r), f.apply(i, r.get());
                return this.pushStack(i)
            }
        });
        var qb, rb = {},
            ub = /^margin/,
            vb = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
            wb = function(e) {
                return e.ownerDocument.defaultView.getComputedStyle(e, null)
            };
        ! function() {
            var e, t, r = l.documentElement,
                i = l.createElement("div"),
                s = l.createElement("div");
            if (s.style) {
                s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === s.style.backgroundClip, i.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", i.appendChild(s);

                function o() {
                    s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", s.innerHTML = "", r.appendChild(i);
                    var n = a.getComputedStyle(s, null);
                    e = "1%" !== n.top, t = "4px" === n.width, r.removeChild(i)
                }
                a.getComputedStyle && n.extend(k, {
                    pixelPosition: function() {
                        return o(), e
                    },
                    boxSizingReliable: function() {
                        return null == t && o(), t
                    },
                    reliableMarginRight: function() {
                        var e, t = s.appendChild(l.createElement("div"));
                        return t.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", s.style.width = "1px", r.appendChild(i), e = !parseFloat(a.getComputedStyle(t, null).marginRight), r.removeChild(i), e
                    }
                })
            }
        }(), n.swap = function(e, t, n, r) {
            var i, s, o = {};
            for (s in t) o[s] = e.style[s], e.style[s] = t[s];
            i = n.apply(e, r || []);
            for (s in t) e.style[s] = o[s];
            return i
        };
        var zb = /^(none|table(?!-c[ea]).+)/,
            Ab = new RegExp("^(" + Q + ")(.*)$", "i"),
            Bb = new RegExp("^([+-])=(" + Q + ")", "i"),
            Cb = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Db = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            Eb = ["Webkit", "O", "Moz", "ms"];
        n.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = xb(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(e, t, r, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var s, o, u, a = n.camelCase(t),
                        f = e.style;
                    return t = n.cssProps[a] || (n.cssProps[a] = Fb(f, a)), u = n.cssHooks[t] || n.cssHooks[a], void 0 === r ? u && "get" in u && void 0 !== (s = u.get(e, !1, i)) ? s : f[t] : (o = typeof r, "string" === o && (s = Bb.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(n.css(e, t)), o = "number"), null != r && r === r && ("number" !== o || n.cssNumber[a] || (r += "px"), k.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (f[t] = "inherit"), u && "set" in u && void 0 === (r = u.set(e, r, i)) || (f[t] = r)), void 0)
                }
            },
            css: function(e, t, r, i) {
                var s, o, u, a = n.camelCase(t);
                return t = n.cssProps[a] || (n.cssProps[a] = Fb(e.style, a)), u = n.cssHooks[t] || n.cssHooks[a], u && "get" in u && (s = u.get(e, !0, r)), void 0 === s && (s = xb(e, t, i)), "normal" === s && t in Db && (s = Db[t]), "" === r || r ? (o = parseFloat(s), r === !0 || n.isNumeric(o) ? o || 0 : s) : s
            }
        }), n.each(["height", "width"], function(e, t) {
            n.cssHooks[t] = {
                get: function(e, r, i) {
                    return r ? zb.test(n.css(e, "display")) && 0 === e.offsetWidth ? n.swap(e, Cb, function() {
                        return Ib(e, t, i)
                    }) : Ib(e, t, i) : void 0
                },
                set: function(e, r, i) {
                    var s = i && wb(e);
                    return Gb(e, r, i ? Hb(e, t, i, "border-box" === n.css(e, "boxSizing", !1, s), s) : 0)
                }
            }
        }), n.cssHooks.marginRight = yb(k.reliableMarginRight, function(e, t) {
            return t ? n.swap(e, {
                display: "inline-block"
            }, xb, [e, "marginRight"]) : void 0
        }), n.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            n.cssHooks[e + t] = {
                expand: function(n) {
                    for (var r = 0, i = {}, s = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + R[r] + t] = s[r] || s[r - 2] || s[0];
                    return i
                }
            }, ub.test(e) || (n.cssHooks[e + t].set = Gb)
        }), n.fn.extend({
            css: function(e, t) {
                return J(this, function(e, t, r) {
                    var i, s, o = {},
                        u = 0;
                    if (n.isArray(t)) {
                        for (i = wb(e), s = t.length; s > u; u++) o[t[u]] = n.css(e, t[u], !1, i);
                        return o
                    }
                    return void 0 !== r ? n.style(e, t, r) : n.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function() {
                return Jb(this, !0)
            },
            hide: function() {
                return Jb(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    S(this) ? n(this).show() : n(this).hide()
                })
            }
        }), n.Tween = Kb, Kb.prototype = {
            constructor: Kb,
            init: function(e, t, r, i, s, o) {
                this.elem = e, this.prop = r, this.easing = s || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (n.cssNumber[r] ? "" : "px")
            },
            cur: function() {
                var e = Kb.propHooks[this.prop];
                return e && e.get ? e.get(this) : Kb.propHooks._default.get(this)
            },
            run: function(e) {
                var t, r = Kb.propHooks[this.prop];
                return this.pos = t = this.options.duration ? n.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : Kb.propHooks._default.set(this), this
            }
        }, Kb.prototype.init.prototype = Kb.prototype, Kb.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = n.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function(e) {
                    n.fx.step[e.prop] ? n.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[n.cssProps[e.prop]] || n.cssHooks[e.prop]) ? n.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, Kb.propHooks.scrollTop = Kb.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, n.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, n.fx = Kb.prototype.init, n.fx.step = {};
        var Lb, Mb, Nb = /^(?:toggle|show|hide)$/,
            Ob = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
            Pb = /queueHooks$/,
            Qb = [Vb],
            Rb = {
                "*": [function(e, t) {
                    var r = this.createTween(e, t),
                        i = r.cur(),
                        s = Ob.exec(t),
                        o = s && s[3] || (n.cssNumber[e] ? "" : "px"),
                        u = (n.cssNumber[e] || "px" !== o && +i) && Ob.exec(n.css(r.elem, e)),
                        a = 1,
                        f = 20;
                    if (u && u[3] !== o) {
                        o = o || u[3], s = s || [], u = +i || 1;
                        do a = a || ".5", u /= a, n.style(r.elem, e, u + o); while (a !== (a = r.cur() / i) && 1 !== a && --f)
                    }
                    return s && (u = r.start = +u || +i || 0, r.unit = o, r.end = s[1] ? u + (s[1] + 1) * s[2] : +s[2]), r
                }]
            };
        n.Animation = n.extend(Xb, {
                tweener: function(e, t) {
                    n.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                    for (var r, i = 0, s = e.length; s > i; i++) r = e[i], Rb[r] = Rb[r] || [], Rb[r].unshift(t)
                },
                prefilter: function(e, t) {
                    t ? Qb.unshift(e) : Qb.push(e)
                }
            }), n.speed = function(e, t, r) {
                var i = e && "object" == typeof e ? n.extend({}, e) : {
                    complete: r || !r && t || n.isFunction(e) && e,
                    duration: e,
                    easing: r && t || t && !n.isFunction(t) && t
                };
                return i.duration = n.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in n.fx.speeds ? n.fx.speeds[i.duration] : n.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                    n.isFunction(i.old) && i.old.call(this), i.queue && n.dequeue(this, i.queue)
                }, i
            }, n.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(S).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r)
                },
                animate: function(e, t, r, i) {
                    var s = n.isEmptyObject(e),
                        o = n.speed(t, r, i),
                        u = function() {
                            var t = Xb(this, n.extend({}, e), o);
                            (s || L.get(this, "finish")) && t.stop(!0)
                        };
                    return u.finish = u, s || o.queue === !1 ? this.each(u) : this.queue(o.queue, u)
                },
                stop: function(e, t, r) {
                    var i = function(e) {
                        var t = e.stop;
                        delete e.stop, t(r)
                    };
                    return "string" != typeof e && (r = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            s = null != e && e + "queueHooks",
                            o = n.timers,
                            u = L.get(this);
                        if (s) u[s] && u[s].stop && i(u[s]);
                        else
                            for (s in u) u[s] && u[s].stop && Pb.test(s) && i(u[s]);
                        for (s = o.length; s--;) o[s].elem !== this || null != e && o[s].queue !== e || (o[s].anim.stop(r), t = !1, o.splice(s, 1));
                        (t || !r) && n.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, r = L.get(this),
                            i = r[e + "queue"],
                            s = r[e + "queueHooks"],
                            o = n.timers,
                            u = i ? i.length : 0;
                        for (r.finish = !0, n.queue(this, e, []), s && s.stop && s.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; u > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete r.finish
                    })
                }
            }), n.each(["toggle", "show", "hide"], function(e, t) {
                var r = n.fn[t];
                n.fn[t] = function(e, n, i) {
                    return null == e || "boolean" == typeof e ? r.apply(this, arguments) : this.animate(Tb(t, !0), e, n, i)
                }
            }), n.each({
                slideDown: Tb("show"),
                slideUp: Tb("hide"),
                slideToggle: Tb("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                n.fn[e] = function(e, n, r) {
                    return this.animate(t, e, n, r)
                }
            }), n.timers = [], n.fx.tick = function() {
                var e, t = 0,
                    r = n.timers;
                for (Lb = n.now(); t < r.length; t++) e = r[t], e() || r[t] !== e || r.splice(t--, 1);
                r.length || n.fx.stop(), Lb = void 0
            }, n.fx.timer = function(e) {
                n.timers.push(e), e() ? n.fx.start() : n.timers.pop()
            }, n.fx.interval = 13, n.fx.start = function() {
                Mb || (Mb = setInterval(n.fx.tick, n.fx.interval))
            }, n.fx.stop = function() {
                clearInterval(Mb), Mb = null
            }, n.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, n.fn.delay = function(e, t) {
                return e = n.fx ? n.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                    var r = setTimeout(t, e);
                    n.stop = function() {
                        clearTimeout(r)
                    }
                })
            },
            function() {
                var e = l.createElement("input"),
                    t = l.createElement("select"),
                    n = t.appendChild(l.createElement("option"));
                e.type = "checkbox", k.checkOn = "" !== e.value, k.optSelected = n.selected, t.disabled = !0, k.optDisabled = !n.disabled, e = l.createElement("input"), e.value = "t", e.type = "radio", k.radioValue = "t" === e.value
            }();
        var Yb, Zb, $b = n.expr.attrHandle;
        n.fn.extend({
            attr: function(e, t) {
                return J(this, n.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    n.removeAttr(this, e)
                })
            }
        }), n.extend({
            attr: function(e, t, r) {
                var i, s, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === U ? n.prop(e, t, r) : (1 === o && n.isXMLDoc(e) || (t = t.toLowerCase(), i = n.attrHooks[t] || (n.expr.match.bool.test(t) ? Zb : Yb)), void 0 === r ? i && "get" in i && null !== (s = i.get(e, t)) ? s : (s = n.find.attr(e, t), null == s ? void 0 : s) : null !== r ? i && "set" in i && void 0 !== (s = i.set(e, r, t)) ? s : (e.setAttribute(t, r + ""), r) : void n.removeAttr(e, t))
            },
            removeAttr: function(e, t) {
                var r, i, s = 0,
                    o = t && t.match(E);
                if (o && 1 === e.nodeType)
                    while (r = o[s++]) i = n.propFix[r] || r, n.expr.match.bool.test(r) && (e[i] = !1), e.removeAttribute(r)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!k.radioValue && "radio" === t && n.nodeName(e, "input")) {
                            var r = e.value;
                            return e.setAttribute("type", t), r && (e.value = r), t
                        }
                    }
                }
            }
        }), Zb = {
            set: function(e, t, r) {
                return t === !1 ? n.removeAttr(e, r) : e.setAttribute(r, r), r
            }
        }, n.each(n.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var r = $b[t] || n.find.attr;
            $b[t] = function(e, t, n) {
                var i, s;
                return n || (s = $b[t], $b[t] = i, i = null != r(e, t, n) ? t.toLowerCase() : null, $b[t] = s), i
            }
        });
        var _b = /^(?:input|select|textarea|button)$/i;
        n.fn.extend({
            prop: function(e, t) {
                return J(this, n.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[n.propFix[e] || e]
                })
            }
        }), n.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(e, t, r) {
                var i, s, o, u = e.nodeType;
                if (e && 3 !== u && 8 !== u && 2 !== u) return o = 1 !== u || !n.isXMLDoc(e), o && (t = n.propFix[t] || t, s = n.propHooks[t]), void 0 !== r ? s && "set" in s && void 0 !== (i = s.set(e, r, t)) ? i : e[t] = r : s && "get" in s && null !== (i = s.get(e, t)) ? i : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        return e.hasAttribute("tabindex") || _b.test(e.nodeName) || e.href ? e.tabIndex : -1
                    }
                }
            }
        }), k.optSelected || (n.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            }
        }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            n.propFix[this.toLowerCase()] = this
        });
        var ac = /[\t\r\n\f]/g;
        n.fn.extend({
            addClass: function(e) {
                var t, r, i, s, o, u, a = "string" == typeof e && e,
                    f = 0,
                    l = this.length;
                if (n.isFunction(e)) return this.each(function(t) {
                    n(this).addClass(e.call(this, t, this.className))
                });
                if (a)
                    for (t = (e || "").match(E) || []; l > f; f++)
                        if (r = this[f], i = 1 === r.nodeType && (r.className ? (" " + r.className + " ").replace(ac, " ") : " ")) {
                            o = 0;
                            while (s = t[o++]) i.indexOf(" " + s + " ") < 0 && (i += s + " ");
                            u = n.trim(i), r.className !== u && (r.className = u)
                        }
                return this
            },
            removeClass: function(e) {
                var t, r, i, s, o, u, a = 0 === arguments.length || "string" == typeof e && e,
                    f = 0,
                    l = this.length;
                if (n.isFunction(e)) return this.each(function(t) {
                    n(this).removeClass(e.call(this, t, this.className))
                });
                if (a)
                    for (t = (e || "").match(E) || []; l > f; f++)
                        if (r = this[f], i = 1 === r.nodeType && (r.className ? (" " + r.className + " ").replace(ac, " ") : "")) {
                            o = 0;
                            while (s = t[o++])
                                while (i.indexOf(" " + s + " ") >= 0) i = i.replace(" " + s + " ", " ");
                            u = e ? n.trim(i) : "", r.className !== u && (r.className = u)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var r = typeof e;
                return "boolean" == typeof t && "string" === r ? t ? this.addClass(e) : this.removeClass(e) : this.each(n.isFunction(e) ? function(r) {
                    n(this).toggleClass(e.call(this, r, this.className, t), t)
                } : function() {
                    if ("string" === r) {
                        var t, i = 0,
                            s = n(this),
                            o = e.match(E) || [];
                        while (t = o[i++]) s.hasClass(t) ? s.removeClass(t) : s.addClass(t)
                    } else(r === U || "boolean" === r) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : L.get(this, "__className__") || "")
                })
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(ac, " ").indexOf(t) >= 0) return !0;
                return !1
            }
        });
        var bc = /\r/g;
        n.fn.extend({
            val: function(e) {
                var t, r, i, s = this[0];
                if (arguments.length) return i = n.isFunction(e), this.each(function(r) {
                    var s;
                    1 === this.nodeType && (s = i ? e.call(this, r, n(this).val()) : e, null == s ? s = "" : "number" == typeof s ? s += "" : n.isArray(s) && (s = n.map(s, function(e) {
                        return null == e ? "" : e + ""
                    })), t = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, s, "value") || (this.value = s))
                });
                if (s) return t = n.valHooks[s.type] || n.valHooks[s.nodeName.toLowerCase()], t && "get" in t && void 0 !== (r = t.get(s, "value")) ? r : (r = s.value, "string" == typeof r ? r.replace(bc, "") : null == r ? "" : r)
            }
        }), n.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = n.find.attr(e, "value");
                        return null != t ? t : n.trim(n.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, r, i = e.options, s = e.selectedIndex, o = "select-one" === e.type || 0 > s, u = o ? null : [], a = o ? s + 1 : i.length, f = 0 > s ? a : o ? s : 0; a > f; f++)
                            if (r = i[f], !(!r.selected && f !== s || (k.optDisabled ? r.disabled : null !== r.getAttribute("disabled")) || r.parentNode.disabled && n.nodeName(r.parentNode, "optgroup"))) {
                                if (t = n(r).val(), o) return t;
                                u.push(t)
                            }
                        return u
                    },
                    set: function(e, t) {
                        var r, i, s = e.options,
                            o = n.makeArray(t),
                            u = s.length;
                        while (u--) i = s[u], (i.selected = n.inArray(i.value, o) >= 0) && (r = !0);
                        return r || (e.selectedIndex = -1), o
                    }
                }
            }
        }), n.each(["radio", "checkbox"], function() {
            n.valHooks[this] = {
                set: function(e, t) {
                    return n.isArray(t) ? e.checked = n.inArray(n(e).val(), t) >= 0 : void 0
                }
            }, k.checkOn || (n.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            n.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), n.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        });
        var cc = n.now(),
            dc = /\?/;
        n.parseJSON = function(e) {
            return JSON.parse(e + "")
        }, n.parseXML = function(e) {
            var t, r;
            if (!e || "string" != typeof e) return null;
            try {
                r = new DOMParser, t = r.parseFromString(e, "text/xml")
            } catch (i) {
                t = void 0
            }
            return (!t || t.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + e), t
        };
        var ec, fc, gc = /#.*$/,
            hc = /([?&])_=[^&]*/,
            ic = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            jc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            kc = /^(?:GET|HEAD)$/,
            lc = /^\/\//,
            mc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            nc = {},
            oc = {},
            pc = "*/".concat("*");
        try {
            fc = location.href
        } catch (qc) {
            fc = l.createElement("a"), fc.href = "", fc = fc.href
        }
        ec = mc.exec(fc.toLowerCase()) || [], n.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: fc,
                type: "GET",
                isLocal: jc.test(ec[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": pc,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": n.parseJSON,
                    "text xml": n.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? tc(tc(e, n.ajaxSettings), t) : tc(n.ajaxSettings, e)
            },
            ajaxPrefilter: rc(nc),
            ajaxTransport: rc(oc),
            ajax: function(e, t) {
                function T(e, t, o, a) {
                    var l, g, y, w, E, x = t;
                    2 !== b && (b = 2, u && clearTimeout(u), r = void 0, s = a || "", S.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (w = uc(c, S, o)), w = vc(c, w, S, l), l ? (c.ifModified && (E = S.getResponseHeader("Last-Modified"), E && (n.lastModified[i] = E), E = S.getResponseHeader("etag"), E && (n.etag[i] = E)), 204 === e || "HEAD" === c.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = w.state, g = w.data, y = w.error, l = !y)) : (y = x, (e || !x) && (x = "error", 0 > e && (e = 0))), S.status = e, S.statusText = (t || x) + "", l ? d.resolveWith(h, [g, x, S]) : d.rejectWith(h, [S, x, y]), S.statusCode(m), m = void 0, f && p.trigger(l ? "ajaxSuccess" : "ajaxError", [S, c, l ? g : y]), v.fireWith(h, [S, x]), f && (p.trigger("ajaxComplete", [S, c]), --n.active || n.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var r, i, s, o, u, a, f, l, c = n.ajaxSetup({}, t),
                    h = c.context || c,
                    p = c.context && (h.nodeType || h.jquery) ? n(h) : n.event,
                    d = n.Deferred(),
                    v = n.Callbacks("once memory"),
                    m = c.statusCode || {},
                    g = {},
                    y = {},
                    b = 0,
                    w = "canceled",
                    S = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === b) {
                                if (!o) {
                                    o = {};
                                    while (t = ic.exec(s)) o[t[1].toLowerCase()] = t[2]
                                }
                                t = o[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? s : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return b || (e = y[n] = y[n] || e, g[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return b || (c.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (2 > b)
                                    for (t in e) m[t] = [m[t], e[t]];
                                else S.always(e[S.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || w;
                            return r && r.abort(t), T(0, t), this
                        }
                    };
                if (d.promise(S).complete = v.add, S.success = S.done, S.error = S.fail, c.url = ((e || c.url || fc) + "").replace(gc, "").replace(lc, ec[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = n.trim(c.dataType || "*").toLowerCase().match(E) || [""], null == c.crossDomain && (a = mc.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ec[1] && a[2] === ec[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (ec[3] || ("http:" === ec[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = n.param(c.data, c.traditional)), sc(nc, c, t, S), 2 === b) return S;
                f = c.global, f && 0 === n.active++ && n.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !kc.test(c.type), i = c.url, c.hasContent || (c.data && (i = c.url += (dc.test(i) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = hc.test(i) ? i.replace(hc, "$1_=" + cc++) : i + (dc.test(i) ? "&" : "?") + "_=" + cc++)), c.ifModified && (n.lastModified[i] && S.setRequestHeader("If-Modified-Since", n.lastModified[i]), n.etag[i] && S.setRequestHeader("If-None-Match", n.etag[i])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && S.setRequestHeader("Content-Type", c.contentType), S.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + pc + "; q=0.01" : "") : c.accepts["*"]);
                for (l in c.headers) S.setRequestHeader(l, c.headers[l]);
                if (!c.beforeSend || c.beforeSend.call(h, S, c) !== !1 && 2 !== b) {
                    w = "abort";
                    for (l in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) S[l](c[l]);
                    if (r = sc(oc, c, t, S)) {
                        S.readyState = 1, f && p.trigger("ajaxSend", [S, c]), c.async && c.timeout > 0 && (u = setTimeout(function() {
                            S.abort("timeout")
                        }, c.timeout));
                        try {
                            b = 1, r.send(g, T)
                        } catch (x) {
                            if (!(2 > b)) throw x;
                            T(-1, x)
                        }
                    } else T(-1, "No Transport");
                    return S
                }
                return S.abort()
            },
            getJSON: function(e, t, r) {
                return n.get(e, t, r, "json")
            },
            getScript: function(e, t) {
                return n.get(e, void 0, t, "script")
            }
        }), n.each(["get", "post"], function(e, t) {
            n[t] = function(e, r, i, s) {
                return n.isFunction(r) && (s = s || i, i = r, r = void 0), n.ajax({
                    url: e,
                    type: t,
                    dataType: s,
                    data: r,
                    success: i
                })
            }
        }), n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            n.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), n._evalUrl = function(e) {
            return n.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, n.fn.extend({
            wrapAll: function(e) {
                var t;
                return n.isFunction(e) ? this.each(function(t) {
                    n(this).wrapAll(e.call(this, t))
                }) : (this[0] && (t = n(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    var e = this;
                    while (e.firstElementChild) e = e.firstElementChild;
                    return e
                }).append(this)), this)
            },
            wrapInner: function(e) {
                return this.each(n.isFunction(e) ? function(t) {
                    n(this).wrapInner(e.call(this, t))
                } : function() {
                    var t = n(this),
                        r = t.contents();
                    r.length ? r.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = n.isFunction(e);
                return this.each(function(r) {
                    n(this).wrapAll(t ? e.call(this, r) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
                }).end()
            }
        }), n.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0
        }, n.expr.filters.visible = function(e) {
            return !n.expr.filters.hidden(e)
        };
        var wc = /%20/g,
            xc = /\[\]$/,
            yc = /\r?\n/g,
            zc = /^(?:submit|button|image|reset|file)$/i,
            Ac = /^(?:input|select|textarea|keygen)/i;
        n.param = function(e, t) {
            var r, i = [],
                s = function(e, t) {
                    t = n.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (void 0 === t && (t = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(e) || e.jquery && !n.isPlainObject(e)) n.each(e, function() {
                s(this.name, this.value)
            });
            else
                for (r in e) Bc(r, e[r], t, s);
            return i.join("&").replace(wc, "+")
        }, n.fn.extend({
            serialize: function() {
                return n.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = n.prop(this, "elements");
                    return e ? n.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !n(this).is(":disabled") && Ac.test(this.nodeName) && !zc.test(e) && (this.checked || !T.test(e))
                }).map(function(e, t) {
                    var r = n(this).val();
                    return null == r ? null : n.isArray(r) ? n.map(r, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(yc, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: r.replace(yc, "\r\n")
                    }
                }).get()
            }
        }), n.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest
            } catch (e) {}
        };
        var Cc = 0,
            Dc = {},
            Ec = {
                0: 200,
                1223: 204
            },
            Fc = n.ajaxSettings.xhr();
        a.ActiveXObject && n(a).on("unload", function() {
            for (var e in Dc) Dc[e]()
        }), k.cors = !!Fc && "withCredentials" in Fc, k.ajax = Fc = !!Fc, n.ajaxTransport(function(e) {
            var t;
            return k.cors || Fc && !e.crossDomain ? {
                send: function(n, r) {
                    var i, s = e.xhr(),
                        o = ++Cc;
                    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (i in e.xhrFields) s[i] = e.xhrFields[i];
                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) s.setRequestHeader(i, n[i]);
                    t = function(e) {
                        return function() {
                            t && (delete Dc[o], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status, s.statusText) : r(Ec[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                                text: s.responseText
                            } : void 0, s.getAllResponseHeaders()))
                        }
                    }, s.onload = t(), s.onerror = t("error"), t = Dc[o] = t("abort");
                    try {
                        s.send(e.hasContent && e.data || null)
                    } catch (u) {
                        if (t) throw u
                    }
                },
                abort: function() {
                    t && t()
                }
            } : void 0
        }), n.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    return n.globalEval(e), e
                }
            }
        }), n.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), n.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, r;
                return {
                    send: function(i, s) {
                        t = n("<script>").prop({
                            async: !0,
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", r = function(e) {
                            t.remove(), r = null, e && s("error" === e.type ? 404 : 200, e.type)
                        }), l.head.appendChild(t[0])
                    },
                    abort: function() {
                        r && r()
                    }
                }
            }
        });
        var Gc = [],
            Hc = /(=)\?(?=&|$)|\?\?/;
        n.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Gc.pop() || n.expando + "_" + cc++;
                return this[e] = !0, e
            }
        }), n.ajaxPrefilter("json jsonp", function(e, t, r) {
            var i, s, o, u = e.jsonp !== !1 && (Hc.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Hc.test(e.data) && "data");
            return u || "jsonp" === e.dataTypes[0] ? (i = e.jsonpCallback = n.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, u ? e[u] = e[u].replace(Hc, "$1" + i) : e.jsonp !== !1 && (e.url += (dc.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
                return o || n.error(i + " was not called"), o[0]
            }, e.dataTypes[0] = "json", s = a[i], a[i] = function() {
                o = arguments
            }, r.always(function() {
                a[i] = s, e[i] && (e.jsonpCallback = t.jsonpCallback, Gc.push(i)), o && n.isFunction(s) && s(o[0]), o = s = void 0
            }), "script") : void 0
        }), n.parseHTML = function(e, t, r) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (r = t, t = !1), t = t || l;
            var i = v.exec(e),
                s = !r && [];
            return i ? [t.createElement(i[1])] : (i = n.buildFragment([e], t, s), s && s.length && n(s).remove(), n.merge([], i.childNodes))
        };
        var Ic = n.fn.load;
        n.fn.load = function(e, t, r) {
            if ("string" != typeof e && Ic) return Ic.apply(this, arguments);
            var i, s, o, u = this,
                a = e.indexOf(" ");
            return a >= 0 && (i = n.trim(e.slice(a)), e = e.slice(0, a)), n.isFunction(t) ? (r = t, t = void 0) : t && "object" == typeof t && (s = "POST"), u.length > 0 && n.ajax({
                url: e,
                type: s,
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments, u.html(i ? n("<div>").append(n.parseHTML(e)).find(i) : e)
            }).complete(r && function(e, t) {
                u.each(r, o || [e.responseText, t, e])
            }), this
        }, n.expr.filters.animated = function(e) {
            return n.grep(n.timers, function(t) {
                return e === t.elem
            }).length
        };
        var Jc = a.document.documentElement;
        n.offset = {
            setOffset: function(e, t, r) {
                var i, s, o, u, a, f, l, c = n.css(e, "position"),
                    h = n(e),
                    p = {};
                "static" === c && (e.style.position = "relative"), a = h.offset(), o = n.css(e, "top"), f = n.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + f).indexOf("auto") > -1, l ? (i = h.position(), u = i.top, s = i.left) : (u = parseFloat(o) || 0, s = parseFloat(f) || 0), n.isFunction(t) && (t = t.call(e, r, a)), null != t.top && (p.top = t.top - a.top + u), null != t.left && (p.left = t.left - a.left + s), "using" in t ? t.using.call(e, p) : h.css(p)
            }
        }, n.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    n.offset.setOffset(this, e, t)
                });
                var t, r, i = this[0],
                    s = {
                        top: 0,
                        left: 0
                    },
                    o = i && i.ownerDocument;
                if (o) return t = o.documentElement, n.contains(t, i) ? (typeof i.getBoundingClientRect !== U && (s = i.getBoundingClientRect()), r = Kc(o), {
                    top: s.top + r.pageYOffset - t.clientTop,
                    left: s.left + r.pageXOffset - t.clientLeft
                }) : s
            },
            position: function() {
                if (this[0]) {
                    var e, t, r = this[0],
                        i = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === n.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), n.nodeName(e[0], "html") || (i = e.offset()), i.top += n.css(e[0], "borderTopWidth", !0), i.left += n.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - i.top - n.css(r, "marginTop", !0),
                        left: t.left - i.left - n.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var e = this.offsetParent || Jc;
                    while (e && !n.nodeName(e, "html") && "static" === n.css(e, "position")) e = e.offsetParent;
                    return e || Jc
                })
            }
        }), n.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var r = "pageYOffset" === t;
            n.fn[e] = function(n) {
                return J(this, function(e, n, i) {
                    var s = Kc(e);
                    return void 0 === i ? s ? s[t] : e[n] : void(s ? s.scrollTo(r ? a.pageXOffset : i, r ? i : a.pageYOffset) : e[n] = i)
                }, e, n, arguments.length, null)
            }
        }), n.each(["top", "left"], function(e, t) {
            n.cssHooks[t] = yb(k.pixelPosition, function(e, r) {
                return r ? (r = xb(e, t), vb.test(r) ? n(e).position()[t] + "px" : r) : void 0
            })
        }), n.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            n.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(r, i) {
                n.fn[i] = function(i, s) {
                    var o = arguments.length && (r || "boolean" != typeof i),
                        u = r || (i === !0 || s === !0 ? "margin" : "border");
                    return J(this, function(t, r, i) {
                        var s;
                        return n.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (s = t.documentElement, Math.max(t.body["scroll" + e], s["scroll" + e], t.body["offset" + e], s["offset" + e], s["client" + e])) : void 0 === i ? n.css(t, r, u) : n.style(t, r, i, u)
                    }, t, o ? i : void 0, o, null)
                }
            })
        }), n.fn.size = function() {
            return this.length
        }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return n
        });
        var Lc = a.jQuery,
            Mc = a.$;
        return n.noConflict = function(e) {
            return a.$ === n && (a.$ = Mc), e && a.jQuery === n && (a.jQuery = Lc), n
        }, typeof b === U && (a.jQuery = a.$ = n), n
    }),
    function() {
        var e = this,
            t = e._,
            n = {},
            r = Array.prototype,
            i = Object.prototype,
            s = Function.prototype,
            o = r.push,
            u = r.slice,
            a = r.concat,
            f = i.toString,
            l = i.hasOwnProperty,
            c = r.forEach,
            h = r.map,
            p = r.reduce,
            d = r.reduceRight,
            v = r.filter,
            m = r.every,
            g = r.some,
            y = r.indexOf,
            b = r.lastIndexOf,
            w = Array.isArray,
            E = Object.keys,
            S = s.bind,
            x = function(e) {
                return e instanceof x ? e : this instanceof x ? (this._wrapped = e, void 0) : new x(e)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.5.2";
        var T = x.each = x.forEach = function(e, t, r) {
            if (null != e)
                if (c && e.forEach === c) e.forEach(t, r);
                else if (e.length === +e.length) {
                for (var i = 0, s = e.length; s > i; i++)
                    if (t.call(r, e[i], i, e) === n) return
            } else
                for (var o = x.keys(e), i = 0, s = o.length; s > i; i++)
                    if (t.call(r, e[o[i]], o[i], e) === n) return
        };
        x.map = x.collect = function(e, t, n) {
            var r = [];
            return null == e ? r : h && e.map === h ? e.map(t, n) : (T(e, function(e, i, s) {
                r.push(t.call(n, e, i, s))
            }), r)
        };
        var N = "Reduce of empty array with no initial value";
        x.reduce = x.foldl = x.inject = function(e, t, n, r) {
            var i = arguments.length > 2;
            if (null == e && (e = []), p && e.reduce === p) return r && (t = x.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
            if (T(e, function(e, s, o) {
                    i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
                }), !i) throw new TypeError(N);
            return n
        }, x.reduceRight = x.foldr = function(e, t, n, r) {
            var i = arguments.length > 2;
            if (null == e && (e = []), d && e.reduceRight === d) return r && (t = x.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
            var s = e.length;
            if (s !== +s) {
                var o = x.keys(e);
                s = o.length
            }
            if (T(e, function(u, a, f) {
                    a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
                }), !i) throw new TypeError(N);
            return n
        }, x.find = x.detect = function(e, t, n) {
            var r;
            return C(e, function(e, i, s) {
                return t.call(n, e, i, s) ? (r = e, !0) : void 0
            }), r
        }, x.filter = x.select = function(e, t, n) {
            var r = [];
            return null == e ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function(e, i, s) {
                t.call(n, e, i, s) && r.push(e)
            }), r)
        }, x.reject = function(e, t, n) {
            return x.filter(e, function(e, r, i) {
                return !t.call(n, e, r, i)
            }, n)
        }, x.every = x.all = function(e, t, r) {
            t || (t = x.identity);
            var i = !0;
            return null == e ? i : m && e.every === m ? e.every(t, r) : (T(e, function(e, s, o) {
                return (i = i && t.call(r, e, s, o)) ? void 0 : n
            }), !!i)
        };
        var C = x.some = x.any = function(e, t, r) {
            t || (t = x.identity);
            var i = !1;
            return null == e ? i : g && e.some === g ? e.some(t, r) : (T(e, function(e, s, o) {
                return i || (i = t.call(r, e, s, o)) ? n : void 0
            }), !!i)
        };
        x.contains = x.include = function(e, t) {
            return null == e ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function(e) {
                return e === t
            })
        }, x.invoke = function(e, t) {
            var n = u.call(arguments, 2),
                r = x.isFunction(t);
            return x.map(e, function(e) {
                return (r ? t : e[t]).apply(e, n)
            })
        }, x.pluck = function(e, t) {
            return x.map(e, function(e) {
                return e[t]
            })
        }, x.where = function(e, t, n) {
            return x.isEmpty(t) ? n ? void 0 : [] : x[n ? "find" : "filter"](e, function(e) {
                for (var n in t)
                    if (t[n] !== e[n]) return !1;
                return !0
            })
        }, x.findWhere = function(e, t) {
            return x.where(e, t, !0)
        }, x.max = function(e, t, n) {
            if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
            if (!t && x.isEmpty(e)) return -1 / 0;
            var r = {
                computed: -1 / 0,
                value: -1 / 0
            };
            return T(e, function(e, i, s) {
                var o = t ? t.call(n, e, i, s) : e;
                o > r.computed && (r = {
                    value: e,
                    computed: o
                })
            }), r.value
        }, x.min = function(e, t, n) {
            if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
            if (!t && x.isEmpty(e)) return 1 / 0;
            var r = {
                computed: 1 / 0,
                value: 1 / 0
            };
            return T(e, function(e, i, s) {
                var o = t ? t.call(n, e, i, s) : e;
                o < r.computed && (r = {
                    value: e,
                    computed: o
                })
            }), r.value
        }, x.shuffle = function(e) {
            var t, n = 0,
                r = [];
            return T(e, function(e) {
                t = x.random(n++), r[n - 1] = r[t], r[t] = e
            }), r
        }, x.sample = function(e, t, n) {
            return arguments.length < 2 || n ? e[x.random(e.length - 1)] : x.shuffle(e).slice(0, Math.max(0, t))
        };
        var k = function(e) {
            return x.isFunction(e) ? e : function(t) {
                return t[e]
            }
        };
        x.sortBy = function(e, t, n) {
            var r = k(t);
            return x.pluck(x.map(e, function(e, t, i) {
                return {
                    value: e,
                    index: t,
                    criteria: r.call(n, e, t, i)
                }
            }).sort(function(e, t) {
                var n = e.criteria,
                    r = t.criteria;
                if (n !== r) {
                    if (n > r || n === void 0) return 1;
                    if (r > n || r === void 0) return -1
                }
                return e.index - t.index
            }), "value")
        };
        var L = function(e) {
            return function(t, n, r) {
                var i = {},
                    s = null == n ? x.identity : k(n);
                return T(t, function(n, o) {
                    var u = s.call(r, n, o, t);
                    e(i, u, n)
                }), i
            }
        };
        x.groupBy = L(function(e, t, n) {
            (x.has(e, t) ? e[t] : e[t] = []).push(n)
        }), x.indexBy = L(function(e, t, n) {
            e[t] = n
        }), x.countBy = L(function(e, t) {
            x.has(e, t) ? e[t]++ : e[t] = 1
        }), x.sortedIndex = function(e, t, n, r) {
            n = null == n ? x.identity : k(n);
            for (var i = n.call(r, t), s = 0, o = e.length; o > s;) {
                var u = s + o >>> 1;
                n.call(r, e[u]) < i ? s = u + 1 : o = u
            }
            return s
        }, x.toArray = function(e) {
            return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
        }, x.size = function(e) {
            return null == e ? 0 : e.length === +e.length ? e.length : x.keys(e).length
        }, x.first = x.head = x.take = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[0] : u.call(e, 0, t)
        }, x.initial = function(e, t, n) {
            return u.call(e, 0, e.length - (null == t || n ? 1 : t))
        }, x.last = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[e.length - 1] : u.call(e, Math.max(e.length - t, 0))
        }, x.rest = x.tail = x.drop = function(e, t, n) {
            return u.call(e, null == t || n ? 1 : t)
        }, x.compact = function(e) {
            return x.filter(e, x.identity)
        };
        var A = function(e, t, n) {
            return t && x.every(e, x.isArray) ? a.apply(n, e) : (T(e, function(e) {
                x.isArray(e) || x.isArguments(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
            }), n)
        };
        x.flatten = function(e, t) {
            return A(e, t, [])
        }, x.without = function(e) {
            return x.difference(e, u.call(arguments, 1))
        }, x.uniq = x.unique = function(e, t, n, r) {
            x.isFunction(t) && (r = n, n = t, t = !1);
            var i = n ? x.map(e, n, r) : e,
                s = [],
                o = [];
            return T(i, function(n, r) {
                (t ? r && o[o.length - 1] === n : x.contains(o, n)) || (o.push(n), s.push(e[r]))
            }), s
        }, x.union = function() {
            return x.uniq(x.flatten(arguments, !0))
        }, x.intersection = function(e) {
            var t = u.call(arguments, 1);
            return x.filter(x.uniq(e), function(e) {
                return x.every(t, function(t) {
                    return x.indexOf(t, e) >= 0
                })
            })
        }, x.difference = function(e) {
            var t = a.apply(r, u.call(arguments, 1));
            return x.filter(e, function(e) {
                return !x.contains(t, e)
            })
        }, x.zip = function() {
            for (var e = x.max(x.pluck(arguments, "length").concat(0)), t = new Array(e), n = 0; e > n; n++) t[n] = x.pluck(arguments, "" + n);
            return t
        }, x.object = function(e, t) {
            if (null == e) return {};
            for (var n = {}, r = 0, i = e.length; i > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
            return n
        }, x.indexOf = function(e, t, n) {
            if (null == e) return -1;
            var r = 0,
                i = e.length;
            if (n) {
                if ("number" != typeof n) return r = x.sortedIndex(e, t), e[r] === t ? r : -1;
                r = 0 > n ? Math.max(0, i + n) : n
            }
            if (y && e.indexOf === y) return e.indexOf(t, n);
            for (; i > r; r++)
                if (e[r] === t) return r;
            return -1
        }, x.lastIndexOf = function(e, t, n) {
            if (null == e) return -1;
            var r = null != n;
            if (b && e.lastIndexOf === b) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
            for (var i = r ? n : e.length; i--;)
                if (e[i] === t) return i;
            return -1
        }, x.range = function(e, t, n) {
            arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
            for (var r = Math.max(Math.ceil((t - e) / n), 0), i = 0, s = new Array(r); r > i;) s[i++] = e, e += n;
            return s
        };
        var O = function() {};
        x.bind = function(e, t) {
            var n, r;
            if (S && e.bind === S) return S.apply(e, u.call(arguments, 1));
            if (!x.isFunction(e)) throw new TypeError;
            return n = u.call(arguments, 2), r = function() {
                if (this instanceof r) {
                    O.prototype = e.prototype;
                    var i = new O;
                    O.prototype = null;
                    var s = e.apply(i, n.concat(u.call(arguments)));
                    return Object(s) === s ? s : i
                }
                return e.apply(t, n.concat(u.call(arguments)))
            }
        }, x.partial = function(e) {
            var t = u.call(arguments, 1);
            return function() {
                return e.apply(this, t.concat(u.call(arguments)))
            }
        }, x.bindAll = function(e) {
            var t = u.call(arguments, 1);
            if (0 === t.length) throw new Error("bindAll must be passed function names");
            return T(t, function(t) {
                e[t] = x.bind(e[t], e)
            }), e
        }, x.memoize = function(e, t) {
            var n = {};
            return t || (t = x.identity),
                function() {
                    var r = t.apply(this, arguments);
                    return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
                }
        }, x.delay = function(e, t) {
            var n = u.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, n)
            }, t)
        }, x.defer = function(e) {
            return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
        }, x.throttle = function(e, t, n) {
            var r, i, s, o = null,
                u = 0;
            n || (n = {});
            var a = function() {
                u = n.leading === !1 ? 0 : new Date, o = null, s = e.apply(r, i)
            };
            return function() {
                var f = new Date;
                u || n.leading !== !1 || (u = f);
                var l = t - (f - u);
                return r = this, i = arguments, 0 >= l ? (clearTimeout(o), o = null, u = f, s = e.apply(r, i)) : o || n.trailing === !1 || (o = setTimeout(a, l)), s
            }
        }, x.debounce = function(e, t, n) {
            var r, i, s, o, u;
            return function() {
                s = this, i = arguments, o = new Date;
                var a = function() {
                        var f = new Date - o;
                        t > f ? r = setTimeout(a, t - f) : (r = null, n || (u = e.apply(s, i)))
                    },
                    f = n && !r;
                return r || (r = setTimeout(a, t)), f && (u = e.apply(s, i)), u
            }
        }, x.once = function(e) {
            var t, n = !1;
            return function() {
                return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
            }
        }, x.wrap = function(e, t) {
            return function() {
                var n = [e];
                return o.apply(n, arguments), t.apply(this, n)
            }
        }, x.compose = function() {
            var e = arguments;
            return function() {
                for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
                return t[0]
            }
        }, x.after = function(e, t) {
            return function() {
                return --e < 1 ? t.apply(this, arguments) : void 0
            }
        }, x.keys = E || function(e) {
            if (e !== Object(e)) throw new TypeError("Invalid object");
            var t = [];
            for (var n in e) x.has(e, n) && t.push(n);
            return t
        }, x.values = function(e) {
            for (var t = x.keys(e), n = t.length, r = new Array(n), i = 0; n > i; i++) r[i] = e[t[i]];
            return r
        }, x.pairs = function(e) {
            for (var t = x.keys(e), n = t.length, r = new Array(n), i = 0; n > i; i++) r[i] = [t[i], e[t[i]]];
            return r
        }, x.invert = function(e) {
            for (var t = {}, n = x.keys(e), r = 0, i = n.length; i > r; r++) t[e[n[r]]] = n[r];
            return t
        }, x.functions = x.methods = function(e) {
            var t = [];
            for (var n in e) x.isFunction(e[n]) && t.push(n);
            return t.sort()
        }, x.extend = function(e) {
            return T(u.call(arguments, 1), function(t) {
                if (t)
                    for (var n in t) e[n] = t[n]
            }), e
        }, x.pick = function(e) {
            var t = {},
                n = a.apply(r, u.call(arguments, 1));
            return T(n, function(n) {
                n in e && (t[n] = e[n])
            }), t
        }, x.omit = function(e) {
            var t = {},
                n = a.apply(r, u.call(arguments, 1));
            for (var i in e) x.contains(n, i) || (t[i] = e[i]);
            return t
        }, x.defaults = function(e) {
            return T(u.call(arguments, 1), function(t) {
                if (t)
                    for (var n in t) e[n] === void 0 && (e[n] = t[n])
            }), e
        }, x.clone = function(e) {
            return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
        }, x.tap = function(e, t) {
            return t(e), e
        };
        var M = function(e, t, n, r) {
            if (e === t) return 0 !== e || 1 / e == 1 / t;
            if (null == e || null == t) return e === t;
            e instanceof x && (e = e._wrapped), t instanceof x && (t = t._wrapped);
            var i = f.call(e);
            if (i != f.call(t)) return !1;
            switch (i) {
                case "[object String]":
                    return e == String(t);
                case "[object Number]":
                    return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +e == +t;
                case "[object RegExp]":
                    return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
            }
            if ("object" != typeof e || "object" != typeof t) return !1;
            for (var s = n.length; s--;)
                if (n[s] == e) return r[s] == t;
            var o = e.constructor,
                u = t.constructor;
            if (o !== u && !(x.isFunction(o) && o instanceof o && x.isFunction(u) && u instanceof u)) return !1;
            n.push(e), r.push(t);
            var a = 0,
                l = !0;
            if ("[object Array]" == i) {
                if (a = e.length, l = a == t.length)
                    for (; a-- && (l = M(e[a], t[a], n, r)););
            } else {
                for (var c in e)
                    if (x.has(e, c) && (a++, !(l = x.has(t, c) && M(e[c], t[c], n, r)))) break;
                if (l) {
                    for (c in t)
                        if (x.has(t, c) && !(a--)) break;
                    l = !a
                }
            }
            return n.pop(), r.pop(), l
        };
        x.isEqual = function(e, t) {
            return M(e, t, [], [])
        }, x.isEmpty = function(e) {
            if (null == e) return !0;
            if (x.isArray(e) || x.isString(e)) return 0 === e.length;
            for (var t in e)
                if (x.has(e, t)) return !1;
            return !0
        }, x.isElement = function(e) {
            return !!e && 1 === e.nodeType
        }, x.isArray = w || function(e) {
            return "[object Array]" == f.call(e)
        }, x.isObject = function(e) {
            return e === Object(e)
        }, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
            x["is" + e] = function(t) {
                return f.call(t) == "[object " + e + "]"
            }
        }), x.isArguments(arguments) || (x.isArguments = function(e) {
            return !!e && !!x.has(e, "callee")
        }), "function" != typeof /./ && (x.isFunction = function(e) {
            return "function" == typeof e
        }), x.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }, x.isNaN = function(e) {
            return x.isNumber(e) && e != +e
        }, x.isBoolean = function(e) {
            return e === !0 || e === !1 || "[object Boolean]" == f.call(e)
        }, x.isNull = function(e) {
            return null === e
        }, x.isUndefined = function(e) {
            return e === void 0
        }, x.has = function(e, t) {
            return l.call(e, t)
        }, x.noConflict = function() {
            return e._ = t, this
        }, x.identity = function(e) {
            return e
        }, x.times = function(e, t, n) {
            for (var r = Array(Math.max(0, e)), i = 0; e > i; i++) r[i] = t.call(n, i);
            return r
        }, x.random = function(e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
        };
        var _ = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;"
            }
        };
        _.unescape = x.invert(_.escape);
        var D = {
            escape: new RegExp("[" + x.keys(_.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + x.keys(_.unescape).join("|") + ")", "g")
        };
        x.each(["escape", "unescape"], function(e) {
            x[e] = function(t) {
                return null == t ? "" : ("" + t).replace(D[e], function(t) {
                    return _[e][t]
                })
            }
        }), x.result = function(e, t) {
            if (null == e) return void 0;
            var n = e[t];
            return x.isFunction(n) ? n.call(e) : n
        }, x.mixin = function(e) {
            T(x.functions(e), function(t) {
                var n = x[t] = e[t];
                x.prototype[t] = function() {
                    var e = [this._wrapped];
                    return o.apply(e, arguments), F.call(this, n.apply(x, e))
                }
            })
        };
        var P = 0;
        x.uniqueId = function(e) {
            var t = ++P + "";
            return e ? e + t : t
        }, x.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var H = /(.)^/,
            B = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        x.template = function(e, t, n) {
            var r;
            n = x.defaults({}, n, x.templateSettings);
            var i = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$", "g"),
                s = 0,
                o = "__p+='";
            e.replace(i, function(t, n, r, i, u) {
                return o += e.slice(s, u).replace(j, function(e) {
                    return "\\" + B[e]
                }), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = u + t.length, t
            }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
            try {
                r = new Function(n.variable || "obj", "_", o)
            } catch (u) {
                throw u.source = o, u
            }
            if (t) return r(t, x);
            var a = function(e) {
                return r.call(this, e, x)
            };
            return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", a
        }, x.chain = function(e) {
            return x(e).chain()
        };
        var F = function(e) {
            return this._chain ? x(e).chain() : e
        };
        x.mixin(x), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = r[e];
            x.prototype[e] = function() {
                var n = this._wrapped;
                return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], F.call(this, n)
            }
        }), T(["concat", "join", "slice"], function(e) {
            var t = r[e];
            x.prototype[e] = function() {
                return F.call(this, t.apply(this._wrapped, arguments))
            }
        }), x.extend(x.prototype, {
            chain: function() {
                return this._chain = !0, this
            },
            value: function() {
                return this._wrapped
            }
        })
    }.call(this), define("underscore", function(e) {
        return function() {
            var t, n;
            return t || e._
        }
    }(this)),
    function(e, t, n) {
        function o(e) {
            return function() {
                return this[e]
            }
        }

        function a(e, t) {
            var n = e.split("."),
                r = u;
            !(n[0] in r) && r.execScript && r.execScript("var " + n[0]);
            for (var i; n.length && (i = n.shift());) !n.length && void 0 !== t ? r[i] = t : r = r[i] ? r[i] : r[i] = {}
        }

        function f(e, t, n) {
            return e.call.apply(e.bind, arguments)
        }

        function l(e, t, n) {
            if (!e) throw Error();
            if (2 < arguments.length) {
                var r = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var n = Array.prototype.slice.call(arguments);
                    return Array.prototype.unshift.apply(n, r), e.apply(t, n)
                }
            }
            return function() {
                return e.apply(t, arguments)
            }
        }

        function c(e, t, n) {
            return c = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? f : l, c.apply(i, arguments)
        }

        function p(e, t) {
            this.G = e, this.v = t || e, this.z = this.v.document
        }

        function d(e, n, r) {
            e = e.z.getElementsByTagName(n)[0], e || (e = t.documentElement), e && e.lastChild && e.insertBefore(r, e.lastChild)
        }

        function v(e, t, n) {
            t = t || [], n = n || [];
            for (var i = e.className.split(/\s+/), o = 0; o < t.length; o += 1) {
                for (var u = s, a = 0; a < i.length; a += 1)
                    if (t[o] === i[a]) {
                        u = r;
                        break
                    }
                u || i.push(t[o])
            }
            t = [];
            for (o = 0; o < i.length; o += 1) {
                u = s;
                for (a = 0; a < n.length; a += 1)
                    if (i[o] === n[a]) {
                        u = r;
                        break
                    }
                u || t.push(i[o])
            }
            e.className = t.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
        }

        function m(e, t) {
            for (var n = e.className.split(/\s+/), i = 0, o = n.length; i < o; i++)
                if (n[i] == t) return r;
            return s
        }

        function g(e) {
            var t = e.v.location.protocol;
            return "about:" == t && (t = e.G.location.protocol), "https:" == t ? "https:" : "http:"
        }

        function y(e, t) {
            var n = e.createElement("link", {
                    rel: "stylesheet",
                    href: t
                }),
                i = s;
            n.onload = function() {
                i || (i = r)
            }, n.onerror = function() {
                i || (i = r)
            }, d(e, "head", n)
        }

        function b(t, n, o, u) {
            var a = t.z.getElementsByTagName("head")[0];
            if (a) {
                var f = t.createElement("script", {
                        src: n
                    }),
                    l = s;
                return f.onload = f.onreadystatechange = function() {
                    !l && (!this.readyState || "loaded" == this.readyState || "complete" == this.readyState) && (l = r, o && o(i), f.onload = f.onreadystatechange = i, "HEAD" == f.parentNode.tagName && a.removeChild(f))
                }, a.appendChild(f), e.setTimeout(function() {
                    l || (l = r, o && o(Error("Script load timeout")))
                }, u || 5e3), f
            }
            return i
        }

        function w(e, t, n) {
            this.M = e, this.U = t, this.Aa = n
        }

        function E(e, t, n, r) {
            this.d = e != i ? e : i, this.o = t != i ? t : i, this.aa = n != i ? n : i, this.f = r != i ? r : i
        }

        function x(e) {
            e = S.exec(e);
            var t = i,
                n = i,
                r = i,
                s = i;
            return e && (e[1] !== i && e[1] && (t = parseInt(e[1], 10)), e[2] !== i && e[2] && (n = parseInt(e[2], 10)), e[3] !== i && e[3] && (r = parseInt(e[3], 10)), e[4] !== i && e[4] && (s = /^[0-9]+$/.test(e[4]) ? parseInt(e[4], 10) : e[4])), new E(t, n, r, s)
        }

        function T(e, t, n, r, i, s, o, u, a, f, l) {
            this.K = e, this.Ga = t, this.za = n, this.fa = r, this.Ea = i, this.ea = s, this.wa = o, this.Fa = u, this.va = a, this.da = f, this.j = l
        }

        function N(e, t) {
            this.a = e, this.I = t
        }

        function k(e) {
            var t = O(e.a, /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/, 1);
            return "" != t ? (/BB\d{2}/.test(t) && (t = "BlackBerry"), t) : (e = O(e.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/, 1), "" != e ? ("Mac_PowerPC" == e && (e = "Macintosh"), e) : "Unknown")
        }

        function L(e) {
            var t = O(e.a, /(OS X|Windows NT|Android) ([^;)]+)/, 2);
            if (t || (t = O(e.a, /Windows Phone( OS)? ([^;)]+)/, 2)) || (t = O(e.a, /(iPhone )?OS ([\d_]+)/, 2))) return t;
            if (t = O(e.a, /(?:Linux|CrOS) ([^;)]+)/, 1))
                for (var t = t.split(/\s/), n = 0; n < t.length; n += 1)
                    if (/^[\d\._]+$/.test(t[n])) return t[n];
            return (e = O(e.a, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2)) ? e : "Unknown"
        }

        function A(e) {
            var t = k(e),
                n = L(e),
                r = x(n),
                i = O(e.a, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1),
                o = x(i),
                u = "Unknown",
                a = new E,
                f = "Unknown",
                l = s;
            return /OPR\/[\d.]+/.test(e.a) ? u = "Opera" : -1 != e.a.indexOf("Chrome") || -1 != e.a.indexOf("CrMo") || -1 != e.a.indexOf("CriOS") ? u = "Chrome" : /Silk\/\d/.test(e.a) ? u = "Silk" : "BlackBerry" == t || "Android" == t ? u = "BuiltinBrowser" : -1 != e.a.indexOf("PhantomJS") ? u = "PhantomJS" : -1 != e.a.indexOf("Safari") ? u = "Safari" : -1 != e.a.indexOf("AdobeAIR") && (u = "AdobeAIR"), "BuiltinBrowser" == u ? f = "Unknown" : "Silk" == u ? f = O(e.a, /Silk\/([\d\._]+)/, 1) : "Chrome" == u ? f = O(e.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : -1 != e.a.indexOf("Version/") ? f = O(e.a, /Version\/([\d\.\w]+)/, 1) : "AdobeAIR" == u ? f = O(e.a, /AdobeAIR\/([\d\.]+)/, 1) : "Opera" == u ? f = O(e.a, /OPR\/([\d.]+)/, 1) : "PhantomJS" == u && (f = O(e.a, /PhantomJS\/([\d.]+)/, 1)), a = x(f), l = "AdobeAIR" == u ? 2 < a.d || 2 == a.d && 5 <= a.o : "BlackBerry" == t ? 10 <= r.d : "Android" == t ? 2 < r.d || 2 == r.d && 1 < r.o : 526 <= o.d || 525 <= o.d && 13 <= o.o, new T(u, a, f, "AppleWebKit", o, i, t, r, n, M(e.I), new w(l, 536 > o.d || 536 == o.d && 11 > o.o, "iPhone" == t || "iPad" == t || "iPod" == t || "Macintosh" == t))
        }

        function O(e, t, n) {
            return (e = e.match(t)) && e[n] ? e[n] : ""
        }

        function M(e) {
            if (e.documentMode) return e.documentMode
        }

        function _(e) {
            this.ua = e || "-"
        }

        function D(e, t) {
            this.K = e, this.V = 4, this.L = "n";
            var n = (t || "n4").match(/^([nio])([1-9])$/i);
            n && (this.L = n[1], this.V = parseInt(n[2], 10))
        }

        function P(e) {
            return e.L + e.V
        }

        function H(e) {
            var t = 4,
                n = "n",
                r = i;
            return e && ((r = e.match(/(normal|oblique|italic)/i)) && r[1] && (n = r[1].substr(0, 1).toLowerCase()), (r = e.match(/([1-9]00|normal|bold)/i)) && r[1] && (/bold/i.test(r[1]) ? t = 7 : /[1-9]00/.test(r[1]) && (t = parseInt(r[1].substr(0, 1), 10)))), n + t
        }

        function B(e, t, n) {
            this.c = e, this.m = t, this.O = n, this.h = "wf", this.g = new _("-")
        }

        function j(e) {
            var t = m(e.m, e.g.f(e.h, "active")),
                n = [],
                r = [e.g.f(e.h, "loading")];
            t || n.push(e.g.f(e.h, "inactive")), v(e.m, n, r), F(e, "inactive")
        }

        function F(e, t, n) {
            e.O[t] && (n ? e.O[t](n.getName(), P(n)) : e.O[t]())
        }

        function I() {
            this.w = {}
        }

        function q(e, t) {
            this.c = e, this.C = t, this.s = this.c.createElement("span", {
                "aria-hidden": "true"
            }, this.C)
        }

        function R(e, t) {
            var n;
            n = [];
            for (var r = t.K.split(/,\s*/), i = 0; i < r.length; i++) {
                var s = r[i].replace(/['"]/g, ""); - 1 == s.indexOf(" ") ? n.push(s) : n.push("'" + s + "'")
            }
            n = n.join(","), r = "normal", i = t.V + "00", "o" === t.L ? r = "oblique" : "i" === t.L && (r = "italic"), e.s.style.cssText = "display:block;position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + n + ";" + ("font-style:" + r + ";font-weight:" + i + ";")
        }

        function U(e) {
            d(e.c, "body", e.s)
        }

        function z(e, t, n, r, s, o, u, a) {
            this.W = e, this.sa = t, this.c = n, this.q = r, this.C = a || "BESbswy", this.j = s, this.F = {}, this.T = o || 5e3, this.Z = u || i, this.B = this.A = i, e = new q(this.c, this.C), U(e);
            for (var f in W) W.hasOwnProperty(f) && (R(e, new D(W[f], P(this.q))), this.F[W[f]] = e.s.offsetWidth);
            e.remove()
        }

        function X(e, t, n) {
            for (var i in W)
                if (W.hasOwnProperty(i) && t === e.F[W[i]] && n === e.F[W[i]]) return r;
            return s
        }

        function V(e) {
            var t = e.A.s.offsetWidth,
                n = e.B.s.offsetWidth;
            t === e.F.serif && n === e.F["sans-serif"] || e.j.U && X(e, t, n) ? h() - e.xa >= e.T ? e.j.U && X(e, t, n) && (e.Z === i || e.Z.hasOwnProperty(e.q.getName())) ? $(e, e.W) : $(e, e.sa) : setTimeout(c(function() {
                V(this)
            }, e), 25) : $(e, e.W)
        }

        function $(e, t) {
            e.A.remove(), e.B.remove(), t(e.q)
        }

        function J(e, t, n, r) {
            this.c = t, this.t = n, this.P = 0, this.ba = this.Y = s, this.T = r, this.j = e.j
        }

        function K(e, t, n, r, i) {
            if (0 === t.length && i) j(e.t);
            else {
                e.P += t.length, i && (e.Y = i);
                for (i = 0; i < t.length; i++) {
                    var s = t[i],
                        o = n[s.getName()],
                        u = e.t,
                        a = s;
                    v(u.m, [u.g.f(u.h, a.getName(), P(a).toString(), "loading")]), F(u, "fontloading", a), (new z(c(e.ga, e), c(e.ha, e), e.c, s, e.j, e.T, r, o)).start()
                }
            }
        }

        function Q(e) {
            0 == --e.P && e.Y && (e.ba ? (e = e.t, v(e.m, [e.g.f(e.h, "active")], [e.g.f(e.h, "loading"), e.g.f(e.h, "inactive")]), F(e, "active")) : j(e.t))
        }

        function G(e) {
            this.G = e, this.u = new I, this.ya = new N(e.navigator.userAgent, e.document), this.a = this.ya.parse(), this.Q = this.R = 0
        }

        function Y(e, t) {
            this.c = e, this.e = t, this.k = []
        }

        function Z(e, t) {
            this.c = e, this.e = t, this.k = []
        }

        function et(e, t) {
            this.c = e, this.e = t
        }

        function tt(e, t, n) {
            this.N = e ? e : t + nt, this.p = [], this.S = [], this.ca = n || ""
        }

        function rt(e) {
            this.p = e, this.$ = [], this.J = {}
        }

        function at(e, n) {
            this.a = (new N(navigator.userAgent, t)).parse(), this.c = e, this.e = n
        }

        function lt(e, t) {
            this.c = e, this.e = t, this.k = []
        }
        var r = !0,
            i = null,
            s = !1,
            u = this,
            h = Date.now || function() {
                return +(new Date)
            };
        p.prototype.createElement = function(e, t, n) {
            e = this.z.createElement(e);
            if (t)
                for (var r in t) t.hasOwnProperty(r) && ("style" == r ? e.style.cssText = t[r] : e.setAttribute(r, t[r]));
            return n && e.appendChild(this.z.createTextNode(n)), e
        }, a("webfont.BrowserInfo", w), w.prototype.pa = o("M"), w.prototype.hasWebFontSupport = w.prototype.pa, w.prototype.qa = o("U"), w.prototype.hasWebKitFallbackBug = w.prototype.qa, w.prototype.ra = o("Aa"), w.prototype.hasWebKitMetricsBug = w.prototype.ra;
        var S = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
        E.prototype.toString = function() {
            return [this.d, this.o || "", this.aa || "", this.f || ""].join("")
        }, a("webfont.UserAgent", T), T.prototype.getName = o("K"), T.prototype.getName = T.prototype.getName, T.prototype.oa = o("za"), T.prototype.getVersion = T.prototype.oa, T.prototype.ka = o("fa"), T.prototype.getEngine = T.prototype.ka, T.prototype.la = o("ea"), T.prototype.getEngineVersion = T.prototype.la, T.prototype.ma = o("wa"), T.prototype.getPlatform = T.prototype.ma, T.prototype.na = o("va"), T.prototype.getPlatformVersion = T.prototype.na, T.prototype.ja = o("da"), T.prototype.getDocumentMode = T.prototype.ja, T.prototype.ia = o("j"), T.prototype.getBrowserInfo = T.prototype.ia;
        var C = new T("Unknown", new E, "Unknown", "Unknown", new E, "Unknown", "Unknown", new E, "Unknown", void 0, new w(s, s, s));
        N.prototype.parse = function() {
            var e;
            if (-1 != this.a.indexOf("MSIE") || -1 != this.a.indexOf("Trident/")) {
                e = k(this);
                var t = L(this),
                    n = x(t),
                    r = i,
                    o = i,
                    u = i,
                    a = i,
                    f = O(this.a, /Trident\/([\d\w\.]+)/, 1),
                    l = M(this.I),
                    r = -1 != this.a.indexOf("MSIE") ? O(this.a, /MSIE ([\d\w\.]+)/, 1) : O(this.a, /rv:([\d\w\.]+)/, 1),
                    o = x(r);
                "" != f ? (u = "Trident", a = x(f)) : (u = "Unknown", a = new E, f = "Unknown"), e = new T("MSIE", o, r, u, a, f, e, n, t, l, new w("Windows" == e && 6 <= o.d || "Windows Phone" == e && 8 <= n.d, s, s))
            } else if (-1 != this.a.indexOf("Opera")) e: if (e = "Unknown", t = O(this.a, /Presto\/([\d\w\.]+)/, 1), n = x(t), r = L(this), o = x(r), u = M(this.I), n.d !== i ? e = "Presto" : (-1 != this.a.indexOf("Gecko") && (e = "Gecko"), t = O(this.a, /rv:([^\)]+)/, 1), n = x(t)), -1 != this.a.indexOf("Opera Mini/")) a = O(this.a, /Opera Mini\/([\d\.]+)/, 1), f = x(a), e = new T("OperaMini", f, a, e, n, t, k(this), o, r, u, new w(s, s, s));
                else {
                    if (-1 != this.a.indexOf("Version/") && (a = O(this.a, /Version\/([\d\.]+)/, 1), f = x(a), f.d !== i)) {
                        e = new T("Opera", f, a, e, n, t, k(this), o, r, u, new w(10 <= f.d, s, s));
                        break e
                    }
                    a = O(this.a, /Opera[\/ ]([\d\.]+)/, 1), f = x(a), e = f.d !== i ? new T("Opera", f, a, e, n, t, k(this), o, r, u, new w(10 <= f.d, s, s)) : new T("Opera", new E, "Unknown", e, n, t, k(this), o, r, u, new w(s, s, s))
                }
            else /OPR\/[\d.]+/.test(this.a) ? e = A(this) : /AppleWeb(K|k)it/.test(this.a) ? e = A(this) : -1 != this.a.indexOf("Gecko") ? (e = "Unknown", t = new E, n = "Unknown", r = L(this), o = x(r), u = s, -1 != this.a.indexOf("Firefox") ? (e = "Firefox", n = O(this.a, /Firefox\/([\d\w\.]+)/, 1), t = x(n), u = 3 <= t.d && 5 <= t.o) : -1 != this.a.indexOf("Mozilla") && (e = "Mozilla"), a = O(this.a, /rv:([^\)]+)/, 1), f = x(a), u || (u = 1 < f.d || 1 == f.d && 9 < f.o || 1 == f.d && 9 == f.o && 2 <= f.aa || a.match(/1\.9\.1b[123]/) != i || a.match(/1\.9\.1\.[\d\.]+/) != i), e = new T(e, t, n, "Gecko", f, a, k(this), o, r, M(this.I), new w(u, s, s))) : e = C;
            return e
        }, _.prototype.f = function(e) {
            for (var t = [], n = 0; n < arguments.length; n++) t.push(arguments[n].replace(/[\W_]+/g, "").toLowerCase());
            return t.join(this.ua)
        }, D.prototype.getName = o("K"), q.prototype.remove = function() {
            var e = this.s;
            e.parentNode && e.parentNode.removeChild(e)
        };
        var W = {
            Da: "serif",
            Ca: "sans-serif",
            Ba: "monospace"
        };
        z.prototype.start = function() {
            this.A = new q(this.c, this.C), U(this.A), this.B = new q(this.c, this.C), U(this.B), this.xa = h(), R(this.A, new D(this.q.getName() + ",serif", P(this.q))), R(this.B, new D(this.q.getName() + ",sans-serif", P(this.q))), V(this)
        }, J.prototype.ga = function(e) {
            var t = this.t;
            v(t.m, [t.g.f(t.h, e.getName(), P(e).toString(), "active")], [t.g.f(t.h, e.getName(), P(e).toString(), "loading"), t.g.f(t.h, e.getName(), P(e).toString(), "inactive")]), F(t, "fontactive", e), this.ba = r, Q(this)
        }, J.prototype.ha = function(e) {
            var t = this.t,
                n = m(t.m, t.g.f(t.h, e.getName(), P(e).toString(), "active")),
                r = [],
                i = [t.g.f(t.h, e.getName(), P(e).toString(), "loading")];
            n || r.push(t.g.f(t.h, e.getName(), P(e).toString(), "inactive")), v(t.m, r, i), F(t, "fontinactive", e), Q(this)
        }, G.prototype.load = function(e) {
            var t = e.context || this.G;
            this.c = new p(this.G, t);
            var t = new B(this.c, t.document.documentElement, e),
                n = [],
                r = e.timeout;
            v(t.m, [t.g.f(t.h, "loading")]), F(t, "loading");
            var n = this.u,
                i = this.c,
                s = [],
                o;
            for (o in e)
                if (e.hasOwnProperty(o)) {
                    var u = n.w[o];
                    u && s.push(u(e[o], i))
                }
            n = s, this.Q = this.R = n.length, e = new J(this.a, this.c, t, r), o = 0;
            for (r = n.length; o < r; o++) i = n[o], i.H(this.a, c(this.ta, this, i, t, e))
        }, G.prototype.ta = function(e, t, n, r) {
            var s = this;
            r ? e.load(function(e, t, r) {
                var o = 0 == --s.R;
                setTimeout(function() {
                    K(n, e, t || {}, r || i, o)
                }, 0)
            }) : (e = 0 == --this.R, this.Q--, e && 0 == this.Q && j(t), K(n, [], {}, i, e))
        }, Y.prototype.D = function(e) {
            return g(this.c) + (this.e.api || "//f.fontdeck.com/s/css/js/") + (this.c.v.location.hostname || this.c.G.location.hostname) + "/" + e + ".js"
        }, Y.prototype.H = function(e, t) {
            var n = this.e.id,
                r = this.c.v,
                i = this;
            n ? (r.__webfontfontdeckmodule__ || (r.__webfontfontdeckmodule__ = {}), r.__webfontfontdeckmodule__[n] = function(e, n) {
                for (var r = 0, s = n.fonts.length; r < s; ++r) {
                    var o = n.fonts[r];
                    i.k.push(new D(o.name, H("font-weight:" + o.weight + ";font-style:" + o.style)))
                }
                t(e)
            }, b(this.c, this.D(n), function(e) {
                e && t(s)
            })) : t(s)
        }, Y.prototype.load = function(e) {
            e(this.k)
        }, Z.prototype.D = function(e) {
            var t = g(this.c);
            return (this.e.api || t + "//use.typekit.net") + "/" + e + ".js"
        }, Z.prototype.H = function(e, t) {
            var n = this.e.id,
                r = this.e,
                i = this.c.v,
                o = this;
            n ? (i.__webfonttypekitmodule__ || (i.__webfonttypekitmodule__ = {}), i.__webfonttypekitmodule__[n] = function(n) {
                n(e, r, function(e, n, r) {
                    for (var i = 0; i < n.length; i += 1) {
                        var s = r[n[i]];
                        if (s)
                            for (var u = 0; u < s.length; u += 1) o.k.push(new D(n[i], s[u]));
                        else o.k.push(new D(n[i]))
                    }
                    t(e)
                })
            }, b(this.c, this.D(n), function(e) {
                e && t(s)
            }, 2e3)) : t(s)
        }, Z.prototype.load = function(e) {
            e(this.k)
        }, et.prototype.load = function(e) {
            var t, n, r = this.e.urls || [],
                i = this.e.families || [],
                s = this.e.testStrings || {};
            t = 0;
            for (n = r.length; t < n; t++) y(this.c, r[t]);
            r = [], t = 0;
            for (n = i.length; t < n; t++) {
                var o = i[t].split(":");
                if (o[1])
                    for (var u = o[1].split(","), a = 0; a < u.length; a += 1) r.push(new D(o[0], u[a]));
                else r.push(new D(o[0]))
            }
            e(r, s)
        }, et.prototype.H = function(e, t) {
            return t(e.j.M)
        };
        var nt = "//fonts.googleapis.com/css";
        tt.prototype.f = function() {
            if (0 == this.p.length) throw Error("No fonts to load!");
            if (-1 != this.N.indexOf("kit=")) return this.N;
            for (var e = this.p.length, t = [], n = 0; n < e; n++) t.push(this.p[n].replace(/ /g, "+"));
            return e = this.N + "?family=" + t.join("%7C"), 0 < this.S.length && (e += "&subset=" + this.S.join(",")), 0 < this.ca.length && (e += "&text=" + encodeURIComponent(this.ca)), e
        };
        var it = {
                latin: "BESbswy",
                cyrillic: "&#1081;&#1103;&#1046;",
                greek: "&#945;&#946;&#931;",
                khmer: "&#x1780;&#x1781;&#x1782;",
                Hanuman: "&#x1780;&#x1781;&#x1782;"
            },
            st = {
                thin: "1",
                extralight: "2",
                "extra-light": "2",
                ultralight: "2",
                "ultra-light": "2",
                light: "3",
                regular: "4",
                book: "4",
                medium: "5",
                "semi-bold": "6",
                semibold: "6",
                "demi-bold": "6",
                demibold: "6",
                bold: "7",
                "extra-bold": "8",
                extrabold: "8",
                "ultra-bold": "8",
                ultrabold: "8",
                black: "9",
                heavy: "9",
                l: "3",
                r: "4",
                b: "7"
            },
            ot = {
                i: "i",
                italic: "i",
                n: "n",
                normal: "n"
            },
            ut = RegExp("^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$");
        rt.prototype.parse = function() {
            for (var e = this.p.length, t = 0; t < e; t++) {
                var n = this.p[t].split(":"),
                    r = n[0].replace(/\+/g, " "),
                    s = ["n4"];
                if (2 <= n.length) {
                    var o, u = n[1];
                    o = [];
                    if (u)
                        for (var u = u.split(","), a = u.length, f = 0; f < a; f++) {
                            var l;
                            l = u[f];
                            if (l.match(/^[\w-]+$/)) {
                                l = ut.exec(l.toLowerCase());
                                var c = void 0;
                                if (l == i) c = "";
                                else {
                                    c = void 0, c = l[1];
                                    if (c == i || "" == c) c = "4";
                                    else var h = st[c],
                                        c = h ? h : isNaN(c) ? "4" : c.substr(0, 1);
                                    c = [l[2] == i || "" == l[2] ? "n" : ot[l[2]], c].join("")
                                }
                                l = c
                            } else l = "";
                            l && o.push(l)
                        }
                    0 < o.length && (s = o), 3 == n.length && (n = n[2], o = [], n = n ? n.split(",") : o, 0 < n.length && (n = it[n[0]]) && (this.J[r] = n))
                }
                this.J[r] || (n = it[r]) && (this.J[r] = n);
                for (n = 0; n < s.length; n += 1) this.$.push(new D(r, s[n]))
            }
        };
        var ft = {
            Arimo: r,
            Cousine: r,
            Tinos: r
        };
        at.prototype.H = function(e, t) {
            t(e.j.M)
        }, at.prototype.load = function(e) {
            var t = this.c;
            if ("MSIE" == this.a.getName() && this.e.blocking != r) {
                var n = c(this.X, this, e),
                    i = function() {
                        t.z.body ? n() : setTimeout(i, 0)
                    };
                i()
            } else this.X(e)
        }, at.prototype.X = function(e) {
            for (var t = this.c, n = new tt(this.e.api, g(t), this.e.text), r = this.e.families, i = r.length, s = 0; s < i; s++) {
                var o = r[s].split(":");
                3 == o.length && n.S.push(o.pop());
                var u = "";
                2 == o.length && "" != o[1] && (u = ":"), n.p.push(o.join(u))
            }
            r = new rt(r), r.parse(), y(t, n.f()), e(r.$, r.J, ft)
        }, lt.prototype.H = function(e, t) {
            var n = this,
                r = n.e.projectId,
                i = n.e.version;
            if (r) {
                var o = n.c.v;
                b(this.c, n.D(r, i), function(i) {
                    if (i) t(s);
                    else {
                        if (o["__mti_fntLst" + r] && (i = o["__mti_fntLst" + r]()))
                            for (var u = 0; u < i.length; u++) n.k.push(new D(i[u].fontfamily));
                        t(e.j.M)
                    }
                }).id = "__MonotypeAPIScript__" + r
            } else t(s)
        }, lt.prototype.D = function(e, t) {
            var n = g(this.c),
                r = (this.e.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
            return n + "//" + r + "/" + e + ".js" + (t ? "?v=" + t : "")
        }, lt.prototype.load = function(e) {
            e(this.k)
        };
        var ct = new G(u);
        ct.u.w.custom = function(e, t) {
            return new et(t, e)
        }, ct.u.w.fontdeck = function(e, t) {
            return new Y(t, e)
        }, ct.u.w.monotype = function(e, t) {
            return new lt(t, e)
        }, ct.u.w.typekit = function(e, t) {
            return new Z(t, e)
        }, ct.u.w.google = function(e, t) {
            return new at(t, e)
        }, u.WebFont || (u.WebFont = {}, u.WebFont.load = c(ct.load, ct), u.WebFontConfig && ct.load(u.WebFontConfig))
    }(this, document), define("webfont", function() {});
var com;
com == null && (com = {}), com.veeva == undefined && (com.veeva = {}), com.veeva.clm = {
        getAddresses_Account: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("account", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getAddresses_Account", t, ret);
                return
            }
            window.com_veeva_clm_accountAddresses = function(e) {
                com.veeva.clm.wrapResult("getAddresses_Account", t, e)
            }, query = 'veeva:queryObject(Address_vod__c),fields(ID),where(WHERE Account_vod__c="' + e + '"),com_veeva_clm_accountAddresses(result)', com.veeva.clm.testMode ? com_veeva_clm_accountAddresses(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getAddressFields: function(e, t, n) {
            ret = this.checkCallbackFunction(n);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("record", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getAddressFields", n, ret);
                return
            }
            if (t == undefined || t == null) t = ["ID"];
            window.com_veeva_clm_addressValues = function(e) {
                com.veeva.clm.wrapResult("getAddressFields", n, e)
            }, query = "veeva:queryObject(Address_vod__c),fields(" + this.joinFieldArray(t) + '),where(WHERE IdNumber="' + e + '"),com_veeva_clm_addressValues(result)', com.veeva.clm.testMode ? com_veeva_clm_addressValues(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getProduct_MySetup: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("type", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getProduct_MySetup", t, ret);
                return
            }
            window.com_veeva_clm_productMysetup = function(e) {
                com.veeva.clm.wrapResult("getProduct_MySetup", t, e)
            }, query = 'veeva:queryObject(Product_vod__c),fields(ID),where(WHERE Product_Type_vod__c="' + e + '"),com_veeva_clm_productMysetup(result)', com.veeva.clm.testMode ? com_veeva_clm_productMysetup(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getRecordType_Object: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("object", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getRecordType_Object", t, ret);
                return
            }
            window.com_veeva_clm_objectRecordTypes = function(e) {
                com.veeva.clm.wrapResult("getRecordType_Object", t, e)
            }, query = 'veeva:queryObject(RecordType),fields(ID),where(WHERE SobjectType="' + e + '" and IsActive == YES),com_veeva_clm_objectRecordTypes(result)', com.veeva.clm.testMode ? com_veeva_clm_objectRecordTypes(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getSurveyQuestions_Survey: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("survey", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getSurveyQuestions_Survey", t, ret);
                return
            }
            window.com_veeva_clm_surveyQuestions = function(e) {
                com.veeva.clm.wrapResult("getSurveyQuestions_Survey", t, e)
            }, query = 'veeva:queryObject(Survey_Question_vod__c),fields(ID),where(WHERE Survey_vod__c="' + e + '"),sort(Order_vod__c,asc),com_veeva_clm_surveyQuestions(result)', com.veeva.clm.testMode ? com_veeva_clm_surveyQuestions(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getQuestionResponse_SurveyTarget: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("surveytarget", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getQuestionResponse_SurveyTarget", t, ret);
                return
            }
            window.com_veeva_clm_targetResponses = function(e) {
                com.veeva.clm.wrapResult("getQuestionResponse_SurveyTarget", t, e)
            }, query = 'veeva:queryObject(Question_Response_vod__c),fields(ID),where(WHERE Survey_Target_vod__c="' + e + '"),sort(Order_vod__c,asc),com_veeva_clm_targetResponses(result)', com.veeva.clm.testMode ? com_veeva_clm_targetResponses(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getSurveyTarget_Account: function(e, t, n) {
            ret = this.checkCallbackFunction(n);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("account", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getSurveyTarget_Account", n, ret);
                return
            }
            window.com_veeva_clm_accountSurveyTargets = function(e) {
                com.veeva.clm.wrapResult("getSurveyTarget_Account", n, e)
            }, query = null, t == null || t == "" ? query = 'veeva:queryObject(Survey_Target_vod__c),fields(ID),where(WHERE Account_vod__c="' + e + '"),com_veeva_clm_accountSurveyTargets(result)' : query = 'veeva:queryObject(Survey_Target_vod__c),fields(ID),where(WHERE Account_vod__c="' + e + '" AND Survey_vod__c="' + t + '"),com_veeva_clm_accountSurveyTargets(result)', com.veeva.clm.testMode ? com_veeva_clm_accountSurveyTargets(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getProduct_OrderActive_Account: function(e, t) {
            var n, r = this.checkCallbackFunction(t);
            if (r.success == 0) return r;
            window.com_veeva_clm_ordersWithListPrice = function(e) {
                e = com.veeva.clm.formatResult(e);
                if (e.success) {
                    orderIds = [];
                    if (e.Pricing_Rule_vod__c && e.Pricing_Rule_vod__c.length > 0)
                        for (i = 0; i < e.Pricing_Rule_vod__c.length; i++) orderIds.push(e.Pricing_Rule_vod__c[i].Product_vod__c);
                    r.success = !0, r.Product_vod__c = orderIds, com.veeva.clm.wrapResult("getProduct_OrderActive_Account", t, r)
                } else com.veeva.clm.wrapResult("getProduct_OrderActive_Account", t, e)
            }, window.com_veeva_clm_listPriceTypeId = function(r) {
                r = com.veeva.clm.formatResult(r);
                if (r.success && r.RecordType && r.RecordType.length > 0) {
                    listPriceRecordTypeId = r.RecordType[0].ID;
                    var s = [];
                    for (i = 0; i < n.length; i++) s.push(n[i].ID);
                    dateString = com.veeva.clm.getCurrentDate(), query = null, e == null || e == "" ? query = 'veeva:queryObject(Pricing_Rule_vod__c),fields(ID,Product_vod__c),where(WHERE RecordTypeId="' + listPriceRecordTypeId + '" AND Start_Date_vod__c <= "' + dateString + '" AND End_Date_vod__c >= "' + dateString + '" AND Product_vod__c IN ' + com.veeva.clm.joinStringArrayForIn(s) + "), com_veeva_clm_ordersWithListPrice(result)" : query = 'veeva:queryObject(Pricing_Rule_vod__c),fields(ID,Product_vod__c),where(WHERE RecordTypeId="' + listPriceRecordTypeId + '" AND (Account_vod__c="' + e + '" OR Account_Group_vod__c = "' + e + '") AND Start_Date_vod__c <="' + dateString + '" AND End_Date_vod__c >= "' + dateString + '" AND Product_vod__c IN ' + com.veeva.clm.joinStringArrayForIn(s) + "), com_veeva_clm_ordersWithListPrice(result)", com.veeva.clm.testMode ? com_veeva_clm_ordersWithListPrice(testResult.listPrices) : com.veeva.clm.runAPIRequest(query)
                } else com.veeva.clm.wrapResult("getProduct_OrderActive_Account", t, r)
            }, this.getProduct_MySetup("Order", function(e) {
                if (e.success) {
                    n = e.Product_vod__c;
                    if (!(n && n.length > 0)) {
                        r.success = !0, r.Product_vod__c = [], com.veeva.clm.wrapResult("getProduct_OrderActive_Account", t, r);
                        return
                    }
                    recordTypeQuery = 'veeva:queryObject(RecordType),fields(ID),where(WHERE SobjectType="Pricing_Rule_vod__c" AND Name_vod__c="List_Price_Rule_vod"),com_veeva_clm_listPriceTypeId(result)', com.veeva.clm.testMode ? com_veeva_clm_listPriceTypeId(testResult.listPriceRecordType) : com.veeva.clm.runAPIRequest(recordTypeQuery)
                } else com.veeva.clm.wrapResult("getProduct_OrderActive_Account", t, e)
            })
        },
        getProduct_KitComponents: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("product", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getProduct_KitComponents", t, ret);
                return
            }
            window.com_veeva_clm_childKitItems = function(e) {
                com.veeva.clm.wrapResult("getProduct_KitComponents", t, e)
            }, query = 'veeva:queryObject(Product_vod__c),fields(ID),where(WHERE Product_Type_vod__c="Kit Item" AND Parent_Product_vod__c="' + e + '"),com_veeva_clm_childKitItems(result)', com.veeva.clm.testMode ? com_veeva_clm_childKitItems(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getProductGroup_Product: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("product", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getProductGroup_Product", t, ret);
                return
            }
            window.com_veeva_clm_productProductGroups = function(e) {
                e = com.veeva.clm.formatResult(e);
                var n = {};
                if (e != null && e.success) {
                    var r = e.Product_Group_vod__c,
                        s = [];
                    if (r && r.length > 0)
                        for (i = 0; i < r.length; i++) s.push(r[i].Product_Catalog_vod__c);
                    n.success = !0, n.Product_vod__c = s, com.veeva.clm.wrapResult("getProductGroup_Product", t, n)
                } else e != null && com.veeva.clm.wrapResult("getProductGroup_Product", t, e)
            }, query = 'veeva:queryObject(Product_Group_vod__c),fields(ID,Product_Catalog_vod__c),where(WHERE Product_vod__c="' + e + '"),com_veeva_clm_productProductGroups(result)', com.veeva.clm.testMode ? com_veeva_clm_productProductGroups(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getLastTenOrders_Account: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("account", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getLastTenOrders_Account", t, ret);
                return
            }
            window.com_veeva_clm_accountLastTenOrders = function(e) {
                com.veeva.clm.wrapResult("getLastTenOrders_Account", t, e)
            }, query = 'veeva:queryObject(Order_vod__c),fields(ID),where(WHERE Account_vod__c="' + e + '"),sort(Order_Date_vod__c,desc),limit(10),com_veeva_clm_accountLastTenOrders(result)', com.veeva.clm.testMode ? com_veeva_clm_accountLastTenOrders(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getOrderLines_Order: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("order", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getOrderLines_Order", t, ret);
                return
            }
            window.com_veeva_clm_orderLines = function(e) {
                com.veeva.clm.wrapResult("getOrderLines_Order", t, e)
            }, query = 'veeva:queryObject(Order_Line_vod__c),fields(ID),where(WHERE Order_vod__c="' + e + '"),com_veeva_clm_orderLines(result)', com.veeva.clm.testMode ? com_veeva_clm_orderLines(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(query)
        },
        getListPrice_Product: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("product", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getListPrice_Product", t, ret);
                return
            }
            window.com_veeva_clm_productPricingRules = function(e) {
                com.veeva.clm.wrapResult("getListPrice_Product", t, e)
            }, window.com_veeva_clm_listPriceTypeId_getListPrice_Product = function(n) {
                n = com.veeva.clm.formatResult(n), n.success && n.RecordType && n.RecordType.length > 0 ? (listPriceRecordTypeId = n.RecordType[0].ID, dateString = com.veeva.clm.getCurrentDate(), query = 'veeva:queryObject(Pricing_Rule_vod__c),fields(ID),where(WHERE RecordTypeId="' + listPriceRecordTypeId + '" AND Product_vod__c = "' + e + '"' + ' AND Start_Date_vod__c <= "' + dateString + '" AND End_Date_vod__c >= "' + dateString + '"), com_veeva_clm_productPricingRules(result)', com.veeva.clm.testMode ? com_veeva_clm_productPricingRules(com.veeva.clm.testResult.listPrices) : com.veeva.clm.runAPIRequest(query)) : com.veeva.clm.wrapResult("getListPrice_Product", t, n)
            }, recordTypeQuery = 'veeva:queryObject(RecordType),fields(ID),where(WHERE SobjectType="Pricing_Rule_vod__c" AND Name_vod__c="List_Price_Rule_vod"),com_veeva_clm_listPriceTypeId_getListPrice_Product(result)', com.veeva.clm.testMode ? com_veeva_clm_listPriceTypeId_getListPrice_Product(testResult.listPriceRecordType) : com.veeva.clm.runAPIRequest(recordTypeQuery)
        },
        getListPrice_Product_Account: function(e, t, n) {
            ret = this.checkCallbackFunction(n);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("product", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getListPrice_Product_Account", n, ret);
                return
            }
            ret = this.checkArgument("account", t);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getListPrice_Product_Account", n, ret);
                return
            }
            window.com_veeva_clm_productDefaultPricingRules = function(e) {
                com.veeva.clm.wrapResult("getListPrice_Product_Account", n, e)
            }, window.com_veeva_clm_get_productDefaultPricingRules = function() {
                dateString = com.veeva.clm.getCurrentDate(), groupQuery = 'veeva:queryObject(Pricing_Rule_vod__c),fields(ID),where(WHERE RecordTypeId="' + listPriceRecordTypeId + '" AND Product_vod__c = "' + e + '"' + ' AND Account_Group_vod__c="" AND Account_vod__c=""' + ' AND Start_Date_vod__c <= "' + dateString + '" AND End_Date_vod__c >= "' + dateString + '"), com_veeva_clm_productDefaultPricingRules(result)', com.veeva.clm.testMode ? com_veeva_clm_productDefaultPricingRules(com.veeva.clm.testResult.listPrices) : com.veeva.clm.runAPIRequest(groupQuery)
            }, window.com_veeva_clm_productAccountGroupPricingRules = function(e) {
                e = com.veeva.clm.formatResult(e), e.success && e.Pricing_Rule_vod__c.length == 0 ? com_veeva_clm_get_productDefaultPricingRules() : com.veeva.clm.wrapResult("getListPrice_Product_Account", n, e)
            }, window.com_veeva_clm_accountGroup = function(t) {
                t = com.veeva.clm.formatResult(t), t.success ? (accountGroup = t.Account.Account_Group_vod__c, accountGroup != undefined && accountGroup != "" ? (dateString = com.veeva.clm.getCurrentDate(), groupQuery = 'veeva:queryObject(Pricing_Rule_vod__c),fields(ID),where(WHERE RecordTypeId="' + listPriceRecordTypeId + '" AND Product_vod__c = "' + e + '"' + ' AND Account_Group_vod__c="' + accountGroup + '"' + ' AND Start_Date_vod__c <= "' + dateString + '" AND End_Date_vod__c >= "' + dateString + '"), com_veeva_clm_productAccountGroupPricingRules(result)', com.veeva.clm.testMode ? com_veeva_clm_productAccountGroupPricingRules(com.veeva.clm.testResult.listPrices) : com.veeva.clm.runAPIRequest(groupQuery)) : com_veeva_clm_get_productDefaultPricingRules()) : com.veeva.clm.wrapResult("getListPrice_Product_Account", n, t)
            }, window.com_veeva_clm_productAccountPricingRules = function(e) {
                e = com.veeva.clm.formatResult(e), e.success && e.Pricing_Rule_vod__c.length == 0 ? com.veeva.clm.getDataForObject("Account", t, "Account_Group_vod__c", com_veeva_clm_accountGroup) : com.veeva.clm.wrapResult("getListPrice_Product_Account", n, e)
            }, window.com_veeva_clm_listPriceTypeId_getListPrice_Product_Account = function(r) {
                r = com.veeva.clm.formatResult(r), r.success && r.RecordType && r.RecordType.length > 0 ? (listPriceRecordTypeId = r.RecordType[0].ID, dateString = com.veeva.clm.getCurrentDate(), query = 'veeva:queryObject(Pricing_Rule_vod__c),fields(ID),where(WHERE RecordTypeId="' + listPriceRecordTypeId + '" AND Product_vod__c = "' + e + '"' + ' AND Account_vod__c="' + t + '"' + ' AND Start_Date_vod__c <= "' + dateString + '" AND End_Date_vod__c >= "' + dateString + '"), com_veeva_clm_productAccountPricingRules(result)', com.veeva.clm.testMode ? com_veeva_clm_productAccountPricingRules(com.veeva.clm.testResult.listPrices) : com.veeva.clm.runAPIRequest(query)) : com.veeva.clm.wrapResult("getListPrice_Product_Account", n, r)
            }, recordTypeQuery = 'veeva:queryObject(RecordType),fields(ID),where(WHERE SobjectType="Pricing_Rule_vod__c" AND Name_vod__c="List_Price_Rule_vod"),com_veeva_clm_listPriceTypeId_getListPrice_Product_Account(result)', com.veeva.clm.testMode ? com_veeva_clm_listPriceTypeId_getListPrice_Product_Account(testResult.listPriceRecordType) : com.veeva.clm.runAPIRequest(recordTypeQuery)
        },
        getApprovedDocument: function(e, t, n) {
            var r, i, s, o;
            ret = this.checkCallbackFunction(n);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("vault_id", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getApprovedDocument", n, ret);
                return
            }
            ret = this.checkArgument("document_num", t);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getApprovedDocument", n, ret);
                return
            }
            window.com_veeva_clm_DocumentTypeId_getDocument = function(u) {
                if (u.success && u.Approved_Document_vod__c && u.Approved_Document_vod__c.length == 1) {
                    var a;
                    if (s != undefined && o != undefined && o.length > 0) {
                        a = [];
                        var f = 0;
                        for (var l = 0; l < s.length; l++)
                            for (var c = 0; c < o.length; c++)
                                if (s[l].ID != undefined && o[c].Product_Catalog_vod__c != undefined && o[c].Product_vod__c != undefined && s[l].ID == o[c].Product_Catalog_vod__c && u.Approved_Document_vod__c[0].Product_vod__c == o[c].Product_vod__c) {
                                    a[f] = {}, a[f].ID = {}, a[f].Detail_Group_vod__c = {}, a[f].ID = o[c].Product_vod__c, a[f].Detail_Group_vod__c = s[l].ID, f++;
                                    break
                                }
                    }
                    if (r && r.length > 0)
                        for (var c = 0; c < r.length; c++)
                            if (u.Approved_Document_vod__c[0].Product_vod__c === r[c].ID) {
                                if (!(a != undefined && a.length > 0)) {
                                    var h = {};
                                    h.Approved_Document_vod__c = {}, h.Approved_Document_vod__c.ID = u.Approved_Document_vod__c[0].ID, h.success = !0, com.veeva.clm.wrapResult("getApprovedDocument", n, h);
                                    return
                                }
                                for (var l = 0; l < a.length; l++)
                                    if (u.Approved_Document_vod__c[0].Detail_Group_vod__c != undefined && u.Approved_Document_vod__c[0].Product_vod__c == a[l].ID && u.Approved_Document_vod__c[0].Detail_Group_vod__c == a[l].Detail_Group_vod__c) {
                                        var h = {};
                                        h.Approved_Document_vod__c = {}, h.Approved_Document_vod__c.ID = u.Approved_Document_vod__c[0].ID, h.success = !0, com.veeva.clm.wrapResult("getApprovedDocument", n, h);
                                        return
                                    }
                            }
                    if (i && i.length > 0)
                        for (var p = 0; p < i.length; p++)
                            if (u.Approved_Document_vod__c[0].Product_vod__c === i[p].ID) {
                                if (!(a != undefined && a.length > 0)) {
                                    var h = {};
                                    h.Approved_Document_vod__c = {}, h.Approved_Document_vod__c.ID = u.Approved_Document_vod__c[0].ID, h.success = !0, com.veeva.clm.wrapResult("getApprovedDocument", n, h);
                                    return
                                }
                                for (var l = 0; l < a.length; l++)
                                    if (u.Approved_Document_vod__c[0].Detail_Group_vod__c != undefined && u.Approved_Document_vod__c[0].Product_vod__c == a[l].ID && u.Approved_Document_vod__c[0].Detail_Group_vod__c == a[l].Detail_Group_vod__c) {
                                        var h = {};
                                        h.Approved_Document_vod__c = {}, h.Approved_Document_vod__c.ID = u.Approved_Document_vod__c[0].ID, h.success = !0, com.veeva.clm.wrapResult("getApprovedDocument", n, h);
                                        return
                                    }
                            }
                    var h = {};
                    h.success = !0, com.veeva.clm.wrapResult("getApprovedDocument", n, h)
                } else if (u.success && u.Approved_Document_vod__c && u.Approved_Document_vod__c.length > 1) {
                    var h = {};
                    h.success = !0, com.veeva.clm.wrapResult("getApprovedDocument", n, h)
                } else {
                    if (u.code == 1021) {
                        u.message.indexOf("Detail_Group_vod__c") >= 0 && (approvedDocumentQuery = 'veeva:queryObject(Approved_Document_vod__c),fields(ID,Product_vod__c),where(WHERE Vault_Instance_ID_vod__c="' + e + '" AND Vault_Document_ID_vod__c="' + t + '" AND Status_vod__c="Approved_vod"),com_veeva_clm_DocumentTypeId_getDocument(result)', com.veeva.clm.testMode ? com_veeva_clm_DocumentTypeId_getDocument(testResult.approvedDocumentWithId2) : com.veeva.clm.runAPIRequest(approvedDocumentQuery));
                        return
                    }
                    var h = {};
                    h.success = !0, com.veeva.clm.wrapResult("getApprovedDocument", n, h)
                }
            }, window.com_veeva_clm_getProductGroups = function(r) {
                if (r.success) o = r.Product_Group_vod__c, approvedDocumentQuery = 'veeva:queryObject(Approved_Document_vod__c),fields(ID,Product_vod__c,Detail_Group_vod__c),where(WHERE Vault_Instance_ID_vod__c="' + e + '" AND Vault_Document_ID_vod__c="' + t + '" AND Status_vod__c="Approved_vod"),com_veeva_clm_DocumentTypeId_getDocument(result)', com.veeva.clm.testMode ? com_veeva_clm_DocumentTypeId_getDocument(testResult.approvedDocumentWithId) : com.veeva.clm.runAPIRequest(approvedDocumentQuery);
                else {
                    if (r.code == 1011) {
                        r.message.indexOf("Product_Group_vod__c") >= 0 && (approvedDocumentQuery = 'veeva:queryObject(Approved_Document_vod__c),fields(ID,Product_vod__c),where(WHERE Vault_Instance_ID_vod__c="' + e + '" AND Vault_Document_ID_vod__c="' + t + '" AND Status_vod__c="Approved_vod"),com_veeva_clm_DocumentTypeId_getDocument(result)', com.veeva.clm.testMode ? com_veeva_clm_DocumentTypeId_getDocument(testResult.approvedDocumentWithId2) : com.veeva.clm.runAPIRequest(approvedDocumentQuery));
                        return
                    }
                    com.veeva.clm.wrapResult("getApprovedDocument", n, r)
                }
            }, com.veeva.clm.getProduct_MySetup("Detail Topic", function(e) {
                if (!e.success) {
                    com.veeva.clm.wrapResult("getApprovedDocument", n, e);
                    return
                }
                r = e.Product_vod__c, com.veeva.clm.getProduct_MySetup("Detail", function(e) {
                    if (!e.success) {
                        com.veeva.clm.wrapResult("getApprovedDocument", n, e);
                        return
                    }
                    i = e.Product_vod__c, com.veeva.clm.getProduct_MySetup("Detail Group", function(e) {
                        if (!e.success) {
                            com.veeva.clm.wrapResult("getApprovedDocument", n, e);
                            return
                        }
                        s = e.Product_vod__c;
                        var t = [];
                        for (var r = 0; r < s.length; r++) t[r] = s[r].ID;
                        var i = com.veeva.clm.joinStringArrayForIn(t);
                        i == "" && (i = "{}"), query = "veeva:queryObject(Product_Group_vod__c),fields(ID,Product_vod__c,Product_Catalog_vod__c),where(WHERE Product_Catalog_vod__c IN " + i + "),com_veeva_clm_getProductGroups(result)", com.veeva.clm.testMode ? com_veeva_clm_getProductGroups(com.veeva.clm.testResult.productGroups) : com.veeva.clm.runAPIRequest(query)
                    })
                })
            })
        },
        launchApprovedEmail: function(e, t, n) {
            ret = this.checkCallbackFunction(n);
            if (ret.success == 0) return ret;
            if (e == undefined || e == null) e = "";
            if (t == undefined || t == null) t = "";
            request = null, window.com_veeva_clm_launchApprovedEmail = function(e) {
                e = com.veeva.clm.formatResult(e), e.success ? (ret = {}, ret.success = !0, e.code != undefined && (ret.code = e.code, ret.message = e.message), com.veeva.clm.wrapResult("launchApprovedEmail", n, ret)) : (ret = {}, ret.success = !1, ret.code = e.code, ret.message = "Request: " + request + " failed: " + e.message, com.veeva.clm.wrapResult("launchApprovedEmail", n, ret))
            }, request = "veeva:launchApprovedEmail(" + e + "," + t + "),callback(com_veeva_clm_launchApprovedEmail)", com.veeva.clm.testMode ? com_veeva_clm_launchApprovedEmail(com.veeva.clm.testResult.approvedEmailId) : com.veeva.clm.runAPIRequest(request)
        },
        getDataForCurrentObject: function(e, t, n) {
            ret = this.checkCallbackFunction(n);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("object", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getDataForCurrentObject", n, ret);
                return
            }
            ret = this.checkArgument("field", t);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getDataForCurrentObject", n, ret);
                return
            }
            window.com_veeva_clm_getCurrentObjectField = function(e) {
                com.veeva.clm.wrapResult("getDataForCurrentObject", n, e)
            }, lowerName = e.toLowerCase(), request = "veeva:getDataForObjectV2(" + e + "),fieldName(" + t + "),com_veeva_clm_getCurrentObjectField(result)", com.veeva.clm.testMode ? com_veeva_clm_getCurrentObjectField(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(request, n)
        },
        getDataForObject: function(e, t, n, r) {
            ret = this.checkCallbackFunction(r);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("object", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getDataForObject", r, ret);
                return
            }
            ret = this.checkArgument("record", t);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getDataForObject", r, ret);
                return
            }
            ret = this.checkArgument("field", n);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getDataForObject", r, ret);
                return
            }
            window.com_veeva_clm_getObjectField = function(e) {
                com.veeva.clm.wrapResult("getDataForObject", r, e)
            }, request = "veeva:getDataForObjectV2(" + e + "),objId(" + t + "),fieldName(" + n + "),com_veeva_clm_getObjectField(result)", com.veeva.clm.testMode ? com_veeva_clm_getObjectField(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(request, r)
        },
        createRecord: function(e, t, n) {
            ret = this.checkCallbackFunction(n);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("object", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("createRecord", n, ret);
                return
            }
            ret = this.checkArgument("values", t);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("createRecord", n, ret);
                return
            }
            request = com.veeva.clm.generateSaveRecordRequest(e, t, "com_veeva_clm_createRecord"), window.com_veeva_clm_createRecord = function(t) {
                t = com.veeva.clm.formatResult(t), t.success ? (ret = {}, ret.success = !0, ret.operation = t.operation, ret[e] = {}, ret[e].ID = t.objectId, t.code != undefined && (ret.code = t.code, ret.message = t.message), com.veeva.clm.wrapResult("createRecord", n, ret)) : (ret = {}, ret.success = !1, ret.code = 2100, ret.message = "Request: " + request + " failed: " + t.message, com.veeva.clm.wrapResult("createRecord", n, ret))
            }, com.veeva.clm.testMode ? com_veeva_clm_createRecord(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(request)
        },
        updateRecord: function(e, t, n, r) {
            ret = this.checkCallbackFunction(r);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("object", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("updateRecord", r, ret);
                return
            }
            ret = this.checkArgument("record", t);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("updateRecord", r, ret);
                return
            }
            ret = this.checkArgument("values", n);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("updateRecord", r, ret);
                return
            }
            n.IdNumber = t, request = com.veeva.clm.generateSaveRecordRequest(e, n, "com_veeva_clm_updateRecord"), window.com_veeva_clm_updateRecord = function(t) {
                t = com.veeva.clm.formatResult(t), t.success ? (ret = {}, ret.success = !0, ret.operation = t.operation, ret[e] = {}, ret[e].ID = t.objectId, t.code != undefined && (ret.code = t.code, ret.message = t.message), com.veeva.clm.wrapResult("updateRecord", r, ret)) : (ret = {}, ret.success = !1, ret.code = 2100, ret.message = "Request: " + request + " failed: " + t.message, com.veeva.clm.wrapResult("updateRecord", r, ret))
            }, com.veeva.clm.testMode ? com_veeva_clm_updateRecord(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(request)
        },
        gotoSlide: function(e, t) {
            ret = this.checkArgument("keyMessage", e);
            if (ret.success == 0) return ret;
 e = e.replace(".zip", ""); 
//alert(e);
window.parent.navigateToSequence(e, 'noanimation');
            //request = null, t == undefined || t == null || t == "" ? request = "veeva:gotoSlide(" + e + ")" : request = "veeva:gotoSlide(" + e + "," + t + ")", com.veeva.clm.testMode || com.veeva.clm.runAPIRequest(request)
        },
        gotoSlideV2: function(e, t) {
            ret = this.checkArgument("keyMessage", e);
            if (ret.success == 0) return ret;
 e = e.replace(".zip", ""); 
//alert(e);
window.parent.navigateToSequence(e, 'noanimation');
            //request = null, t == undefined || t == null || t == "" ? request = "veeva:gotoSlideV2(" + e + ")" : request = "veeva:gotoSlideV2(" + e + "," + t + ")", com.veeva.clm.testMode || com.veeva.clm.runAPIRequest(request)
        },
        nextSlide: function() {
            request = "veeva:nextSlide()", com.veeva.clm.runAPIRequest(request)
        },
        prevSlide: function() {
            request = "veeva:prevSlide()", com.veeva.clm.runAPIRequest(request)
        },
        getUTCdatetime: function(e, t, n, r) {
            ret = this.checkCallbackFunction(r);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("object", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getUTCdatetime", r, ret);
                return
            }
            ret = this.checkArgument("record", t);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getUTCdatetime", r, ret);
                return
            }
            ret = this.checkArgument("field", n);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("getUTCdatetime", r, ret);
                return
            }
            window.com_veeva_clm_getUTCdatetime = function(e) {
                com.veeva.clm.wrapResult("getUTCdatetime", r, e)
            }, request = "veeva:getDataForObjectV3(" + e + "),objId(" + t + "),fieldName(" + n + "),getUTCdatetime(true),callback(com_veeva_clm_getUTCdatetime)", com.veeva.clm.testMode ? com_veeva_clm_getUTCdatetime(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(request, r)
        },
        updateCurrentRecord: function(e, t, n) {
            ret = this.checkCallbackFunction(n);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("object", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("updateCurrentRecord", n, ret);
                return
            }
            ret = this.checkArgument("values", t);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("updateCurrentRecord", n, ret);
                return
            }
            request = "veeva:saveObjectV2(" + e + "),updateCurrentRecord(),value(" + JSON.stringify(t) + "),callback(com_veeva_clm_updateCurrentRecord)", window.com_veeva_clm_updateCurrentRecord = function(t) {
                t = com.veeva.clm.formatResult(t), t.success ? (ret = {}, ret.success = !0, ret[e] = {}, ret[e].ID = t.objectId, t.code != undefined && (ret.code = t.code, ret.message = t.message), com.veeva.clm.wrapResult("updateCurrentRecord", n, ret)) : (ret = {}, ret.success = !1, ret.code = 2100, ret.message = "Request: " + request + " failed: " + t.message, com.veeva.clm.wrapResult("updateCurrentRecord", n, ret))
            }, com.veeva.clm.testMode ? com_veeva_clm_updateCurrentRecord(com.veeva.clm.testResult.common) : com.veeva.clm.runAPIRequest(request)
        },
        formatCreateRecords: function(e, t) {
            ret = this.checkArgument("objectArray", e);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("valueArray", t);
            if (ret.success == 0) return ret;
            e instanceof Array || (e = [e]), t instanceof Array || (t = [t]), ret = {};
            if (e.length != t.length) return ret.success = !1, ret.code = 2003, ret.message = "Parameter arrays must be of equal length", ret;
            var n = "";
            for (var r = 0; r < e.length; r++) n = n.concat(com.veeva.clm.generateSaveRecordRequest(e[r], t[r], "") + ";");
            return n
        },
        formatUpdateRecords: function(e, t, n) {
            ret = this.checkArgument("objectNameArray", e);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("objectIdArray", t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("valueArray", n);
            if (ret.success == 0) return ret;
            e instanceof Array || (e = [e]), t instanceof Array || (t = [t]), n instanceof Array || (n = [n]), ret = {};
            if (e.length != n.length || e.length != t.length) return ret.success = !1, ret.code = 2003, ret.message = "Parameter arrays must be of equal length", ret;
            var r = "";
            for (var i = 0; i < e.length; i++) n[i].IdNumber = t[i], r = r.concat(com.veeva.clm.generateSaveRecordRequest(e[i], n[i], "") + ";");
            return r
        },
        formatUpdateCurrentRecords: function(e, t) {
            ret = this.checkArgument("objectArray", e);
            if (ret.success == 0) return com.veeva.clm.wrapResult("formatUpdateCurrentRecord", callback, ret), ret;
            ret = this.checkArgument("valueArray", t);
            if (ret.success == 0) return com.veeva.clm.wrapResult("formatUpdateCurrentRecord", callback, ret), ret;
            e instanceof Array || (e = [e]), t instanceof Array || (t = [t]), ret = {};
            if (e.length != t.length) return ret.success = !1, ret.code = 2003, ret.message = "Parameter arrays must be of equal length", ret;
            var n = "";
            for (var r = 0; r < e.length; r++) n = n.concat("veeva:saveObjectV2(" + e[r] + "),updateCurrentRecord(),value(" + JSON.stringify(t[r]) + "),callback()" + ";");
            return n
        },
        generateSaveRecordRequest: function(e, t, n) {
            return "veeva:saveObjectV2(" + e + "),value(" + JSON.stringify(t) + "),callback(" + n + ")"
        },
        createMultichannelActivityLine: function(e, t) {
            ret = this.checkCallbackFunction(t);
            if (ret.success == 0) return ret;
            ret = this.checkArgument("values", e);
            if (ret.success == 0) {
                com.veeva.clm.wrapResult("createMultichannelActivityLine", t, ret);
                return
            }
            window.com_veeva_clm_createActivityLine = function(e) {
                com.veeva.clm.wrapResult("createMultichannelActivityLine", t, e)
            }, request = "veeva:createActivityLine(),value(" + JSON.stringify(e) + "),com_veeva_clm_createActivityLine(result)", com.veeva.clm.runAPIRequest(request, t)
        },
        joinStringArrayForIn: function(e) {
            var t = "";
            if (e.length > 0) {
                for (i = 0; i < e.length; i++) i == 0 ? t += '{"' + e[i] + '"' : t += ',"' + e[i] + '"';
                t += "}"
            }
            return t
        },
        joinFieldArray: function(e) {
            var t = "";
            if (e.length > 0)
                for (i = 0; i < e.length; i++) i == 0 ? t += e[i] : t += "," + e[i];
            return t
        },
        isFunction: function(e) {
            var t = {};
            return e && t.toString.call(e) === "[object Function]"
        },
        checkCallbackFunction: function(e) {
            return ret = {}, e == undefined ? (ret.success = !1, ret.code = 2e3, ret.message = "callback is missing", ret) : (this.isFunction(e) == 0 ? (ret.success = !1, ret.code = 2001, ret.message = "callback is not a JavaScript function") : ret.success = !0, ret)
        },
        checkArgument: function(e, t) {
            ret = {}, ret.success = !0;
            if (t == undefined || t == null || t == "") ret.success = !1, ret.code = 2002, ret.message = e + " is empty";
            return ret
        },
        getCurrentDate: function() {
            var e = new Date;
            return dateString = e.getFullYear().toString(), month = e.getMonth() + 1, month < 10 ? dateString += "-0" + month : dateString += "-" + month, date = e.getDate(), date < 10 ? dateString += "-0" + date : dateString += "-" + date, dateString
        },
        formatResult: function(result) {
            return com.veeva.clm.isWin8() && typeof result == "string" && (result = eval("(" + result + ")")), result
        },
        wrapResult: function(e, t, n) {
            n = com.veeva.clm.formatResult(n), n.success ? t(n) : (n.message = e + ": " + n.message, t(n))
        },
        runAPIRequest: function(e, t) {
            com.veeva.clm.isEngage() ? com.veeva.clm.engageAPIRequest(e, t) : com.veeva.clm.isWin8() ? window.external.notify(e) : document.location = e
        },
        isWin8: function() {
            return navigator.platform.toLowerCase().indexOf("win") >= 0 ? !0 : !1
        },
        isEngage: function() {
            return window.self !== window.top ? !0 : !1
        },
        engageAPIRequest: function(e, t) {
            if (com.veeva.clm.engageHasListener === !1) {
                com.veeva.clm.engageHasListener = !0, com.veeva.clm.engageCallbackId = 0;

                function n(e) {
                    var t = JSON.parse(e.data),
                        n = t.callback;
                    if (n !== undefined && n !== null) {
                        var r = com.veeva.clm.engageCallbackList[n];
                        r !== undefined && r !== null && (r.call(null, t), delete com.veeva.clm.engageCallbackList[n])
                    }
                }
                window.addEventListener ? window.addEventListener("message", n, !1) : window.attachEvent("onmessage", n)
            }
            setTimeout(function() {
                com.veeva.clm.engageCallbackId += 1;
                var n = com.veeva.clm.engageCallbackId;
                com.veeva.clm.engageCallbackList[n] = t;
                var r = e.split(",");
                r.length > 1 && (r[r.length - 1] = n, e = r.join()), window.parent.postMessage(e, "*")
            }, 1)
        },
        listPriceRecordTypeId: null,
        accountId: null,
        addressId: null,
        callId: null,
        tsfId: null,
        userId: null,
        presentationId: null,
        keyMessageId: null,
        engageHasListener: !1,
        engageCallbackId: null,
        engageCallbackList: [],
        testMode: !1,
        testResult: null
    }, com.veeva.clm.initialize = function() {
        function n(e, n) {
            if (t === !0) return;
            var r = {};
            r.type = "iframe", r.event = {}, r.event.type = n, r.event.clientX = e.clientX, r.event.clientY = e.clientY, window.parent.postMessage(JSON.stringify(r), "*")
        }

        function r(e) {
            t = !0;
            var n = JSON.parse(e.data);
            if (n.type && n.type === "events") {
                var r = document.elementFromPoint(n.event.clientX, n.event.clientY);
                if (r) {
                    var o = i(n.event.type, 0, 0, n.event.clientX, n.event.clientY);
                    s(r, o, n.event.type)
                }
            }
            t = !1
        }

        function i(e, t, n, r, i) {
            var s, o = {
                bubbles: !0,
                cancelable: e != "mousemove",
                view: window,
                detail: 0,
                screenX: t,
                screenY: n,
                clientX: r,
                clientY: i,
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1,
                button: 0,
                relatedTarget: undefined
            };
            if (typeof document.createEvent == "function") s = document.createEvent("MouseEvents"), s.initMouseEvent(e, o.bubbles, o.cancelable, o.view, o.detail, o.screenX, o.screenY, o.clientX, o.clientY, o.ctrlKey, o.altKey, o.shiftKey, o.metaKey, o.button, document.body.parentNode);
            else if (document.createEventObject) {
                s = document.createEventObject();
                for (prop in o) s[prop] = o[prop];
                s.button = {
                    0: 1,
                    1: 4,
                    2: 2
                }[s.button] || s.button
            }
            return s
        }

        function s(e, t, n) {
            return e.dispatchEvent ? e.dispatchEvent(t) : e.fireEvent && e.fireEvent("on" + n, t), t
        }
        var t = !1;
        window.addEventListener ? window.addEventListener("message", r, !1) : window.attachEvent("onmessage", r), document.onmousemove = function(e) {
            n(e, "mousemove")
        }, document.onclick = function(e) {
            n(e, "click")
        }
    }, com.veeva.clm.initialize(), define("veeva", function() {}), require([], function() {
        window.drcom = window.drcom || {};
        var e = window.navigator.userAgent.toLowerCase(),
            t = "Veeva";
        $.extend(drcom, {
            isPhantom: /phantomjs/.test(e),
            standalone: window.navigator.standalone,
            isIOS: /iphone|ipod|ipad/i.test(e),
            isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|webview|touch|tablet|opera mini/i.test(e),
            isMultiFlow: Object.prototype.toString.call(menudata) === "[object Object]"
        });
        var n = ["MI", "HarVie", "Engage", "Browser", "Agnitio", "Veeva", "Exploria"];
        if (!drcom.config.player || n.indexOf(drcom.config.player) < 0) try {
            window.parent.navigateToSequence ? t = "MI" : window.SystemBridge ? t = "HarVie" : com && com.veeva && com.veeva.clm && com.veeva.clm.isEngage() ? t = "Engage" : drcom.isMobile || (t = "Browser")
        } catch (r) {
            console.log(r)
        } finally {
            drcom.config.isAgnitio ? t = "Agnitio" : drcom.config.isExploria && (t = "Exploria"), drcom.config.player = t
        }(function() {
            function e() {
                var e = [];
                return _.each(arguments, function(t) {
                    _.each(t, function(t) {
                        e.push(t)
                    })
                }), e
            }

            function t(t) {
                var n = [],
                    r = !1;
                return $.support.touch == 0 && (t.touches = [], t.changedTouches = [], t.targetTouches = [], n = [t]), n = e(t.touches, t.targetTouches, t.changedTouches, n), _.each(n, function(e) {
                    _.each($.jGestures.touches, function(t) {
                        t.identifier == e.identifier && (Math.abs(e.screenX - t.screenX) > $.jGestures.defaults.thresholdMove || Math.abs(e.screenY - t.screenY) > $.jGestures.defaults.thresholdMove) && (r = !0)
                    })
                }), r
            }

            function n() {
                var e = {};
                return $.extend(e, $.event.global), _.each(h, function(t) {
                    delete e[t]
                }), _.each(e, function(t, n) {
                    var r = _.find(d, function(e) {
                        return e == n
                    });
                    r && delete e[n]
                }), e
            }

            function r(e) {
                var t = $.support.touch ? e.changedTouches[0] : e;
                return g = Math.abs(t.pageX - v), y = Math.abs(t.pageY - m), g >= $.jGestures.defaults.thresholdSwipe || y >= $.jGestures.defaults.thresholdSwipe
            }

            function i(e) {
                if (c) return !1;
                var t = Math.abs(1 - e.scale);
                return !(t < $.jGestures.defaults.thresholdGetsure)
            }

            function s(e, t, n) {
                var r = {
                        x: t.x - e.x,
                        y: t.y - e.y
                    },
                    i = r.x,
                    s = -r.y,
                    o = Math.abs(i),
                    u = Math.abs(s),
                    a = [i > 0 && s > 0 && o < u, i > 0 && s > 0 && o > u, i > 0 && s < 0 && o > u, i > 0 && s < 0 && o < u, i < 0 && s < 0 && o < u, i < 0 && s < 0 && o > u, i < 0 && s > 0 && o > u, i < 0 && s > 0 && o < u, i == 0 && s > 0, i > 0 && s > 0 && i == s, i > 0 && s == 0, i < 0 && s < 0 && o == u, i == 0 && s < 0, i < 0 && s < 0 && o == u, i < 0 && s == 0];
                for (var f = 0; f < n.length; f++)
                    if (a[n[f]] == 1) return n[f];
                return -1
            }

            function o(e, t, n) {
                var r = ["charCode", "clientX", "clientY", "ctrlKey", "layerX", "layerY", "offsetX", "offsetY", "pageX", "pageY", "screenX", "screenY", "x", "y"];
                options = {}, _.each(r, function(e) {
                    options[e] = n[e]
                });
                try {
                    $(e).trigger($.Event(t, options))
                } catch (i) {
                    console.log(i.stack)
                }
            }

            function u(e, t, n) {
                var r = document.createEvent("MouseEvent");
                r.initMouseEvent(t, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null);
                try {
                    $(e)[0].dispatchEvent(r)
                } catch (i) {
                    console.log(i.stack)
                }
            }

            function a(e) {
                try {
                    $.support.touch ? (document.addEventListener("touchmove", f, !1), document.addEventListener("touchend", l, !1)) : (document.addEventListener("mousemove", f, !1), document.addEventListener("mouseup", l, !1));
                    var t = $.support.touch ? e.changedTouches[0] : e;
                    dist = 0, v = t.pageX, m = t.pageY, touching = !0;
                    var n = [];
                    $.support.touch == 0 && (e.touches = [e]), _.each(e.touches, function(e) {
                        n.push({
                            screenX: e.screenX,
                            screenY: e.screenY,
                            identifier: e.identifier,
                            event: e,
                            timestamp: (new Date).getTime()
                        })
                    }), $.jGestures.touches = n, $.jGestures.touches.length == 1 && u($($.jGestures.touches[0].event.target), "vmousedown", e.touches[0])
                } catch (r) {
                    console.log(r)
                }
            }

            function f(e) {
                $.support.touch == 0 && (e.touches = [e]), $.jGestures.touches.length == 1 && u($($.jGestures.touches[0].event.target), "vmousemove", e.touches[0])
            }

            function l(e) {
                var a = $.jGestures.touches[0],
                    c = $(a.event.target);
                $.support.touch == 0 && (e.changedTouches = [e]), $.jGestures.touches.length == 1 && u(c, "vmouseup", e.changedTouches[0]), $.support.touch && e.touches.length == 0 && u(c, "release", e.changedTouches[0]), e.target.nodeType == 3 && (c = $(e.target).parent());
                var h = $.support.touch;
                _iTouches = h ? $.jGestures.touches.length : "1", d = n(), _bHasMoved = t(e), _oEventData = a, _iScreenX = h ? e.changedTouches[0].screenX : e.screenX, _iScreenY = h ? e.changedTouches[0].screenY : e.screenY, _bHasSwipeGesture = 0, _iTouches == 2 ? _bHasSwipeGesture = !i(e) : _bHasSwipeGesture = r(e);
                var p = {
                    swipeoneleft: [5, 6, 14],
                    swipeoneright: [1, 2, 10],
                    swipeoneup: [0, 7, 8],
                    swipeonedown: [3, 4, 12],
                    swipetwoleft: [5, 6, 14],
                    swipetworight: [1, 2, 10],
                    swipetwoup: [0, 7, 8],
                    swipetwodown: [3, 4, 12],
                    swipethreeleft: [5, 6, 14],
                    swipethreeright: [1, 2, 10],
                    swipethreeup: [0, 7, 8],
                    swipethreedown: [3, 4, 12],
                    swipeone: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                    swipetwo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                    swipethree: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                };
                for (var v in d) {
                    var m = -1;
                    if (_iTouches > 0 && p[v] != null && _bHasMoved === !0) {
                        m = s({
                            x: _oEventData.screenX,
                            y: _oEventData.screenY
                        }, {
                            x: _iScreenX,
                            y: _iScreenY
                        }, p[v]);
                        if (m == -1) continue
                    }
                    var b = !1;
                    switch (v) {
                        case "swipeoneup":
                        case "swipeonedown":
                        case "swipeoneright":
                        case "swipeoneleft":
                            if (_bHasMoved === !0 && _bHasSwipeGesture === !0 && _iTouches == 1) return b = !0, o(c, v, a.event);
                            break;
                        case "tapone":
                            (_bHasMoved !== !0 && b !== !0 || _bHasMoved === !0 && g <= 20 && y <= 20) && _iTouches == 1 && o(c, "tapone", a.event)
                    }
                }
                $.support.touch ? (document.removeEventListener("touchmove", f, !1), document.removeEventListener("touchend", l, !1)) : (document.removeEventListener("mousemove", f, !1), document.removeEventListener("mouseup", l, !1))
            }
            var c = navigator.userAgent.toLowerCase().indexOf("android") > -1,
                h = ["destroyed", "ready", "remove", "selectstart"],
                p = {
                    defaults: {
                        thresholdMove: 1,
                        thresholdSwipe: 50,
                        thresholdDbtap: 300,
                        thresholdTapHold: 500,
                        thresholdGetsure: .3
                    },
                    touches: []
                };
            $.jGestures = p, $.support.touch = "ontouchend" in document;
            var d = [],
                v, m, g, y;
            $.support.touch ? document.addEventListener("touchstart", a, !1) : document.addEventListener("mousedown", a, !1), $(["vmousedown", "vmousemove", "vmouseup", "tapone"]).each(function(e) {
                $.event.fixHooks[this + ""] = $.event.mouseHooks
            }), $("<div></div>").bind("tapone", function() {})
        })(), window.cssTransitions = window.cssTransitions || [];
        var i = $.fn.delay;
        $.fn.delay = function() {
            return window.cssTransitions.push({
                el: this,
                type: "jquery"
            }), i.apply(this, arguments), this
        };
        var s = $.fn.animate;
        $.fn.animate = function(e, t, n, r) {
                var i = {};
                $.each(e, function(e, t) {
                    if (e == "_") return;
                    i[e] = t
                }), e = i, window.cssTransitions == null && (window.cssTransitions = []), window.cssTransitions.push({
                    el: $(this),
                    type: "jquery"
                }), s.apply(this, arguments)
            }, window.stopKeyframeAnimation = function(e) {
                $(e).css("-webkit-animation-play-state", "paused")
            }, $.fn.stopCssTransition = function() {
                var e = ["left", "top", "right", "bottom", "-webkit-transform", "opacity", "width", "height"];
                $(this).each(function() {
                    var t = $(this);
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        t.css(r, t.css(r))
                    }
                    t.unbind("webkitTransitionEnd"), t.css("transition", "all 0s linear 0s")
                })
            }, $.cssHooks.webkitTransform = {
                get: function(e) {
                    function t() {
                        var t = window.getComputedStyle(e, null),
                            n, r;
                        return t = t.webkitTransform.split(")")[0].split(", "), n = +(t[12] || t[4]), r = +(t[13] || t[5]), {
                            x: n,
                            y: r
                        }
                    }
                    return t().y
                }
            },
            function(e, t, n) {
                function c() {
                    s = t[o](function() {
                        r.each(function() {
                            var t = e(this),
                                n = t.width(),
                                r = t.height(),
                                i = e.data(this, a);
                            (n !== i.w || r !== i.h) && t.trigger(u, [i.w = n, i.h = r])
                        }), c()
                    }, i[f])
                }
                var r = e([]),
                    i = e.resize = e.extend(e.resize, {}),
                    s, o = "setTimeout",
                    u = "resize",
                    a = u + "-special-event",
                    f = "delay",
                    l = "throttleWindow";
                i[f] = 250, i[l] = !0, e.event.special[u] = {
                    setup: function() {
                        if (!i[l] && this[o]) return !1;
                        var t = e(this);
                        r = r.add(t), e.data(this, a, {
                            w: t.width(),
                            h: t.height()
                        }), r.length === 1 && c()
                    },
                    teardown: function() {
                        if (!i[l] && this[o]) return !1;
                        var t = e(this);
                        r = r.not(t), t.removeData(a), r.length || clearTimeout(s)
                    },
                    add: function(t) {
                        function s(t, i, s) {
                            var o = e(this),
                                u = e.data(this, a);
                            u.w = i !== n ? i : o.width(), u.h = s !== n ? s : o.height(), r.apply(this, arguments)
                        }
                        if (!i[l] && this[o]) return !1;
                        var r;
                        if (e.isFunction(t)) return r = t, s;
                        r = t.handler, t.handler = s
                    }
                }
            }(jQuery, this)
    }), define("setup", function() {}), require([], function() {
        window.Drcom = window.Drcom || {}, window.drcom = window.drcom || {};
        var e = !0,
            t = !0,
            n = !0,
            r = !0,
            i = !1;
        $.extend(drcom, {
            disableSwipeNotChangeState: function() {
                e = !1, t = !1, n = !1, r = !1
            },
            enableSwipeNotChangeState: function() {
                i || (e = !0, t = !0, n = !0, r = !0)
            },
            disableSwipe: function() {
                this.disableSwipeNotChangeState(), i = !0
            },
            enableSwipe: function() {
                i = !1, this.enableSwipeNotChangeState()
            },
            disableSwipeLeft: function() {
                e = !1
            },
            disableSwipeRight: function() {
                t = !1
            },
            disableSwipeUp: function() {
                n = !1
            },
            disableSwipeDown: function() {
                r = !1
            },
            enableSwipeLeft: function() {
                e = !0
            },
            enableSwipeRight: function() {
                t = !0
            },
            enableUpLeft: function() {
                n = !0
            },
            enableDownRight: function() {
                r = !0
            },
            isSwipeEnable: function() {
                return e && t && n && r
            },
            isSwipeLeft: function() {
                return e
            },
            isSwipeRight: function() {
                return t
            },
            isSwipeUp: function() {
                return n
            },
            isSwipeDown: function() {
                return r
            },
            timer: {
                timeOutList: [],
                intervalList: [],
                setTimeout: function() {
                    var e = setTimeout.apply(window, arguments);
                    return this.timeOutList.push(e), e
                },
                clearTimeOut: function(e) {
                    clearTimeout(e);
                    var t = _.indexOf(this.timeOutList, e);
                    t >= 0 && this.timeOutList.splice(t, 1)
                },
                clearAllTimeOut: function() {
                    _.each(this.timeOutList, function(e) {
                        clearTimeout(e)
                    }), this.timeOutList = []
                },
                setInterval: function() {
                    var e = setInterval.apply(window, arguments);
                    return this.intervalList.push(e), e
                },
                clearInterval: function(e) {
                    clearInterval(e);
                    var t = _.indexOf(this.intervalList, e);
                    t >= 0 && this.intervalList.splice(t, 1)
                },
                clearAllInterval: function() {
                    _.each(this.intervalList, function(e) {
                        clearInterval(e)
                    }), this.intervalList = []
                }
            },
            storage: {
                type: drcom.config.storageType || "sessionStorage",
                name: drcom.config.presentationName,
                get: function(e) {
                    var t = null;
                    try {
                        t = JSON.parse(window[this.type].getItem("drcom:" + this.name + ":" + e))
                    } catch (n) {
                        console.log(n)
                    }
                    return t
                },
                set: function(e, t) {
                    try {
                        window[this.type].setItem("drcom:" + this.name + ":" + e, JSON.stringify(t))
                    } catch (n) {
                        console.log(n)
                    }
                },
                remove: function(e) {
                    try {
                        window[this.type].removeItem("drcom:" + this.name + ":" + e)
                    } catch (t) {
                        console.log(t)
                    }
                },
                clear: function() {
                    var e = window[this.type],
                        t = "drcom:" + this.name;
                    for (var n in e)
                        if (n.indexOf(t) >= 0) try {
                            e.removeItem(n)
                        } catch (r) {
                            console.log(r)
                        }
                }
            }
        }), $.fn.drcom_disableswipe = function() {
            return this.unbind("swipeoneleft swipeoneright swipeoneup swipeonedown"), this.bind("swipeoneleft swipeoneright swipeoneup swipeonedown", function() {
                drcom.disableSwipeNotChangeState();
                var e = drcom.timer.timeOutList;
                e.length > 0 && drcom.timer.clearTimeOut(e[e.length - 1]), drcom.timer.setTimeout(function() {
                    drcom.enableSwipeNotChangeState()
                }, 300)
            }), this
        }, $(document).bind("beforeGotoSlide", function() {
            var e = drcom.config.player;
            e === "Agnitio" && drcom.saveAgSlideExit();
            if (drcom.config.stopAnimationBeforeGotoSlide) {
                $(".drcom_video").each(function() {
                    $(this).controller().destroy()
                }), $("video").remove(), $("menu ul").removeAttr("style"), drcom.timer.clearAllTimeOut(), drcom.timer.clearAllInterval(), e == "Veeva" || e == "HarVie" || e == "Browser" ? $(".transform,.transition,.keyframe").remove() : ($(".keyframe").each(function() {
                    stopKeyframeAnimation($(this))
                }), $(".transition").stopCssTransition());
                var t = window.cssTransitions || [];
                _.each(t, function(e) {
                    var t = e.el,
                        n = e.type;
                    n == "jquery" && t.stop(!0, !1)
                })
            }
        }), drcom.ready(function() {
            if (drcom.config.visibleMeasure && window.startTime) {
                var i = $("<ul style='position:absolute;z-index:100;background:#000;color:red;left:0px;top:0px;margin:0px;padding:0px'></ul>").appendTo("body");
                $("<li></li>").appendTo(i).html((new Date).getTime() - startTime)
            }
            drcom.config.useSystemSwipe || (drcom.config.swipeInFourDirections ? $(window).bind("swipeoneleft swipeoneright swipeoneup swipeonedown", function(i) {
                switch (i.type) {
                    case "swipeoneleft":
                        e && drcom.nextMainSlide();
                        break;
                    case "swipeoneright":
                        t && drcom.prevMainSlide();
                        break;
                    case "swipeoneup":
                        r && drcom.nextSubSlide();
                        break;
                    case "swipeonedown":
                        n && drcom.prevSubSlide()
                }
            }) : ($(window).bind("swipeoneleft", function() {
                e && drcom.nextSlide()
            }), $(window).bind("swipeoneright", function() {
                t && drcom.prevSlide()
            })))
        })
    }), define("drcom", function() {}), require(["jquery", "drcom"], function(e) {
        function t() {}
        t.prototype.construct = function() {}, t.__asMethod__ = function(e, t) {
            return function() {
                var n = this.super;
                this.super = t;
                var r = e.apply(this, arguments);
                return this.super = n, r
            }
        }, t.extend = function(e) {
            var n = function() {
                    arguments[0] !== t && this.construct.apply(this, arguments)
                },
                r = new this(t),
                i = this.prototype;
            for (var s in e) {
                var o = e[s];
                o instanceof Function && (o = t.__asMethod__(o, i)), r[s] = o
            }
            return r.super = i, n.prototype = r, n.extend = this.extend, n
        };
        var n = t.extend({
            pluginName: "controller",
            events: [],
            delegate: [],
            construct: function() {
                this.init.apply(this, arguments)
            },
            init: function(t, n) {
                this.events = [], this.delegate = [], this.element = t, this.options = e.extend(this.options || {}, n);
                var r = this.element.data("controller") || {};
                r[this.pluginName] = this, this.element.data("controller", r), this.element.addClass(this.pluginName)
            },
            bind: function(t, n, r) {
                return this.events.push({
                    el: e(t),
                    eventName: n
                }), e(t).bind(n, r)
            },
            unbind: function(t, n) {
                e(t).unbind(n)
            },
            on: function(t, n, r, i) {
                this.delegate.push({
                    parent: e(n),
                    selector: r,
                    eventName: t
                }), e(n).on(t, r, i)
            },
            callback: function(e) {
                var t = this;
                return function(n, r) {
                    return t[e].apply(t, arguments)
                }
            },
            callbackEvent: function(t) {
                var n = this;
                return function(r, i) {
                    var s = [e(this)];
                    for (var o = 0; o < arguments.length; o++) s.push(arguments[o]);
                    return n[t].apply(n, s)
                }
            },
            _super: function(e, t) {
                this.super[e].apply(this, t)
            },
            destroy: function() {
                for (var e = 0; e < this.events.length; e++) this.events[e].el.unbind(this.events[e].eventName);
                for (var e = 0; e < this.delegate.length; e++) this.delegate[e].parent.off(this.delegate[e].eventName, this.delegate[e].selector);
                this.element.removeData("controller"), this.element.removeClass(this.pluginName), delete this
            },
            _trigger: function(t, n, r) {
                var i = this.options[t],
                    s;
                n = e.Event(n), n.type = t, r = r || {};
                if (n.originalEvent)
                    for (var o = e.event.props.length, u; o;) u = e.event.props[--o], n[u] = n.originalEvent[u];
                return this.element.trigger(n, r), s = e.isArray(r) ? [n].concat(r) : [n, r], !(e.isFunction(i) && i.apply(this.element[0], s) === !1 || n.isDefaultPrevented())
            }
        });
        Drcom = window.Drcom || {}, Drcom.Controller = n, e.fn.controller = function(t) {
            if (t) return e(this).data("controller")[t];
            var n = e(this).data("controller");
            for (var r in n) return n[r]
        }
    }), define("controller", function() {}), require([], function() {
        $.extend(drcom, {
            allSlides: {},
            currentFlowId: "singleFlow",
            playerReady: !1,
            setFlow: function() {
                if (!this.playerReady) {
                    var e = this.config.player;
                    if (this.isMultiFlow && this.currentFlowId === "singleFlow") switch (e) {
                        case "Veeva":
                            this.getVeevaPresentationId(this.triggerFlow.bind(this));
                            break;
                        case "Browser":
                            var t = window.location;
                            paths = t.pathname.split("/"), len = paths.length, this.triggerFlow(paths[len - 3]);
                            break;
                        case "Exploria":
                            var n = this.detectFlow();
                            this.triggerFlow(n);
                            break;
                        case "MI":
                            var n = null;
                            this.isSlideInCommon() ? n = this.storage.get("currentFlowId") : n = this.detectFlow(), this.triggerFlow(n);
                            break;
                        default:
                            this.triggerFlow()
                    } else this.triggerFlow()
                }
            },
            detectFlow: function() {
                for (var e in menudata) {
                    var t = menudata[e];
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (r.id === this.menuItem) return r.presentation && r.presentation !== "" ? r.presentation : e;
                        if (r.submenu) {
                            var i = r.submenu;
                            for (var s = 0; s < i.length; s++) {
                                var o = i[s];
                                if (o.id === this.menuItem) return o.presentation && o.presentation !== "" ? o.presentation : e
                            }
                        }
                    }
                }
                return null
            },
            triggerFlow: function(e) {
                this.currentFlowId = e || "singleFlow", this.storage.set("currentFlowId", this.currentFlowId), this.prepareAllSlides();
                if (!this.isMultiFlow || this.currentFlowId !== "singleFlow") this.playerReady = !0, this.config.player === "Agnitio" && this.saveAgSlideEnter()
            },
            waitForPlayer: function(e) {
                if (this.playerReady) e();
                else var t = function() {
                        this.playerReady && (clearInterval(n), n = null, e())
                    },
                    n = setInterval(t.bind(this), 100)
            },
            prepareAllSlides: function() {
                this.allSlides = {}, this.currentFlowId !== "singleFlow" ? _.each(menudata, function(e, t) {
                    this.allSlides[t] = this._parseSlides(e)
                }, this) : this.allSlides[this.currentFlowId] = this._parseSlides(menudata)
            },
            getVeevaPresentationId: function(e) {
                var t = this.config.player,
                    n = this.currentFlowId || !1,
                    r = this;
                t === "Veeva" ? com.veeva.clm.getDataForCurrentObject("Presentation", "Presentation_Id_vod__c", function(t) {
                    t.success && (n = t.Presentation.Presentation_Id_vod__c), e(n)
                }) : e(n)
            },
            getCurrentSlide: function() {
                return this.getSlide(this.menuItem)
            },
            getSlidesOfFlow: function(e) {
                return e = e || this.currentFlowId, this.allSlides[e]
            },
            getRawSlidesOfFlow: function(e) {
                return e = e || this.currentFlowId, e === "singleFlow" ? menudata : menudata[e]
            },
            getSlide: function(e, t) {
                t = t || this.currentFlowId;
                var n = _.find(this.getSlidesOfFlow(t), function(t) {
                    return t.id == e
                });
                return n != -1 ? n : !1
            },
            isSlideInCommon: function() {
                var e = this.getCurrentSlide(),
                    t = !1;
                return e && _.each(this.allSlides, function(n, r) {
                    !t && r !== this.currentFlowId && (t = _.some(n, function(t) {
                        return t.name === e.name
                    }))
                }, this), t
            },
            allFlowKeys: function() {
                return _.keys(this.allSlides)
            },
            _parseSlides: function(e) {
                var t = [],
                    n = function(e, r) {
                        var i = e.submenu;
                        i && (r++, _.each(i, function(i) {
                            i.level = r, i.parent = e, t.push(i), n(i, r)
                        }, this))
                    };
                return _.each(e, function(e) {
                    var r = 0;
                    e.level = r, t.push(e), n(e, r)
                }, this), t
            },
            _savePrevSlide: function(e) {
                var t = drcom.config.idsNotSaved || [];
                t.indexOf(e) < 0 && this.storage.set("prevSlide", this.menuItem)
            },
            gotoPresentation: function(e, t) {
                t && this.storage.set("currentFlowId", t), e = this.getSlideName(e, t);
                if (e) {
                    $(document).trigger("beforeGotoSlide");
                    var n = "../../" + t + "/" + e + "/" + e + ".html";
                    this.check(n, function(r) {
                        r ? window.location.href = n : window.location.href = "../../" + t + "/" + e + "/"
                    })
                }
            },
            gotoSlide: function(e) {
                var t = this.getSlideName(e);
                if (t) {
                    this._savePrevSlide(e), $(document).trigger("beforeGotoSlide");
                    var n = "../" + t + "/" + t + ".html";
                    this.check(n, function(e) {
                        e ? window.location.href = n : window.location.href = "../" + t + "/"
                    })
                }
            },
            getSlideName: function(e, t) {
                if (typeof e == "string") {
                    if (!/^\d+$/.test(e)) return e;
                    e = parseInt(e)
                }
                return typeof e == "number" ? (slide = drcom.getSlide(e, t), slide.name) : e.name ? e.name : !1
            },
            prevSlide: function() {
                var e = this.getSlidesOfFlow(),
                    t = _.indexOf(e, this.getCurrentSlide()),
                    n = !1;
                while (--t >= 0)
                    if (!e[t].hideonslide) {
                        n = e[t];
                        break
                    }
                this.gotoSlide(n)
            },
            nextSlide: function() {
                var e = this.getSlidesOfFlow(),
                    t = _.indexOf(e, this.getCurrentSlide()),
                    n = !1;
                while (++t < e.length)
                    if (!e[t].hideonslide) {
                        n = e[t];
                        break
                    }
                this.gotoSlide(n)
            },
            nextMainSlide: function() {
                var e = this.getSlidesOfFlow(),
                    t = this.getCurrentSlide(),
                    n = t.parent ? t.parent.id : t.id,
                    r = _.indexOf(e, this.getSlide(n)),
                    i = !1;
                if (r >= 0)
                    while (++r < e.length)
                        if (!e[r].parent && !e[r].hideonslide) {
                            i = e[r];
                            break
                        }
                this.gotoSlide(i)
            },
            prevMainSlide: function() {
                var e = this.getSlidesOfFlow(),
                    t = this.getCurrentSlide(),
                    n = t.parent ? t.parent.id : t.id,
                    r = _.indexOf(e, this.getSlide(n)),
                    i = !1;
                if (r >= 0)
                    while (--r >= 0)
                        if (!e[r].parent && !e[r].hideonslide) {
                            i = e[r];
                            break
                        }
                this.gotoSlide(i)
            },
            nextSubSlide: function() {
                var e = this.getSlidesOfFlow(),
                    t = this.getCurrentSlide(),
                    n = _.indexOf(e, t),
                    r = !1;
                if (n >= 0)
                    while (++n < e.length) {
                        if (e[n].level == 0) break;
                        if (e[n].level && !e[n].hideonslide) {
                            r = e[n];
                            break
                        }
                    }
                this.gotoSlide(r)
            },
            prevSubSlide: function() {
                var e = this.getSlidesOfFlow(),
                    t = this.getCurrentSlide(),
                    n = _.indexOf(e, t),
                    r = !1;
                if (n >= 0)
                    while (--n >= 0)
                        if (t.level && !e[n].hideonslide) {
                            r = e[n];
                            break
                        }
                this.gotoSlide(r)
            },
            check: function(e, t) {
                $.ajax({
                    type: "HEAD",
                    url: e,
                    success: function() {
                        t && t(!0)
                    },
                    error: function() {
                        t && t(!1)
                    }
                })
            }
        });
        var e = drcom.config.player;
        if (e === "Veeva") $.extend(drcom, {
            gotoPresentation: function(e, t) {
                this.storage.set("currentFlowId", t), this.gotoSlide(e, t)
            },
            gotoSlide: function(e, t) {
                var n = this.getSlideName(e, t);
                if (n) {
                    this._savePrevSlide(e), $(document).trigger("beforeGotoSlide");
                    var r = arguments;
                    r[0] = n + ".zip", com.veeva.clm.gotoSlide.apply(com.veeva.clm, r)
                }
            }
        });
        else if (e === "Engage") $.extend(drcom, {
            gotoPresentation: function(e, t) {},
            gotoSlide: function(e) {
                var t = e;
                if (t) {
                    t.id || (t = this.getSlide(t));
                    if (t && t.guid && t.docid) {
                        var n = window.location;
                        window.location.href = n.protocol + "//" + n.host + "/" + t.guid + "/0000000/000000/000/" + t.docid + "/production/" + t.name + "/" + t.name + ".html"
                    }
                }
            }
        });
        else if (e === "Agnitio") $.extend(drcom, {
            gotoPresentation: function(e, t) {},
            saveAgSlideEnter: function() {
                if (window.ag) {
                    var e = this.agSlideData();
                    setTimeout(function() {
                        ag.submit.slide(e)
                    }, 200)
                }
            },
            saveAgSlideExit: function() {
                if (window.ag) {
                    var e = this.agSlideData();
                    setTimeout(function() {
                        ag.submit._slideExit(e)
                    }, 200)
                }
            },
            agSlideData: function() {
                var e = this.getCurrentSlide(),
                    t = e.name,
                    n = e.title,
                    r = e.id;
                return {
                    name: n,
                    id: r,
                    chapter: t,
                    chapterId: t.replace(/ /g, "_"),
                    subChapter: t,
                    subChapterId: t.replace(/ /g, "_"),
                    path: this.config.presentationName + "/" + t
                }
            }
        });
        else if (e === "HarVie") {
            $.extend(drcom, {
                gotoSlide: function(e) {
                    var t = this.getSlideName(e);
                    t && (this._savePrevSlide(e), $(document).trigger("beforeGotoSlide"), SystemBridge.goToSlide(t))
                },
                enableSwipe: function() {
                    SystemBridge.enableSwipeToPage()
                },
                disableSwipe: function() {
                    SystemBridge.disableSwipeToPage()
                }
            });
            var t = $.fn.drcom_disableswipe;
            $.fn.drcom_disableswipe = function() {
                $(window).on("touchstart mousedown", $(this).selector, function() {
                    return !1
                }), t.apply(this, arguments)
            }
        } else if (e === "MI") {
            $(document.body).attr({
                "data-prevent-left-swipe": "true",
                "data-prevent-right-swipe": "true"
            });
            try {
                $.extend(drcom, {
                    gotoSlide: function(e) {
                        var t = this.getSlideName(e);
                        console.log("SlideName:" + t), t && (this._savePrevSlide(e), $(document).trigger("beforeGotoSlide"), window.parent.navigateToSequence(t, "noanimation"))
                    },
                    gotoPresentation: function(e, t) {
                        t && this.storage.set("currentFlowId", t);
                        var n = this.getSlideName(e, t);
                        console.log("Presentation:" + t + "||SlideName:" + n), n && (this._savePrevSlide(e), $(document).trigger("beforeGotoSlide"), window.parent.navigateToSequence(n, "noanimation"))
                    },
                    prevSlide: function() {
                        $(document).trigger("beforeGotoSlide"), window.parent.goPreviousSequence()
                    },
                    nextSlide: function() {
                        $(document).trigger("beforeGotoSlide"), window.parent.goNextSequence()
                    }
                })
            } catch (n) {
                console.log(n)
            }
        } else e === "Exploria" && $.extend(drcom, {
            getGuid: function(e, t) {
                if (typeof e == "string") {
                    if (!/^\d+$/.test(e)) return e;
                    e = parseInt(e)
                }
                if (typeof e == "number") {
                    var n = drcom.getSlide(e, t);
                    return n.guid
                }
                return e.guid ? e.guid : !1
            },
            gotoPresentation: function(e, t) {
                this.storage.set("currentFlowId", t), this.gotoSlide(e, t)
            },
            gotoSlide: function(e, t) {
                var n = this.getGuid(e, t);
                n && goToSlide && (this._savePrevSlide(e), $(document).trigger("beforeGotoSlide"), goToSlide(n))
            }
        });
        drcom.setFlow()
    }), define("player", function() {}),
    function() {
        var e = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            t = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            n = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            r = typeof location != "undefined" && location.href,
            i = r && location.protocol && location.protocol.replace(/\:/, ""),
            s = r && location.hostname,
            o = r && (location.port || void 0),
            u = [];
        define("text", [], function() {
            var a, f;
            return a = {
                version: "1.0.8",
                strip: function(e) {
                    if (e) {
                        var e = e.replace(t, ""),
                            r = e.match(n);
                        r && (e = r[1])
                    } else e = "";
                    return e
                },
                jsEscape: function(e) {
                    return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r")
                },
                createXhr: function() {
                    var t, n, r;
                    if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                    if (typeof ActiveXObject != "undefined")
                        for (n = 0; n < 3; n++) {
                            r = e[n];
                            try {
                                t = new ActiveXObject(r)
                            } catch (i) {}
                            if (t) {
                                e = [r];
                                break
                            }
                        }
                    return t
                },
                parseName: function(e) {
                    var t = !1,
                        n = e.indexOf("."),
                        r = e.substring(0, n),
                        e = e.substring(n + 1, e.length),
                        n = e.indexOf("!");
                    return n !== -1 && (t = e.substring(n + 1, e.length), t = t === "strip", e = e.substring(0, n)), {
                        moduleName: r,
                        ext: e,
                        strip: t
                    }
                },
                xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
                useXhr: function(e, t, n, r) {
                    var i = a.xdRegExp.exec(e),
                        s;
                    return i ? (e = i[2], i = i[3], i = i.split(":"), s = i[1], i = i[0], (!e || e === t) && (!i || i === n) && (!s && !i || s === r)) : !0
                },
                finishLoad: function(e, t, n, r, i) {
                    n = t ? a.strip(n) : n, i.isBuild && (u[e] = n), r(n)
                },
                load: function(e, t, n, u) {
                    if (u.isBuild && !u.inlineText) n();
                    else {
                        var f = a.parseName(e),
                            l = f.moduleName + "." + f.ext,
                            c = t.toUrl(l),
                            h = u && u.text && u.text.useXhr || a.useXhr;
                        !r || h(c, i, s, o) ? a.get(c, function(t) {
                            a.finishLoad(e, f.strip, t, n, u)
                        }) : t([l], function(e) {
                            a.finishLoad(f.moduleName + "." + f.ext, f.strip, e, n, u)
                        })
                    }
                },
                write: function(e, t, n) {
                    if (u.hasOwnProperty(t)) {
                        var r = a.jsEscape(u[t]);
                        n.asModule(e + "!" + t, "define(function () { return '" + r + "';});\n")
                    }
                },
                writeFile: function(e, t, n, r, i) {
                    var t = a.parseName(t),
                        s = t.moduleName + "." + t.ext,
                        o = n.toUrl(t.moduleName + "." + t.ext) + ".js";
                    a.load(s, n, function() {
                        var t = function(e) {
                            return r(o, e)
                        };
                        t.asModule = function(e, t) {
                            return r.asModule(e, o, t)
                        }, a.write(e, s, t, i)
                    }, i)
                }
            }, a.createXhr() ? a.get = function(e, t) {
                var n = a.createXhr();
                n.open("GET", e, !0), n.onreadystatechange = function() {
                    n.readyState === 4 && t(n.responseText)
                }, n.send(null)
            } : typeof process != "undefined" && process.versions && process.versions.node ? (f = require.nodeRequire("fs"), a.get = function(e, t) {
                var n = f.readFileSync(e, "utf8");
                n.indexOf("﻿") === 0 && (n = n.substring(1)), t(n)
            }) : typeof Packages != "undefined" && (a.get = function(e, t) {
                var n = new java.io.File(e),
                    r = java.lang.System.getProperty("line.separator"),
                    n = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(n), "utf-8")),
                    i, s, o = "";
                try {
                    i = new java.lang.StringBuffer, (s = n.readLine()) && s.length() && s.charAt(0) === 65279 && (s = s.substring(1));
                    for (i.append(s);
                        (s = n.readLine()) !== null;) i.append(r), i.append(s);
                    o = String(i.toString())
                } finally {
                    n.close()
                }
                t(o)
            }), a
        })
    }(), define("text!plugins/template/breadcrumb.html", [], function() {
        return '<% _.each(data, function(items){ %>\r\n    <div class="column"><%_.each(items, function(item) {\r\n            var id = item.id,\r\n                selected = item.id == drcom.menuItem ? "selected":"",\r\n                style = item.propertyStyle + ":" + item.propertyValue,\r\n                cls = "icon-" + item.classValue;\r\n            \r\n            if(item.ignoreItem != undefined) {\r\n                var ignoreItem = item.ignoreItem ? "ignoreItem":"";\r\n        %>\r\n            <div class="breadcrumb-item <%=ignoreItem%>" data-menuId="<%= id%>"></div>\r\n        <%\r\n            } else {\r\n        %>\r\n            <div class="breadcrumb-item <%=selected%> <%=cls%>" style="<%=style%>" data-menuId="<%= id%>"></div>\r\n        <% }\r\n            });%>\r\n    </div>\r\n<% });%>\r\n'
    }), require(["text!plugins/template/breadcrumb.html"], function(e) {
        if (drcom.isSlideInCommon() && drcom.isPhantom) return;
        Drcom.BreadCrumb = Drcom.Controller.extend({
            pluginName: "drcom_breadcrumb",
            init: function(e, t) {
                this.super.init.apply(this, [e, t]), drcom.waitForPlayer($.proxy(this.render, this))
            },
            render: function() {
                if (this._needRender()) {
                    var t = this._prepareData();
                    this.element.append(_.template(e)({
                        data: t
                    }))
                }
                this.bindEvents()
            },
            bindEvents: function() {
                this.bind(this.element, "tapone", this.callbackEvent(".breadcrumb tapone"))
            },
            ".breadcrumb tapone": function() {
                var e = this._findSitemapId();
                e >= 0 && drcom.gotoSlide(e)
            },
            _needRender: function() {
                return !$(".column", this.element).length
            },
            _findSitemapId: function() {
                var e = _.find(drcom.getSlidesOfFlow(), function(e) {
                    return e.name.toLowerCase().indexOf("sitemap") >= 0
                });
                return e ? e.id : -1
            },
            _prepareData: function() {
                try {
                    return this._filteredData(), this._setUpAllVariable(), this._getData()
                } catch (e) {
                    return []
                }
            },
            _setUpAllVariable: function() {
                this.mainMax = 0, this.mainMin = 0, this.mainMaxPath = 0, this.subMaxPath = 0, this.subMax = 0, this.subMin = 0, this.currentMainPath = 0, this.currentSubPath = 0, this.ignoreRange = 0;
                var e = drcom.getCurrentSlide();
                if (e) {
                    var t = this.slides;
                    this.currentMainPath = parseFloat(e.path.split(".")[0]), this.currentSubPath = parseFloat(e.path.split(".")[1]), this.subMin = 1, _.each(t, function(e, t) {
                        e.path = t + ".0";
                        if (e.submenu) {
                            var n = e.submenu;
                            _.each(n, function(e, n) {
                                e.path = t + "." + (parseFloat(n) + 1)
                            }, this), this.currentMainPath == t && n.length > this.subMaxPath && (this.subMaxPath = n.length)
                        }
                    }, this), this.mainMaxPath = parseFloat(t[t.length - 1].path.split(".")[0]), this._getMainLimit(), this._getSubLimit()
                }
            },
            _filteredData: function() {
                this.slides = [];
                var e = drcom.currentFlowId,
                    t = drcom.getRawSlidesOfFlow();
                this.slides = _.filter(t, function(t) {
                    return !t.hideonslide && !t.hideonmenu || t.id == e
                }), _.each(this.slides, function(t, n) {
                    t.submenu = _.filter(t.submenu, function(t) {
                        return !t.hideonslide && !t.hideonmenu || t.id == e
                    })
                }, this)
            },
            _getMainLimit: function() {
                var e = this.currentMainPath,
                    t = 0,
                    n = 0,
                    r = this.mainMaxPath;
                t = e - 3, t < 0 && (n = -t, t = 0), n = n + e + 3, r - n < 0 && (t -= Math.abs(r - n), n = r, t = t < 0 ? 0 : t), this.mainMin = t, this.mainMax = n
            },
            _getSubLimit: function() {
                var e = this.currentSubPath,
                    t = 0,
                    n = 0,
                    r = this.subMaxPath,
                    i = 0;
                if (r > 6) {
                    t = e - 2, t < 0 && (i = Math.abs(t), t = 1), t == 0 && (i = 1), n = e + 3 + i;
                    if (n > r) {
                        var s = n - r;
                        n = r, t -= s, t - 3 >= 0 ? (this.ignoreRange = t, ++t) : t - 2 == 0 && (this.ignoreRange = t, ++t)
                    } else t > 1 && (this.ignoreRange = 1, ++t)
                } else t = 1, n = 6;
                this.subMin = t, this.subMax = n
            },
            _getData: function() {
                var e = [],
                    t = this.slides,
                    n = this.mainMin,
                    r = this.mainMax,
                    i = this.subMin,
                    s = this.subMax;
                return _.each(t, function(o, u) {
                    var a = [],
                        f = parseFloat(o.path.split(".")[0]),
                        l = parseFloat(o.path.split(".")[1]);
                    if (n <= f && f <= r) {
                        var c = _.clone(o),
                            h = !1;
                        f == n ? h = t[u - 1] == undefined ? !1 : !0 : f == r && (h = t[u + 1] == undefined ? !1 : !0), h && (c.haveMoreNode = !0, c.haveMoreNodeDir = "", this.currentMainPath > f ? c.haveMoreNodeDir = "prev" : c.haveMoreNodeDir = "next"), this._addRenderProperty(c), a.push(c);
                        if (o.submenu) {
                            var p = o.submenu;
                            _.each(p, function(e, t) {
                                var n = parseFloat(e.path),
                                    r = parseFloat(e.path.split(".")[1]);
                                if (i <= r && r <= s) {
                                    var o = _.clone(e),
                                        u = !1;
                                    r == s && (u = p[t + 1] != undefined ? !0 : !1), u && (o.haveMoreNode = !0, o.haveMoreNodeDir = "down"), this._addRenderProperty(o), a.push(o)
                                } else if (this.ignoreRange == r) {
                                    var o = _.clone(e);
                                    o.ignoreItem = !0, a.push(o)
                                }
                            }, this)
                        }
                        e.push(a)
                    }
                }, this), e
            },
            _addRenderProperty: function(e) {
                function r(e) {
                    var n = t,
                        n = e == "next" ? n.next_icon : e == "prev" ? n.prev_icon : e == "active" ? n.active_icon : e == "normal" ? n.list_icon : n.down_icon,
                        r = [];
                    if (n.path.toLowerCase().indexOf(".png") != -1 || n.path.toLowerCase().indexOf(".jpg") != -1) r.push("background-image"), r.push("url(" + n.path + ")");
                    else {
                        switch (e) {
                            case "prev":
                                r.push("border-right-color");
                                break;
                            case "next":
                                r.push("border-left-color");
                                break;
                            case "down":
                                r.push("border-top-color");
                                break;
                            default:
                                r.push("background-color")
                        }
                        r.push(n.color), r.push(e)
                    }
                    return r
                }
                var t = drcom.config.breadcrumb,
                    n = "";
                e.propertyStyle = "", e.propertyValue = "", e.classValue = "", e.id == drcom.getCurrentSlide().id ? style = r("active") : e.haveMoreNode ? style = r(e.haveMoreNodeDir) : style = r("normal"), e.propertyStyle = style[0], e.propertyValue = style[1], e.classValue = style[2]
            }
        }), $.fn.drcom_breadcrumb = function(e) {
            return $(this).each(function() {
                new Drcom.BreadCrumb($(this), e)
            }), $(this)
        };
        if (drcom.config.breadcrumb && drcom.config.breadcrumb.isShow) {
            var t = $("#container"),
                n = $(".breadcrumb"),
                r = $(".breadcrumb_bg");
            n.length || (n = $("<div class='breadcrumb transition'></div>"), t.append(n));
            if (!r.length) {
                r = $("<div class='breadcrumb_bg transition'></div>"), t.append(r);
                var i = drcom.config.breadcrumb.container,
                    s = "",
                    o = "";
                i.path != undefined && i.path.toLowerCase().indexOf(".png") != -1 || i.path.toLowerCase().indexOf(".jpg") != -1 ? (o = "background-image", s = "url(" + i.path + ")") : (o = "background-color", s = i.color), r.css(o, s)
            }
            drcom.breadcrumb = n.drcom_breadcrumb().controller()
        }
    }), define("breadcrumb", function() {}), require([], function() {
        Drcom.Toolbar = Drcom.Controller.extend({
            pluginName: "drcom_toolbar",
            config: drcom.config.toolbar,
            init: function(e, t) {
                this.super.init.apply(this, arguments), $.extend(this.options, {
                    icon: !0,
                    piListCls: "pi-list",
                    alwayShowPiSubmenu: !1
                }, t)
            },
            addAlertButton: function(e) {
                if (this.config.alert) {
                    var t = this.addButton(e, ""),
                        n = this.config.alert.sound || "global/images/alert/bell-ringing.mp3";
                    t.bind("tapone", this.onAlert.bind(this, t)), t.bind("webkitAnimationEnd", this.onRingEnded.bind(this, t)), this.sound = $('<audio><source src="' + n + '" type="audio/mpeg"></audio>').appendTo("body"), this.sound.css({
                        position: "absolute",
                        top: -99999,
                        left: -99999
                    })
                }
            },
            onAlert: function(e) {
                if (!this.alertTimer) {
                    this.alertCount = 0;
                    var t = (this.config.alert.time || 300) * 1e3;
                    beforeEndTime = t - 3e4;
                    var n = this.ringTheBell.bind(this, e);
                    setTimeout(n, beforeEndTime), this.alertTimer = setTimeout(n, t)
                }
            },
            onRingEnded: function(e) {
                this.alertCount++, e.removeClass("active"), this.alertCount >= 2 && (clearTimeout(this.alertTimer), this.alertTimer = null)
            },
            playSound: function() {
                var e = this.sound;
                e && (e = e[0], e.currentTime = 0, e.play(), setTimeout(function() {
                    e.currentTime = 0, e.play()
                }, 6e3))
            },
            ringTheBell: function(e) {
                this.playSound(), e.addClass("active")
            },
            addPiButton: function(e) {
                if (this.config.PI && this.config.PI.length) {
                    var t = $("." + this.options.piListCls);
                    t.length && t.find("div.piItem").bind("tapone", function() {
                        drcom.gotoSlide($(this).data("id"))
                    });
                    var n = this;
                    this.addButton(e, "", function() {
                        var e = $("." + n.options.piListCls);
                        e.length || (e = n._addPIList(), n._reposition(e, $(this))), n.config.PI.length && (n.config.PI.length > 1 || n.config.alwayShowPiSubmenu === !0 ? e.css("display") == "block" ? e.hide() : e.show() : drcom.gotoSlide(n.config.PI[0].gotoSlide))
                    })
                }
            },
            addApprovedCode: function(e) {
                var t = this.config.approvedCode && this.config.approvedCode !== "",
                    n = "." + e.split(" ").join("."),
                    r = $(n),
                    i = $(".approved-popup"),
                    s = this;
                r.length || (r = $('<div class="' + e + '"></div>').appendTo(this.element)), i.length || (i = $('<div class="approved-popup"></div>').appendTo(this.element));
                if (t) {
                    r.addClass("active");
                    var o = this.config.approvedCode,
                        u = $(".popup-content", i);
                    u.length || (u = $('<div class="popup-content">' + o + "</div>"), i.append(u)), this._calculateTextWidth(o, u, function(e) {
                        e > 575 && (e = 575), i.width(e), s._reposition(i, r), r.bind("tapone", function() {
                            i.toggle()
                        })
                    })
                } else r.unbind("tapone")
            },
            addButton: function(e, t, n) {
                var r = $("." + e);
                return r.length || (t = this.options.icon ? "" : t, r = $("<div class='" + e + "'>" + t + "</div>").appendTo(this.element)), n && r.bind("tapone", n), r
            },
            _addPIList: function() {
                var e = $("<div class='" + this.options.piListCls + "'></div>"),
                    t = $('<div class="coverPiItems"></div>'),
                    n = this.config.PI,
                    r = [];
                this.element.append(e.append(t));
                var i = n[0].title;
                return _.each(n, function(e) {
                    var n = $('<div class="piItem" data-id="' + e.gotoSlide + '">' + e.title + "</div>");
                    t.append(n), n.bind("tapone", function() {
                        drcom.gotoSlide($(this).data("id"))
                    }), r.push(n), e.title.length > i.length && (i = e.title)
                }, this), this._calculateTextWidth(i, r[0], function(e) {
                    _.each(r, function(t) {
                        t.width(e)
                    })
                }), e
            },
            _reposition: function(e, t) {
                var n = parseInt(t.css("top"), 10),
                    r = t.height(),
                    i = e.height(),
                    s = -((i - r) / 2);
                e.css({
                    top: n + s
                })
            },
            _calculateTextWidth: function(e, t, n) {
                var r = $('<span style="visibility: hidden; white-space: nowrap;">' + e + "</span>");
                $(document.body).append(r);
                var i = r.width(),
                    s = 1e3,
                    o = !1,
                    u = this;
                r.resize(function(e, s, a) {
                    if (i != s) {
                        o = !0;
                        var f = s + u._getMarginsAndPaddings(t);
                        r.remove(), n && n(f)
                    }
                }), r.css({
                    "font-family": t.css("font-family"),
                    "font-size": t.css("font-size"),
                    "font-weight": t.css("font-weight")
                }), setTimeout(function() {
                    if (!o) {
                        o = !0;
                        var e = r.width() + u._getMarginsAndPaddings(t);
                        n && n(e)
                    }
                    r.remove()
                }, s)
            },
            _getMarginsAndPaddings: function(e) {
                var t = parseInt(e.css("margin-right"), 10),
                    n = parseInt(e.css("margin-left"), 10),
                    r = parseInt(e.css("padding-right"), 10),
                    i = parseInt(e.css("padding-left"), 10),
                    s = t + n + r + i;
                return s
            }
        }), $.fn.drcom_toolbar = function(e) {
            return $(this).each(function() {
                new Drcom.Toolbar($(this), e)
            }), $(this)
        };
        if (drcom.config.toolbar && drcom.config.toolbar.isShow) {
            var e = $(".toolbar");
            e.length || (e = $("<div class='toolbar'></div>").appendTo("#container")), drcom.toolbar = e.drcom_toolbar().controller(), drcom.toolbar.addPiButton("pi-btn btn"), drcom.toolbar.addApprovedCode("approved-code-btn btn"), drcom.toolbar.addAlertButton("alert-btn btn")
        }
    }), define("toolbar", function() {}), require([], function() {
        Drcom.Marker = Drcom.Controller.extend({
            pluginName: "drcom_marker",
            init: function(e, t) {
                this.super.init.apply(this, arguments), $.extend({
                    lineWidth: 1,
                    opacity: 1
                }, this.options, t), this.canvas = this.element[0], this.element.attr("width", this.element.width()), this.element.attr("height", this.element.height()), this.renderColorPicker(), this.reset(), this.render()
            },
            render: function() {
                this.context = this.canvas.getContext("2d"), this.context.lineJoin = "round", this.context.lineCap = "round", this.context.lineWidth = this.options.lineWidth;
                var e = this.hexToRgb(this.options.optionPicker.colors[0]),
                    t = "rgba(" + e.r + "," + e.g + "," + e.b + "," + this.options.opacity + ")";
                this.context.strokeStyle = t, this.currentColor = t, this.bind(this.element, "vmousedown", this.callbackEvent("vmousedown"))
            },
            renderColorPicker: function() {
                var e = {
                    Effect: "",
                    duration: 500
                };
                this.options.optionPicker = $.extend(e, this.options.optionPicker), this.options.optionPicker.colors = function(e) {
                    return e.colors && e.colors.length >= 6 ? e.colors : ["#006dd6", "#96c93c", "#ea2920", "#f7ec5e", "#231f20", "#fff"]
                }(drcom.config.marker || {});
                if (!$(".colorPicker").length) {
                    var t = '<div class="colorPicker"></div><ul class="color-list" style="display:none;">';
                    this.options.optionPicker.colors.forEach(function(e) {
                        t += '<li class="color-item" style="background-color:' + e + '" data-color="' + e + '"></li>'
                    }), t += "</ul>", $(t).appendTo("body")
                } else $(".colorPicker").find(".color-item").each(function(e, t) {
                    t = $(t);
                    var n = this.options.optionPicker.colors[e];
                    t.attr("style", 'background-color:"' + n + '" data-color="' + n + '"')
                });
                var n = this;
                this.bind($(".color-item"), "tapone", function() {
                    n._setBackgroundColorForPicker.apply(n, [$(this).attr("data-color")])
                }), this.bind($(".colorPicker"), "tapone", function() {
                    n.element.toggle(), $(".color-list").toggle(), n.element.css("display") == "none" ? (n.reset(), drcom.enableSwipe()) : (drcom.disableSwipe(), n._setBackgroundColorForPicker.apply(n, [n.options.optionPicker.colors[0]]))
                })
            },
            _setBackgroundColorForPicker: function(e) {
                var t = this.hexToRgb(e),
                    n = "rgba(" + t.r + "," + t.g + "," + t.b + "," + this.options.opacity + ")";
                this.currentColor = n, $(".colorPicker").css("background-color", n)
            },
            hexToRgb: function(e) {
                var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                e = e.replace(t, function(e, t, n, r) {
                    return t + t + n + n + r + r
                });
                var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                return n ? {
                    r: parseInt(n[1], 16),
                    g: parseInt(n[2], 16),
                    b: parseInt(n[3], 16)
                } : null
            },
            addPoint: function(e) {
                this.points.push(e)
            },
            draw: function() {
                this.clear();
                for (var e = 0; e < this.lines.length; e++) {
                    var t = this.lines[e];
                    this.context.beginPath(), this.context.moveTo(t[0].x, t[0].y);
                    for (var n = 1; n < t.length; n++) this.context.lineTo(t[n].x, t[n].y);
                    this.context.strokeStyle = this.colors[e], this.context.stroke(), this.context.closePath()
                }
            },
            vmousedown: function(e, t) {
                this.points = [], this.lines.push(this.points), this.colors.push(this.currentColor), this.addPoint({
                    x: t.offsetX,
                    y: t.offsetY
                }), this.bind(this.element, "vmousemove." + this.pluginName, this.callbackEvent("vmousemove")), this.bind(this.element, "vmouseup." + this.pluginName, this.callbackEvent("vmouseup"))
            },
            vmousemove: function(e, t) {
                this.addPoint({
                    x: t.offsetX,
                    y: t.offsetY
                }), this.draw()
            },
            vmouseup: function(e, t) {
                this.unbind(this.element, "vmousemove." + this.pluginName), this.unbind(this.element, "vmouseup." + this.pluginName)
            },
            exportBase64: function() {
                return this.canvas.toDataURL("image/png")
            },
            clear: function() {
                this.context.clearRect(0, 0, this.element.width(), this.element.height())
            },
            reset: function() {
                this.context && this.clear(), this.points = [], this.lines = [], this.colors = [];
                var e = this.hexToRgb(this.options.optionPicker.colors[0]),
                    t = "rgba(" + e.r + "," + e.g + "," + e.b + "," + this.options.opacity + ")";
                this.context && (this.context.strokeStyle = t), this.currentColor = t, $(".colorPicker").removeAttr("style")
            }
        }), $.fn.drcom_marker = function(e) {
            return this.each(function() {
                new Drcom.Marker($(this), e)
            }), this
        };
        if (drcom.config.marker && drcom.config.marker.isShow) {
            var e = $("#marker");
            e.length || (e = $('<canvas id="marker"></canvas>').appendTo($(document.body))), e.drcom_marker({
                lineWidth: 15,
                opacity: .5
            })
        }
    }), define("marker", function() {}),
    function(e, t, n) {
        function s(e, r) {
            this.wrapper = typeof e == "string" ? t.querySelector(e) : e, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                zoomMin: 1,
                zoomMax: 4,
                startZoom: 1,
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0,
                headerEl: !1
            };
            for (var s in r) this.options[s] = r[s];
            this.translateZ = this.options.HWCompositing && i.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = i.hasTransition && this.options.useTransition, this.options.useTransform = i.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = this.options.eventPassthrough == "vertical" ? !1 : this.options.scrollY, this.options.scrollX = this.options.eventPassthrough == "horizontal" ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = typeof this.options.bounceEasing == "string" ? i.ease[this.options.bounceEasing] || i.ease.circular : this.options.bounceEasing, this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), this.options.shrinkScrollbars == "scale" && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this.scale = n.min(n.max(this.options.startZoom, this.options.zoomMin), this.options.zoomMax), this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }

        function o(e, n, r) {
            var i = t.createElement("div"),
                s = t.createElement("div");
            return r === !0 && (i.style.cssText = "position:absolute;z-index:9999", s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), s.className = "iScrollIndicator", e == "h" ? (r === !0 && (i.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", s.style.height = "100%"), i.className = "iScrollHorizontalScrollbar") : (r === !0 && (i.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", s.style.width = "100%"), i.className = "iScrollVerticalScrollbar"), i.style.cssText += ";overflow:hidden", n || (i.style.pointerEvents = "none"), i.appendChild(s), i
        }

        function u(n, r) {
            this.wrapper = typeof r.el == "string" ? t.querySelector(r.el) : r.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = n, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var s in r) this.options[s] = r[s];
            this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (i.addEvent(this.indicator, "touchstart", this), i.addEvent(e, "touchend", this)), this.options.disablePointer || (i.addEvent(this.indicator, i.prefixPointerEvent("pointerdown"), this), i.addEvent(e, i.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (i.addEvent(this.indicator, "mousedown", this), i.addEvent(e, "mouseup", this))), this.options.fade && (this.wrapperStyle[i.style.transform] = this.scroller.translateZ, this.wrapperStyle[i.style.transitionDuration] = i.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
        }
        var r = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(t) {
                e.setTimeout(t, 1e3 / 60)
            },
            i = function() {
                function o(e) {
                    return s === !1 ? !1 : s === "" ? e : s + e.charAt(0).toUpperCase() + e.substr(1)
                }
                var r = {},
                    i = t.createElement("div").style,
                    s = function() {
                        var e = ["t", "webkitT", "MozT", "msT", "OT"],
                            t, n = 0,
                            r = e.length;
                        for (; n < r; n++) {
                            t = e[n] + "ransform";
                            if (t in i) return e[n].substr(0, e[n].length - 1)
                        }
                        return !1
                    }();
                r.getTime = Date.now || function() {
                    return (new Date).getTime()
                }, r.extend = function(e, t) {
                    for (var n in t) e[n] = t[n]
                }, r.addEvent = function(e, t, n, r) {
                    e.addEventListener(t, n, !!r)
                }, r.removeEvent = function(e, t, n, r) {
                    e.removeEventListener(t, n, !!r)
                }, r.prefixPointerEvent = function(t) {
                    return e.MSPointerEvent ? "MSPointer" + t.charAt(9).toUpperCase() + t.substr(10) : t
                }, r.momentum = function(e, t, r, i, s, o) {
                    var u = e - t,
                        a = n.abs(u) / r,
                        f, l;
                    return o = o === undefined ? 6e-4 : o, f = e + a * a / (2 * o) * (u < 0 ? -1 : 1), l = a / o, f < i ? (f = s ? i - s / 2.5 * (a / 8) : i, u = n.abs(f - e), l = u / a) : f > 0 && (f = s ? s / 2.5 * (a / 8) : 0, u = n.abs(e) + f, l = u / a), {
                        destination: n.round(f),
                        duration: l
                    }
                };
                var u = o("transform");
                return r.extend(r, {
                    hasTransform: u !== !1,
                    hasPerspective: o("perspective") in i,
                    hasTouch: "ontouchstart" in e,
                    hasPointer: e.PointerEvent || e.MSPointerEvent,
                    hasTransition: o("transition") in i
                }), r.isBadAndroid = /Android /.test(e.navigator.appVersion) && !/Chrome\/\d/.test(e.navigator.appVersion), r.extend(r.style = {}, {
                    transform: u,
                    transitionTimingFunction: o("transitionTimingFunction"),
                    transitionDuration: o("transitionDuration"),
                    transitionDelay: o("transitionDelay"),
                    transformOrigin: o("transformOrigin")
                }), r.hasClass = function(e, t) {
                    var n = new RegExp("(^|\\s)" + t + "(\\s|$)");
                    return n.test(e.className)
                }, r.addClass = function(e, t) {
                    if (r.hasClass(e, t)) return;
                    var n = e.className.split(" ");
                    n.push(t), e.className = n.join(" ")
                }, r.removeClass = function(e, t) {
                    if (!r.hasClass(e, t)) return;
                    var n = new RegExp("(^|\\s)" + t + "(\\s|$)", "g");
                    e.className = e.className.replace(n, " ")
                }, r.offset = function(e) {
                    var t = -e.offsetLeft,
                        n = -e.offsetTop;
                    while (e = e.offsetParent) t -= e.offsetLeft, n -= e.offsetTop;
                    return {
                        left: t,
                        top: n
                    }
                }, r.calculateOffset = function(e, t) {
                    var n = parseInt(e.getAttribute("menu-id"), 10),
                        r = e.offsetWidth + 10,
                        i = e.offsetHeight + 10,
                        s = drcom.getRawSlidesOfFlow();
                    for (var o = 0; o < s.length; o++) {
                        var u = s[o];
                        if (n == u.id) return {
                            top: 0,
                            left: -t * r * o
                        };
                        if (u.submenu) {
                            var a = u.submenu;
                            for (var f = 0; f < a.length; f++)
                                if (n == a[f].id) return {
                                    top: -t * (i + i * f),
                                    left: -t * r * o
                                }
                        }
                    }
                }, r.preventDefaultException = function(e, t) {
                    for (var n in t)
                        if (t[n].test(e[n])) return !0;
                    return !1
                }, r.extend(r.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), r.extend(r.ease = {}, {
                    "default": {
                        style: "cubic-bezier(0.25,0.1,0.25,1)"
                    },
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function(e) {
                            return e * (2 - e)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function(e) {
                            return n.sqrt(1 - --e * e)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function(e) {
                            var t = 4;
                            return (e -= 1) * e * ((t + 1) * e + t) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function(e) {
                            return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function(e) {
                            var t = .22,
                                r = .4;
                            return e === 0 ? 0 : e == 1 ? 1 : r * n.pow(2, -10 * e) * n.sin((e - t / 4) * 2 * n.PI / t) + 1
                        }
                    }
                }), r.tap = function(e, n) {
                    var r = t.createEvent("Event");
                    r.initEvent(n, !0, !0), r.pageX = e.pageX, r.pageY = e.pageY, e.target.dispatchEvent(r)
                }, r.click = function(e) {
                    var n = e.target,
                        r;
                    /(SELECT|INPUT|TEXTAREA)/i.test(n.tagName) || (r = t.createEvent("MouseEvents"), r.initMouseEvent("click", !0, !0, e.view, 1, n.screenX, n.screenY, n.clientX, n.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), r._constructed = !0, n.dispatchEvent(r))
                }, r
            }();
        s.prototype = {
            version: "5.1.2",
            _init: function() {
                this._initEvents(), this.options.zoom && this._initZoom(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0), this._execEvent("destroy")
            },
            _transitionEnd: function(e) {
                if (e.target != this.scroller || !this.isInTransition) return;
                this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd"))
            },
            _start: function(e) {
                if (i.eventType[e.type] != 1 && e.button !== 0) return;
                if (!this.enabled || this.initiated && i.eventType[e.type] !== this.initiated) return;
                this.options.preventDefault && !i.isBadAndroid && !i.preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
                var t = e.touches ? e.touches[0] : e,
                    r;
                this.initiated = i.eventType[e.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = i.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, r = this.getComputedPosition(), this._translate(n.round(r.x), n.round(r.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = t.pageX, this.pointY = t.pageY, this._execEvent("beforeScrollStart")
            },
            _move: function(e) {
                if (!this.enabled || i.eventType[e.type] !== this.initiated) return;
                this.options.preventDefault && e.preventDefault();
                var t = e.touches ? e.touches[0] : e,
                    r = t.pageX - this.pointX,
                    s = t.pageY - this.pointY,
                    o = i.getTime(),
                    u, a, f, l;
                this.pointX = t.pageX, this.pointY = t.pageY, this.distX += r, this.distY += s, f = n.abs(this.distX), l = n.abs(this.distY);
                if (o - this.endTime > 300 && f < 10 && l < 10) return;
                !this.directionLocked && !this.options.freeScroll && (f > l + this.options.directionLockThreshold ? this.directionLocked = "h" : l >= f + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n");
                if (this.directionLocked == "h") {
                    if (this.options.eventPassthrough == "vertical") e.preventDefault();
                    else if (this.options.eventPassthrough == "horizontal") {
                        this.initiated = !1;
                        return
                    }
                    s = 0
                } else if (this.directionLocked == "v") {
                    if (this.options.eventPassthrough == "horizontal") e.preventDefault();
                    else if (this.options.eventPassthrough == "vertical") {
                        this.initiated = !1;
                        return
                    }
                    r = 0
                }
                r = this.hasHorizontalScroll ? r : 0, s = this.hasVerticalScroll ? s : 0, u = this.x + r, a = this.y + s;
                if (u > 0 || u < this.maxScrollX) u = this.options.bounce ? this.x + r / 3 : u > 0 ? 0 : this.maxScrollX;
                if (a > 0 || a < this.maxScrollY) a = this.options.bounce ? this.y + s / 3 : a > 0 ? 0 : this.maxScrollY;
                this.directionX = r > 0 ? -1 : r < 0 ? 1 : 0, this.directionY = s > 0 ? -1 : s < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(u, a), o - this.startTime > 300 && (this.startTime = o, this.startX = this.x, this.startY = this.y)
            },
            _end: function(e) {
                if (!this.enabled || i.eventType[e.type] !== this.initiated) return;
                this.options.preventDefault && !i.preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
                var t = e.changedTouches ? e.changedTouches[0] : e,
                    r, s, o = i.getTime() - this.startTime,
                    u = n.round(this.x),
                    a = n.round(this.y),
                    f = n.abs(u - this.startX),
                    l = n.abs(a - this.startY),
                    c = 0,
                    h = "";
                this.isInTransition = 0, this.initiated = 0, this.endTime = i.getTime();
                if (this.resetPosition(this.options.bounceTime)) return;
                this.scrollTo(u, a);
                if (!this.moved) {
                    this.options.tap && i.tap(e, this.options.tap), this.options.click && i.click(e), this._execEvent("scrollCancel");
                    return
                }
                if (this._events.flick && o < 200 && f < 100 && l < 100) {
                    this._execEvent("flick");
                    return
                }
                this.options.momentum && o < 300 && (r = this.hasHorizontalScroll ? i.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                    destination: u,
                    duration: 0
                }, s = this.hasVerticalScroll ? i.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                    destination: a,
                    duration: 0
                }, u = r.destination, a = s.destination, c = n.max(r.duration, s.duration), this.isInTransition = 1);
                if (this.options.snap) {
                    var p = this._nearestSnap(u, a);
                    this.currentPage = p, c = this.options.snapSpeed || n.max(n.max(n.min(n.abs(u - p.x), 1e3), n.min(n.abs(a - p.y), 1e3)), 300), u = p.x, a = p.y, this.directionX = 0, this.directionY = 0, h = this.options.bounceEasing
                }
                if (u != this.x || a != this.y) {
                    if (u > 0 || u < this.maxScrollX || a > 0 || a < this.maxScrollY) h = i.ease.quadratic;
                    this.scrollTo(u, a, c, h);
                    return
                }
                this._execEvent("scrollEnd")
            },
            _resize: function() {
                var e = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                    e.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function(e) {
                var t = this.x,
                    n = this.y;
                return e = e || 0, !this.hasHorizontalScroll || this.x > 0 ? t = 0 : this.x < this.maxScrollX && (t = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? n = 0 : this.y < this.maxScrollY && (n = this.maxScrollY), t == this.x && n == this.y ? !1 : (this.scrollTo(t, n, e, this.options.bounceEasing), !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                var e = this.wrapper.offsetHeight;
                this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = n.round(this.scroller.offsetWidth * this.scale), this.scrollerHeight = n.round(this.scroller.offsetHeight * this.scale), this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = i.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            },
            on: function(e, t) {
                this._events[e] || (this._events[e] = []), this._events[e].push(t)
            },
            off: function(e, t) {
                if (!this._events[e]) return;
                var n = this._events[e].indexOf(t);
                n > -1 && this._events[e].splice(n, 1)
            },
            _execEvent: function(e) {
                if (!this._events[e]) return;
                var t = 0,
                    n = this._events[e].length;
                if (!n) return;
                for (; t < n; t++) this._events[e][t].apply(this, [].slice.call(arguments, 1))
            },
            scrollBy: function(e, t, n, r) {
                e = this.x + e, t = this.y + t, n = n || 0, this.scrollTo(e, t, n, r)
            },
            scrollTo: function(e, t, n, r) {
                r = r || i.ease.default, this.isInTransition = this.options.useTransition && n > 0, !n || this.options.useTransition && r.style ? (this._transitionTime(n), this._translate(e, t)) : this._animate(e, t, n, r.fn)
            },
            scrollToElement: function(e, t, r, s, o) {
                e = e.nodeType ? e : this.scroller.querySelector(e);
                if (!e) return;
                var u = i.offset(e);
                u.left -= this.wrapperOffset.left, u.top -= this.wrapperOffset.top, r === !0 && (r = n.round(e.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), s === !0 && (s = n.round(e.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), u.left -= r || 0, u.top -= s || 0, u.left = u.left > 0 ? 0 : u.left < this.maxScrollX ? this.maxScrollX : u.left, u.top = u.top > 0 ? 0 : u.top < this.maxScrollY ? this.maxScrollY : u.top, t = t === undefined || t === null || t === "auto" ? n.max(n.abs(this.x - u.left), n.abs(this.y - u.top)) : t, this.scrollTo(u.left, u.top, t, o)
            },
            _transitionTime: function(e) {
                e = e || 0, this.scrollerStyle[i.style.transitionDuration] = e + "ms", this.options.headerEl && this.options.headerEl.length && (this.options.headerEl[0].style[i.style.transitionDuration] = e + "ms"), !e && i.isBadAndroid && (this.scrollerStyle[i.style.transitionDuration] = "0.001s");
                if (this.indicators)
                    for (var t = this.indicators.length; t--;) this.indicators[t].transitionTime(e)
            },
            _transitionTimingFunction: function(e) {
                this.scrollerStyle[i.style.transitionTimingFunction] = e, this.options.headerEl && this.options.headerEl.length && (this.options.headerEl[0].style[i.style.transitionTimingFunction] = e);
                if (this.indicators)
                    for (var t = this.indicators.length; t--;) this.indicators[t].transitionTimingFunction(e)
            },
            _translate: function(e, t) {
                this.options.useTransform ? (this.scrollerStyle[i.style.transform] = "translate(" + e + "px," + t + "px) scale(" + this.scale + ") " + this.translateZ, this.options.headerEl && this.options.headerEl.length && (this.options.headerEl[0].style[i.style.transform] = "translate(" + e + "px, 0) scale(" + this.scale + ") " + this.translateZ)) : (e = n.round(e), t = n.round(t), this.scrollerStyle.left = e + "px", this.scrollerStyle.top = t + "px"), this.x = e, this.y = t;
                if (this.indicators)
                    for (var r = this.indicators.length; r--;) this.indicators[r].updatePosition()
            },
            _initEvents: function(t) {
                var n = t ? i.removeEvent : i.addEvent,
                    r = this.options.bindToWrapper ? this.wrapper : e;
                n(e, "orientationchange", this), n(e, "resize", this), this.options.click && n(this.wrapper, "click", this, !0), this.options.disableMouse || (n(this.wrapper, "mousedown", this), n(r, "mousemove", this), n(r, "mousecancel", this), n(r, "mouseup", this)), i.hasPointer && !this.options.disablePointer && (n(this.wrapper, i.prefixPointerEvent("pointerdown"), this), n(r, i.prefixPointerEvent("pointermove"), this), n(r, i.prefixPointerEvent("pointercancel"), this), n(r, i.prefixPointerEvent("pointerup"), this)), i.hasTouch && !this.options.disableTouch && (n(this.wrapper, "touchstart", this), n(r, "touchmove", this), n(r, "touchcancel", this), n(r, "touchend", this)), n(this.scroller, "transitionend", this), n(this.scroller, "webkitTransitionEnd", this), n(this.scroller, "oTransitionEnd", this), n(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var t = e.getComputedStyle(this.scroller, null),
                    n, r;
                return this.options.useTransform ? (t = t[i.style.transform].split(")")[0].split(", "), n = +(t[12] || t[4]), r = +(t[13] || t[5])) : (n = +t.left.replace(/[^-\d.]/g, ""), r = +t.top.replace(/[^-\d.]/g, "")), {
                    x: n,
                    y: r
                }
            },
            _initIndicators: function() {
                function a(e) {
                    for (var t = i.indicators.length; t--;) e.call(i.indicators[t])
                }
                var e = this.options.interactiveScrollbars,
                    t = typeof this.options.scrollbars != "string",
                    n = [],
                    r, i = this;
                this.indicators = [], this.options.scrollbars && (this.options.scrollY && (r = {
                    el: o("v", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: t,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                }, this.wrapper.appendChild(r.el), n.push(r)), this.options.scrollX && (r = {
                    el: o("h", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: t,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                }, this.wrapper.appendChild(r.el), n.push(r))), this.options.indicators && (n = n.concat(this.options.indicators));
                for (var s = n.length; s--;) this.indicators.push(new u(this, n[s]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    a(function() {
                        this.fade()
                    })
                }), this.on("scrollCancel", function() {
                    a(function() {
                        this.fade()
                    })
                }), this.on("scrollStart", function() {
                    a(function() {
                        this.fade(1)
                    })
                }), this.on("beforeScrollStart", function() {
                    a(function() {
                        this.fade(1, !0)
                    })
                })), this.on("refresh", function() {
                    a(function() {
                        this.refresh()
                    })
                }), this.on("destroy", function() {
                    a(function() {
                        this.destroy()
                    }), delete this.indicators
                })
            },
            _initZoom: function() {
                this.scrollerStyle[i.style.transformOrigin] = "0 0"
            },
            _zoomStart: function(e) {
                if (this.options.zoomStartOverride) {
                    var t = this.options.zoomStartOverride;
                    if (t.fn && t.scope) {
                        t.fn.call(t.scope, e);
                        return
                    }
                }
                var r = n.abs(e.touches[0].pageX - e.touches[1].pageX),
                    i = n.abs(e.touches[0].pageY - e.touches[1].pageY);
                this.touchesDistanceStart = n.sqrt(r * r + i * i), this.startScale = this.scale, this.originX = n.abs(e.touches[0].pageX + e.touches[1].pageX) / 2 + this.wrapperOffset.left - this.x, this.originY = n.abs(e.touches[0].pageY + e.touches[1].pageY) / 2 + this.wrapperOffset.top - this.y, this._execEvent("zoomStart")
            },
            _zoom: function(e) {
                if (this.options.zoomOverride) {
                    var t = this.options.zoomOverride;
                    if (t.fn && t.scope) {
                        t.fn.call(t.scope, e);
                        return
                    }
                }
                if (!this.enabled || i.eventType[e.type] !== this.initiated) return;
                this.options.preventDefault && e.preventDefault();
                var r = n.abs(e.touches[0].pageX - e.touches[1].pageX),
                    s = n.abs(e.touches[0].pageY - e.touches[1].pageY),
                    o = n.sqrt(r * r + s * s),
                    u = 1 / this.touchesDistanceStart * o * this.startScale,
                    a, f, l;
                this.scaled = !0, u < this.options.zoomMin ? u = .5 * this.options.zoomMin * n.pow(2, u / this.options.zoomMin) : u > this.options.zoomMax && (u = 2 * this.options.zoomMax * n.pow(.5, this.options.zoomMax / u)), a = u / this.startScale, f = this.originX - this.originX * a + this.startX, l = this.originY - this.originY * a + this.startY, this.scale = u, this.scrollTo(f, l, 0)
            },
            _zoomEnd: function(e) {
                if (this.options.zoomEndOverride) {
                    var t = this.options.zoomEndOverride;
                    if (t.fn && t.scope) {
                        t.fn.call(t.scope, e);
                        return
                    }
                }
                if (!this.enabled || i.eventType[e.type] !== this.initiated) return;
                this.options.preventDefault && e.preventDefault();
                var n, r, s;
                this.isInTransition = 0, this.initiated = 0, this.scale > this.options.zoomMax ? this.scale = this.options.zoomMax : this.scale < this.options.zoomMin && (this.scale = this.options.zoomMin), this.refresh(), s = this.scale / this.startScale, n = this.originX - this.originX * s + this.startX, r = this.originY - this.originY * s + this.startY, n > 0 ? n = 0 : n < this.maxScrollX && (n = this.maxScrollX), r > 0 ? r = 0 : r < this.maxScrollY && (r = this.maxScrollY), (this.x != n || this.y != r) && this.scrollTo(n, r, this.options.bounceTime), this.scaled = !1, this._execEvent("zoomEnd")
            },
            zoom: function(e, t, n, r) {
                e < this.options.zoomMin ? e = this.options.zoomMin : e > this.options.zoomMax && (e = this.options.zoomMax);
                if (e == this.scale) return;
                var i = e / this.scale;
                t = t === undefined ? this.wrapperWidth / 2 : t, n = n === undefined ? this.wrapperHeight / 2 : n, r = r === undefined ? 300 : r, t = t + this.wrapperOffset.left - this.x, n = n + this.wrapperOffset.top - this.y, t = t - t * i + this.x, n = n - n * i + this.y, this.scale = e, this.refresh(), t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(t, n, r)
            },
            zoomToElement: function(e, t, n, r) {
                if (!e || !this.options.useTransform) return;
                e = e.nodeType ? e : this.scroller.querySelector(e), r ? n = n || 400 : n = 0;
                var s = i.calculateOffset(e, t);
                this.scale = t, this.refresh(), s.left > 0 ? s.left = 0 : s.left < this.maxScrollX && (s.left = this.maxScrollX), s.top > 0 ? s.top = 0 : s.top < this.maxScrollY && (s.top = this.maxScrollY), this.scrollTo(s.left, s.top, n)
            },
            _wheelZoom: function(e) {
                var t, r, i = this;
                clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                    i._execEvent("zoomEnd")
                }, 400);
                if ("deltaX" in e) t = -e.deltaY / n.abs(e.deltaY);
                else if ("wheelDeltaX" in e) t = e.wheelDeltaY / n.abs(e.wheelDeltaY);
                else if ("wheelDelta" in e) t = e.wheelDelta / n.abs(e.wheelDelta);
                else {
                    if (!("detail" in e)) return;
                    t = -e.detail / n.abs(e.wheelDelta)
                }
                r = this.scale + t / 5, this.zoom(r, e.pageX, e.pageY, 0)
            },
            _initWheel: function() {
                i.addEvent(this.wrapper, "wheel", this), i.addEvent(this.wrapper, "mousewheel", this), i.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                    i.removeEvent(this.wrapper, "wheel", this), i.removeEvent(this.wrapper, "mousewheel", this), i.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function(e) {
                if (!this.enabled) return;
                e.preventDefault(), e.stopPropagation();
                var t, r, i, s, o = this;
                this.wheelTimeout === undefined && o._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                    o._execEvent("scrollEnd"), o.wheelTimeout = undefined
                }, 400);
                if ("deltaX" in e) t = -e.deltaX, r = -e.deltaY;
                else if ("wheelDeltaX" in e) t = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed, r = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta" in e) t = r = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (!("detail" in e)) return;
                    t = r = -e.detail / 3 * this.options.mouseWheelSpeed
                }
                t *= this.options.invertWheelDirection, r *= this.options.invertWheelDirection, this.hasVerticalScroll || (t = r, r = 0);
                if (this.options.snap) {
                    i = this.currentPage.pageX, s = this.currentPage.pageY, t > 0 ? i-- : t < 0 && i++, r > 0 ? s-- : r < 0 && s++, this.goToPage(i, s);
                    return
                }
                i = this.x + n.round(this.hasHorizontalScroll ? t : 0), s = this.y + n.round(this.hasVerticalScroll ? r : 0), i > 0 ? i = 0 : i < this.maxScrollX && (i = this.maxScrollX), s > 0 ? s = 0 : s < this.maxScrollY && (s = this.maxScrollY), this.scrollTo(i, s, 0)
            },
            _initSnap: function() {
                this.currentPage = {}, typeof this.options.snap == "string" && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                    var e = 0,
                        t, r = 0,
                        i, s, o, u = 0,
                        a, f = this.options.snapStepX || this.wrapperWidth,
                        l = this.options.snapStepY || this.wrapperHeight,
                        c;
                    this.pages = [];
                    if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) return;
                    if (this.options.snap === !0) {
                        s = n.round(f / 2), o = n.round(l / 2);
                        while (u > -this.scrollerWidth) {
                            this.pages[e] = [], t = 0, a = 0;
                            while (a > -this.scrollerHeight) this.pages[e][t] = {
                                x: n.max(u, this.maxScrollX),
                                y: n.max(a, this.maxScrollY),
                                width: f,
                                height: l,
                                cx: u - s,
                                cy: a - o
                            }, a -= l, t++;
                            u -= f, e++
                        }
                    } else {
                        c = this.options.snap, t = c.length, i = -1;
                        for (; e < t; e++) {
                            if (e === 0 || c[e].offsetLeft <= c[e - 1].offsetLeft) r = 0, i++;
                            this.pages[r] || (this.pages[r] = []), u = n.max(-c[e].offsetLeft, this.maxScrollX), a = n.max(-c[e].offsetTop, this.maxScrollY), s = u - n.round(c[e].offsetWidth / 2), o = a - n.round(c[e].offsetHeight / 2), this.pages[r][i] = {
                                x: u,
                                y: a,
                                width: c[e].offsetWidth,
                                height: c[e].offsetHeight,
                                cx: s,
                                cy: o
                            }, u > this.maxScrollX && r++
                        }
                    }
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }), this.on("flick", function() {
                    var e = this.options.snapSpeed || n.max(n.max(n.min(n.abs(this.x - this.startX), 1e3), n.min(n.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, e)
                })
            },
            _nearestSnap: function(e, t) {
                if (!this.pages.length) return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
                var r = 0,
                    i = this.pages.length,
                    s = 0;
                if (n.abs(e - this.absStartX) < this.snapThresholdX && n.abs(t - this.absStartY) < this.snapThresholdY) return this.currentPage;
                e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), t > 0 ? t = 0 : t < this.maxScrollY && (t = this.maxScrollY);
                for (; r < i; r++)
                    if (e >= this.pages[r][0].cx) {
                        e = this.pages[r][0].x;
                        break
                    }
                i = this.pages[r].length;
                for (; s < i; s++)
                    if (t >= this.pages[0][s].cy) {
                        t = this.pages[0][s].y;
                        break
                    }
                return r == this.currentPage.pageX && (r += this.directionX, r < 0 ? r = 0 : r >= this.pages.length && (r = this.pages.length - 1), e = this.pages[r][0].x), s == this.currentPage.pageY && (s += this.directionY, s < 0 ? s = 0 : s >= this.pages[0].length && (s = this.pages[0].length - 1), t = this.pages[0][s].y), {
                    x: e,
                    y: t,
                    pageX: r,
                    pageY: s
                }
            },
            goToPage: function(e, t, r, i) {
                i = i || this.options.bounceEasing, e >= this.pages.length ? e = this.pages.length - 1 : e < 0 && (e = 0), t >= this.pages[e].length ? t = this.pages[e].length - 1 : t < 0 && (t = 0);
                var s = this.pages[e][t].x,
                    o = this.pages[e][t].y;
                r = r === undefined ? this.options.snapSpeed || n.max(n.max(n.min(n.abs(s - this.x), 1e3), n.min(n.abs(o - this.y), 1e3)), 300) : r, this.currentPage = {
                    x: s,
                    y: o,
                    pageX: e,
                    pageY: t
                }, this.scrollTo(s, o, r, i)
            },
            next: function(e, t) {
                var n = this.currentPage.pageX,
                    r = this.currentPage.pageY;
                n++, n >= this.pages.length && this.hasVerticalScroll && (n = 0, r++), this.goToPage(n, r, e, t)
            },
            prev: function(e, t) {
                var n = this.currentPage.pageX,
                    r = this.currentPage.pageY;
                n--, n < 0 && this.hasVerticalScroll && (n = 0, r--), this.goToPage(n, r, e, t)
            },
            _initKeys: function(t) {
                var n = {
                        pageUp: 33,
                        pageDown: 34,
                        end: 35,
                        home: 36,
                        left: 37,
                        up: 38,
                        right: 39,
                        down: 40
                    },
                    r;
                if (typeof this.options.keyBindings == "object")
                    for (r in this.options.keyBindings) typeof this.options.keyBindings[r] == "string" && (this.options.keyBindings[r] = this.options.keyBindings[r].toUpperCase().charCodeAt(0));
                else this.options.keyBindings = {};
                for (r in n) this.options.keyBindings[r] = this.options.keyBindings[r] || n[r];
                i.addEvent(e, "keydown", this), this.on("destroy", function() {
                    i.removeEvent(e, "keydown", this)
                })
            },
            _key: function(e) {
                if (!this.enabled) return;
                var t = this.options.snap,
                    r = t ? this.currentPage.pageX : this.x,
                    s = t ? this.currentPage.pageY : this.y,
                    o = i.getTime(),
                    u = this.keyTime || 0,
                    a = .25,
                    f;
                this.options.useTransition && this.isInTransition && (f = this.getComputedPosition(), this._translate(n.round(f.x), n.round(f.y)), this.isInTransition = !1), this.keyAcceleration = o - u < 200 ? n.min(this.keyAcceleration + a, 50) : 0;
                switch (e.keyCode) {
                    case this.options.keyBindings.pageUp:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? r += t ? 1 : this.wrapperWidth : s += t ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.pageDown:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? r -= t ? 1 : this.wrapperWidth : s -= t ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.end:
                        r = t ? this.pages.length - 1 : this.maxScrollX, s = t ? this.pages[0].length - 1 : this.maxScrollY;
                        break;
                    case this.options.keyBindings.home:
                        r = 0, s = 0;
                        break;
                    case this.options.keyBindings.left:
                        r += t ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.up:
                        s += t ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.right:
                        r -= t ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.down:
                        s -= t ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    default:
                        return
                }
                if (t) {
                    this.goToPage(r, s);
                    return
                }
                r > 0 ? (r = 0, this.keyAcceleration = 0) : r < this.maxScrollX && (r = this.maxScrollX, this.keyAcceleration = 0), s > 0 ? (s = 0, this.keyAcceleration = 0) : s < this.maxScrollY && (s = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(r, s, 0), this.keyTime = o
            },
            _animate: function(e, t, n, s) {
                function c() {
                    var h = i.getTime(),
                        p, d, v;
                    if (h >= l) {
                        o.isAnimating = !1, o._translate(e, t), o.resetPosition(o.options.bounceTime) || o._execEvent("scrollEnd");
                        return
                    }
                    h = (h - f) / n, v = s(h), p = (e - u) * v + u, d = (t - a) * v + a, o._translate(p, d), o.isAnimating && r(c)
                }
                var o = this,
                    u = this.x,
                    a = this.y,
                    f = i.getTime(),
                    l = f + n;
                this.isAnimating = !0, c()
            },
            handleEvent: function(e) {
                switch (e.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(e), this.options.zoom && e.touches && e.touches.length > 1 && this._zoomStart(e);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        if (this.options.zoom && e.touches && e.touches[1]) {
                            this._zoom(e);
                            return
                        }
                        this._move(e);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        if (this.scaled) {
                            this._zoomEnd(e);
                            return
                        }
                        this._end(e);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(e);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        if (this.options.wheelAction == "zoom") {
                            this._wheelZoom(e);
                            return
                        }
                        this._wheel(e);
                        break;
                    case "keydown":
                        this._key(e)
                }
            }
        }, u.prototype = {
            handleEvent: function(e) {
                switch (e.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(e);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(e);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(e)
                }
            },
            destroy: function() {
                this.options.interactive && (i.removeEvent(this.indicator, "touchstart", this), i.removeEvent(this.indicator, i.prefixPointerEvent("pointerdown"), this), i.removeEvent(this.indicator, "mousedown", this), i.removeEvent(e, "touchmove", this), i.removeEvent(e, i.prefixPointerEvent("pointermove"), this), i.removeEvent(e, "mousemove", this), i.removeEvent(e, "touchend", this), i.removeEvent(e, i.prefixPointerEvent("pointerup"), this), i.removeEvent(e, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function(t) {
                var n = t.touches ? t.touches[0] : t;
                t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = n.pageX, this.lastPointY = n.pageY, this.startTime = i.getTime(), this.options.disableTouch || i.addEvent(e, "touchmove", this), this.options.disablePointer || i.addEvent(e, i.prefixPointerEvent("pointermove"), this), this.options.disableMouse || i.addEvent(e, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
            },
            _move: function(e) {
                var t = e.touches ? e.touches[0] : e,
                    n, r, s, o, u = i.getTime();
                this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, n = t.pageX - this.lastPointX, this.lastPointX = t.pageX, r = t.pageY - this.lastPointY, this.lastPointY = t.pageY, s = this.x + n, o = this.y + r, this._pos(s, o), e.preventDefault(), e.stopPropagation()
            },
            _end: function(t) {
                if (!this.initiated) return;
                this.initiated = !1, t.preventDefault(), t.stopPropagation(), i.removeEvent(e, "touchmove", this), i.removeEvent(e, i.prefixPointerEvent("pointermove"), this), i.removeEvent(e, "mousemove", this);
                if (this.scroller.options.snap) {
                    var r = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                        s = this.options.snapSpeed || n.max(n.max(n.min(n.abs(this.scroller.x - r.x), 1e3), n.min(n.abs(this.scroller.y - r.y), 1e3)), 300);
                    if (this.scroller.x != r.x || this.scroller.y != r.y) this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = r, this.scroller.scrollTo(r.x, r.y, s, this.scroller.options.bounceEasing)
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            },
            transitionTime: function(e) {
                e = e || 0, this.indicatorStyle[i.style.transitionDuration] = e + "ms", !e && i.isBadAndroid && (this.indicatorStyle[i.style.transitionDuration] = "0.001s")
            },
            transitionTimingFunction: function(e) {
                this.indicatorStyle[i.style.transitionTimingFunction] = e
            },
            refresh: function() {
                this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (i.addClass(this.wrapper, "iScrollBothScrollbars"), i.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (i.removeClass(this.wrapper, "iScrollBothScrollbars"), i.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
                var e = this.wrapper.offsetHeight;
                this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = n.max(n.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, this.options.shrink == "clip" ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = n.max(n.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.options.shrink == "clip" ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
            },
            updatePosition: function() {
                var e = this.options.listenX && n.round(this.sizeRatioX * this.scroller.x) || 0,
                    t = this.options.listenY && n.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (e < this.minBoundaryX ? (this.options.shrink == "scale" && (this.width = n.max(this.indicatorWidth + e, 8), this.indicatorStyle.width = this.width + "px"), e = this.minBoundaryX) : e > this.maxBoundaryX ? this.options.shrink == "scale" ? (this.width = n.max(this.indicatorWidth - (e - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", e = this.maxPosX + this.indicatorWidth - this.width) : e = this.maxBoundaryX : this.options.shrink == "scale" && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), t < this.minBoundaryY ? (this.options.shrink == "scale" && (this.height = n.max(this.indicatorHeight + t * 3, 8), this.indicatorStyle.height = this.height + "px"), t = this.minBoundaryY) : t > this.maxBoundaryY ? this.options.shrink == "scale" ? (this.height = n.max(this.indicatorHeight - (t - this.maxPosY) * 3, 8), this.indicatorStyle.height = this.height + "px", t = this.maxPosY + this.indicatorHeight - this.height) : t = this.maxBoundaryY : this.options.shrink == "scale" && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = e, this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[i.style.transform] = "translate(" + e + "px," + t + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = e + "px", this.indicatorStyle.top = t + "px")
            },
            _pos: function(e, t) {
                e < 0 ? e = 0 : e > this.maxPosX && (e = this.maxPosX), t < 0 ? t = 0 : t > this.maxPosY && (t = this.maxPosY), e = this.options.listenX ? n.round(e / this.sizeRatioX) : this.scroller.x, t = this.options.listenY ? n.round(t / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(e, t)
            },
            fade: function(e, t) {
                if (t && !this.visible) return;
                clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                var n = e ? 250 : 500,
                    r = e ? 0 : 300;
                e = e ? "1" : "0", this.wrapperStyle[i.style.transitionDuration] = n + "ms", this.fadeTimeout = setTimeout(function(e) {
                    this.wrapperStyle.opacity = e, this.visible = +e
                }.bind(this, e), r)
            }
        }, s.utils = i, typeof module != "undefined" && module.exports ? module.exports = s : e.IScroll = s
    }(window, document, Math), define("iscrollv5", function() {}), define("text!plugins/template/sitemap.html", [], function() {
        return '<div class="content-wrapper">\r\n	<div class="content">\r\n		<ul>\r\n			<% _.each(data, function(item) { %>\r\n				<% if (!item.hideonslide && !item.disabled) { %>\r\n					<li class="menuitem_<%=item.id%>" menu-id="<%=item.id%>" >\r\n						<a>\r\n							<span class="icon"></span>\r\n							<span class="border"></span>\r\n							<span class="text"><%= item.title %></span>\r\n							<img src="thumbnails/<%= item.name %>.jpg" />\r\n						</a>\r\n						<% if (item.submenu) { %>\r\n							<ul>\r\n								<% _.each(item.submenu, function(submenu) { %>\r\n									<% if (!submenu.hideonslide && !submenu.disabled) { %>\r\n										<li class="menuitem_<%=submenu.id%>" menu-id="<%=submenu.id%>" >\r\n											<a>\r\n												<span class="icon"></span>\r\n												<span class="border"></span>\r\n												<span class="text"><%= submenu.title %></span>\r\n												<img src="thumbnails/<%= submenu.name %>.jpg" />\r\n											</a>\r\n										</li>\r\n									<% } %>\r\n								<% }); %>\r\n							</ul>\r\n						<% } %>\r\n					</li>\r\n				<% } %>\r\n			<% });%>\r\n		</ul>\r\n	</div>\r\n</div>\r\n'
    }), define("text!plugins/template/sitemap_multiflows.html", [], function() {
        return '<div class="tabs sky-tabs">\r\n	<ul>\r\n		<% var i = 1; %>\r\n		<% _.each(data, function(items, flow) { %>\r\n			<li class="tab sky-tab-content-<%= i %>" flow-id="<%= flow %>">\r\n				<div class="tab-content">\r\n					<div class="headers">\r\n						<ul class="headers-content">\r\n							<% _.each(items, function(item) { %>\r\n							<% if (!item.hideonslide) %>\r\n								<li><div class="header"><%= item.sitemaptitle || item.title %></div></li>\r\n							<% }); %>\r\n						</ul>\r\n					</div>\r\n					<div class="content-wrapper">\r\n						<div class="content">\r\n							<ul>\r\n								<% _.each(items, function(item) { %>\r\n									<% if (!item.hideonslide && !item.disabled) { %>\r\n										<li class="menuitem_<%= item.id %>" menu-id="<%= item.id %>" >\r\n											<a>\r\n												<span class="icon"></span>\r\n												<span class="border"></span>\r\n												<span class="text"><%= item.title %></span>\r\n												<img src="thumbnails/<%= item.name %>.jpg" />\r\n											</a>\r\n											<% if (item.submenu) { %>\r\n												<ul>\r\n													<% _.each(item.submenu, function(submenu) { %>\r\n														<% if (!submenu.hideonslide && !submenu.disabled) { %>\r\n															<li class="menuitem_<%= submenu.id %>" menu-id="<%=submenu.id%>" >\r\n																<a>\r\n																	<span class="icon"></span>\r\n																	<span class="border"></span>\r\n																	<span class="text"><%= submenu.title %></span>\r\n																	<img src="thumbnails/<%= submenu.name %>.jpg" />\r\n																</a>\r\n															</li>\r\n														<% } %>\r\n													<% }); %>\r\n												</ul>\r\n											<% } %>\r\n										</li>\r\n									<% } %>\r\n								<% });%>\r\n							</ul>\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</li>\r\n			<% i++; %>\r\n		<% }); %>\r\n	</ul>\r\n</div>\r\n\r\n'
    }), require(["text!plugins/template/sitemap.html", "text!plugins/template/sitemap_multiflows.html"], function(e, t) {
        if (drcom.isPhantom) return;
        drcom.config.sitemap && drcom.config.sitemap.isMultiFlows ? Drcom.SiteMap = Drcom.Controller.extend({
            pluginName: "drcom_sitemap",
            init: function(e, t) {
                t.iscrollOptions = $.extend({}, {
                    zoom: !0,
                    scrollX: !0,
                    scrollbars: "custom",
                    bounce: !1,
                    hideScrollbar: !1,
                    fixedScrollbar: !0,
                    enableDoubleTap: !1,
                    useTransform: !0,
                    zoomStartOverride: {
                        scope: this,
                        fn: this.zoomStartOverride
                    },
                    zoomOverride: {
                        scope: this,
                        fn: this.zoomOverride
                    },
                    zoomEndOverride: {
                        scope: this,
                        fn: this.zoomEndOverride
                    },
                    zoomEnd: this.callbackEvent("onZoomEnd")
                }, t.iscrollOptions), this.super.init.apply(this, [e, t]), this.currentMenuId = drcom.storage.get("prevSlide") || drcom.menuItem, drcom.waitForPlayer($.proxy(this.render, this))
            },
            bindEvents: function() {
                this.on("tapone", $(".tabs .content", this.element), "li:not(.disabled)", this.callbackEvent("li:not(.disabled) tapone")), this.on("tapone", this.element, ".tab-btn", this.callbackEvent("tab tapone"))
            },
            "li:not(.disabled) tapone": function(e, t) {
                var n = this.currentFlow,
                    r = drcom.getSlide(e.attr("menu-id"), n);
                drcom.gotoPresentation(r.name, n), t.stopImmediatePropagation()
            },
            "tab tapone": function(e) {
                e = $(e);
                var t = e.attr("flow-id"),
                    n = drcom.allFlowKeys();
                if (t === n[0] && !drcom.config.sitemap.showHome) {
                    var r = drcom.getSlide(1, t);
                    drcom.gotoPresentation(r.name, t)
                } else t !== this.currentTabBtn.attr("flow-id") && (e.addClass("actived"), this.currentTabBtn.removeClass("actived"), this.currentTabBtn = e, this.currentFlow = t, this._switchSitemap())
            },
            render: function() {
                this.currentFlow = drcom.currentFlowId, this._needRender() && this.element.append(_.template(t)({
                    data: menudata
                })), this.currentTab = this.getTabOfFlow(this.currentFlow), this.headersHeight = this.currentTab.find(".headers").height(), this._updateSitemapView(), this.bindEvents();
                var e = $(".tabs .content", this.element),
                    n = $(".tabs .headers-content", this.element),
                    r = this.options.iscrollOptions,
                    i = this.headersHeight * r.zoomStart,
                    s = "-webkit-transform-origin: 0px 0px; -webkit-transform: translate(0px, 0px) scale(" + r.zoomStart + ") translateZ(0px);";
                n.attr("style", s), n.parent().height(i);
                if (!this.allScrolls) {
                    this.allScrolls = {};
                    var o = 0,
                        u = drcom.allFlowKeys();
                    _.each(u, function(t) {
                        var i = this.getTabOfFlow(t);
                        i.show();
                        var s = $.extend({
                            headerEl: $(n[o])
                        }, r);
                        sitemapScroll = new IScroll(e[o], s), sitemapScroll.zoom(r.zoomStart || 1, 629, 442, 0), t !== this.currentFlow && i.hide(), this.allScrolls[t] = sitemapScroll, o++
                    }, this)
                }
                this.currentTab.show(), this._updateCurrentSlide(), this._updateScrollBar()
            },
            getActiveScroll: function() {
                return this.allScrolls[this.currentFlow]
            },
            getActiveHeaders: function() {
                return this.currentTab.find(".tab-content .headers-content")
            },
            getActiveContent: function() {
                return this.currentTab.find(".tab-content .content")
            },
            getTabOfFlow: function(e) {
                return $(".tabs .tab[flow-id=" + e + "]", this.element)
            },
            zoomStartOverride: function(e) {
                var t = e.touches[0],
                    n = e.touches[1];
                this.dist = this._distance({
                    x: t.pageX,
                    y: t.pageY
                }, {
                    x: n.pageX,
                    y: n.pageY
                })
            },
            zoomOverride: function(e) {
                if (this.customZoom) return;
                var t = e.touches[0],
                    n = e.touches[1],
                    r = this._distance({
                        x: t.pageX,
                        y: t.pageY
                    }, {
                        x: n.pageX,
                        y: n.pageY
                    }),
                    i = r - this.dist,
                    s = Math.abs(i),
                    o = this.getActiveScroll(),
                    u = this.currentTab.find(".content .current"),
                    a = u.length ? u[0] : null,
                    f = 500;
                if (s >= 20) {
                    this.customZoom = !0, i > 0 ? a && o.scale != o.options.zoomMax ? o.zoomToElement(a, o.options.zoomMax, f, !0) : o.zoom(o.options.zoomMax, 0, 0, f) : a && o.scale != o.options.zoomMin ? o.zoomToElement(a, o.options.zoomMin, f, !0) : o.zoom(o.options.zoomMin, 0, 0, f), this.onZoomEnd();
                    var l = this;
                    setTimeout(function() {
                        l.customZoom = !1
                    }, 400)
                }
            },
            zoomEndOverride: function() {},
            onZoomEnd: function() {
                this._updateZoomBtnState(), this._updateScrollBar(), this._updateHeaderStyle(!0), this._updateHeaderParentHeight(!0)
            },
            _needRender: function() {
                if (!$(".tabs", this.element).length) return !0;
                var e = this.element.find(".content"),
                    t = drcom.allFlowKeys().length;
                return e.length < t ? !0 : !1
            },
            _distance: function(e, t) {
                return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
            },
            _updateSitemapView: function() {
                var e = $(".tab-btn-bar .tab-btn", this.element),
                    t = drcom.allFlowKeys();
                _.each(e, function(e, n) {
                    var r = t[n];
                    $(e).attr("flow-id", r).removeClass("actived"), r === this.currentFlow && (this.currentTabBtn = $(e), this.currentTabBtn.addClass("actived"))
                }, this), $(".iScrollLoneScrollbar,.iScrollVerticalScrollbar,.iScrollHorizontalScrollbar", this.element).remove()
            },
            _updateScrollBar: function() {
                $(".tab-content").each(function(e, t) {
                    t = $(t);
                    var n = t.find(".content");
                    $(".iScrollLoneScrollbar", n).length && $(".iScrollLoneScrollbar", n).insertAfter(n), $(".iScrollVerticalScrollbar", n).length && $(".iScrollVerticalScrollbar", n).insertAfter(n), $(".iScrollHorizontalScrollbar", n).length && $(".iScrollHorizontalScrollbar", n).insertAfter(n)
                })
            },
            _updateCurrentSlide: function() {
                var e = this.currentMenuId;
                if (this.currentTab.length) {
                    var t = this.getActiveContent(),
                        n = this.getActiveHeaders(),
                        r = t.find(">ul>li"),
                        i = n.find(">li"),
                        s = this.allScrolls[this.currentFlow];
                    for (var o = 0; o < r.length; o++) {
                        var u = $(r[o]);
                        if (u.attr("menu-id") == e) {
                            u.addClass("current"), $(i[o]).addClass("current"), s.zoomToElement(u[0], s.scale, 0, !1);
                            break
                        }
                        var a = u.find("ul>li");
                        if (a.length) {
                            var f = !1;
                            for (var l = 0; l < a.length; l++) {
                                var c = $(a[l]);
                                if (c.attr("menu-id") == e) {
                                    f = !0, c.addClass("current"), $(i[o]).addClass("current"), s.zoomToElement(c[0], s.scale, 0, !1);
                                    break
                                }
                            }
                            if (f) break
                        }
                    }
                }
            },
            _updateHeaderStyle: function(e) {
                var t = this._styleForHeader(),
                    n = this.getActiveHeaders();
                n.attr("style", t.style), e && n.parent().css({
                    "-webkit-transform": "translate(0, " + t.translateY + "px)"
                })
            },
            _updateHeaderParentHeight: function(e) {
                var t = this.getActiveScroll().scale,
                    n = this.getActiveHeaders();
                n.parent().css({
                    "-webkit-transition": e ? "400ms" : "none",
                    height: t * this.headersHeight
                })
            },
            _resetHeaderParentPosition: function() {
                var e = this.getActiveHeaders();
                e.parent().css({
                    "-webkit-transition": "400ms",
                    "-webkit-transform": "translate(0, 0)"
                })
            },
            _styleForHeader: function() {
                var e = this.getActiveScroll(),
                    t = e.scroller.getAttribute("style"),
                    n = "translate(";
                if (t.indexOf(n) >= 0) {
                    var r = t.indexOf(n),
                        i = -1;
                    for (var s = r; s < t.length; s++)
                        if (t.charAt(s) === ")") {
                            i = s;
                            break
                        }
                    if (i >= 0) {
                        var o = t.substring(r + n.length, i).split(", "),
                            u = o[0],
                            a = parseInt(o[1], 10);
                        a = a < 0 ? 0 : a;
                        var f = t.substring(0, r),
                            l = " translate(" + u + ", 0)",
                            c = t.substring(i + 1, t.length);
                        return {
                            style: f + l + c,
                            translateY: a
                        }
                    }
                }
                return ""
            },
            _switchSitemap: function() {
                this.currentTab.hide(), this.currentTab = this.getTabOfFlow(this.currentFlow), this.currentTab.show(), this._updateZoomBtnState()
            },
            _updateZoomBtnState: function() {
                if (this.zoomBtn) {
                    var e = this.getActiveScroll();
                    e.scale > e.options.zoomMin ? this.zoomBtn.addClass("zoom-in") : this.zoomBtn.removeClass("zoom-in")
                }
            }
        }) : Drcom.SiteMap = Drcom.Controller.extend({
            pluginName: "drcom_sitemap",
            init: function(e, t) {
                t.iscrollOptions = $.extend({}, {
                    zoom: !0,
                    scrollX: !0,
                    scrollbars: "custom",
                    bounce: !1,
                    hideScrollbar: !1,
                    fixedScrollbar: !0,
                    enableDoubleTap: !1,
                    useTransform: !0,
                    zoomStartOverride: {
                        scope: this,
                        fn: this.zoomStartOverride
                    },
                    zoomOverride: {
                        scope: this,
                        fn: this.zoomOverride
                    },
                    zoomEndOverride: {
                        scope: this,
                        fn: this.zoomEndOverride
                    },
                    zoomEnd: this.callbackEvent("onZoomEnd")
                }, t.iscrollOptions), this.currentMenuId = drcom.storage.get("prevSlide") || drcom.menuItem, this.super.init.apply(this, [e, t]), this.render()
            },
            bindEvents: function() {
                this.on("tapone", this.content, "li:not(.disabled)", this.callbackEvent("li:not(.disabled) tapone"))
            },
            "li:not(.disabled) tapone": function(e, t) {
                return drcom.gotoSlide(e.attr("menu-id")), t.stopImmediatePropagation(), !1
            },
            render: function() {
                this._needRender() && ($(".content-wrapper", this.element).remove(), this.element.append(_.template(e)({
                    data: menudata
                }))), this.headers = $(".headers-content", this.element), this.content = $(".content", this.element), this.headersHeight = $(".headers", this.element).height() / this.options.iscrollOptions.zoomStart, this._calculateContentWidth(), this.bindEvents();
                var t = this.options.iscrollOptions,
                    n = "-webkit-transform-origin: 0px 0px; -webkit-transform: translate(0px, 0px) scale(" + t.zoomStart + ") translateZ(0px);";
                this.headers.attr("style", n), this.sitemapIscroll = new IScroll(this.content[0], $.extend({
                    headerEl: this.headers
                }, t)), t.zoomStart && this.sitemapIscroll.zoom(t.zoomStart, 629, 442, 0), this._updateCurrentSlide(), this._updateScrollBar()
            },
            zoomStartOverride: function(e) {
                var t = e.touches[0],
                    n = e.touches[1];
                this.dist = this._distance({
                    x: t.pageX,
                    y: t.pageY
                }, {
                    x: n.pageX,
                    y: n.pageY
                })
            },
            zoomOverride: function(e) {
                if (this.customZoom) return;
                var t = e.touches[0],
                    n = e.touches[1],
                    r = this._distance({
                        x: t.pageX,
                        y: t.pageY
                    }, {
                        x: n.pageX,
                        y: n.pageY
                    }),
                    i = r - this.dist,
                    s = Math.abs(i),
                    o = this.sitemapIscroll,
                    u = this.content.find(".active");
                u.length || (u = this.content.find("li")), u = u[0];
                if (s >= 20) {
                    this.customZoom = !0, i > 0 ? o.scale < o.options.zoomMax && o.zoomToElement(u, o.options.zoomMax, 400, !0) : o.scale > o.options.zoomMin && o.zoomToElement(u, o.options.zoomMin, 400, !0), this.onZoomEnd();
                    var a = this;
                    setTimeout(function() {
                        a.customZoom = !1
                    }, 400)
                }
            },
            zoomEndOverride: function() {},
            onZoomEnd: function() {
                this.sitemapIscroll.scale > this.sitemapIscroll.options.zoomMin ? $(".zoom-btn").addClass("zoom-in") : $(".zoom-btn").removeClass("zoom-in"), this._updateScrollBar(), this._updateHeaderStyle(), this._updateHeaderParentHeight(!0)
            },
            _calculateContentWidth: function() {
                var e = this.content.find(">ul"),
                    t = e.find(">li"),
                    n = 0;
                t.each(function() {
                    var e = $(this),
                        t = parseInt(e.css("margin-right")),
                        r = parseInt(e.css("margin-left")),
                        i = parseInt(e.css("padding-right")),
                        s = parseInt(e.css("padding-left"));
                    n += e.width() + t + r + i + s
                }), e.width(n)
            },
            _distance: function(e, t) {
                return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
            },
            _needRender: function() {
                return $(".content-wrapper .content", this.element).length ? $(".content-wrapper .content li", this.element).length ? !1 : !0 : !0
            },
            _updateScrollBar: function() {
                $(".iScrollVerticalScrollbar", this.content).length && $(".iScrollVerticalScrollbar").insertAfter(this.content), $(".iScrollHorizontalScrollbar", this.content).length && $(".iScrollHorizontalScrollbar").insertAfter(this.content)
            },
            _updateCurrentSlide: function() {
                var e = this.currentMenuId,
                    t = this.content.find(">ul>li"),
                    n = this.headers.find(">li"),
                    r = this.sitemapIscroll;
                for (var i = 0; i < t.length; i++) {
                    var s = $(t[i]);
                    if (s.attr("menu-id") == e) {
                        s.addClass("current"), $(n[i]).addClass("current"), r.zoomToElement(s[0], r.scale, 0, !1);
                        break
                    }
                    var o = s.find("ul>li");
                    if (o.length) {
                        var u = !1;
                        for (var a = 0; a < o.length; a++) {
                            var f = $(o[a]);
                            if (f.attr("menu-id") == e) {
                                u = !0, f.addClass("current"), $(n[i]).addClass("current"), r.zoomToElement(f[0], r.scale, 0, !1);
                                break
                            }
                        }
                        if (u) break
                    }
                }
            },
            _updateHeaderStyle: function() {
                var e = this._styleForHeader();
                this.headers.attr("style", this._styleForHeader())
            },
            _updateHeaderParentHeight: function(e) {
                this.headers.parent().css({
                    "-webkit-transition": e ? "all 0.4s" : "none",
                    height: this.sitemapIscroll.scale * this.headersHeight
                })
            },
            _resetHeaderParentPosition: function() {
                this.headers.parent().css({
                    "-webkit-transition": "all 0.15s",
                    "-webkit-transform": "translate(0, 0)"
                })
            },
            _styleForHeader: function() {
                var e = this.sitemapIscroll.scroller.getAttribute("style"),
                    t = "translate(";
                if (e.indexOf(t) >= 0) {
                    var n = e.indexOf(t),
                        r = -1;
                    for (var i = n; i < e.length; i++)
                        if (e.charAt(i) === ")") {
                            r = i;
                            break
                        }
                    if (r >= 0) {
                        var s = e.substring(n + t.length, r).split(", "),
                            o = s[0],
                            u = parseInt(s[1], 10);
                        u = u < 0 ? 0 : u;
                        var a = e.substring(0, n),
                            f = " translate(" + o + ", 0)",
                            l = e.substring(r + 1, e.length);
                        return a + f + l
                    }
                }
                return ""
            }
        }), $.fn.drcom_sitemap = function(e) {
            return this.each(function() {
                new Drcom.SiteMap($(this), e)
            }), this
        };
        if (drcom.config.sitemap && drcom.config.sitemap.isShow) {
            drcom.disableSwipe();
            var n = $("#sitemap"),
                r = $(".backBtn"),
                i = $("#container");
            n.length || (n = $("<div id='sitemap' class='transition'></div>").appendTo(i)), r.length || (r = $("<div class='backBtn'></div>").appendTo(i)), r.bind("tapone", function() {
                drcom.gotoSlide(drcom.storage.get("prevSlide") || drcom.menuItem)
            });
            var s = drcom.config.sitemap,
                o = {
                    zoomMin: s.zoomMin || .4,
                    zoomMax: s.zoomMax || 1,
                    zoomStart: s.zoomStart || .4
                };
            s.panToZoom || (o = $.extend(o, {
                zoomStartOverride: !1,
                zoomOverride: !1,
                zoomEndOverride: !1,
                zoom: !1
            })), o.zoomStart < o.zoomMin && (o.zoomStart = o.zoomMin), o.zoomStart > o.zoomMax && (o.zoomStart = o.zoomMax), drcom.sitemap = n.drcom_sitemap({
                iscrollOptions: o
            }).controller();
            if (drcom.toolbar) {
                var u = function() {
                    var e = drcom.sitemap,
                        t = e.getActiveScroll ? e.getActiveScroll() : e.sitemapIscroll,
                        n = e.currentTab ? e.currentTab.find(".content .current") : e.element.find(".content .current"),
                        r = n.length ? n[0] : null,
                        i = 500;
                    t.scale <= 1 && t.scale != t.options.zoomMin ? r ? t.zoomToElement(r, t.options.zoomMin, i, !0) : t.zoom(t.options.zoomMin, 0, 0, i) : t.scale != t.options.zoomMax && (r ? t.zoomToElement(r, t.options.zoomMax, i, !0) : t.zoom(t.options.zoomMax, 0, 0, i)), e.onZoomEnd()
                };
                drcom.sitemap.zoomBtn = drcom.toolbar.addButton("zoom-btn btn", "", u)
            }
        }
    }), define("sitemap", function() {});
var UNDEFINED, doc = document,
    win = window,
    math = Math,
    mathRound = math.round,
    mathFloor = math.floor,
    mathCeil = math.ceil,
    mathMax = math.max,
    mathMin = math.min,
    mathAbs = math.abs,
    mathCos = math.cos,
    mathSin = math.sin,
    mathPI = math.PI,
    SVG_NS = "http://www.w3.org/2000/svg",
    M = "M",
    L = "L",
    NONE = "none",
    PREFIX = "drcom_svg_",
    Renderer, hasTouch, symbolSizes = {},
    idCounter = 0,
    pathAnim, timers = [],
    timerId, animSetters = {},
    Fx;
Math.easeInOutSine = function(e, t, n, r) {
    return -n / 2 * (Math.cos(Math.PI * e / r) - 1) + t
}, pathAnim = {
    init: function(e, t, n) {
        t = t || "";
        var r = e.shift,
            i = t.indexOf("C") > -1,
            s = i ? 7 : 3,
            o, u, a, f = t.split(" "),
            l = [].concat(n),
            c, h, p = function(e) {
                a = e.length;
                while (a--) e[a] === M && e.splice(a + 1, 0, e[a + 1], e[a + 2], e[a + 1], e[a + 2])
            };
        i && (p(f), p(l)), e.isArea && (c = f.splice(f.length - 6, 6), h = l.splice(l.length - 6, 6));
        if (r <= l.length / s && f.length === l.length)
            while (r--) l = [].concat(l).splice(0, s).concat(l);
        e.shift = 0;
        if (f.length) {
            o = l.length;
            while (f.length < o) u = [].concat(f).splice(f.length - s, s), i && (u[s - 6] = u[s - 2], u[s - 5] = u[s - 1]), f = f.concat(u)
        }
        return c && (f = f.concat(c), l = l.concat(h)), [f, l]
    },
    step: function(e, t, n, r) {
        var i = [],
            s = e.length,
            o;
        if (n === 1) i = r;
        else if (s === t.length && n < 1)
            while (s--) o = parseFloat(e[s]), i[s] = isNaN(o) ? e[s] : n * parseFloat(t[s] - o) + o;
        else i = t;
        return i
    }
}, Fx = function(e, t, n) {
    this.options = t, this.elem = e, this.prop = n
}, Fx.prototype = {
    update: function() {
        var e, t = this.paths,
            n = this.elem,
            r = n.element;
        animSetters[this.prop] ? animSetters[this.prop](this) : t && r ? n.attr("d", pathAnim.step(t[0], t[1], this.now, this.toD)) : n.attr ? r && n.attr(this.prop, this.now) : (e = {}, e[this.prop] = this.now + this.unit, css(n, e)), this.options.step && this.options.step.call(this.elem, this.now, this)
    },
    custom: function(e, t, n) {
        var r = this,
            i = function(e) {
                return r.step(e)
            },
            s;
        this.startTime = +(new Date), this.start = e, this.end = t, this.unit = n, this.now = this.start, this.pos = this.state = 0, i.elem = this.elem, i() && timers.push(i) === 1 && (timerId = setInterval(function() {
            for (s = 0; s < timers.length; s++) timers[s]() || timers.splice(s--, 1);
            timers.length || clearInterval(timerId)
        }, 13))
    },
    step: function(e) {
        var t = +(new Date),
            n, r, i = this.options,
            s = this.elem,
            o;
        if (s.stopAnimation || s.attr && !s.element) n = !1;
        else if (e || t >= i.duration + this.startTime) {
            this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0, r = !0;
            for (o in i.curAnim) i.curAnim[o] !== !0 && (r = !1);
            r && i.complete && i.complete.call(s), n = !1
        } else {
            var u = t - this.startTime;
            this.state = u / i.duration, this.pos = i.easing(u, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(), n = !0
        }
        return n
    }
}, SVGElement.prototype = {
    opacity: 1,
    textProps: ["fontSize", "fontWeight", "fontFamily", "color", "lineHeight", "width", "textDecoration", "textShadow", "HcTextStroke"],
    init: function(e, t) {
        var n = this;
        n.element = t === "span" ? createElement(t) : doc.createElementNS(SVG_NS, t), n.renderer = e
    },
    animate: function(e, t, n) {
        var r = pick(t, !0);
        return stop(this), r ? (r = merge(r, {}), n && (r.complete = n), animate(this, e, r)) : (this.attr(e), n && n()), this
    },
    attr: function(e, t) {
        var n, r, i = this.element,
            s, o = this,
            u;
        typeof e == "string" && t !== UNDEFINED && (n = e, e = {}, e[n] = t);
        if (typeof e == "string") o = (this[e + "Getter"] || this._defaultGetter).call(this, e, i);
        else {
            for (n in e) r = e[n], u = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(n) && (s || (this.symbolAttr(e), s = !0), u = !0), this.rotation && (n === "x" || n === "y") && (this.doTransform = !0), u || (this[n + "Setter"] || this._defaultSetter).call(this, r, n, i);
            this.doTransform && (this.updateTransform(), this.doTransform = !1)
        }
        return o
    },
    symbolAttr: function(e) {
        var t = this;
        each(["x", "y", "r", "start", "end", "width", "height", "innerR", "anchorX", "anchorY"], function(n) {
            t[n] = pick(e[n], t[n])
        }), t.attr({
            d: t.renderer.symbols[t.symbolName](t.x, t.y, t.width, t.height, t)
        })
    },
    clip: function(e) {
        return this.attr("clip-path", e ? "url(#" + e.id + ")" : NONE)
    },
    css: function(e) {
        var t = this,
            n = t.styles,
            r = {},
            i = t.element,
            s, o, u = "",
            a, f = !n;
        e && e.color && (e.fill = e.color);
        if (n)
            for (o in e) e[o] !== n[o] && (r[o] = e[o], f = !0);
        if (f) {
            s = t.textWidth = e && e.width && i.nodeName.toLowerCase() === "text" && pInt(e.width), n && (e = extend(n, r)), t.styles = e, s && (useCanVG || !hasSVG && t.renderer.forExport) && delete e.width, a = function(e, t) {
                return "-" + t.toLowerCase()
            };
            for (o in e) u += o.replace(/([A-Z])/g, a) + ":" + e[o] + ";";
            attr(i, "style", u), s && t.added && t.renderer.buildText(t)
        }
        return t
    },
    on: function(e, t) {
        var n = this,
            r = n.element;
        return hasTouch && e === "click" ? (r.ontouchstart = function(e) {
            n.touchEventFired = Date.now(), e.preventDefault(), t.call(r, e)
        }, r.onclick = function(e) {
            (userAgent.indexOf("Android") === -1 || Date.now() - (n.touchEventFired || 0) > 1100) && t.call(r, e)
        }) : r["on" + e] = t, this
    },
    translate: function(e, t) {
        return this.attr({
            translateX: e,
            translateY: t
        })
    },
    rotate: function(e, t, n) {
        this.attr("transform", "rotate(" + e + " " + t + " " + n + ")")
    },
    invert: function() {
        var e = this;
        return e.inverted = !0, e.updateTransform(), e
    },
    updateTransform: function() {
        var e = this,
            t = e.translateX || 0,
            n = e.translateY || 0,
            r = e.scaleX,
            i = e.scaleY,
            s = e.inverted,
            o = e.rotation,
            u = e.element,
            a;
        s && (t += e.attr("width"), n += e.attr("height")), a = ["translate(" + t + "," + n + ")"], s ? a.push("rotate(90) scale(-1,1)") : o && a.push("rotate(" + o + " " + (u.getAttribute("x") || 0) + " " + (u.getAttribute("y") || 0) + ")"), (defined(r) || defined(i)) && a.push("scale(" + pick(r, 1) + " " + pick(i, 1) + ")"), a.length && u.setAttribute("transform", a.join(" "))
    },
    show: function(e) {
        return e && this.element.namespaceURI === SVG_NS ? this.element.removeAttribute("visibility") : this.attr({
            visibility: e ? "inherit" : VISIBLE
        }), this
    },
    hide: function() {
        return this.attr({
            visibility: HIDDEN
        })
    },
    fadeOut: function(e) {
        var t = this;
        t.animate({
            opacity: 0
        }, {
            duration: e || 150,
            complete: function() {
                t.attr({
                    y: -9999
                })
            }
        })
    },
    add: function(e) {
        var t = this.renderer,
            n = e || t,
            r = n.element || t.box,
            i, s = this.element,
            o = this.zIndex,
            u, a, f, l;
        e && (this.parentGroup = e), this.parentInverted = e && e.inverted, this.textStr !== undefined && t.buildText(this), o && (n.handleZ = !0, o = pInt(o));
        if (n.handleZ) {
            i = r.childNodes;
            for (f = 0; f < i.length; f++) {
                u = i[f], a = attr(u, "zIndex");
                if (u !== s && (pInt(a) > o || !defined(o) && defined(a))) {
                    r.insertBefore(s, u), l = !0;
                    break
                }
            }
        }
        return l || r.appendChild(s), this.added = !0, this.onAdd && this.onAdd(), this
    },
    xGetter: function(e) {
        return this.element.nodeName === "circle" && (e = {
            x: "cx",
            y: "cy"
        }[e] || e), this._defaultGetter(e)
    },
    _defaultGetter: function(e) {
        var t = pick(this[e], this.element ? this.element.getAttribute(e) : null, 0);
        return /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)), t
    },
    dSetter: function(e, t, n) {
        e && e.join && (e = e.join(" ")), /(NaN| {2}|^$)/.test(e) && (e = "M 0 0"), n.setAttribute(t, e), this[t] = e
    },
    fillSetter: function(e, t, n) {
        typeof e == "string" ? n.setAttribute(t, e) : e && this.colorGradient(e, t, n)
    },
    _defaultSetter: function(e, t, n) {
        n.setAttribute(t, e)
    }
}, SVGElement.prototype.yGetter = SVGElement.prototype.xGetter, SVGElement.prototype.translateXSetter = SVGElement.prototype.translateYSetter = SVGElement.prototype.rotationSetter = SVGElement.prototype.verticalAlignSetter = SVGElement.prototype.scaleXSetter = SVGElement.prototype.scaleYSetter = function(e, t) {
    this[t] = e, this.doTransform = !0
}, SVGElement.prototype["stroke-widthSetter"] = SVGElement.prototype.strokeSetter = function(e, t, n) {
    this[t] = e, this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], SVGElement.prototype.fillSetter.call(this, this.stroke, "stroke", n), n.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : t === "stroke-width" && e === 0 && this.hasStroke && (n.removeAttribute("stroke"), this.hasStroke = !1)
};
var SVGRenderer = function() {
    this.init.apply(this, arguments)
};
SVGRenderer.prototype = {
        Element: SVGElement,
        init: function(e, t, n, r) {
            var i = this,
                s = location,
                o, u, a;
            o = i.createElement("svg").attr({
                version: "1.1"
            }).css(this.getStyle(r)), u = o.element, e.appendChild(u), e.innerHTML.indexOf("xmlns") === -1 && attr(u, "xmlns", SVG_NS), i.isSVG = !0, i.box = u, i.boxWrapper = o, i.defs = this.createElement("defs").add(), i.setSize(t, n, !1)
        },
        getStyle: function(e) {
            return this.style = extend({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, e)
        },
        createElement: function(e) {
            var t = new this.Element;
            return t.init(this, e), t
        },
        draw: function() {},
        path: function(e) {
            var t = {
                fill: NONE
            };
            return isArray(e) ? t.d = e : isObject(e) && extend(t, e), this.createElement("path").attr(t)
        },
        circle: function(e, t, n) {
            var r = isObject(e) ? e : {
                    x: e,
                    y: t,
                    r: n
                },
                i = this.createElement("circle");
            return i.xSetter = function(e) {
                this.element.setAttribute("cx", e)
            }, i.ySetter = function(e) {
                this.element.setAttribute("cy", e)
            }, i.attr(r)
        },
        arc: function(e, t, n, r, i, s) {
            var o;
            return isObject(e) && (t = e.y, n = e.r, r = e.innerR, i = e.start, s = e.end, e = e.x), o = this.symbol("arc", e || 0, t || 0, n || 0, n || 0, {
                innerR: r || 0,
                start: i || 0,
                end: s || 0
            }), o.r = n, o
        },
        setSize: function(e, t, n) {
            var r = this;
            r.width = e, r.height = t, r.boxWrapper[pick(n, !0) ? "animate" : "attr"]({
                width: e,
                height: t
            })
        },
        g: function(e) {
            var t = this.createElement("g");
            return defined(e) ? t.attr({
                "class": PREFIX + e
            }) : t
        },
        image: function(e, t, n, r, i) {
            var s = {},
                o;
            return arguments.length > 1 && extend(s, {
                x: t,
                y: n,
                width: r,
                height: i
            }), o = this.createElement("image").attr(s), o.element.setAttributeNS ? o.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", e) : o.element.setAttribute("hc-svg-href", e), o
        },
        symbol: function(e, t, n, r, i, s) {
            var o, u = this.symbols[e],
                a = u && u(mathRound(t), mathRound(n), r, i, s),
                f, l = /^url\((.*?)\)$/,
                c, h, p;
            return a ? (o = this.path(a), extend(o, {
                symbolName: e,
                x: t,
                y: n,
                width: r,
                height: i
            }), s && extend(o, s)) : l.test(e) && (p = function(e, t) {
                e.element && (e.attr({
                    width: t[0],
                    height: t[1]
                }), e.alignByTranslate || e.translate(mathRound((r - t[0]) / 2), mathRound((i - t[1]) / 2)))
            }, c = e.match(l)[1], h = symbolSizes[c] || s && s.width && s.height && [s.width, s.height], o = this.image(c).attr({
                x: t,
                y: n
            }), o.isImg = !0, h ? p(o, h) : (o.attr({
                width: 0,
                height: 0
            }), f = createElement("img", {
                onload: function() {
                    p(o, symbolSizes[c] = [this.width, this.height])
                },
                src: c
            }))), o
        },
        symbols: {
            circle: function(e, t, n, r) {
                var i = .166 * n;
                return [M, e + n / 2, t, "C", e + n + i, t, e + n + i, t + r, e + n / 2, t + r, "C", e - i, t + r, e - i, t, e + n / 2, t, "Z"]
            },
            arc: function(e, t, n, r, i) {
                var s = i.start,
                    o = i.r || n || r,
                    u = i.end - .001,
                    a = i.innerR,
                    f = i.open,
                    l = mathCos(s),
                    c = mathSin(s),
                    h = mathCos(u),
                    p = mathSin(u),
                    d = i.end - s < mathPI ? 0 : 1;
                return [M, e + o * l, t + o * c, "A", o, o, 0, d, 1, e + o * h, t + o * p, f ? M : L, e + a * h, t + a * p, "A", a, a, 0, d, 0, e + a * l, t + a * c, f ? "" : "Z"]
            }
        },
        clipCircle: function(e, t, n) {
            var r, i = PREFIX + idCounter++,
                s = this.createElement("clipPath").attr({
                    id: i
                }).add(this.defs);
            return r = this.circle(e, t, n).add(s), r.id = i, r.clipPath = s, r
        },
        clipArc: function(e, t, n, r, i, s) {
            var o, u = PREFIX + idCounter++,
                a = this.createElement("clipPath").attr({
                    id: u
                }).add(this.defs);
            return o = this.arc(e, t, n, r, i, s).add(a), o.id = u, o.clipPath = a, o
        }
    }, Renderer = SVGRenderer, define("svg", function() {}), require([], function() {
        Drcom.Circle = Drcom.Controller.extend({
            pluginName: "drcom_circle",
            init: function(e, t) {
                this.super.init.apply(this, arguments), $.extend(this.options, {
                    src: "",
                    fill: "",
                    angle: 0,
                    rotation: -90,
                    duration: 2e3,
                    disabled: !1,
                    control: !1,
                    release: function(e, t) {},
                    change: function(e, t, n) {},
                    loadCompleted: function(e, t) {}
                }, this.options, t), this.initCircle(), this.animating = !1, this.disabled = this.options.disabled;
                var e = this.options.control || this.element;
                this.bind(e, "vmousedown.circle", this.callbackEvent("mousedown"))
            },
            initCircle: function(e) {
                var t = this.element.width(),
                    n = this.element.height(),
                    r = t / 2,
                    i = this.options.fill,
                    s = this.options.src,
                    o = new Renderer(this.element[0], t, n),
                    u = null;
                i && i !== "" ? u = o.circle(t / 2, n / 2, r).attr("fill", i).add() : u = o.image(s, 0, 0, t, n).add(), this.circle = o.clipArc(t / 2, n / 2, r, 0, 0, 0), this.circle.rotate(this.options.rotation, t / 2, n / 2), u.clip(this.circle), this._trigger("loadCompleted", null, [this])
            },
            mousedown: function(e, t) {
                if (this.animating || this.disabled) return;
                this.bind(window, "vmousemove.circle", this.callbackEvent("mousemove")), this.bind(window, "vmouseup.circle", this.callbackEvent("mouseup"))
            },
            mousemove: function(e, t) {
                var n = {
                        x: t.pageX - this.element.offset().left,
                        y: t.pageY - this.element.offset().top
                    },
                    r = this.getAngleFromPoint(parseInt(n.x), parseInt(n.y));
                this.change(r * 100 / 360)
            },
            mouseup: function(e, t) {
                this.unbind(window, "vmousemove.circle"), this.unbind(window, "vmouseup.circle"), this._trigger("release", null, [this])
            },
            getDeg: function() {
                var e = this.circle.attr("end");
                return e * 180 / Math.PI
            },
            scrollTo: function(e, t) {
                this.animating = !0;
                var n = e * 3.6,
                    r = this;
                this.circle.animate({
                    end: n * Math.PI / 180
                }, {
                    duration: this.options.duration,
                    step: function(e) {
                        var t = e * 180 / Math.PI,
                            n = t * 100 / 360,
                            i = r.getPointFromAngle(t);
                        r._trigger("change", null, [r, n, i])
                    },
                    complete: function() {
                        r.animating = !1, t && t.apply(r, [n])
                    }
                })
            },
            change: function(e) {
                var t = e * 3.6,
                    n = this.getPointFromAngle(t);
                if (this._trigger("change", null, [this, e, n]) == 0) return !1;
                this.circle.attr({
                    end: t * Math.PI / 180
                })
            },
            getPointFromAngle: function(e) {
                var t = (e + this.options.rotation) * Math.PI / 180,
                    n = cx = cy = this.element.width() / 2,
                    r = cx + n * Math.cos(t),
                    i = cy + n * Math.sin(t);
                return {
                    x: r,
                    y: i
                }
            },
            getAngleFromPoint: function(e, t) {
                var n, r;
                n = r = this.element.width() / 2;
                var i = Math.atan2(t - r, e - n),
                    s = i * (180 / Math.PI) - this.options.rotation;
                return s < 0 && (s = 360 + s), s
            },
            enable: function() {
                this.disabled = !1
            },
            disable: function() {
                this.disabled = !0
            },
            destroy: function() {
                this.super.destroy.apply(this, arguments), this.element.empty(), this.circle = null
            }
        }), $.fn.drcom_circle = function(e) {
            return $(this).each(function() {
                new Drcom.Circle($(this), e)
            }), $(this)
        }
    }), define("circle", function() {}), require([], function() {
        Drcom.Button = Drcom.Controller.extend({
            pluginName: "drcom_button",
            init: function(e, t) {
                $.extend(this.options, {}, this.options, t), this.super.init.apply(this, [e, t]), this.on("tapone", this.element, ".button", this.callbackEvent(".button tapone"))
            },
            ".button tapone": function(e, t) {
                var n = e;
                if (n.hasClass("disable")) return;
                return n.data("tapone").apply(this, [n.hasClass("active"), n, t]), !1
            },
            add: function(e, t) {
                $('<div class="button ' + e + '" ></div>').data("tapone", t).appendTo(this.element)
            },
            remove: function(e) {
                $("." + e, this.element).remove()
            },
            active: function(e) {
                $("." + e, this.element).addClass("active")
            },
            deactive: function(e) {
                $("." + e, this.element).removeClass("active")
            },
            enable: function(e) {
                $("." + e, this.element).removeClass("disable")
            },
            disable: function(e) {
                $("." + e, this.element).addClass("disable")
            }
        }), $.fn.drcom_button = function(e) {
            return $(this).each(function() {
                new Drcom.Button($(this), e)
            }), $(this)
        };
        var e = $("#menu");
        e.length || (e = $('<div id="menu"></div>').appendTo("body"));
        var t = e.find(".buttons");
        t.length || (t = $("<div class='buttons'></div>").appendTo(e)), drcom.button = t.drcom_button().controller()
    }), define("button", function() {}), require([], function() {
        Drcom.Drawing = Drcom.Controller.extend({
            pluginName: "drcom_drawing",
            init: function(e, t) {
                $.extend(this.options, {
                    color: "#000",
                    size: 1,
                    background: "transparent",
                    border: 0
                }, this.options, t), this.super.init.apply(this, arguments), this.canvas = this.element[0], this.element.attr("width", this.element.width()), this.element.attr("height", this.element.height()), this.pos = this.getPosition(), this.x = null, this.y = null, this.render()
            },
            render: function() {
                this.context = this.canvas.getContext("2d"), this.context.lineJoin = "round", this.context.lineCap = "round", this.context.beginPath();
                if (this.options.background != "transparent" && this.options.background != undefined)
                    if (this.options.background.indexOf("#") != -1) this.context.fillStyle = this.options.background, this.context.fillRect(0, 0, this.element.width(), this.element.height());
                    else {
                        var e = new Image;
                        e.src = this.options.background, this.context.drawImage(e, 0, 0)
                    }
                if (this.options.border != 0 && this.options.border != undefined) {
                    var t = this.options.border.split(" "),
                        n = t[0],
                        r = t[1];
                    this.context.lineWidth = parseInt(n), this.context.strokeStyle = r, this.context.strokeRect(0, 0, this.element.width(), this.element.height())
                }
                this.context.lineWidth = this.options.size, this.context.strokeStyle = this.options.color;
                var i = !drcom.isPhantom && "ontouchend" in document,
                    s = i ? "touchstart" : "mousedown",
                    o = i ? "touchend" : "mouseup",
                    u = i ? "touchmove" : "mousemove";
                this.bind(this.element, s, this.callbackEvent("vmousedown")), this.bind(this.element, u, this.callbackEvent("vmousemove")), this.bind(this.element, o, this.callbackEvent("vmouseup"))
            },
            getPosition: function() {
                var e = this.canvas,
                    t = 0,
                    n = 0;
                while (e) {
                    var r = getComputedStyle(e),
                        i = parseInt(r.getPropertyValue("left"), 10),
                        s = parseInt(r.getPropertyValue("top"), 10);
                    isNaN(i) && (i = 0), isNaN(s) && (s = 0), t += i - e.scrollLeft + e.clientLeft, n += s - e.scrollTop + e.clientTop, e = e.parentElement
                }
                return {
                    x: t,
                    y: n
                }
            },
            getPos: function(e) {
                this.x = e.originalEvent != null ? e.originalEvent.pageX : e.clientX, this.y = e.originalEvent != null ? e.originalEvent.pageY : e.clientY, this.x -= this.pos.x, this.y -= this.pos.y
            },
            vmousedown: function(e, t) {
                this.getPos(t), this.context.moveTo(this.x, this.y)
            },
            vmouseup: function(e, t) {
                var n = t.originalEvent;
                return this.x = null, this.y = null, !1
            },
            vmousemove: function(e, t) {
                if (this.x == null || this.y == null) return;
                this.getPos(t), this.context.lineTo(this.x, this.y), this.context.stroke(), this.context.moveTo(this.x, this.y)
            },
            exportBase64: function() {
                return this.canvas.toDataURL("image/png")
            },
            clear: function() {
                this.context.clearRect(0, 0, this.element.width(), this.element.height()), this.context.beginPath()
            }
        }), $.fn.drcom_drawing = function(e) {
            return this.each(function() {
                new Drcom.Drawing($(this), e)
            }), this
        }
    }), define("drawing", function() {}), require([], function() {
        Drcom.IncreaseNumber = Drcom.Controller.extend({
            pluginName: "drcom_increasenumber",
            init: function(e, t) {
                this.super.init.apply(this, arguments), this.options = $.extend({}, {
                    from: 0,
                    to: 100,
                    delay: 80,
                    increase: 1,
                    percent: "%",
                    format: ".",
                    complete: function(e, t) {},
                    step: function(e, t) {},
                    customize: !1
                }, this.options, t), this.reset(), this.pauseTimer = !1
            },
            val: function(e) {
                this.current = e;
                if (!this.options.customize) {
                    var t = e + "";
                    e < 10 && (t = "0" + t), t = t.replace(".", this.options.format), this.element.html(t + this.options.percent)
                }
                this.options.step.apply(this.element, [this, e])
            },
            step: function(e) {
                var t = this.options.to;
                if (e >= t) {
                    this.val(t), this.complete(t);
                    return
                }
                this.val(e)
            },
            resume: function() {
                this.pauseTimer = !1, this.increase(this.current + instance.options.increase)
            },
            pause: function() {
                this.pauseTimer = !0, this.timer != null && clearTimeout(this.timer)
            },
            reset: function() {
                this.pause(), this.pauseTimer = !1;
                var e = this.options.from;
                this.val(this.options.from), this.increase(e + this.options.increase)
            },
            complete: function(e) {
                this.pause(), this.options.complete.apply(this.element[0], [this, e])
            },
            increase: function(e) {
                var t = this;
                this.timer = setTimeout(function() {
                    t.step(e);
                    if (t.pauseTimer == 0) {
                        var n = e + t.options.increase;
                        n = Math.round(n * 100) / 100, t.increase(n)
                    }
                }, this.options.delay)
            },
            destroy: function() {
                this.pause(), this.super.destroy.apply(this, arguments)
            }
        }), $.fn.drcom_increasenumber = function(e) {
            return $(this).each(function() {
                new Drcom.IncreaseNumber($(this), e)
            }), $(this)
        }
    }), define("increasenumber", function() {}), require([], function() {
        Drcom.Expose = Drcom.Controller.extend({
            pluginName: "drcom_expose",
            init: function(e, t) {
                this.super.init.apply(this, arguments), this.options = $.extend({}, {
                    effect: "fade",
                    duration: 500,
                    color: "#fff",
                    opacity: .8,
                    zIndex: 101,
                    className: "expose",
                    onBeforeShow: function(e) {},
                    onBeforeHide: function(e) {},
                    onShow: function(e) {},
                    onHide: function(e) {},
                    parent: "body"
                }, this.options, t), this.createElements()
            },
            createElements: function() {
                this.mask = $("<div></div>").css({
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    "z-index": this.options.zIndex,
                    "background-color": this.options.color,
                    opacity: this.options.opacity,
                    display: "none"
                }).addClass(this.options.className).appendTo(this.options.parent)
            },
            isVisible: function() {
                return this.mask.css("display") == "none" ? 0 : 1
            },
            show: function() {
                $.effects.save(this.element, ["z-index"]), this.element.css({
                    "z-index": this.options.zIndex + 1
                }), this.onBeforeShow();
                var e = this;
                this.mask.show(this.options.effect, null, this.options.duration, function() {
                    e.onShow()
                })
            },
            hide: function() {
                this.onBeforeHide();
                var e = this;
                this.mask.hide(this.options.effect, null, this.options.duration, function() {
                    $.effects.restore(e.element, ["z-index"]), e.onHide()
                })
            },
            toggle: function() {
                this.isVisible() == 1 ? this.hide() : this.show()
            },
            onHide: function() {
                this.options.onHide.apply(this.mask, [this])
            },
            onShow: function() {
                this.options.onShow.apply(this.mask, [this])
            },
            onBeforeShow: function() {
                this.options.onBeforeShow.apply(this.mask, [this])
            },
            onBeforeHide: function() {
                this.options.onBeforeHide.apply(this.mask, [this])
            },
            destroy: function() {
                this.mask.remove(), this._super("destroy")
            }
        }), $.fn.drcom_expose = function(e) {
            return $(this).each(function() {
                new Drcom.Expose($(this), e)
            }), $(this)
        }, Drcom.Popup = Drcom.Controller.extend({
            pluginName: "drcom_popup",
            init: function(e, t) {
                this.super.init.apply(this, arguments), this.options = $.extend({}, {
                    close: ".close",
                    closeInside: !0,
                    closeOutside: !1,
                    effect: "fade",
                    duration: 500,
                    mask: !1,
                    oneInstance: !0,
                    position: null,
                    wrapper: !1,
                    classWrapper: "",
                    classContainer: "",
                    zIndex: 102,
                    window: window,
                    container: "",
                    onShow: function() {},
                    onHide: function() {},
                    onBeforeShow: function() {},
                    onBeforeHide: function() {}
                }, this.options, t), this.triggerInside = !1, this.mask = null, this.wrapper = null, this.preventDefault = !1;
                var n = this.element.attr("rel");
                if (n.indexOf(".html") != -1) {
                    this.container = $("<div style='display:none;position:absolute;left:0px;top:0px;z-index:" + this.options.zIndex + "'></div>");
                    var r = this.element.attr("parent");
                    r == undefined ? r = $("body") : r = $(r), r.append(this.container);
                    var i = this;
                    i.beforeCreateContainer(), this.container.attr("loadeddata", 0)
                } else this.container = $(n), this.beforeCreateContainer(), this.bindEvents();
                this.container.addClass(this.options.classContainer), this.options.container = this.container, this.bind(window, "tapone", this.callbackEvent("{window} tapone")), this.bind(this.element, "tapone", this.callbackEvent("tapone"))
            },
            bindEvents: function() {
                var e = this,
                    t = $(this.options.close, this.container);
                t.length > 0 && this.bind(t, "tapone", function() {
                    e.hide()
                }), this.options.closeInside == 1 && this.bind(this.container, "tapone", function() {
                    e.hide()
                })
            },
            beforeCreateContainer: function() {
                this.options.mask == 1 && (this.mask = this.container.drcom_expose({
                    color: "#000",
                    zIndex: this.options.zIndex
                }).controller()), typeof this.options.mask == "object" && (this.mask = this.container.drcom_expose(this.options.mask).controller());
                if (this.options.wrapper == 1) {
                    this.wrapper = $("<div></div>"), this.wrapper.css({
                        "z-Index": this.options.zIndex,
                        position: "absolute",
                        left: 0,
                        top: 0
                    }), this.wrapper.addClass(this.options.classWrapper), this.wrapper.append(this.container);
                    var e = this.element.attr("parent");
                    e == undefined ? e = $("body") : e = $(e), e.append(this.wrapper)
                }
            },
            "{window} tapone": function() {
                this.options.closeOutside == 1 && this.triggerInside == 1 && this.container[0] !== event.target && !this.container.has(event.target).length && this.element[0] !== event.target && !this.container.has(event.target).length && this.hide()
            },
            tapone: function(e, t) {
                this.toggle()
            },
            closeAllPopup: function(e) {
                var t = $(".drcom_popup");
                for (var n = 0; n < t.length; n++) {
                    var r = !1;
                    for (var i = 0; i < e.length; i++)
                        if (e[i] == t[n]) {
                            r = !0;
                            break
                        }
                    if (r == 1) continue;
                    var s = $(t[n]).controller();
                    s.isVisible() == 1 && s.hide()
                }
            },
            isVisible: function() {
                return this.container.css("display") == "none" ? 0 : 1
            },
            setPosition: function() {
                var e = { of: this.element
                };
                e = $.extend(!1, e, this.options.position), this.options.position != null && ($.effects.save(this.container, ["top", "bottom", "left", "right"]), this.container.position(e))
            },
            onAfterShow: function() {
                this.element.trigger("drcom:showPopup"), this.options.onShow.apply()
            },
            show: function() {
                function e() {
                    this.options.onBeforeShow.apply(), this.triggerInside = !0, this.options.oneInstance == 1 && this.closeAllPopup([this.element[0]]), this.setPosition();
                    var e = this;
                    this.options.slide ? (this.container.css("-webkit-transform", "translateX(-1024px)"), this.container.css("-webkit-transition", "all " + this.options.duration + "ms linear"), this.container.show(5, function() {
                        $(e.container).css("-webkit-transform", "translateX(0px)")
                    })) : this.container.show(this.options.effect, null, this.options.duration, function() {
                        e.onAfterShow()
                    }), this.mask != null && this.mask.show()
                }
                if (this.element.attr("rel").indexOf(".html") != -1) {
                    var t = this,
                        n = 0,
                        r = this.element.attr("rel").split("#");
                    r.length >= 2 && (n = r[1]), this.container.attr("loadeddata") == "0" || n == 1 ? (this.container.empty(), this.container.load(this.element.attr("rel"), function() {
                        t.bindEvents(), e.apply(t)
                    }), this.container.attr("loadeddata", 1)) : e.apply(this)
                } else e.apply(this)
            },
            onAfterHide: function() {
                if (this.element.attr("rel").indexOf(".html") != -1) {
                    var e = 0,
                        t = this.element.attr("rel").split("#");
                    t.length >= 2 && (e = t[1]), e == 1 && this.container.empty()
                }
                this.options.onHide.apply(), this.element.trigger("drcom:hidePopup")
            },
            hide: function() {
                this.options.onBeforeHide.apply(this);
                if (this.preventDefault == 1) return;
                this.triggerInside = !1;
                if (!this.options.slide) this.container.hide(), this.onAfterHide();
                else {
                    this.container.css("-webkit-transform", "translateX(-1024px)");
                    var e = this;
                    setTimeout(function() {
                        e.container.hide(), e.onAfterHide()
                    }, e.options.duration)
                }
                this.options.position != null && $.effects.restore(this.container, ["top", "bottom", "left", "right"]), this.mask != null && this.mask.hide()
            },
            toggle: function() {
                this.isVisible() == 1 ? this.hide() : this.show()
            },
            destroy: function() {
                var e = this.element.attr("rel");
                e.indexOf(".html") != -1 && this.container.remove(), this.super.destroy.apply(this, arguments)
            }
        }), $.fn.drcom_popup = function(e) {
            return $(this).each(function() {
                new Drcom.Popup($(this), e)
            }), $(this)
        }
    }), define("popup", function() {}), require([], function() {
        Drcom.Srt = Drcom.Controller.extend({
            pluginName: "drcom_srt",
            init: function(e, t) {
                this.super.init.apply(this, arguments), this.video = e, this.setOptions(t), this.container = $(this.options.container);
                var n = this,
                    r = e.attr("srt");
                this.load(r, function(e) {
                    n.playSubtitles(e)
                })
            },
            setOptions: function(e) {
                var t = {
                    container: null,
                    delay: 200,
                    duration: 500,
                    callback: function(e, t, n, r) {}
                };
                this.options = $.extend(!1, t, e)
            },
            load: function(e, t) {
                return $.get(e, t)
            },
            toSeconds: function(e) {
                var t = 0;
                if (e) {
                    var n = e.split(":");
                    for (i = 0; i < n.length; i++) t = t * 60 + parseFloat(n[i].replace(",", "."))
                }
                return t
            },
            strip: function(e) {
                return e.replace(/^\s+|\s+$/g, "")
            },
            setSubtitle: function(e, t) {
                if (e == -1) {
                    $("div", this.container).hide();
                    return
                }
                var n = $("#sub" + e, this.container);
                $("div", this.container).not(n).hide(), n.show("fade", this.options.duration)
            },
            playSubtitles: function(e) {
                var r = this.options,
                    i = this,
                    s = this.video[0];
                e = e.replace(/\r\n|\r|\n/g, "\n");
                var u = [];
                e = this.strip(e);
                var a = e.split("\n\n"),
                    f = 0;
                for (f in a) {
                    st = a[f].split("\n");
                    if (st.length >= 2) {
                        n = st[0], l = this.strip(st[1].split(" --> ")[0]), o = this.strip(st[1].split(" --> ")[1]), t = st[2];
                        if (st.length > 2)
                            for (j = 3; j < st.length; j++) t += "\n" + st[j];
                        is = this.toSeconds(l), os = this.toSeconds(o), u.push({
                            id: n,
                            i: l,
                            o: o,
                            t: t,
                            is: is
                        })
                    }
                }
                if (this.container != null)
                    for (var l = 0; l < u.length; l++) {
                        var c = $("<div style='display:none' id='sub" + u[l].id + "'>" + u[l].t + "</div>");
                        this.container.append(c)
                    }
                var h = -1;
                this.timer = setInterval(function() {
                    var e = s.currentTime;
                    e = parseFloat(e);
                    var t = null;
                    for (var n = u.length - 1; n >= 0; n--) {
                        var o = u[n];
                        if (o.is < e) {
                            t = o;
                            break
                        }
                    }
                    if (t != null && t.is != h) {
                        var a = t.t;
                        i.setSubtitle(t.id, a), h = t.is, r.callback.apply(this, [parseFloat(t.id), a, t.is, u])
                    }
                }, this.options.delay)
            },
            destroy: function() {
                clearInterval(this.timer), this.super.destroy.apply(this, arguments)
            }
        }), $.fn.drcom_srt = function(e) {
            return $(this).each(function() {
                new Drcom.Srt($(this), e)
            }), $(this)
        }
    })(), define("srt", function() {}),
    function(e, t) {
        function n(t, n) {
            var i, s, o, u = t.nodeName.toLowerCase();
            return "area" === u ? (i = t.parentNode, s = i.name, t.href && s && "map" === i.nodeName.toLowerCase() ? (o = e("img[usemap=#" + s + "]")[0], !!o && r(o)) : !1) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && r(t)
        }

        function r(t) {
            return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
                return "hidden" === e.css(this, "visibility")
            }).length
        }
        var i = 0,
            s = /^ui-id-\d+$/;
        e.ui = e.ui || {}, e.extend(e.ui, {
            version: "1.10.3",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), e.fn.extend({
            focus: function(t) {
                return function(n, r) {
                    return "number" == typeof n ? this.each(function() {
                        var t = this;
                        setTimeout(function() {
                            e(t).focus(), r && r.call(t)
                        }, n)
                    }) : t.apply(this, arguments)
                }
            }(e.fn.focus),
            scrollParent: function() {
                var t;
                return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
            },
            zIndex: function(n) {
                if (n !== t) return this.css("zIndex", n);
                if (this.length)
                    for (var r, i, s = e(this[0]); s.length && s[0] !== document;) {
                        if (r = s.css("position"), ("absolute" === r || "relative" === r || "fixed" === r) && (i = parseInt(s.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
                        s = s.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++i)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    s.test(this.id) && e(this).removeAttr("id")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
                return function(n) {
                    return !!e.data(n, t)
                }
            }) : function(t, n, r) {
                return !!e.data(t, r[3])
            },
            focusable: function(t) {
                return n(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function(t) {
                var r = e.attr(t, "tabindex"),
                    i = isNaN(r);
                return (i || r >= 0) && n(t, !i)
            }
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, r) {
            function i(t, n, r, i) {
                return e.each(s, function() {
                    n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), i && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
                }), n
            }
            var s = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"],
                o = r.toLowerCase(),
                u = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            e.fn["inner" + r] = function(n) {
                return n === t ? u["inner" + r].call(this) : this.each(function() {
                    e(this).css(o, i(this, n) + "px")
                })
            }, e.fn["outer" + r] = function(t, n) {
                return "number" != typeof t ? u["outer" + r].call(this, t) : this.each(function() {
                    e(this).css(o, i(this, t, !0, n) + "px")
                })
            }
        }), e.fn.addBack || (e.fn.addBack = function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
            return function(n) {
                return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
            }
        }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
            disableSelection: function() {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }), e.extend(e.ui, {
            plugin: {
                add: function(t, n, r) {
                    var i, s = e.ui[t].prototype;
                    for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
                },
                call: function(e, t, n) {
                    var r, i = e.plugins[t];
                    if (i && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                        for (r = 0; i.length > r; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
                }
            },
            hasScroll: function(t, n) {
                if ("hidden" === e(t).css("overflow")) return !1;
                var r = n && "left" === n ? "scrollLeft" : "scrollTop",
                    i = !1;
                return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
            }
        })
    }(jQuery), define("jquery.ui.core", function() {}),
    function(e, t) {
        var n = 0,
            r = Array.prototype.slice,
            i = e.cleanData;
        e.cleanData = function(t) {
            for (var n, r = 0; null != (n = t[r]); r++) try {
                e(n).triggerHandler("remove")
            } catch (s) {}
            i(t)
        }, e.widget = function(n, r, i) {
            var s, o, u, a, f = {},
                l = n.split(".")[0];
            n = n.split(".")[1], s = l + "-" + n, i || (i = r, r = e.Widget), e.expr[":"][s.toLowerCase()] = function(t) {
                return !!e.data(t, s)
            }, e[l] = e[l] || {}, o = e[l][n], u = e[l][n] = function(e, n) {
                return this._createWidget ? (arguments.length && this._createWidget(e, n), t) : new u(e, n)
            }, e.extend(u, o, {
                version: i.version,
                _proto: e.extend({}, i),
                _childConstructors: []
            }), a = new r, a.options = e.widget.extend({}, a.options), e.each(i, function(n, i) {
                return e.isFunction(i) ? (f[n] = function() {
                    var e = function() {
                            return r.prototype[n].apply(this, arguments)
                        },
                        t = function(e) {
                            return r.prototype[n].apply(this, e)
                        };
                    return function() {
                        var n, r = this._super,
                            s = this._superApply;
                        return this._super = e, this._superApply = t, n = i.apply(this, arguments), this._super = r, this._superApply = s, n
                    }
                }(), t) : (f[n] = i, t)
            }), u.prototype = e.widget.extend(a, {
                widgetEventPrefix: o ? a.widgetEventPrefix : n
            }, f, {
                constructor: u,
                namespace: l,
                widgetName: n,
                widgetFullName: s
            }), o ? (e.each(o._childConstructors, function(t, n) {
                var r = n.prototype;
                e.widget(r.namespace + "." + r.widgetName, u, n._proto)
            }), delete o._childConstructors) : r._childConstructors.push(u), e.widget.bridge(n, u)
        }, e.widget.extend = function(n) {
            for (var i, o, u = r.call(arguments, 1), a = 0, f = u.length; f > a; a++)
                for (i in u[a]) o = u[a][i], u[a].hasOwnProperty(i) && o !== t && (n[i] = e.isPlainObject(o) ? e.isPlainObject(n[i]) ? e.widget.extend({}, n[i], o) : e.widget.extend({}, o) : o);
            return n
        }, e.widget.bridge = function(n, i) {
            var o = i.prototype.widgetFullName || n;
            e.fn[n] = function(u) {
                var f = "string" == typeof u,
                    l = r.call(arguments, 1),
                    c = this;
                return u = !f && l.length ? e.widget.extend.apply(null, [u].concat(l)) : u, f ? this.each(function() {
                    var r, i = e.data(this, o);
                    return i ? e.isFunction(i[u]) && "_" !== u.charAt(0) ? (r = i[u].apply(i, l), r !== i && r !== t ? (c = r && r.jquery ? c.pushStack(r.get()) : r, !1) : t) : e.error("no such method '" + u + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + u + "'")
                }) : this.each(function() {
                    var t = e.data(this, o);
                    t ? t.option(u || {})._init() : e.data(this, o, new i(u, this))
                }), c
            }
        }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(t, r) {
                r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(e) {
                        e.target === r && this.destroy()
                    }
                }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: e.noop,
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: e.noop,
            widget: function() {
                return this.element
            },
            option: function(n, r) {
                var i, s, o, u = n;
                if (0 === arguments.length) return e.widget.extend({}, this.options);
                if ("string" == typeof n)
                    if (u = {}, i = n.split("."), n = i.shift(), i.length) {
                        for (s = u[n] = e.widget.extend({}, this.options[n]), o = 0; i.length - 1 > o; o++) s[i[o]] = s[i[o]] || {}, s = s[i[o]];
                        if (n = i.pop(), r === t) return s[n] === t ? null : s[n];
                        s[n] = r
                    } else {
                        if (r === t) return this.options[n] === t ? null : this.options[n];
                        u[n] = r
                    }
                return this._setOptions(u), this
            },
            _setOptions: function(e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function(e, t) {
                return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(n, r, i) {
                var s, o = this;
                "boolean" != typeof n && (i = r, r = n, n = !1), i ? (r = s = e(r), this.bindings = this.bindings.add(r)) : (i = r, r = this.element, s = this.widget()), e.each(i, function(i, u) {
                    function f() {
                        return n || o.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof u ? o[u] : u).apply(o, arguments) : t
                    }
                    "string" != typeof u && (f.guid = u.guid = u.guid || f.guid || e.guid++);
                    var l = i.match(/^(\w+)\s*(.*)$/),
                        c = l[1] + o.eventNamespace,
                        h = l[2];
                    h ? s.delegate(h, c, f) : r.bind(c, f)
                })
            },
            _off: function(e, t) {
                t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
            },
            _delay: function(e, t) {
                function n() {
                    return ("string" == typeof e ? r[e] : e).apply(r, arguments)
                }
                var r = this;
                return setTimeout(n, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function(t) {
                        e(t.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(t) {
                        e(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function(t) {
                        e(t.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(t) {
                        e(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(t, n, r) {
                var i, s, o = this.options[t];
                if (r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent)
                    for (i in s) i in n || (n[i] = s[i]);
                return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
            }
        }, e.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, n) {
            e.Widget.prototype["_" + t] = function(r, i, s) {
                "string" == typeof i && (i = {
                    effect: i
                });
                var o, u = i ? i === !0 || "number" == typeof i ? n : i.effect || n : t;
                i = i || {}, "number" == typeof i && (i = {
                    duration: i
                }), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && e.effects.effect[u] ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
                    e(this)[t](), s && s.call(r[0]), n()
                })
            }
        })
    }(jQuery), define("jquery.ui.widget", function() {}),
    function(e) {
        var t = !/Phantom/.test(navigator.userAgent) && "ontouchend" in document,
            n = {
                touchStartEvent: t ? "touchstart" : "mousedown",
                touchStopEvent: t ? "touchend" : "mouseup",
                touchMoveEvent: t ? "touchmove" : "mousemove"
            },
            r = !1;
        $(document).bind(n.touchStopEvent, function(e) {
            r = !1
        });
        var i = function(e) {
                return t && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0] && (e.pageX = e.originalEvent.changedTouches[0].pageX, e.pageY = e.originalEvent.changedTouches[0].pageY, e.target = e.originalEvent.changedTouches[0].target, e.which = 1), e
            },
            s = !1;
        e(document).bind(n.touchStopEvent, function() {
            s = !1
        }), e.widget("ui.mouse", {
            version: "1.10.3",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var t = this;
                this.element.bind(n.touchStartEvent + "." + this.widgetName, function(e) {
                    return t._mouseDown(e)
                }).bind("tapone." + this.widgetName, function(n) {
                    return !0 === e.data(n.target, t.widgetName + ".preventClickEvent") ? (e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1) : undefined
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind(n.touchMoveEvent + "." + this.widgetName, this._mouseMoveDelegate).unbind(n.touchStopEvent + "." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(t) {
                t = i(t);
                if (!s) {
                    this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                    var r = this,
                        o = 1 === t.which,
                        u = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                    return o && !u && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        r.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                        return r._mouseMove(e)
                    }, this._mouseUpDelegate = function(e) {
                        return r._mouseUp(e)
                    }, e(document).bind(n.touchMoveEvent + "." + this.widgetName, this._mouseMoveDelegate).bind(n.touchStopEvent + "." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), s = !0, !0)) : !0
                }
            },
            _mouseMove: function(t) {
                return t = i(t), e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
            },
            _mouseUp: function(t) {
                return t = i(t), e(document).unbind(n.touchMoveEvent + "." + this.widgetName, this._mouseMoveDelegate).unbind(n.touchStopEvent + "." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
            },
            _mouseDistanceMet: function(e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        })
    }(jQuery), define("jquery.ui.mouse", function() {}),
    function(e) {
        var t = 5;
        e.widget("ui.slider", e.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
            },
            _refresh: function() {
                this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
            },
            _createHandles: function() {
                var t, n, r = this.options,
                    i = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    s = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                    o = [];
                for (n = r.values && r.values.length || 1, i.length > n && (i.slice(n).remove(), i = i.slice(0, n)), t = i.length; n > t; t++) o.push(s);
                this.handles = i.add(e(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(t) {
                    e(this).data("ui-slider-handle-index", t)
                })
            },
            _createRange: function() {
                var t = this.options,
                    n = "";
                t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                    left: "",
                    bottom: ""
                }) : (this.range = e("<div></div>").appendTo(this.element), n = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(n + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : this.range = e([])
            },
            _setupEvents: function() {
                var e = this.handles.add(this.range).filter("a");
                this._off(e), this._on(e, this._handleEvents), this._hoverable(e), this._focusable(e)
            },
            _destroy: function() {
                this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
            },
            _mouseCapture: function(t) {
                var n, r, i, s, o, u, a, f, l = this,
                    c = this.options;
                return c.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), n = {
                    x: t.pageX,
                    y: t.pageY
                }, r = this._normValueFromMouse(n), i = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                    var n = Math.abs(r - l.values(t));
                    (i > n || i === n && (t === l._lastChangedValue || l.values(t) === c.min)) && (i = n, s = e(this), o = t)
                }), u = this._start(t, o), u === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, s.addClass("ui-state-active").focus(), a = s.offset(), f = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = f ? {
                    left: 0,
                    top: 0
                } : {
                    left: t.pageX - a.left - s.width() / 2,
                    top: t.pageY - a.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, r), this._animateOff = !0, !0))
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(e) {
                var t = {
                        x: e.pageX,
                        y: e.pageY
                    },
                    n = this._normValueFromMouse(t);
                return this._slide(e, this._handleIndex, n), !1
            },
            _mouseStop: function(e) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(e) {
                var t, n, r, i, s;
                return "horizontal" === this.orientation ? (t = this.elementSize.width, n = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, n = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), r = n / t, r > 1 && (r = 1), 0 > r && (r = 0), "vertical" === this.orientation && (r = 1 - r), i = this._valueMax() - this._valueMin(), s = this._valueMin() + r * i, this._trimAlignValue(s)
            },
            _start: function(e, t) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("start", e, n)
            },
            _slide: function(e, t, n) {
                var r, i, s;
                this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && n > r || 1 === t && r > n) && (n = r), n !== this.values(t) && (i = this.values(), i[t] = n, s = this._trigger("slide", e, {
                    handle: this.handles[t],
                    value: n,
                    values: i
                }), r = this.values(t ? 0 : 1), s !== !1 && this.values(t, n, !0))) : n !== this.value() && (s = this._trigger("slide", e, {
                    handle: this.handles[t],
                    value: n
                }), s !== !1 && this.value(n))
            },
            _stop: function(e, t) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("stop", e, n)
            },
            _change: function(e, t) {
                if (!this._keySliding && !this._mouseSliding) {
                    var n = {
                        handle: this.handles[t],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, n)
                }
            },
            value: function(e) {
                return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), undefined) : this._value()
            },
            values: function(t, n) {
                var r, i, s;
                if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(n), this._refreshValue(), this._change(null, t), undefined;
                if (!arguments.length) return this._values();
                if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
                for (r = this.options.values, i = arguments[0], s = 0; r.length > s; s += 1) r[s] = this._trimAlignValue(i[s]), this._change(null, s);
                this._refreshValue()
            },
            _setOption: function(t, n) {
                var r, i = 0;
                switch ("range" === t && this.options.range === !0 && ("min" === n ? (this.options.value = this._values(0), this.options.values = null) : "max" === n && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (i = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments), t) {
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), r = 0; i > r; r += 1) this._change(null, r);
                        this._animateOff = !1;
                        break;
                    case "min":
                    case "max":
                        this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                        break;
                    case "range":
                        this._animateOff = !0, this._refresh(), this._animateOff = !1
                }
            },
            _value: function() {
                var e = this.options.value;
                return e = this._trimAlignValue(e)
            },
            _values: function(e) {
                var t, n, r;
                if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t);
                if (this.options.values && this.options.values.length) {
                    for (n = this.options.values.slice(), r = 0; n.length > r; r += 1) n[r] = this._trimAlignValue(n[r]);
                    return n
                }
                return []
            },
            _trimAlignValue: function(e) {
                if (this._valueMin() >= e) return this._valueMin();
                if (e >= this._valueMax()) return this._valueMax();
                var t = this.options.step > 0 ? this.options.step : 1,
                    n = (e - this._valueMin()) % t,
                    r = e - n;
                return 2 * Math.abs(n) >= t && (r += n > 0 ? t : -t), parseFloat(r.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var t, n, r, i, s, o = this.options.range,
                    u = this.options,
                    a = this,
                    f = this._animateOff ? !1 : u.animate,
                    l = {};
                this.options.values && this.options.values.length ? this.handles.each(function(r) {
                    n = 100 * ((a.values(r) - a._valueMin()) / (a._valueMax() - a._valueMin())), l["horizontal" === a.orientation ? "left" : "bottom"] = n + "%", e(this).stop(1, 1)[f ? "animate" : "css"](l, u.animate), a.options.range === !0 && ("horizontal" === a.orientation ? (0 === r && a.range.stop(1, 1)[f ? "animate" : "css"]({
                        left: n + "%"
                    }, u.animate), 1 === r && a.range[f ? "animate" : "css"]({
                        width: n - t + "%"
                    }, {
                        queue: !1,
                        duration: u.animate
                    })) : (0 === r && a.range.stop(1, 1)[f ? "animate" : "css"]({
                        bottom: n + "%"
                    }, u.animate), 1 === r && a.range[f ? "animate" : "css"]({
                        height: n - t + "%"
                    }, {
                        queue: !1,
                        duration: u.animate
                    }))), t = n
                }) : (r = this.value(), i = this._valueMin(), s = this._valueMax(), n = s !== i ? 100 * ((r - i) / (s - i)) : 0, l["horizontal" === this.orientation ? "left" : "bottom"] = n + "%", this.handle.stop(1, 1)[f ? "animate" : "css"](l, u.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[f ? "animate" : "css"]({
                    width: n + "%"
                }, u.animate), "max" === o && "horizontal" === this.orientation && this.range[f ? "animate" : "css"]({
                    width: 100 - n + "%"
                }, {
                    queue: !1,
                    duration: u.animate
                }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[f ? "animate" : "css"]({
                    height: n + "%"
                }, u.animate), "max" === o && "vertical" === this.orientation && this.range[f ? "animate" : "css"]({
                    height: 100 - n + "%"
                }, {
                    queue: !1,
                    duration: u.animate
                }))
            },
            _handleEvents: {
                keydown: function(n) {
                    var r, i, s, o, u = e(n.target).data("ui-slider-handle-index");
                    switch (n.keyCode) {
                        case e.ui.keyCode.HOME:
                        case e.ui.keyCode.END:
                        case e.ui.keyCode.PAGE_UP:
                        case e.ui.keyCode.PAGE_DOWN:
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            if (n.preventDefault(), !this._keySliding && (this._keySliding = !0, e(n.target).addClass("ui-state-active"), r = this._start(n, u), r === !1)) return
                    }
                    switch (o = this.options.step, i = s = this.options.values && this.options.values.length ? this.values(u) : this.value(), n.keyCode) {
                        case e.ui.keyCode.HOME:
                            s = this._valueMin();
                            break;
                        case e.ui.keyCode.END:
                            s = this._valueMax();
                            break;
                        case e.ui.keyCode.PAGE_UP:
                            s = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / t);
                            break;
                        case e.ui.keyCode.PAGE_DOWN:
                            s = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / t);
                            break;
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                            if (i === this._valueMax()) return;
                            s = this._trimAlignValue(i + o);
                            break;
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            if (i === this._valueMin()) return;
                            s = this._trimAlignValue(i - o)
                    }
                    this._slide(n, u, s)
                },
                click: function(e) {
                    e.preventDefault()
                },
                keyup: function(t) {
                    var n = e(t.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(t, n), this._change(t, n), e(t.target).removeClass("ui-state-active"))
                }
            }
        })
    }(jQuery), define("jquery.ui.slider", function() {}), require([], function() {
        Drcom.Video = Drcom.Controller.extend({
            pluginName: "drcom_video",
            init: function(e, t) {
                this.super.init.apply(this, arguments), $.extend(this.options, {
                    loop: !1,
                    controls: !1,
                    autoplay: !1,
                    controlbar: "controlbar",
                    playpause: "playpause",
                    stop: "stop",
                    fullscreen: "fullscreen",
                    replay: "replay",
                    time: "time",
                    seek: "seek",
                    prev: "prev",
                    next: "next",
                    remain: "remain",
                    srt: null,
                    slider: {},
                    translate: 4096,
                    seekList: [],
                    delay: 0,
                    onPlay: function() {},
                    onPause: function() {}
                }, this.options, t), this.seeking = !1, this.canFullScren = !1, this.media = this._prepareElement(), typeof this.options.controls == "string" && this._createControls(), this._bindEvents(), this.media.load();
                if (this.options.srt != null) {
                    var n = {};
                    typeof this.options.srt == "string" && (n.container = $(this.options.srt)), $.extend(n, this.options.srt), $(this.media).drcom_srt(n)
                }
            },
            ".{playpause} tapone": function() {
                this.playpause()
            },
            ".{fullscreen} tapone": function() {
                this.fullscreen()
            },
            ".{seek} slidestop": function() {
                this.seeking = !1
            },
            ".{replay} tapone": function() {
                this.replay()
            },
            ".{stop} tapone": function() {
                this.stop()
            },
            ".{prev} tapone": function() {
                this.prev()
            },
            ".{next} tapone": function() {
                this.next()
            },
            ".{seek} slide": function(e, t, n) {
                this.seeking = !0;
                var r = n.value * this.media.duration / 100;
                this.seek(r)
            },
            getSeekList: function() {
                if (this.options.seekList.length > 0) return this.options.seekList;
                var e = [];
                for (var t = 0; t < 4; t++) e.push(Math.ceil(this.media.duration / 4 * t));
                return e.push(Math.ceil(this.media.duration)), e
            },
            next: function() {
                var e = this.media.currentTime,
                    t = this.getSeekList();
                for (var n = 0; n < t.length; n++)
                    if (e < t[n]) {
                        e = t[n], this.seek(e);
                        break
                    }
            },
            prev: function() {
                var e = this.media.currentTime,
                    t = this.getSeekList();
                for (var n = 0; n < t.length; n++)
                    if (e < t[n] && n > 0) {
                        e = t[n - 2], this.seek(e);
                        break
                    }
            },
            play: function() {
                this.media.play()
            },
            pause: function() {
                this.media.pause()
            },
            playpause: function() {
                this.media.paused == 1 ? this.play() : this.pause()
            },
            stop: function() {
                this.media.pause(), this.seek(0)
            },
            seek: function(e) {
                this.media.currentTime = e
            },
            fullscreen: function() {
                this.media.webkitEnterFullScreen != null && this.canFullScren == 1 && this.media.webkitEnterFullScreen()
            },
            replay: function() {
                this.seek(0), this.play()
            },
            _bindEvents: function() {
                this.on("tapone", this.element, "." + this.options.next, this.callbackEvent(".{next} tapone")), this.on("tapone", this.element, "." + this.options.prev, this.callbackEvent(".{prev} tapone")), this.on("tapone", this.element, "." + this.options.playpause, this.callbackEvent(".{playpause} tapone")), this.on("tapone", this.element, "." + this.options.stop, this.callbackEvent(".{stop} tapone")), this.on("tapone", this.element, "." + this.options.fullscreen, this.callbackEvent(".{fullscreen} tapone")), this.on("tapone", this.element, "." + this.options.replay, this.callbackEvent(".{replay} tapone")), this.on("slide", this.element, "." + this.options.seek, this.callbackEvent(".{seek} slide")), this.on("slidestop", this.element, "." + this.options.seek, this.callbackEvent(".{seek} slidestop"));
                var e = this;
                this.bind(this.media, "ended", function() {
                    e.options.loop == 1 && e.replay()
                }), typeof this.options.controls == "string" && this.bind(this.media, "timeupdate", function(t) {
                    e._checkControl("time") == 1 && e._updateTime(), e.seeking == 0 && e._checkControl("seek") == 1 && e._updateSeek(Math.floor(this.currentTime))
                }), this.bind(this.media, "loadeddata", function() {
                    $(e.media).bind("playing.canplay seeked.canplay", function() {
                        $(e.media).unbind("playing.canplay seeked.canplay"), e._canplay()
                    }), e.options.autoplay == 1 && e.play()
                }), this.bind(this.media, "play.playpause", function() {
                    e._onPlay(), e.canFullScren = !0, e._checkControl("playpause") == 1 && e.controls.playpause.removeClass("pause").addClass("play")
                }), this.bind(this.media, "pause.playpause", function() {
                    e._onPause(), e._checkControl("playpause") == 1 && e.controls.playpause.removeClass("play").addClass("pause")
                })
            },
            _onPlay: function() {
                this.options.onPlay.apply(this)
            },
            _onPause: function() {
                this.options.onPause.apply(this)
            },
            _canplay: function() {
                var e = this;
                setTimeout(function() {
                    $(e.media).css({
                        "-webkit-transform": "initial",
                        left: "initial"
                    })
                }, this.options.delay)
            },
            _prepareElement: function() {
                var e = this.options.translate,
                    t = $("<video></video>");
                t.css({
                    "-webkit-transform": "translateX(" + e + "px)"
                });
                var n = navigator.userAgent.toLowerCase().indexOf("android") > -1;
                n && t.css({
                    left: e
                }), $("video", this.element).length > 0 && this.element.empty();
                for (var r = 0; r < this.element[0].attributes.length; r++) {
                    var i = this.element[0].attributes[r];
                    if (i.name == "id" || i.name == "class" || i.name == "src") continue;
                    t.attr(i.name, i.value)
                }
                return $("<source></source>").attr("src", this.element.attr("src") + ".mp4").attr("type", "video/mp4").appendTo(t), this.element.append(t), this.videoMask = $("<div style='position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:2'></div>").appendTo(this.element), t[0]
            },
            _checkControl: function(e) {
                if (typeof this.options.controls != "string") return !1;
                var t = this.options.controls.split(" ");
                for (var n = 0; n < t.length; n++)
                    if (t[n] == e) return !0;
                return !1
            },
            _createControls: function() {
                this.controls = {}, this.controls.controlbar = $("<div class='" + this.options.controlbar + "'></div>"), this._checkControl("playpause") == 1 && (this.controls.playpause = $("<div class='button " + this.options.playpause + " pause'></div>"), this.controls.controlbar.append(this.controls.playpause)), this._checkControl("stop") == 1 && (this.controls.stop = $("<div class='button " + this.options.stop + "'></div>"), this.controls.controlbar.append(this.controls.stop)), this._checkControl("replay") == 1 && (this.controls.replay = $("<div class='button " + this.options.replay + "'></div>"), this.controls.controlbar.append(this.controls.replay)), this._checkControl("fullscreen") == 1 && (this.controls.fullscreen = $("<div class='button " + this.options.fullscreen + "'></div>"), this.controls.controlbar.append(this.controls.fullscreen)), this._checkControl("time") == 1 && (this.controls.time = $("<span class='" + this.options.time + "'>00:00</span>"), this.controls.controlbar.append(this.controls.time)), this._checkControl("remain") == 1 && (this.controls.remain = $("<span class='" + this.options.remain + "'>00:00</span>"), this.controls.controlbar.append(this.controls.remain)), this._checkControl("seek") == 1 && (this.controls.seek = $("<div class='" + this.options.seek + "'></div>"), this.controls.controlbar.append(this.controls.seek), this.controls.seek.slider(this.options.slider)), this._checkControl("prev") == 1 && (this.controls.prev = $("<div class='button " + this.options.prev + "'></div>"), this.controls.controlbar.append(this.controls.prev)), this._checkControl("next") == 1 && (this.controls.next = $("<div class='button " + this.options.next + "'></div>"), this.controls.controlbar.append(this.controls.next)), this.element.append(this.controls.controlbar)
            },
            _updateTime: function() {
                i = this.media.currentTime, i = Math.floor(i);
                if (parseFloat(this.controls.time.data("time")) == i) return;
                this.controls.time.data("time", i);
                var e = Math.floor(i / 3600),
                    t = Math.floor(i / 60),
                    n = Math.floor(i % 60);
                e = e < 10 ? "0" + e : e, t = t < 10 ? "0" + t : t, n = n < 10 ? "0" + n : n;
                var r = t + ":" + n;
                this.controls.time.html(r);
                var i = Math.floor(this.media.duration - this.media.currentTime),
                    e = Math.floor(i / 3600),
                    t = Math.floor(i / 60),
                    n = Math.floor(i % 60);
                e = e < 10 ? "0" + e : e, t = t < 10 ? "0" + t : t, n = n < 10 ? "0" + n : n;
                var r = t + ":" + n;
                this.controls.remain && this.controls.remain.html("-" + r)
            },
            _updateSeek: function(e) {
                if (parseFloat(this.controls.seek.data("duration")) == e) return;
                if (this.controls.seek.length > 0) {
                    this.controls.seek.data("duration", e);
                    var t = e * 100 / this.media.duration;
                    this.controls.seek.slider("value", t)
                }
            },
            destroy: function() {
                this.media.pause(), $(this.media).css({
                    "-webkit-transform": "translateX(" + this.options.translate + "px)"
                }), this.element.remove()
            }
        }), $.fn.drcom_video = function(e) {
            return this.each(function() {
                new Drcom.Video($(this), e)
            }), this
        }
    })(), define("video", function() {}), require([], function() {
        function e(t, n, r) {
            var i, s, o = t.width,
                u = t.width,
                a, f;
            f = $(t.parentNode), this.element = i = f.append("<canvas class='reflection' style='position:absolute'/>").find(":last")[0];
            if (!e.getContext && $.browser.msie) this.element = e = f.append("<img class='reflection' style='position:absolute'/>").find(":last")[0], i.src = t.src, i.style.filter = "flipv progid:DXImageTransform.Microsoft.Alpha(opacity=" + r * 100 + ", style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=" + n / u * 100 + ")";
            else {
                s = e.getContext("2d");
                try {
                    $(i).attr({
                        width: o,
                        height: n
                    }), s.save(), s.translate(0, u - 1), s.scale(1, -1), s.drawImage(t, 0, 0, o, u), s.restore(), s.globalCompositeOperation = "destination-out", a = s.createLinearGradient(0, 0, 0, n), a.addColorStop(0, "rgba(255, 255, 255, " + (1 - r) + ")"), a.addColorStop(1, "rgba(255, 255, 255, 1.0)"), s.fillStyle = a, s.fillRect(0, 0, o, n)
                } catch (l) {
                    return
                }
            }
            $(i).attr({
                alt: $(t).attr("alt"),
                title: $(t).attr("title")
            })
        }
        var t = function(t, n) {
                this.orgWidth = t.scrollWidth == undefined ? t.width : t.scrollWidth, this.orgHeight = t.scrollHeight == undefined ? t.height : t.scrollHeight, this.image = t, this.reflection = null, this.imageOK = !1, this.options = n, this.imageOK = !0, this.options.reflHeight > 0 && (this.reflection = new e(this.image, this.options.reflHeight, this.options.reflOpacity)), $(this.image).css("position", "absolute")
            },
            n = function(e, n, r) {
                var i = [],
                    s = Math.sin,
                    o = Math.cos,
                    u = this;
                this.controlTimer = 0, this.stopped = !1, this.container = e, this.xRadius = r.xRadius, this.yRadius = r.yRadius, this.showFrontTextTimer = 0, this.autoRotateTimer = 0, r.xRadius === 0 && (this.xRadius = $(e).width() / 2.3), r.yRadius === 0 && (this.yRadius = $(e).height() / 6), this.xCentre = r.xPos, this.yCentre = r.yPos, this.frontIndex = 0, this.rotation = this.destRotation = Math.PI / r.position, this.timeDelay = 1e3 / r.FPS, $(e).css({
                    position: "relative",
                    overflow: "hidden"
                }), $(e).bind("click", this, function(e) {
                    clearInterval(e.data.autoRotateTimer), clearTimeout(e.data.showFrontTextTimer);
                    if (r.bringToFront && e.type == "click" && ($(e.target).data("itemIndex") != undefined || $(e.target).parent(".cloudcarousel").data("itemIndex") != undefined)) {
                        var t = $(e.target).data("itemIndex") == undefined ? $(e.target).parent(".cloudcarousel").data("itemIndex") : $(e.target).data("itemIndex"),
                            i = e.data.frontIndex,
                            s = (t - i) % n.length;
                        Math.abs(s) > n.length / 2 && (s += s > 0 ? -n.length : n.length), e.data.rotate(-s)
                    }
                }), $(e).bind("mousedown", this, function(e) {
                    return e.data.container.focus(), !1
                }), this.innerWrapper = $(e).wrapInner('<div style="position:absolute;width:100%;height:100%;"/>').children()[0], this.showFrontText = function() {
                    if (i[this.frontIndex] === undefined) return
                }, this.go = function() {
                    if (this.controlTimer !== 0) return;
                    var e = this;
                    this.controlTimer = setTimeout(function() {
                        e.updateAll()
                    }, this.timeDelay)
                }, this.stop = function() {
                    clearTimeout(this.controlTimer), this.controlTimer = 0
                }, this.rotate = function(e) {
                    this.frontIndex -= e, this.frontIndex %= i.length, this.destRotation += Math.PI / i.length * 2 * e, this.showFrontText(), this.go()
                }, this.autoRotate = function() {
                    if (r.autoRotate !== "no") {
                        var e = r.autoRotate === "right" ? 1 : -1;
                        this.autoRotateTimer = setInterval(function() {
                            u.rotate(e)
                        }, r.autoRotateDelay)
                    }
                }, this.updateAll = function() {
                    var e = r.minScale,
                        t = (1 - e) * r.carouselRadius,
                        n, u, a, f, l, c, h, p = this.destRotation - this.rotation,
                        d = Math.abs(p);
                    this.rotation += p * r.speed, d < .001 && (this.rotation = this.destRotation);
                    var v = i.length,
                        m = Math.PI / v * 2,
                        g = this.rotation;
                    this.innerWrapper.style.display = "none";
                    var y, b = "px",
                        w, E = this;
                    for (var S = 0; S < v; S++) {
                        c = i[S], h = s(g), l = (h + 1) * t + e, a = this.xCentre + (o(g) * this.xRadius - c.orgWidth * 0) * l, f = this.yCentre + h * this.yRadius * l;
                        if (c.imageOK) {
                            var x = c.image;
                            n = c.orgWidth * l, u = c.orgHeight * l, x.scrollWidth === undefined ? $(x).animate({
                                left: a,
                                top: f,
                                transform: "scale(" + l + ")",
                                transition: "transform 0.5s linear, left 0.5s linear, top 0.5s linear",
                                zIndex: l * 100 >> 0
                            }, 0) : $(x).css({
                                left: a,
                                top: f,
                                transform: "scale(" + l + ")",
                                transition: "transform 0.5s linear, left 0.5s linear, top 0.5s linear",
                                zIndex: l * 100 >> 0
                            }), c.reflection !== null && (w = r.reflHeight * l, y = c.reflection.element.style, y.left = a + b, y.top = f + u + r.reflGap * l + b, y.width = n + b, y.height = w + b)
                        }
                        g += m
                    }
                    this.innerWrapper.style.display = "block", d >= .001 ? this.controlTimer = setTimeout(function() {
                        E.updateAll()
                    }, this.timeDelay) : this.stop()
                }, this.checkImagesLoaded = function() {
                    var e;
                    for (e = 0; e < n.length; e++)
                        if (!n[e].scrollWidth === undefined && n[e].width === undefined) return;
                    for (e = 0; e < n.length; e++) i.push(new t(n[e], r)), $(n[e]).data("itemIndex", e);
                    clearInterval(this.tt), this.showFrontText(), this.autoRotate(), this.updateAll();
                    for (e = 0; e < n.length; e++) n[e].style.visibility = "visible"
                }, this.tt = setInterval(function() {
                    u.checkImagesLoaded()
                }, 50)
            };
        $.fn.CloudCarousel = function(e) {
            return this.each(function() {
                e = $.extend({}, {
                    reflHeight: 0,
                    reflOpacity: .5,
                    reflGap: 0,
                    minScale: .5,
                    xPos: 0,
                    yPos: 0,
                    xRadius: 0,
                    yRadius: 0,
                    altBox: null,
                    titleBox: null,
                    FPS: 30,
                    autoRotate: "no",
                    autoRotateDelay: 1500,
                    speed: .2,
                    mouseWheel: !1,
                    bringToFront: !1
                }, e), $(this).data("cloudcarousel", new n(this, $(".cloudcarousel", $(this)), e))
            }), this
        }
    }), define("slideshow", function() {}), require([], function() {
        Drcom.CoverFlow = Drcom.Controller.extend({
            pluginName: "drcom_coverflow",
            init: function(e, t) {
                this.super.init.apply(this, arguments), $.extend(this.options, {
                    events: [],
                    click: function(e, t, n) {},
                    distance: 150,
                    z: 100,
                    rotateY: 0,
                    distanceleft: 0,
                    distancelright: 0,
                    cycle: !1,
                    change: function(e, t, n) {},
                    beforeChange: function(e, t) {},
                    duration: 1200,
                    scale: 0,
                    opacity: 0,
                    draggable: !0
                }, this.options, t);
                var n = parseFloat((this.items.length - 1) * this.options.distance) + $(this.items[0]).width();
                this.element.width(n), this.changeByPercent(0), this.options.draggable && this.element.bind("vmousedown", this.callback("vmousedown"))
            },
            _getPos: function() {
                return {
                    x: x,
                    y: y
                }
            },
            _setPos: function(e, t) {
                this.x = e, this.y = t, this.element.css({
                    "-webkit-transform": "translate3d(" + e + "px,0px,0px)"
                })
            },
            _setPosAni: function(e, t, n) {
                this.x = e, this.y = t, this.element.animate({
                    transform: "translate3d(" + e + "px,0px,0px)"
                }, this.options.duration, n)
            },
            getComputedPosition: function() {
                var e = window.getComputedStyle(this.element[0], null),
                    t, n;
                return e = e.webkitTransform.split(")")[0].split(", "), t = +(e[12] || e[4]), n = +(e[13] || e[5]), {
                    x: t,
                    y: n
                }
            },
            scrollTo: function(e, t, n, r) {
                var i = this,
                    s = parseFloat((this.items.length - 1) * this.options.distance),
                    o = 1 - Math.abs(e / s);
                this.x = e, this.y = t;
                var u = {
                    translateX: this.getComputedPosition().x
                };
                TweenLite.to(u, this.options.duration / 1e3, {
                    translateX: e,
                    onComplete: function() {
                        r && r()
                    },
                    onUpdate: function(e) {
                        i.changeByPosition(u.translateX, 0)
                    },
                    onUpdateParams: [u.translateX]
                })
            },
            checkMove: function(e, t) {
                var n = !1;
                return Math.abs(e.screenX - t.screenX) > 1 && (n = !0), Math.abs(e.screenY - t.screenY) > 1 && (n = !0), n
            },
            vmousedown: function(e) {
                if (this.blocked == 1) return;
                this.blocked = !0;
                var t = e;
                this.startTime = Date.now(), this.startX = this.x, this.startY = this.y, this.pageX = t.pageX, this.pageY = t.pageY, this.firstX = this.x, this.firstY = this.y, this.startEvent = e, $(window).bind("vmousemove.coverflow", this.callback("_mousemove")), $(window).bind("vmouseup.coverflow", this.callback("_mouseup"))
            },
            _mousemove: function(e) {
                var t = e,
                    n = t.pageX - this.pageX,
                    r = t.pageY - this.pageY,
                    i = this.firstX + n,
                    s = this.firstY + r;
                timestamp = Date.now(), this.changeByPosition(i, s), timestamp - this.startTime > 300 && (this.startTime = timestamp, this.startX = this.x, this.startY = this.y)
            },
            _mouseup: function(e) {
                $(window).unbind("vmousemove.coverflow"), $(window).unbind("vmouseup.coverflow");
                var t = this,
                    n = Date.now() - t.startTime,
                    r = this.x;
                if (n < 300 && r != this.startX) {
                    var i = this.element.parent().width(),
                        s = this.element.width(),
                        o = this.momentum(r, this.startX, n, -s, 0),
                        u = o.destination,
                        a = o.duration;
                    if (u != r) {
                        this.scrollTo(u, 0, a, function() {
                            t.blocked = !1
                        });
                        return
                    }
                }
                this.blocked = !1
            },
            momentum: function(e, t, n, r, i, s) {
                var o = e - t,
                    u = Math.abs(o) / n,
                    a, f;
                return s = s === undefined ? 6e-4 : s, a = e + u * u / (2 * s) * (o < 0 ? -1 : 1), f = u / s, a < r ? (a = i ? r - i / 2.5 * (u / 8) : r, o = Math.abs(a - e), f = o / u) : a > 0 && (a = i ? i / 2.5 * (u / 8) : 0, o = Math.abs(e) + a, f = o / u), {
                    destination: Math.round(a),
                    duration: f
                }
            },
            _bindEvents: function() {
                this.bind(this.items, "tapone", this.callbackEvent("item_click"))
            },
            item_click: function(e, t) {
                if (this.blocked == 1) return;
                for (var n = 0; n < this.items.length; n++) {
                    if (this.items[n] == e[0] && n == this.current) {
                        this._trigger("click", null, [this, n]);
                        return
                    }
                    if (this.items[n] == e[0]) {
                        this.change(n);
                        return
                    }
                }
            },
            changeByPosition: function(e, t) {
                var n = parseFloat((this.items.length - 1) * this.options.distance),
                    r = parseFloat(0 * this.options.distance);
                e > -r && (e = -r), e < -n && (e = -n);
                var i = Math.abs(e / n);
                this.changeByPercent(i)
            },
            changeByPercent: function(e) {
                var t = Math.floor((this.items.length - 1) * e);
                this.options.beforeChange(this, t);
                var n = parseFloat((this.items.length - 1) * this.options.distance),
                    r = 0,
                    i = 0,
                    s = 1,
                    o = 1,
                    u = [],
                    a = [],
                    f = this.options.scale,
                    l = this.options.opacity,
                    c = (this.items.length - 1) * e;
                c -= Math.floor(c);
                for (var h = 0; h < this.items.length; h++) s -= f, o -= l, u.push(s), a.push(o);
                this.current != t && (this.prevIndex = this.current), this.items.not(this.items[t]).removeClass("ani"), $(this.items[this.prevIndex]).addClass("ani");
                for (var h = 0; h < this.items.length; h++) {
                    if (h < t) {
                        var s = u[t - h - 1],
                            p = s - f,
                            d = s + (p - s) * c,
                            v = a[t - h - 1],
                            m = v - l,
                            g = v + (m - v) * c,
                            y = $(this.items[0]).width() - $(this.items[0]).width() * d - r;
                        $(this.items[h]).css({
                            "-webkit-transform": "translate3d(" + -y + "px,0px,0px)  scale(" + d + ")  rotateY(" + this.options.rotateY + "deg) ",
                            "z-index": h,
                            opacity: g
                        })
                    }
                    h == t && (r += this.options.distanceleft, i = r, $(this.items[h]).css({
                        "-webkit-transform": "translate3d(" + r + "px,0px," + this.options.z + "px)   scale(1)",
                        "z-index": this.items.length,
                        opacity: 1
                    }), r += this.options.distancelright);
                    if (h > t) {
                        var s = u[h - t - 1],
                            p = s - f,
                            d = s - (p - s) * c,
                            v = a[t - h - 1],
                            m = v - l,
                            g = v - (m - v) * c;
                        $(this.items[h]).css({
                            "-webkit-transform": "translate3d(" + r + "px,0px,0px)    scale(" + d + ") rotateY(-" + this.options.rotateY + "deg)",
                            "z-index": this.items.length - h - 1,
                            opacity: g
                        })
                    }
                    r += this.options.distance
                }
                this.items.not($(this.items[t])).removeClass("active"), $(this.items[t]).addClass("active"), this._setPos(-n * e, 0), this.current = t, this.options.change(this, t, n * e)
            },
            change: function(e) {
                if (this.blocked == 1) return;
                this.blocked = !0, this.options.beforeChange(this, e), this.items.stop(), this.element.stop();
                var t = 0,
                    n = 0,
                    r = 1,
                    i = 1,
                    s = [],
                    o = [],
                    u = this.options.scale,
                    a = this.options.opacity;
                for (var f = 0; f < this.items.length; f++) r = Math.round((r - u) * 1e3) / 1e3, s.push(r), i = Math.round((i - a) * 1e3) / 1e3, o.push(i);
                for (var f = 0; f < this.items.length; f++) {
                    if (f < e) {
                        var l = $(this.items[0]).width() - $(this.items[0]).width() * s[e - f - 1] - t;
                        $(this.items[f]).css({
                            transform: "translate3d(" + -l + "px,0px,0px)   scale(" + s[e - f - 1] + ")  rotateY(" + this.options.rotateY + "deg)",
                            "-webkit-transform": "translate3d(" + -l + "px,0px,0px)   scale(" + s[e - f - 1] + ")  rotateY(" + this.options.rotateY + "deg)",
                            opacity: o[e - f - 1],
                            "-webkit-transition": "all " + this.options.duration / 1.5 / 1e3 + "s"
                        }), $(this.items[f]).css({
                            "z-index": f
                        })
                    }
                    f == e && (t += this.options.distanceleft, n = t, console.log("item class", $(this.items[f]), -l, s[e - f - 1], this.options.rotateY), $(this.items[f]).css({
                        transform: "translate3d(" + t + "px,0px," + this.options.z + "px) scale(1)",
                        "-webkit-transform": "translate3d(" + t + "px,0px," + this.options.z + "px) scale(1)",
                        opacity: 1,
                        "-webkit-transition": "all " + this.options.duration / 1.5 / 1e3 + "s"
                    }), $(this.items[f]).css({
                        "z-index": this.items.length
                    }), t += this.options.distancelright, this.items.removeClass("active"), $(this.items[e]).addClass("active")), f > e && ($(this.items[f]).css({
                        transform: "translate3d(" + t + "px,0px,0px)    scale(" + s[f - e - 1] + ") rotateY(-" + this.options.rotateY + "deg)",
                        "-webkit-transform": "translate3d(" + t + "px,0px,0px)    scale(" + s[f - e - 1] + ") rotateY(-" + this.options.rotateY + "deg)",
                        opacity: o[f - e - 1],
                        "-webkit-transition": "all " + this.options.duration / 1.5 / 1e3 + "s"
                    }), $(this.items[f]).css({
                        "z-index": this.items.length - f - 1
                    })), t += this.options.distance
                }
                this.items.removeClass("active"), $(this.items[e]).addClass("active");
                var c = this;
                this._setPosAni(-n, 0, function() {
                    c.blocked = !1, c.current = e, c.options.change(c, e, n)
                })
            }
        }), $.fn.drcom_coverflow = function(e) {
            return $(this).each(function() {
                new Drcom.CoverFlow($(this), e)
            }), $(this)
        }
    }), define("coverflow", function() {}), define("text!plugins/template/callsummary.html", [], function() {
        return '<div id="wrapper" class="wrapper">\r\n    <div class="topline"></div>\r\n    <div id="Slides">\r\n        <section class="slide" data-slide="callSummary">\r\n            <header>\r\n                <h1><%= header %></h1>\r\n            </header>\r\n            <div class="summaryContainer">\r\n                <div class="column">\r\n                    <h2><%= visitedTitle %></h2>\r\n\r\n                    <% if (flows) { %>\r\n                        <div class="flow_buttons_bar top_buttons">\r\n                            <% _.each(flows, function(flowId, i) { %>\r\n                                <div class="flow_btn <%= buttonCls[i] || \'\' %> <%= (flowId == drcom.currentFlowId ? \'actived\': \'\') %>" flow-id="<%= flowId %>"></div>\r\n                            <% }); %>\r\n                        </div>\r\n                    <% } %>\r\n\r\n                    <%\r\n                        var groupedVisited = {};\r\n                        _.each(visited, function(slides, flowId) {\r\n                            if (!groupedVisited[flowId]) groupedVisited[flowId] = [];\r\n                            _.each(slides, function(item) {\r\n                                if ($.inArray(item.topic, groupedVisited[flowId])  < 0)\r\n                                    groupedVisited[flowId].push(item.topic);\r\n                            });\r\n                        });\r\n                    %>\r\n\r\n                    <% _.each(groupedVisited, function(topics, flowId) { %>\r\n                    \r\n                        <div class="leftCont <%= (flowId == drcom.currentFlowId ? \'actived\': \'\') %>" flow-id="<%= flowId %>">\r\n                            <div class="content">\r\n                                <ul>\r\n                                    <% _.each(topics, function(topic) { %>\r\n                                        <li><%= topic %></li>\r\n                                    <% }); %>\r\n                                    <% _.each(popup[flowId], function(item) { %>\r\n                                        <li><%= item.topic %></li>\r\n                                    <% }); %>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                    <% }); %>\r\n                </div>\r\n                <div class="column">\r\n                    <h2><%= notVisitedTitle %></h2>\r\n\r\n                    <%\r\n                        var groupedNotVisited = {};\r\n                        _.each(notVisited, function(slides, flowId) {\r\n                            if (!groupedNotVisited[flowId]) groupedNotVisited[flowId] = [];\r\n                            _.each(slides, function(item) {\r\n                                if ($.inArray(item.topic, groupedNotVisited[flowId])  < 0)\r\n                                    groupedNotVisited[flowId].push(item.topic);\r\n                            });\r\n                        });\r\n                    %>\r\n\r\n                    <% _.each(groupedNotVisited, function(topics, flowId) { %>\r\n                        <div class="rightCont <%= (flowId == drcom.currentFlowId ? \'actived\': \'\') %>" flow-id="<%= flowId %>">\r\n                            <div class="content">\r\n                                <ul>\r\n                                    <% _.each(topics, function(topic) { %>\r\n                                        <li><%= topic %></li>\r\n                                    <% }); %>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                    <% }); %>\r\n\r\n                    <% if (flows) { %>\r\n                        <div class="flow_buttons_bar bottom_buttons">\r\n                            <% _.each(flows, function(flowId, i) { %>\r\n                                <div class="flow_btn  <%= buttonCls[i] || \'\' %> <%= (flowId == drcom.currentFlowId ? \'actived\': \'\') %>" flow-id="<%= flowId %>" flow-id="<%= flowId %>"></div>\r\n                            <% }); %>\r\n                        </div>\r\n                    <% } %>\r\n\r\n                    <div class="helveticaneueltstd_hv" id="submitSelected"><%= submitBtnText %></div>\r\n                    <div class="helveticaneueltstd_hv" id="resetSelected"><%= resetBtnText %></div>\r\n                </div>\r\n            </div>\r\n        </section>\r\n    </div>\r\n</div>'
    }), require(["text!plugins/template/callsummary.html"], function(e) {
        var t = function() {};
        t.prototype = {
            options: {
                starttime: null,
                duration: 0
            },
            saveData: function() {
                var e = {},
                    t = drcom.storage.get("summaryData"),
                    n = drcom.getCurrentSlide(),
                    r = n.id,
                    i = drcom.currentFlowId,
                    s = this.options;
                t && (e = t[i] || {}), e[r] = {
                    name: n.name,
                    flow: i,
                    starttime: s.starttime,
                    duration: s.duration,
                    topic: n.topic
                };
                var o = {};
                o[i] = e, drcom.storage.set("summaryData", o)
            },
            duration: function() {
                return (new Date - this.options.starttime) / 1e3
            }
        };
        var n = function() {};
        n.prototype = {
            options: {
                topic: "",
                flow: drcom.currentFlowId,
                name: "",
                startTime: null,
                duration: 0
            },
            createData: function(e) {
                var e = $(e),
                    t = e.find(".close_pu"),
                    n = drcom.getCurrentSlide(),
                    r = e.attr("topic") || "",
                    i = new Date,
                    s = this.options;
                s.startTime = i, s.topic = r, s.name = n.name, t.length && t.bind("tapone", this.saveData.bind(this))
            },
            saveData: function() {
                var e = this.options;
                if (e.topic.length < 1) return;
                e.duration = (new Date - e.startTime) / 1e3;
                var t = {},
                    n = {},
                    r = drcom.currentFlowId;
                drcom.storage.get("popupData") && (t = drcom.storage.get("popupData")[r] || {}, n = drcom.storage.get("popupData")), t[e.topic] = e, n[r] = t, drcom.storage.set("popupData", n)
            }
        }, window.PopupTrack = new n, Drcom.CallSummary = Drcom.Controller.extend({
            pluginName: "drcom_callsummary",
            summaryTrack: new t,
            popupTrack: PopupTrack,
            nextCall_text: "",
            init: function(e, t) {
                this.super.init.apply(this, [e, t]), drcom.waitForPlayer($.proxy(this.render, this)), $(document).bind("beforeGotoSlide", $.proxy(this.onBeforeGotoSlide, this)), drcom.ready($.proxy(this.onReady, this))
            },
            render: function() {
                if (this._isCallSummaryPage()) {
                    this.element.find("#wrapper").remove();
                    var e = $(".backBtn");
                    e.length || (e = $("<div class='backBtn'></div>").appendTo(this.element)), e.bind("tapone", this.onBack), this._renderPage()
                } else this.startSavingSlide()
            },
            startSavingSlide: function() {
                if (!this.savingTimer) {
                    var e = $.proxy(this.onSavingSlide, this);
                    this.savingTimer = setTimeout(e, 5e3)
                }
            },
            onBeforeGotoSlide: function() {
                var e = this.summaryTrack,
                    t = this.popupTrack;
                e.options.duration = e.duration(), e.saveData(), $("#container").find(".popup").each(function() {
                    $(this).css("display") == "block" && t.saveData()
                })
            },
            onReady: function() {
                this.summaryTrack.options.starttime = new Date
            },
            onReload: function() {
                this._isCallSummaryPage() && (this.element.find("#wrapper").remove(), this._renderPage())
            },
            onSavingSlide: function() {
                var e = this._allTrackingPages(),
                    t = drcom.storage.get("visited") || {},
                    n = t[drcom.currentFlowId] || {},
                    r = drcom.getCurrentSlide();
                if (!r || $.inArray(r.id, e[drcom.currentFlowId]) < 0) return;
                var i = _.some(n, function(e) {
                    return e == r.topic
                });
                i || r.topic && r.topic !== "" && (n[r.id] = {}, n[r.id].topic = r.topic, n[r.id].name = r.name, t[drcom.currentFlowId] = n, drcom.storage.set("visited", t))
            },
            onBack: function() {
                drcom.gotoSlide(drcom.storage.get("prevSlide") || drcom.menuItem)
            },
            onSelectTopic: function(e) {
                var t = $(e.currentTarget);
                this.submitBtn.hasClass("submitted") || (t.toggleClass("active"), this.rightContainer.find("li.active").length ? (this.submitBtn.addClass("chosen"), this.resetBtn.addClass("chosen")) : (this.submitBtn.removeClass("chosen"), this.resetBtn.removeClass("chosen")))
            },
            onSubmit: function() {
                var e = this.submitBtn,
                    t = drcom.config.callSummary,
                    n = this;
                if (e.hasClass("chosen") && !e.hasClass("submitted")) {
                    var r = {
                        dr_CallSummary_vod__c: this._renderCallSummaryTopic()
                    };
                    this._storeSelected(function() {
                        var i = t.submittedBtnText || "Submitted";
                        e.addClass("submitted").html(i), n.rightContainer.find("li.active").removeClass("active").addClass("submitted"), t.saveToVeevaAccount && com.veeva.clm.getDataForCurrentObject("Account", "ID", function(e) {
                            e.success && com.veeva.clm.updateRecord("Account", e.Account.ID, r, function(e) {
                                debug.log(e)
                            })
                        })
                    })
                }
            },
            onReset: function() {
                var e = drcom.config.callSummary,
                    t = e.submitBtnText || "Submit Selected";
                this.submitBtn.removeClass("chosen submitted").html(t), this.resetBtn.removeClass("chosen"), this.rightContainer.find("li").removeClass("active submitted")
            },
            onSelectFlow: function(e, t) {
                var n = $(t.currentTarget),
                    r = n.attr("flow-id");
                n.siblings().removeClass("actived"), n.addClass("actived"), e.each(function() {
                    var e = $(this);
                    e.removeClass("actived"), e.attr("flow-id") === r && e.addClass("actived")
                }), setTimeout($.proxy(this._refreshScroller, this, r), 10)
            },
            onScrollStart: function() {
                drcom.disableSwipe()
            },
            onScrollEnd: function() {
                drcom.enableSwipe()
            },
            _renderPage: function() {
                var t = !1,
                    n = drcom.config.callSummary;
                drcom.currentFlowId !== "singleFlow" && (t = _.keys(n.slides)), this._prepareData();
                var r = drcom.storage.get("popupData") || {},
                    i = n.buttonCls || [],
                    s = this.options.template || e;
                this.element.append(_.template(s)({
                    flows: t,
                    visited: this.visited,
                    notVisited: this.notVisited,
                    popup: r,
                    buttonCls: i,
                    header: n.header || "CALL SUMMARY",
                    visitedTitle: n.visitedTitle || "Today we<br>discussed",
                    notVisitedTitle: n.notVisitedTitle || "What would you like to<br>discuss next time?",
                    submitBtnText: n.submitBtnText || "Submit Selected",
                    resetBtnText: n.resetBtnText || "Reset"
                })), this.submitBtn = $("#submitSelected", this.element), this.resetBtn = $("#resetSelected", this.element), this.leftContainer = $(".leftCont", this.element), this.rightContainer = $(".rightCont", this.element), this.leftScrolls = {}, this.rightScrolls = {};
                var o = {
                        zoom: !1,
                        scrollbar: !1,
                        hideScrollbar: !0,
                        useTransfrom: !0,
                        bounce: !0
                    },
                    u = this;
                this.leftContainer.find(".content").each(function() {
                    u._scrollFor($(this), u.leftScrolls, o)
                }), this.rightContainer.find(".content").each(function() {
                    var e = $(this),
                        t = u.onSelectTopic;
                    u._scrollFor(e, u.rightScrolls, o), e.on("tapone", "li", $.proxy(t, u))
                }), this.rightContainer.hasClass("actived") && this.rightContainer.find("li.active").length && (this.submitBtn.addClass("chosen"), this.resetBtn.addClass("chosen")), this._bindEvents()
            },
            _prepareData: function() {
                var e = drcom.storage.get("visited") || {},
                    t = {},
                    n = this._allTrackingPages();
                _.each(n, function(n, r) {
                    t[r] = {}, e[r] || (e[r] = {}), _.each(n, function(n) {
                        var i = drcom.getSlide(n, r);
                        i && (e[r][i.id] || this._isExistedForFlow(e, i.topic, r) || (t[r][i.id] = {
                            topic: i.topic,
                            name: i.name
                        }))
                    }, this)
                }, this), this.visited = e, this.notVisited = t
            },
            _bindEvents: function() {
                var e = $(".flow_buttons_bar.top_buttons", this.element),
                    t = $(".flow_buttons_bar.bottom_buttons", this.element),
                    n = this.onSelectFlow;
                e.on("tapone", ".flow_btn", $.proxy(n, this, this.leftContainer)), t.on("tapone", ".flow_btn", $.proxy(n, this, this.rightContainer)), this.submitBtn.bind("tapone", $.proxy(this.onSubmit, this)), this.resetBtn.bind("tapone", $.proxy(this.onReset, this))
            },
            _scrollFor: function(e, t, n) {
                var r = e.find("ul"),
                    i = this._heightForEl(r, e.parent()),
                    s = e.parent().attr("flow-id");
                r.height(i + 50);
                var o = new IScroll(e[0], n);
                o.on("scrollStart", $.proxy(this.onScrollStart, this)), o.on("scrollEnd", $.proxy(this.onScrollEnd, this)), t[s] = o
            },
            _refreshScroller: function(e) {
                this.leftScrolls[e].refresh(), this.rightScrolls[e].refresh()
            },
            _heightForEl: function(e, t) {
                t.show();
                var n = e.height();
                return t.removeAttr("style"), n
            },
            _storeSelected: function(e) {
                var t = this;
                setTimeout(function() {
                    var n = t._mapData();
                    t._saveData(n, e)
                }, 0)
            },
            _saveData: function(e, t) {
                var n = this;
                if (drcom.config.player === "Veeva" && e !== "") {
                    var r = {
                        Question_vod__c: "Call Summary",
                        Track_Element_Description_vod__c: "Slides that user has visited.",
                        Answer_vod__c: e,
                        Survey_Type_vod__c: "freetext"
                    };
                    com.veeva.clm.createRecord("Call_Clickstream_vod__c", r, function(e) {
                        com.veeva.clm.updateCurrentRecord("Call", {
                            Next_Call_Notes_vod__c: n.nextCall_text
                        }, t)
                    })
                } else t && t()
            },
            _allTrackingPages: function() {
                var e = [];
                return drcom.currentFlowId === "singleFlow" ? e = {
                    singleFlow: drcom.config.callSummary.slides || []
                } : e = drcom.config.callSummary.slides || {}, e
            },
            _isCallSummaryPage: function() {
                var e = drcom.getCurrentSlide();
                return e && e.name.toLowerCase().indexOf("callsummary") >= 0
            },
            _isExistedForFlow: function(e, t, n) {
                n = n || drcom.currentFlowId;
                var r = e[n] || {};
                return _.some(r, function(e) {
                    return e.topic === t
                })
            },
            _mapData: function() {
                var e = drcom.storage.get("summaryData") || {},
                    t = drcom.storage.get("visited") || {},
                    n = drcom.storage.get("popupData") || {},
                    r = "Slides: ";
                for (var i in t)
                    if (e[i]) {
                        var s = t[i];
                        for (var o in s) e[i][o] && (s[o] = e[i][o]), r += "Topic: " + s[o].topic + ", Asset name: " + s[o].name + ", Flow id: " + s[o].flow + ", Duration: " + s[o].duration + ", Start time: " + s[o].starttime + "; "
                    }
                var u = [];
                $(".rightCont li.active").each(function(e, t) {
                    u.push($(t).text())
                });
                if (u.length > 0) {
                    r += " Not visited: " + u.join("--") + ";";
                    var a = "Choosen topics: " + u.join("--");
                    this.nextCall_text = a
                }
                drcom.storage.get("popupData") && (r += "Popup: ");
                for (var i in n) {
                    var f = n[i];
                    for (var l in f) r += "Topic:" + l + ", Asset name: " + f[l].name + ", Flow id: " + f[l].flow + ", Duration: " + f[l].duration + ", Start time: " + f[l].startTime + "; "
                }
                return r
            },
            _renderCallSummaryTopic: function() {
                var e = "";
                if (drcom.config.callSummary.urlList) {
                    var t = drcom.config.callSummary.urlList;
                    $(".rightCont li.active").each(function(n, r) {
                        var i = $(r).html();
                        t[i] && (e += i + "==" + t[i] + ";")
                    })
                }
                return e.length > 0 && (e = e.substring(0, e.length - 1)), e
            }
        }), $.fn.drcom_callsummary = function(e) {
            return $(this).each(function() {
                new Drcom.CallSummary($(this), e)
            }), $(this)
        };
        var r = drcom.config.callSummary;
        if (r && r.isShow) {
            var i = $("#container");
            if (r.customTemplate) {
                var s = "text!" + r.customTemplate;
                require([s], function(e) {
                    i.drcom_callsummary({
                        template: e
                    })
                })
            } else i.drcom_callsummary()
        }
    }), define("callsummary", function() {}), define("text!plugins/template/survey.html", [], function() {
        return '<div class="controls-bar">\r\n	<span class="btn_line"></span>\r\n	<span class="control-prev"></span>\r\n	<span class="control-next"></span>\r\n	<span class="control-submit"></span>\r\n	<span class="control-reload"></span>\r\n</div>\r\n<div class="question-list">\r\n	<div class="question-list-content">\r\n		<% _.each(questionObj, function(question, j) {\r\n			var type = question.RecordTypeName,\r\n				id = question.ID,\r\n				text = question.Text_vod__c,\r\n				choices = question.Answer_Choice_vod__c.replace(/;0/g, "").split(";"),\r\n				response = question.Response_vod__c || "";\r\n		%>\r\n			<div id="<%= id %>" class="survey-question" type="<%= type %>">\r\n				<div class="question-title">\r\n					<div class="question-num"><%= (j + 1) %></div>\r\n					<div class="question-text"><span><%= text %></span></div>\r\n				</div>\r\n				<div class="question-choices">\r\n					<% if (type === "Picklist") { %> \r\n						<select name="<%= id%>">\r\n							<option value="" <%= (value == response ? "selected" : "") %>>== Select your answer ==</option>\r\n							<% _.each(choices, function(value, i) { %>\r\n								<option value="<%= value %>" <%= (value == response ? "selected" : "") %>><%= value %></option>\r\n							<% }); %>\r\n						</select>\r\n					<% } else if (type === "Text") { %> \r\n						<input type="text" name="<%= id %>" value="<%= response %>">\r\n					<% } else if (type === "Radio") { %> \r\n						<ul>\r\n							<% _.each(choices, function(value, i) { %>\r\n								<li>\r\n									<input type="radio" name="<%= id %>" id="<%= (id + i) %>" value="<%= value %>" <%= (value == response ? "checked": "") %>>\r\n									<label for="<%= (id + i) %>" class="radio"><%= value %></label>\r\n								</li>\r\n							<% }); %>\r\n						</ul>\r\n					<% } else if (type === "Multiselect") { %> \r\n						<% var responses = response.split(";"); %>\r\n						<ul>\r\n							<% _.each(choices, function(value, i) { %>\r\n								<li>\r\n									<input type="checkbox" name="<%= id %>" id="<%= (id + i) %>" value="<%= value %>" <%= ($.inArray(value, responses) >= 0 ? "checked" : "") %>>\r\n									<label for="<%= (id + i) %>" class="checkbox"><%= value %></label>\r\n								</li>\r\n							<% }); %>\r\n						</ul>\r\n					<% } else if (type === "Number") { %> \r\n						<input type="number" name="<%= id %>" value="<%= response %>">\r\n					<% } else if (type === "Long Text") { %> \r\n						<textarea name="<%= id %>"><%= response %></textarea>\r\n					<% } %>\r\n				</div>\r\n			</div>\r\n		<% }); %>\r\n	</div>\r\n</div>'
    }), require(["text!plugins/template/survey.html"], function(e) {
        if (drcom.isPhantom) return;
        var t = function() {
            this.init.apply(this, arguments)
        };
        t.prototype = {
            recordTypes: {
                "012K00000008nF1IAI": "Picklist",
                "012K00000008nF3IAI": "Text",
                "012K00000008nF2IAI": "Radio",
                "012K00000008nEzIAI": "Multiselect",
                "012K00000008nF0IAI": "Number",
                "012K00000008nEyIAI": "Long Text",
                "012K00000008nEvIAI": "Date",
                "012K00000008nEwIAI": "Datetime",
                "012K00000008nExIAI": "Description"
            },
            fields: ["Text_vod__c", "Answer_Choice_vod__c", "Order_vod__c", "RecordTypeId", "Required_vod__c"],
            name: "Survey_Question_vod__c",
            clm: com.veeva.clm,
            init: function(e, t) {
                this.returnData = e, this.callback = t
            },
            initQueues: function() {
                var e = [];
                _.each(this.returnData, function(t) {
                    e.push(t.ID)
                }, this), this.queues = e
            },
            start: function() {
                this.initQueues(), this._next()
            },
            _next: function() {
                this.count = 0, this.queues.length ? (this.currentId = this.queues.pop(), this._query()) : this.callback && this.callback(this.returnData)
            },
            _checkQuery: function() {
                this.count++, this.count >= this.fields.length ? this._next() : this._query()
            },
            _query: function() {
                var e = $.proxy(this._queryCallback, this),
                    t = this.fields[this.count];
                this.clm.getDataForObject(this.name, this.currentId, t, e)
            },
            _queryCallback: function(e) {
                var t = this.fields[this.count],
                    n = this._findCurrentObjIndex(),
                    r = n >= 0 ? this.returnData[n] : {},
                    i = e[this.name][t];
                if (t == "RecordTypeId") {
                    var s = this.recordTypes[i] || "";
                    r.RecordTypeName = s, r.RecordTypeId = i
                } else r[t] = i;
                this._checkQuery()
            },
            _findCurrentObjIndex: function() {
                var e = -1,
                    t = this.currentId;
                return _.each(this.returnData, function(n, r) {
                    n.ID == t && (e = r)
                }), e
            }
        };
        var n = function() {
            this.init.apply(this, arguments)
        };
        n.prototype = {
            fields: ["Survey_Question_vod__c", "Response_vod__c"],
            name: "Question_Response_vod__c",
            clm: com.veeva.clm,
            init: function(e, t, n) {
                this.initQueues(e), this.updateCallback = t, this.completeCallback = n
            },
            initQueues: function(e) {
                var t = [];
                _.each(e, function(e) {
                    t.push(e.ID)
                }), this.queues = t
            },
            start: function() {
                this._next()
            },
            _next: function() {
                this.count = 0, this.queues.length ? (this.currentId = this.queues.pop(), this.updateResult = {
                    ResponseID: this.currentId
                }, this._query()) : this.completeCallback && this.completeCallback()
            },
            _checkQuery: function() {
                this.count++, this.count >= this.fields.length ? (this.updateCallback && this.updateCallback(this.updateResult), this._next()) : this._query()
            },
            _query: function() {
                var e = $.proxy(this._queryCallback, this),
                    t = this.fields[this.count];
                this.clm.getDataForObject(this.name, this.currentId, t, e)
            },
            _queryCallback: function(e) {
                if (e.success) {
                    var t = this.fields[this.count];
                    value = e.Question_Response_vod__c[t], this.updateResult[t] = value
                }
                this._checkQuery()
            }
        };
        var r = function() {
            this.init.apply(this, arguments)
        };
        r.prototype = {
            clm: com.veeva.clm,
            init: function(e, t) {
                this.objName = e, this.count = 0, this.callback = t, this.recordList = null, this.types = [], this.clm.getRecordType_Object(this.objName, $.proxy(this.onGetRecordList, this))
            },
            queryForEachRecord: function() {
                var e = this.recordList[this.count].ID;
                this.clm.getDataForObject("RecordType", e, "Name", $.proxy(this.onEachSuccess, this))
            },
            onGetRecordList: function(e) {
                e.success ? (this.recordList = e.RecordType, this.queryForEachRecord(), this.clm.getDataForObject("RecordType", this.recordList[0].ID, "Name", $.proxy(this.onEachRecordTypeSuccess, this))) : console.log("Failed to get record list for " + this.objName)
            },
            onEachSuccess: function(e) {
                this.types.push({
                    name: e.RecordType.Name,
                    id: this.recordList[this.count].ID
                }), this.count++, this.count >= this.recordList.length ? this.callback && this.callback(this.types) : this.queryForEachRecord()
            }
        };
        var i = function() {
            this.init.apply(this, arguments)
        };
        i.prototype = {
            clm: com.veeva.clm,
            name: "Question_Response_vod__c",
            init: function(e, t) {
                this.queues = [], this.surveyTarget = e, this.callback = t
            },
            add: function(e, t) {
                this.queues.push({
                    data: e,
                    updateId: t
                })
            },
            submit: function() {
                this.queues.length ? this._doSubmit() : this.callback && this.callback({
                    message: "Nothing to submit."
                })
            },
            update: function() {
                this.queues.length ? this._doUpdate() : this.callback && this.callback({
                    message: "Nothing to update."
                })
            },
            _doSubmit: function() {
                var e = this.queues.pop(),
                    t = $.proxy(this.onCreateRecordSuccess, this);
                this.clm.createRecord(this.name, e.data, t)
            },
            _doUpdate: function() {
                var e = this.queues.pop(),
                    t = $.proxy(this.onUpdateRecordSuccess, this);
                this.clm.updateRecord(this.name, e.updateId, e.data, t)
            },
            _updateSurveyTarget: function() {
                var e = this.callback,
                    t = {
                        Status_vod__c: "Submitted_vod"
                    };
                this.clm.updateRecord("Survey_Target_vod__c", this.surveyTarget, t, function(t) {
                    e && e({
                        message: "All answers has been submitted."
                    })
                })
            },
            onCreateRecordSuccess: function(e) {
                this.queues.length ? this._doSubmit() : this._updateSurveyTarget()
            },
            onUpdateRecordSuccess: function(e) {
                this.queues.length ? this._doUpdate() : this._updateSurveyTarget()
            }
        }, Drcom.Survey = Drcom.Controller.extend({
            pluginName: "drcom_survey",
            surveyId: null,
            accountId: null,
            surveyTarget: null,
            questionObj: null,
            qsRecordTypes: null,
            clm: com.veeva.clm,
            init: function(e, t) {
                this.super.init.apply(this, [e, t]), drcom.waitForPlayer($.proxy(this.initSurvey, this))
            },
            initSurvey: function() {
                this.clm.getDataForCurrentObject("Presentation", "Survey_vod__c", $.proxy(this.onGetSurveyIdSuccess, this)), $(".controls-bar", this.element).length && this._bindControlEvents()
            },
            onGetSurveyIdSuccess: function(e) {
                e.success ? (this.surveyId = e.Presentation.Survey_vod__c, this.clm.getDataForCurrentObject("Account", "ID", $.proxy(this.onGetAccountSuccess, this))) : console.log("Failed to get survey ID")
            },
            onGetAccountSuccess: function(e) {
                e.success ? (this.accountId = e.Account.ID, this.clm.getSurveyTarget_Account(this.accountId, this.surveyId, $.proxy(this.onGetSurveyTargetSuccess, this))) : console.log("Failed to get account ID")
            },
            onGetSurveyTargetSuccess: function(e) {
                e.success ? (this.surveyTarget = e.Survey_Target_vod__c[0].ID, this.clm.getSurveyQuestions_Survey(this.surveyId, $.proxy(this.onGetSurveyQuestionsSuccess, this))) : console.log("Failed to get survey targets")
            },
            onGetSurveyQuestionsSuccess: function(e) {
                var n = e.Survey_Question_vod__c;
                if (n && n.length) {
                    var r = $.proxy(this.onQuestionQueryCompleted, this);
                    (new t(n, r)).start()
                } else console.log("No questions!")
            },
            onQuestionQueryCompleted: function(e) {
                this.questionObj = e, this.clm.getQuestionResponse_SurveyTarget(this.surveyTarget, $.proxy(this.onGetQuestionResponseSuccess, this))
            },
            onGetQuestionResponseSuccess: function(e) {
                if (e.success) {
                    this.responses = e.Question_Response_vod__c;
                    var t = $.proxy(this.onQuestionResponseCompleted, this);
                    if (this.responses.length) {
                        var r = $.proxy(this.onEachQuestionResponseQuerySuccess, this);
                        (new n(this.responses, r, t)).start()
                    } else t()
                }
            },
            onEachQuestionResponseQuerySuccess: function(e) {
                var t = e.Survey_Question_vod__c,
                    n = e.ResponseID,
                    r = e.Response_vod__c;
                this._updateResponseForQuestionObj(t, r), this._updateIdForResponse(n, t)
            },
            onQuestionResponseCompleted: function() {
                this._renderQuestion();
                var e = $.proxy(this.onGetRecordTypesSuccess, this);
                new r("Question_Response_vod__c", e)
            },
            onGetRecordTypesSuccess: function(e) {
                this.qsRecordTypes = e
            },
            onNext: function() {
                this.questionIndex < this.total - 1 && (this.questionIndex++, this._translate())
            },
            onPrev: function() {
                this.questionIndex > 0 && (this.questionIndex--, this._translate())
            },
            onSubmit: function() {
                this.hasSubmitted || (this.hasSubmitted = !0, this.answers = this._getAnswers(), this.clm.getDataForObject("Survey_Target_vod__c", this.surveyTarget, "Status_vod__c", $.proxy(this.onGetStatusSuccess, this)))
            },
            onReload: function() {
                this._resetAnswers(), this.questionIndex = 0, this._translate()
            },
            onGetStatusSuccess: function(e) {
                if (e.success) {
                    var t = e.Survey_Target_vod__c.Status_vod__c;
                    t === "Pending_vod" ? this._createSubmit() : (t === "Saved_vod" || t === "Submitted_vod") && this._updateSubmit()
                }
            },
            _createSubmit: function() {
                var e = $.proxy(this._submitCompleteCallback, this),
                    t = new i(this.surveyTarget, e);
                _.each(this.answers, function(e) {
                    t.add(this._submitObj(e))
                }, this), t.submit()
            },
            _updateSubmit: function() {
                var e = $.proxy(this._updateSubmitCallback, this),
                    t = new i(this.surveyTarget, e);
                _.each(this.responses, function(e) {
                    var n = e.Survey_Question_vod__c,
                        r = this._answerObjFromId(n);
                    t.add(this._submitObj(r), e.ID)
                }, this), t.update()
            },
            _updateSubmitCallback: function(e) {
                var t = $.proxy(this._submitCompleteCallback, this),
                    n = new i(this.surveyTarget, t),
                    r = !1;
                _.each(this.answers, function(e) {
                    this._isNewQuestion(e.id) && (r = !0, n.add(this._submitObj(e)))
                }, this), r ? n.submit() : t()
            },
            _submitCompleteCallback: function() {
                var e = drcom.config.survey.rootAsset;
                e && (drcom.isMultiFlow ? drcom.gotoPresentation(e.slideId, e.presentationId) : drcom.gotoSlide(e.slideId)), $.event.trigger("surveysubmitted")
            },
            _submitObj: function(e) {
                var t = this._quesionObjFromId(e.id),
                    n = this._CLMRecordType();
                return {
                    Survey_Target_vod__c: this.surveyTarget,
                    Survey_Question_vod__c: e.id,
                    Answer_Choice_vod__c: t.Answer_Choice_vod__c,
                    Response_vod__c: e.answer,
                    Question_Text_vod__c: e.text,
                    Required_vod__c: t.Required_vod__c ? 1 : 0,
                    Order_vod__c: t.Order_vod__c,
                    RecordTypeId: n,
                    Type_vod__c: t.RecordTypeId
                }
            },
            _getAnswers: function() {
                var e = [];
                return $(".survey-question").each(function() {
                    var t = $(this),
                        n = $(".question-choices", t),
                        r = t.attr("id"),
                        i = t.attr("type"),
                        s = $(".question-text", t).text(),
                        o = "";
                    if (i === "Picklist") o = n.find("select").val();
                    else if (i === "Text" || i === "Number" || i === "Long Text") o = n.find("input,textarea").val();
                    else if (i === "Radio") {
                        var u = n.find("input:checked");
                        u.length && (o = u.val())
                    } else if (i === "Multiselect") {
                        var a = [];
                        n.find("input:checked").each(function() {
                            a.push($(this).val())
                        }), o = a.join(";")
                    }
                    e.push({
                        id: r,
                        text: s,
                        answer: o
                    })
                }), e
            },
            _resetAnswers: function() {
                $(".survey-question").each(function() {
                    var e = $(this),
                        t = $(".question-choices", e),
                        n = e.attr("type");
                    n === "Picklist" ? t.find("select").prop("selectedIndex", 0) : n === "Text" || n === "Number" || n === "Long Text" ? t.find("input,textarea").val("") : (n === "Radio" || n === "Multiselect") && t.find("input").removeAttr("checked")
                })
            },
            _answerObjFromId: function(e, t) {
                return _.find(this.answers, function(t) {
                    return t.id == e
                })
            },
            _quesionObjFromId: function(e) {
                return _.find(this.questionObj, function(t) {
                    return t.ID == e
                })
            },
            _isNewQuestion: function(e) {
                var t = _.find(this.responses, function(t) {
                    return t.Survey_Question_vod__c == e
                });
                return t ? !1 : !0
            },
            _updateResponseForQuestionObj: function(e, t) {
                _.each(this.questionObj, function(n, r) {
                    n.ID == e && (this.questionObj[r].Response_vod__c = t)
                }, this)
            },
            _updateIdForResponse: function(e, t) {
                _.each(this.responses, function(n, r) {
                    n.ID == e && (this.responses[r].Survey_Question_vod__c = t)
                }, this)
            },
            _CLMRecordType: function() {
                var e = _.find(this.qsRecordTypes, function(e) {
                    return e.name == "CLM"
                });
                return e ? e.id : !1
            },
            _translate: function() {
                var e = -(this.questionIndex * this.questionWidth);
                $(".question-list-content").css("-webkit-transform", "translate3d(" + e + "px, 0, 0)");
                var t = $(".controls-bar span.control-next"),
                    n = $(".controls-bar span.control-submit");
                this.questionIndex == this.total - 1 ? (t.hide(), n.show()) : (t.show(), n.hide())
            },
            _renderQuestion: function() {
                var t = this.options.template || e;
                this.element.empty().append(_.template(t)({
                    questionObj: this.questionObj
                })), setTimeout($.proxy(this._bindControlEvents, this), 0)
            },
            _bindControlEvents: function() {
                var e = $(".question-list"),
                    t = $(".controls-bar span.control-prev"),
                    n = $(".controls-bar span.control-next"),
                    r = $(".controls-bar span.control-submit"),
                    i = $(".controls-bar .control-reload");
                this.questionWidth = $(".survey-question").outerWidth(), this.questionIndex = 0, this.total = $(".survey-question", e).length, e.width(this.questionWidth * this.total), n.bind("tapone", $.proxy(this.onNext, this)), t.bind("tapone", $.proxy(this.onPrev, this)), r.bind("tapone", $.proxy(this.onSubmit, this)), i.bind("tapone", $.proxy(this.onReload, this))
            }
        }), $.fn.drcom_survey = function(e) {
            return $(this).each(function() {
                new Drcom.Survey($(this), e)
            }), $(this)
        };
        var s = drcom.config.survey;
        if (s && s.isShow) {
            var o = $("#survey");
            o.length || (o = $('<div id="survey"></div>').appendTo("#container"));
            if (s.customTemplate) {
                var u = "text!" + s.customTemplate;
                require([u], function(e) {
                    drcom.survey = o.drcom_survey({
                        template: e
                    }).controller()
                })
            } else drcom.survey = o.drcom_survey().controller()
        }
    }), define("survey", function() {}), define("text!plugins/template/mainmenu.html", [], function() {
        return '<div class="mainmenu">\r\n	<div class="mainmenu-content">\r\n		<ul style="display: -webkit-box;">\r\n			<% _.each(data, function(item) { %>\r\n				<% if (!item.hideonmenu) { %>\r\n					<li class="menu-item <%= (item.id == currentId ? \'selected\' : \'\') %>" menu-id="<%= item.id %>" flow-id="<%= (item.presentation || \'\') %>" style="display: block; float: none;">\r\n						<a>\r\n							<span class="menu-text"><%= item.title %></span>\r\n							<% if (conf.hasImage) { %>\r\n								<img src="<%= conf.thumbPath %>/<%= item.name %>.jpg">\r\n							<% } %>\r\n							<% if (item.submenu) { %>\r\n								<i class="icon-marker"></i>\r\n							<% } %>\r\n						</a>\r\n					</li>\r\n				<% } %>\r\n			<% }); %>\r\n		</ul>\r\n	</div>\r\n</div>\r\n\r\n<% \r\n	var hasSub = conf.submenu && conf.submenu.isShow,\r\n		layout = conf.submenu ? (conf.submenu.layout || \'horizontal\') : \'horizontal\';\r\n%>\r\n\r\n<% if (hasSub && layout === \'horizontal\') { %>\r\n<div class="submenu hide">\r\n	<div class="handler"></div>\r\n	<div class="submenu-content"></div>\r\n</div>\r\n<% } %>\r\n\r\n<% if (hasSub && layout === \'vertical\') { %>\r\n<div class="vertical-submenu-content"></div>\r\n<% } %>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n'
    }), define("text!plugins/template/submenu.html", [], function() {
        return '<ul style="display: -webkit-box;">\r\n	<% _.each(data, function(item) { %>\r\n		<% if (!item.hideonmenu) { %>\r\n			<li class="submenu-item <%= (item.id == currentId ? \'selected\' : \'\') %>" menu-id="<%= item.id %>" style="display: block; float: none;">\r\n				<a>\r\n					<span class="menu-text"><%= item.title %></span>\r\n					<% if (conf.submenu.hasImage) { %>\r\n						<img src="<%= conf.submenu.thumbPath %>/<%= item.name %>.jpg">\r\n					<% } %>\r\n				</a>\r\n			</li>\r\n		<% } %>\r\n	<% }); %>\r\n</ul>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n'
    }), define("text!plugins/template/submenu-vertical.html", [], function() {
        return '<ul class="vertical-submenu">\r\n	<% for (var i = data.length - 1; i >= 0; i--) { %>\r\n		<% var item = data[i]; %>\r\n		<% if (!item.hideonmenu) { %>\r\n			<li class="submenu-item <%= (item.id == currentId ? \'selected\' : \'\') %>" menu-id="<%= item.id %>" style="display: block; float: none;">\r\n				<a>\r\n					<span class="menu-text"><%= item.title %></span>\r\n					<% if (conf.submenu.hasImage) { %>\r\n						<img src="<%= conf.submenu.thumbPath %>/<%= item.name %>.jpg">\r\n					<% } %>\r\n				</a>\r\n			</li>\r\n		<% } %>\r\n	<% } %>\r\n</ul>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n'
    }), require(["text!plugins/template/mainmenu.html", "text!plugins/template/submenu.html", "text!plugins/template/submenu-vertical.html"], function(e, t, n) {
        var r = drcom.config.menu;
        Drcom.Menu = Drcom.Controller.extend({
            pluginName: "drcom_menu",
            hasSubmenu: r.submenu && r.submenu.isShow,
            sublayout: r.submenu ? r.submenu.layout || "horizontal" : "horizontal",
            init: function(e, t) {
                this.super.init.apply(this, arguments), drcom.waitForPlayer($.proxy(this.render, this))
            },
            render: function() {
                this.element.drcom_disableswipe(), this.renderMenu(), this.bindEvents(), this.applyScroll(), this.tapCount = 0
            },
            renderMenu: function() {
                var t = drcom.config.menu,
                    n = this._getMainData(),
                    i = drcom.getCurrentSlide(),
                    s = i.parent ? i.parent.id : i.id;
                this.element.find(".mainmenu").remove(), this.element.append(_.template(e)({
                    data: n,
                    conf: r,
                    currentId: s
                }))
            },
            bindEvents: function() {
                var e = $(".mainmenu", this.element),
                    t = e.find("li"),
                    n = $.proxy(this.onSelectMainMenu, this, t);
                e.on("tapone", "li", n);
                var r = $(".submenu,.vertical-submenu-content", this.element),
                    i = r.find(".handler"),
                    t = r.find("li"),
                    n = $.proxy(this.onSelectSubMenu, this, t);
                i.on("tapone", this.onToggleSubmenu), r.on("tapone", "li", n)
            },
            applyScroll: function() {
                var e = $(".mainmenu-content", this.element),
                    t = $(".submenu-content", this.element),
                    n = this,
                    r = {
                        scrollX: !0,
                        zoom: !1,
                        scrollbar: !1,
                        hideScrollbar: !0,
                        useTransfrom: !0,
                        bounce: !0
                    },
                    i = new IScroll(e[0], r);
                i.on("beforeScrollStart", function() {
                    $(".vertical-submenu").hide().removeClass("anim")
                }), setTimeout(function() {
                    i.refresh(), n._scrollToElement(e, i)
                }, 100);
                if (this.hasSubmenu && this.layout === "horizontal") {
                    var s = new IScroll(t[0], r);
                    setTimeout(function() {
                        s.refresh(), n._scrollToElement(t, s)
                    }, 100)
                }
            },
            onToggleSubmenu: function() {
                $(".submenu").toggleClass("hide")
            },
            onSelectMainMenu: function(e, t) {
                var n = $(t.currentTarget);
                if (r.useDoubleTap) {
                    this.tapCount++;
                    if (!this.timer) {
                        var i = $.proxy(this.onTimer, this, n, e);
                        this.timer = setTimeout(i, 200)
                    }
                } else {
                    var s = n.attr("menu-id");
                    if (s != drcom.menuItem) {
                        var o = n.attr("flow-id");
                        o !== "" ? drcom.gotoPresentation(s, o) : drcom.gotoSlide(s)
                    }
                }
            },
            _handleChangeSubmenu: function(e, t, n, r) {
                if (r != n) {
                    this.sublayout === "vertical" && $(".vertical-submenu-content").empty(), t.removeClass("selected"), e.addClass("selected");
                    var i = drcom.getSlide(n);
                    this.hasSubmenu && this._changeSubMenu(i, e)
                } else this.sublayout === "vertical" && $(".vertical-submenu").show(0, function() {
                    $(this).addClass("anim")
                })
            },
            _handleGoto: function(e, t) {
                if (t != drcom.menuItem) {
                    var n = e.attr("flow-id");
                    n !== "" ? drcom.gotoPresentation(t, n) : drcom.gotoSlide(t)
                }
            },
            onTimer: function(e, t) {
                var n = t.find("li.selected"),
                    i = e.attr("menu-id"),
                    s = n.attr("menu-id");
                if (r.useDoubleTap)
                    if (r.tapRevert) switch (this.tapCount) {
                        case 1:
                            this._handleGoto(e, i);
                            break;
                        case 2:
                            this._handleChangeSubmenu(e, t, i, s)
                    } else switch (this.tapCount) {
                        case 1:
                            this._handleChangeSubmenu(e, t, i, s);
                            break;
                        case 2:
                            this._handleGoto(e, i)
                    } else this._handleGoto(e, i);
                this.tapCount = 0, clearTimeout(this.timer), this.timer = null
            },
            onSelectSubMenu: function(e, t) {
                var n = $(t.currentTarget),
                    r = n.attr("menu-id");
                e.removeClass("selected"), n.addClass("selected"), drcom.gotoSlide(r)
            },
            _scrollToElement: function(e, t) {
                var n = e.find("li.selected");
                if (n.length) {
                    var r = n.position().left + n.outerWidth();
                    r >= e.width() && t.scrollToElement(n[0], 0)
                }
            },
            _changeSubMenu: function(e, i) {
                var s = e.submenu || [],
                    o = {
                        data: s,
                        conf: r,
                        currentId: drcom.menuItem
                    };
                if (this.sublayout === "vertical") {
                    $(".vertical-submenu-content").html(_.template(n)(o));
                    var u = this;
                    setTimeout(function() {
                        var e = $(".vertical-submenu"),
                            t = i.position().left,
                            n = -e.height();
                        e.css({
                            top: n,
                            left: t
                        }).show(0, function() {
                            e.addClass("anim")
                        })
                    }, 100)
                } else {
                    var a = $(".submenu", this.element),
                        f = a.find(".submenu-content");
                    f.html(_.template(t)(o));
                    var l = new IScroll(f[0], o);
                    setTimeout(function() {
                        l.refresh()
                    }, 100), this._scrollToElement(f, l)
                }
            },
            _getMainData: function() {
                var e = drcom.getSlidesOfFlow();
                return _.filter(e, function(e) {
                    return e.level == 0
                })
            }
        }), $.fn.drcom_menu = function(e) {
            return $(this).each(function() {
                new Drcom.Menu($(this), e)
            }), $(this)
        };
        if (drcom.config.menu && drcom.config.menu.isShow) {
            var i = $("#menu");
            i.length || (i = $('<div id="menu"></div>').appendTo("#container")), i.drcom_menu()
        }
    }), define("menu", function() {}), require([], function(e) {
        Drcom.StyleMenu = Drcom.Controller.extend({
            pluginName: "drcom_stylemenu",
            currMainMenuId: null,
            scrolls: drcom.config.stylemenu ? drcom.config.stylemenu.scrolls || [] : [],
            scrollOps: {
                scrollX: !0,
                zoom: !1,
                scrollbar: !1,
                hideScrollbar: !0,
                useTransfrom: !0,
                bounce: !0
            },
            init: function(e, t) {
                this.super.init.apply(this, arguments), drcom.waitForPlayer($.proxy(this.setup, this))
            },
            setup: function() {
                this.element.on("tapone", "div.menuitem", $.proxy(this.onSelectMenu, this)), this._renderView()
            },
            onSelectMenu: function(e) {
                drcom.disableSwipe();
                var t = $(e.currentTarget),
                    n = parseInt(t.data("menuid")),
                    r = drcom.getSlide(n),
                    i = parseInt(t.parents(".stylemenu").data("level")) + 1,
                    s = this._findMenuByLevel(i);
                if (!t.hasClass("current") || !s) this.overlayEl.fadeIn(250), t.siblings(".current").removeClass("current"), t.addClass("current"), s = this._findMenuByLevel(i, !0), this._renderMenu(s, r.submenu, i);
                (!r.submenu || !r.submenu.length) && drcom.gotoSlide(n)
            },
            onOverlayTap: function() {
                drcom.enableSwipe(), this._removeAllSubmenu(0), this.overlayEl.fadeOut(250), this._updateActiveMenu()
            },
            _findMenuByLevel: function(e, t) {
                var n = $(".stylemenu.level-" + e);
                return n.length ? n : t ? $('<div class="stylemenu level-' + e + '" data-level="' + e + '"></div>').appendTo(this.element) : !1
            },
            _findMenuElWithId: function(e) {
                return this.element.find("div.menuitem[data-menuid=" + e + "]")
            },
            _updateActiveMenu: function() {
                var e = drcom.getCurrentSlide();
                $("div.menuitem", this.element).removeClass("current");
                while (e.parent) e = e.parent;
                var t = this._findMenuElWithId(e.id);
                t.addClass("current")
            },
            _calWidth: function(e) {
                var t = e.find("div.menuitem"),
                    n = 0;
                return t.each(function() {
                    var e = $(this);
                    n += e.outerWidth()
                }), n
            },
            _removeAllSubmenu: function(e) {
                var t = this._findMenuByLevel(++e);
                while (t) t.remove(), t = this._findMenuByLevel(++e)
            },
            _renderView: function() {
                this.overlayEl = $('<div class="styleoverlay"></div>').appendTo(this.element), this.overlayEl.on("tapone", $.proxy(this.onOverlayTap, this));
                var e = $('<div class="stylemenu level-0" data-level="0"></div>').appendTo(this.element);
                this._renderMenu(e, this._getMainData()), e.drcom_disableswipe(), e.find(">div").width(this._calWidth(e)), this._updateActiveMenu();
                var t = new IScroll(e[0], this.scrollOps),
                    n = e.find("div.menuitem.current");
                n[0] && t.scrollToElement(n[0], 0)
            },
            _renderMenu: function(e, t, n) {
                n && this._removeAllSubmenu(n);
                var r = "";
                if (t) {
                    var i = drcom.menuItem;
                    r += '<div class="stylemenu-content">', t.forEach(function(e) {
                        if (!e.hideonmenu) {
                            var t = i === e.id ? " current" : "";
                            r += '<div class="menuitem' + t + '" data-menuid="' + e.id + '"><span>' + e.title + "<span></div>"
                        }
                    }), r += "</div>"
                }
                e.html(r)
            },
            _getMainData: function() {
                var e = drcom.getSlidesOfFlow();
                return _.filter(e, function(e) {
                    return e.level == 0
                })
            }
        }), $.fn.drcom_stylemenu = function(e) {
            return $(this).each(function() {
                new Drcom.StyleMenu($(this), e)
            }), $(this)
        };
        if (drcom.config.stylemenu && drcom.config.stylemenu.isShow) {
            var t = $("#menu");
            t.length || (t = $('<div id="menu"></div>').appendTo("body")), t.drcom_stylemenu()
        }
    }), define("stylemenu", function() {}), require([], function() {
        Drcom.Ref = Drcom.Controller.extend({
            pluginName: "drcom_ref",
            init: function(e, t) {
                this.super.init.apply(this, arguments), $.extend(this.options, {
                    close: ".ref_close",
                    scroller: ".ref_content",
                    main: "#ref_main",
                    effect: {
                        name: "slide",
                        options: {
                            direction: "left"
                        },
                        duration: 1e3
                    },
                    afterHide: function() {},
                    afterShow: function() {},
                    beforeHide: function() {},
                    beforeShow: function() {}
                }, this.options, t), this.set(this.options.main)
            },
            set: function(e) {
                if (this.container != null) {
                    if ($(e)[0] == this.container[0]) return;
                    this.container.hide(), this.container.off("tapone.ref", this.options.close)
                }
                var t = this;
                this.container = $(e), this.container.on("tapone.ref", this.options.close, function(e) {
                    t.toggle()
                }), $(this.options.scroller, this.container).length > 0 && (new IScroll($(this.options.scroller, this.container)[0], {
                    zoom: !1,
                    scrollbar: !0,
                    hideScrollbar: !1,
                    useTransfrom: !0,
                    bounce: !0
                }), $(this.container).drcom_disableswipe())
            },
            hide: function() {
                this.options.beforeHide.apply(this.container), this.container.hide(this.options.effect.name, this.options.effect.options, this.options.effect.duration, this.options.afterHide)
            },
            show: function() {
                this.options.beforeShow.apply(this.container), this.container.show(this.options.effect.name, this.options.effect.options, this.options.effect.duration, this.options.afterShow)
            },
            toggle: function() {
                this.container.is(":visible") == 1 ? this.hide() : this.show()
            }
        }), $.fn.drcom_ref = function(e) {
            return $(this).each(function() {
                new Drcom.Ref($(this), e)
            }), $(this)
        }
    }), define("ref", function() {}),
    function(e) {
        e.widget("ui.draggable", e.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
            },
            _destroy: function() {
                this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
            },
            _mouseCapture: function(t) {
                var n = this.options;
                return this.helper || n.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function() {
                    e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1e3
                    }).css(e(this).offset()).appendTo("body")
                }), !0) : !1)
            },
            _mouseStart: function(t) {
                var n = this.options;
                return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, this.offset.scroll = !1, e.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
            },
            _mouseDrag: function(t, n) {
                if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !n) {
                    var r = this._uiHash();
                    if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
                    this.position = r.position
                }
                return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
            },
            _mouseStop: function(t) {
                var n = this,
                    r = !1;
                return e.ui.ddmanager && !this.options.dropBehaviour && (r = e.ui.ddmanager.drop(this, t)), this.dropped && (r = this.dropped, this.dropped = !1), "original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !r || "valid" === this.options.revert && r || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, r) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    n._trigger("stop", t) !== !1 && n._clear()
                }) : this._trigger("stop", t) !== !1 && this._clear(), !1) : !1
            },
            _mouseUp: function(t) {
                return e("div.ui-draggable-iframeFix").each(function() {
                    this.parentNode.removeChild(this)
                }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function(t) {
                return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
            },
            _createHelper: function(t) {
                var n = this.options,
                    r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : "clone" === n.helper ? this.element.clone().removeAttr("id") : this.element;
                return r.parents("body").length || r.appendTo("parent" === n.appendTo ? this.element[0].parentNode : n.appendTo), r[0] === this.element[0] || /(fixed|absolute)/.test(r.css("position")) || r.css("position", "absolute"), r
            },
            _adjustOffsetFromHelper: function(t) {
                "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                var t = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
                    top: 0,
                    left: 0
                }), {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var e = this.element.position();
                    return {
                        top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var t, n, r, i = this.options;
                return i.containment ? "window" === i.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === i.containment ? (this.containment = [0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : i.containment.constructor === Array ? (this.containment = i.containment, undefined) : ("parent" === i.containment && (i.containment = this.helper[0].parentNode), n = e(i.containment), r = n[0], r && (t = "hidden" !== n.css("overflow"), this.containment = [(parseInt(n.css("borderLeftWidth"), 10) || 0) + (parseInt(n.css("paddingLeft"), 10) || 0), (parseInt(n.css("borderTopWidth"), 10) || 0) + (parseInt(n.css("paddingTop"), 10) || 0), (t ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(n.css("borderRightWidth"), 10) || 0) - (parseInt(n.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(n.css("borderBottomWidth"), 10) || 0) - (parseInt(n.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n), undefined) : (this.containment = null, undefined)
            },
            _convertPositionTo: function(t, n) {
                n || (n = this.position);
                var r = "absolute" === t ? 1 : -1,
                    i = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
                return this.offset.scroll || (this.offset.scroll = {
                    top: i.scrollTop(),
                    left: i.scrollLeft()
                }), {
                    top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * r,
                    left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * r
                }
            },
            _generatePosition: function(t) {
                var n, r, i, s, o = this.options,
                    u = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    a = t.pageX,
                    f = t.pageY;
                return this.offset.scroll || (this.offset.scroll = {
                    top: u.scrollTop(),
                    left: u.scrollLeft()
                }), this.originalPosition && (this.containment && (this.relative_container ? (r = this.relative_container.offset(), n = [this.containment[0] + r.left, this.containment[1] + r.top, this.containment[2] + r.left, this.containment[3] + r.top]) : n = this.containment, t.pageX - this.offset.click.left < n[0] && (a = n[0] + this.offset.click.left), t.pageY - this.offset.click.top < n[1] && (f = n[1] + this.offset.click.top), t.pageX - this.offset.click.left > n[2] && (a = n[2] + this.offset.click.left), t.pageY - this.offset.click.top > n[3] && (f = n[3] + this.offset.click.top)), o.grid && (i = o.grid[1] ? this.originalPageY + Math.round((f - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, f = n ? i - this.offset.click.top >= n[1] || i - this.offset.click.top > n[3] ? i : i - this.offset.click.top >= n[1] ? i - o.grid[1] : i + o.grid[1] : i, s = o.grid[0] ? this.originalPageX + Math.round((a - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, a = n ? s - this.offset.click.left >= n[0] || s - this.offset.click.left > n[2] ? s : s - this.offset.click.left >= n[0] ? s - o.grid[0] : s + o.grid[0] : s)), {
                    top: f - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                    left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
            },
            _trigger: function(t, n, r) {
                return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), e.ui.plugin.add("draggable", "connectToSortable", {
            start: function(t, n) {
                var r = e(this).data("ui-draggable"),
                    i = r.options,
                    s = e.extend({}, n, {
                        item: r.element
                    });
                r.sortables = [], e(i.connectToSortable).each(function() {
                    var n = e.data(this, "ui-sortable");
                    n && !n.options.disabled && (r.sortables.push({
                        instance: n,
                        shouldRevert: n.options.revert
                    }), n.refreshPositions(), n._trigger("activate", t, s))
                })
            },
            stop: function(t, n) {
                var r = e(this).data("ui-draggable"),
                    i = e.extend({}, n, {
                        item: r.element
                    });
                e.each(r.sortables, function() {
                    this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" === r.options.helper && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
                })
            },
            drag: function(t, n) {
                var r = e(this).data("ui-draggable"),
                    i = this;
                e.each(r.sortables, function() {
                    var o = !1,
                        u = this;
                    this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, e.each(r.sortables, function() {
                        return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this !== u && this.instance._intersectsWith(this.instance.containerCache) && e.contains(u.instance.element[0], this.instance.element[0]) && (o = !1), o
                    })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                        return n.helper[0]
                    }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
                })
            }
        }), e.ui.plugin.add("draggable", "cursor", {
            start: function() {
                var t = e("body"),
                    n = e(this).data("ui-draggable").options;
                t.css("cursor") && (n._cursor = t.css("cursor")), t.css("cursor", n.cursor)
            },
            stop: function() {
                var t = e(this).data("ui-draggable").options;
                t._cursor && e("body").css("cursor", t._cursor)
            }
        }), e.ui.plugin.add("draggable", "opacity", {
            start: function(t, n) {
                var r = e(n.helper),
                    i = e(this).data("ui-draggable").options;
                r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
            },
            stop: function(t, n) {
                var r = e(this).data("ui-draggable").options;
                r._opacity && e(n.helper).css("opacity", r._opacity)
            }
        }), e.ui.plugin.add("draggable", "scroll", {
            start: function() {
                var t = e(this).data("ui-draggable");
                t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset())
            },
            drag: function(t) {
                var n = e(this).data("ui-draggable"),
                    r = n.options,
                    i = !1;
                n.scrollParent[0] !== document && "HTML" !== n.scrollParent[0].tagName ? (r.axis && "x" === r.axis || (n.overflowOffset.top + n.scrollParent[0].offsetHeight - t.pageY < r.scrollSensitivity ? n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop + r.scrollSpeed : t.pageY - n.overflowOffset.top < r.scrollSensitivity && (n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop - r.scrollSpeed)), r.axis && "y" === r.axis || (n.overflowOffset.left + n.scrollParent[0].offsetWidth - t.pageX < r.scrollSensitivity ? n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft + r.scrollSpeed : t.pageX - n.overflowOffset.left < r.scrollSensitivity && (n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft - r.scrollSpeed))) : (r.axis && "x" === r.axis || (t.pageY - e(document).scrollTop() < r.scrollSensitivity ? i = e(document).scrollTop(e(document).scrollTop() - r.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < r.scrollSensitivity && (i = e(document).scrollTop(e(document).scrollTop() + r.scrollSpeed))), r.axis && "y" === r.axis || (t.pageX - e(document).scrollLeft() < r.scrollSensitivity ? i = e(document).scrollLeft(e(document).scrollLeft() - r.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < r.scrollSensitivity && (i = e(document).scrollLeft(e(document).scrollLeft() + r.scrollSpeed)))), i !== !1 && e.ui.ddmanager && !r.dropBehaviour && e.ui.ddmanager.prepareOffsets(n, t)
            }
        }), e.ui.plugin.add("draggable", "snap", {
            start: function() {
                var t = e(this).data("ui-draggable"),
                    n = t.options;
                t.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
                    var n = e(this),
                        r = n.offset();
                    this !== t.element[0] && t.snapElements.push({
                        item: this,
                        width: n.outerWidth(),
                        height: n.outerHeight(),
                        top: r.top,
                        left: r.left
                    })
                })
            },
            drag: function(t, n) {
                var r, i, s, o, u, a, f, l, c, h, p = e(this).data("ui-draggable"),
                    d = p.options,
                    v = d.snapTolerance,
                    m = n.offset.left,
                    g = m + p.helperProportions.width,
                    y = n.offset.top,
                    b = y + p.helperProportions.height;
                for (c = p.snapElements.length - 1; c >= 0; c--) u = p.snapElements[c].left, a = u + p.snapElements[c].width, f = p.snapElements[c].top, l = f + p.snapElements[c].height, u - v > g || m > a + v || f - v > b || y > l + v || !e.contains(p.snapElements[c].item.ownerDocument, p.snapElements[c].item) ? (p.snapElements[c].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), {
                    snapItem: p.snapElements[c].item
                })), p.snapElements[c].snapping = !1) : ("inner" !== d.snapMode && (r = v >= Math.abs(f - b), i = v >= Math.abs(l - y), s = v >= Math.abs(u - g), o = v >= Math.abs(a - m), r && (n.position.top = p._convertPositionTo("relative", {
                    top: f - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), i && (n.position.top = p._convertPositionTo("relative", {
                    top: l,
                    left: 0
                }).top - p.margins.top), s && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: u - p.helperProportions.width
                }).left - p.margins.left), o && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a
                }).left - p.margins.left)), h = r || i || s || o, "outer" !== d.snapMode && (r = v >= Math.abs(f - y), i = v >= Math.abs(l - b), s = v >= Math.abs(u - m), o = v >= Math.abs(a - g), r && (n.position.top = p._convertPositionTo("relative", {
                    top: f,
                    left: 0
                }).top - p.margins.top), i && (n.position.top = p._convertPositionTo("relative", {
                    top: l - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), s && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: u
                }).left - p.margins.left), o && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a - p.helperProportions.width
                }).left - p.margins.left)), !p.snapElements[c].snapping && (r || i || s || o || h) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), {
                    snapItem: p.snapElements[c].item
                })), p.snapElements[c].snapping = r || i || s || o || h)
            }
        }), e.ui.plugin.add("draggable", "stack", {
            start: function() {
                var t, n = this.data("ui-draggable").options,
                    r = e.makeArray(e(n.stack)).sort(function(t, n) {
                        return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
                    });
                r.length && (t = parseInt(e(r[0]).css("zIndex"), 10) || 0, e(r).each(function(n) {
                    e(this).css("zIndex", t + n)
                }), this.css("zIndex", t + r.length))
            }
        }), e.ui.plugin.add("draggable", "zIndex", {
            start: function(t, n) {
                var r = e(n.helper),
                    i = e(this).data("ui-draggable").options;
                r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
            },
            stop: function(t, n) {
                var r = e(this).data("ui-draggable").options;
                r._zIndex && e(n.helper).css("zIndex", r._zIndex)
            }
        })
    }(jQuery), define("jquery.ui.draggable", function() {}),
    function(e) {
        function t(e, t, n) {
            return e > t && t + n > e
        }
        e.widget("ui.droppable", {
            version: "1.10.3",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var t = this.options,
                    n = t.accept;
                this.isover = !1, this.isout = !0, this.accept = e.isFunction(n) ? n : function(e) {
                    return e.is(n)
                }, this.proportions = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }, e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [], e.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
            },
            _destroy: function() {
                for (var t = 0, n = e.ui.ddmanager.droppables[this.options.scope]; n.length > t; t++) n[t] === this && n.splice(t, 1);
                this.element.removeClass("ui-droppable ui-droppable-disabled")
            },
            _setOption: function(t, n) {
                "accept" === t && (this.accept = e.isFunction(n) ? n : function(e) {
                    return e.is(n)
                }), e.Widget.prototype._setOption.apply(this, arguments)
            },
            _activate: function(t) {
                var n = e.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), n && this._trigger("activate", t, this.ui(n))
            },
            _deactivate: function(t) {
                var n = e.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), n && this._trigger("deactivate", t, this.ui(n))
            },
            _over: function(t) {
                var n = e.ui.ddmanager.current;
                n && (n.currentItem || n.element)[0] !== this.element[0] && this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(n)))
            },
            _out: function(t) {
                var n = e.ui.ddmanager.current;
                n && (n.currentItem || n.element)[0] !== this.element[0] && this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(n)))
            },
            _drop: function(t, n) {
                var r = n || e.ui.ddmanager.current,
                    i = !1;
                return r && (r.currentItem || r.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                    var t = e.data(this, "ui-droppable");
                    return t.options.greedy && !t.options.disabled && t.options.scope === r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && e.ui.intersect(r, e.extend(t, {
                        offset: t.element.offset()
                    }), t.options.tolerance) ? (i = !0, !1) : undefined
                }), i ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1) : !1
            },
            ui: function(e) {
                return {
                    draggable: e.currentItem || e.element,
                    helper: e.helper,
                    position: e.position,
                    offset: e.positionAbs
                }
            }
        }), e.ui.intersect = function(e, n, r) {
            if (!n.offset) return !1;
            var i, s, o = (e.positionAbs || e.position.absolute).left,
                u = o + e.helperProportions.width,
                a = (e.positionAbs || e.position.absolute).top,
                f = a + e.helperProportions.height,
                l = n.offset.left,
                c = l + n.proportions.width,
                h = n.offset.top,
                p = h + n.proportions.height;
            switch (r) {
                case "fit":
                    return o >= l && c >= u && a >= h && p >= f;
                case "intersect":
                    return o + e.helperProportions.width / 2 > l && c > u - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > h && p > f - e.helperProportions.height / 2;
                case "pointer":
                    return i = (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left, s = (e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top, t(s, h, n.proportions.height) && t(i, l, n.proportions.width);
                case "touch":
                    return (a >= h && p >= a || f >= h && p >= f || h > a && f > p) && (o >= l && c >= o || u >= l && c >= u || l > o && u > c);
                default:
                    return !1
            }
        }, e.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function(t, n) {
                var r, i, s = e.ui.ddmanager.droppables[t.options.scope] || [],
                    o = n ? n.type : null,
                    u = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                e: for (r = 0; s.length > r; r++)
                    if (!(s[r].options.disabled || t && !s[r].accept.call(s[r].element[0], t.currentItem || t.element))) {
                        for (i = 0; u.length > i; i++)
                            if (u[i] === s[r].element[0]) {
                                s[r].proportions.height = 0;
                                continue e
                            }
                        s[r].visible = "none" !== s[r].element.css("display"), s[r].visible && ("mousedown" === o && s[r]._activate.call(s[r], n), s[r].offset = s[r].element.offset(), s[r].proportions = {
                            width: s[r].element[0].offsetWidth,
                            height: s[r].element[0].offsetHeight
                        })
                    }
            },
            drop: function(t, n) {
                var r = !1;
                return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (r = this._drop.call(this, n) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, n)))
                }), r
            },
            dragStart: function(t, n) {
                t.element.parentsUntil("body").bind("scroll.droppable", function() {
                    t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
                })
            },
            drag: function(t, n) {
                t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, n), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var r, s, o, u = e.ui.intersect(t, this, this.options.tolerance),
                            a = !u && this.isover ? "isout" : u && !this.isover ? "isover" : null;
                        a && (this.options.greedy && (s = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
                            return e.data(this, "ui-droppable").options.scope === s
                        }), o.length && (r = e.data(o[0], "ui-droppable"), r.greedyChild = "isover" === a)), r && "isover" === a && (r.isover = !1, r.isout = !0, r._out.call(r, n)), this[a] = !0, this["isout" === a ? "isover" : "isout"] = !1, this["isover" === a ? "_over" : "_out"].call(this, n), r && "isout" === a && (r.isout = !1, r.isover = !0, r._over.call(r, n)))
                    }
                })
            },
            dragStop: function(t, n) {
                t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
            }
        }
    }(jQuery), define("jquery.ui.droppable", function() {}),
    function(e, t) {
        var n = "ui-effects-";
        e.effects = {
                effect: {}
            },
            function(e, t) {
                function n(e, t, n) {
                    var r = c[t.type] || {};
                    return null == e ? n || !t.def ? null : t.def : (e = r.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : r.mod ? (e + r.mod) % r.mod : 0 > e ? 0 : e > r.max ? r.max : e)
                }

                function r(n) {
                    var r = f(),
                        i = r._rgba = [];
                    return n = n.toLowerCase(), d(a, function(e, s) {
                        var o, u = s.re.exec(n),
                            a = u && s.parse(u),
                            f = s.space || "rgba";
                        return a ? (o = r[f](a), r[l[f].cache] = o[l[f].cache], i = r._rgba = o._rgba, !1) : t
                    }), i.length ? ("0,0,0,0" === i.join() && e.extend(i, s.transparent), r) : s[n]
                }

                function i(e, t, n) {
                    return n = (n + 1) % 1, 1 > 6 * n ? e + 6 * (t - e) * n : 1 > 2 * n ? t : 2 > 3 * n ? e + 6 * (t - e) * (2 / 3 - n) : e
                }
                var s, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    u = /^([\-+])=\s*(\d+\.?\d*)/,
                    a = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(e) {
                            return [e[1], e[2], e[3], e[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(e) {
                            return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(e) {
                            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(e) {
                            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(e) {
                            return [e[1], e[2] / 100, e[3] / 100, e[4]]
                        }
                    }],
                    f = e.Color = function(t, n, r, i) {
                        return new e.Color.fn.parse(t, n, r, i)
                    },
                    l = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    c = {
                        "byte": {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    h = f.support = {},
                    p = e("<p>")[0],
                    d = e.each;
                p.style.cssText = "background-color:rgba(1,1,1,.5)", h.rgba = p.style.backgroundColor.indexOf("rgba") > -1, d(l, function(e, t) {
                    t.cache = "_" + e, t.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), f.fn = e.extend(f.prototype, {
                    parse: function(i, o, u, a) {
                        if (i === t) return this._rgba = [null, null, null, null], this;
                        (i.jquery || i.nodeType) && (i = e(i).css(o), o = t);
                        var c = this,
                            h = e.type(i),
                            p = this._rgba = [];
                        return o !== t && (i = [i, o, u, a], h = "array"), "string" === h ? this.parse(r(i) || s._default) : "array" === h ? (d(l.rgba.props, function(e, t) {
                            p[t.idx] = n(i[t.idx], t)
                        }), this) : "object" === h ? (i instanceof f ? d(l, function(e, t) {
                            i[t.cache] && (c[t.cache] = i[t.cache].slice())
                        }) : d(l, function(t, r) {
                            var s = r.cache;
                            d(r.props, function(e, t) {
                                if (!c[s] && r.to) {
                                    if ("alpha" === e || null == i[e]) return;
                                    c[s] = r.to(c._rgba)
                                }
                                c[s][t.idx] = n(i[e], t, !0)
                            }), c[s] && 0 > e.inArray(null, c[s].slice(0, 3)) && (c[s][3] = 1, r.from && (c._rgba = r.from(c[s])))
                        }), this) : t
                    },
                    is: function(e) {
                        var n = f(e),
                            r = !0,
                            i = this;
                        return d(l, function(e, s) {
                            var o, u = n[s.cache];
                            return u && (o = i[s.cache] || s.to && s.to(i._rgba) || [], d(s.props, function(e, n) {
                                return null != u[n.idx] ? r = u[n.idx] === o[n.idx] : t
                            })), r
                        }), r
                    },
                    _space: function() {
                        var e = [],
                            t = this;
                        return d(l, function(n, r) {
                            t[r.cache] && e.push(n)
                        }), e.pop()
                    },
                    transition: function(e, t) {
                        var r = f(e),
                            i = r._space(),
                            s = l[i],
                            o = 0 === this.alpha() ? f("transparent") : this,
                            u = o[s.cache] || s.to(o._rgba),
                            a = u.slice();
                        return r = r[s.cache], d(s.props, function(e, i) {
                            var s = i.idx,
                                o = u[s],
                                f = r[s],
                                l = c[i.type] || {};
                            null !== f && (null === o ? a[s] = f : (l.mod && (f - o > l.mod / 2 ? o += l.mod : o - f > l.mod / 2 && (o -= l.mod)), a[s] = n((f - o) * t + o, i)))
                        }), this[i](a)
                    },
                    blend: function(t) {
                        if (1 === this._rgba[3]) return this;
                        var n = this._rgba.slice(),
                            r = n.pop(),
                            i = f(t)._rgba;
                        return f(e.map(n, function(e, t) {
                            return (1 - r) * i[t] + r * e
                        }))
                    },
                    toRgbaString: function() {
                        var t = "rgba(",
                            n = e.map(this._rgba, function(e, t) {
                                return null == e ? t > 2 ? 1 : 0 : e
                            });
                        return 1 === n[3] && (n.pop(), t = "rgb("), t + n.join() + ")"
                    },
                    toHslaString: function() {
                        var t = "hsla(",
                            n = e.map(this.hsla(), function(e, t) {
                                return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
                            });
                        return 1 === n[3] && (n.pop(), t = "hsl("), t + n.join() + ")"
                    },
                    toHexString: function(t) {
                        var n = this._rgba.slice(),
                            r = n.pop();
                        return t && n.push(~~(255 * r)), "#" + e.map(n, function(e) {
                            return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
                        }).join("")
                    },
                    toString: function() {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), f.fn.parse.prototype = f.fn, l.hsla.to = function(e) {
                    if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                    var t, n, r = e[0] / 255,
                        i = e[1] / 255,
                        s = e[2] / 255,
                        o = e[3],
                        u = Math.max(r, i, s),
                        a = Math.min(r, i, s),
                        f = u - a,
                        l = u + a,
                        c = .5 * l;
                    return t = a === u ? 0 : r === u ? 60 * (i - s) / f + 360 : i === u ? 60 * (s - r) / f + 120 : 60 * (r - i) / f + 240, n = 0 === f ? 0 : .5 >= c ? f / l : f / (2 - l), [Math.round(t) % 360, n, c, null == o ? 1 : o]
                }, l.hsla.from = function(e) {
                    if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                    var t = e[0] / 360,
                        n = e[1],
                        r = e[2],
                        s = e[3],
                        o = .5 >= r ? r * (1 + n) : r + n - r * n,
                        u = 2 * r - o;
                    return [Math.round(255 * i(u, o, t + 1 / 3)), Math.round(255 * i(u, o, t)), Math.round(255 * i(u, o, t - 1 / 3)), s]
                }, d(l, function(r, i) {
                    var s = i.props,
                        o = i.cache,
                        a = i.to,
                        l = i.from;
                    f.fn[r] = function(r) {
                        if (a && !this[o] && (this[o] = a(this._rgba)), r === t) return this[o].slice();
                        var i, u = e.type(r),
                            c = "array" === u || "object" === u ? r : arguments,
                            h = this[o].slice();
                        return d(s, function(e, t) {
                            var r = c["object" === u ? e : t.idx];
                            null == r && (r = h[t.idx]), h[t.idx] = n(r, t)
                        }), l ? (i = f(l(h)), i[o] = h, i) : f(h)
                    }, d(s, function(t, n) {
                        f.fn[t] || (f.fn[t] = function(i) {
                            var s, o = e.type(i),
                                a = "alpha" === t ? this._hsla ? "hsla" : "rgba" : r,
                                f = this[a](),
                                l = f[n.idx];
                            return "undefined" === o ? l : ("function" === o && (i = i.call(this, l), o = e.type(i)), null == i && n.empty ? this : ("string" === o && (s = u.exec(i), s && (i = l + parseFloat(s[2]) * ("+" === s[1] ? 1 : -1))), f[n.idx] = i, this[a](f)))
                        })
                    })
                }), f.hook = function(t) {
                    var n = t.split(" ");
                    d(n, function(t, n) {
                        e.cssHooks[n] = {
                            set: function(t, i) {
                                var s, o, u = "";
                                if ("transparent" !== i && ("string" !== e.type(i) || (s = r(i)))) {
                                    if (i = f(s || i), !h.rgba && 1 !== i._rgba[3]) {
                                        for (o = "backgroundColor" === n ? t.parentNode : t;
                                            ("" === u || "transparent" === u) && o && o.style;) try {
                                            u = e.css(o, "backgroundColor"), o = o.parentNode
                                        } catch (a) {}
                                        i = i.blend(u && "transparent" !== u ? u : "_default")
                                    }
                                    i = i.toRgbaString()
                                }
                                try {
                                    t.style[n] = i
                                } catch (a) {}
                            }
                        }, e.fx.step[n] = function(t) {
                            t.colorInit || (t.start = f(t.elem, n), t.end = f(t.end), t.colorInit = !0), e.cssHooks[n].set(t.elem, t.start.transition(t.end, t.pos))
                        }
                    })
                }, f.hook(o), e.cssHooks.borderColor = {
                    expand: function(e) {
                        var t = {};
                        return d(["Top", "Right", "Bottom", "Left"], function(n, r) {
                            t["border" + r + "Color"] = e
                        }), t
                    }
                }, s = e.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(jQuery),
            function() {
                function n(t) {
                    var n, r, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                        s = {};
                    if (i && i.length && i[0] && i[i[0]])
                        for (r = i.length; r--;) n = i[r], "string" == typeof i[n] && (s[e.camelCase(n)] = i[n]);
                    else
                        for (n in i) "string" == typeof i[n] && (s[n] = i[n]);
                    return s
                }

                function r(t, n) {
                    var r, i, o = {};
                    for (r in n) i = n[r], t[r] !== i && (s[r] || (e.fx.step[r] || !isNaN(parseFloat(i))) && (o[r] = i));
                    return o
                }
                var i = ["add", "remove", "toggle"],
                    s = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, n) {
                    e.fx.step[n] = function(e) {
                        ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, n, e.end), e.setAttr = !0)
                    }
                }), e.fn.addBack || (e.fn.addBack = function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }), e.effects.animateClass = function(t, s, o, u) {
                    var a = e.speed(s, o, u);
                    return this.queue(function() {
                        var s, o = e(this),
                            u = o.attr("class") || "",
                            f = a.children ? o.find("*").addBack() : o;
                        f = f.map(function() {
                            var t = e(this);
                            return {
                                el: t,
                                start: n(this)
                            }
                        }), s = function() {
                            e.each(i, function(e, n) {
                                t[n] && o[n + "Class"](t[n])
                            })
                        }, s(), f = f.map(function() {
                            return this.end = n(this.el[0]), this.diff = r(this.start, this.end), this
                        }), o.attr("class", u), f = f.map(function() {
                            var t = this,
                                n = e.Deferred(),
                                r = e.extend({}, a, {
                                    queue: !1,
                                    complete: function() {
                                        n.resolve(t)
                                    }
                                });
                            return this.el.animate(this.diff, r), n.promise()
                        }), e.when.apply(e, f.get()).done(function() {
                            s(), e.each(arguments, function() {
                                var t = this.el;
                                e.each(this.diff, function(e) {
                                    t.css(e, "")
                                })
                            }), a.complete.call(o[0])
                        })
                    })
                }, e.fn.extend({
                    addClass: function(t) {
                        return function(n, r, i, s) {
                            return r ? e.effects.animateClass.call(this, {
                                add: n
                            }, r, i, s) : t.apply(this, arguments)
                        }
                    }(e.fn.addClass),
                    removeClass: function(t) {
                        return function(n, r, i, s) {
                            return arguments.length > 1 ? e.effects.animateClass.call(this, {
                                remove: n
                            }, r, i, s) : t.apply(this, arguments)
                        }
                    }(e.fn.removeClass),
                    toggleClass: function(n) {
                        return function(r, i, s, o, u) {
                            return "boolean" == typeof i || i === t ? s ? e.effects.animateClass.call(this, i ? {
                                add: r
                            } : {
                                remove: r
                            }, s, o, u) : n.apply(this, arguments) : e.effects.animateClass.call(this, {
                                toggle: r
                            }, i, s, o)
                        }
                    }(e.fn.toggleClass),
                    switchClass: function(t, n, r, i, s) {
                        return e.effects.animateClass.call(this, {
                            add: n,
                            remove: t
                        }, r, i, s)
                    }
                })
            }(),
            function() {
                function r(t, n, r, i) {
                    return e.isPlainObject(t) && (n = t, t = t.effect), t = {
                        effect: t
                    }, null == n && (n = {}), e.isFunction(n) && (i = n, r = null, n = {}), ("number" == typeof n || e.fx.speeds[n]) && (i = r, r = n, n = {}), e.isFunction(r) && (i = r, r = null), n && e.extend(t, n), r = r || n.duration, t.duration = e.fx.off ? 0 : "number" == typeof r ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default, t.complete = i || n.complete, t
                }

                function s(t) {
                    return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
                }
                e.extend(e.effects, {
                    version: "1.10.3",
                    save: function(e, t) {
                        for (var r = 0; t.length > r; r++) null !== t[r] && e.data(n + t[r], e[0].style[t[r]])
                    },
                    restore: function(e, r) {
                        var s, o;
                        for (o = 0; r.length > o; o++) null !== r[o] && (s = e.data(n + r[o]), s === t && (s = ""), e.css(r[o], s))
                    },
                    setMode: function(e, t) {
                        return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
                    },
                    getBaseline: function(e, t) {
                        var n, r;
                        switch (e[0]) {
                            case "top":
                                n = 0;
                                break;
                            case "middle":
                                n = .5;
                                break;
                            case "bottom":
                                n = 1;
                                break;
                            default:
                                n = e[0] / t.height
                        }
                        switch (e[1]) {
                            case "left":
                                r = 0;
                                break;
                            case "center":
                                r = .5;
                                break;
                            case "right":
                                r = 1;
                                break;
                            default:
                                r = e[1] / t.width
                        }
                        return {
                            x: r,
                            y: n
                        }
                    },
                    createWrapper: function(t) {
                        if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                        var n = {
                                width: t.outerWidth(!0),
                                height: t.outerHeight(!0),
                                "float": t.css("float")
                            },
                            r = e("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            i = {
                                width: t.width(),
                                height: t.height()
                            },
                            s = document.activeElement;
                        try {
                            s.id
                        } catch (o) {
                            s = document.body
                        }
                        return t.wrap(r), (t[0] === s || e.contains(t[0], s)) && e(s).focus(), r = t.parent(), "static" === t.css("position") ? (r.css({
                            position: "relative"
                        }), t.css({
                            position: "relative"
                        })) : (e.extend(n, {
                            position: t.css("position"),
                            zIndex: t.css("z-index")
                        }), e.each(["top", "left", "bottom", "right"], function(e, r) {
                            n[r] = t.css(r), isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
                        }), t.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), t.css(i), r.css(n).show()
                    },
                    removeWrapper: function(t) {
                        var n = document.activeElement;
                        return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === n || e.contains(t[0], n)) && e(n).focus()), t
                    },
                    setTransition: function(t, n, r, i) {
                        return i = i || {}, e.each(n, function(e, n) {
                            var s = t.cssUnit(n);
                            s[0] > 0 && (i[n] = s[0] * r + s[1])
                        }), i
                    }
                }), e.fn.extend({
                    effect: function() {
                        function t(t) {
                            function r() {
                                e.isFunction(s) && s.call(i[0]), e.isFunction(t) && t()
                            }
                            var i = e(this),
                                s = n.complete,
                                u = n.mode;
                            (i.is(":hidden") ? "hide" === u : "show" === u) ? (i[u](), r()) : o.call(i[0], n, r)
                        }
                        var n = r.apply(this, arguments),
                            i = n.mode,
                            s = n.queue,
                            o = e.effects.effect[n.effect];
                        return e.fx.off || !o ? i ? this[i](n.duration, n.complete) : this.each(function() {
                            n.complete && n.complete.call(this)
                        }) : s === !1 ? this.each(t) : this.queue(s || "fx", t)
                    },
                    show: function(e) {
                        return function(t) {
                            if (s(t)) return e.apply(this, arguments);
                            var n = r.apply(this, arguments);
                            return n.mode = "show", this.effect.call(this, n)
                        }
                    }(e.fn.show),
                    hide: function(e) {
                        return function(t) {
                            if (s(t)) return e.apply(this, arguments);
                            var n = r.apply(this, arguments);
                            return n.mode = "hide", this.effect.call(this, n)
                        }
                    }(e.fn.hide),
                    toggle: function(e) {
                        return function(t) {
                            if (s(t) || "boolean" == typeof t) return e.apply(this, arguments);
                            var n = r.apply(this, arguments);
                            return n.mode = "toggle", this.effect.call(this, n)
                        }
                    }(e.fn.toggle),
                    cssUnit: function(t) {
                        var n = this.css(t),
                            r = [];
                        return e.each(["em", "px", "%", "pt"], function(e, t) {
                            n.indexOf(t) > 0 && (r = [parseFloat(n), t])
                        }), r
                    }
                })
            }(),
            function() {
                var t = {};
                e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, n) {
                    t[n] = function(t) {
                        return Math.pow(t, e + 2)
                    }
                }), e.extend(t, {
                    Sine: function(e) {
                        return 1 - Math.cos(e * Math.PI / 2)
                    },
                    Circ: function(e) {
                        return 1 - Math.sqrt(1 - e * e)
                    },
                    Elastic: function(e) {
                        return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(e) {
                        return e * e * (3 * e - 2)
                    },
                    Bounce: function(e) {
                        for (var t, n = 4;
                            ((t = Math.pow(2, --n)) - 1) / 11 > e;);
                        return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                    }
                }), e.each(t, function(t, n) {
                    e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function(e) {
                        return 1 - n(1 - e)
                    }, e.easing["easeInOut" + t] = function(e) {
                        return .5 > e ? n(2 * e) / 2 : 1 - n(-2 * e + 2) / 2
                    }
                })
            }()
    }(jQuery), define("jquery.ui.effect", function() {}), require(["jquery"], function(e) {
        e.extend(e.effects, {
            removeElementChange: function(t, n, r) {
                r == null && (r = !0);
                if (r == 1) t.parent().remove();
                else {
                    var i = ["left", "top", "display"];
                    e.effects.restore(t, i), e.effects.restore(n, i), t.data("parent").append(t), n.data("parent").append(n)
                }
            },
            createElementChange: function(t, n, r) {
                r == null && (r = !0);
                var i = e("<div></div>").appendTo(t.parent()),
                    s = t.width(),
                    o = t.height(),
                    u = t.css("left"),
                    a = t.css("top"),
                    f = t.css("position"),
                    l = ["left", "top", "display"],
                    c = {
                        width: s,
                        height: o,
                        left: u,
                        top: a,
                        position: f
                    };
                i.css(c);
                var h = {
                        left: 0,
                        top: 0,
                        display: "block"
                    },
                    p, d;
                r == 1 ? (p = t.clone().css(h), d = n.clone().css(h)) : (t.data("parent", t.parent()), n.data("parent", n.parent()), e.effects.save(t, l), e.effects.save(n, l), p = t.css(h), d = n.css(h));
                var v = e("<div class='outgoing'></div>").appendTo(i).append(p).css(c).css(h).css({
                        "z-index": 1,
                        position: "absolute"
                    }),
                    m = e("<div class='incoming'></div>").appendTo(i).append(d).css(c).css(h).css({
                        "z-index": 0,
                        position: "absolute"
                    });
                return i
            }
        })
    }), define("effects", function() {}), require(["jquery"], function(e) {
        e.effects.effect.slidein = function(t, n) {
            var r = e(this),
                i = e(t.el),
                s = e.effects.setMode(r, t.mode || "effect"),
                o = s === "hide",
                u = s === "show";
            if (u) {
                n();
                return
            }
            r.hide();
            var a = {
                direction: "right"
            };
            t = e.extend(!1, a, t);
            var f = e("<div></div>").appendTo(r.parent()).css({
                    width: i.width(),
                    height: i.height(),
                    overflow: "hidden"
                }),
                l = e.effects.createElementChange(r, i, !1).css({
                    position: "relative"
                }).appendTo(f);
            (t.direction == "left" || t.direction == "right") && l.css({
                width: i.width() * 2
            }), (t.direction == "up" || t.direction == "down") && l.css({
                height: i.height() * 2
            });
            var c = 0,
                h = 0,
                p = i.width(),
                d = i.height();
            switch (t.direction) {
                case "down":
                    h = -d;
                    break;
                case "up":
                    h = d;
                    break;
                case "left":
                    c = p;
                    break;
                case "right":
                    c = -p
            }
            var v = e(".incoming", f),
                m = e(".outgoing", f);
            (t.direction == "left" || t.direction == "up") && v.css({
                transform: "translate3d(" + c + "px," + h + "px,0px)"
            });
            if (t.direction == "right" || t.direction == "down") v.css({
                transform: "translate3d(0px,0px,0px)"
            }), m.css({
                transform: "translate3d(" + -c + "px," + -h + "px,0px)"
            }), l.css({
                transform: "translate3d(" + c + "px," + h + "px,0px)"
            }), c = 0, h = 0;
            l.animate({
                transform: "translate3d(-" + c + "px,-" + h + "px,0px)"
            }, t.duration, function() {
                e.effects.removeElementChange(r, i, !1), f.remove(), i.show(), n()
            })
        }
    }), define("effects.slidein", function() {}), require(["jquery"], function(e) {
        e.effects.effect.show = function(t, n) {
            var r = e(this),
                i = e.effects.setMode(r, t.mode || "effect"),
                s = i === "hide",
                o = i === "show",
                u = t.duration;
            setTimeout(function() {
                o ? r.show() : r.hide(), n()
            }, u)
        }
    }), define("effects.show", function() {}),
    function(e) {
        e.effects.effect.slide = function(n, r) {
            var i, s = e(this),
                o = ["position", "top", "bottom", "left", "right", "width", "height"],
                u = e.effects.setMode(s, n.mode || "show"),
                a = "show" === u,
                f = n.direction || "left",
                l = "up" === f || "down" === f ? "top" : "left",
                c = "up" === f || "left" === f,
                h = {};
            e.effects.save(s, o), s.show(), i = n.distance || s["top" === l ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(s).css({
                overflow: "hidden"
            }), a && s.css(l, c ? isNaN(i) ? "-" + i : -i : i), h[l] = (a ? c ? "+=" : "-=" : c ? "-=" : "+=") + i, s.animate(h, {
                queue: !1,
                duration: n.duration,
                easing: n.easing,
                complete: function() {
                    "hide" === u && s.hide(), e.effects.restore(s, o), e.effects.removeWrapper(s), r()
                }
            })
        }
    }(jQuery), define("jquery.ui.effect-slide", function() {}),
    function(e) {
        var t = /up|down|vertical/,
            n = /up|left|vertical|horizontal/;
        e.effects.effect.blind = function(r, s) {
            var o, u, a, f = e(this),
                l = ["position", "top", "bottom", "left", "right", "height", "width"],
                c = e.effects.setMode(f, r.mode || "hide"),
                h = r.direction || "up",
                p = t.test(h),
                d = p ? "height" : "width",
                v = p ? "top" : "left",
                m = n.test(h),
                g = {},
                y = "show" === c;
            f.parent().is(".ui-effects-wrapper") ? e.effects.save(f.parent(), l) : e.effects.save(f, l), f.show(), o = e.effects.createWrapper(f).css({
                overflow: "hidden"
            }), u = o[d](), a = parseFloat(o.css(v)) || 0, g[d] = y ? u : 0, m || (f.css(p ? "bottom" : "right", 0).css(p ? "top" : "left", "auto").css({
                position: "absolute"
            }), g[v] = y ? a : u + a), y && (o.css(d, 0), m || o.css(v, a + u)), o.animate(g, {
                duration: r.duration,
                easing: r.easing,
                queue: !1,
                complete: function() {
                    "hide" === c && f.hide(), e.effects.restore(f, l), e.effects.removeWrapper(f), s()
                }
            })
        }
    }(jQuery), define("jquery.ui.effect-blind", function() {}),
    function(e) {
        e.effects.effect.fade = function(n, r) {
            var i = e(this),
                s = e.effects.setMode(i, n.mode || "toggle");
            i.animate({
                opacity: s
            }, {
                queue: !1,
                duration: n.duration,
                easing: n.easing,
                complete: r
            })
        }
    }(jQuery), define("jquery.ui.effect-fade", function() {}), require.config({
        baseUrl: drcom.config.share ? "../shared/global/js" : "global/js",
        waitSeconds: 60,
        shim: {
            underscore: {
                exports: "_"
            },
            setup: ["jquery", "underscore", "webfont", "veeva"],
            drcom: ["setup"],
            controller: ["drcom"],
            player: ["drcom"],
            "jquery.ui.effect": ["jquery"],
            "jquery.ui.effect-slide": ["jquery.ui.effect"],
            "jquery.ui.effect-fade": ["jquery.ui.effect"],
            "jquery.ui.effect-blind": ["jquery.ui.effect"],
            effects: ["jquery.ui.effect"],
            "effects.slidein": ["effects"],
            "effects.show": ["jquery.ui.effect"],
            "jquery.ui.core": ["jquery"],
            "jquery.ui.widget": ["jquery", "jquery.ui.core"],
            "jquery.ui.mouse": ["jquery", "jquery.ui.widget"],
            "jquery.ui.slider": ["jquery", "jquery.ui.mouse"],
            "jquery.ui.draggable": ["jquery", "jquery.ui.mouse"],
            "jquery.ui.droppable": ["jquery", "jquery.ui.mouse"],
            breadcrumb: ["controller", "player"],
            toolbar: ["controller", "player"],
            marker: ["controller", "player"],
            sitemap: ["controller", "player", "toolbar", "iscrollv5"],
            button: ["controller", "player"],
            drawing: ["controller", "player"],
            circle: ["controller", "player", "svg"],
            increasenumber: ["controller", "player"],
            slideshow: ["controller", "player"],
            coverflow: ["controller", "player", "slideshow"],
            popup: ["controller", "player"],
            srt: ["controller", "player"],
            video: ["controller", "player", "jquery.ui.slider"],
            callsummary: ["controller", "player", "iscrollv5"],
            survey: ["controller", "player"],
            menu: ["controller", "player"],
            stylemenu: ["controller", "player"],
            ref: ["controller", "player", "iscrollv5"]
        },
        paths: {
            jquery: "vendor/jquery",
            underscore: "vendor/underscore",
            veeva: "vendor/veeva",
            agnitio: "vendor/agnitio",
            text: "vendor/text",
            iscroll: "vendor/iscroll",
            iscrollv5: "vendor/iscrollv5",
            webfont: "vendor/webfont",
            svg: "vendor/svg",
            "jquery.ui.effect": "jqueryui/jquery.ui.effect.min",
            "jquery.ui.effect-slide": "jqueryui/jquery.ui.effect-slide.min",
            "jquery.ui.effect-blind": "jqueryui/jquery.ui.effect-blind.min",
            "jquery.ui.effect-fade": "jqueryui/jquery.ui.effect-fade.min",
            effects: "effects/effects",
            "effects.slidein": "effects/slidein",
            "effects.show": "effects/show",
            "jquery.ui.core": "jqueryui/jquery.ui.core.min",
            "jquery.ui.widget": "jqueryui/jquery.ui.widget.min",
            "jquery.ui.mouse": "jqueryui/jquery.ui.mouse.min",
            "jquery.ui.slider": "jqueryui/jquery.ui.slider.min",
            "jquery.ui.draggable": "jqueryui/jquery.ui.draggable.min",
            "jquery.ui.droppable": "jqueryui/jquery.ui.droppable.min",
            drcom: "drcom",
            controller: "lib/controller",
            setup: "lib/setup",
            player: "lib/player",
            breadcrumb: "plugins/breadcrumb",
            toolbar: "plugins/toolbar",
            circle: "plugins/circle",
            marker: "plugins/marker",
            sitemap: "plugins/sitemap",
            button: "plugins/button",
            drawing: "plugins/drawing",
            increasenumber: "plugins/increasenumber",
            slideshow: "plugins/slideshow",
            coverflow: "plugins/coverflow",
            popup: "plugins/popup",
            srt: "plugins/srt",
            video: "plugins/video",
            callsummary: "plugins/callsummary",
            survey: "plugins/survey",
            menu: "plugins/menu",
            stylemenu: "plugins/stylemenu",
            ref: "plugins/ref",
            global: "../global"
        }
    }), require(["breadcrumb", "toolbar", "marker", "sitemap", "circle", "button", "drawing", "increasenumber", "popup", "srt", "video", "slideshow", "coverflow", "callsummary", "survey", "menu", "stylemenu", "ref", "jquery.ui.core", "jquery.ui.widget", "jquery.ui.mouse", "jquery.ui.slider", "jquery.ui.draggable", "jquery.ui.droppable", "effects", "effects.slidein", "effects.show", "jquery.ui.effect", "jquery.ui.effect-slide", "jquery.ui.effect-blind", "jquery.ui.effect-fade"], function() {
        function r() {
            if (drcom.isPhantom) return;
            setTimeout(function() {
                $("#loadingPage").remove()
            }, 100)
        }
        var e = drcom.config,
            t = [],
            n = e.preloadFonts;
        n && n.length ? WebFont.load({
            custom: {
                families: n
            },
            active: function() {
                r()
            }
        }) : r(), e.externalScripts && e.externalScripts.length && (t = e.externalScripts), t.push("global"), drcom.isPhantom && (t = []), require(t, function() {
            drcom.readyExecute.apply(drcom, arguments)
        })
    }), define("loader", function() {});