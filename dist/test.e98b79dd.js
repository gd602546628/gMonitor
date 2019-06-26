// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/util/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevice = getDevice;
exports.getUUID = getUUID;
exports.isFunction = isFunction;
exports.noop = noop;

function getDevice() {
  var device = {};
  var ua = navigator.userAgent;
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  var mobileInfo = ua.match(/Android\s[\S\s]+Build\//);
  device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
  device.isWeixin = /MicroMessenger/i.test(ua);
  device.os = "web";
  device.deviceName = "PC"; // Android

  if (android) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }

  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  } // iOS


  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }

  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }

  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  } // iOS 8+ changed UA


  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  } // 如果是ios, deviceName 就设置为iphone，根据分辨率区别型号


  if (device.iphone) {
    device.deviceName = "iphone";
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    if (screenWidth === 320 && screenHeight === 480) {
      device.deviceName = "iphone 4";
    } else if (screenWidth === 320 && screenHeight === 568) {
      device.deviceName = "iphone 5/SE";
    } else if (screenWidth === 375 && screenHeight === 667) {
      device.deviceName = "iphone 6/7/8";
    } else if (screenWidth === 414 && screenHeight === 736) {
      device.deviceName = "iphone 6/7/8 Plus";
    } else if (screenWidth === 375 && screenHeight === 812) {
      device.deviceName = "iphone X/S/Max";
    }
  } else if (device.ipad) {
    device.deviceName = "ipad";
  } else if (mobileInfo) {
    var info = mobileInfo[0];
    var deviceName = info.split(';')[1].replace(/Build\//g, "");
    device.deviceName = deviceName.replace(/(^\s*)|(\s*$)/g, "");
  } // 浏览器模式, 获取浏览器信息
  // TODO 需要补充更多的浏览器类型进来


  if (ua.indexOf("Mobile") == -1) {
    var agent = navigator.userAgent.toLowerCase();
    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi;
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    device.browserName = '未知'; //IE

    if (agent.indexOf("msie") > 0) {
      var browserInfo = agent.match(regStr_ie)[0];
      device.browserName = browserInfo.split('/')[0];
      device.browserVersion = browserInfo.split('/')[1];
    } //firefox


    if (agent.indexOf("firefox") > 0) {
      var _browserInfo = agent.match(regStr_ff)[0];
      device.browserName = _browserInfo.split('/')[0];
      device.browserVersion = _browserInfo.split('/')[1];
    } //Safari


    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
      var _browserInfo2 = agent.match(regStr_saf)[0];
      device.browserName = _browserInfo2.split('/')[0];
      device.browserVersion = _browserInfo2.split('/')[1];
    } //Chrome


    if (agent.indexOf("chrome") > 0) {
      var _browserInfo3 = agent.match(regStr_chrome)[0];
      device.browserName = _browserInfo3.split('/')[0];
      device.browserVersion = _browserInfo3.split('/')[1];
    }
  } // Webview


  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i); // Export object

  return device;
}

function getUUID() {
  var timeStamp = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16) + "-" + timeStamp;
  });
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function noop() {
  return false;
}
},{}],"../src/recode/classes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpInfo = exports.EventInfo = exports.ResourceInfo = exports.JavascriptInfo = void 0;

var _index = require("../util/index");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function Base() {
  _classCallCheck(this, Base);

  this.happenTime = new Date().getTime();
  this.simpleUrl = window.location.href.split('?')[0].replace('#', ''); // 页面的url

  this.completeUrl = window.location.href; // 页面的完整url

  var device = (0, _index.getDevice)();
  this.browserName = device.browserName;
  this.browserVersion = device.browserVersion;
  this.deviceName = device.deviceName;
  this.os = device.os;
};

var JavascriptInfo =
/*#__PURE__*/
function (_Base) {
  _inherits(JavascriptInfo, _Base);

  function JavascriptInfo(_ref) {
    var _this;

    var line = _ref.line,
        column = _ref.column,
        errorMessage = _ref.errorMessage,
        errorStack = _ref.errorStack,
        errorType = _ref.errorType,
        fileName = _ref.fileName;

    _classCallCheck(this, JavascriptInfo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JavascriptInfo).call(this));
    _this.line = line;
    _this.column = column;
    _this.errorMessage = errorMessage;
    _this.errorStack = errorStack;
    _this.errorType = errorType;
    return _this;
  }

  return JavascriptInfo;
}(Base);

exports.JavascriptInfo = JavascriptInfo;

var ResourceInfo =
/*#__PURE__*/
function (_Base2) {
  _inherits(ResourceInfo, _Base2);

  function ResourceInfo(_ref2) {
    var _this2;

    var sourceUrl = _ref2.sourceUrl,
        elementType = _ref2.elementType,
        errorType = _ref2.errorType;

    _classCallCheck(this, ResourceInfo);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ResourceInfo).call(this));
    _this2.sourceUrl = sourceUrl;
    _this2.elementType = elementType;
    _this2.errorType = errorType;
    return _this2;
  }

  return ResourceInfo;
}(Base);

exports.ResourceInfo = ResourceInfo;

var EventInfo =
/*#__PURE__*/
function (_Base3) {
  _inherits(EventInfo, _Base3);

  function EventInfo(_ref3) {
    var _this3;

    var tagName = _ref3.tagName,
        clientX = _ref3.clientX,
        clientY = _ref3.clientY,
        className = _ref3.className,
        idName = _ref3.idName,
        eventType = _ref3.eventType;

    _classCallCheck(this, EventInfo);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(EventInfo).call(this));
    _this3.tagName = tagName;
    _this3.clientX = clientX;
    _this3.clientY = clientY;
    _this3.className = className;
    _this3.idName = idName;
    _this3.eventType = eventType;
    return _this3;
  }

  return EventInfo;
}(Base);

exports.EventInfo = EventInfo;

var HttpInfo =
/*#__PURE__*/
function (_Base4) {
  _inherits(HttpInfo, _Base4);

  function HttpInfo(_ref4) {
    var _this4;

    var startTime = _ref4.startTime,
        endTime = _ref4.endTime,
        disTime = _ref4.disTime,
        requestData = _ref4.requestData,
        queryData = _ref4.queryData,
        responseData = _ref4.responseData,
        requestUrl = _ref4.requestUrl;

    _classCallCheck(this, HttpInfo);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(HttpInfo).call(this));
    _this4.startTime = startTime;
    _this4.endTime = endTime;
    _this4.disTime = disTime;
    _this4.requestData = requestData;
    _this4.queryData = queryData;
    _this4.responseData = responseData;
    _this4.requestUrl = requestUrl;
    return _this4;
  }

  return HttpInfo;
}(Base);

exports.HttpInfo = HttpInfo;
},{"../util/index":"../src/util/index.js"}],"../src/recode/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classes = require("./classes");

var _index = require("../util/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Recode =
/*#__PURE__*/
function () {
  function Recode() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Recode);

    this.options = options || {};
    ['jsHandler', 'eventHandler', 'resourceHandler', 'httpHandler'].forEach(function (key) {
      _this.options[key] = (0, _index.isFunction)(options[key]) ? options[key] : _index.noop;
    });
    this.init();
  }

  _createClass(Recode, [{
    key: "init",
    value: function init() {
      this.recordJsAndResourceError();
      this.recordEvent();
      this.recordHttp();
    }
  }, {
    key: "recordJsAndResourceError",
    value: function recordJsAndResourceError() {
      var _this2 = this;

      window.addEventListener('error', function (error) {
        if (error instanceof ErrorEvent) {
          //js异常
          var jsInfo = new _classes.JavascriptInfo({
            line: error.lineno,
            column: error.colno,
            errorMessage: error.message,
            errorType: 'jsError',
            fileName: error.filename,
            errorStack: error.error && error.error.stack
          });

          _this2.options.jsHandler(jsInfo, error);
        } else {
          // 资源异常
          var target = error.target || {};
          var resourceInfo = new _classes.ResourceInfo({
            sourceUrl: target.src || target.href,
            elementType: target.localName,
            errorType: 'resourceError'
          });

          _this2.options.resourceHandler(resourceInfo, error);
        }
      }, true);
      window.addEventListener('unhandledrejection', function (error) {
        var jsInfo = new _classes.JavascriptInfo({
          errorMessage: error.reason && error.reason.message,
          errorType: 'promiseError',
          errorStack: error.reason && error.reason.stack
        });

        _this2.options.jsHandler(jsInfo, error);
      });
    }
  }, {
    key: "recordEvent",
    value: function recordEvent() {
      window.addEventListener('click', function (event) {
        console.log(event);
        var target = event.target || {};
        var eventInfo = new _classes.EventInfo({
          tagName: target.localName,
          clientX: event.clientX,
          clientY: event.clientY,
          className: target.className,
          idName: target.id
        });
      });
    }
  }, {
    key: "recordHttp",
    value: function recordHttp() {}
  }]);

  return Recode;
}();

exports.default = Recode;
},{"./classes":"../src/recode/classes.js","../util/index":"../src/util/index.js"}],"test.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("../src/recode/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _index.default();
},{"../src/recode/index":"../src/recode/index.js"}],"C:/Users/guod/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52466" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/guod/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","test.js"], null)
//# sourceMappingURL=/test.e98b79dd.js.map