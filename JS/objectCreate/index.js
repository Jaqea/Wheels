/**
 * 实现Object.create
 * @param proto - 以该对象为原型
 */
function myCreate(proto) {
  const F = function () {};

  F.prototype = proto;
  F.prototype.constructor = F;

  return new F();
}
