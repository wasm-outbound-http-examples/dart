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
_101: x0 => x0.text(),
_170: (x0,x1) => globalThis.fetch(x0,x1),
_12887: v => stringToDartString(v.toString()),
_12902: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_12911: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_12912: s => printToConsole(stringFromDartString(s)),
_12930: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_12932: (a, i) => a.push(i),
_12943: a => a.length,
_12945: (a, i) => a[i],
_12946: (a, i, v) => a[i] = v,
_12948: a => a.join(''),
_12958: (s, p, i) => s.indexOf(p, i),
_12961: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_12962: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_12963: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_12964: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_12965: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_12966: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_12967: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_12970: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_12971: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_12975: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_12979: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_12980: (b, o) => new DataView(b, o),
_12982: Function.prototype.call.bind(DataView.prototype.getUint8),
_12984: Function.prototype.call.bind(DataView.prototype.getInt8),
_12986: Function.prototype.call.bind(DataView.prototype.getUint16),
_12988: Function.prototype.call.bind(DataView.prototype.getInt16),
_12990: Function.prototype.call.bind(DataView.prototype.getUint32),
_12992: Function.prototype.call.bind(DataView.prototype.getInt32),
_12998: Function.prototype.call.bind(DataView.prototype.getFloat32),
_13000: Function.prototype.call.bind(DataView.prototype.getFloat64),
_13021: o => o === undefined,
_13022: o => typeof o === 'boolean',
_13023: o => typeof o === 'number',
_13025: o => typeof o === 'string',
_13028: o => o instanceof Int8Array,
_13029: o => o instanceof Uint8Array,
_13030: o => o instanceof Uint8ClampedArray,
_13031: o => o instanceof Int16Array,
_13032: o => o instanceof Uint16Array,
_13033: o => o instanceof Int32Array,
_13034: o => o instanceof Uint32Array,
_13035: o => o instanceof Float32Array,
_13036: o => o instanceof Float64Array,
_13037: o => o instanceof ArrayBuffer,
_13038: o => o instanceof DataView,
_13039: o => o instanceof Array,
_13040: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_13044: (l, r) => l === r,
_13045: o => o,
_13046: o => o,
_13047: o => o,
_13048: b => !!b,
_13049: o => o.length,
_13052: (o, i) => o[i],
_13053: f => f.dartFunction,
_13054: l => arrayFromDartList(Int8Array, l),
_13055: l => arrayFromDartList(Uint8Array, l),
_13056: l => arrayFromDartList(Uint8ClampedArray, l),
_13057: l => arrayFromDartList(Int16Array, l),
_13058: l => arrayFromDartList(Uint16Array, l),
_13059: l => arrayFromDartList(Int32Array, l),
_13060: l => arrayFromDartList(Uint32Array, l),
_13061: l => arrayFromDartList(Float32Array, l),
_13062: l => arrayFromDartList(Float64Array, l),
_13063: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_13064: l => arrayFromDartList(Array, l),
_13065: stringFromDartString,
_13066: stringToDartString,
_13069: l => new Array(l),
_13073: (o, p) => o[p],
_13077: o => String(o),
_13078: (p, s, f) => p.then(s, f)
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

