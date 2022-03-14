var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = require_object_assign();
    var n = 60103;
    var p = 60106;
    exports.Fragment = 60107;
    exports.StrictMode = 60108;
    exports.Profiler = 60114;
    var q = 60109;
    var r = 60110;
    var t = 60112;
    exports.Suspense = 60113;
    var u = 60115;
    var v = 60116;
    if (typeof Symbol === "function" && Symbol.for) {
      w = Symbol.for;
      n = w("react.element");
      p = w("react.portal");
      exports.Fragment = w("react.fragment");
      exports.StrictMode = w("react.strict_mode");
      exports.Profiler = w("react.profiler");
      q = w("react.provider");
      r = w("react.context");
      t = w("react.forward_ref");
      exports.Suspense = w("react.suspense");
      u = w("react.memo");
      v = w("react.lazy");
    }
    var w;
    var x = typeof Symbol === "function" && Symbol.iterator;
    function y(a) {
      if (a === null || typeof a !== "object")
        return null;
      a = x && a[x] || a["@@iterator"];
      return typeof a === "function" ? a : null;
    }
    function z(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var A = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var B = {};
    function C(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = B;
      this.updater = c || A;
    }
    C.prototype.isReactComponent = {};
    C.prototype.setState = function(a, b) {
      if (typeof a !== "object" && typeof a !== "function" && a != null)
        throw Error(z(85));
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    C.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function D() {
    }
    D.prototype = C.prototype;
    function E(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = B;
      this.updater = c || A;
    }
    var F = E.prototype = new D();
    F.constructor = E;
    l(F, C.prototype);
    F.isPureReactComponent = true;
    var G = { current: null };
    var H = Object.prototype.hasOwnProperty;
    var I = { key: true, ref: true, __self: true, __source: true };
    function J(a, b, c) {
      var e, d = {}, k = null, h = null;
      if (b != null)
        for (e in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k = "" + b.key), b)
          H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
      var g = arguments.length - 2;
      if (g === 1)
        d.children = c;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++)
          f[m] = arguments[m + 2];
        d.children = f;
      }
      if (a && a.defaultProps)
        for (e in g = a.defaultProps, g)
          d[e] === void 0 && (d[e] = g[e]);
      return { $$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current };
    }
    function K(a, b) {
      return { $$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function L(a) {
      return typeof a === "object" && a !== null && a.$$typeof === n;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var M = /\/+/g;
    function N(a, b) {
      return typeof a === "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
    }
    function O(a, b, c, e, d) {
      var k = typeof a;
      if (k === "undefined" || k === "boolean")
        a = null;
      var h = false;
      if (a === null)
        h = true;
      else
        switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case n:
              case p:
                h = true;
            }
        }
      if (h)
        return h = a, d = d(h), a = e === "" ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", a != null && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
          return a2;
        })) : d != null && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
      h = 0;
      e = e === "" ? "." : e + ":";
      if (Array.isArray(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = e + N(k, g);
          h += O(k, b, c, f, d);
        }
      else if (f = y(a), typeof f === "function")
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
      else if (k === "object")
        throw b = "" + a, Error(z(31, b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
      return h;
    }
    function P(a, b, c) {
      if (a == null)
        return a;
      var e = [], d = 0;
      O(a, e, "", "", function(a2) {
        return b.call(c, a2, d++);
      });
      return e;
    }
    function Q(a) {
      if (a._status === -1) {
        var b = a._result;
        b = b();
        a._status = 0;
        a._result = b;
        b.then(function(b2) {
          a._status === 0 && (b2 = b2.default, a._status = 1, a._result = b2);
        }, function(b2) {
          a._status === 0 && (a._status = 2, a._result = b2);
        });
      }
      if (a._status === 1)
        return a._result;
      throw a._result;
    }
    var R = { current: null };
    function S() {
      var a = R.current;
      if (a === null)
        throw Error(z(321));
      return a;
    }
    var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l };
    exports.Children = { map: P, forEach: function(a, b, c) {
      P(a, function() {
        b.apply(this, arguments);
      }, c);
    }, count: function(a) {
      var b = 0;
      P(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return P(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!L(a))
        throw Error(z(143));
      return a;
    } };
    exports.Component = C;
    exports.PureComponent = E;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
    exports.cloneElement = function(a, b, c) {
      if (a === null || a === void 0)
        throw Error(z(267, a));
      var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
      if (b != null) {
        b.ref !== void 0 && (k = b.ref, h = G.current);
        b.key !== void 0 && (d = "" + b.key);
        if (a.type && a.type.defaultProps)
          var g = a.type.defaultProps;
        for (f in b)
          H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = b[f] === void 0 && g !== void 0 ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (f === 1)
        e.children = c;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++)
          g[m] = arguments[m + 2];
        e.children = g;
      }
      return {
        $$typeof: n,
        type: a.type,
        key: d,
        ref: k,
        props: e,
        _owner: h
      };
    };
    exports.createContext = function(a, b) {
      b === void 0 && (b = null);
      a = { $$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
      a.Provider = { $$typeof: q, _context: a };
      return a.Consumer = a;
    };
    exports.createElement = J;
    exports.createFactory = function(a) {
      var b = J.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: t, render: a };
    };
    exports.isValidElement = L;
    exports.lazy = function(a) {
      return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
    };
    exports.memo = function(a, b) {
      return { $$typeof: u, type: a, compare: b === void 0 ? null : b };
    };
    exports.useCallback = function(a, b) {
      return S().useCallback(a, b);
    };
    exports.useContext = function(a, b) {
      return S().useContext(a, b);
    };
    exports.useDebugValue = function() {
    };
    exports.useEffect = function(a, b) {
      return S().useEffect(a, b);
    };
    exports.useImperativeHandle = function(a, b, c) {
      return S().useImperativeHandle(a, b, c);
    };
    exports.useLayoutEffect = function(a, b) {
      return S().useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return S().useMemo(a, b);
    };
    exports.useReducer = function(a, b, c) {
      return S().useReducer(a, b, c);
    };
    exports.useRef = function(a) {
      return S().useRef(a);
    };
    exports.useState = function(a) {
      return S().useState(a);
    };
    exports.version = "17.0.2";
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var _assign = require_object_assign();
        var ReactVersion = "17.0.2";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        exports.Fragment = 60107;
        exports.StrictMode = 60108;
        exports.Profiler = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        exports.Suspense = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          exports.Fragment = symbolFor("react.fragment");
          exports.StrictMode = symbolFor("react.strict_mode");
          exports.Profiler = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          exports.Suspense = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: 0
        };
        var ReactCurrentOwner = {
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var IsSomeRendererActing = {
          current: false
        };
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner,
          IsSomeRendererActing,
          assign: _assign
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
        }
        function warn(format) {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
        function error(format) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          isMounted: function(publicInstance) {
            return false;
          },
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component3(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component3.prototype.isReactComponent = {};
        Component3.prototype.setState = function(partialState, callback) {
          if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) {
            {
              throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component3.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component3.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component3.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        _assign(pureComponentPrototype, Component3.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentName(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case exports.Fragment:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case exports.Profiler:
              return "Profiler";
            case exports.StrictMode:
              return "StrictMode";
            case exports.Suspense:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentName(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentName(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            ref,
            props,
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            self = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (!!(element === null || element === void 0)) {
            {
              throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
          }
          var propName;
          var props = _assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (Array.isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = "" + children;
              {
                {
                  throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
                }
              }
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            {
              throw Error("React.Children.only expected to receive a single React element child.");
            }
          }
          return children;
        }
        function createContext(defaultValue, calculateChangedBits) {
          if (calculateChangedBits === void 0) {
            calculateChangedBits = null;
          } else {
            {
              if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
                error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
              }
            }
          }
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            _calculateChangedBits: calculateChangedBits,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context,
              _calculateChangedBits: context._calculateChangedBits
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            var pending = payload;
            pending._status = Pending;
            pending._result = thenable;
            thenable.then(function(moduleObject) {
              if (payload._status === Pending) {
                var defaultExport = moduleObject.default;
                {
                  if (defaultExport === void 0) {
                    error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                  }
                }
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = defaultExport;
              }
            }, function(error2) {
              if (payload._status === Pending) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
          }
          if (payload._status === Resolved) {
            return payload._result;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            _status: -1,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (render.displayName == null) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (type.displayName == null) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          if (!(dispatcher !== null)) {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context, unstable_observedBits) {
          var dispatcher = resolveDispatcher();
          {
            if (unstable_observedBits !== void 0) {
              error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks" : "");
            }
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context, unstable_observedBits);
        }
        function useState(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useLayoutEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: _assign({}, props, {
                  value: prevLog
                }),
                info: _assign({}, props, {
                  value: prevInfo
                }),
                warn: _assign({}, props, {
                  value: prevWarn
                }),
                error: _assign({}, props, {
                  value: prevError
                }),
                group: _assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: _assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: _assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component4) {
          var prototype = Component4.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case exports.Suspense:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_BLOCK_TYPE:
                return describeFunctionComponentFrame(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(Object.prototype.hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentName(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentName(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentName(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (Array.isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === exports.Fragment) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        {
          try {
            var frozenObject = Object.freeze({});
            /* @__PURE__ */ new Map([[frozenObject, null]]);
            /* @__PURE__ */ new Set([frozenObject]);
          } catch (e) {
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children;
        exports.Component = Component3;
        exports.PureComponent = PureComponent;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.useCallback = useCallback;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue;
        exports.useEffect = useEffect;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef;
        exports.useState = useState;
        exports.version = ReactVersion;
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_production_min();
    } else {
      module2.exports = require_react_development();
    }
  }
});

// node_modules/rxjs/internal/util/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/rxjs/internal/util/isFunction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isFunction(x) {
      return typeof x === "function";
    }
    exports.isFunction = isFunction;
  }
});

// node_modules/rxjs/internal/config.js
var require_config = __commonJS({
  "node_modules/rxjs/internal/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _enable_super_gross_mode_that_will_cause_bad_things = false;
    exports.config = {
      Promise: void 0,
      set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
          var error = new Error();
          console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + error.stack);
        } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
          console.log("RxJS: Back to a better error behavior. Thank you. <3");
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
      },
      get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
      }
    };
  }
});

// node_modules/rxjs/internal/util/hostReportError.js
var require_hostReportError = __commonJS({
  "node_modules/rxjs/internal/util/hostReportError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function hostReportError(err) {
      setTimeout(function() {
        throw err;
      }, 0);
    }
    exports.hostReportError = hostReportError;
  }
});

// node_modules/rxjs/internal/Observer.js
var require_Observer = __commonJS({
  "node_modules/rxjs/internal/Observer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config_1 = require_config();
    var hostReportError_1 = require_hostReportError();
    exports.empty = {
      closed: true,
      next: function(value) {
      },
      error: function(err) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
          throw err;
        } else {
          hostReportError_1.hostReportError(err);
        }
      },
      complete: function() {
      }
    };
  }
});

// node_modules/rxjs/internal/util/isArray.js
var require_isArray = __commonJS({
  "node_modules/rxjs/internal/util/isArray.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isArray = function() {
      return Array.isArray || function(x) {
        return x && typeof x.length === "number";
      };
    }();
  }
});

// node_modules/rxjs/internal/util/isObject.js
var require_isObject = __commonJS({
  "node_modules/rxjs/internal/util/isObject.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isObject(x) {
      return x !== null && typeof x === "object";
    }
    exports.isObject = isObject;
  }
});

// node_modules/rxjs/internal/util/UnsubscriptionError.js
var require_UnsubscriptionError = __commonJS({
  "node_modules/rxjs/internal/util/UnsubscriptionError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UnsubscriptionErrorImpl = function() {
      function UnsubscriptionErrorImpl2(errors) {
        Error.call(this);
        this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
          return i + 1 + ") " + err.toString();
        }).join("\n  ") : "";
        this.name = "UnsubscriptionError";
        this.errors = errors;
        return this;
      }
      UnsubscriptionErrorImpl2.prototype = Object.create(Error.prototype);
      return UnsubscriptionErrorImpl2;
    }();
    exports.UnsubscriptionError = UnsubscriptionErrorImpl;
  }
});

// node_modules/rxjs/internal/Subscription.js
var require_Subscription = __commonJS({
  "node_modules/rxjs/internal/Subscription.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isArray_1 = require_isArray();
    var isObject_1 = require_isObject();
    var isFunction_1 = require_isFunction();
    var UnsubscriptionError_1 = require_UnsubscriptionError();
    var Subscription = function() {
      function Subscription2(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (unsubscribe) {
          this._ctorUnsubscribe = true;
          this._unsubscribe = unsubscribe;
        }
      }
      Subscription2.prototype.unsubscribe = function() {
        var errors;
        if (this.closed) {
          return;
        }
        var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (_parentOrParents instanceof Subscription2) {
          _parentOrParents.remove(this);
        } else if (_parentOrParents !== null) {
          for (var index = 0; index < _parentOrParents.length; ++index) {
            var parent_1 = _parentOrParents[index];
            parent_1.remove(this);
          }
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
          if (_ctorUnsubscribe) {
            this._unsubscribe = void 0;
          }
          try {
            _unsubscribe.call(this);
          } catch (e) {
            errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
          }
        }
        if (isArray_1.isArray(_subscriptions)) {
          var index = -1;
          var len = _subscriptions.length;
          while (++index < len) {
            var sub = _subscriptions[index];
            if (isObject_1.isObject(sub)) {
              try {
                sub.unsubscribe();
              } catch (e) {
                errors = errors || [];
                if (e instanceof UnsubscriptionError_1.UnsubscriptionError) {
                  errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                } else {
                  errors.push(e);
                }
              }
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
      };
      Subscription2.prototype.add = function(teardown) {
        var subscription = teardown;
        if (!teardown) {
          return Subscription2.EMPTY;
        }
        switch (typeof teardown) {
          case "function":
            subscription = new Subscription2(teardown);
          case "object":
            if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== "function") {
              return subscription;
            } else if (this.closed) {
              subscription.unsubscribe();
              return subscription;
            } else if (!(subscription instanceof Subscription2)) {
              var tmp = subscription;
              subscription = new Subscription2();
              subscription._subscriptions = [tmp];
            }
            break;
          default: {
            throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
          }
        }
        var _parentOrParents = subscription._parentOrParents;
        if (_parentOrParents === null) {
          subscription._parentOrParents = this;
        } else if (_parentOrParents instanceof Subscription2) {
          if (_parentOrParents === this) {
            return subscription;
          }
          subscription._parentOrParents = [_parentOrParents, this];
        } else if (_parentOrParents.indexOf(this) === -1) {
          _parentOrParents.push(this);
        } else {
          return subscription;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions === null) {
          this._subscriptions = [subscription];
        } else {
          subscriptions.push(subscription);
        }
        return subscription;
      };
      Subscription2.prototype.remove = function(subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
          var subscriptionIndex = subscriptions.indexOf(subscription);
          if (subscriptionIndex !== -1) {
            subscriptions.splice(subscriptionIndex, 1);
          }
        }
      };
      Subscription2.EMPTY = function(empty) {
        empty.closed = true;
        return empty;
      }(new Subscription2());
      return Subscription2;
    }();
    exports.Subscription = Subscription;
    function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function(errs, err) {
        return errs.concat(err instanceof UnsubscriptionError_1.UnsubscriptionError ? err.errors : err);
      }, []);
    }
  }
});

// node_modules/rxjs/internal/symbol/rxSubscriber.js
var require_rxSubscriber = __commonJS({
  "node_modules/rxjs/internal/symbol/rxSubscriber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rxSubscriber = function() {
      return typeof Symbol === "function" ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
    }();
    exports.$$rxSubscriber = exports.rxSubscriber;
  }
});

// node_modules/rxjs/internal/Subscriber.js
var require_Subscriber = __commonJS({
  "node_modules/rxjs/internal/Subscriber.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isFunction_1 = require_isFunction();
    var Observer_1 = require_Observer();
    var Subscription_1 = require_Subscription();
    var rxSubscriber_1 = require_rxSubscriber();
    var config_1 = require_config();
    var hostReportError_1 = require_hostReportError();
    var Subscriber = function(_super) {
      __extends(Subscriber2, _super);
      function Subscriber2(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
          case 0:
            _this.destination = Observer_1.empty;
            break;
          case 1:
            if (!destinationOrNext) {
              _this.destination = Observer_1.empty;
              break;
            }
            if (typeof destinationOrNext === "object") {
              if (destinationOrNext instanceof Subscriber2) {
                _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                _this.destination = destinationOrNext;
                destinationOrNext.add(_this);
              } else {
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext);
              }
              break;
            }
          default:
            _this.syncErrorThrowable = true;
            _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
            break;
        }
        return _this;
      }
      Subscriber2.prototype[rxSubscriber_1.rxSubscriber] = function() {
        return this;
      };
      Subscriber2.create = function(next, error, complete) {
        var subscriber = new Subscriber2(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
      };
      Subscriber2.prototype.next = function(value) {
        if (!this.isStopped) {
          this._next(value);
        }
      };
      Subscriber2.prototype.error = function(err) {
        if (!this.isStopped) {
          this.isStopped = true;
          this._error(err);
        }
      };
      Subscriber2.prototype.complete = function() {
        if (!this.isStopped) {
          this.isStopped = true;
          this._complete();
        }
      };
      Subscriber2.prototype.unsubscribe = function() {
        if (this.closed) {
          return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
      };
      Subscriber2.prototype._next = function(value) {
        this.destination.next(value);
      };
      Subscriber2.prototype._error = function(err) {
        this.destination.error(err);
        this.unsubscribe();
      };
      Subscriber2.prototype._complete = function() {
        this.destination.complete();
        this.unsubscribe();
      };
      Subscriber2.prototype._unsubscribeAndRecycle = function() {
        var _parentOrParents = this._parentOrParents;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
      };
      return Subscriber2;
    }(Subscription_1.Subscription);
    exports.Subscriber = Subscriber;
    var SafeSubscriber = function(_super) {
      __extends(SafeSubscriber2, _super);
      function SafeSubscriber2(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction_1.isFunction(observerOrNext)) {
          next = observerOrNext;
        } else if (observerOrNext) {
          next = observerOrNext.next;
          error = observerOrNext.error;
          complete = observerOrNext.complete;
          if (observerOrNext !== Observer_1.empty) {
            context = Object.create(observerOrNext);
            if (isFunction_1.isFunction(context.unsubscribe)) {
              _this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = _this.unsubscribe.bind(_this);
          }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
      }
      SafeSubscriber2.prototype.next = function(value) {
        if (!this.isStopped && this._next) {
          var _parentSubscriber = this._parentSubscriber;
          if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(this._next, value);
          } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber2.prototype.error = function(err) {
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;
          var useDeprecatedSynchronousErrorHandling = config_1.config.useDeprecatedSynchronousErrorHandling;
          if (this._error) {
            if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(this._error, err);
              this.unsubscribe();
            } else {
              this.__tryOrSetError(_parentSubscriber, this._error, err);
              this.unsubscribe();
            }
          } else if (!_parentSubscriber.syncErrorThrowable) {
            this.unsubscribe();
            if (useDeprecatedSynchronousErrorHandling) {
              throw err;
            }
            hostReportError_1.hostReportError(err);
          } else {
            if (useDeprecatedSynchronousErrorHandling) {
              _parentSubscriber.syncErrorValue = err;
              _parentSubscriber.syncErrorThrown = true;
            } else {
              hostReportError_1.hostReportError(err);
            }
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber2.prototype.complete = function() {
        var _this = this;
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;
          if (this._complete) {
            var wrappedComplete = function() {
              return _this._complete.call(_this._context);
            };
            if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(wrappedComplete);
              this.unsubscribe();
            } else {
              this.__tryOrSetError(_parentSubscriber, wrappedComplete);
              this.unsubscribe();
            }
          } else {
            this.unsubscribe();
          }
        }
      };
      SafeSubscriber2.prototype.__tryOrUnsub = function(fn, value) {
        try {
          fn.call(this._context, value);
        } catch (err) {
          this.unsubscribe();
          if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
          } else {
            hostReportError_1.hostReportError(err);
          }
        }
      };
      SafeSubscriber2.prototype.__tryOrSetError = function(parent, fn, value) {
        if (!config_1.config.useDeprecatedSynchronousErrorHandling) {
          throw new Error("bad call");
        }
        try {
          fn.call(this._context, value);
        } catch (err) {
          if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
          } else {
            hostReportError_1.hostReportError(err);
            return true;
          }
        }
        return false;
      };
      SafeSubscriber2.prototype._unsubscribe = function() {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
      };
      return SafeSubscriber2;
    }(Subscriber);
    exports.SafeSubscriber = SafeSubscriber;
  }
});

// node_modules/rxjs/internal/util/canReportError.js
var require_canReportError = __commonJS({
  "node_modules/rxjs/internal/util/canReportError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    function canReportError(observer) {
      while (observer) {
        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
        if (closed_1 || isStopped) {
          return false;
        } else if (destination && destination instanceof Subscriber_1.Subscriber) {
          observer = destination;
        } else {
          observer = null;
        }
      }
      return true;
    }
    exports.canReportError = canReportError;
  }
});

// node_modules/rxjs/internal/util/toSubscriber.js
var require_toSubscriber = __commonJS({
  "node_modules/rxjs/internal/util/toSubscriber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    var rxSubscriber_1 = require_rxSubscriber();
    var Observer_1 = require_Observer();
    function toSubscriber(nextOrObserver, error, complete) {
      if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
          return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
          return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
      }
      if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
      }
      return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
    }
    exports.toSubscriber = toSubscriber;
  }
});

// node_modules/rxjs/internal/symbol/observable.js
var require_observable = __commonJS({
  "node_modules/rxjs/internal/symbol/observable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.observable = function() {
      return typeof Symbol === "function" && Symbol.observable || "@@observable";
    }();
  }
});

// node_modules/rxjs/internal/util/identity.js
var require_identity = __commonJS({
  "node_modules/rxjs/internal/util/identity.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function identity(x) {
      return x;
    }
    exports.identity = identity;
  }
});

// node_modules/rxjs/internal/util/pipe.js
var require_pipe = __commonJS({
  "node_modules/rxjs/internal/util/pipe.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var identity_1 = require_identity();
    function pipe() {
      var fns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
      }
      return pipeFromArray(fns);
    }
    exports.pipe = pipe;
    function pipeFromArray(fns) {
      if (fns.length === 0) {
        return identity_1.identity;
      }
      if (fns.length === 1) {
        return fns[0];
      }
      return function piped(input) {
        return fns.reduce(function(prev, fn) {
          return fn(prev);
        }, input);
      };
    }
    exports.pipeFromArray = pipeFromArray;
  }
});

// node_modules/rxjs/internal/Observable.js
var require_Observable = __commonJS({
  "node_modules/rxjs/internal/Observable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canReportError_1 = require_canReportError();
    var toSubscriber_1 = require_toSubscriber();
    var observable_1 = require_observable();
    var pipe_1 = require_pipe();
    var config_1 = require_config();
    var Observable = function() {
      function Observable2(subscribe) {
        this._isScalar = false;
        if (subscribe) {
          this._subscribe = subscribe;
        }
      }
      Observable2.prototype.lift = function(operator) {
        var observable = new Observable2();
        observable.source = this;
        observable.operator = operator;
        return observable;
      };
      Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
          sink.add(operator.call(sink, this.source));
        } else {
          sink.add(this.source || config_1.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
          if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
              throw sink.syncErrorValue;
            }
          }
        }
        return sink;
      };
      Observable2.prototype._trySubscribe = function(sink) {
        try {
          return this._subscribe(sink);
        } catch (err) {
          if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
          }
          if (canReportError_1.canReportError(sink)) {
            sink.error(err);
          } else {
            console.warn(err);
          }
        }
      };
      Observable2.prototype.forEach = function(next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function(resolve, reject) {
          var subscription;
          subscription = _this.subscribe(function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              if (subscription) {
                subscription.unsubscribe();
              }
            }
          }, reject, resolve);
        });
      };
      Observable2.prototype._subscribe = function(subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
      };
      Observable2.prototype[observable_1.observable] = function() {
        return this;
      };
      Observable2.prototype.pipe = function() {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
          return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
      };
      Observable2.prototype.toPromise = function(promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function(resolve, reject) {
          var value;
          _this.subscribe(function(x) {
            return value = x;
          }, function(err) {
            return reject(err);
          }, function() {
            return resolve(value);
          });
        });
      };
      Observable2.create = function(subscribe) {
        return new Observable2(subscribe);
      };
      return Observable2;
    }();
    exports.Observable = Observable;
    function getPromiseCtor(promiseCtor) {
      if (!promiseCtor) {
        promiseCtor = config_1.config.Promise || Promise;
      }
      if (!promiseCtor) {
        throw new Error("no Promise impl found");
      }
      return promiseCtor;
    }
  }
});

// node_modules/rxjs/internal/util/ObjectUnsubscribedError.js
var require_ObjectUnsubscribedError = __commonJS({
  "node_modules/rxjs/internal/util/ObjectUnsubscribedError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectUnsubscribedErrorImpl = function() {
      function ObjectUnsubscribedErrorImpl2() {
        Error.call(this);
        this.message = "object unsubscribed";
        this.name = "ObjectUnsubscribedError";
        return this;
      }
      ObjectUnsubscribedErrorImpl2.prototype = Object.create(Error.prototype);
      return ObjectUnsubscribedErrorImpl2;
    }();
    exports.ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;
  }
});

// node_modules/rxjs/internal/SubjectSubscription.js
var require_SubjectSubscription = __commonJS({
  "node_modules/rxjs/internal/SubjectSubscription.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscription_1 = require_Subscription();
    var SubjectSubscription = function(_super) {
      __extends(SubjectSubscription2, _super);
      function SubjectSubscription2(subject, subscriber) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
      }
      SubjectSubscription2.prototype.unsubscribe = function() {
        if (this.closed) {
          return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
          return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
          observers.splice(subscriberIndex, 1);
        }
      };
      return SubjectSubscription2;
    }(Subscription_1.Subscription);
    exports.SubjectSubscription = SubjectSubscription;
  }
});

// node_modules/rxjs/internal/Subject.js
var require_Subject = __commonJS({
  "node_modules/rxjs/internal/Subject.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var Subscriber_1 = require_Subscriber();
    var Subscription_1 = require_Subscription();
    var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
    var SubjectSubscription_1 = require_SubjectSubscription();
    var rxSubscriber_1 = require_rxSubscriber();
    var SubjectSubscriber = function(_super) {
      __extends(SubjectSubscriber2, _super);
      function SubjectSubscriber2(destination) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        return _this;
      }
      return SubjectSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.SubjectSubscriber = SubjectSubscriber;
    var Subject5 = function(_super) {
      __extends(Subject6, _super);
      function Subject6() {
        var _this = _super.call(this) || this;
        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
      }
      Subject6.prototype[rxSubscriber_1.rxSubscriber] = function() {
        return new SubjectSubscriber(this);
      };
      Subject6.prototype.lift = function(operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
      };
      Subject6.prototype.next = function(value) {
        if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
            copy[i].next(value);
          }
        }
      };
      Subject6.prototype.error = function(err) {
        if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
          copy[i].error(err);
        }
        this.observers.length = 0;
      };
      Subject6.prototype.complete = function() {
        if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
          copy[i].complete();
        }
        this.observers.length = 0;
      };
      Subject6.prototype.unsubscribe = function() {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
      };
      Subject6.prototype._trySubscribe = function(subscriber) {
        if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        } else {
          return _super.prototype._trySubscribe.call(this, subscriber);
        }
      };
      Subject6.prototype._subscribe = function(subscriber) {
        if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        } else if (this.hasError) {
          subscriber.error(this.thrownError);
          return Subscription_1.Subscription.EMPTY;
        } else if (this.isStopped) {
          subscriber.complete();
          return Subscription_1.Subscription.EMPTY;
        } else {
          this.observers.push(subscriber);
          return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
      };
      Subject6.prototype.asObservable = function() {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
      };
      Subject6.create = function(destination, source) {
        return new AnonymousSubject(destination, source);
      };
      return Subject6;
    }(Observable_1.Observable);
    exports.Subject = Subject5;
    var AnonymousSubject = function(_super) {
      __extends(AnonymousSubject2, _super);
      function AnonymousSubject2(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
      }
      AnonymousSubject2.prototype.next = function(value) {
        var destination = this.destination;
        if (destination && destination.next) {
          destination.next(value);
        }
      };
      AnonymousSubject2.prototype.error = function(err) {
        var destination = this.destination;
        if (destination && destination.error) {
          this.destination.error(err);
        }
      };
      AnonymousSubject2.prototype.complete = function() {
        var destination = this.destination;
        if (destination && destination.complete) {
          this.destination.complete();
        }
      };
      AnonymousSubject2.prototype._subscribe = function(subscriber) {
        var source = this.source;
        if (source) {
          return this.source.subscribe(subscriber);
        } else {
          return Subscription_1.Subscription.EMPTY;
        }
      };
      return AnonymousSubject2;
    }(Subject5);
    exports.AnonymousSubject = AnonymousSubject;
  }
});

// node_modules/rxjs/internal/operators/refCount.js
var require_refCount = __commonJS({
  "node_modules/rxjs/internal/operators/refCount.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    function refCount() {
      return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
      };
    }
    exports.refCount = refCount;
    var RefCountOperator = function() {
      function RefCountOperator2(connectable) {
        this.connectable = connectable;
      }
      RefCountOperator2.prototype.call = function(subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
          refCounter.connection = connectable.connect();
        }
        return subscription;
      };
      return RefCountOperator2;
    }();
    var RefCountSubscriber = function(_super) {
      __extends(RefCountSubscriber2, _super);
      function RefCountSubscriber2(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
      }
      RefCountSubscriber2.prototype._unsubscribe = function() {
        var connectable = this.connectable;
        if (!connectable) {
          this.connection = null;
          return;
        }
        this.connectable = null;
        var refCount2 = connectable._refCount;
        if (refCount2 <= 0) {
          this.connection = null;
          return;
        }
        connectable._refCount = refCount2 - 1;
        if (refCount2 > 1) {
          this.connection = null;
          return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
          sharedConnection.unsubscribe();
        }
      };
      return RefCountSubscriber2;
    }(Subscriber_1.Subscriber);
  }
});

// node_modules/rxjs/internal/observable/ConnectableObservable.js
var require_ConnectableObservable = __commonJS({
  "node_modules/rxjs/internal/observable/ConnectableObservable.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subject_1 = require_Subject();
    var Observable_1 = require_Observable();
    var Subscriber_1 = require_Subscriber();
    var Subscription_1 = require_Subscription();
    var refCount_1 = require_refCount();
    var ConnectableObservable = function(_super) {
      __extends(ConnectableObservable2, _super);
      function ConnectableObservable2(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
      }
      ConnectableObservable2.prototype._subscribe = function(subscriber) {
        return this.getSubject().subscribe(subscriber);
      };
      ConnectableObservable2.prototype.getSubject = function() {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
          this._subject = this.subjectFactory();
        }
        return this._subject;
      };
      ConnectableObservable2.prototype.connect = function() {
        var connection = this._connection;
        if (!connection) {
          this._isComplete = false;
          connection = this._connection = new Subscription_1.Subscription();
          connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
          if (connection.closed) {
            this._connection = null;
            connection = Subscription_1.Subscription.EMPTY;
          }
        }
        return connection;
      };
      ConnectableObservable2.prototype.refCount = function() {
        return refCount_1.refCount()(this);
      };
      return ConnectableObservable2;
    }(Observable_1.Observable);
    exports.ConnectableObservable = ConnectableObservable;
    exports.connectableObservableDescriptor = function() {
      var connectableProto = ConnectableObservable.prototype;
      return {
        operator: { value: null },
        _refCount: { value: 0, writable: true },
        _subject: { value: null, writable: true },
        _connection: { value: null, writable: true },
        _subscribe: { value: connectableProto._subscribe },
        _isComplete: { value: connectableProto._isComplete, writable: true },
        getSubject: { value: connectableProto.getSubject },
        connect: { value: connectableProto.connect },
        refCount: { value: connectableProto.refCount }
      };
    }();
    var ConnectableSubscriber = function(_super) {
      __extends(ConnectableSubscriber2, _super);
      function ConnectableSubscriber2(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
      }
      ConnectableSubscriber2.prototype._error = function(err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
      };
      ConnectableSubscriber2.prototype._complete = function() {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
      };
      ConnectableSubscriber2.prototype._unsubscribe = function() {
        var connectable = this.connectable;
        if (connectable) {
          this.connectable = null;
          var connection = connectable._connection;
          connectable._refCount = 0;
          connectable._subject = null;
          connectable._connection = null;
          if (connection) {
            connection.unsubscribe();
          }
        }
      };
      return ConnectableSubscriber2;
    }(Subject_1.SubjectSubscriber);
    var RefCountOperator = function() {
      function RefCountOperator2(connectable) {
        this.connectable = connectable;
      }
      RefCountOperator2.prototype.call = function(subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
          refCounter.connection = connectable.connect();
        }
        return subscription;
      };
      return RefCountOperator2;
    }();
    var RefCountSubscriber = function(_super) {
      __extends(RefCountSubscriber2, _super);
      function RefCountSubscriber2(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
      }
      RefCountSubscriber2.prototype._unsubscribe = function() {
        var connectable = this.connectable;
        if (!connectable) {
          this.connection = null;
          return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
          this.connection = null;
          return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
          this.connection = null;
          return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
          sharedConnection.unsubscribe();
        }
      };
      return RefCountSubscriber2;
    }(Subscriber_1.Subscriber);
  }
});

// node_modules/rxjs/internal/operators/groupBy.js
var require_groupBy = __commonJS({
  "node_modules/rxjs/internal/operators/groupBy.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    var Subscription_1 = require_Subscription();
    var Observable_1 = require_Observable();
    var Subject_1 = require_Subject();
    function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
      return function(source) {
        return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
      };
    }
    exports.groupBy = groupBy;
    var GroupByOperator = function() {
      function GroupByOperator2(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
      }
      GroupByOperator2.prototype.call = function(subscriber, source) {
        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
      };
      return GroupByOperator2;
    }();
    var GroupBySubscriber = function(_super) {
      __extends(GroupBySubscriber2, _super);
      function GroupBySubscriber2(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
      }
      GroupBySubscriber2.prototype._next = function(value) {
        var key;
        try {
          key = this.keySelector(value);
        } catch (err) {
          this.error(err);
          return;
        }
        this._group(value, key);
      };
      GroupBySubscriber2.prototype._group = function(value, key) {
        var groups = this.groups;
        if (!groups) {
          groups = this.groups = /* @__PURE__ */ new Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
          try {
            element = this.elementSelector(value);
          } catch (err) {
            this.error(err);
          }
        } else {
          element = value;
        }
        if (!group) {
          group = this.subjectSelector ? this.subjectSelector() : new Subject_1.Subject();
          groups.set(key, group);
          var groupedObservable = new GroupedObservable(key, group, this);
          this.destination.next(groupedObservable);
          if (this.durationSelector) {
            var duration = void 0;
            try {
              duration = this.durationSelector(new GroupedObservable(key, group));
            } catch (err) {
              this.error(err);
              return;
            }
            this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
          }
        }
        if (!group.closed) {
          group.next(element);
        }
      };
      GroupBySubscriber2.prototype._error = function(err) {
        var groups = this.groups;
        if (groups) {
          groups.forEach(function(group, key) {
            group.error(err);
          });
          groups.clear();
        }
        this.destination.error(err);
      };
      GroupBySubscriber2.prototype._complete = function() {
        var groups = this.groups;
        if (groups) {
          groups.forEach(function(group, key) {
            group.complete();
          });
          groups.clear();
        }
        this.destination.complete();
      };
      GroupBySubscriber2.prototype.removeGroup = function(key) {
        this.groups.delete(key);
      };
      GroupBySubscriber2.prototype.unsubscribe = function() {
        if (!this.closed) {
          this.attemptedToUnsubscribe = true;
          if (this.count === 0) {
            _super.prototype.unsubscribe.call(this);
          }
        }
      };
      return GroupBySubscriber2;
    }(Subscriber_1.Subscriber);
    var GroupDurationSubscriber = function(_super) {
      __extends(GroupDurationSubscriber2, _super);
      function GroupDurationSubscriber2(key, group, parent) {
        var _this = _super.call(this, group) || this;
        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
      }
      GroupDurationSubscriber2.prototype._next = function(value) {
        this.complete();
      };
      GroupDurationSubscriber2.prototype._unsubscribe = function() {
        var _a = this, parent = _a.parent, key = _a.key;
        this.key = this.parent = null;
        if (parent) {
          parent.removeGroup(key);
        }
      };
      return GroupDurationSubscriber2;
    }(Subscriber_1.Subscriber);
    var GroupedObservable = function(_super) {
      __extends(GroupedObservable2, _super);
      function GroupedObservable2(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
      }
      GroupedObservable2.prototype._subscribe = function(subscriber) {
        var subscription = new Subscription_1.Subscription();
        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
          subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
      };
      return GroupedObservable2;
    }(Observable_1.Observable);
    exports.GroupedObservable = GroupedObservable;
    var InnerRefCountSubscription = function(_super) {
      __extends(InnerRefCountSubscription2, _super);
      function InnerRefCountSubscription2(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        parent.count++;
        return _this;
      }
      InnerRefCountSubscription2.prototype.unsubscribe = function() {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
          _super.prototype.unsubscribe.call(this);
          parent.count -= 1;
          if (parent.count === 0 && parent.attemptedToUnsubscribe) {
            parent.unsubscribe();
          }
        }
      };
      return InnerRefCountSubscription2;
    }(Subscription_1.Subscription);
  }
});

// node_modules/rxjs/internal/BehaviorSubject.js
var require_BehaviorSubject = __commonJS({
  "node_modules/rxjs/internal/BehaviorSubject.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subject_1 = require_Subject();
    var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
    var BehaviorSubject2 = function(_super) {
      __extends(BehaviorSubject3, _super);
      function BehaviorSubject3(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
      }
      Object.defineProperty(BehaviorSubject3.prototype, "value", {
        get: function() {
          return this.getValue();
        },
        enumerable: true,
        configurable: true
      });
      BehaviorSubject3.prototype._subscribe = function(subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
          subscriber.next(this._value);
        }
        return subscription;
      };
      BehaviorSubject3.prototype.getValue = function() {
        if (this.hasError) {
          throw this.thrownError;
        } else if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        } else {
          return this._value;
        }
      };
      BehaviorSubject3.prototype.next = function(value) {
        _super.prototype.next.call(this, this._value = value);
      };
      return BehaviorSubject3;
    }(Subject_1.Subject);
    exports.BehaviorSubject = BehaviorSubject2;
  }
});

// node_modules/rxjs/internal/scheduler/Action.js
var require_Action = __commonJS({
  "node_modules/rxjs/internal/scheduler/Action.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscription_1 = require_Subscription();
    var Action = function(_super) {
      __extends(Action2, _super);
      function Action2(scheduler, work) {
        return _super.call(this) || this;
      }
      Action2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return this;
      };
      return Action2;
    }(Subscription_1.Subscription);
    exports.Action = Action;
  }
});

// node_modules/rxjs/internal/scheduler/AsyncAction.js
var require_AsyncAction = __commonJS({
  "node_modules/rxjs/internal/scheduler/AsyncAction.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Action_1 = require_Action();
    var AsyncAction = function(_super) {
      __extends(AsyncAction2, _super);
      function AsyncAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
      }
      AsyncAction2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (this.closed) {
          return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
      };
      AsyncAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return setInterval(scheduler.flush.bind(scheduler, this), delay);
      };
      AsyncAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && this.delay === delay && this.pending === false) {
          return id;
        }
        clearInterval(id);
        return void 0;
      };
      AsyncAction2.prototype.execute = function(state, delay) {
        if (this.closed) {
          return new Error("executing a cancelled action");
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
          return error;
        } else if (this.pending === false && this.id != null) {
          this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
      };
      AsyncAction2.prototype._execute = function(state, delay) {
        var errored = false;
        var errorValue = void 0;
        try {
          this.work(state);
        } catch (e) {
          errored = true;
          errorValue = !!e && e || new Error(e);
        }
        if (errored) {
          this.unsubscribe();
          return errorValue;
        }
      };
      AsyncAction2.prototype._unsubscribe = function() {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
          actions.splice(index, 1);
        }
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
      };
      return AsyncAction2;
    }(Action_1.Action);
    exports.AsyncAction = AsyncAction;
  }
});

// node_modules/rxjs/internal/scheduler/QueueAction.js
var require_QueueAction = __commonJS({
  "node_modules/rxjs/internal/scheduler/QueueAction.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsyncAction_1 = require_AsyncAction();
    var QueueAction = function(_super) {
      __extends(QueueAction2, _super);
      function QueueAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      QueueAction2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay > 0) {
          return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
      };
      QueueAction2.prototype.execute = function(state, delay) {
        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
      };
      QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
      };
      return QueueAction2;
    }(AsyncAction_1.AsyncAction);
    exports.QueueAction = QueueAction;
  }
});

// node_modules/rxjs/internal/Scheduler.js
var require_Scheduler = __commonJS({
  "node_modules/rxjs/internal/Scheduler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scheduler = function() {
      function Scheduler2(SchedulerAction, now) {
        if (now === void 0) {
          now = Scheduler2.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
      }
      Scheduler2.prototype.schedule = function(work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
      };
      Scheduler2.now = function() {
        return Date.now();
      };
      return Scheduler2;
    }();
    exports.Scheduler = Scheduler;
  }
});

// node_modules/rxjs/internal/scheduler/AsyncScheduler.js
var require_AsyncScheduler = __commonJS({
  "node_modules/rxjs/internal/scheduler/AsyncScheduler.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scheduler_1 = require_Scheduler();
    var AsyncScheduler = function(_super) {
      __extends(AsyncScheduler2, _super);
      function AsyncScheduler2(SchedulerAction, now) {
        if (now === void 0) {
          now = Scheduler_1.Scheduler.now;
        }
        var _this = _super.call(this, SchedulerAction, function() {
          if (AsyncScheduler2.delegate && AsyncScheduler2.delegate !== _this) {
            return AsyncScheduler2.delegate.now();
          } else {
            return now();
          }
        }) || this;
        _this.actions = [];
        _this.active = false;
        _this.scheduled = void 0;
        return _this;
      }
      AsyncScheduler2.prototype.schedule = function(work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }
        if (AsyncScheduler2.delegate && AsyncScheduler2.delegate !== this) {
          return AsyncScheduler2.delegate.schedule(work, delay, state);
        } else {
          return _super.prototype.schedule.call(this, work, delay, state);
        }
      };
      AsyncScheduler2.prototype.flush = function(action) {
        var actions = this.actions;
        if (this.active) {
          actions.push(action);
          return;
        }
        var error;
        this.active = true;
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AsyncScheduler2;
    }(Scheduler_1.Scheduler);
    exports.AsyncScheduler = AsyncScheduler;
  }
});

// node_modules/rxjs/internal/scheduler/QueueScheduler.js
var require_QueueScheduler = __commonJS({
  "node_modules/rxjs/internal/scheduler/QueueScheduler.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsyncScheduler_1 = require_AsyncScheduler();
    var QueueScheduler = function(_super) {
      __extends(QueueScheduler2, _super);
      function QueueScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return QueueScheduler2;
    }(AsyncScheduler_1.AsyncScheduler);
    exports.QueueScheduler = QueueScheduler;
  }
});

// node_modules/rxjs/internal/scheduler/queue.js
var require_queue = __commonJS({
  "node_modules/rxjs/internal/scheduler/queue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QueueAction_1 = require_QueueAction();
    var QueueScheduler_1 = require_QueueScheduler();
    exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
    exports.queue = exports.queueScheduler;
  }
});

// node_modules/rxjs/internal/observable/empty.js
var require_empty = __commonJS({
  "node_modules/rxjs/internal/observable/empty.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    exports.EMPTY = new Observable_1.Observable(function(subscriber) {
      return subscriber.complete();
    });
    function empty(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
    }
    exports.empty = empty;
    function emptyScheduled(scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        return scheduler.schedule(function() {
          return subscriber.complete();
        });
      });
    }
  }
});

// node_modules/rxjs/internal/util/isScheduler.js
var require_isScheduler = __commonJS({
  "node_modules/rxjs/internal/util/isScheduler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isScheduler(value) {
      return value && typeof value.schedule === "function";
    }
    exports.isScheduler = isScheduler;
  }
});

// node_modules/rxjs/internal/util/subscribeToArray.js
var require_subscribeToArray = __commonJS({
  "node_modules/rxjs/internal/util/subscribeToArray.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.subscribeToArray = function(array) {
      return function(subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
          subscriber.next(array[i]);
        }
        subscriber.complete();
      };
    };
  }
});

// node_modules/rxjs/internal/scheduled/scheduleArray.js
var require_scheduleArray = __commonJS({
  "node_modules/rxjs/internal/scheduled/scheduleArray.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    function scheduleArray(input, scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        var sub = new Subscription_1.Subscription();
        var i = 0;
        sub.add(scheduler.schedule(function() {
          if (i === input.length) {
            subscriber.complete();
            return;
          }
          subscriber.next(input[i++]);
          if (!subscriber.closed) {
            sub.add(this.schedule());
          }
        }));
        return sub;
      });
    }
    exports.scheduleArray = scheduleArray;
  }
});

// node_modules/rxjs/internal/observable/fromArray.js
var require_fromArray = __commonJS({
  "node_modules/rxjs/internal/observable/fromArray.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var subscribeToArray_1 = require_subscribeToArray();
    var scheduleArray_1 = require_scheduleArray();
    function fromArray(input, scheduler) {
      if (!scheduler) {
        return new Observable_1.Observable(subscribeToArray_1.subscribeToArray(input));
      } else {
        return scheduleArray_1.scheduleArray(input, scheduler);
      }
    }
    exports.fromArray = fromArray;
  }
});

// node_modules/rxjs/internal/observable/of.js
var require_of = __commonJS({
  "node_modules/rxjs/internal/observable/of.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isScheduler_1 = require_isScheduler();
    var fromArray_1 = require_fromArray();
    var scheduleArray_1 = require_scheduleArray();
    function of() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args[args.length - 1];
      if (isScheduler_1.isScheduler(scheduler)) {
        args.pop();
        return scheduleArray_1.scheduleArray(args, scheduler);
      } else {
        return fromArray_1.fromArray(args);
      }
    }
    exports.of = of;
  }
});

// node_modules/rxjs/internal/observable/throwError.js
var require_throwError = __commonJS({
  "node_modules/rxjs/internal/observable/throwError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    function throwError(error, scheduler) {
      if (!scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          return subscriber.error(error);
        });
      } else {
        return new Observable_1.Observable(function(subscriber) {
          return scheduler.schedule(dispatch, 0, { error, subscriber });
        });
      }
    }
    exports.throwError = throwError;
    function dispatch(_a) {
      var error = _a.error, subscriber = _a.subscriber;
      subscriber.error(error);
    }
  }
});

// node_modules/rxjs/internal/Notification.js
var require_Notification = __commonJS({
  "node_modules/rxjs/internal/Notification.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var empty_1 = require_empty();
    var of_1 = require_of();
    var throwError_1 = require_throwError();
    var NotificationKind;
    (function(NotificationKind2) {
      NotificationKind2["NEXT"] = "N";
      NotificationKind2["ERROR"] = "E";
      NotificationKind2["COMPLETE"] = "C";
    })(NotificationKind = exports.NotificationKind || (exports.NotificationKind = {}));
    var Notification = function() {
      function Notification2(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === "N";
      }
      Notification2.prototype.observe = function(observer) {
        switch (this.kind) {
          case "N":
            return observer.next && observer.next(this.value);
          case "E":
            return observer.error && observer.error(this.error);
          case "C":
            return observer.complete && observer.complete();
        }
      };
      Notification2.prototype.do = function(next, error, complete) {
        var kind = this.kind;
        switch (kind) {
          case "N":
            return next && next(this.value);
          case "E":
            return error && error(this.error);
          case "C":
            return complete && complete();
        }
      };
      Notification2.prototype.accept = function(nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === "function") {
          return this.observe(nextOrObserver);
        } else {
          return this.do(nextOrObserver, error, complete);
        }
      };
      Notification2.prototype.toObservable = function() {
        var kind = this.kind;
        switch (kind) {
          case "N":
            return of_1.of(this.value);
          case "E":
            return throwError_1.throwError(this.error);
          case "C":
            return empty_1.empty();
        }
        throw new Error("unexpected notification kind value");
      };
      Notification2.createNext = function(value) {
        if (typeof value !== "undefined") {
          return new Notification2("N", value);
        }
        return Notification2.undefinedValueNotification;
      };
      Notification2.createError = function(err) {
        return new Notification2("E", void 0, err);
      };
      Notification2.createComplete = function() {
        return Notification2.completeNotification;
      };
      Notification2.completeNotification = new Notification2("C");
      Notification2.undefinedValueNotification = new Notification2("N", void 0);
      return Notification2;
    }();
    exports.Notification = Notification;
  }
});

// node_modules/rxjs/internal/operators/observeOn.js
var require_observeOn = __commonJS({
  "node_modules/rxjs/internal/operators/observeOn.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    var Notification_1 = require_Notification();
    function observeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
      };
    }
    exports.observeOn = observeOn;
    var ObserveOnOperator = function() {
      function ObserveOnOperator2(scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        this.scheduler = scheduler;
        this.delay = delay;
      }
      ObserveOnOperator2.prototype.call = function(subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
      };
      return ObserveOnOperator2;
    }();
    exports.ObserveOnOperator = ObserveOnOperator;
    var ObserveOnSubscriber = function(_super) {
      __extends(ObserveOnSubscriber2, _super);
      function ObserveOnSubscriber2(destination, scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        _this.delay = delay;
        return _this;
      }
      ObserveOnSubscriber2.dispatch = function(arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
      };
      ObserveOnSubscriber2.prototype.scheduleMessage = function(notification) {
        var destination = this.destination;
        destination.add(this.scheduler.schedule(ObserveOnSubscriber2.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
      };
      ObserveOnSubscriber2.prototype._next = function(value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
      };
      ObserveOnSubscriber2.prototype._error = function(err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
        this.unsubscribe();
      };
      ObserveOnSubscriber2.prototype._complete = function() {
        this.scheduleMessage(Notification_1.Notification.createComplete());
        this.unsubscribe();
      };
      return ObserveOnSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.ObserveOnSubscriber = ObserveOnSubscriber;
    var ObserveOnMessage = function() {
      function ObserveOnMessage2(notification, destination) {
        this.notification = notification;
        this.destination = destination;
      }
      return ObserveOnMessage2;
    }();
    exports.ObserveOnMessage = ObserveOnMessage;
  }
});

// node_modules/rxjs/internal/ReplaySubject.js
var require_ReplaySubject = __commonJS({
  "node_modules/rxjs/internal/ReplaySubject.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subject_1 = require_Subject();
    var queue_1 = require_queue();
    var Subscription_1 = require_Subscription();
    var observeOn_1 = require_observeOn();
    var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
    var SubjectSubscription_1 = require_SubjectSubscription();
    var ReplaySubject = function(_super) {
      __extends(ReplaySubject2, _super);
      function ReplaySubject2(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
          bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
          windowTime = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._infiniteTimeWindow = false;
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        if (windowTime === Number.POSITIVE_INFINITY) {
          _this._infiniteTimeWindow = true;
          _this.next = _this.nextInfiniteTimeWindow;
        } else {
          _this.next = _this.nextTimeWindow;
        }
        return _this;
      }
      ReplaySubject2.prototype.nextInfiniteTimeWindow = function(value) {
        if (!this.isStopped) {
          var _events = this._events;
          _events.push(value);
          if (_events.length > this._bufferSize) {
            _events.shift();
          }
        }
        _super.prototype.next.call(this, value);
      };
      ReplaySubject2.prototype.nextTimeWindow = function(value) {
        if (!this.isStopped) {
          this._events.push(new ReplayEvent(this._getNow(), value));
          this._trimBufferThenGetEvents();
        }
        _super.prototype.next.call(this, value);
      };
      ReplaySubject2.prototype._subscribe = function(subscriber) {
        var _infiniteTimeWindow = this._infiniteTimeWindow;
        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var len = _events.length;
        var subscription;
        if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        } else if (this.isStopped || this.hasError) {
          subscription = Subscription_1.Subscription.EMPTY;
        } else {
          this.observers.push(subscriber);
          subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
          subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        if (_infiniteTimeWindow) {
          for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i]);
          }
        } else {
          for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
          }
        }
        if (this.hasError) {
          subscriber.error(this.thrownError);
        } else if (this.isStopped) {
          subscriber.complete();
        }
        return subscription;
      };
      ReplaySubject2.prototype._getNow = function() {
        return (this.scheduler || queue_1.queue).now();
      };
      ReplaySubject2.prototype._trimBufferThenGetEvents = function() {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
          if (now - _events[spliceCount].time < _windowTime) {
            break;
          }
          spliceCount++;
        }
        if (eventsCount > _bufferSize) {
          spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
          _events.splice(0, spliceCount);
        }
        return _events;
      };
      return ReplaySubject2;
    }(Subject_1.Subject);
    exports.ReplaySubject = ReplaySubject;
    var ReplayEvent = function() {
      function ReplayEvent2(time, value) {
        this.time = time;
        this.value = value;
      }
      return ReplayEvent2;
    }();
  }
});

// node_modules/rxjs/internal/AsyncSubject.js
var require_AsyncSubject = __commonJS({
  "node_modules/rxjs/internal/AsyncSubject.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subject_1 = require_Subject();
    var Subscription_1 = require_Subscription();
    var AsyncSubject = function(_super) {
      __extends(AsyncSubject2, _super);
      function AsyncSubject2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
      }
      AsyncSubject2.prototype._subscribe = function(subscriber) {
        if (this.hasError) {
          subscriber.error(this.thrownError);
          return Subscription_1.Subscription.EMPTY;
        } else if (this.hasCompleted && this.hasNext) {
          subscriber.next(this.value);
          subscriber.complete();
          return Subscription_1.Subscription.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
      };
      AsyncSubject2.prototype.next = function(value) {
        if (!this.hasCompleted) {
          this.value = value;
          this.hasNext = true;
        }
      };
      AsyncSubject2.prototype.error = function(error) {
        if (!this.hasCompleted) {
          _super.prototype.error.call(this, error);
        }
      };
      AsyncSubject2.prototype.complete = function() {
        this.hasCompleted = true;
        if (this.hasNext) {
          _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
      };
      return AsyncSubject2;
    }(Subject_1.Subject);
    exports.AsyncSubject = AsyncSubject;
  }
});

// node_modules/rxjs/internal/util/Immediate.js
var require_Immediate = __commonJS({
  "node_modules/rxjs/internal/util/Immediate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var nextHandle = 1;
    var RESOLVED = function() {
      return Promise.resolve();
    }();
    var activeHandles = {};
    function findAndClearHandle(handle) {
      if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
      }
      return false;
    }
    exports.Immediate = {
      setImmediate: function(cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        RESOLVED.then(function() {
          return findAndClearHandle(handle) && cb();
        });
        return handle;
      },
      clearImmediate: function(handle) {
        findAndClearHandle(handle);
      }
    };
    exports.TestTools = {
      pending: function() {
        return Object.keys(activeHandles).length;
      }
    };
  }
});

// node_modules/rxjs/internal/scheduler/AsapAction.js
var require_AsapAction = __commonJS({
  "node_modules/rxjs/internal/scheduler/AsapAction.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Immediate_1 = require_Immediate();
    var AsyncAction_1 = require_AsyncAction();
    var AsapAction = function(_super) {
      __extends(AsapAction2, _super);
      function AsapAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
      };
      AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
          Immediate_1.Immediate.clearImmediate(id);
          scheduler.scheduled = void 0;
        }
        return void 0;
      };
      return AsapAction2;
    }(AsyncAction_1.AsyncAction);
    exports.AsapAction = AsapAction;
  }
});

// node_modules/rxjs/internal/scheduler/AsapScheduler.js
var require_AsapScheduler = __commonJS({
  "node_modules/rxjs/internal/scheduler/AsapScheduler.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsyncScheduler_1 = require_AsyncScheduler();
    var AsapScheduler = function(_super) {
      __extends(AsapScheduler2, _super);
      function AsapScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      AsapScheduler2.prototype.flush = function(action) {
        this.active = true;
        this.scheduled = void 0;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
          while (++index < count && (action = actions.shift())) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AsapScheduler2;
    }(AsyncScheduler_1.AsyncScheduler);
    exports.AsapScheduler = AsapScheduler;
  }
});

// node_modules/rxjs/internal/scheduler/asap.js
var require_asap = __commonJS({
  "node_modules/rxjs/internal/scheduler/asap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsapAction_1 = require_AsapAction();
    var AsapScheduler_1 = require_AsapScheduler();
    exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
    exports.asap = exports.asapScheduler;
  }
});

// node_modules/rxjs/internal/scheduler/async.js
var require_async = __commonJS({
  "node_modules/rxjs/internal/scheduler/async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsyncAction_1 = require_AsyncAction();
    var AsyncScheduler_1 = require_AsyncScheduler();
    exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
    exports.async = exports.asyncScheduler;
  }
});

// node_modules/rxjs/internal/scheduler/AnimationFrameAction.js
var require_AnimationFrameAction = __commonJS({
  "node_modules/rxjs/internal/scheduler/AnimationFrameAction.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsyncAction_1 = require_AsyncAction();
    var AnimationFrameAction = function(_super) {
      __extends(AnimationFrameAction2, _super);
      function AnimationFrameAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function() {
          return scheduler.flush(null);
        }));
      };
      AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
          cancelAnimationFrame(id);
          scheduler.scheduled = void 0;
        }
        return void 0;
      };
      return AnimationFrameAction2;
    }(AsyncAction_1.AsyncAction);
    exports.AnimationFrameAction = AnimationFrameAction;
  }
});

// node_modules/rxjs/internal/scheduler/AnimationFrameScheduler.js
var require_AnimationFrameScheduler = __commonJS({
  "node_modules/rxjs/internal/scheduler/AnimationFrameScheduler.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsyncScheduler_1 = require_AsyncScheduler();
    var AnimationFrameScheduler = function(_super) {
      __extends(AnimationFrameScheduler2, _super);
      function AnimationFrameScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      AnimationFrameScheduler2.prototype.flush = function(action) {
        this.active = true;
        this.scheduled = void 0;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
          while (++index < count && (action = actions.shift())) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AnimationFrameScheduler2;
    }(AsyncScheduler_1.AsyncScheduler);
    exports.AnimationFrameScheduler = AnimationFrameScheduler;
  }
});

// node_modules/rxjs/internal/scheduler/animationFrame.js
var require_animationFrame = __commonJS({
  "node_modules/rxjs/internal/scheduler/animationFrame.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnimationFrameAction_1 = require_AnimationFrameAction();
    var AnimationFrameScheduler_1 = require_AnimationFrameScheduler();
    exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
    exports.animationFrame = exports.animationFrameScheduler;
  }
});

// node_modules/rxjs/internal/scheduler/VirtualTimeScheduler.js
var require_VirtualTimeScheduler = __commonJS({
  "node_modules/rxjs/internal/scheduler/VirtualTimeScheduler.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsyncAction_1 = require_AsyncAction();
    var AsyncScheduler_1 = require_AsyncScheduler();
    var VirtualTimeScheduler = function(_super) {
      __extends(VirtualTimeScheduler2, _super);
      function VirtualTimeScheduler2(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) {
          SchedulerAction = VirtualAction;
        }
        if (maxFrames === void 0) {
          maxFrames = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, SchedulerAction, function() {
          return _this.frame;
        }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
      }
      VirtualTimeScheduler2.prototype.flush = function() {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
          actions.shift();
          this.frame = action.delay;
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        }
        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      VirtualTimeScheduler2.frameTimeFactor = 10;
      return VirtualTimeScheduler2;
    }(AsyncScheduler_1.AsyncScheduler);
    exports.VirtualTimeScheduler = VirtualTimeScheduler;
    var VirtualAction = function(_super) {
      __extends(VirtualAction2, _super);
      function VirtualAction2(scheduler, work, index) {
        if (index === void 0) {
          index = scheduler.index += 1;
        }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
      }
      VirtualAction2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (!this.id) {
          return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction2(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
      };
      VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction2.sortActions);
        return true;
      };
      VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return void 0;
      };
      VirtualAction2.prototype._execute = function(state, delay) {
        if (this.active === true) {
          return _super.prototype._execute.call(this, state, delay);
        }
      };
      VirtualAction2.sortActions = function(a, b) {
        if (a.delay === b.delay) {
          if (a.index === b.index) {
            return 0;
          } else if (a.index > b.index) {
            return 1;
          } else {
            return -1;
          }
        } else if (a.delay > b.delay) {
          return 1;
        } else {
          return -1;
        }
      };
      return VirtualAction2;
    }(AsyncAction_1.AsyncAction);
    exports.VirtualAction = VirtualAction;
  }
});

// node_modules/rxjs/internal/util/noop.js
var require_noop = __commonJS({
  "node_modules/rxjs/internal/util/noop.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function noop() {
    }
    exports.noop = noop;
  }
});

// node_modules/rxjs/internal/util/isObservable.js
var require_isObservable = __commonJS({
  "node_modules/rxjs/internal/util/isObservable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    function isObservable(obj) {
      return !!obj && (obj instanceof Observable_1.Observable || typeof obj.lift === "function" && typeof obj.subscribe === "function");
    }
    exports.isObservable = isObservable;
  }
});

// node_modules/rxjs/internal/util/ArgumentOutOfRangeError.js
var require_ArgumentOutOfRangeError = __commonJS({
  "node_modules/rxjs/internal/util/ArgumentOutOfRangeError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArgumentOutOfRangeErrorImpl = function() {
      function ArgumentOutOfRangeErrorImpl2() {
        Error.call(this);
        this.message = "argument out of range";
        this.name = "ArgumentOutOfRangeError";
        return this;
      }
      ArgumentOutOfRangeErrorImpl2.prototype = Object.create(Error.prototype);
      return ArgumentOutOfRangeErrorImpl2;
    }();
    exports.ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
  }
});

// node_modules/rxjs/internal/util/EmptyError.js
var require_EmptyError = __commonJS({
  "node_modules/rxjs/internal/util/EmptyError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmptyErrorImpl = function() {
      function EmptyErrorImpl2() {
        Error.call(this);
        this.message = "no elements in sequence";
        this.name = "EmptyError";
        return this;
      }
      EmptyErrorImpl2.prototype = Object.create(Error.prototype);
      return EmptyErrorImpl2;
    }();
    exports.EmptyError = EmptyErrorImpl;
  }
});

// node_modules/rxjs/internal/util/TimeoutError.js
var require_TimeoutError = __commonJS({
  "node_modules/rxjs/internal/util/TimeoutError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeoutErrorImpl = function() {
      function TimeoutErrorImpl2() {
        Error.call(this);
        this.message = "Timeout has occurred";
        this.name = "TimeoutError";
        return this;
      }
      TimeoutErrorImpl2.prototype = Object.create(Error.prototype);
      return TimeoutErrorImpl2;
    }();
    exports.TimeoutError = TimeoutErrorImpl;
  }
});

// node_modules/rxjs/internal/operators/map.js
var require_map = __commonJS({
  "node_modules/rxjs/internal/operators/map.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    function map(project, thisArg) {
      return function mapOperation(source) {
        if (typeof project !== "function") {
          throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
        }
        return source.lift(new MapOperator(project, thisArg));
      };
    }
    exports.map = map;
    var MapOperator = function() {
      function MapOperator2(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
      }
      MapOperator2.prototype.call = function(subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
      };
      return MapOperator2;
    }();
    exports.MapOperator = MapOperator;
    var MapSubscriber = function(_super) {
      __extends(MapSubscriber2, _super);
      function MapSubscriber2(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
      }
      MapSubscriber2.prototype._next = function(value) {
        var result;
        try {
          result = this.project.call(this.thisArg, value, this.count++);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return MapSubscriber2;
    }(Subscriber_1.Subscriber);
  }
});

// node_modules/rxjs/internal/observable/bindCallback.js
var require_bindCallback = __commonJS({
  "node_modules/rxjs/internal/observable/bindCallback.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var AsyncSubject_1 = require_AsyncSubject();
    var map_1 = require_map();
    var canReportError_1 = require_canReportError();
    var isArray_1 = require_isArray();
    var isScheduler_1 = require_isScheduler();
    function bindCallback(callbackFunc, resultSelector, scheduler) {
      if (resultSelector) {
        if (isScheduler_1.isScheduler(resultSelector)) {
          scheduler = resultSelector;
        } else {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map_1.map(function(args2) {
              return isArray_1.isArray(args2) ? resultSelector.apply(void 0, args2) : resultSelector(args2);
            }));
          };
        }
      }
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var context = this;
        var subject;
        var params = {
          context,
          subject,
          callbackFunc,
          scheduler
        };
        return new Observable_1.Observable(function(subscriber) {
          if (!scheduler) {
            if (!subject) {
              subject = new AsyncSubject_1.AsyncSubject();
              var handler = function() {
                var innerArgs = [];
                for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                  innerArgs[_i2] = arguments[_i2];
                }
                subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                subject.complete();
              };
              try {
                callbackFunc.apply(context, args.concat([handler]));
              } catch (err) {
                if (canReportError_1.canReportError(subject)) {
                  subject.error(err);
                } else {
                  console.warn(err);
                }
              }
            }
            return subject.subscribe(subscriber);
          } else {
            var state = {
              args,
              subscriber,
              params
            };
            return scheduler.schedule(dispatch, 0, state);
          }
        });
      };
    }
    exports.bindCallback = bindCallback;
    function dispatch(state) {
      var _this = this;
      var self = this;
      var args = state.args, subscriber = state.subscriber, params = state.params;
      var callbackFunc = params.callbackFunc, context = params.context, scheduler = params.scheduler;
      var subject = params.subject;
      if (!subject) {
        subject = params.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function() {
          var innerArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            innerArgs[_i] = arguments[_i];
          }
          var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
          _this.add(scheduler.schedule(dispatchNext, 0, { value, subject }));
        };
        try {
          callbackFunc.apply(context, args.concat([handler]));
        } catch (err) {
          subject.error(err);
        }
      }
      this.add(subject.subscribe(subscriber));
    }
    function dispatchNext(state) {
      var value = state.value, subject = state.subject;
      subject.next(value);
      subject.complete();
    }
  }
});

// node_modules/rxjs/internal/observable/bindNodeCallback.js
var require_bindNodeCallback = __commonJS({
  "node_modules/rxjs/internal/observable/bindNodeCallback.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var AsyncSubject_1 = require_AsyncSubject();
    var map_1 = require_map();
    var canReportError_1 = require_canReportError();
    var isScheduler_1 = require_isScheduler();
    var isArray_1 = require_isArray();
    function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
      if (resultSelector) {
        if (isScheduler_1.isScheduler(resultSelector)) {
          scheduler = resultSelector;
        } else {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map_1.map(function(args2) {
              return isArray_1.isArray(args2) ? resultSelector.apply(void 0, args2) : resultSelector(args2);
            }));
          };
        }
      }
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var params = {
          subject: void 0,
          args,
          callbackFunc,
          scheduler,
          context: this
        };
        return new Observable_1.Observable(function(subscriber) {
          var context = params.context;
          var subject = params.subject;
          if (!scheduler) {
            if (!subject) {
              subject = params.subject = new AsyncSubject_1.AsyncSubject();
              var handler = function() {
                var innerArgs = [];
                for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                  innerArgs[_i2] = arguments[_i2];
                }
                var err = innerArgs.shift();
                if (err) {
                  subject.error(err);
                  return;
                }
                subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                subject.complete();
              };
              try {
                callbackFunc.apply(context, args.concat([handler]));
              } catch (err) {
                if (canReportError_1.canReportError(subject)) {
                  subject.error(err);
                } else {
                  console.warn(err);
                }
              }
            }
            return subject.subscribe(subscriber);
          } else {
            return scheduler.schedule(dispatch, 0, { params, subscriber, context });
          }
        });
      };
    }
    exports.bindNodeCallback = bindNodeCallback;
    function dispatch(state) {
      var _this = this;
      var params = state.params, subscriber = state.subscriber, context = state.context;
      var callbackFunc = params.callbackFunc, args = params.args, scheduler = params.scheduler;
      var subject = params.subject;
      if (!subject) {
        subject = params.subject = new AsyncSubject_1.AsyncSubject();
        var handler = function() {
          var innerArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            innerArgs[_i] = arguments[_i];
          }
          var err = innerArgs.shift();
          if (err) {
            _this.add(scheduler.schedule(dispatchError, 0, { err, subject }));
          } else {
            var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
            _this.add(scheduler.schedule(dispatchNext, 0, { value, subject }));
          }
        };
        try {
          callbackFunc.apply(context, args.concat([handler]));
        } catch (err) {
          this.add(scheduler.schedule(dispatchError, 0, { err, subject }));
        }
      }
      this.add(subject.subscribe(subscriber));
    }
    function dispatchNext(arg) {
      var value = arg.value, subject = arg.subject;
      subject.next(value);
      subject.complete();
    }
    function dispatchError(arg) {
      var err = arg.err, subject = arg.subject;
      subject.error(err);
    }
  }
});

// node_modules/rxjs/internal/OuterSubscriber.js
var require_OuterSubscriber = __commonJS({
  "node_modules/rxjs/internal/OuterSubscriber.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    var OuterSubscriber = function(_super) {
      __extends(OuterSubscriber2, _super);
      function OuterSubscriber2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      OuterSubscriber2.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
      };
      OuterSubscriber2.prototype.notifyError = function(error, innerSub) {
        this.destination.error(error);
      };
      OuterSubscriber2.prototype.notifyComplete = function(innerSub) {
        this.destination.complete();
      };
      return OuterSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.OuterSubscriber = OuterSubscriber;
  }
});

// node_modules/rxjs/internal/InnerSubscriber.js
var require_InnerSubscriber = __commonJS({
  "node_modules/rxjs/internal/InnerSubscriber.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    var InnerSubscriber = function(_super) {
      __extends(InnerSubscriber2, _super);
      function InnerSubscriber2(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
      }
      InnerSubscriber2.prototype._next = function(value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
      };
      InnerSubscriber2.prototype._error = function(error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
      };
      InnerSubscriber2.prototype._complete = function() {
        this.parent.notifyComplete(this);
        this.unsubscribe();
      };
      return InnerSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.InnerSubscriber = InnerSubscriber;
  }
});

// node_modules/rxjs/internal/util/subscribeToPromise.js
var require_subscribeToPromise = __commonJS({
  "node_modules/rxjs/internal/util/subscribeToPromise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hostReportError_1 = require_hostReportError();
    exports.subscribeToPromise = function(promise) {
      return function(subscriber) {
        promise.then(function(value) {
          if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
          }
        }, function(err) {
          return subscriber.error(err);
        }).then(null, hostReportError_1.hostReportError);
        return subscriber;
      };
    };
  }
});

// node_modules/rxjs/internal/symbol/iterator.js
var require_iterator = __commonJS({
  "node_modules/rxjs/internal/symbol/iterator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getSymbolIterator() {
      if (typeof Symbol !== "function" || !Symbol.iterator) {
        return "@@iterator";
      }
      return Symbol.iterator;
    }
    exports.getSymbolIterator = getSymbolIterator;
    exports.iterator = getSymbolIterator();
    exports.$$iterator = exports.iterator;
  }
});

// node_modules/rxjs/internal/util/subscribeToIterable.js
var require_subscribeToIterable = __commonJS({
  "node_modules/rxjs/internal/util/subscribeToIterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var iterator_1 = require_iterator();
    exports.subscribeToIterable = function(iterable) {
      return function(subscriber) {
        var iterator = iterable[iterator_1.iterator]();
        do {
          var item = void 0;
          try {
            item = iterator.next();
          } catch (err) {
            subscriber.error(err);
            return subscriber;
          }
          if (item.done) {
            subscriber.complete();
            break;
          }
          subscriber.next(item.value);
          if (subscriber.closed) {
            break;
          }
        } while (true);
        if (typeof iterator.return === "function") {
          subscriber.add(function() {
            if (iterator.return) {
              iterator.return();
            }
          });
        }
        return subscriber;
      };
    };
  }
});

// node_modules/rxjs/internal/util/subscribeToObservable.js
var require_subscribeToObservable = __commonJS({
  "node_modules/rxjs/internal/util/subscribeToObservable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var observable_1 = require_observable();
    exports.subscribeToObservable = function(obj) {
      return function(subscriber) {
        var obs = obj[observable_1.observable]();
        if (typeof obs.subscribe !== "function") {
          throw new TypeError("Provided object does not correctly implement Symbol.observable");
        } else {
          return obs.subscribe(subscriber);
        }
      };
    };
  }
});

// node_modules/rxjs/internal/util/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/rxjs/internal/util/isArrayLike.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isArrayLike = function(x) {
      return x && typeof x.length === "number" && typeof x !== "function";
    };
  }
});

// node_modules/rxjs/internal/util/isPromise.js
var require_isPromise = __commonJS({
  "node_modules/rxjs/internal/util/isPromise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isPromise(value) {
      return !!value && typeof value.subscribe !== "function" && typeof value.then === "function";
    }
    exports.isPromise = isPromise;
  }
});

// node_modules/rxjs/internal/util/subscribeTo.js
var require_subscribeTo = __commonJS({
  "node_modules/rxjs/internal/util/subscribeTo.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var subscribeToArray_1 = require_subscribeToArray();
    var subscribeToPromise_1 = require_subscribeToPromise();
    var subscribeToIterable_1 = require_subscribeToIterable();
    var subscribeToObservable_1 = require_subscribeToObservable();
    var isArrayLike_1 = require_isArrayLike();
    var isPromise_1 = require_isPromise();
    var isObject_1 = require_isObject();
    var iterator_1 = require_iterator();
    var observable_1 = require_observable();
    exports.subscribeTo = function(result) {
      if (!!result && typeof result[observable_1.observable] === "function") {
        return subscribeToObservable_1.subscribeToObservable(result);
      } else if (isArrayLike_1.isArrayLike(result)) {
        return subscribeToArray_1.subscribeToArray(result);
      } else if (isPromise_1.isPromise(result)) {
        return subscribeToPromise_1.subscribeToPromise(result);
      } else if (!!result && typeof result[iterator_1.iterator] === "function") {
        return subscribeToIterable_1.subscribeToIterable(result);
      } else {
        var value = isObject_1.isObject(result) ? "an invalid object" : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.";
        throw new TypeError(msg);
      }
    };
  }
});

// node_modules/rxjs/internal/util/subscribeToResult.js
var require_subscribeToResult = __commonJS({
  "node_modules/rxjs/internal/util/subscribeToResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerSubscriber_1 = require_InnerSubscriber();
    var subscribeTo_1 = require_subscribeTo();
    var Observable_1 = require_Observable();
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
      if (innerSubscriber === void 0) {
        innerSubscriber = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
      }
      if (innerSubscriber.closed) {
        return void 0;
      }
      if (result instanceof Observable_1.Observable) {
        return result.subscribe(innerSubscriber);
      }
      return subscribeTo_1.subscribeTo(result)(innerSubscriber);
    }
    exports.subscribeToResult = subscribeToResult;
  }
});

// node_modules/rxjs/internal/observable/combineLatest.js
var require_combineLatest = __commonJS({
  "node_modules/rxjs/internal/observable/combineLatest.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isScheduler_1 = require_isScheduler();
    var isArray_1 = require_isArray();
    var OuterSubscriber_1 = require_OuterSubscriber();
    var subscribeToResult_1 = require_subscribeToResult();
    var fromArray_1 = require_fromArray();
    var NONE = {};
    function combineLatest() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
      }
      var resultSelector = void 0;
      var scheduler = void 0;
      if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
      }
      if (typeof observables[observables.length - 1] === "function") {
        resultSelector = observables.pop();
      }
      if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
      }
      return fromArray_1.fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
    }
    exports.combineLatest = combineLatest;
    var CombineLatestOperator = function() {
      function CombineLatestOperator2(resultSelector) {
        this.resultSelector = resultSelector;
      }
      CombineLatestOperator2.prototype.call = function(subscriber, source) {
        return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
      };
      return CombineLatestOperator2;
    }();
    exports.CombineLatestOperator = CombineLatestOperator;
    var CombineLatestSubscriber = function(_super) {
      __extends(CombineLatestSubscriber2, _super);
      function CombineLatestSubscriber2(destination, resultSelector) {
        var _this = _super.call(this, destination) || this;
        _this.resultSelector = resultSelector;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
      }
      CombineLatestSubscriber2.prototype._next = function(observable) {
        this.values.push(NONE);
        this.observables.push(observable);
      };
      CombineLatestSubscriber2.prototype._complete = function() {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
          this.destination.complete();
        } else {
          this.active = len;
          this.toRespond = len;
          for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult_1.subscribeToResult(this, observable, void 0, i));
          }
        }
      };
      CombineLatestSubscriber2.prototype.notifyComplete = function(unused) {
        if ((this.active -= 1) === 0) {
          this.destination.complete();
        }
      };
      CombineLatestSubscriber2.prototype.notifyNext = function(_outerValue, innerValue, outerIndex) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
          if (this.resultSelector) {
            this._tryResultSelector(values);
          } else {
            this.destination.next(values.slice());
          }
        }
      };
      CombineLatestSubscriber2.prototype._tryResultSelector = function(values) {
        var result;
        try {
          result = this.resultSelector.apply(this, values);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return CombineLatestSubscriber2;
    }(OuterSubscriber_1.OuterSubscriber);
    exports.CombineLatestSubscriber = CombineLatestSubscriber;
  }
});

// node_modules/rxjs/internal/scheduled/scheduleObservable.js
var require_scheduleObservable = __commonJS({
  "node_modules/rxjs/internal/scheduled/scheduleObservable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    var observable_1 = require_observable();
    function scheduleObservable(input, scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        var sub = new Subscription_1.Subscription();
        sub.add(scheduler.schedule(function() {
          var observable = input[observable_1.observable]();
          sub.add(observable.subscribe({
            next: function(value) {
              sub.add(scheduler.schedule(function() {
                return subscriber.next(value);
              }));
            },
            error: function(err) {
              sub.add(scheduler.schedule(function() {
                return subscriber.error(err);
              }));
            },
            complete: function() {
              sub.add(scheduler.schedule(function() {
                return subscriber.complete();
              }));
            }
          }));
        }));
        return sub;
      });
    }
    exports.scheduleObservable = scheduleObservable;
  }
});

// node_modules/rxjs/internal/scheduled/schedulePromise.js
var require_schedulePromise = __commonJS({
  "node_modules/rxjs/internal/scheduled/schedulePromise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    function schedulePromise(input, scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        var sub = new Subscription_1.Subscription();
        sub.add(scheduler.schedule(function() {
          return input.then(function(value) {
            sub.add(scheduler.schedule(function() {
              subscriber.next(value);
              sub.add(scheduler.schedule(function() {
                return subscriber.complete();
              }));
            }));
          }, function(err) {
            sub.add(scheduler.schedule(function() {
              return subscriber.error(err);
            }));
          });
        }));
        return sub;
      });
    }
    exports.schedulePromise = schedulePromise;
  }
});

// node_modules/rxjs/internal/scheduled/scheduleIterable.js
var require_scheduleIterable = __commonJS({
  "node_modules/rxjs/internal/scheduled/scheduleIterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    var iterator_1 = require_iterator();
    function scheduleIterable(input, scheduler) {
      if (!input) {
        throw new Error("Iterable cannot be null");
      }
      return new Observable_1.Observable(function(subscriber) {
        var sub = new Subscription_1.Subscription();
        var iterator;
        sub.add(function() {
          if (iterator && typeof iterator.return === "function") {
            iterator.return();
          }
        });
        sub.add(scheduler.schedule(function() {
          iterator = input[iterator_1.iterator]();
          sub.add(scheduler.schedule(function() {
            if (subscriber.closed) {
              return;
            }
            var value;
            var done;
            try {
              var result = iterator.next();
              value = result.value;
              done = result.done;
            } catch (err) {
              subscriber.error(err);
              return;
            }
            if (done) {
              subscriber.complete();
            } else {
              subscriber.next(value);
              this.schedule();
            }
          }));
        }));
        return sub;
      });
    }
    exports.scheduleIterable = scheduleIterable;
  }
});

// node_modules/rxjs/internal/util/isInteropObservable.js
var require_isInteropObservable = __commonJS({
  "node_modules/rxjs/internal/util/isInteropObservable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var observable_1 = require_observable();
    function isInteropObservable(input) {
      return input && typeof input[observable_1.observable] === "function";
    }
    exports.isInteropObservable = isInteropObservable;
  }
});

// node_modules/rxjs/internal/util/isIterable.js
var require_isIterable = __commonJS({
  "node_modules/rxjs/internal/util/isIterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var iterator_1 = require_iterator();
    function isIterable(input) {
      return input && typeof input[iterator_1.iterator] === "function";
    }
    exports.isIterable = isIterable;
  }
});

// node_modules/rxjs/internal/scheduled/scheduled.js
var require_scheduled = __commonJS({
  "node_modules/rxjs/internal/scheduled/scheduled.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var scheduleObservable_1 = require_scheduleObservable();
    var schedulePromise_1 = require_schedulePromise();
    var scheduleArray_1 = require_scheduleArray();
    var scheduleIterable_1 = require_scheduleIterable();
    var isInteropObservable_1 = require_isInteropObservable();
    var isPromise_1 = require_isPromise();
    var isArrayLike_1 = require_isArrayLike();
    var isIterable_1 = require_isIterable();
    function scheduled(input, scheduler) {
      if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
          return scheduleObservable_1.scheduleObservable(input, scheduler);
        } else if (isPromise_1.isPromise(input)) {
          return schedulePromise_1.schedulePromise(input, scheduler);
        } else if (isArrayLike_1.isArrayLike(input)) {
          return scheduleArray_1.scheduleArray(input, scheduler);
        } else if (isIterable_1.isIterable(input) || typeof input === "string") {
          return scheduleIterable_1.scheduleIterable(input, scheduler);
        }
      }
      throw new TypeError((input !== null && typeof input || input) + " is not observable");
    }
    exports.scheduled = scheduled;
  }
});

// node_modules/rxjs/internal/observable/from.js
var require_from = __commonJS({
  "node_modules/rxjs/internal/observable/from.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var subscribeTo_1 = require_subscribeTo();
    var scheduled_1 = require_scheduled();
    function from(input, scheduler) {
      if (!scheduler) {
        if (input instanceof Observable_1.Observable) {
          return input;
        }
        return new Observable_1.Observable(subscribeTo_1.subscribeTo(input));
      } else {
        return scheduled_1.scheduled(input, scheduler);
      }
    }
    exports.from = from;
  }
});

// node_modules/rxjs/internal/innerSubscribe.js
var require_innerSubscribe = __commonJS({
  "node_modules/rxjs/internal/innerSubscribe.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    var Observable_1 = require_Observable();
    var subscribeTo_1 = require_subscribeTo();
    var SimpleInnerSubscriber = function(_super) {
      __extends(SimpleInnerSubscriber2, _super);
      function SimpleInnerSubscriber2(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        return _this;
      }
      SimpleInnerSubscriber2.prototype._next = function(value) {
        this.parent.notifyNext(value);
      };
      SimpleInnerSubscriber2.prototype._error = function(error) {
        this.parent.notifyError(error);
        this.unsubscribe();
      };
      SimpleInnerSubscriber2.prototype._complete = function() {
        this.parent.notifyComplete();
        this.unsubscribe();
      };
      return SimpleInnerSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.SimpleInnerSubscriber = SimpleInnerSubscriber;
    var ComplexInnerSubscriber = function(_super) {
      __extends(ComplexInnerSubscriber2, _super);
      function ComplexInnerSubscriber2(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        return _this;
      }
      ComplexInnerSubscriber2.prototype._next = function(value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this);
      };
      ComplexInnerSubscriber2.prototype._error = function(error) {
        this.parent.notifyError(error);
        this.unsubscribe();
      };
      ComplexInnerSubscriber2.prototype._complete = function() {
        this.parent.notifyComplete(this);
        this.unsubscribe();
      };
      return ComplexInnerSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.ComplexInnerSubscriber = ComplexInnerSubscriber;
    var SimpleOuterSubscriber = function(_super) {
      __extends(SimpleOuterSubscriber2, _super);
      function SimpleOuterSubscriber2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      SimpleOuterSubscriber2.prototype.notifyNext = function(innerValue) {
        this.destination.next(innerValue);
      };
      SimpleOuterSubscriber2.prototype.notifyError = function(err) {
        this.destination.error(err);
      };
      SimpleOuterSubscriber2.prototype.notifyComplete = function() {
        this.destination.complete();
      };
      return SimpleOuterSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.SimpleOuterSubscriber = SimpleOuterSubscriber;
    var ComplexOuterSubscriber = function(_super) {
      __extends(ComplexOuterSubscriber2, _super);
      function ComplexOuterSubscriber2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      ComplexOuterSubscriber2.prototype.notifyNext = function(_outerValue, innerValue, _outerIndex, _innerSub) {
        this.destination.next(innerValue);
      };
      ComplexOuterSubscriber2.prototype.notifyError = function(error) {
        this.destination.error(error);
      };
      ComplexOuterSubscriber2.prototype.notifyComplete = function(_innerSub) {
        this.destination.complete();
      };
      return ComplexOuterSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.ComplexOuterSubscriber = ComplexOuterSubscriber;
    function innerSubscribe(result, innerSubscriber) {
      if (innerSubscriber.closed) {
        return void 0;
      }
      if (result instanceof Observable_1.Observable) {
        return result.subscribe(innerSubscriber);
      }
      var subscription;
      try {
        subscription = subscribeTo_1.subscribeTo(result)(innerSubscriber);
      } catch (error) {
        innerSubscriber.error(error);
      }
      return subscription;
    }
    exports.innerSubscribe = innerSubscribe;
  }
});

// node_modules/rxjs/internal/operators/mergeMap.js
var require_mergeMap = __commonJS({
  "node_modules/rxjs/internal/operators/mergeMap.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var map_1 = require_map();
    var from_1 = require_from();
    var innerSubscribe_1 = require_innerSubscribe();
    function mergeMap(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      if (typeof resultSelector === "function") {
        return function(source) {
          return source.pipe(mergeMap(function(a, i) {
            return from_1.from(project(a, i)).pipe(map_1.map(function(b, ii) {
              return resultSelector(a, b, i, ii);
            }));
          }, concurrent));
        };
      } else if (typeof resultSelector === "number") {
        concurrent = resultSelector;
      }
      return function(source) {
        return source.lift(new MergeMapOperator(project, concurrent));
      };
    }
    exports.mergeMap = mergeMap;
    var MergeMapOperator = function() {
      function MergeMapOperator2(project, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.concurrent = concurrent;
      }
      MergeMapOperator2.prototype.call = function(observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
      };
      return MergeMapOperator2;
    }();
    exports.MergeMapOperator = MergeMapOperator;
    var MergeMapSubscriber = function(_super) {
      __extends(MergeMapSubscriber2, _super);
      function MergeMapSubscriber2(destination, project, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
      }
      MergeMapSubscriber2.prototype._next = function(value) {
        if (this.active < this.concurrent) {
          this._tryNext(value);
        } else {
          this.buffer.push(value);
        }
      };
      MergeMapSubscriber2.prototype._tryNext = function(value) {
        var result;
        var index = this.index++;
        try {
          result = this.project(value, index);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.active++;
        this._innerSub(result);
      };
      MergeMapSubscriber2.prototype._innerSub = function(ish) {
        var innerSubscriber = new innerSubscribe_1.SimpleInnerSubscriber(this);
        var destination = this.destination;
        destination.add(innerSubscriber);
        var innerSubscription = innerSubscribe_1.innerSubscribe(ish, innerSubscriber);
        if (innerSubscription !== innerSubscriber) {
          destination.add(innerSubscription);
        }
      };
      MergeMapSubscriber2.prototype._complete = function() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
          this.destination.complete();
        }
        this.unsubscribe();
      };
      MergeMapSubscriber2.prototype.notifyNext = function(innerValue) {
        this.destination.next(innerValue);
      };
      MergeMapSubscriber2.prototype.notifyComplete = function() {
        var buffer = this.buffer;
        this.active--;
        if (buffer.length > 0) {
          this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
          this.destination.complete();
        }
      };
      return MergeMapSubscriber2;
    }(innerSubscribe_1.SimpleOuterSubscriber);
    exports.MergeMapSubscriber = MergeMapSubscriber;
    exports.flatMap = mergeMap;
  }
});

// node_modules/rxjs/internal/operators/mergeAll.js
var require_mergeAll = __commonJS({
  "node_modules/rxjs/internal/operators/mergeAll.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mergeMap_1 = require_mergeMap();
    var identity_1 = require_identity();
    function mergeAll(concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      return mergeMap_1.mergeMap(identity_1.identity, concurrent);
    }
    exports.mergeAll = mergeAll;
  }
});

// node_modules/rxjs/internal/operators/concatAll.js
var require_concatAll = __commonJS({
  "node_modules/rxjs/internal/operators/concatAll.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mergeAll_1 = require_mergeAll();
    function concatAll() {
      return mergeAll_1.mergeAll(1);
    }
    exports.concatAll = concatAll;
  }
});

// node_modules/rxjs/internal/observable/concat.js
var require_concat = __commonJS({
  "node_modules/rxjs/internal/observable/concat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var of_1 = require_of();
    var concatAll_1 = require_concatAll();
    function concat() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
      }
      return concatAll_1.concatAll()(of_1.of.apply(void 0, observables));
    }
    exports.concat = concat;
  }
});

// node_modules/rxjs/internal/observable/defer.js
var require_defer = __commonJS({
  "node_modules/rxjs/internal/observable/defer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var from_1 = require_from();
    var empty_1 = require_empty();
    function defer(observableFactory) {
      return new Observable_1.Observable(function(subscriber) {
        var input;
        try {
          input = observableFactory();
        } catch (err) {
          subscriber.error(err);
          return void 0;
        }
        var source = input ? from_1.from(input) : empty_1.empty();
        return source.subscribe(subscriber);
      });
    }
    exports.defer = defer;
  }
});

// node_modules/rxjs/internal/observable/forkJoin.js
var require_forkJoin = __commonJS({
  "node_modules/rxjs/internal/observable/forkJoin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var isArray_1 = require_isArray();
    var map_1 = require_map();
    var isObject_1 = require_isObject();
    var from_1 = require_from();
    function forkJoin() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      if (sources.length === 1) {
        var first_1 = sources[0];
        if (isArray_1.isArray(first_1)) {
          return forkJoinInternal(first_1, null);
        }
        if (isObject_1.isObject(first_1) && Object.getPrototypeOf(first_1) === Object.prototype) {
          var keys = Object.keys(first_1);
          return forkJoinInternal(keys.map(function(key) {
            return first_1[key];
          }), keys);
        }
      }
      if (typeof sources[sources.length - 1] === "function") {
        var resultSelector_1 = sources.pop();
        sources = sources.length === 1 && isArray_1.isArray(sources[0]) ? sources[0] : sources;
        return forkJoinInternal(sources, null).pipe(map_1.map(function(args) {
          return resultSelector_1.apply(void 0, args);
        }));
      }
      return forkJoinInternal(sources, null);
    }
    exports.forkJoin = forkJoin;
    function forkJoinInternal(sources, keys) {
      return new Observable_1.Observable(function(subscriber) {
        var len = sources.length;
        if (len === 0) {
          subscriber.complete();
          return;
        }
        var values = new Array(len);
        var completed = 0;
        var emitted = 0;
        var _loop_1 = function(i2) {
          var source = from_1.from(sources[i2]);
          var hasValue = false;
          subscriber.add(source.subscribe({
            next: function(value) {
              if (!hasValue) {
                hasValue = true;
                emitted++;
              }
              values[i2] = value;
            },
            error: function(err) {
              return subscriber.error(err);
            },
            complete: function() {
              completed++;
              if (completed === len || !hasValue) {
                if (emitted === len) {
                  subscriber.next(keys ? keys.reduce(function(result, key, i3) {
                    return result[key] = values[i3], result;
                  }, {}) : values);
                }
                subscriber.complete();
              }
            }
          }));
        };
        for (var i = 0; i < len; i++) {
          _loop_1(i);
        }
      });
    }
  }
});

// node_modules/rxjs/internal/observable/fromEvent.js
var require_fromEvent = __commonJS({
  "node_modules/rxjs/internal/observable/fromEvent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var isArray_1 = require_isArray();
    var isFunction_1 = require_isFunction();
    var map_1 = require_map();
    var toString = function() {
      return Object.prototype.toString;
    }();
    function fromEvent(target, eventName, options, resultSelector) {
      if (isFunction_1.isFunction(options)) {
        resultSelector = options;
        options = void 0;
      }
      if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(map_1.map(function(args) {
          return isArray_1.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
      }
      return new Observable_1.Observable(function(subscriber) {
        function handler(e) {
          if (arguments.length > 1) {
            subscriber.next(Array.prototype.slice.call(arguments));
          } else {
            subscriber.next(e);
          }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
      });
    }
    exports.fromEvent = fromEvent;
    function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
      var unsubscribe;
      if (isEventTarget(sourceObj)) {
        var source_1 = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = function() {
          return source_1.removeEventListener(eventName, handler, options);
        };
      } else if (isJQueryStyleEventEmitter(sourceObj)) {
        var source_2 = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = function() {
          return source_2.off(eventName, handler);
        };
      } else if (isNodeStyleEventEmitter(sourceObj)) {
        var source_3 = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = function() {
          return source_3.removeListener(eventName, handler);
        };
      } else if (sourceObj && sourceObj.length) {
        for (var i = 0, len = sourceObj.length; i < len; i++) {
          setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
      } else {
        throw new TypeError("Invalid event target");
      }
      subscriber.add(unsubscribe);
    }
    function isNodeStyleEventEmitter(sourceObj) {
      return sourceObj && typeof sourceObj.addListener === "function" && typeof sourceObj.removeListener === "function";
    }
    function isJQueryStyleEventEmitter(sourceObj) {
      return sourceObj && typeof sourceObj.on === "function" && typeof sourceObj.off === "function";
    }
    function isEventTarget(sourceObj) {
      return sourceObj && typeof sourceObj.addEventListener === "function" && typeof sourceObj.removeEventListener === "function";
    }
  }
});

// node_modules/rxjs/internal/observable/fromEventPattern.js
var require_fromEventPattern = __commonJS({
  "node_modules/rxjs/internal/observable/fromEventPattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var isArray_1 = require_isArray();
    var isFunction_1 = require_isFunction();
    var map_1 = require_map();
    function fromEventPattern(addHandler, removeHandler, resultSelector) {
      if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(map_1.map(function(args) {
          return isArray_1.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
      }
      return new Observable_1.Observable(function(subscriber) {
        var handler = function() {
          var e = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            e[_i] = arguments[_i];
          }
          return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue;
        try {
          retValue = addHandler(handler);
        } catch (err) {
          subscriber.error(err);
          return void 0;
        }
        if (!isFunction_1.isFunction(removeHandler)) {
          return void 0;
        }
        return function() {
          return removeHandler(handler, retValue);
        };
      });
    }
    exports.fromEventPattern = fromEventPattern;
  }
});

// node_modules/rxjs/internal/observable/generate.js
var require_generate = __commonJS({
  "node_modules/rxjs/internal/observable/generate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var identity_1 = require_identity();
    var isScheduler_1 = require_isScheduler();
    function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
      var resultSelector;
      var initialState;
      if (arguments.length == 1) {
        var options = initialStateOrOptions;
        initialState = options.initialState;
        condition = options.condition;
        iterate = options.iterate;
        resultSelector = options.resultSelector || identity_1.identity;
        scheduler = options.scheduler;
      } else if (resultSelectorOrObservable === void 0 || isScheduler_1.isScheduler(resultSelectorOrObservable)) {
        initialState = initialStateOrOptions;
        resultSelector = identity_1.identity;
        scheduler = resultSelectorOrObservable;
      } else {
        initialState = initialStateOrOptions;
        resultSelector = resultSelectorOrObservable;
      }
      return new Observable_1.Observable(function(subscriber) {
        var state = initialState;
        if (scheduler) {
          return scheduler.schedule(dispatch, 0, {
            subscriber,
            iterate,
            condition,
            resultSelector,
            state
          });
        }
        do {
          if (condition) {
            var conditionResult = void 0;
            try {
              conditionResult = condition(state);
            } catch (err) {
              subscriber.error(err);
              return void 0;
            }
            if (!conditionResult) {
              subscriber.complete();
              break;
            }
          }
          var value = void 0;
          try {
            value = resultSelector(state);
          } catch (err) {
            subscriber.error(err);
            return void 0;
          }
          subscriber.next(value);
          if (subscriber.closed) {
            break;
          }
          try {
            state = iterate(state);
          } catch (err) {
            subscriber.error(err);
            return void 0;
          }
        } while (true);
        return void 0;
      });
    }
    exports.generate = generate;
    function dispatch(state) {
      var subscriber = state.subscriber, condition = state.condition;
      if (subscriber.closed) {
        return void 0;
      }
      if (state.needIterate) {
        try {
          state.state = state.iterate(state.state);
        } catch (err) {
          subscriber.error(err);
          return void 0;
        }
      } else {
        state.needIterate = true;
      }
      if (condition) {
        var conditionResult = void 0;
        try {
          conditionResult = condition(state.state);
        } catch (err) {
          subscriber.error(err);
          return void 0;
        }
        if (!conditionResult) {
          subscriber.complete();
          return void 0;
        }
        if (subscriber.closed) {
          return void 0;
        }
      }
      var value;
      try {
        value = state.resultSelector(state.state);
      } catch (err) {
        subscriber.error(err);
        return void 0;
      }
      if (subscriber.closed) {
        return void 0;
      }
      subscriber.next(value);
      if (subscriber.closed) {
        return void 0;
      }
      return this.schedule(state);
    }
  }
});

// node_modules/rxjs/internal/observable/iif.js
var require_iif = __commonJS({
  "node_modules/rxjs/internal/observable/iif.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defer_1 = require_defer();
    var empty_1 = require_empty();
    function iif(condition, trueResult, falseResult) {
      if (trueResult === void 0) {
        trueResult = empty_1.EMPTY;
      }
      if (falseResult === void 0) {
        falseResult = empty_1.EMPTY;
      }
      return defer_1.defer(function() {
        return condition() ? trueResult : falseResult;
      });
    }
    exports.iif = iif;
  }
});

// node_modules/rxjs/internal/util/isNumeric.js
var require_isNumeric = __commonJS({
  "node_modules/rxjs/internal/util/isNumeric.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isArray_1 = require_isArray();
    function isNumeric(val) {
      return !isArray_1.isArray(val) && val - parseFloat(val) + 1 >= 0;
    }
    exports.isNumeric = isNumeric;
  }
});

// node_modules/rxjs/internal/observable/interval.js
var require_interval = __commonJS({
  "node_modules/rxjs/internal/observable/interval.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var async_1 = require_async();
    var isNumeric_1 = require_isNumeric();
    function interval(period, scheduler) {
      if (period === void 0) {
        period = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.async;
      }
      if (!isNumeric_1.isNumeric(period) || period < 0) {
        period = 0;
      }
      if (!scheduler || typeof scheduler.schedule !== "function") {
        scheduler = async_1.async;
      }
      return new Observable_1.Observable(function(subscriber) {
        subscriber.add(scheduler.schedule(dispatch, period, { subscriber, counter: 0, period }));
        return subscriber;
      });
    }
    exports.interval = interval;
    function dispatch(state) {
      var subscriber = state.subscriber, counter = state.counter, period = state.period;
      subscriber.next(counter);
      this.schedule({ subscriber, counter: counter + 1, period }, period);
    }
  }
});

// node_modules/rxjs/internal/observable/merge.js
var require_merge = __commonJS({
  "node_modules/rxjs/internal/observable/merge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var isScheduler_1 = require_isScheduler();
    var mergeAll_1 = require_mergeAll();
    var fromArray_1 = require_fromArray();
    function merge() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
      }
      var concurrent = Number.POSITIVE_INFINITY;
      var scheduler = null;
      var last = observables[observables.length - 1];
      if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === "number") {
          concurrent = observables.pop();
        }
      } else if (typeof last === "number") {
        concurrent = observables.pop();
      }
      if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
        return observables[0];
      }
      return mergeAll_1.mergeAll(concurrent)(fromArray_1.fromArray(observables, scheduler));
    }
    exports.merge = merge;
  }
});

// node_modules/rxjs/internal/observable/never.js
var require_never = __commonJS({
  "node_modules/rxjs/internal/observable/never.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var noop_1 = require_noop();
    exports.NEVER = new Observable_1.Observable(noop_1.noop);
    function never() {
      return exports.NEVER;
    }
    exports.never = never;
  }
});

// node_modules/rxjs/internal/observable/onErrorResumeNext.js
var require_onErrorResumeNext = __commonJS({
  "node_modules/rxjs/internal/observable/onErrorResumeNext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var from_1 = require_from();
    var isArray_1 = require_isArray();
    var empty_1 = require_empty();
    function onErrorResumeNext() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      if (sources.length === 0) {
        return empty_1.EMPTY;
      }
      var first = sources[0], remainder = sources.slice(1);
      if (sources.length === 1 && isArray_1.isArray(first)) {
        return onErrorResumeNext.apply(void 0, first);
      }
      return new Observable_1.Observable(function(subscriber) {
        var subNext = function() {
          return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber));
        };
        return from_1.from(first).subscribe({
          next: function(value) {
            subscriber.next(value);
          },
          error: subNext,
          complete: subNext
        });
      });
    }
    exports.onErrorResumeNext = onErrorResumeNext;
  }
});

// node_modules/rxjs/internal/observable/pairs.js
var require_pairs = __commonJS({
  "node_modules/rxjs/internal/observable/pairs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    function pairs(obj, scheduler) {
      if (!scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          var keys = Object.keys(obj);
          for (var i = 0; i < keys.length && !subscriber.closed; i++) {
            var key = keys[i];
            if (obj.hasOwnProperty(key)) {
              subscriber.next([key, obj[key]]);
            }
          }
          subscriber.complete();
        });
      } else {
        return new Observable_1.Observable(function(subscriber) {
          var keys = Object.keys(obj);
          var subscription = new Subscription_1.Subscription();
          subscription.add(scheduler.schedule(dispatch, 0, { keys, index: 0, subscriber, subscription, obj }));
          return subscription;
        });
      }
    }
    exports.pairs = pairs;
    function dispatch(state) {
      var keys = state.keys, index = state.index, subscriber = state.subscriber, subscription = state.subscription, obj = state.obj;
      if (!subscriber.closed) {
        if (index < keys.length) {
          var key = keys[index];
          subscriber.next([key, obj[key]]);
          subscription.add(this.schedule({ keys, index: index + 1, subscriber, subscription, obj }));
        } else {
          subscriber.complete();
        }
      }
    }
    exports.dispatch = dispatch;
  }
});

// node_modules/rxjs/internal/util/not.js
var require_not = __commonJS({
  "node_modules/rxjs/internal/util/not.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function not(pred, thisArg) {
      function notPred() {
        return !notPred.pred.apply(notPred.thisArg, arguments);
      }
      notPred.pred = pred;
      notPred.thisArg = thisArg;
      return notPred;
    }
    exports.not = not;
  }
});

// node_modules/rxjs/internal/operators/filter.js
var require_filter = __commonJS({
  "node_modules/rxjs/internal/operators/filter.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscriber_1 = require_Subscriber();
    function filter(predicate, thisArg) {
      return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
      };
    }
    exports.filter = filter;
    var FilterOperator = function() {
      function FilterOperator2(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
      }
      FilterOperator2.prototype.call = function(subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
      };
      return FilterOperator2;
    }();
    var FilterSubscriber = function(_super) {
      __extends(FilterSubscriber2, _super);
      function FilterSubscriber2(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
      }
      FilterSubscriber2.prototype._next = function(value) {
        var result;
        try {
          result = this.predicate.call(this.thisArg, value, this.count++);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        if (result) {
          this.destination.next(value);
        }
      };
      return FilterSubscriber2;
    }(Subscriber_1.Subscriber);
  }
});

// node_modules/rxjs/internal/observable/partition.js
var require_partition = __commonJS({
  "node_modules/rxjs/internal/observable/partition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var not_1 = require_not();
    var subscribeTo_1 = require_subscribeTo();
    var filter_1 = require_filter();
    var Observable_1 = require_Observable();
    function partition(source, predicate, thisArg) {
      return [
        filter_1.filter(predicate, thisArg)(new Observable_1.Observable(subscribeTo_1.subscribeTo(source))),
        filter_1.filter(not_1.not(predicate, thisArg))(new Observable_1.Observable(subscribeTo_1.subscribeTo(source)))
      ];
    }
    exports.partition = partition;
  }
});

// node_modules/rxjs/internal/observable/race.js
var require_race = __commonJS({
  "node_modules/rxjs/internal/observable/race.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isArray_1 = require_isArray();
    var fromArray_1 = require_fromArray();
    var OuterSubscriber_1 = require_OuterSubscriber();
    var subscribeToResult_1 = require_subscribeToResult();
    function race() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
      }
      if (observables.length === 1) {
        if (isArray_1.isArray(observables[0])) {
          observables = observables[0];
        } else {
          return observables[0];
        }
      }
      return fromArray_1.fromArray(observables, void 0).lift(new RaceOperator());
    }
    exports.race = race;
    var RaceOperator = function() {
      function RaceOperator2() {
      }
      RaceOperator2.prototype.call = function(subscriber, source) {
        return source.subscribe(new RaceSubscriber(subscriber));
      };
      return RaceOperator2;
    }();
    exports.RaceOperator = RaceOperator;
    var RaceSubscriber = function(_super) {
      __extends(RaceSubscriber2, _super);
      function RaceSubscriber2(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
      }
      RaceSubscriber2.prototype._next = function(observable) {
        this.observables.push(observable);
      };
      RaceSubscriber2.prototype._complete = function() {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
          this.destination.complete();
        } else {
          for (var i = 0; i < len && !this.hasFirst; i++) {
            var observable = observables[i];
            var subscription = subscribeToResult_1.subscribeToResult(this, observable, void 0, i);
            if (this.subscriptions) {
              this.subscriptions.push(subscription);
            }
            this.add(subscription);
          }
          this.observables = null;
        }
      };
      RaceSubscriber2.prototype.notifyNext = function(_outerValue, innerValue, outerIndex) {
        if (!this.hasFirst) {
          this.hasFirst = true;
          for (var i = 0; i < this.subscriptions.length; i++) {
            if (i !== outerIndex) {
              var subscription = this.subscriptions[i];
              subscription.unsubscribe();
              this.remove(subscription);
            }
          }
          this.subscriptions = null;
        }
        this.destination.next(innerValue);
      };
      return RaceSubscriber2;
    }(OuterSubscriber_1.OuterSubscriber);
    exports.RaceSubscriber = RaceSubscriber;
  }
});

// node_modules/rxjs/internal/observable/range.js
var require_range = __commonJS({
  "node_modules/rxjs/internal/observable/range.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    function range(start, count, scheduler) {
      if (start === void 0) {
        start = 0;
      }
      return new Observable_1.Observable(function(subscriber) {
        if (count === void 0) {
          count = start;
          start = 0;
        }
        var index = 0;
        var current = start;
        if (scheduler) {
          return scheduler.schedule(dispatch, 0, {
            index,
            count,
            start,
            subscriber
          });
        } else {
          do {
            if (index++ >= count) {
              subscriber.complete();
              break;
            }
            subscriber.next(current++);
            if (subscriber.closed) {
              break;
            }
          } while (true);
        }
        return void 0;
      });
    }
    exports.range = range;
    function dispatch(state) {
      var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
      if (index >= count) {
        subscriber.complete();
        return;
      }
      subscriber.next(start);
      if (subscriber.closed) {
        return;
      }
      state.index = index + 1;
      state.start = start + 1;
      this.schedule(state);
    }
    exports.dispatch = dispatch;
  }
});

// node_modules/rxjs/internal/observable/timer.js
var require_timer = __commonJS({
  "node_modules/rxjs/internal/observable/timer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var async_1 = require_async();
    var isNumeric_1 = require_isNumeric();
    var isScheduler_1 = require_isScheduler();
    function timer(dueTime, periodOrScheduler, scheduler) {
      if (dueTime === void 0) {
        dueTime = 0;
      }
      var period = -1;
      if (isNumeric_1.isNumeric(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
      } else if (isScheduler_1.isScheduler(periodOrScheduler)) {
        scheduler = periodOrScheduler;
      }
      if (!isScheduler_1.isScheduler(scheduler)) {
        scheduler = async_1.async;
      }
      return new Observable_1.Observable(function(subscriber) {
        var due = isNumeric_1.isNumeric(dueTime) ? dueTime : +dueTime - scheduler.now();
        return scheduler.schedule(dispatch, due, {
          index: 0,
          period,
          subscriber
        });
      });
    }
    exports.timer = timer;
    function dispatch(state) {
      var index = state.index, period = state.period, subscriber = state.subscriber;
      subscriber.next(index);
      if (subscriber.closed) {
        return;
      } else if (period === -1) {
        return subscriber.complete();
      }
      state.index = index + 1;
      this.schedule(state, period);
    }
  }
});

// node_modules/rxjs/internal/observable/using.js
var require_using = __commonJS({
  "node_modules/rxjs/internal/observable/using.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    var from_1 = require_from();
    var empty_1 = require_empty();
    function using(resourceFactory, observableFactory) {
      return new Observable_1.Observable(function(subscriber) {
        var resource;
        try {
          resource = resourceFactory();
        } catch (err) {
          subscriber.error(err);
          return void 0;
        }
        var result;
        try {
          result = observableFactory(resource);
        } catch (err) {
          subscriber.error(err);
          return void 0;
        }
        var source = result ? from_1.from(result) : empty_1.EMPTY;
        var subscription = source.subscribe(subscriber);
        return function() {
          subscription.unsubscribe();
          if (resource) {
            resource.unsubscribe();
          }
        };
      });
    }
    exports.using = using;
  }
});

// node_modules/rxjs/internal/observable/zip.js
var require_zip = __commonJS({
  "node_modules/rxjs/internal/observable/zip.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var fromArray_1 = require_fromArray();
    var isArray_1 = require_isArray();
    var Subscriber_1 = require_Subscriber();
    var iterator_1 = require_iterator();
    var innerSubscribe_1 = require_innerSubscribe();
    function zip() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
      }
      var resultSelector = observables[observables.length - 1];
      if (typeof resultSelector === "function") {
        observables.pop();
      }
      return fromArray_1.fromArray(observables, void 0).lift(new ZipOperator(resultSelector));
    }
    exports.zip = zip;
    var ZipOperator = function() {
      function ZipOperator2(resultSelector) {
        this.resultSelector = resultSelector;
      }
      ZipOperator2.prototype.call = function(subscriber, source) {
        return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector));
      };
      return ZipOperator2;
    }();
    exports.ZipOperator = ZipOperator;
    var ZipSubscriber = function(_super) {
      __extends(ZipSubscriber2, _super);
      function ZipSubscriber2(destination, resultSelector, values) {
        if (values === void 0) {
          values = /* @__PURE__ */ Object.create(null);
        }
        var _this = _super.call(this, destination) || this;
        _this.resultSelector = resultSelector;
        _this.iterators = [];
        _this.active = 0;
        _this.resultSelector = typeof resultSelector === "function" ? resultSelector : void 0;
        return _this;
      }
      ZipSubscriber2.prototype._next = function(value) {
        var iterators = this.iterators;
        if (isArray_1.isArray(value)) {
          iterators.push(new StaticArrayIterator(value));
        } else if (typeof value[iterator_1.iterator] === "function") {
          iterators.push(new StaticIterator(value[iterator_1.iterator]()));
        } else {
          iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
      };
      ZipSubscriber2.prototype._complete = function() {
        var iterators = this.iterators;
        var len = iterators.length;
        this.unsubscribe();
        if (len === 0) {
          this.destination.complete();
          return;
        }
        this.active = len;
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          if (iterator.stillUnsubscribed) {
            var destination = this.destination;
            destination.add(iterator.subscribe());
          } else {
            this.active--;
          }
        }
      };
      ZipSubscriber2.prototype.notifyInactive = function() {
        this.active--;
        if (this.active === 0) {
          this.destination.complete();
        }
      };
      ZipSubscriber2.prototype.checkIterators = function() {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          if (typeof iterator.hasValue === "function" && !iterator.hasValue()) {
            return;
          }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
          var iterator = iterators[i];
          var result = iterator.next();
          if (iterator.hasCompleted()) {
            shouldComplete = true;
          }
          if (result.done) {
            destination.complete();
            return;
          }
          args.push(result.value);
        }
        if (this.resultSelector) {
          this._tryresultSelector(args);
        } else {
          destination.next(args);
        }
        if (shouldComplete) {
          destination.complete();
        }
      };
      ZipSubscriber2.prototype._tryresultSelector = function(args) {
        var result;
        try {
          result = this.resultSelector.apply(this, args);
        } catch (err) {
          this.destination.error(err);
          return;
        }
        this.destination.next(result);
      };
      return ZipSubscriber2;
    }(Subscriber_1.Subscriber);
    exports.ZipSubscriber = ZipSubscriber;
    var StaticIterator = function() {
      function StaticIterator2(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
      }
      StaticIterator2.prototype.hasValue = function() {
        return true;
      };
      StaticIterator2.prototype.next = function() {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
      };
      StaticIterator2.prototype.hasCompleted = function() {
        var nextResult = this.nextResult;
        return Boolean(nextResult && nextResult.done);
      };
      return StaticIterator2;
    }();
    var StaticArrayIterator = function() {
      function StaticArrayIterator2(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
      }
      StaticArrayIterator2.prototype[iterator_1.iterator] = function() {
        return this;
      };
      StaticArrayIterator2.prototype.next = function(value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
      };
      StaticArrayIterator2.prototype.hasValue = function() {
        return this.array.length > this.index;
      };
      StaticArrayIterator2.prototype.hasCompleted = function() {
        return this.array.length === this.index;
      };
      return StaticArrayIterator2;
    }();
    var ZipBufferIterator = function(_super) {
      __extends(ZipBufferIterator2, _super);
      function ZipBufferIterator2(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
      }
      ZipBufferIterator2.prototype[iterator_1.iterator] = function() {
        return this;
      };
      ZipBufferIterator2.prototype.next = function() {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
          return { value: null, done: true };
        } else {
          return { value: buffer.shift(), done: false };
        }
      };
      ZipBufferIterator2.prototype.hasValue = function() {
        return this.buffer.length > 0;
      };
      ZipBufferIterator2.prototype.hasCompleted = function() {
        return this.buffer.length === 0 && this.isComplete;
      };
      ZipBufferIterator2.prototype.notifyComplete = function() {
        if (this.buffer.length > 0) {
          this.isComplete = true;
          this.parent.notifyInactive();
        } else {
          this.destination.complete();
        }
      };
      ZipBufferIterator2.prototype.notifyNext = function(innerValue) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
      };
      ZipBufferIterator2.prototype.subscribe = function() {
        return innerSubscribe_1.innerSubscribe(this.observable, new innerSubscribe_1.SimpleInnerSubscriber(this));
      };
      return ZipBufferIterator2;
    }(innerSubscribe_1.SimpleOuterSubscriber);
  }
});

// node_modules/rxjs/index.js
var require_rxjs = __commonJS({
  "node_modules/rxjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = require_Observable();
    exports.Observable = Observable_1.Observable;
    var ConnectableObservable_1 = require_ConnectableObservable();
    exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
    var groupBy_1 = require_groupBy();
    exports.GroupedObservable = groupBy_1.GroupedObservable;
    var observable_1 = require_observable();
    exports.observable = observable_1.observable;
    var Subject_1 = require_Subject();
    exports.Subject = Subject_1.Subject;
    var BehaviorSubject_1 = require_BehaviorSubject();
    exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
    var ReplaySubject_1 = require_ReplaySubject();
    exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
    var AsyncSubject_1 = require_AsyncSubject();
    exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
    var asap_1 = require_asap();
    exports.asap = asap_1.asap;
    exports.asapScheduler = asap_1.asapScheduler;
    var async_1 = require_async();
    exports.async = async_1.async;
    exports.asyncScheduler = async_1.asyncScheduler;
    var queue_1 = require_queue();
    exports.queue = queue_1.queue;
    exports.queueScheduler = queue_1.queueScheduler;
    var animationFrame_1 = require_animationFrame();
    exports.animationFrame = animationFrame_1.animationFrame;
    exports.animationFrameScheduler = animationFrame_1.animationFrameScheduler;
    var VirtualTimeScheduler_1 = require_VirtualTimeScheduler();
    exports.VirtualTimeScheduler = VirtualTimeScheduler_1.VirtualTimeScheduler;
    exports.VirtualAction = VirtualTimeScheduler_1.VirtualAction;
    var Scheduler_1 = require_Scheduler();
    exports.Scheduler = Scheduler_1.Scheduler;
    var Subscription_1 = require_Subscription();
    exports.Subscription = Subscription_1.Subscription;
    var Subscriber_1 = require_Subscriber();
    exports.Subscriber = Subscriber_1.Subscriber;
    var Notification_1 = require_Notification();
    exports.Notification = Notification_1.Notification;
    exports.NotificationKind = Notification_1.NotificationKind;
    var pipe_1 = require_pipe();
    exports.pipe = pipe_1.pipe;
    var noop_1 = require_noop();
    exports.noop = noop_1.noop;
    var identity_1 = require_identity();
    exports.identity = identity_1.identity;
    var isObservable_1 = require_isObservable();
    exports.isObservable = isObservable_1.isObservable;
    var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
    exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
    var EmptyError_1 = require_EmptyError();
    exports.EmptyError = EmptyError_1.EmptyError;
    var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
    exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
    var UnsubscriptionError_1 = require_UnsubscriptionError();
    exports.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
    var TimeoutError_1 = require_TimeoutError();
    exports.TimeoutError = TimeoutError_1.TimeoutError;
    var bindCallback_1 = require_bindCallback();
    exports.bindCallback = bindCallback_1.bindCallback;
    var bindNodeCallback_1 = require_bindNodeCallback();
    exports.bindNodeCallback = bindNodeCallback_1.bindNodeCallback;
    var combineLatest_1 = require_combineLatest();
    exports.combineLatest = combineLatest_1.combineLatest;
    var concat_1 = require_concat();
    exports.concat = concat_1.concat;
    var defer_1 = require_defer();
    exports.defer = defer_1.defer;
    var empty_1 = require_empty();
    exports.empty = empty_1.empty;
    var forkJoin_1 = require_forkJoin();
    exports.forkJoin = forkJoin_1.forkJoin;
    var from_1 = require_from();
    exports.from = from_1.from;
    var fromEvent_1 = require_fromEvent();
    exports.fromEvent = fromEvent_1.fromEvent;
    var fromEventPattern_1 = require_fromEventPattern();
    exports.fromEventPattern = fromEventPattern_1.fromEventPattern;
    var generate_1 = require_generate();
    exports.generate = generate_1.generate;
    var iif_1 = require_iif();
    exports.iif = iif_1.iif;
    var interval_1 = require_interval();
    exports.interval = interval_1.interval;
    var merge_1 = require_merge();
    exports.merge = merge_1.merge;
    var never_1 = require_never();
    exports.never = never_1.never;
    var of_1 = require_of();
    exports.of = of_1.of;
    var onErrorResumeNext_1 = require_onErrorResumeNext();
    exports.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNext;
    var pairs_1 = require_pairs();
    exports.pairs = pairs_1.pairs;
    var partition_1 = require_partition();
    exports.partition = partition_1.partition;
    var race_1 = require_race();
    exports.race = race_1.race;
    var range_1 = require_range();
    exports.range = range_1.range;
    var throwError_1 = require_throwError();
    exports.throwError = throwError_1.throwError;
    var timer_1 = require_timer();
    exports.timer = timer_1.timer;
    var using_1 = require_using();
    exports.using = using_1.using;
    var zip_1 = require_zip();
    exports.zip = zip_1.zip;
    var scheduled_1 = require_scheduled();
    exports.scheduled = scheduled_1.scheduled;
    var empty_2 = require_empty();
    exports.EMPTY = empty_2.EMPTY;
    var never_2 = require_never();
    exports.NEVER = never_2.NEVER;
    var config_1 = require_config();
    exports.config = config_1.config;
  }
});

// node_modules/gl-matrix/cjs/common.js
var require_common = __commonJS({
  "node_modules/gl-matrix/cjs/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setMatrixArrayType = setMatrixArrayType;
    exports.toRadian = toRadian;
    exports.equals = equals;
    exports.RANDOM = exports.ARRAY_TYPE = exports.EPSILON = void 0;
    var EPSILON = 1e-6;
    exports.EPSILON = EPSILON;
    var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
    exports.ARRAY_TYPE = ARRAY_TYPE;
    var RANDOM = Math.random;
    exports.RANDOM = RANDOM;
    function setMatrixArrayType(type) {
      exports.ARRAY_TYPE = ARRAY_TYPE = type;
    }
    var degree = Math.PI / 180;
    function toRadian(a) {
      return a * degree;
    }
    function equals(a, b) {
      return Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
    }
    if (!Math.hypot)
      Math.hypot = function() {
        var y = 0, i = arguments.length;
        while (i--) {
          y += arguments[i] * arguments[i];
        }
        return Math.sqrt(y);
      };
  }
});

// node_modules/gl-matrix/cjs/mat2.js
var require_mat2 = __commonJS({
  "node_modules/gl-matrix/cjs/mat2.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.copy = copy;
    exports.identity = identity;
    exports.fromValues = fromValues;
    exports.set = set;
    exports.transpose = transpose2;
    exports.invert = invert;
    exports.adjoint = adjoint;
    exports.determinant = determinant;
    exports.multiply = multiply;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.str = str;
    exports.frob = frob;
    exports.LDU = LDU;
    exports.add = add;
    exports.subtract = subtract;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.sub = exports.mul = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
      }
      out[0] = 1;
      out[3] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    }
    function fromValues(m00, m01, m10, m11) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = m00;
      out[1] = m01;
      out[2] = m10;
      out[3] = m11;
      return out;
    }
    function set(out, m00, m01, m10, m11) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m10;
      out[3] = m11;
      return out;
    }
    function transpose2(out, a) {
      if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
      } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
      }
      return out;
    }
    function invert(out, a) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var det = a0 * a3 - a2 * a1;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = a3 * det;
      out[1] = -a1 * det;
      out[2] = -a2 * det;
      out[3] = a0 * det;
      return out;
    }
    function adjoint(out, a) {
      var a0 = a[0];
      out[0] = a[3];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a0;
      return out;
    }
    function determinant(a) {
      return a[0] * a[3] - a[2] * a[1];
    }
    function multiply(out, a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = a0 * b0 + a2 * b1;
      out[1] = a1 * b0 + a3 * b1;
      out[2] = a0 * b2 + a2 * b3;
      out[3] = a1 * b2 + a3 * b3;
      return out;
    }
    function rotate(out, a, rad) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = a0 * c + a2 * s;
      out[1] = a1 * c + a3 * s;
      out[2] = a0 * -s + a2 * c;
      out[3] = a1 * -s + a3 * c;
      return out;
    }
    function scale(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var v0 = v[0], v1 = v[1];
      out[0] = a0 * v0;
      out[1] = a1 * v0;
      out[2] = a2 * v1;
      out[3] = a3 * v1;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = -s;
      out[3] = c;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = v[1];
      return out;
    }
    function str(a) {
      return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3]);
    }
    function LDU(L, D, U, a) {
      L[2] = a[2] / a[0];
      U[0] = a[0];
      U[1] = a[1];
      U[3] = a[3] - L[2] * U[1];
      return [L, D, U];
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      return out;
    }
    var mul = multiply;
    exports.mul = mul;
    var sub = subtract;
    exports.sub = sub;
  }
});

// node_modules/gl-matrix/cjs/mat2d.js
var require_mat2d = __commonJS({
  "node_modules/gl-matrix/cjs/mat2d.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.copy = copy;
    exports.identity = identity;
    exports.fromValues = fromValues;
    exports.set = set;
    exports.invert = invert;
    exports.determinant = determinant;
    exports.multiply = multiply;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.translate = translate;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.fromTranslation = fromTranslation;
    exports.str = str;
    exports.frob = frob;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.sub = exports.mul = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(6);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[4] = 0;
        out[5] = 0;
      }
      out[0] = 1;
      out[3] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(6);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromValues(a, b, c, d, tx, ty) {
      var out = new glMatrix.ARRAY_TYPE(6);
      out[0] = a;
      out[1] = b;
      out[2] = c;
      out[3] = d;
      out[4] = tx;
      out[5] = ty;
      return out;
    }
    function set(out, a, b, c, d, tx, ty) {
      out[0] = a;
      out[1] = b;
      out[2] = c;
      out[3] = d;
      out[4] = tx;
      out[5] = ty;
      return out;
    }
    function invert(out, a) {
      var aa = a[0], ab = a[1], ac = a[2], ad = a[3];
      var atx = a[4], aty = a[5];
      var det = aa * ad - ab * ac;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = ad * det;
      out[1] = -ab * det;
      out[2] = -ac * det;
      out[3] = aa * det;
      out[4] = (ac * aty - ad * atx) * det;
      out[5] = (ab * atx - aa * aty) * det;
      return out;
    }
    function determinant(a) {
      return a[0] * a[3] - a[1] * a[2];
    }
    function multiply(out, a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
      out[0] = a0 * b0 + a2 * b1;
      out[1] = a1 * b0 + a3 * b1;
      out[2] = a0 * b2 + a2 * b3;
      out[3] = a1 * b2 + a3 * b3;
      out[4] = a0 * b4 + a2 * b5 + a4;
      out[5] = a1 * b4 + a3 * b5 + a5;
      return out;
    }
    function rotate(out, a, rad) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = a0 * c + a2 * s;
      out[1] = a1 * c + a3 * s;
      out[2] = a0 * -s + a2 * c;
      out[3] = a1 * -s + a3 * c;
      out[4] = a4;
      out[5] = a5;
      return out;
    }
    function scale(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var v0 = v[0], v1 = v[1];
      out[0] = a0 * v0;
      out[1] = a1 * v0;
      out[2] = a2 * v1;
      out[3] = a3 * v1;
      out[4] = a4;
      out[5] = a5;
      return out;
    }
    function translate(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var v0 = v[0], v1 = v[1];
      out[0] = a0;
      out[1] = a1;
      out[2] = a2;
      out[3] = a3;
      out[4] = a0 * v0 + a2 * v1 + a4;
      out[5] = a1 * v0 + a3 * v1 + a5;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = -s;
      out[3] = c;
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = v[1];
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = v[0];
      out[5] = v[1];
      return out;
    }
    function str(a) {
      return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
    }
    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5));
    }
    var mul = multiply;
    exports.mul = mul;
    var sub = subtract;
    exports.sub = sub;
  }
});

// node_modules/gl-matrix/cjs/mat3.js
var require_mat3 = __commonJS({
  "node_modules/gl-matrix/cjs/mat3.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.fromMat4 = fromMat4;
    exports.clone = clone;
    exports.copy = copy;
    exports.fromValues = fromValues;
    exports.set = set;
    exports.identity = identity;
    exports.transpose = transpose2;
    exports.invert = invert;
    exports.adjoint = adjoint;
    exports.determinant = determinant;
    exports.multiply = multiply;
    exports.translate = translate;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.fromTranslation = fromTranslation;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.fromMat2d = fromMat2d;
    exports.fromQuat = fromQuat;
    exports.normalFromMat4 = normalFromMat4;
    exports.projection = projection;
    exports.str = str;
    exports.frob = frob;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.sub = exports.mul = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(9);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
      }
      out[0] = 1;
      out[4] = 1;
      out[8] = 1;
      return out;
    }
    function fromMat4(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[4];
      out[4] = a[5];
      out[5] = a[6];
      out[6] = a[8];
      out[7] = a[9];
      out[8] = a[10];
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(9);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      var out = new glMatrix.ARRAY_TYPE(9);
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m10;
      out[4] = m11;
      out[5] = m12;
      out[6] = m20;
      out[7] = m21;
      out[8] = m22;
      return out;
    }
    function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m10;
      out[4] = m11;
      out[5] = m12;
      out[6] = m20;
      out[7] = m21;
      out[8] = m22;
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 1;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function transpose2(out, a) {
      if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
      } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
      }
      return out;
    }
    function invert(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b01 = a22 * a11 - a12 * a21;
      var b11 = -a22 * a10 + a12 * a20;
      var b21 = a21 * a10 - a11 * a20;
      var det = a00 * b01 + a01 * b11 + a02 * b21;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = b01 * det;
      out[1] = (-a22 * a01 + a02 * a21) * det;
      out[2] = (a12 * a01 - a02 * a11) * det;
      out[3] = b11 * det;
      out[4] = (a22 * a00 - a02 * a20) * det;
      out[5] = (-a12 * a00 + a02 * a10) * det;
      out[6] = b21 * det;
      out[7] = (-a21 * a00 + a01 * a20) * det;
      out[8] = (a11 * a00 - a01 * a10) * det;
      return out;
    }
    function adjoint(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      out[0] = a11 * a22 - a12 * a21;
      out[1] = a02 * a21 - a01 * a22;
      out[2] = a01 * a12 - a02 * a11;
      out[3] = a12 * a20 - a10 * a22;
      out[4] = a00 * a22 - a02 * a20;
      out[5] = a02 * a10 - a00 * a12;
      out[6] = a10 * a21 - a11 * a20;
      out[7] = a01 * a20 - a00 * a21;
      out[8] = a00 * a11 - a01 * a10;
      return out;
    }
    function determinant(a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }
    function multiply(out, a, b) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b00 = b[0], b01 = b[1], b02 = b[2];
      var b10 = b[3], b11 = b[4], b12 = b[5];
      var b20 = b[6], b21 = b[7], b22 = b[8];
      out[0] = b00 * a00 + b01 * a10 + b02 * a20;
      out[1] = b00 * a01 + b01 * a11 + b02 * a21;
      out[2] = b00 * a02 + b01 * a12 + b02 * a22;
      out[3] = b10 * a00 + b11 * a10 + b12 * a20;
      out[4] = b10 * a01 + b11 * a11 + b12 * a21;
      out[5] = b10 * a02 + b11 * a12 + b12 * a22;
      out[6] = b20 * a00 + b21 * a10 + b22 * a20;
      out[7] = b20 * a01 + b21 * a11 + b22 * a21;
      out[8] = b20 * a02 + b21 * a12 + b22 * a22;
      return out;
    }
    function translate(out, a, v) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a10;
      out[4] = a11;
      out[5] = a12;
      out[6] = x * a00 + y * a10 + a20;
      out[7] = x * a01 + y * a11 + a21;
      out[8] = x * a02 + y * a12 + a22;
      return out;
    }
    function rotate(out, a, rad) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c * a00 + s * a10;
      out[1] = c * a01 + s * a11;
      out[2] = c * a02 + s * a12;
      out[3] = c * a10 - s * a00;
      out[4] = c * a11 - s * a01;
      out[5] = c * a12 - s * a02;
      out[6] = a20;
      out[7] = a21;
      out[8] = a22;
      return out;
    }
    function scale(out, a, v) {
      var x = v[0], y = v[1];
      out[0] = x * a[0];
      out[1] = x * a[1];
      out[2] = x * a[2];
      out[3] = y * a[3];
      out[4] = y * a[4];
      out[5] = y * a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 1;
      out[5] = 0;
      out[6] = v[0];
      out[7] = v[1];
      out[8] = 1;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = 0;
      out[3] = -s;
      out[4] = c;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = v[1];
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function fromMat2d(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = 0;
      out[3] = a[2];
      out[4] = a[3];
      out[5] = 0;
      out[6] = a[4];
      out[7] = a[5];
      out[8] = 1;
      return out;
    }
    function fromQuat(out, q) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var yx = y * x2;
      var yy = y * y2;
      var zx = z * x2;
      var zy = z * y2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - yy - zz;
      out[3] = yx - wz;
      out[6] = zx + wy;
      out[1] = yx + wz;
      out[4] = 1 - xx - zz;
      out[7] = zy - wx;
      out[2] = zx - wy;
      out[5] = zy + wx;
      out[8] = 1 - xx - yy;
      return out;
    }
    function normalFromMat4(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      return out;
    }
    function projection(out, width, height) {
      out[0] = 2 / width;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = -2 / height;
      out[5] = 0;
      out[6] = -1;
      out[7] = 1;
      out[8] = 1;
      return out;
    }
    function str(a) {
      return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
    }
    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      out[8] = a[8] + b[8];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      out[6] = a[6] - b[6];
      out[7] = a[7] - b[7];
      out[8] = a[8] - b[8];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      out[8] = a[8] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      out[6] = a[6] + b[6] * scale2;
      out[7] = a[7] + b[7] * scale2;
      out[8] = a[8] + b[8] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
    }
    var mul = multiply;
    exports.mul = mul;
    var sub = subtract;
    exports.sub = sub;
  }
});

// node_modules/gl-matrix/cjs/mat4.js
var require_mat4 = __commonJS({
  "node_modules/gl-matrix/cjs/mat4.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.copy = copy;
    exports.fromValues = fromValues;
    exports.set = set;
    exports.identity = identity;
    exports.transpose = transpose2;
    exports.invert = invert;
    exports.adjoint = adjoint;
    exports.determinant = determinant;
    exports.multiply = multiply;
    exports.translate = translate;
    exports.scale = scale;
    exports.rotate = rotate;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.fromTranslation = fromTranslation;
    exports.fromScaling = fromScaling;
    exports.fromRotation = fromRotation;
    exports.fromXRotation = fromXRotation;
    exports.fromYRotation = fromYRotation;
    exports.fromZRotation = fromZRotation;
    exports.fromRotationTranslation = fromRotationTranslation;
    exports.fromQuat2 = fromQuat2;
    exports.getTranslation = getTranslation;
    exports.getScaling = getScaling;
    exports.getRotation = getRotation;
    exports.fromRotationTranslationScale = fromRotationTranslationScale;
    exports.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
    exports.fromQuat = fromQuat;
    exports.frustum = frustum;
    exports.perspectiveNO = perspectiveNO;
    exports.perspectiveZO = perspectiveZO;
    exports.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
    exports.orthoNO = orthoNO;
    exports.orthoZO = orthoZO;
    exports.lookAt = lookAt;
    exports.targetTo = targetTo;
    exports.str = str;
    exports.frob = frob;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.sub = exports.mul = exports.ortho = exports.perspective = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(16);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
      }
      out[0] = 1;
      out[5] = 1;
      out[10] = 1;
      out[15] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(16);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      var out = new glMatrix.ARRAY_TYPE(16);
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
    }
    function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function transpose2(out, a) {
      if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3];
        var a12 = a[6], a13 = a[7];
        var a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
      } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
      }
      return out;
    }
    function invert(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
      return out;
    }
    function adjoint(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
      out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
      out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
      out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
      out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
      out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
      out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
      out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
      out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
      out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
      out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
      out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
      out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
      out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
      out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
      out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
      return out;
    }
    function determinant(a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    function multiply(out, a, b) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[4];
      b1 = b[5];
      b2 = b[6];
      b3 = b[7];
      out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[8];
      b1 = b[9];
      b2 = b[10];
      b3 = b[11];
      out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[12];
      b1 = b[13];
      b2 = b[14];
      b3 = b[15];
      out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return out;
    }
    function translate(out, a, v) {
      var x = v[0], y = v[1], z = v[2];
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;
      if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
      } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
      }
      return out;
    }
    function scale(out, a, v) {
      var x = v[0], y = v[1], z = v[2];
      out[0] = a[0] * x;
      out[1] = a[1] * x;
      out[2] = a[2] * x;
      out[3] = a[3] * x;
      out[4] = a[4] * y;
      out[5] = a[5] * y;
      out[6] = a[6] * y;
      out[7] = a[7] * y;
      out[8] = a[8] * z;
      out[9] = a[9] * z;
      out[10] = a[10] * z;
      out[11] = a[11] * z;
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function rotate(out, a, rad, axis) {
      var x = axis[0], y = axis[1], z = axis[2];
      var len = Math.hypot(x, y, z);
      var s, c, t;
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;
      var b00, b01, b02;
      var b10, b11, b12;
      var b20, b21, b22;
      if (len < glMatrix.EPSILON) {
        return null;
      }
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      b00 = x * x * t + c;
      b01 = y * x * t + z * s;
      b02 = z * x * t - y * s;
      b10 = x * y * t - z * s;
      b11 = y * y * t + c;
      b12 = z * y * t + x * s;
      b20 = x * z * t + y * s;
      b21 = y * z * t - x * s;
      b22 = z * z * t + c;
      out[0] = a00 * b00 + a10 * b01 + a20 * b02;
      out[1] = a01 * b00 + a11 * b01 + a21 * b02;
      out[2] = a02 * b00 + a12 * b01 + a22 * b02;
      out[3] = a03 * b00 + a13 * b01 + a23 * b02;
      out[4] = a00 * b10 + a10 * b11 + a20 * b12;
      out[5] = a01 * b10 + a11 * b11 + a21 * b12;
      out[6] = a02 * b10 + a12 * b11 + a22 * b12;
      out[7] = a03 * b10 + a13 * b11 + a23 * b12;
      out[8] = a00 * b20 + a10 * b21 + a20 * b22;
      out[9] = a01 * b20 + a11 * b21 + a21 * b22;
      out[10] = a02 * b20 + a12 * b21 + a22 * b22;
      out[11] = a03 * b20 + a13 * b21 + a23 * b22;
      if (a !== out) {
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      return out;
    }
    function rotateX(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];
      if (a !== out) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[4] = a10 * c + a20 * s;
      out[5] = a11 * c + a21 * s;
      out[6] = a12 * c + a22 * s;
      out[7] = a13 * c + a23 * s;
      out[8] = a20 * c - a10 * s;
      out[9] = a21 * c - a11 * s;
      out[10] = a22 * c - a12 * s;
      out[11] = a23 * c - a13 * s;
      return out;
    }
    function rotateY(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];
      if (a !== out) {
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[0] = a00 * c - a20 * s;
      out[1] = a01 * c - a21 * s;
      out[2] = a02 * c - a22 * s;
      out[3] = a03 * c - a23 * s;
      out[8] = a00 * s + a20 * c;
      out[9] = a01 * s + a21 * c;
      out[10] = a02 * s + a22 * c;
      out[11] = a03 * s + a23 * c;
      return out;
    }
    function rotateZ(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];
      if (a !== out) {
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[0] = a00 * c + a10 * s;
      out[1] = a01 * c + a11 * s;
      out[2] = a02 * c + a12 * s;
      out[3] = a03 * c + a13 * s;
      out[4] = a10 * c - a00 * s;
      out[5] = a11 * c - a01 * s;
      out[6] = a12 * c - a02 * s;
      out[7] = a13 * c - a03 * s;
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = v[1];
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = v[2];
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromRotation(out, rad, axis) {
      var x = axis[0], y = axis[1], z = axis[2];
      var len = Math.hypot(x, y, z);
      var s, c, t;
      if (len < glMatrix.EPSILON) {
        return null;
      }
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;
      out[0] = x * x * t + c;
      out[1] = y * x * t + z * s;
      out[2] = z * x * t - y * s;
      out[3] = 0;
      out[4] = x * y * t - z * s;
      out[5] = y * y * t + c;
      out[6] = z * y * t + x * s;
      out[7] = 0;
      out[8] = x * z * t + y * s;
      out[9] = y * z * t - x * s;
      out[10] = z * z * t + c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromXRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = c;
      out[6] = s;
      out[7] = 0;
      out[8] = 0;
      out[9] = -s;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromYRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = 0;
      out[2] = -s;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = s;
      out[9] = 0;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromZRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = 0;
      out[3] = 0;
      out[4] = -s;
      out[5] = c;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromRotationTranslation(out, q, v) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - (yy + zz);
      out[1] = xy + wz;
      out[2] = xz - wy;
      out[3] = 0;
      out[4] = xy - wz;
      out[5] = 1 - (xx + zz);
      out[6] = yz + wx;
      out[7] = 0;
      out[8] = xz + wy;
      out[9] = yz - wx;
      out[10] = 1 - (xx + yy);
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromQuat2(out, a) {
      var translation = new glMatrix.ARRAY_TYPE(3);
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
      var magnitude = bx * bx + by * by + bz * bz + bw * bw;
      if (magnitude > 0) {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
      } else {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
      }
      fromRotationTranslation(out, a, translation);
      return out;
    }
    function getTranslation(out, mat) {
      out[0] = mat[12];
      out[1] = mat[13];
      out[2] = mat[14];
      return out;
    }
    function getScaling(out, mat) {
      var m11 = mat[0];
      var m12 = mat[1];
      var m13 = mat[2];
      var m21 = mat[4];
      var m22 = mat[5];
      var m23 = mat[6];
      var m31 = mat[8];
      var m32 = mat[9];
      var m33 = mat[10];
      out[0] = Math.hypot(m11, m12, m13);
      out[1] = Math.hypot(m21, m22, m23);
      out[2] = Math.hypot(m31, m32, m33);
      return out;
    }
    function getRotation(out, mat) {
      var scaling = new glMatrix.ARRAY_TYPE(3);
      getScaling(scaling, mat);
      var is1 = 1 / scaling[0];
      var is2 = 1 / scaling[1];
      var is3 = 1 / scaling[2];
      var sm11 = mat[0] * is1;
      var sm12 = mat[1] * is2;
      var sm13 = mat[2] * is3;
      var sm21 = mat[4] * is1;
      var sm22 = mat[5] * is2;
      var sm23 = mat[6] * is3;
      var sm31 = mat[8] * is1;
      var sm32 = mat[9] * is2;
      var sm33 = mat[10] * is3;
      var trace = sm11 + sm22 + sm33;
      var S = 0;
      if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out[3] = 0.25 * S;
        out[0] = (sm23 - sm32) / S;
        out[1] = (sm31 - sm13) / S;
        out[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out[3] = (sm23 - sm32) / S;
        out[0] = 0.25 * S;
        out[1] = (sm12 + sm21) / S;
        out[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out[3] = (sm31 - sm13) / S;
        out[0] = (sm12 + sm21) / S;
        out[1] = 0.25 * S;
        out[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out[3] = (sm12 - sm21) / S;
        out[0] = (sm31 + sm13) / S;
        out[1] = (sm23 + sm32) / S;
        out[2] = 0.25 * S;
      }
      return out;
    }
    function fromRotationTranslationScale(out, q, v, s) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      var sx = s[0];
      var sy = s[1];
      var sz = s[2];
      out[0] = (1 - (yy + zz)) * sx;
      out[1] = (xy + wz) * sx;
      out[2] = (xz - wy) * sx;
      out[3] = 0;
      out[4] = (xy - wz) * sy;
      out[5] = (1 - (xx + zz)) * sy;
      out[6] = (yz + wx) * sy;
      out[7] = 0;
      out[8] = (xz + wy) * sz;
      out[9] = (yz - wx) * sz;
      out[10] = (1 - (xx + yy)) * sz;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      var sx = s[0];
      var sy = s[1];
      var sz = s[2];
      var ox = o[0];
      var oy = o[1];
      var oz = o[2];
      var out0 = (1 - (yy + zz)) * sx;
      var out1 = (xy + wz) * sx;
      var out2 = (xz - wy) * sx;
      var out4 = (xy - wz) * sy;
      var out5 = (1 - (xx + zz)) * sy;
      var out6 = (yz + wx) * sy;
      var out8 = (xz + wy) * sz;
      var out9 = (yz - wx) * sz;
      var out10 = (1 - (xx + yy)) * sz;
      out[0] = out0;
      out[1] = out1;
      out[2] = out2;
      out[3] = 0;
      out[4] = out4;
      out[5] = out5;
      out[6] = out6;
      out[7] = 0;
      out[8] = out8;
      out[9] = out9;
      out[10] = out10;
      out[11] = 0;
      out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
      out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
      out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
      out[15] = 1;
      return out;
    }
    function fromQuat(out, q) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var yx = y * x2;
      var yy = y * y2;
      var zx = z * x2;
      var zy = z * y2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - yy - zz;
      out[1] = yx + wz;
      out[2] = zx - wy;
      out[3] = 0;
      out[4] = yx - wz;
      out[5] = 1 - xx - zz;
      out[6] = zy + wx;
      out[7] = 0;
      out[8] = zx + wy;
      out[9] = zy - wx;
      out[10] = 1 - xx - yy;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function frustum(out, left, right, bottom, top, near, far) {
      var rl = 1 / (right - left);
      var tb = 1 / (top - bottom);
      var nf = 1 / (near - far);
      out[0] = near * 2 * rl;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = near * 2 * tb;
      out[6] = 0;
      out[7] = 0;
      out[8] = (right + left) * rl;
      out[9] = (top + bottom) * tb;
      out[10] = (far + near) * nf;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = far * near * 2 * nf;
      out[15] = 0;
      return out;
    }
    function perspectiveNO(out, fovy, aspect, near, far) {
      var f = 1 / Math.tan(fovy / 2), nf;
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -2 * near;
      }
      return out;
    }
    var perspective = perspectiveNO;
    exports.perspective = perspective;
    function perspectiveZO(out, fovy, aspect, near, far) {
      var f = 1 / Math.tan(fovy / 2), nf;
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = far * nf;
        out[14] = far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -near;
      }
      return out;
    }
    function perspectiveFromFieldOfView(out, fov, near, far) {
      var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
      var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
      var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
      var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
      var xScale = 2 / (leftTan + rightTan);
      var yScale = 2 / (upTan + downTan);
      out[0] = xScale;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = yScale;
      out[6] = 0;
      out[7] = 0;
      out[8] = -((leftTan - rightTan) * xScale * 0.5);
      out[9] = (upTan - downTan) * yScale * 0.5;
      out[10] = far / (near - far);
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = far * near / (near - far);
      out[15] = 0;
      return out;
    }
    function orthoNO(out, left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 2 * nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = (far + near) * nf;
      out[15] = 1;
      return out;
    }
    var ortho = orthoNO;
    exports.ortho = ortho;
    function orthoZO(out, left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = near * nf;
      out[15] = 1;
      return out;
    }
    function lookAt(out, eye, center, up) {
      var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
      var eyex = eye[0];
      var eyey = eye[1];
      var eyez = eye[2];
      var upx = up[0];
      var upy = up[1];
      var upz = up[2];
      var centerx = center[0];
      var centery = center[1];
      var centerz = center[2];
      if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return identity(out);
      }
      z0 = eyex - centerx;
      z1 = eyey - centery;
      z2 = eyez - centerz;
      len = 1 / Math.hypot(z0, z1, z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;
      x0 = upy * z2 - upz * z1;
      x1 = upz * z0 - upx * z2;
      x2 = upx * z1 - upy * z0;
      len = Math.hypot(x0, x1, x2);
      if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
      } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;
      len = Math.hypot(y0, y1, y2);
      if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
      } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
      }
      out[0] = x0;
      out[1] = y0;
      out[2] = z0;
      out[3] = 0;
      out[4] = x1;
      out[5] = y1;
      out[6] = z1;
      out[7] = 0;
      out[8] = x2;
      out[9] = y2;
      out[10] = z2;
      out[11] = 0;
      out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      out[15] = 1;
      return out;
    }
    function targetTo(out, eye, target, up) {
      var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
      var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
      var len = z0 * z0 + z1 * z1 + z2 * z2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
      }
      var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
      len = x0 * x0 + x1 * x1 + x2 * x2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      out[0] = x0;
      out[1] = x1;
      out[2] = x2;
      out[3] = 0;
      out[4] = z1 * x2 - z2 * x1;
      out[5] = z2 * x0 - z0 * x2;
      out[6] = z0 * x1 - z1 * x0;
      out[7] = 0;
      out[8] = z0;
      out[9] = z1;
      out[10] = z2;
      out[11] = 0;
      out[12] = eyex;
      out[13] = eyey;
      out[14] = eyez;
      out[15] = 1;
      return out;
    }
    function str(a) {
      return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
    }
    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      out[8] = a[8] + b[8];
      out[9] = a[9] + b[9];
      out[10] = a[10] + b[10];
      out[11] = a[11] + b[11];
      out[12] = a[12] + b[12];
      out[13] = a[13] + b[13];
      out[14] = a[14] + b[14];
      out[15] = a[15] + b[15];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      out[6] = a[6] - b[6];
      out[7] = a[7] - b[7];
      out[8] = a[8] - b[8];
      out[9] = a[9] - b[9];
      out[10] = a[10] - b[10];
      out[11] = a[11] - b[11];
      out[12] = a[12] - b[12];
      out[13] = a[13] - b[13];
      out[14] = a[14] - b[14];
      out[15] = a[15] - b[15];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      out[8] = a[8] * b;
      out[9] = a[9] * b;
      out[10] = a[10] * b;
      out[11] = a[11] * b;
      out[12] = a[12] * b;
      out[13] = a[13] * b;
      out[14] = a[14] * b;
      out[15] = a[15] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      out[6] = a[6] + b[6] * scale2;
      out[7] = a[7] + b[7] * scale2;
      out[8] = a[8] + b[8] * scale2;
      out[9] = a[9] + b[9] * scale2;
      out[10] = a[10] + b[10] * scale2;
      out[11] = a[11] + b[11] * scale2;
      out[12] = a[12] + b[12] * scale2;
      out[13] = a[13] + b[13] * scale2;
      out[14] = a[14] + b[14] * scale2;
      out[15] = a[15] + b[15] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
      var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
      var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
      var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
      var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
    }
    var mul = multiply;
    exports.mul = mul;
    var sub = subtract;
    exports.sub = sub;
  }
});

// node_modules/gl-matrix/cjs/vec3.js
var require_vec3 = __commonJS({
  "node_modules/gl-matrix/cjs/vec3.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.length = length;
    exports.fromValues = fromValues;
    exports.copy = copy;
    exports.set = set;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiply = multiply;
    exports.divide = divide;
    exports.ceil = ceil;
    exports.floor = floor;
    exports.min = min;
    exports.max = max;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.distance = distance;
    exports.squaredDistance = squaredDistance;
    exports.squaredLength = squaredLength;
    exports.negate = negate;
    exports.inverse = inverse;
    exports.normalize = normalize;
    exports.dot = dot;
    exports.cross = cross;
    exports.lerp = lerp;
    exports.hermite = hermite;
    exports.bezier = bezier;
    exports.random = random;
    exports.transformMat4 = transformMat4;
    exports.transformMat3 = transformMat3;
    exports.transformQuat = transformQuat;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.angle = angle;
    exports.zero = zero;
    exports.str = str;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(3);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(3);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
    }
    function length(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      return Math.hypot(x, y, z);
    }
    function fromValues(x, y, z) {
      var out = new glMatrix.ARRAY_TYPE(3);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
    }
    function set(out, x, y, z) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      out[2] = Math.ceil(a[2]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      out[2] = Math.floor(a[2]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      out[2] = Math.min(a[2], b[2]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      out[2] = Math.max(a[2], b[2]);
      return out;
    }
    function round(out, a) {
      out[0] = Math.round(a[0]);
      out[1] = Math.round(a[1]);
      out[2] = Math.round(a[2]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      return Math.hypot(x, y, z);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      return x * x + y * y + z * z;
    }
    function squaredLength(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      return x * x + y * y + z * z;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      out[2] = 1 / a[2];
      return out;
    }
    function normalize(out, a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var len2 = x * x + y * y + z * z;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = a[0] * len2;
      out[1] = a[1] * len2;
      out[2] = a[2] * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    function cross(out, a, b) {
      var ax = a[0], ay = a[1], az = a[2];
      var bx = b[0], by = b[1], bz = b[2];
      out[0] = ay * bz - az * by;
      out[1] = az * bx - ax * bz;
      out[2] = ax * by - ay * bx;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0];
      var ay = a[1];
      var az = a[2];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      return out;
    }
    function hermite(out, a, b, c, d, t) {
      var factorTimes2 = t * t;
      var factor1 = factorTimes2 * (2 * t - 3) + 1;
      var factor2 = factorTimes2 * (t - 2) + t;
      var factor3 = factorTimes2 * (t - 1);
      var factor4 = factorTimes2 * (3 - 2 * t);
      out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
      out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
      out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
      return out;
    }
    function bezier(out, a, b, c, d, t) {
      var inverseFactor = 1 - t;
      var inverseFactorTimesTwo = inverseFactor * inverseFactor;
      var factorTimes2 = t * t;
      var factor1 = inverseFactorTimesTwo * inverseFactor;
      var factor2 = 3 * t * inverseFactorTimesTwo;
      var factor3 = 3 * factorTimes2 * inverseFactor;
      var factor4 = factorTimes2 * t;
      out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
      out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
      out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 || 1;
      var r = glMatrix.RANDOM() * 2 * Math.PI;
      var z = glMatrix.RANDOM() * 2 - 1;
      var zScale = Math.sqrt(1 - z * z) * scale2;
      out[0] = Math.cos(r) * zScale;
      out[1] = Math.sin(r) * zScale;
      out[2] = z * scale2;
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0], y = a[1], z = a[2];
      var w = m[3] * x + m[7] * y + m[11] * z + m[15];
      w = w || 1;
      out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
      out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
      out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
      return out;
    }
    function transformMat3(out, a, m) {
      var x = a[0], y = a[1], z = a[2];
      out[0] = x * m[0] + y * m[3] + z * m[6];
      out[1] = x * m[1] + y * m[4] + z * m[7];
      out[2] = x * m[2] + y * m[5] + z * m[8];
      return out;
    }
    function transformQuat(out, a, q) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
      var x = a[0], y = a[1], z = a[2];
      var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
      var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
      var w2 = qw * 2;
      uvx *= w2;
      uvy *= w2;
      uvz *= w2;
      uuvx *= 2;
      uuvy *= 2;
      uuvz *= 2;
      out[0] = x + uvx + uuvx;
      out[1] = y + uvy + uuvy;
      out[2] = z + uvz + uuvz;
      return out;
    }
    function rotateX(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[0];
      r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
      r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function rotateY(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
      r[1] = p[1];
      r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function rotateZ(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
      r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
      r[2] = p[2];
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function angle(a, b) {
      var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      return out;
    }
    function str(a) {
      return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2];
      var b0 = b[0], b1 = b[1], b2 = b[2];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
    }
    var sub = subtract;
    exports.sub = sub;
    var mul = multiply;
    exports.mul = mul;
    var div = divide;
    exports.div = div;
    var dist = distance;
    exports.dist = dist;
    var sqrDist = squaredDistance;
    exports.sqrDist = sqrDist;
    var len = length;
    exports.len = len;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    var forEach = function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 3;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
        }
        return a;
      };
    }();
    exports.forEach = forEach;
  }
});

// node_modules/gl-matrix/cjs/vec4.js
var require_vec4 = __commonJS({
  "node_modules/gl-matrix/cjs/vec4.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.fromValues = fromValues;
    exports.copy = copy;
    exports.set = set;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiply = multiply;
    exports.divide = divide;
    exports.ceil = ceil;
    exports.floor = floor;
    exports.min = min;
    exports.max = max;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.distance = distance;
    exports.squaredDistance = squaredDistance;
    exports.length = length;
    exports.squaredLength = squaredLength;
    exports.negate = negate;
    exports.inverse = inverse;
    exports.normalize = normalize;
    exports.dot = dot;
    exports.cross = cross;
    exports.lerp = lerp;
    exports.random = random;
    exports.transformMat4 = transformMat4;
    exports.transformQuat = transformQuat;
    exports.zero = zero;
    exports.str = str;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function fromValues(x, y, z, w) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function set(out, x, y, z, w) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      out[3] = a[3] * b[3];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      out[3] = a[3] / b[3];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      out[2] = Math.ceil(a[2]);
      out[3] = Math.ceil(a[3]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      out[2] = Math.floor(a[2]);
      out[3] = Math.floor(a[3]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      out[2] = Math.min(a[2], b[2]);
      out[3] = Math.min(a[3], b[3]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      out[2] = Math.max(a[2], b[2]);
      out[3] = Math.max(a[3], b[3]);
      return out;
    }
    function round(out, a) {
      out[0] = Math.round(a[0]);
      out[1] = Math.round(a[1]);
      out[2] = Math.round(a[2]);
      out[3] = Math.round(a[3]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      var w = b[3] - a[3];
      return Math.hypot(x, y, z, w);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      var w = b[3] - a[3];
      return x * x + y * y + z * z + w * w;
    }
    function length(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      return Math.hypot(x, y, z, w);
    }
    function squaredLength(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      return x * x + y * y + z * z + w * w;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = -a[3];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      out[2] = 1 / a[2];
      out[3] = 1 / a[3];
      return out;
    }
    function normalize(out, a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      var len2 = x * x + y * y + z * z + w * w;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = x * len2;
      out[1] = y * len2;
      out[2] = z * len2;
      out[3] = w * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    function cross(out, u, v, w) {
      var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
      var G = u[0];
      var H = u[1];
      var I = u[2];
      var J = u[3];
      out[0] = H * F - I * E + J * D;
      out[1] = -(G * F) + I * C - J * B;
      out[2] = G * E - H * C + J * A;
      out[3] = -(G * D) + H * B - I * A;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0];
      var ay = a[1];
      var az = a[2];
      var aw = a[3];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      out[3] = aw + t * (b[3] - aw);
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 || 1;
      var v1, v2, v3, v4;
      var s1, s2;
      do {
        v1 = glMatrix.RANDOM() * 2 - 1;
        v2 = glMatrix.RANDOM() * 2 - 1;
        s1 = v1 * v1 + v2 * v2;
      } while (s1 >= 1);
      do {
        v3 = glMatrix.RANDOM() * 2 - 1;
        v4 = glMatrix.RANDOM() * 2 - 1;
        s2 = v3 * v3 + v4 * v4;
      } while (s2 >= 1);
      var d = Math.sqrt((1 - s1) / s2);
      out[0] = scale2 * v1;
      out[1] = scale2 * v2;
      out[2] = scale2 * v3 * d;
      out[3] = scale2 * v4 * d;
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
      out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
      out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
      out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
      return out;
    }
    function transformQuat(out, a, q) {
      var x = a[0], y = a[1], z = a[2];
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z;
      out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
      out[3] = a[3];
      return out;
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      return out;
    }
    function str(a) {
      return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
    }
    var sub = subtract;
    exports.sub = sub;
    var mul = multiply;
    exports.mul = mul;
    var div = divide;
    exports.div = div;
    var dist = distance;
    exports.dist = dist;
    var sqrDist = squaredDistance;
    exports.sqrDist = sqrDist;
    var len = length;
    exports.len = len;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    var forEach = function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 4;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          vec[3] = a[i + 3];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
          a[i + 3] = vec[3];
        }
        return a;
      };
    }();
    exports.forEach = forEach;
  }
});

// node_modules/gl-matrix/cjs/quat.js
var require_quat = __commonJS({
  "node_modules/gl-matrix/cjs/quat.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.identity = identity;
    exports.setAxisAngle = setAxisAngle;
    exports.getAxisAngle = getAxisAngle;
    exports.getAngle = getAngle;
    exports.multiply = multiply;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.calculateW = calculateW;
    exports.exp = exp;
    exports.ln = ln;
    exports.pow = pow;
    exports.slerp = slerp;
    exports.random = random;
    exports.invert = invert;
    exports.conjugate = conjugate;
    exports.fromMat3 = fromMat3;
    exports.fromEuler = fromEuler;
    exports.str = str;
    exports.setAxes = exports.sqlerp = exports.rotationTo = exports.equals = exports.exactEquals = exports.normalize = exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.lerp = exports.dot = exports.scale = exports.mul = exports.add = exports.set = exports.copy = exports.fromValues = exports.clone = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    var mat3 = _interopRequireWildcard(require_mat3());
    var vec3 = _interopRequireWildcard(require_vec3());
    var vec4 = _interopRequireWildcard(require_vec4());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }
      out[3] = 1;
      return out;
    }
    function identity(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    }
    function setAxisAngle(out, axis, rad) {
      rad = rad * 0.5;
      var s = Math.sin(rad);
      out[0] = s * axis[0];
      out[1] = s * axis[1];
      out[2] = s * axis[2];
      out[3] = Math.cos(rad);
      return out;
    }
    function getAxisAngle(out_axis, q) {
      var rad = Math.acos(q[3]) * 2;
      var s = Math.sin(rad / 2);
      if (s > glMatrix.EPSILON) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
      } else {
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
      }
      return rad;
    }
    function getAngle(a, b) {
      var dotproduct = dot(a, b);
      return Math.acos(2 * dotproduct * dotproduct - 1);
    }
    function multiply(out, a, b) {
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = b[0], by = b[1], bz = b[2], bw = b[3];
      out[0] = ax * bw + aw * bx + ay * bz - az * by;
      out[1] = ay * bw + aw * by + az * bx - ax * bz;
      out[2] = az * bw + aw * bz + ax * by - ay * bx;
      out[3] = aw * bw - ax * bx - ay * by - az * bz;
      return out;
    }
    function rotateX(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw + aw * bx;
      out[1] = ay * bw + az * bx;
      out[2] = az * bw - ay * bx;
      out[3] = aw * bw - ax * bx;
      return out;
    }
    function rotateY(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var by = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw - az * by;
      out[1] = ay * bw + aw * by;
      out[2] = az * bw + ax * by;
      out[3] = aw * bw - ay * by;
      return out;
    }
    function rotateZ(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bz = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw + ay * bz;
      out[1] = ay * bw - ax * bz;
      out[2] = az * bw + aw * bz;
      out[3] = aw * bw - az * bz;
      return out;
    }
    function calculateW(out, a) {
      var x = a[0], y = a[1], z = a[2];
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
      return out;
    }
    function exp(out, a) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      var r = Math.sqrt(x * x + y * y + z * z);
      var et = Math.exp(w);
      var s = r > 0 ? et * Math.sin(r) / r : 0;
      out[0] = x * s;
      out[1] = y * s;
      out[2] = z * s;
      out[3] = et * Math.cos(r);
      return out;
    }
    function ln(out, a) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      var r = Math.sqrt(x * x + y * y + z * z);
      var t = r > 0 ? Math.atan2(r, w) / r : 0;
      out[0] = x * t;
      out[1] = y * t;
      out[2] = z * t;
      out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
      return out;
    }
    function pow(out, a, b) {
      ln(out, a);
      scale(out, out, b);
      exp(out, out);
      return out;
    }
    function slerp(out, a, b, t) {
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = b[0], by = b[1], bz = b[2], bw = b[3];
      var omega, cosom, sinom, scale0, scale1;
      cosom = ax * bx + ay * by + az * bz + aw * bw;
      if (cosom < 0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
      }
      if (1 - cosom > glMatrix.EPSILON) {
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
      } else {
        scale0 = 1 - t;
        scale1 = t;
      }
      out[0] = scale0 * ax + scale1 * bx;
      out[1] = scale0 * ay + scale1 * by;
      out[2] = scale0 * az + scale1 * bz;
      out[3] = scale0 * aw + scale1 * bw;
      return out;
    }
    function random(out) {
      var u1 = glMatrix.RANDOM();
      var u2 = glMatrix.RANDOM();
      var u3 = glMatrix.RANDOM();
      var sqrt1MinusU1 = Math.sqrt(1 - u1);
      var sqrtU1 = Math.sqrt(u1);
      out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
      out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
      out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
      out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
      return out;
    }
    function invert(out, a) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var dot2 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
      var invDot = dot2 ? 1 / dot2 : 0;
      out[0] = -a0 * invDot;
      out[1] = -a1 * invDot;
      out[2] = -a2 * invDot;
      out[3] = a3 * invDot;
      return out;
    }
    function conjugate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a[3];
      return out;
    }
    function fromMat3(out, m) {
      var fTrace = m[0] + m[4] + m[8];
      var fRoot;
      if (fTrace > 0) {
        fRoot = Math.sqrt(fTrace + 1);
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
      } else {
        var i = 0;
        if (m[4] > m[0])
          i = 1;
        if (m[8] > m[i * 3 + i])
          i = 2;
        var j = (i + 1) % 3;
        var k = (i + 2) % 3;
        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
      }
      return out;
    }
    function fromEuler(out, x, y, z) {
      var halfToRad = 0.5 * Math.PI / 180;
      x *= halfToRad;
      y *= halfToRad;
      z *= halfToRad;
      var sx = Math.sin(x);
      var cx = Math.cos(x);
      var sy = Math.sin(y);
      var cy = Math.cos(y);
      var sz = Math.sin(z);
      var cz = Math.cos(z);
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      return out;
    }
    function str(a) {
      return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    var clone = vec4.clone;
    exports.clone = clone;
    var fromValues = vec4.fromValues;
    exports.fromValues = fromValues;
    var copy = vec4.copy;
    exports.copy = copy;
    var set = vec4.set;
    exports.set = set;
    var add = vec4.add;
    exports.add = add;
    var mul = multiply;
    exports.mul = mul;
    var scale = vec4.scale;
    exports.scale = scale;
    var dot = vec4.dot;
    exports.dot = dot;
    var lerp = vec4.lerp;
    exports.lerp = lerp;
    var length = vec4.length;
    exports.length = length;
    var len = length;
    exports.len = len;
    var squaredLength = vec4.squaredLength;
    exports.squaredLength = squaredLength;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    var normalize = vec4.normalize;
    exports.normalize = normalize;
    var exactEquals = vec4.exactEquals;
    exports.exactEquals = exactEquals;
    var equals = vec4.equals;
    exports.equals = equals;
    var rotationTo = function() {
      var tmpvec3 = vec3.create();
      var xUnitVec3 = vec3.fromValues(1, 0, 0);
      var yUnitVec3 = vec3.fromValues(0, 1, 0);
      return function(out, a, b) {
        var dot2 = vec3.dot(a, b);
        if (dot2 < -0.999999) {
          vec3.cross(tmpvec3, xUnitVec3, a);
          if (vec3.len(tmpvec3) < 1e-6)
            vec3.cross(tmpvec3, yUnitVec3, a);
          vec3.normalize(tmpvec3, tmpvec3);
          setAxisAngle(out, tmpvec3, Math.PI);
          return out;
        } else if (dot2 > 0.999999) {
          out[0] = 0;
          out[1] = 0;
          out[2] = 0;
          out[3] = 1;
          return out;
        } else {
          vec3.cross(tmpvec3, a, b);
          out[0] = tmpvec3[0];
          out[1] = tmpvec3[1];
          out[2] = tmpvec3[2];
          out[3] = 1 + dot2;
          return normalize(out, out);
        }
      };
    }();
    exports.rotationTo = rotationTo;
    var sqlerp = function() {
      var temp1 = create();
      var temp2 = create();
      return function(out, a, b, c, d, t) {
        slerp(temp1, a, d, t);
        slerp(temp2, b, c, t);
        slerp(out, temp1, temp2, 2 * t * (1 - t));
        return out;
      };
    }();
    exports.sqlerp = sqlerp;
    var setAxes = function() {
      var matr = mat3.create();
      return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];
        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];
        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];
        return normalize(out, fromMat3(out, matr));
      };
    }();
    exports.setAxes = setAxes;
  }
});

// node_modules/gl-matrix/cjs/quat2.js
var require_quat2 = __commonJS({
  "node_modules/gl-matrix/cjs/quat2.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.fromValues = fromValues;
    exports.fromRotationTranslationValues = fromRotationTranslationValues;
    exports.fromRotationTranslation = fromRotationTranslation;
    exports.fromTranslation = fromTranslation;
    exports.fromRotation = fromRotation;
    exports.fromMat4 = fromMat4;
    exports.copy = copy;
    exports.identity = identity;
    exports.set = set;
    exports.getDual = getDual;
    exports.setDual = setDual;
    exports.getTranslation = getTranslation;
    exports.translate = translate;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.rotateByQuatAppend = rotateByQuatAppend;
    exports.rotateByQuatPrepend = rotateByQuatPrepend;
    exports.rotateAroundAxis = rotateAroundAxis;
    exports.add = add;
    exports.multiply = multiply;
    exports.scale = scale;
    exports.lerp = lerp;
    exports.invert = invert;
    exports.conjugate = conjugate;
    exports.normalize = normalize;
    exports.str = str;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.dot = exports.mul = exports.setReal = exports.getReal = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    var quat = _interopRequireWildcard(require_quat());
    var mat4 = _interopRequireWildcard(require_mat4());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var dq = new glMatrix.ARRAY_TYPE(8);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        dq[0] = 0;
        dq[1] = 0;
        dq[2] = 0;
        dq[4] = 0;
        dq[5] = 0;
        dq[6] = 0;
        dq[7] = 0;
      }
      dq[3] = 1;
      return dq;
    }
    function clone(a) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = a[0];
      dq[1] = a[1];
      dq[2] = a[2];
      dq[3] = a[3];
      dq[4] = a[4];
      dq[5] = a[5];
      dq[6] = a[6];
      dq[7] = a[7];
      return dq;
    }
    function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = x1;
      dq[1] = y1;
      dq[2] = z1;
      dq[3] = w1;
      dq[4] = x2;
      dq[5] = y2;
      dq[6] = z2;
      dq[7] = w2;
      return dq;
    }
    function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = x1;
      dq[1] = y1;
      dq[2] = z1;
      dq[3] = w1;
      var ax = x2 * 0.5, ay = y2 * 0.5, az = z2 * 0.5;
      dq[4] = ax * w1 + ay * z1 - az * y1;
      dq[5] = ay * w1 + az * x1 - ax * z1;
      dq[6] = az * w1 + ax * y1 - ay * x1;
      dq[7] = -ax * x1 - ay * y1 - az * z1;
      return dq;
    }
    function fromRotationTranslation(out, q, t) {
      var ax = t[0] * 0.5, ay = t[1] * 0.5, az = t[2] * 0.5, bx = q[0], by = q[1], bz = q[2], bw = q[3];
      out[0] = bx;
      out[1] = by;
      out[2] = bz;
      out[3] = bw;
      out[4] = ax * bw + ay * bz - az * by;
      out[5] = ay * bw + az * bx - ax * bz;
      out[6] = az * bw + ax * by - ay * bx;
      out[7] = -ax * bx - ay * by - az * bz;
      return out;
    }
    function fromTranslation(out, t) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = t[0] * 0.5;
      out[5] = t[1] * 0.5;
      out[6] = t[2] * 0.5;
      out[7] = 0;
      return out;
    }
    function fromRotation(out, q) {
      out[0] = q[0];
      out[1] = q[1];
      out[2] = q[2];
      out[3] = q[3];
      out[4] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      return out;
    }
    function fromMat4(out, a) {
      var outer = quat.create();
      mat4.getRotation(outer, a);
      var t = new glMatrix.ARRAY_TYPE(3);
      mat4.getTranslation(t, a);
      fromRotationTranslation(out, outer, t);
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      return out;
    }
    function identity(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      return out;
    }
    function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
      out[0] = x1;
      out[1] = y1;
      out[2] = z1;
      out[3] = w1;
      out[4] = x2;
      out[5] = y2;
      out[6] = z2;
      out[7] = w2;
      return out;
    }
    var getReal = quat.copy;
    exports.getReal = getReal;
    function getDual(out, a) {
      out[0] = a[4];
      out[1] = a[5];
      out[2] = a[6];
      out[3] = a[7];
      return out;
    }
    var setReal = quat.copy;
    exports.setReal = setReal;
    function setDual(out, q) {
      out[4] = q[0];
      out[5] = q[1];
      out[6] = q[2];
      out[7] = q[3];
      return out;
    }
    function getTranslation(out, a) {
      var ax = a[4], ay = a[5], az = a[6], aw = a[7], bx = -a[0], by = -a[1], bz = -a[2], bw = a[3];
      out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
      return out;
    }
    function translate(out, a, v) {
      var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3], bx1 = v[0] * 0.5, by1 = v[1] * 0.5, bz1 = v[2] * 0.5, ax2 = a[4], ay2 = a[5], az2 = a[6], aw2 = a[7];
      out[0] = ax1;
      out[1] = ay1;
      out[2] = az1;
      out[3] = aw1;
      out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
      out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
      out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
      out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
      return out;
    }
    function rotateX(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat.rotateX(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateY(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat.rotateY(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateZ(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat.rotateZ(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateByQuatAppend(out, a, q) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3], ax = a[0], ay = a[1], az = a[2], aw = a[3];
      out[0] = ax * qw + aw * qx + ay * qz - az * qy;
      out[1] = ay * qw + aw * qy + az * qx - ax * qz;
      out[2] = az * qw + aw * qz + ax * qy - ay * qx;
      out[3] = aw * qw - ax * qx - ay * qy - az * qz;
      ax = a[4];
      ay = a[5];
      az = a[6];
      aw = a[7];
      out[4] = ax * qw + aw * qx + ay * qz - az * qy;
      out[5] = ay * qw + aw * qy + az * qx - ax * qz;
      out[6] = az * qw + aw * qz + ax * qy - ay * qx;
      out[7] = aw * qw - ax * qx - ay * qy - az * qz;
      return out;
    }
    function rotateByQuatPrepend(out, q, a) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3], bx = a[0], by = a[1], bz = a[2], bw = a[3];
      out[0] = qx * bw + qw * bx + qy * bz - qz * by;
      out[1] = qy * bw + qw * by + qz * bx - qx * bz;
      out[2] = qz * bw + qw * bz + qx * by - qy * bx;
      out[3] = qw * bw - qx * bx - qy * by - qz * bz;
      bx = a[4];
      by = a[5];
      bz = a[6];
      bw = a[7];
      out[4] = qx * bw + qw * bx + qy * bz - qz * by;
      out[5] = qy * bw + qw * by + qz * bx - qx * bz;
      out[6] = qz * bw + qw * bz + qx * by - qy * bx;
      out[7] = qw * bw - qx * bx - qy * by - qz * bz;
      return out;
    }
    function rotateAroundAxis(out, a, axis, rad) {
      if (Math.abs(rad) < glMatrix.EPSILON) {
        return copy(out, a);
      }
      var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
      rad = rad * 0.5;
      var s = Math.sin(rad);
      var bx = s * axis[0] / axisLength;
      var by = s * axis[1] / axisLength;
      var bz = s * axis[2] / axisLength;
      var bw = Math.cos(rad);
      var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3];
      out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      var ax = a[4], ay = a[5], az = a[6], aw = a[7];
      out[4] = ax * bw + aw * bx + ay * bz - az * by;
      out[5] = ay * bw + aw * by + az * bx - ax * bz;
      out[6] = az * bw + aw * bz + ax * by - ay * bx;
      out[7] = aw * bw - ax * bx - ay * by - az * bz;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      return out;
    }
    function multiply(out, a, b) {
      var ax0 = a[0], ay0 = a[1], az0 = a[2], aw0 = a[3], bx1 = b[4], by1 = b[5], bz1 = b[6], bw1 = b[7], ax1 = a[4], ay1 = a[5], az1 = a[6], aw1 = a[7], bx0 = b[0], by0 = b[1], bz0 = b[2], bw0 = b[3];
      out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
      out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
      out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
      out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
      out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
      out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
      out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
      out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
      return out;
    }
    var mul = multiply;
    exports.mul = mul;
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      return out;
    }
    var dot = quat.dot;
    exports.dot = dot;
    function lerp(out, a, b, t) {
      var mt = 1 - t;
      if (dot(a, b) < 0)
        t = -t;
      out[0] = a[0] * mt + b[0] * t;
      out[1] = a[1] * mt + b[1] * t;
      out[2] = a[2] * mt + b[2] * t;
      out[3] = a[3] * mt + b[3] * t;
      out[4] = a[4] * mt + b[4] * t;
      out[5] = a[5] * mt + b[5] * t;
      out[6] = a[6] * mt + b[6] * t;
      out[7] = a[7] * mt + b[7] * t;
      return out;
    }
    function invert(out, a) {
      var sqlen = squaredLength(a);
      out[0] = -a[0] / sqlen;
      out[1] = -a[1] / sqlen;
      out[2] = -a[2] / sqlen;
      out[3] = a[3] / sqlen;
      out[4] = -a[4] / sqlen;
      out[5] = -a[5] / sqlen;
      out[6] = -a[6] / sqlen;
      out[7] = a[7] / sqlen;
      return out;
    }
    function conjugate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a[3];
      out[4] = -a[4];
      out[5] = -a[5];
      out[6] = -a[6];
      out[7] = a[7];
      return out;
    }
    var length = quat.length;
    exports.length = length;
    var len = length;
    exports.len = len;
    var squaredLength = quat.squaredLength;
    exports.squaredLength = squaredLength;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    function normalize(out, a) {
      var magnitude = squaredLength(a);
      if (magnitude > 0) {
        magnitude = Math.sqrt(magnitude);
        var a0 = a[0] / magnitude;
        var a1 = a[1] / magnitude;
        var a2 = a[2] / magnitude;
        var a3 = a[3] / magnitude;
        var b0 = a[4];
        var b1 = a[5];
        var b2 = a[6];
        var b3 = a[7];
        var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
        out[0] = a0;
        out[1] = a1;
        out[2] = a2;
        out[3] = a3;
        out[4] = (b0 - a0 * a_dot_b) / magnitude;
        out[5] = (b1 - a1 * a_dot_b) / magnitude;
        out[6] = (b2 - a2 * a_dot_b) / magnitude;
        out[7] = (b3 - a3 * a_dot_b) / magnitude;
      }
      return out;
    }
    function str(a) {
      return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7));
    }
  }
});

// node_modules/gl-matrix/cjs/vec2.js
var require_vec2 = __commonJS({
  "node_modules/gl-matrix/cjs/vec2.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.fromValues = fromValues;
    exports.copy = copy;
    exports.set = set;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiply = multiply;
    exports.divide = divide;
    exports.ceil = ceil;
    exports.floor = floor;
    exports.min = min;
    exports.max = max;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.distance = distance;
    exports.squaredDistance = squaredDistance;
    exports.length = length;
    exports.squaredLength = squaredLength;
    exports.negate = negate;
    exports.inverse = inverse;
    exports.normalize = normalize;
    exports.dot = dot;
    exports.cross = cross;
    exports.lerp = lerp;
    exports.random = random;
    exports.transformMat2 = transformMat2;
    exports.transformMat2d = transformMat2d;
    exports.transformMat3 = transformMat3;
    exports.transformMat4 = transformMat4;
    exports.rotate = rotate;
    exports.angle = angle;
    exports.zero = zero;
    exports.str = str;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(2);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(2);
      out[0] = a[0];
      out[1] = a[1];
      return out;
    }
    function fromValues(x, y) {
      var out = new glMatrix.ARRAY_TYPE(2);
      out[0] = x;
      out[1] = y;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      return out;
    }
    function set(out, x, y) {
      out[0] = x;
      out[1] = y;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      return out;
    }
    function round(out, a) {
      out[0] = Math.round(a[0]);
      out[1] = Math.round(a[1]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0], y = b[1] - a[1];
      return Math.hypot(x, y);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0], y = b[1] - a[1];
      return x * x + y * y;
    }
    function length(a) {
      var x = a[0], y = a[1];
      return Math.hypot(x, y);
    }
    function squaredLength(a) {
      var x = a[0], y = a[1];
      return x * x + y * y;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      return out;
    }
    function normalize(out, a) {
      var x = a[0], y = a[1];
      var len2 = x * x + y * y;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = a[0] * len2;
      out[1] = a[1] * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1];
    }
    function cross(out, a, b) {
      var z = a[0] * b[1] - a[1] * b[0];
      out[0] = out[1] = 0;
      out[2] = z;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0], ay = a[1];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 || 1;
      var r = glMatrix.RANDOM() * 2 * Math.PI;
      out[0] = Math.cos(r) * scale2;
      out[1] = Math.sin(r) * scale2;
      return out;
    }
    function transformMat2(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[2] * y;
      out[1] = m[1] * x + m[3] * y;
      return out;
    }
    function transformMat2d(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[2] * y + m[4];
      out[1] = m[1] * x + m[3] * y + m[5];
      return out;
    }
    function transformMat3(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[3] * y + m[6];
      out[1] = m[1] * x + m[4] * y + m[7];
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0];
      var y = a[1];
      out[0] = m[0] * x + m[4] * y + m[12];
      out[1] = m[1] * x + m[5] * y + m[13];
      return out;
    }
    function rotate(out, a, b, rad) {
      var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
      out[0] = p0 * cosC - p1 * sinC + b[0];
      out[1] = p0 * sinC + p1 * cosC + b[1];
      return out;
    }
    function angle(a, b) {
      var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      return out;
    }
    function str(a) {
      return "vec2(" + a[0] + ", " + a[1] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1];
      var b0 = b[0], b1 = b[1];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
    }
    var len = length;
    exports.len = len;
    var sub = subtract;
    exports.sub = sub;
    var mul = multiply;
    exports.mul = mul;
    var div = divide;
    exports.div = div;
    var dist = distance;
    exports.dist = dist;
    var sqrDist = squaredDistance;
    exports.sqrDist = sqrDist;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    var forEach = function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 2;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
        }
        return a;
      };
    }();
    exports.forEach = forEach;
  }
});

// node_modules/gl-matrix/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/gl-matrix/cjs/index.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.vec4 = exports.vec3 = exports.vec2 = exports.quat2 = exports.quat = exports.mat4 = exports.mat3 = exports.mat2d = exports.mat2 = exports.glMatrix = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    exports.glMatrix = glMatrix;
    var mat2 = _interopRequireWildcard(require_mat2());
    exports.mat2 = mat2;
    var mat2d = _interopRequireWildcard(require_mat2d());
    exports.mat2d = mat2d;
    var mat3 = _interopRequireWildcard(require_mat3());
    exports.mat3 = mat3;
    var mat4 = _interopRequireWildcard(require_mat4());
    exports.mat4 = mat4;
    var quat = _interopRequireWildcard(require_quat());
    exports.quat = quat;
    var quat2 = _interopRequireWildcard(require_quat2());
    exports.quat2 = quat2;
    var vec22 = _interopRequireWildcard(require_vec2());
    exports.vec2 = vec22;
    var vec3 = _interopRequireWildcard(require_vec3());
    exports.vec3 = vec3;
    var vec4 = _interopRequireWildcard(require_vec4());
    exports.vec4 = vec4;
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module2) {
    "use strict";
    module2.exports = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// src/App.tsx
var import_react3 = __toESM(require_react(), 1);

// src/socket/socket.ts
var import_rxjs = __toESM(require_rxjs(), 1);
var Socket = class {
  events$ = new import_rxjs.Subject();
  websocket;
  constructor(config) {
    this.websocket = new WebSocket(config.wsServerURL, config.language);
    this.websocket.onmessage = (e) => {
      const event = JSON.parse(e.data);
      event.event_type = event.type;
      this.events$.next(event);
    };
  }
  handleEvent(event) {
    const func = Socket[event.event_type];
    if (func)
      func(event).forEach((e) => this.websocket.send(JSON.stringify(e)));
  }
  static create_game(event) {
    return [event];
  }
  static join_game(event) {
    return [event];
  }
  static play_card_request(event) {
    return [event];
  }
};

// src/game/game.ts
var import_rxjs2 = __toESM(require_rxjs(), 1);

// src/game/constants.ts
var WIDTH = 960;
var HEIGHT = 540;
var ANIMATION_DURATION_MS = 800;
var HAND_POSITION = [482, HEIGHT + 50];
var OPPONENT_HAND_POSITION = [482, -50];
var HAND_CARD_ANGLE = Math.PI / 5;
var HAND_X_RADIUS = 160;
var HAND_Y_RADIUS = 80;
var HAND_ANGLE_FACTOR = HAND_Y_RADIUS / HAND_X_RADIUS;
var EMISSIONS_LINE_POSITION = [482, HEIGHT / 2];
var EMISSIONS_LINE_MAX_LENGTH = 450;
var DECK_POSITION = [WIDTH - 100, HEIGHT / 2 - 154 / 2 - 20];
var DISCARD_PILE_POSITION = [WIDTH - 100, HEIGHT / 2 + 154 / 2 + 20];

// src/game/card.ts
var import_gl_matrix = __toESM(require_cjs(), 1);
var _Card = class {
  id;
  name;
  container;
  position = [0, 0];
  scale = _Card.DEFAULT_SCALE;
  rotation = 0;
  addedRotation = 0;
  zLevel = 0;
  isSpace = false;
  visible = true;
  flipped = false;
  positionGoal = {
    position: [0, 0],
    timestamp: 0
  };
  rotationGoal = {
    rotation: 0,
    timestamp: 0
  };
  addedRotationGoal = {
    addedRotation: 0,
    timestamp: 0
  };
  scaleGoal = {
    scale: _Card.DEFAULT_SCALE,
    timestamp: 0
  };
  constructor(id, name, container) {
    this.id = id;
    this.name = name;
    if (name === "space")
      this.isSpace = true;
    this.container = container;
  }
  static getRectangle(card) {
    const width = _Card.DEFAULT_WIDTH * card.scale;
    const height = _Card.DEFAULT_HEIGHT * card.scale;
    return [
      [-width / 2, -height / 2],
      [width / 2, height / 2]
    ];
  }
  static move(card, x, y, currentTime) {
    const existing = card.positionGoal;
    if (existing.position[0] === x && existing.position[1] === y)
      return { ...card };
    return {
      ...card,
      positionGoal: {
        timestamp: currentTime,
        position: [x, y]
      }
    };
  }
  static rotateGlobal(card, rotation, currentTime) {
    if (card.rotationGoal.rotation === rotation)
      return { ...card };
    return {
      ...card,
      rotationGoal: {
        timestamp: currentTime,
        rotation
      }
    };
  }
  static rotateLocal(card, rotation, currentTime) {
    if (card.addedRotationGoal.addedRotation === rotation)
      return { ...card };
    return {
      ...card,
      addedRotationGoal: {
        timestamp: currentTime,
        addedRotation: rotation
      }
    };
  }
  static scale(card, scale, currentTime) {
    if (card.scaleGoal.scale === scale)
      return { ...card };
    return {
      ...card,
      scaleGoal: {
        timestamp: currentTime,
        scale
      }
    };
  }
  static transposePosition(card, time) {
    return {
      ...card,
      position: [
        transpose(card.position[0], card.positionGoal.position[0], time - card.positionGoal.timestamp),
        transpose(card.position[1], card.positionGoal.position[1], time - card.positionGoal.timestamp)
      ]
    };
  }
  static update(oldCard, time) {
    let card = { ...oldCard };
    card = _Card.transposePosition(card, time);
    card.scale = transpose(card.scale, card.scaleGoal.scale, time - card.scaleGoal.timestamp);
    card.rotation = transpose(card.rotation, card.rotationGoal.rotation, time - card.rotationGoal.timestamp);
    card.addedRotation = transpose(card.addedRotation, card.addedRotationGoal.addedRotation, time - card.addedRotationGoal.timestamp);
    return card;
  }
  static isMouseHovering(card, mouseX, mouseY) {
    let mouse_position = import_gl_matrix.vec2.fromValues(mouseX, mouseY);
    let card_position = import_gl_matrix.vec2.fromValues(card.position[0], card.position[1]);
    const origin = import_gl_matrix.vec2.fromValues(0, 0);
    import_gl_matrix.vec2.rotate(mouse_position, mouse_position, origin, -card.rotation);
    import_gl_matrix.vec2.rotate(card_position, card_position, origin, -card.rotation);
    import_gl_matrix.vec2.subtract(mouse_position, mouse_position, card_position);
    const rect = _Card.getRectangle(card);
    if (mouse_position[0] > rect[0][0] && mouse_position[0] < rect[1][0] && mouse_position[1] > rect[0][1] && mouse_position[1] < rect[1][1]) {
      return true;
    }
    return false;
  }
};
var Card = _Card;
__publicField(Card, "DEFAULT_WIDTH", 445);
__publicField(Card, "DEFAULT_HEIGHT", 656);
__publicField(Card, "DEFAULT_SCALE", 0.275);
function transpose(from, to, timePassed) {
  if (timePassed > ANIMATION_DURATION_MS)
    return to;
  const fraction = timePassed / ANIMATION_DURATION_MS;
  const mult = 1 - (1 - fraction) ** 2;
  return from + (to - from) * mult;
}
var SpaceCard = class extends Card {
  constructor(id) {
    super(id, "space", "emissions-line");
  }
};

// src/game/hand.ts
var Hand = class {
  _cards;
  new() {
    return new Hand(this._cards);
  }
  constructor(cards = []) {
    this._cards = cards;
  }
  get cards() {
    return this._cards;
  }
  addCard(card) {
    return new Hand([...this._cards, card]);
  }
  update(currentTime, focusedCardID) {
    let hand = this.new();
    const n = hand.cards.length - 1;
    hand._cards = hand.cards.map((card, i) => {
      card = { ...card };
      let angle = HAND_CARD_ANGLE * (i - n / 2);
      let x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle);
      let y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle);
      let scale = Card.DEFAULT_SCALE;
      card.zLevel = i + 10;
      if (focusedCardID === card.id) {
        y = HAND_POSITION[1] - 230;
        scale = Card.DEFAULT_SCALE * 2;
        angle = 0;
        card.zLevel = 999;
      }
      card = Card.move(card, x, y, currentTime);
      card = Card.rotateGlobal(card, angle * HAND_ANGLE_FACTOR, currentTime);
      card = Card.scale(card, scale, currentTime);
      return card;
    });
    hand._cards = hand.cards.map((card) => Card.update(card, currentTime));
    return hand;
  }
  removeCard(card) {
    return new Hand(this.cards.filter((c) => c.id !== card.id));
  }
};

// src/game/opponent-hand.ts
var OpponentHand = class {
  _cards;
  new() {
    return new OpponentHand(this._cards);
  }
  constructor(cards = []) {
    this._cards = cards;
  }
  get cards() {
    return this._cards;
  }
  addCard(card) {
    return new OpponentHand([...this._cards, card]);
  }
  update(currentTime) {
    const hand = this.new();
    let i = 0;
    const n = hand.cards.filter((c) => c.container === "opponent-hand").length - 1;
    hand._cards = hand.cards.map((card) => {
      const angle = HAND_CARD_ANGLE * (i - n / 2) + Math.PI;
      const x = OPPONENT_HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle);
      const y = OPPONENT_HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle);
      card = Card.move(card, x, y, currentTime);
      card = Card.rotateGlobal(card, (angle + Math.PI) * HAND_ANGLE_FACTOR, currentTime);
      i += 1;
      return card;
    });
    hand._cards = hand._cards.map((card) => Card.update(card, currentTime));
    return hand;
  }
  removeCard(card) {
    return new OpponentHand(this.cards.filter((c) => c.id !== card.id));
  }
};

// src/event/event.ts
var EventToAdd = class {
  event_type;
  payload;
  constructor(event_type, payload = {}) {
    this.event_type = event_type;
    this.payload = payload;
  }
};
var Event = class extends EventToAdd {
  event_id;
  constructor(event_id, event_type, payload = {}) {
    super(event_type, payload);
    this.event_id = event_id;
  }
};
var MouseClickedEvent = class extends EventToAdd {
  constructor() {
    super("mouse_clicked");
  }
};
var MouseMovedEvent = class extends EventToAdd {
  constructor(mouseX, mouseY) {
    super("mouse_moved", { mouseX, mouseY });
  }
};
var PlayCardRequestEvent = class extends EventToAdd {
  constructor(cardID, position) {
    super("play_card_request", { cardID, position });
  }
};

// src/game/emissionsline.ts
function insert(array, item, position) {
  return [
    ...array.slice(0, position + 1),
    item,
    ...array.slice(position + 1, array.length)
  ];
}
var EmissionsLine = class {
  _cards;
  constructor(cards = []) {
    this._cards = cards;
  }
  new() {
    return new EmissionsLine(this._cards);
  }
  get width() {
    let leftCard;
    let rightCard;
    for (const card of this.nonSpaceCards) {
      if (!leftCard)
        leftCard = card;
      if (!rightCard)
        rightCard = card;
      if (card.position[0] < leftCard.position[0])
        leftCard = card;
      if (card.position[0] > rightCard.position[0])
        rightCard = card;
    }
    if (!leftCard || !rightCard)
      return 0;
    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE;
    const x1 = leftCard.position[0] - cardWidth / 2;
    const x2 = rightCard.position[0] + cardWidth / 2;
    return x2 - x1;
  }
  getEmissionsLineCardDistance() {
    const cardCount = this.cards.length;
    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE;
    const totalELWidth = cardWidth * cardCount;
    let cardDistance = cardWidth / 2;
    if (totalELWidth > EMISSIONS_LINE_MAX_LENGTH) {
      cardDistance = (EMISSIONS_LINE_MAX_LENGTH - cardWidth) / (cardCount - 1);
    }
    return cardDistance;
  }
  moveELCard(card, i, currentTime) {
    let elCards = this.cards;
    const cardCount = elCards.length;
    const width = this.getEmissionsLineCardDistance();
    const startOffset = 0 - width * cardCount / 2 - width / 2;
    const x = EMISSIONS_LINE_POSITION[0] + startOffset + width * (i + 1);
    const y = EMISSIONS_LINE_POSITION[1];
    return Card.move(card, x, y, currentTime);
  }
  reformSpaceCards() {
    return this._cards.filter((c) => c.id >= 0).reduce((cards, card, i) => {
      return [
        ...cards,
        card,
        new SpaceCard(-1 - (i + 1))
      ];
    }, [new SpaceCard(-1)]);
  }
  get nonSpaceCards() {
    return this.cards.filter((c) => !c.isSpace);
  }
  getClosestCard(x) {
    let self = this;
    let closest = self.nonSpaceCards[0];
    for (const card of self.nonSpaceCards.slice(1)) {
      if (!closest) {
        closest = card;
        continue;
      }
      if (Math.abs(card.position[0] - x) < Math.abs(closest.position[0] - x)) {
        closest = card;
      }
    }
    return closest;
  }
  scaleCard(card, mouseX, mouseY, currentTime) {
    if (card.isSpace)
      return card;
    const lowerBoundsY = EMISSIONS_LINE_POSITION[1] - Card.DEFAULT_HEIGHT * Card.DEFAULT_SCALE / 2;
    const upperBoundsY = EMISSIONS_LINE_POSITION[1] + Card.DEFAULT_HEIGHT * Card.DEFAULT_SCALE / 2;
    const lowerBoundsX = EMISSIONS_LINE_POSITION[0] - this.width / 2;
    const upperBoundsX = EMISSIONS_LINE_POSITION[0] + this.width / 2;
    if (mouseX > lowerBoundsX && mouseX < upperBoundsX && mouseY > lowerBoundsY && mouseY < upperBoundsY && card.id === this.getClosestCard(mouseX).id) {
      return Card.scale(card, Card.DEFAULT_SCALE * 2, currentTime);
    }
    return Card.scale(card, Card.DEFAULT_SCALE, currentTime);
  }
  mouse_moved(mouseX, mouseY, currentTime) {
    let self = this.new();
    if (self.nonSpaceCards.length < 0)
      return self;
    self._cards = self._cards.map((card) => self.scaleCard(card, mouseX, mouseY, currentTime));
    return self;
  }
  update(time, mouseX, mouseY) {
    let self = this.new();
    self._cards = self._cards.map((c) => Card.update(c, time));
    self = self.mouse_moved(mouseX, mouseY, time);
    return self;
  }
  get cards() {
    return this._cards;
  }
  addCard(card, position, currentTime) {
    let self = this.new();
    card.flipped = true;
    self._cards = insert(self._cards, card, position);
    self._cards = self.reformSpaceCards();
    self._cards = self._cards.map((card2, i) => {
      return self.moveELCard(card2, i, currentTime);
    });
    return self;
  }
};

// src/game/deck.ts
var Deck = class {
  topCard;
  get cards() {
    const topCard = this.topCard;
    if (!topCard)
      return [];
    return [topCard];
  }
  constructor(topCard = void 0) {
    this.topCard = topCard;
  }
  setTopCard(card) {
    return new Deck(card);
  }
};

// src/game/discard-pile.ts
var DiscardPile = class {
  topCard;
  get cards() {
    if (!this.topCard)
      return [];
    return [this.topCard];
  }
  constructor(topCard = void 0) {
    this.topCard = topCard;
  }
  setTopCard(card, currentTime) {
    const [x, y] = DISCARD_PILE_POSITION;
    card = Card.move(card, x, y, currentTime);
    card = Card.rotateGlobal(card, 0, currentTime);
    card = Card.rotateLocal(card, 0, currentTime);
    card.flipped = true;
    card.container = "discard-pile";
    return new DiscardPile(card);
  }
};

// src/game/gamestate.ts
var GameState = class {
  isMyTurn = false;
  socketID = -1;
  hoveredCardIDs = /* @__PURE__ */ new Set();
  selectedCardID;
  statusMessage = "";
  roomID = "";
  config;
  emissionsLine = new EmissionsLine();
  opponentHand = new OpponentHand();
  hand = new Hand();
  deck = new Deck();
  discardPile = new DiscardPile();
  mouseX = 0;
  mouseY = 0;
  new() {
    return Object.assign(new GameState(this.config), this);
  }
  removeHandCard(card) {
    let state = this.new();
    state.hand = state.hand.removeCard(card);
    state.opponentHand = state.opponentHand.removeCard(card);
    return state;
  }
  constructor(config) {
    this.config = config;
  }
  get cards() {
    return [...this.emissionsLine.cards, ...this.opponentHand.cards, ...this.hand.cards, ...this.deck.cards, ...this.discardPile.cards];
  }
  update(time) {
    let state = this.new();
    state.emissionsLine = state.emissionsLine.update(time, state.mouseX, state.mouseY);
    state.hand = state.hand.update(time, GameState.getFocusedCardID(state));
    state.opponentHand = state.opponentHand.update(time);
    return state;
  }
  static getFocusedCardID(state) {
    return Array.from(state.hoveredCardIDs)[0];
  }
  static getFocusedCard(state) {
    const id = GameState.getFocusedCardID(state);
    return state.cards.find((c) => c.id === id);
  }
  static getSelectedCard(state) {
    return state.cards.find((c) => c.id === state.selectedCardID);
  }
  game_won(event) {
    let state = this.new();
    const text = this.config.text;
    if (state.socketID === event.payload.socketID) {
      state.statusMessage = text.youWon;
    } else {
      state.statusMessage = text.youLost;
    }
    return [state, []];
  }
  mouse_clicked(_) {
    let state = this.new();
    const focusedCard = GameState.getFocusedCard(this);
    const events = [];
    if (state.isMyTurn && state.selectedCardID !== void 0 && focusedCard !== void 0 && focusedCard.isSpace) {
      const position = state.emissionsLine.cards.findIndex((card) => focusedCard.id === card.id);
      events.push(new PlayCardRequestEvent(state.selectedCardID, position));
    }
    let selectedCardID = void 0;
    if (focusedCard !== void 0) {
      const card = this.cards.find((c) => c.id === focusedCard.id);
      if (card && card.container === "hand") {
        selectedCardID = focusedCard.id;
      }
    }
    state.selectedCardID = selectedCardID;
    return [state, events];
  }
  next_card(event) {
    let state = this.new();
    let cards = this.cards.filter((c) => c.container !== "deck");
    const serverCard = event.payload.card;
    const card = new Card(serverCard.id, serverCard.name, "deck");
    card.position = DECK_POSITION;
    cards = [...cards, card];
    state.deck = state.deck.setTopCard(card);
    return [state, []];
  }
  mouse_moved(event) {
    let state = this.new();
    const mouseX = event.payload.mouseX;
    const mouseY = event.payload.mouseY;
    state.mouseX = mouseX;
    state.mouseY = mouseY;
    return [state, []];
  }
  incorrect_card_placement(event, currentTime = Date.now()) {
    let state = this.new();
    let card = state.cards.find((card2) => card2.id === event.payload.cardID);
    if (!card)
      return [state, []];
    card = { ...card };
    state = state.removeHandCard(card);
    state.discardPile = state.discardPile.setTopCard(card, currentTime);
    state.selectedCardID = void 0;
    return [state, []];
  }
  draw_card(event) {
    let state = this.new();
    const server_card = event.payload.card;
    if (event.payload.socketID === state.socketID) {
      const card = new Card(server_card.id, server_card.name, "hand");
      card.position = DECK_POSITION;
      state.hand = state.hand.addCard(card);
    } else {
      const card = new Card(server_card.id, server_card.name, "opponent-hand");
      card.position = DECK_POSITION;
      state.opponentHand = state.opponentHand.addCard(card);
    }
    return [state, []];
  }
  socket_id(event) {
    let state = this.new();
    state.socketID = event.payload.socketID;
    return [state, []];
  }
  card_played_from_deck(event, currentTime = Date.now()) {
    let state = this.new();
    const serverCard = event.payload.card;
    const position = event.payload.position;
    const card = new Card(serverCard.id, serverCard.name, "emissions-line");
    state.emissionsLine = state.emissionsLine.addCard(card, position, currentTime);
    return [state, []];
  }
  card_played_from_hand(event, timePassed = Date.now()) {
    let state = this.new();
    const playedCard = state.cards.find((c) => c.id === event.payload.cardID);
    if (!playedCard) {
      throw new Error("Played card does not exist with ID: " + event.payload.cardID);
    }
    const position = event.payload.position;
    state.selectedCardID = void 0;
    state = state.removeHandCard(playedCard);
    const movedCard = new Card(playedCard.id, playedCard.name, "emissions-line");
    movedCard.position = playedCard.position;
    state.emissionsLine = state.emissionsLine.addCard(movedCard, position, timePassed);
    return [state, []];
  }
  player_turn(event) {
    let state = this.new();
    const text = this.config.text;
    if (state.socketID === event.payload.socketID) {
      state.isMyTurn = true;
      state.statusMessage = text.yourTurn;
    } else {
      state.isMyTurn = false;
      state.statusMessage = text.opponentsTurn;
    }
    return [state, []];
  }
};

// src/game/game.ts
var Game = class {
  events$ = new import_rxjs2.Subject();
  state$;
  constructor(config) {
    this.state$ = new import_rxjs2.BehaviorSubject(new GameState(config));
  }
  handleEvent(event) {
    let state = this.state$.value;
    const func = state[event.event_type];
    if (typeof func == "function") {
      let events;
      [state, events] = func.bind(state)(event);
      if (!state)
        throw new Error(`Event ${event} triggered a GameState function that returned ${state}`);
      this.state$.next(state);
      events.forEach((event2) => this.events$.next(event2));
    }
  }
};

// src/event/event-stream.ts
var import_rxjs3 = __toESM(require_rxjs(), 1);
var EventStream = class {
  stream$ = new import_rxjs3.Subject();
  lastEventID = 0;
  next(event) {
    this.stream$.next({
      ...event,
      event_id: this.lastEventID++
    });
  }
  subscribe(func) {
    this.stream$.subscribe(func);
  }
};

// src/ui/Menu.tsx
var import_react = __toESM(require_react(), 1);

// src/ui/StatusBar.tsx
var import_react2 = __toESM(require_react(), 1);

// src/canvas/canvas.ts
var import_rxjs4 = __toESM(require_rxjs(), 1);

// src/canvas/shader.vert.ts
var shader = `
attribute vec2 a_position;
attribute vec2 a_texcoord;

uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform float u_scale;
uniform float u_rotation;
varying vec2 v_texcoord;

void main() {
  mat2 rotation_matrix = mat2(
    cos(u_rotation), -sin(u_rotation),
    sin(u_rotation), cos(u_rotation)
  );
  vec2 position = a_position * rotation_matrix * vec2(u_scale) + u_translation;

  vec2 zeroToOne = position / vec2(960.0, 540.0);

  vec2 zeroToTwo = zeroToOne * 2.0;

  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

  v_texcoord = a_texcoord;
}
`;
var shader_vert_default = shader;

// src/canvas/shader.frag.ts
var shader2 = `
precision mediump float;

uniform sampler2D u_texture;
uniform bool u_selected;
uniform bool u_isspace;
uniform bool u_visible;

varying vec2 v_texcoord;

vec2 CARD_SIZE = vec2(445, 656);
vec2 TEXTURE_SIZE = vec2(1024, 1024);

void main() {
  if (u_visible == false)
  {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 texcoord = vec2(v_texcoord.x, v_texcoord.y) ;

  vec4 color = texture2D(u_texture, v_texcoord);

  vec2 uv = v_texcoord * TEXTURE_SIZE;

  if (u_selected == true)
  {
    if (uv.x < 19.0 || uv.x > CARD_SIZE.x - 11.0 ||
        uv.y < 19.0 || uv.y > CARD_SIZE.y - 11.0)
    {
      color = vec4(1.0, 0.0, 0.0, color.a);
    }
  }

  if (u_isspace == true)
  {
    color.a = 0.5;
  }

  gl_FragColor = color;
}
`;
var shader_frag_default = shader2;

// src/canvas/card-sprite.ts
var IMAGE_WIDTH = 906 / 2;
var IMAGE_HEIGHT = 1328 / 2;
var IMAGE_MARGIN = 16 / 2;
var TEXTURE_WIDTH = 2048 / 2;
var TEXTURE_HEIGHT = 2048 / 2;
var CARD_WIDTH = IMAGE_WIDTH - IMAGE_MARGIN;
var CARD_HEIGHT = IMAGE_HEIGHT - IMAGE_MARGIN;
var _CardSprite = class {
  card;
  gl;
  translationLocation;
  scaleLocation;
  rotationLocation;
  selectedLocation;
  isSpaceLocation;
  visibleLocation;
  texCoordLocation = 0;
  frontTexCoordBuffer;
  backTexCoordBuffer;
  positionBuffer;
  program;
  texture;
  selected = false;
  constructor(gl, card) {
    this.card = card;
    this.gl = gl;
    const x1 = -CARD_WIDTH / 2;
    const x2 = CARD_WIDTH / 2;
    const y1 = -CARD_HEIGHT / 2;
    const y2 = CARD_HEIGHT / 2;
    const positions = [
      x1,
      y1,
      x2,
      y1,
      x1,
      y2,
      x1,
      y2,
      x2,
      y1,
      x2,
      y2
    ];
    const texture = _CardSprite.textures.get(card.name);
    if (!texture) {
      throw new Error("No card texture exists with name '" + card.name + "'");
    }
    const vs = createShader(gl, gl.VERTEX_SHADER, shader_vert_default);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, shader_frag_default);
    const program = createProgram(gl, vs, fs);
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const translationLocation = gl.getUniformLocation(program, "u_translation");
    const scaleLocation = gl.getUniformLocation(program, "u_scale");
    const rotationLocation = gl.getUniformLocation(program, "u_rotation");
    const texCoordLocation = gl.getAttribLocation(program, "a_texcoord");
    const selectedLocation = gl.getUniformLocation(program, "u_selected");
    const isSpaceLocation = gl.getUniformLocation(program, "u_isspace");
    const visibleLocation = gl.getUniformLocation(program, "u_visible");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    const backTexCoordBuffer = gl.createBuffer();
    (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, backTexCoordBuffer);
      const x0 = IMAGE_MARGIN / TEXTURE_WIDTH;
      const y0 = IMAGE_MARGIN / TEXTURE_HEIGHT;
      const x = CARD_WIDTH / TEXTURE_WIDTH;
      const y = CARD_HEIGHT / TEXTURE_HEIGHT;
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x0,
        y0,
        x,
        y0,
        x0,
        y,
        x0,
        y,
        x,
        y0,
        x,
        y
      ]), gl.STATIC_DRAW);
    })();
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    const frontTexCoordBuffer = gl.createBuffer();
    (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, frontTexCoordBuffer);
      const x0 = IMAGE_MARGIN * 2 / TEXTURE_WIDTH + CARD_WIDTH / TEXTURE_WIDTH;
      const y0 = IMAGE_MARGIN / TEXTURE_HEIGHT;
      const x = CARD_WIDTH / TEXTURE_WIDTH * 2;
      const y = CARD_HEIGHT / TEXTURE_HEIGHT;
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x0,
        y0,
        x,
        y0,
        x0,
        y,
        x0,
        y,
        x,
        y0,
        x,
        y
      ]), gl.STATIC_DRAW);
    })();
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    this.program = program;
    this.translationLocation = translationLocation;
    this.scaleLocation = scaleLocation;
    this.rotationLocation = rotationLocation;
    this.selectedLocation = selectedLocation;
    this.isSpaceLocation = isSpaceLocation;
    this.visibleLocation = visibleLocation;
    this.texCoordLocation = texCoordLocation;
    this.texture = texture;
    this.backTexCoordBuffer = backTexCoordBuffer;
    this.frontTexCoordBuffer = frontTexCoordBuffer;
    this.positionBuffer = positionBuffer;
  }
  static prepareTextures(gl, cards, baseURL) {
    return new Promise((resolve, reject) => {
      let loadedCardImages = 0;
      const cardsToLoad = [...cards, { id: -1, name: "space", emissions: 0 }];
      cardsToLoad.forEach((cardData) => {
        const image = new Image();
        image.crossOrigin = baseURL;
        image.src = `${baseURL}/cards/${cardData.name}-pair.small.png`;
        image.onload = () => {
          const texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
          gl.generateMipmap(gl.TEXTURE_2D);
          if (!texture)
            throw new Error("texture is null");
          _CardSprite.textures.set(cardData.name, texture);
          loadedCardImages++;
          if (loadedCardImages === cards.length) {
            resolve(null);
          }
        };
      });
    });
  }
  static render(sprite) {
    const gl = sprite.gl;
    const translationLocation = sprite.translationLocation;
    const scaleLocation = sprite.scaleLocation;
    const rotationLocation = sprite.rotationLocation;
    const selectedLocation = sprite.selectedLocation;
    const isSpaceLocation = sprite.isSpaceLocation;
    const visibleLocation = sprite.visibleLocation;
    const texCoordLocation = sprite.texCoordLocation;
    const frontTexCoordBuffer = sprite.frontTexCoordBuffer;
    const backTexCoordBuffer = sprite.backTexCoordBuffer;
    const program = sprite.program;
    gl.useProgram(program);
    if (sprite.card.flipped) {
      gl.bindBuffer(gl.ARRAY_BUFFER, frontTexCoordBuffer);
    } else {
      gl.bindBuffer(gl.ARRAY_BUFFER, backTexCoordBuffer);
    }
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    if (!translationLocation) {
      throw new Error("Could not find WebGL translation location");
    }
    gl.uniform2fv(translationLocation, sprite.card.position);
    gl.uniform1f(scaleLocation, sprite.card.scale);
    gl.uniform1f(rotationLocation, sprite.card.rotation + sprite.card.addedRotation);
    gl.uniform1i(selectedLocation, sprite.selected ? 1 : 0);
    gl.uniform1i(isSpaceLocation, sprite.card.isSpace ? 1 : 0);
    gl.uniform1i(visibleLocation, sprite.card.visible ? 1 : 0);
    gl.bindTexture(gl.TEXTURE_2D, sprite.texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  static delete(sprite, gl) {
    gl.deleteBuffer(sprite.frontTexCoordBuffer);
    gl.deleteBuffer(sprite.backTexCoordBuffer);
    gl.deleteBuffer(sprite.positionBuffer);
  }
};
var CardSprite = _CardSprite;
__publicField(CardSprite, "textures", /* @__PURE__ */ new Map());
function createShader(gl, type, source) {
  const shader3 = gl.createShader(type);
  if (!shader3)
    throw new Error("Failed to create shader of type " + type);
  gl.shaderSource(shader3, source);
  gl.compileShader(shader3);
  const success = gl.getShaderParameter(shader3, gl.COMPILE_STATUS);
  if (!success) {
    throw new Error("Could not compile shader:\n" + gl.getShaderInfoLog(shader3));
  }
  return shader3;
}
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  if (!program)
    throw new Error("Failed to create WebGL program");
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    throw new Error("Could not create program:\n" + gl.getProgramInfoLog(program));
  }
  return program;
}

// src/canvas/canvas.ts
var cardSprites = [];
var Canvas = class {
  gl;
  events$ = new import_rxjs4.Subject();
  constructor() {
    const canvas = document.getElementById("klimatkoll-canvas");
    if (!canvas)
      throw new Error("Can't find canvas element with ID klimatkoll-canvas");
    const gl = canvas.getContext("webgl");
    if (!gl)
      throw new Error("gl is null");
    this.gl = gl;
    const ratio = window.devicePixelRatio;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerWidth * 0.5625 * ratio;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    canvas.addEventListener("mousemove", (e) => {
      const ratio2 = 960 / canvas.width * window.devicePixelRatio;
      this.events$.next(new MouseMovedEvent(e.clientX * ratio2, e.clientY * ratio2));
    }, false);
    canvas.addEventListener("click", (e) => {
      this.events$.next(new MouseClickedEvent());
    }, false);
    window.addEventListener("resize", () => {
      const ratio2 = window.devicePixelRatio;
      canvas.width = window.innerWidth * ratio2;
      canvas.height = window.innerWidth * 0.5625 * ratio2;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }, false);
    if (!gl) {
      throw new Error("Failed to initialize WebGL");
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    this.gl = gl;
  }
  prepare(baseUrl) {
    fetch(`${baseUrl}/cards.json`).then((response) => response.json()).then((cards) => {
      cards = cards.map((c, i) => {
        return {
          ...c,
          id: i
        };
      });
      CardSprite.prepareTextures(this.gl, cards, baseUrl);
    });
  }
  render(state) {
    const gl = this.gl;
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    state.cards.forEach((card) => {
      let sprite = cardSprites.find((s) => s.card.id === card.id);
      if (!sprite) {
        sprite = new CardSprite(gl, card);
        cardSprites.push(sprite);
      } else {
        sprite.card = card;
        const texture = CardSprite.textures.get(card.name);
        if (!texture)
          throw new Error("Could not find texture with name '" + card.name + "'");
        sprite.selected = state.selectedCardID === sprite.card.id;
        sprite.texture = texture;
      }
    });
    cardSprites.filter((s) => state.cards.find((c) => c.id === s.card.id) === void 0).forEach((s) => {
      CardSprite.delete(s, gl);
    });
    cardSprites = cardSprites.filter((s) => state.cards.find((c) => c.id === s.card.id));
    cardSprites.sort((a, b) => {
      if (a.card.zLevel < b.card.zLevel)
        return -1;
      if (a.card.zLevel > b.card.zLevel)
        return 1;
      return 0;
    }).forEach((sprite) => {
      CardSprite.render(sprite);
    });
  }
};

// src/App.tsx
var AppConfig = class {
  devMode;
  language;
  text;
  get baseURL() {
    if (this.devMode === true)
      return "localhost:3000";
    return "spela.kortspeletklimatkoll.se";
  }
  get httpServerURL() {
    if (this.devMode === true) {
      return `http://${this.baseURL}`;
    }
    return `https://${this.baseURL}`;
  }
  get wsServerURL() {
    if (this.devMode === true) {
      return `ws://${this.baseURL}`;
    }
    return `wss://${this.baseURL}`;
  }
  constructor(devMode, language, text) {
    this.devMode = devMode;
    this.language = language;
    this.text = text;
  }
};
var AppState = class {
  currentPage = "menu";
  statusMessage = "";
  roomID = "";
  room_joined(e) {
    return {
      ...this,
      currentPage: "game"
    };
  }
};

// src/tests/test-factory.ts
var Factory = {
  GameState: function() {
    return new GameState(this.AppConfig());
  },
  AppState: function() {
    return new AppState();
  },
  AppConfig: function() {
    const text = {
      connectedToServer: "string",
      roomFull: "string",
      roomExists: "string",
      roomLeft: "string",
      roomJoined: "string",
      roomOpponentLeft: "string",
      reconnecting: "string",
      btnCreateGame: "string",
      btnJoinGame: "string",
      inputRoomID: "string",
      altClimateCallLogo: "string",
      waitingForPlayer: "string",
      yourTurn: "string",
      opponentsTurn: "string",
      youWon: "string",
      youLost: "string",
      labelRoom: "string",
      btnLeaveGame: "string"
    };
    return new AppConfig(true, "blargh", text);
  }
};

// src/tests/spec.ts
var import_fast_deep_equal = __toESM(require_fast_deep_equal(), 1);
function assert(state, assert2) {
  assert2(state);
  console.log("OK");
}
function assertEquals(expected, result) {
  if (!(0, import_fast_deep_equal.default)(expected, result)) {
    throw new Error(`Expected ${JSON.stringify(result, null, 4)} to equal ${JSON.stringify(expected, null, 4)}`);
  }
}
function expect(result) {
  return {
    toEqual: (expected) => assertEquals(expected, result)
  };
}
function when(getState, previousState) {
  const state = getState(previousState);
  return {
    assert: (func) => assert(state, func),
    expect: (getResult) => expect(getResult(state)),
    when: (getState2) => when(getState2, state)
  };
}
function spec(description) {
  console.log(description);
  return {
    when
  };
}

// src/tests/app.spec.ts
function main() {
  const test = spec("Join room").when(() => Factory.AppState());
  test.expect((app) => app.currentPage).toEqual("menu");
  test.when((app) => app.room_joined(new Event(1, "room_joined", { roomID: "blargh" }))).expect((app) => app.currentPage).toEqual("gamee");
}

// src/tests/tests.ts
main();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=tests.js.map
