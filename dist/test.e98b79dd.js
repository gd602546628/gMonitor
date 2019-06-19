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
})({"../../../node_modules/indb/dist/indb.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["indb"] = factory();
	else
		root["indb"] = factory();
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InDB", function() { return InDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InDBStore", function() { return InDBStore; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var InDB =
/*#__PURE__*/
function () {
  function InDB() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, InDB);

    var name = options.name,
        _options$version = options.version,
        version = _options$version === void 0 ? 1 : _options$version,
        stores = options.stores;

    if (!name) {
      throw new Error('[InDB]: you should pass `name` option.');
    }

    if (!stores || !Array.isArray(stores) || !stores.length) {
      throw new Error('[InDB]: you should pass `stores` option.');
    }

    this.name = name;
    this.version = version;
    this.stores = stores; // update database structure

    var request = indexedDB.open(name, version);

    request.onupgradeneeded = function (e) {
      var db = e.target.result;
      var existStoreNames = Array.from(db.objectStoreNames);
      var passStoreNames = [];
      stores.forEach(function (item) {
        var objectStore = null;

        if (existStoreNames.indexOf(item.name) > -1) {
          objectStore = e.target.transaction.objectStore(item.name);
        } else {
          var keyPath = item.isKeyValue ? 'key' : item.keyPath;
          var autoIncrement = item.isKeyValue ? false : item.autoIncrement;
          objectStore = db.createObjectStore(item.name, {
            keyPath: keyPath,
            autoIncrement: autoIncrement
          });
        } // delete old indexes


        var indexNames = objectStore.indexNames;

        if (indexNames && indexNames.length) {
          Array.from(indexNames).forEach(function (item) {
            return objectStore.deleteIndex(item);
          });
        } // add new indexes


        if (item.indexes && item.indexes.length) {
          item.indexes.forEach(function (item) {
            objectStore.createIndex(item.name, item.keyPath || item.name, {
              unique: item.unique,
              multiEntry: Array.isArray(item.keyPath)
            });
          });
        }

        passStoreNames.push(item.name);
      }); // delete objectStores which is not in config information

      if (existStoreNames) {
        existStoreNames.forEach(function (item) {
          if (passStoreNames.indexOf(item) === -1) {
            db.deleteObjectStore(item);
          }
        });
      }
    };

    this.using = {};
  }

  _createClass(InDB, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = indexedDB.open(_this.name, _this.version);

        request.onerror = function (e) {
          var error = e.target.error;
          reject(error);
        };

        request.onsuccess = function (e) {
          resolve(e.target.result);
        };
      });
    }
  }, {
    key: "use",
    value: function use(name) {
      var currentStore = this.stores.find(function (item) {
        return item.name === name;
      });

      if (!currentStore) {
        throw new Error("[InDB]: store ".concat(name, " is not existing."));
      } // use connected store


      if (this.using[name]) {
        return this.using[name];
      }

      var store = new InDBStore({
        db: this,
        store: currentStore
      }); // if it is a key-value store, append special methods

      if (currentStore.isKeyValue) {
        store.key = function (i) {
          return store.keys().then(function (keys) {
            return keys && keys[i];
          });
        };

        store.getItem = function (key) {
          return store.get(key).then(function (obj) {
            return obj && obj.value;
          });
        };

        store.setItem = function (key, value) {
          return store.put({
            key: key,
            value: value
          });
        };

        store.removeItem = function (key) {
          return store["delete"](key);
        };
      }

      this.using[name] = store;
      return store;
    }
  }, {
    key: "close",
    value: function close() {
      this.using = null;
      this.stores = null;
      return this.connect().then(function (db) {
        db.close();
      });
    }
  }]);

  return InDB;
}();
var InDBStore =
/*#__PURE__*/
function () {
  function InDBStore() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, InDBStore);

    var store = options.store,
        db = options.db;

    if (_typeof(store) !== 'object' || !store.name || typeof store.name !== 'string') {
      throw new Error("[InDBStore]: options.store should be a store config object.");
    }

    if (!(db instanceof InDB)) {
      throw new Error("[InDBStore]: options.db should be an instanceof InDB.");
    }

    this.store = store;
    this.db = db;
    this.name = store.name;
    this.keyPath = store.isKeyValue ? 'key' : store.keyPath;
  }

  _createClass(InDBStore, [{
    key: "transaction",
    value: function transaction() {
      var writable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var name = this.name;
      var mode = writable ? 'readwrite' : 'readonly';
      return this.db.connect().then(function (db) {
        return db.transaction(name, mode);
      });
    }
  }, {
    key: "objectStore",
    value: function objectStore() {
      var writable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var name = this.name;
      return this.transaction(writable).then(function (tx) {
        return tx.objectStore(name);
      });
    }
  }, {
    key: "request",
    value: function request(create) {
      var _this2 = this;

      var writable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return new Promise(function (resolve, reject) {
        _this2.objectStore(writable).then(function (objectStore) {
          var request = create(objectStore);

          request.onsuccess = function (e) {
            var result = e.target.result;
            resolve(result);
          };

          request.onerror = function (e) {
            var error = e.target.error;
            reject(error);
          };
        });
      });
    }
  }, {
    key: "cursor",
    value: function cursor(options) {
      var index = options.index,
          range = options.range,
          direction = options.direction,
          onTouch = options.onTouch,
          onDone = options.onDone,
          onError = options.onError,
          _options$writable = options.writable,
          writable = _options$writable === void 0 ? false : _options$writable;
      return this.objectStore(writable).then(function (objectStore) {
        var owner = index ? objectStore.index(index) : objectStore;
        var request = owner.openCursor(range, direction);

        request.onsuccess = function (e) {
          var cursor = e.target.result;

          if (cursor) {
            onTouch(cursor, owner);
          } else {
            onDone(cursor, owner);
          }
        };

        request.onerror = function (e) {
          var error = e.target.error;
          reject(error);
        };
      });
    }
  }, {
    key: "iterate",
    value: function iterate(fn) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$writable2 = options.writable,
          writable = _options$writable2 === void 0 ? false : _options$writable2,
          _options$direction = options.direction,
          direction = _options$direction === void 0 ? 'next' : _options$direction;
      return new Promise(function (resolve, reject) {
        _this3.cursor({
          writable: writable,
          direction: direction,
          onTouch: function onTouch(cursor, owner) {
            var next = function next() {
              return cursor["continue"]();
            };

            var stop = function stop() {
              owner.transaction.abort();
              resolve();
            };

            fn(cursor, next, stop);
          },
          onDone: function onDone() {
            resolve();
          },
          onError: function onError(e) {
            reject(e);
          }
        });
      });
    }
  }, {
    key: "batch",
    value: function batch(fns) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$writable3 = options.writable,
          writable = _options$writable3 === void 0 ? true : _options$writable3;
      return this.transaction(writable).then(function (tx) {
        var name = _this4.name;
        var promises = [];
        fns.forEach(function (fn) {
          var deferer = new Promise(function (resolve, reject) {
            var objectStore = tx.objectStore(name);
            var request = fn(objectStore);

            request.onsuccess = function (e) {
              var result = e.target.result;
              resolve(result);
            };

            request.onerror = function (e) {
              var error = e.target.error;
              reject(error);
            };
          });
          promises.push(deferer);
        });
        return Promise.all(promises);
      });
    } // ==========================================

  }, {
    key: "get",
    value: function get(key) {
      // single key
      if (!Array.isArray(key)) {
        return this.request(function (objectStore) {
          return objectStore.get(key);
        });
      } // multiple keys


      var keys = key;
      var fns = keys.map(function (key) {
        return function (objectStore) {
          return objectStore.get(key);
        };
      });
      return this.batch(fns, {
        writable: false
      });
    }
  }, {
    key: "keys",
    value: function keys() {
      return this.request(function (objectStore) {
        return objectStore.getAllKeys();
      });
    }
  }, {
    key: "all",
    value: function all() {
      return this.request(function (objectStore) {
        return objectStore.getAll();
      });
    }
  }, {
    key: "count",
    value: function count() {
      return this.request(function (objectStore) {
        return objectStore.count();
      });
    } // ==========================================

  }, {
    key: "each",
    value: function each(fn) {
      return this.iterate(function (cursor, next) {
        var obj = cursor.value;
        fn(obj);
        next();
      });
    }
  }, {
    key: "reverse",
    value: function reverse(fn) {
      return this.iterate(function (cursor, next) {
        var obj = cursor.value;
        fn(obj);
        next();
      }, {
        direction: 'prev'
      });
    }
  }, {
    key: "some",
    value: function some() {
      var _this5 = this;

      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return new Promise(function (resolve, reject) {
        var results = [];
        var i = 0;
        var start = offset;
        var end = offset + count;
        var direction; // offset < 0, means begining from the latest item,
        // for example, offset = -1, means begining from the last item

        if (offset < 0) {
          direction = 'prev';
          count = Math.min(count, -offset);
          start = -(offset + count) || 0;
          end = start + count;
        }

        _this5.iterate(function (cursor, next, stop) {
          if (i < start) {
            i++;
            next();
          } else if (i < end) {
            results.push(cursor.value);
            i++;
            next();
          } else {
            stop();
          }
        }, {
          direction: direction
        }).then(function () {
          if (offset < 0) {
            results.reverse();
          }

          resolve(results);
        })["catch"](reject);
      });
    }
  }, {
    key: "first",
    value: function first() {
      return this.some(1).then(function (items) {
        return items[0];
      });
    }
  }, {
    key: "last",
    value: function last() {
      return this.some(1, -1).then(function (items) {
        return items[0];
      });
    } // =========================

  }, {
    key: "find",
    value: function find(key, value) {
      return this.request(function (objectStore) {
        return objectStore.index(key).get(value);
      });
    }
  }, {
    key: "query",
    value: function query(key, value, compare) {
      var _this6 = this;

      var range = function () {
        switch (compare) {
          case '>':
            return IDBKeyRange.lowerBound(value, true);

          case '>=':
            return IDBKeyRange.lowerBound(value);

          case '<':
            return IDBKeyRange.upperBound(value, true);

          case '<=':
            return IDBKeyRange.upperBound(value);

          case '%':
          case '!=':
          case 'in':
            return undefined;

          default:
            return IDBKeyRange.only(value);
        }
      }();

      var results = [];
      return new Promise(function (resolve, reject) {
        _this6.cursor({
          index: key,
          range: range,
          onTouch: function onTouch(cursor, owner) {
            var targetObj = cursor.value;
            var keyPath = owner.keyPath;
            var targetValue = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* parse */ "a"])(targetObj, keyPath);

            if (compare === '!=') {
              if (targetValue !== value) {
                results.push(targetObj);
              }
            } else if (compare === '%') {
              if (typeof targetValue == 'string' && targetValue.indexOf(value) > -1) {
                results.push(targetObj);
              }
            } else if (compare === 'in') {
              if (Array.isArray(value) && value.indexOf(targetValue) > -1) {
                results.push(targetObj);
              }
            } else {
              results.push(targetObj);
            }

            cursor["continue"]();
          },
          onDone: function onDone() {
            resolve(results);
          },
          onError: function onError(e) {
            reject(e);
          }
        });
      });
    }
  }, {
    key: "select",
    value: function select(conditions) {
      var currentStore = this.store;
      var indexes = currentStore.indexes || [];
      var indexesMapping = {};
      indexes.forEach(function (item) {
        var name = item.name,
            keyPath = item.keyPath;
        indexesMapping[name] = keyPath;
      });
      var or_conditions = [];
      var and_conditions = [];

      for (var i = 0, len = conditions.length; i < len; i++) {
        var _conditions$i = conditions[i],
            key = _conditions$i.key,
            value = _conditions$i.value,
            compare = _conditions$i.compare,
            optional = _conditions$i.optional;
        var keyPath = indexesMapping[key] || key; // if there is not such index, use original key as keyPath

        if (optional) {
          or_conditions.push({
            keyPath: keyPath,
            value: value,
            compare: compare
          });
        } else {
          and_conditions.push({
            keyPath: keyPath,
            value: value,
            compare: compare
          });
        }
      }

      var determine = function determine(obj) {
        var compareAandB = function compareAandB(a, b, compare) {
          if (a === undefined) {
            return false;
          }

          switch (compare) {
            case '>':
              return a > b;

            case '>=':
              return a >= b;

            case '<':
              return a < b;

            case '<=':
              return a <= b;

            case '!=':
              return a !== b;

            case '%':
              return typeof a === 'string' && a.indexOf(b) > -1;

            case 'in':
              return Array.isArray(b) && b.indexOf(a) > -1;

            default:
              return a === b;
          }
        };

        for (var _i = 0, _len = and_conditions.length; _i < _len; _i++) {
          var _and_conditions$_i = and_conditions[_i],
              _keyPath = _and_conditions$_i.keyPath,
              value = _and_conditions$_i.value,
              compare = _and_conditions$_i.compare;
          var current = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* parse */ "a"])(obj, _keyPath);

          if (!compareAandB(current, value, compare)) {
            return false;
          }
        }

        for (var _i2 = 0, _len2 = or_conditions.length; _i2 < _len2; _i2++) {
          var _or_conditions$_i = or_conditions[_i2],
              _keyPath2 = _or_conditions$_i.keyPath,
              value = _or_conditions$_i.value,
              compare = _or_conditions$_i.compare;

          var _current = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* parse */ "a"])(obj, _keyPath2);

          if (compareAandB(_current, value, compare)) {
            return true;
          }
        }

        return false;
      };

      var results = [];
      return this.each(function (obj) {
        if (determine(obj)) {
          results.push(obj);
        }
      }).then(function () {
        return results;
      });
    } // =====================================

  }, {
    key: "add",
    value: function add(obj) {
      if (!Array.isArray(obj)) {
        return this.request(function (objectStore) {
          return objectStore.add(obj);
        }, 'readwrite');
      }

      var objs = obj;
      var fns = objs.map(function (obj) {
        return function (objectStore) {
          return objectStore.add(obj);
        };
      });
      return this.batch(fns);
    }
  }, {
    key: "put",
    value: function put(obj) {
      // single object
      if (!Array.isArray(obj)) {
        return this.request(function (objectStore) {
          return objectStore.put(obj);
        }, 'readwrite');
      } // multiple objects


      var objs = obj;
      var fns = objs.map(function (obj) {
        return function (objectStore) {
          return objectStore.put(obj);
        };
      });
      return this.batch(fns);
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      // single key
      if (!Array.isArray(key)) {
        return this.request(function (objectStore) {
          return objectStore["delete"](key);
        }, 'readwrite');
      } // multiple keys


      var keys = key;
      var fns = keys.map(function (key) {
        return function (objectStore) {
          return objectStore["delete"](key);
        };
      });
      return this.batch(fns);
    }
  }, {
    key: "remove",
    value: function remove(obj) {
      var keyPah = this.keyPath; // single obj

      if (!Array.isArray(obj)) {
        var key = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* parse */ "a"])(obj, keyPah);
        return this["delete"](key);
      } // multiple objects


      var objs = obj;
      var fns = objs.map(function (obj) {
        var key = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* parse */ "a"])(obj, keyPah);
        return function (objectStore) {
          return objectStore["delete"](key);
        };
      });
      return this.batch(fns);
    }
  }, {
    key: "clear",
    value: function clear() {
      return this.request(function (objectStore) {
        return objectStore.clear();
      }, 'readwrite');
    }
  }]);

  return InDBStore;
}();
var idb = new InDB({
  name: 'InDB',
  stores: [{
    name: 'InDB',
    isKeyValue: true
  }]
});
var store = idb.use('InDB');
InDB.setItem = store.setItem.bind(store);
InDB.getItem = store.getItem.bind(store);
InDB.removeItem = store.removeItem.bind(store);
InDB.key = store.key.bind(store);
/* harmony default export */ __webpack_exports__["default"] = (InDB);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export makeKeyChain */
/* unused harmony export makeKeyPath */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parse; });
/* unused harmony export modifyError */
/* unused harmony export pipeline */
/**
 * 将一个不规则的路径转化为规则路径
 * @example
 * makeKeyPath(makeKeyChain('name.0..body[0].head')) => name[0].body[0].head
 */
function makeKeyChain(path) {
  var chain = path.toString().split(/\.|\[|\]/).filter(function (item) {
    return !!item;
  });
  return chain;
}
function makeKeyPath(chain) {
  var path = '';

  for (var i = 0, len = chain.length; i < len; i++) {
    var key = chain[i];

    if (/^[0-9]+$/.test(key)) {
      path += '[' + key + ']';
    } else {
      path += path ? '.' + key : key;
    }
  }

  return path;
}
/**
 * 根据keyPath读取对象属性值
 * @param {*} obj
 * @param {*} path
 * @example
 * parse({ child: [ { body: { head: true } } ] }, 'child[0].body.head') => true
 */

function parse(obj, path) {
  var chain = makeKeyChain(path);

  if (!chain.length) {
    return obj;
  }

  var target = obj;

  for (var i = 0, len = chain.length; i < len; i++) {
    var key = chain[i];

    if (target[key] === undefined) {
      return undefined;
    }

    target = target[key];
  }

  return target;
}
function modifyError(e) {
  var message = e.message;
  e.message = message.indexOf('[IndexedDB]') === -1 ? '[IndexedDB]: ' + message : message;
  return e;
}
/**
 * 通过一个异步函数处理一个数组
 * @param {*} items
 * @param {*} fn
 */

function pipeline(items, fn) {
  return new Promise(function (resolve, reject) {
    var i = 0;
    var len = items.length;

    var through = function through() {
      if (i >= len) {
        resolve();
        return;
      }

      var item = items[i];
      Promise.resolve().then(function () {
        return fn(item, i);
      }).then(function () {
        i++;
      }).then(through)["catch"](reject);
    };

    return through();
  });
}

/***/ })
/******/ ]);
});

},{}],"../src/operation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var uuid = 0;

var Operation = function Operation() {
  _classCallCheck(this, Operation);

  _defineProperty(this, "page", void 0);

  this.id = uuid++;
};

exports.default = Operation;
},{}],"../src/record.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var uuid = 0;

var Record = //出错行
//出错列
// 页面url
//时间
//浏览器信息
// 错误信息
//错误类型
//设备信息
//操作系统信息
//网络信息
function Record() {
  _classCallCheck(this, Record);

  _defineProperty(this, "id", void 0);

  _defineProperty(this, "lineNo", void 0);

  _defineProperty(this, "colNo", void 0);

  _defineProperty(this, "path", void 0);

  _defineProperty(this, "time", void 0);

  _defineProperty(this, "agnet", void 0);

  _defineProperty(this, "message", void 0);

  _defineProperty(this, "type", void 0);

  _defineProperty(this, "device", void 0);

  _defineProperty(this, "system", void 0);

  _defineProperty(this, "network", void 0);

  this.id = uuid++;
};

exports.default = Record;
},{}],"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _indb = _interopRequireDefault(require("indb"));

var _operation = _interopRequireDefault(require("./operation"));

var _record = _interopRequireDefault(require("./record"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RECORD = 'RECORD'; // record story name

var OPERATION = 'OPERATION'; // operation story name

var noop = function noop() {};

var ErrorWatcher =
/*#__PURE__*/
function () {
  function ErrorWatcher() {
    _classCallCheck(this, ErrorWatcher);

    _defineProperty(this, "db", void 0);

    _defineProperty(this, "currentEvent", void 0);

    this.init();
  }

  _createClass(ErrorWatcher, [{
    key: "init",
    value: function init() {
      var _this = this;

      document.addEventListener('click', function (e) {
        _this.currentEvent = e;
      });
      window.addEventListener('error', function (event) {
        console.log(event);
        setTimeout(function () {
          console.log(_this.currentEvent);
        }, 0);
      });
      window.addEventListener('unhandledrejection', function (e) {
        console.log(e);
      });
    }
  }, {
    key: "createDb",
    value: function createDb() {
      this.db = new _indb.default({
        name: 'g_monitor',
        stores: [{
          name: RECORD,
          keyPath: 'id',
          indexes: [{
            name: 'id',
            keyPath: 'id'
          }]
        }, {
          name: OPERATION,
          keyPath: 'id',
          indexes: [{
            name: 'id',
            keyPath: 'id'
          }]
        }]
      });
    }
  }, {
    key: "switchStore",
    value: function switchStore(name) {
      if (this.db) {
        this.db.use(name);
      }
    }
  }, {
    key: "createRecord",
    value: function createRecord() {
      var record = new _record.default();
      return record;
    }
  }, {
    key: "createOperation",
    value: function createOperation() {
      var operation = new _operation.default();
      return operation;
    }
  }]);

  return ErrorWatcher;
}();

exports.default = ErrorWatcher;
},{"indb":"../../../node_modules/indb/dist/indb.js","./operation":"../src/operation.js","./record":"../src/record.js"}],"test.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("../src/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _index.default();
},{"../src/index":"../src/index.js"}],"C:/Users/guod/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50019" + '/');

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