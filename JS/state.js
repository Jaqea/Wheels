class Store {
  constructor(initState) {
    this.state = initState;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = {
      ...newState,
    };
    this.notifyListeners();
  }

  subscribe(listener) {
    listener.getState = this.getState.bind(this);
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((cb) => cb(this.state));
  }
}

const data = {
  name: "jaqea",
  age: 18,
};
const store = new Store(data);
const fn1 = (res) => console.log("f1", res);
const fn2 = (res) => console.log("f2", res);

store.subscribe(fn1);
store.subscribe(fn2);

store.setState({ name: "alan" });
