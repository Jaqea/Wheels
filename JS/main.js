function foo() {
  console.log(this);
}

foo.call(undefined);

Function.prototype.myCallES6 = function (context) {
  if (typeof this !== "function") throw new Error("Plaease provide function");

  context = context ? Object(context) : window;
  const args = [...arguments].slice(1);

  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;

  return res;
};

Function.prototype.myCallES3 = function (context) {
  if (typeof this !== "function") throw new Error("xxx");

  context = context ? Object(context) : window;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  context.fn = this;
  var res = eval("context.fn(" + args + ")");
  delete context.fn;

  return res;
};

Function.prototype.myApplyES6 = function (context, arr) {
  if (typeof this !== "function") throw new Error("xxx");

  context = context ? Object(context) : window;

  context.fn = this;

  let result;
  if (!arr) {
    result = context.fn();
  } else {
    result = context.fn(...arr);
  }

  delete context.fn;

  return result;
};

Function.prototype.myApplyES3 = function (context, arr) {
  if (typeof this !== "function") throw new Error("xxx");

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

Function.prototype.myBindES6 = function (context) {
  if (typeof this !== "function") throw new Error("xxx");

  context = context ? Object(context) : window;

  const args = [...arguments].slice(1);
  const fNOP = function () {};
  const self = this;

  const fBound = function () {
    const bindArgs = [...args, ...arguments];
    return self.apply(this instanceof fNOP ? this : context, bindArgs);
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};

Function.prototype.myBindES3 = function (context) {
  if (typeof this !== "function") throw new Error("xxx");

  context = context ? Object(context) : window;

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};

function myNewES6() {
  const obj = new Object();

  const args = [...arguments];
  const Constructor = args.shift();
  const result = Constructor.apply(obj, args);

  obj.__proto__ = Constructor.prototype;

  return typeof result === "object" ? result : obj;
}

function myNewES3() {
  var obj = new Object();
  var args = Array.prototype.slice.call(arguments);
  var Constructor = args.shift();

  var result = Constructor.apply(obj, args);

  obj.__proto__ = Constructor.prototype;

  return typeof result === "object" ? result : obj;
}
