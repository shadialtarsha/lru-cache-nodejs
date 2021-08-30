class Node {
  constructor(key, value, next = null, previous = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  insert(key, value) {
    const newNode = new Node(key, value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }
    this.size++;
    return newNode;
  }

  removeNode(node) {
    if (!node || this.isEmpty()) {
      return null;
    }

    const previousNode = node.previous;
    const nextNode = node.next;

    if (previousNode && nextNode) {
      previousNode.next = nextNode;
      nextNode.previous = previousNode;
    } else if (nextNode) {
      this.head = nextNode;
      nextNode.previous = null;
    } else if (previousNode) {
      this.tail = previousNode;
      previousNode.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    node.next = null;
    node.previous = null;

    this.size--;

    return node;
  }

  removeTail() {
    return this.removeNode(this.tail);
  }
}

module.exports = DoublyLinkedList;
