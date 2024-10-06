/**
 * 观察者模式
 */

// 数据状态主体类
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.findIndex((obs) => obs === observer);
    this.observers.splice(index, 1);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// 观察者类
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} receive subject data: ${data}`);
  }
}

const obj1 = new Observer("obs1");
const obj2 = new Observer("obs2");
const sub = new Subject();

sub.addObserver(obj1);
sub.addObserver(obj2);

sub.notify("subdata");
