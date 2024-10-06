/**
 * 发布订阅者模式
 */

class Publisher {
  constructor() {
    this.subscribers = new Map();
  }

  addSubscriber(event, subscriber) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).push(subscriber);
    } else {
      this.subscribers.set(event, [subscriber]);
    }
  }

  removeSubscriber(event, subscriber) {
    if (this.subscribers.has(event)) {
      const index = this.subscribers
        .get(event)
        .findIndex((sub) => sub === subscriber);
      this.subscribers.get(event).splice(index, 1);
    }
  }

  publish(event, data) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).forEach((subscriber) => subscriber(data));
    }
  }
}

const publisher = new Publisher();
publisher.addSubscriber("event1", (data) =>
  console.log(`receive event1 data: ${data}`)
);
publisher.addSubscriber("event2", (data) =>
  console.log(`receive event2 data: ${data}`)
);

const data1 = { value: "dataValue1" };
const data2 = { value: "dataValue2" };
publisher.publish("event1", data1.value);
publisher.publish("event2", data2.value);
