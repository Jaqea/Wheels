/**
 * 实现promise每隔1s输出1,2,3
 */
const arr = [1, 2, 3];
arr.reduce(
  (p, x) =>
    p.then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(console.log(x));
          }, 1000);
        })
    ),
  Promise.resolve()
);

/**
 * 实现promise
 */
const PENDING = "pending";
const FUFILLED = "fufilled";
const REJECTED = "rejected";

function myPromise(fnc) {
  const self = this;
  self.value = null;
  self.error = null;
  self.status = PENDING;
  self.onFufilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.status === PENDING) {
      setTimeout(function () {
        self.value = value;
        self.status = FUFILLED;
        self.onFufilledCallbacks.forEach((cb) => cb(value));
      }, 0);
    }
  }

  function reject(error) {
    if (self.status === PENDING) {
      setTimeout(function () {
        self.error = error;
        self.status = REJECTED;
        self.onRejectedCallbacks.forEach((cb) => cb(error));
      }, 0);
    }
  }

  fnc(resolve, reject);
}

function resolvePromise(bridgePromise, x, resolve, reject) {
  if (x instanceof myPromise) {
    if (x.status === PENDING) {
      x.then(
        (y) => {
          resolvePromise(bridgePromise, y, resolve, reject);
        },
        (error) => reject(error)
      );
    } else {
      x.then(resolve, reject);
    }
  } else {
    resolve(x);
  }
}

myPromise.prototype.then = function (onFufilled, onRejected) {
  onFufilled = typeof onFufilled === "function" ? onFufilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (error) => {
          throw error;
        };
  const self = this;

  let bridgePromise;
  if (self.status === PENDING) {
    bridgePromise = new Promise((resolve, reject) => {
      self.onFufilledCallbacks.push((value) => {
        try {
          const x = onFufilled(value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push((error) => {
        try {
          const x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  } else if (self.status === FUFILLED) {
    bridgePromise = new Promise((resolve, reject) => {
      setTimeout(function () {
        try {
          const x = onFufilled(self.value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  } else {
    bridgePromise = new Promise((resolve, reject) => {
      setTimeout(function () {
        try {
          const x = onRejected(self.error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  }

  return bridgePromise;
};

myPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

myPromise.all = function (promises) {
  return new Promsie((resolve, reject) => {
    const result = [],
      count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (res) => {
          result[i] = res;
          if (count === promises.length) {
            resolve(result);
          }
          count++;
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

myPromise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (res) => resolve(res),
        (error) => reject(error)
      );
    }
  });
};

/**
 * 实现instanceof
 */
function myInstanceof(leftValue, rightValue) {
  if (typeof leftValue !== "object" || leftValue === null) {
    return false;
  }

  let leftProto = leftValue.__proto__,
    rightProto = rightValue.prototype;

  while (true) {
    if (leftProto === null) {
      return false;
    }

    if (leftProto === rightProto) {
      return true;
    }

    leftProto = leftProto.__proto__;
  }
}

/**
 * 实现继承
 */
function Person(name) {
  this.name = name;
}

function Child(age) {
  Person.call(this, "name");
  this.age = age;
}

Person.prototype.getName = function () {
  console.log(this.name);
};

function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  const F = createObj(parent.prototype);
  child.prototype = F.prototype;
  child.prototype.constructor = child;
}

/**
 * 实现Object.create
 */

Object.myCreate = function (proto) {
  function fNOP() {}

  fNOP.prototype = proto;
  fNOP.prototype.constructor = fNOP;

  return new fNOP();
};

/**
 * 实现new
 */
function myNewES3() {
  var obj = new Object();

  var Constructor = Array.prototype.shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  var result = Constructor.apply(obj, arguments);

  return typeof result === "object" ? result : obj;
}

function myNewES6() {
  const obj = new Object();

  const Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  const result = Constructor.apply(obj, arguments);

  return typeof result === "object" ? result : obj;
}

/**
 * 实现bind
 */
Function.prototype.myBindES3 = function (context) {
  if (typeof this !== "function") {
    throw new Error("xxx");
  }

  context = context ? Object(context) : window;
  var args = Array.prototype.slice.call(arguments, 1);
  var self = this;
  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = self.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};

Function.prototype.myBindES6 = function (context) {
  if (typeof this !== "function") {
    throw new Error("xxx");
  }

  context = context ? Object(context) : window;

  const self = this;
  const args = [...arguments].slice(1);
  const fNOP = function () {};

  const fBound = function () {
    const bindArgs = [...args, ...arguments];
    return self.apply(this instanceof fNOP ? this : context, bindArgs);
  };

  fNOP.prototype = self.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};

/**
 * 实现apply
 */
Function.prototype.myApplyES3 = function (context, arr) {
  if (typeof this !== "function") {
    throw new Error("xxx");
  }

  context = context ? Object(context) : window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }

    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;

  return result;
};

Function.prototype.myApplyES6 = function (context, arr) {
  if (typeof this !== "function") {
    throw new Error("xxx");
  }

  context = context ? Object(context) : window;
  const fncKey = Symbol();
  context[fncKey] = this;

  let result;
  if (!arr) {
    result = context[fncKey]();
  } else {
    result = context[fncKey](...args);
  }

  delete context[fncKey];

  return result;
};

/**
 * 实现call
 */
Function.prototype.myCallES3 = function (context) {
  if (typeof this !== "function") {
    throw new Error("xxx");
  }

  context = context ? Object(context) : window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  var result = eval("context.fn(" + args + ")");

  return result;
};

Function.prototype.myCallES6 = function (context) {
  if (typeof this !== "function") {
    throw new Error("xxx");
  }

  context = context ? Object(context) : window;
  const symbolKey = Symbol();
  context[symbolKey] = this;

  const args = [...arguments].slice(1);

  const result = context[symbolKey](...args);

  delete context[symbolKey];

  return result;
};

/**
 * 实现sleep
 */
function sleep(fnc, waitTime) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(fnc);
    }, waitTime);
  });
}

/**
 * 判断对象类型函数
 */
function isType(type) {
  return (obj) => Object.prototype.toString.call(obj) === `[object ${type}]`;
}

/**
 * 函数柯里化
 */
function curry(fnc, ...args) {
  return fnc.length > args.length
    ? (...arguments) => curry(fnc, ...args, ...arguments)
    : fnc(...args);
}

/**
 * 实现reduce
 */
Array.prototype.myReduce = function (fnc, initValue) {
  let result = initValue,
    i = 0;

  if (typeof result === "undefined") {
    result = this[i++];
  }

  while (i < this.length) {
    result = fnc(result, this[i++]);
  }

  return result;
};

/**
 * 数组扁平化
 */
function flatDeep(arr, deep = 1) {
  return deep > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, deep - 1) : val),
        []
      )
    : arr.slice();
}

/**
 * 深拷贝
 */
function deepClone(target) {
  const map = new Map();

  function clone(obj) {
    if (obj == null || typeof obj !== "object") {
      return obj;
    }

    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }

    if (obj instanceof Date) {
      return new Date(obj);
    }

    if (map.has(obj)) {
      return map.get(obj);
    }

    const cloneObj = new obj.constructor();
    map.set(obj, cloneObj);

    for (const [k, v] of Object.entries(obj)) {
      cloneObj[k] = clone(v);
    }

    return cloneObj;
  }

  return clone(target);
}

/**
 * 浅拷贝 arr.slice(1) arr.concat() Array.from() Object.assign({},obj)
 */
function shallowClone(target) {
  const cloneTarget = {};

  for (const key in target) {
    cloneTarget[key] = target[key];
  }

  return cloneTarget;
}

/**
 * 节流
 */
function throttle(fnc, waitTime) {
  let timerId, result, context, args;

  const throttled = function () {
    context = this;
    args = arguments;

    if (!timerId) {
      timerId = setTimeout(function () {
        result = fnc.apply(context, args);
        timerId = null;
        context = args = null;
      }, waitTime);
    }

    return result;
  };

  return throttled;
}

/**
 * 防抖
 */
function debounce(fnc, waitTime, immediate) {
  let timerId, result;

  const debounced = function () {
    if (timerId) {
      clearTimeout(timerId);
    }

    const context = this;
    const args = arguments;
    if (immediate) {
      const canNow = !timerId;
      timerId = setTimeout(function () {
        timerId = null;
      }, waitTime);
      if (canNow) {
        result = fnc.apply(context, args);
      }
    } else {
      timerId = setTimeout(function () {
        result = fnc.apply(context, args);
      }, waitTime);
    }

    return result;
  };

  return debounced;
}
