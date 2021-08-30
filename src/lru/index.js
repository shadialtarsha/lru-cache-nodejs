const DoublyLinkedList = require("../doubly_linked_list");

class LRU {
  constructor(capacity = 1) {
    if (capacity < 1) {
      throw new Error("Capacity cannot be less than 1");
    }

    this.capacity = capacity;

    this.doublyList = new DoublyLinkedList();

    // HashMap to hold the cache values.
    // each value in this map will by of shape <key, DoublyLinkedListNode>
    this.hashMap = {};

    this.size = 0;
  }

  put(key, value) {
    // Insert the new value first in the doubly linked list.
    const newNode = this.doublyList.insert(key, value);
    // Save the new node as value for the passed key.
    this.hashMap[key] = newNode;

    // Remove the last item in the list in case we exceeded the size
    if (this.doublyList.size > this.capacity) {
      const tail = this.doublyList.removeTail();
      delete this.hashMap[tail.key];
    }

    this.size = this.doublyList.size;
  }

  get(key) {
    if (!this.hashMap[key]) {
      return -1;
    }

    const node = this.hashMap[key];

    // Remove the node from the doubly linked list.
    this.doublyList.removeNode(node);

    // Insert the node again in the beginning of the doubly list.
    this.put(key, node.value);

    return node.value;
  }
}

module.exports = LRU;
