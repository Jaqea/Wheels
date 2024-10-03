/**
 * 寄生组合式继承, 函数式写法
 */
function inheritFnc() {
  function Parent(name) {
    this.name = name;
  }

  Parent.prototype.getName = function () {
    return this.name;
  };

  function Child(name, age) {
    Person.call(this, name);
    this.age = age;
  }

  function createObj(proto) {
    const F = function () {};
    F.prototype = proto;
    return new F();
  }

  function extend(child, parent) {
    const F = createObj(parent.prototype);
    child.prototype = F;
    child.prototype.constructor = child;
  }
}

/**
 * 继承, class写法
 */
function inheritClass() {
  class Parent {
    constructor(name) {
      this.name = name;
    }

    getName() {
      return this.name;
    }
  }

  class Child extends Parent {
    constructor(name, age) {
      super(name);
      this.age = age;
    }

    getAge() {
      return this.age;
    }
  }
}

class Parent {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  getAge() {
    return this.age;
  }
}
