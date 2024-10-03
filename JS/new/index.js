/**
 * 实现new, ES6写法
 */
function myNewES6() {
  const constructor = [].shift.call(arguments);

  const obj = new Object();
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, arguments);

  return typeof result === "object" ? result : obj;
}

/**
 * 实现new, ES3写法
 */
function myNewES3() {
  var constructor = Array.prototype.shift.call(arguments);

  var obj = new Object();
  obj.__proto__ = constructor.prototype;
  var result = constructor.apply(obj, arguments);

  return typeof result === "object" ? result : obj;
}
