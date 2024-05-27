let buildArgsList;

// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

    function stringFromDartString(string) {
        const totalLength = dartInstance.exports.$stringLength(string);
        let result = '';
        let index = 0;
        while (index < totalLength) {
          let chunkLength = Math.min(totalLength - index, 0xFFFF);
          const array = new Array(chunkLength);
          for (let i = 0; i < chunkLength; i++) {
              array[i] = dartInstance.exports.$stringRead(string, index++);
          }
          result += String.fromCharCode(...array);
        }
        return result;
    }

    function stringToDartString(string) {
        const length = string.length;
        let range = 0;
        for (let i = 0; i < length; i++) {
            range |= string.codePointAt(i);
        }
        if (range < 256) {
            const dartString = dartInstance.exports.$stringAllocate1(length);
            for (let i = 0; i < length; i++) {
                dartInstance.exports.$stringWrite1(dartString, i, string.codePointAt(i));
            }
            return dartString;
        } else {
            const dartString = dartInstance.exports.$stringAllocate2(length);
            for (let i = 0; i < length; i++) {
                dartInstance.exports.$stringWrite2(dartString, i, string.charCodeAt(i));
            }
            return dartString;
        }
    }

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
        const length = dartInstance.exports.$listLength(list);
        const array = new constructor(length);
        for (let i = 0; i < length; i++) {
            array[i] = dartInstance.exports.$listRead(list, i);
        }
        return array;
    }

    buildArgsList = function(list) {
        const dartList = dartInstance.exports.$makeStringList();
        for (let i = 0; i < list.length; i++) {
            dartInstance.exports.$listAdd(dartList, stringToDartString(list[i]));
        }
        return dartList;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
        wrapped.dartFunction = dartFunction;
        wrapped[jsWrappedDartFunctionSymbol] = true;
        return wrapped;
    }

    // Imports
    const dart2wasm = {

_18: f => finalizeWrapper(f,x0 => dartInstance.exports._18(f,x0)),
_19: f => finalizeWrapper(f,x0 => dartInstance.exports._19(f,x0)),
_69: x0 => x0.getReader(),
_73: (x0,x1) => x0.cancel(x1),
_74: x0 => x0.read(),
_77: x0 => x0.value,
_79: x0 => x0.done,
_82: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11) => ({method: x0,headers: x1,body: x2,mode: x3,credentials: x4,cache: x5,redirect: x6,referrer: x7,referrerPolicy: x8,integrity: x9,keepalive: x10,signal: x11}),
_84: (x0,x1) => x0.method = x1,
_97: (x0,x1) => x0.redirect = x1,
_110: (x0,x1) => globalThis.fetch(x0,x1),
_111: () => new AbortController(),
_112: x0 => x0.abort(),
_113: (x0,x1) => x0.get(x1),
_114: (x0,x1) => x0.get(x1),
_115: (x0,x1) => x0.get(x1),
_139: x0 => new Headers(x0),
_142: x0 => x0.entries(),
_161: x0 => x0.body,
_163: x0 => x0.headers,
_165: x0 => x0.redirected,
_166: x0 => x0.status,
_167: x0 => x0.statusText,
_168: x0 => x0.type,
_169: x0 => x0.url,
_184: (x0,x1) => x0.call(x1),
_185: (x0,x1,x2) => x0.call(x1,x2),
_188: (x0,x1) => x0.bind(x1),
_192: x0 => x0.next,
_204: x0 => x0.done,
_206: x0 => x0.value,
_251: x0 => x0.signal,
_12893: (decoder, codeUnits) => decoder.decode(codeUnits),
_12894: () => new TextDecoder("utf-8", {fatal: true}),
_12895: () => new TextDecoder("utf-8", {fatal: false}),
_12896: v => stringToDartString(v.toString()),
_12911: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_12915: () => {
      // On browsers return `globalThis.location.href`
      if (globalThis.location != null) {
        return stringToDartString(globalThis.location.href);
      }
      return null;
    },
_12916: () => {
        return typeof process != undefined &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
_12920: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_12921: s => printToConsole(stringFromDartString(s)),
_12939: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_12941: (a, i) => a.push(i),
_12951: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
_12952: a => a.length,
_12954: (a, i) => a[i],
_12955: (a, i, v) => a[i] = v,
_12957: a => a.join(''),
_12960: (s, t) => s.split(t),
_12961: s => s.toLowerCase(),
_12962: s => s.toUpperCase(),
_12967: (s, p, i) => s.indexOf(p, i),
_12968: (s, p, i) => s.lastIndexOf(p, i),
_12970: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_12971: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_12972: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_12973: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_12974: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_12975: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_12976: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_12979: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_12980: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_12981: Object.is,
_12984: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_12986: o => o.buffer,
_12987: o => o.byteOffset,
_12988: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_12989: (b, o) => new DataView(b, o),
_12991: Function.prototype.call.bind(DataView.prototype.getUint8),
_12992: Function.prototype.call.bind(DataView.prototype.setUint8),
_12993: Function.prototype.call.bind(DataView.prototype.getInt8),
_12994: Function.prototype.call.bind(DataView.prototype.setInt8),
_12995: Function.prototype.call.bind(DataView.prototype.getUint16),
_12996: Function.prototype.call.bind(DataView.prototype.setUint16),
_12997: Function.prototype.call.bind(DataView.prototype.getInt16),
_12998: Function.prototype.call.bind(DataView.prototype.setInt16),
_12999: Function.prototype.call.bind(DataView.prototype.getUint32),
_13000: Function.prototype.call.bind(DataView.prototype.setUint32),
_13001: Function.prototype.call.bind(DataView.prototype.getInt32),
_13002: Function.prototype.call.bind(DataView.prototype.setInt32),
_13007: Function.prototype.call.bind(DataView.prototype.getFloat32),
_13008: Function.prototype.call.bind(DataView.prototype.setFloat32),
_13009: Function.prototype.call.bind(DataView.prototype.getFloat64),
_13010: Function.prototype.call.bind(DataView.prototype.setFloat64),
_13016: s => stringToDartString(stringFromDartString(s).toUpperCase()),
_13017: s => stringToDartString(stringFromDartString(s).toLowerCase()),
_13019: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_13021: (x0,x1) => x0.test(x1),
_13022: (x0,x1) => x0.exec(x1),
_13023: (x0,x1) => x0.exec(x1),
_13024: x0 => x0.pop(),
_13030: o => o === undefined,
_13031: o => typeof o === 'boolean',
_13032: o => typeof o === 'number',
_13034: o => typeof o === 'string',
_13037: o => o instanceof Int8Array,
_13038: o => o instanceof Uint8Array,
_13039: o => o instanceof Uint8ClampedArray,
_13040: o => o instanceof Int16Array,
_13041: o => o instanceof Uint16Array,
_13042: o => o instanceof Int32Array,
_13043: o => o instanceof Uint32Array,
_13044: o => o instanceof Float32Array,
_13045: o => o instanceof Float64Array,
_13046: o => o instanceof ArrayBuffer,
_13047: o => o instanceof DataView,
_13048: o => o instanceof Array,
_13049: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_13052: o => o instanceof RegExp,
_13053: (l, r) => l === r,
_13054: o => o,
_13055: o => o,
_13056: o => o,
_13057: b => !!b,
_13058: o => o.length,
_13061: (o, i) => o[i],
_13062: f => f.dartFunction,
_13063: l => arrayFromDartList(Int8Array, l),
_13064: l => arrayFromDartList(Uint8Array, l),
_13065: l => arrayFromDartList(Uint8ClampedArray, l),
_13066: l => arrayFromDartList(Int16Array, l),
_13067: l => arrayFromDartList(Uint16Array, l),
_13068: l => arrayFromDartList(Int32Array, l),
_13069: l => arrayFromDartList(Uint32Array, l),
_13070: l => arrayFromDartList(Float32Array, l),
_13071: l => arrayFromDartList(Float64Array, l),
_13072: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_13073: l => arrayFromDartList(Array, l),
_13074: stringFromDartString,
_13075: stringToDartString,
_13076: () => ({}),
_13077: () => [],
_13078: l => new Array(l),
_13082: (o, p) => o[p],
_13083: (o, p, v) => o[p] = v,
_13084: (o, m, a) => o[m].apply(o, a),
_13086: o => String(o),
_13087: (p, s, f) => p.then(s, f),
_13091: x0 => x0.index,
_13093: x0 => x0.length,
_13095: (x0,x1) => x0[x1],
_13099: x0 => x0.flags,
_13100: x0 => x0.multiline,
_13101: x0 => x0.ignoreCase,
_13102: x0 => x0.unicode,
_13103: x0 => x0.dotAll,
_13104: (x0,x1) => x0.lastIndex = x1
    };

    const baseImports = {
        dart2wasm: dart2wasm,


        Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };

    const jsStringPolyfill = {
        "charCodeAt": (s, i) => s.charCodeAt(i),
        "compare": (s1, s2) => {
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            return 0;
        },
        "concat": (s1, s2) => s1 + s2,
        "equals": (s1, s2) => s1 === s2,
        "fromCharCode": (i) => String.fromCharCode(i),
        "length": (s) => s.length,
        "substring": (s, a, b) => s.substring(a, b),
    };

    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
        "wasm:js-string": jsStringPolyfill,
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
    const dartMain = moduleInstance.exports.$getMain();
    const dartArgs = buildArgsList(args);
    moduleInstance.exports.$invokeMain(dartMain, dartArgs);
}

