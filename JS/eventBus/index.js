/**
 * 事件总线模式 (发布订阅模式的一种实现方式)
 */
class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback
      );
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }
}

const eventBus = new EventBus();
eventBus.on("event1", (data) => console.log(`receive event1 data: ${data}`));
eventBus.on("event2", (data) => console.log(`receive event2 data: ${data}`));

const data1 = "dataValue1";
const data2 = "dataValue2";
eventBus.emit("event1", data1);
eventBus.emit("event2", data2);

eventBus.off("event1", {});
