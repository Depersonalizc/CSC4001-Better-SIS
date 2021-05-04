function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { useEffect, useRef, useCallback } from 'react';

var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isMounted = useRef(false);
  useEffect(function () {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }

    return function () {
      return undefined;
    };
  }, deps);
};

function useDebounceFn(fn, deps, wait) {
  // eslint-disable-next-line no-underscore-dangle
  var hooksDeps = Array.isArray(deps) ? deps : []; // eslint-disable-next-line no-underscore-dangle

  var hookWait = typeof deps === 'number' ? deps : wait || 0;
  var timer = useRef();
  var fnRef = useRef(fn);
  fnRef.current = fn;
  var cancel = useCallback(function () {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);
  var run = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _len,
        args,
        _key,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            for (_len = _args2.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args2[_key];
            }

            return _context2.abrupt("return", new Promise(function (resolve) {
              cancel();
              timer.current = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return fnRef.current.apply(fnRef, args);

                      case 2:
                        resolve();

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })), hookWait);
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [hookWait, cancel]);
  useUpdateEffect(function () {
    run();
    return cancel;
  }, [].concat(_toConsumableArray(hooksDeps), [run]));
  useEffect(function () {
    return cancel;
  }, []);
  return {
    run: run,
    cancel: cancel
  };
}

export default useDebounceFn;