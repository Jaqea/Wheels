const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fnc) {
  const self = this;
  self.status = PENDING;
  self.value = null;
  self.error = null;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      value.then(resolve, reject);
    }

    if (self.status === PENDING) {
      setTimeout(() => {
        self.value = value;
        self.status = FULFILLED;
        self.onFulfilledCallbacks.forEach((cb) => cb(self.value));
      }, 0);
    }
  }

  function reject(error) {
    if (self.status === PENDING) {
      setTimeout(() => {
        self.error = error;
        self.status = REJECTED;
        self.onRejectedCallbacks.forEach((cb) => cb(self.error));
      }, 0);
    }
  }

  try {
    fnc(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 同步注册回调函数，异步执行，等待前面的回调执行完后，再执行后续回调
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const self = this;
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (error) => {
          throw error;
        };
  let bridgePromise;
  if (self.status === PENDING) {
    bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => {
        try {
          const x = onFulfilled(value);
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

    return bridgePromise;
  } else if (self.status === FULFILLED) {
    bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(self.value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });

    return bridgePromise;
  } else {
    bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(self.error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });

    return bridgePromise;
  }
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

function resolvePromise(bridgePromise, x, resolve, reject) {
  if (bridgePromise === x) {
    return reject(new TypeError("Circular reference"));
  }

  let called = false;
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(
        (y) => {
          resolvePromise(bridgePromise, y, resolve, reject);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(bridgePromise, y, resolve, reject);
          },
          (error) => {
            if (called) return;
            called = true;
            reject(error);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

// 执行测试用例需要用到的代码
MyPromise.deferred = function () {
  let defer = {};
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};
try {
  module.exports = MyPromise;
} catch (e) {}

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    const res = [];
    let count = 0;

    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (data) => {
          res[i] = data;
          count++;
          if (count === promises.length) {
            resolve(res);
          }
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => {
    resolve(value);
  });
};

MyPromise.reject = function (error) {
  return new MyPromise((resolve, reject) => {
    reject(error);
  });
};

MyPromise.promiseify = function (fnc) {
  return function () {
    const args = [...arguments];

    return new MyPromise((resolve, reject) => {
      fnc.apply(
        null,
        args.concat(function (error) {
          error ? reject(error) : resolve(arguments[1]);
        })
      );
    });
  };
};
