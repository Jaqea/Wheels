const PENDING = "pending";
const FUFILLED = "fufilled";
const REJECTED = "rejected";
/**
 * 实现promise
 * @param fn - 传入new Promise的函数
 */
function myPromise(fn) {
  this.status = PENDING;
  this.value = null;
  this.error = null;
  this.onFufilledCallbacks = [];
  this.onRejectedCallbacks = [];

  function resolve(value) {
    if (this.status === PENDING) {
      setTimeout(function () {
        this.value = value;
        this.status = FUFILLED;
        this.onFufilledCallbacks.forEach((cb) => cb(value));
      }, 0);
    }
  }

  function reject(error) {
    if (this.status === PENDING) {
      setTimeout(function () {
        this.error = error;
        this.status = REJECTED;
        this.onRejectedCallbacks = forEach((cb) => cb(error));
      }, 0);
    }
  }

  fn(resolve, reject);
}

function resolvePromise(x, resolve, reject) {
  if (x instanceof myPromise) {
    if (x.status === PENDING) {
      x.then(
        (y) => {
          resolvePromise(y, resolve, reject);
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
          throw new Error(error);
        };

  const self = this;
  let bridgePromise;
  if (self.status === PENDING) {
    bridgePromise = new myPromise(function (resolve, reject) {
      self.onFufilledCallbacks.push(function (value) {
        try {
          const x = onFufilled(value);
          resolvePromise(x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push(function (error) {
        try {
          const x = onRejected(error);
          resolvePromise(x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  } else if (self.status === FUFILLED) {
    bridgePromise = new myPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          const x = onFufilled(self.value);
          resolvePromise(x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  } else {
    bridgePromise = new myPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          const x = onRejected(self.error);
          resolvePromise(x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  }
};

myPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

/**
 * 实现Promise.resolve
 */
myPromise.resolve = function (value) {
  if (value instanceof myPromise) {
    return value;
  }

  return new myPromise((resolve) => resolve(value));
};

/**
 * 实现Promise.reject
 */
myPromise.reject = function (reason) {
  return new myPromise((resolve, reject) => reject(reason));
};

/**
 * 实现Promise.all
 */
myPromise.all = function (promises) {
  return new myPromise((resolve, reject) => {
    const result = [];
    let count = 0;
    for (const [index, promise] of Object.entries(promises)) {
      promise.then(
        (value) => {
          count++;
          result[index] = value;
          if (count === promises.length) {
            resolve(result);
          }
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

/**
 * 实现myPromise.race
 */
myPromise.race = function (promises) {
  return new myPromise((resolve, reject) => {
    for (const promise of promises) {
      promise.then(
        (value) => {
          resolve(value);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

/**
 * 实现myPromise.allSettled
 */
myPromise.allSettled = function (promises) {
  return new myPromise((resolve) => {
    const result = [];
    for (const [index, promise] of Object.entries(promises)) {
      promise.then(
        (value) => {
          result[index] = {
            value,
            status: FUFILLED,
          };
          if (result.length === promises.length) {
            resolve(result);
          }
        },
        (reason) => {
          result[index] = {
            reason,
            status: REJECTED,
          };
          if (result.length === promises.length) {
            resolve(result);
          }
        }
      );
    }
  });
};

/**
 * 实现myPromise.any
 */
myPromise.any = function (promises) {
  return new myPromise((resolve, reject) => {
    if (!promises.length) {
      reject(new AggregateError());
    }
    let count = 0;
    for (const promise of promises) {
      promise.then(
        (value) => {
          resolve(value);
        },
        (error) => {
          count++;
          if (count === promises.length) {
            reject(new AggregateError(error));
          }
        }
      );
    }
  });
};
